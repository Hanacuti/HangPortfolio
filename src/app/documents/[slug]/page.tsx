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

  // Get 3 similar documents for cross-selling style section
  const similarDocs = documentsIndex
    .filter((d) => d.slug !== slug)
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-8 py-4 md:py-8 max-w-4xl mx-auto">
      {/* Back to Projects */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold font-mono text-ceramic-pink hover:text-slate-800 transition-colors duration-300 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Quay lại Kho Dự Án
        </Link>
      </div>

      {/* Document Header Info */}
      <div className="border-b border-ceramic-pink/15 pb-6">
        <div className="flex flex-wrap gap-3 items-center mb-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ceramic-pink-light border border-ceramic-pink/15 text-[9px] font-mono text-ceramic-pink uppercase tracking-wider">
            <FileText className="h-3.5 w-3.5" />
            Tài liệu học thuật
          </span>
          <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            Ước lượng: {doc.wordCount} từ
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-serif font-extrabold text-ceramic-pink leading-tight">
          {doc.title}
        </h1>
        <p className="text-[10px] text-slate-400 font-mono mt-2 uppercase tracking-wide">
          File gốc: {doc.originalName}
        </p>
      </div>

      {/* Main Document Content (Glazed Ceramic Tile Look) */}
      <div className="bento-card p-6 md:p-10 bg-white border-4 border-white ceramic-shadow">
        <article className="document-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

      {/* Similar Products/Documents Section (Mockup Cross-Selling) */}
      <div className="mt-8 pt-8 border-t border-ceramic-pink/15">
        <h3 className="text-lg font-serif font-extrabold text-ceramic-pink mb-6 text-center italic tracking-wider">
          Similar Products (Tài liệu liên quan)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {similarDocs.map((sDoc, sIdx) => {
            const circleBgColors = [
              "bg-ceramic-pink-light text-ceramic-pink",
              "bg-ceramic-mint-light text-ceramic-mint",
              "bg-ceramic-yellow/30 text-slate-700"
            ];
            const colorClass = circleBgColors[sIdx % circleBgColors.length];
            return (
              <Link 
                key={sDoc.slug} 
                href={`/documents/${sDoc.slug}`}
                className="flex flex-col items-center group"
              >
                {/* 3D Ceramic Circle Frame */}
                <div className={`w-20 h-20 rounded-full ${colorClass} border-4 border-white ceramic-shadow flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                  <FileText className="h-6 w-6" />
                </div>
                <span className="text-center text-xs font-serif font-bold text-slate-700 mt-3 group-hover:text-ceramic-pink transition-colors duration-300 line-clamp-2 max-w-[180px]">
                  {sDoc.title}
                </span>
                <span className="text-[9px] text-slate-400 font-mono mt-1 uppercase">
                  {sDoc.wordCount} từ
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
