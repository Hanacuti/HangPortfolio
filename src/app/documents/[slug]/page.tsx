import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, FileText } from "lucide-react";
import documentsIndex from "@/data/documents.json";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return documentsIndex.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function DocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = documentsIndex.find((d) => d.slug === slug);

  if (!doc) {
    notFound();
  }

  const filePath = path.join(process.cwd(), "src/data/documents", `${slug}.html`);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const htmlContent = fs.readFileSync(filePath, "utf8");

  return (
    <div className="flex flex-col gap-8 py-6 md:py-12 max-w-4xl mx-auto">
      {/* Back to Projects */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-lunar-gold hover:text-white transition-colors duration-300 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Quay lại Kho Dự Án
        </Link>
      </div>

      {/* Document Header Info */}
      <div className="border-b border-white/5 pb-6">
        <div className="flex flex-wrap gap-3 items-center mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-lunar-gold/10 border border-lunar-gold/20 text-[10px] font-mono text-lunar-gold uppercase tracking-wider">
            <FileText className="h-3 w-3" />
            Tài liệu học thuật
          </span>
          <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            Ước lượng: {doc.wordCount} từ
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
          {doc.title}
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-2">
          File gốc: {doc.originalName}
        </p>
      </div>

      {/* Main Document Content */}
      <div className="bento-card p-6 md:p-10 bg-[#0B0F19]/40 backdrop-blur-md border border-white/5 rounded-3xl">
        <article className="document-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
}
