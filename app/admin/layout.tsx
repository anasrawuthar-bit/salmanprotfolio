import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Salman Studio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 font-sans">
      {children}
    </div>
  );
}
