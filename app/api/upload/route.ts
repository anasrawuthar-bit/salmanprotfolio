import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    const ext = file.name.split(".").pop() ?? "jpg";
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const filePath = `public/uploads/${safeName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentBase64 = buffer.toString("base64");

    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO;
    const githubBranch = process.env.GITHUB_BRANCH ?? "main";

    if (githubToken && githubRepo) {
      // Check if file already exists (to get SHA if needed)
      const getUrl = `https://api.github.com/repos/${githubRepo}/contents/${filePath}?ref=${githubBranch}`;
      const getRes = await fetch(getUrl, {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "NextJS-Portfolio-CMS",
        },
        cache: "no-store",
      });

      let sha: string | undefined;
      if (getRes.ok) {
        const existing = await getRes.json();
        sha = existing.sha;
      }

      // Commit image to GitHub
      const putUrl = `https://api.github.com/repos/${githubRepo}/contents/${filePath}`;
      const putBody: Record<string, string> = {
        message: `chore: upload image ${safeName} via admin panel`,
        content: contentBase64,
        branch: githubBranch,
      };
      if (sha) putBody.sha = sha;

      const putRes = await fetch(putUrl, {
        method: "PUT",
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
          "User-Agent": "NextJS-Portfolio-CMS",
        },
        body: JSON.stringify(putBody),
      });

      if (!putRes.ok) {
        const errText = await putRes.text();
        return NextResponse.json(
          { error: `GitHub upload failed: ${errText}` },
          { status: putRes.status }
        );
      }

      return NextResponse.json({ url: `/uploads/${safeName}` });
    } else {
      // Local fallback — write directly to public/uploads/
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
      fs.writeFileSync(path.join(uploadsDir, safeName), buffer);
      return NextResponse.json({ url: `/uploads/${safeName}` });
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Upload failed: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
