import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "portfolio.json");

function readData() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeData(data: unknown) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

// GET — public: read all data
export async function GET() {
  try {
    const data = readData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Could not read data" }, { status: 500 });
  }
}

// POST — protected: write full data blob
export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO;
    const githubBranch = process.env.GITHUB_BRANCH ?? "main";

    if (githubToken && githubRepo) {
      // 1. Fetch current file SHA from GitHub
      const getUrl = `https://api.github.com/repos/${githubRepo}/contents/data/portfolio.json?ref=${githubBranch}`;
      const getRes = await fetch(getUrl, {
        headers: {
          "Authorization": `token ${githubToken}`,
          "Accept": "application/vnd.github.v3+json",
          "User-Agent": "NextJS-Portfolio-CMS"
        },
        cache: "no-store"
      });

      if (!getRes.ok) {
        const errText = await getRes.text();
        return NextResponse.json({ error: `Failed to fetch file SHA from GitHub: ${errText}` }, { status: getRes.status });
      }

      const fileData = await getRes.json();
      const sha = fileData.sha;

      // 2. Commit the updated content to GitHub
      const putUrl = `https://api.github.com/repos/${githubRepo}/contents/data/portfolio.json`;
      const contentBase64 = Buffer.from(JSON.stringify(body, null, 2)).toString("base64");

      const putRes = await fetch(putUrl, {
        method: "PUT",
        headers: {
          "Authorization": `token ${githubToken}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json",
          "User-Agent": "NextJS-Portfolio-CMS"
        },
        body: JSON.stringify({
          message: "chore: update portfolio data via admin panel",
          content: contentBase64,
          sha: sha,
          branch: githubBranch
        })
      });

      if (!putRes.ok) {
        const errText = await putRes.text();
        return NextResponse.json({ error: `Failed to commit file to GitHub: ${errText}` }, { status: putRes.status });
      }

      // Also write locally as a best effort
      try {
        writeData(body);
      } catch {}

      return NextResponse.json({ ok: true, github: true });
    } else {
      // Local fallback
      writeData(body);
      return NextResponse.json({ ok: true, local: true });
    }
  } catch (error) {
    return NextResponse.json({ error: `Could not write data: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
  }
}
