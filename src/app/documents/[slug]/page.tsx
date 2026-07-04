import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
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

  // Get all 5 other documents (exclude current one)
  const similarDocs = documentsIndex.filter((d) => d.slug !== slug);

  return (
    <div className="flex flex-col gap-8 py-4 md:py-8 max-w-4xl mx-auto">
      {/* Back to Projects */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold font-mono text-ceramic-pink hover:text-white transition-colors duration-300 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Quay lại Kho Dự Án
        </Link>
      </div>

      {/* Document Header Info */}
      <div className="border-b border-ceramic-pink/15 pb-4">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ceramic-pink-light border border-ceramic-pink/15 text-[9px] font-mono text-ceramic-pink uppercase tracking-wider">
            <FileText className="h-3.5 w-3.5" />
            Dự án: {doc.title}
          </span>
        </div>
      </div>

      {/* Main Document Content (Dark Glazed Ceramic Look) */}
      <div className="bento-card p-6 md:p-10 border-4 border-white/5 backdrop-blur-md">
        <article className="document-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

      {/* Similar Documents Section (All 5 other projects shown as a 5-column grid) */}
      <div className="mt-8 pt-8 border-t border-ceramic-pink/15">
        <h3 className="text-lg font-serif font-extrabold text-ceramic-pink mb-6 text-center italic tracking-wider">
          Similar Products (Tài liệu liên quan)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {similarDocs.map((sDoc, sIdx) => {
            const circleBgColors = [
              "bg-ceramic-pink-light text-ceramic-pink border-ceramic-pink/20",
              "bg-ceramic-mint-light text-ceramic-mint border-ceramic-mint/20",
              "bg-ceramic-yellow/15 text-ceramic-yellow border-ceramic-yellow/20"
            ];
            const colorClass = circleBgColors[sIdx % circleBgColors.length];
            return (
              <Link 
                key={sDoc.slug} 
                href={`/documents/${sDoc.slug}`}
                className="flex flex-col items-center group"
              >
                {/* 3D Ceramic Circle Frame */}
                <div className={`w-16 h-16 rounded-full ${colorClass} border-4 outline outline-1 outline-white/5 ceramic-shadow flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                  <FileText className="h-5 w-5" />
                </div>
                <span className="text-center text-[10px] font-serif font-bold text-slate-200 mt-2.5 group-hover:text-ceramic-pink transition-colors duration-300 line-clamp-2 max-w-[120px]">
                  {sDoc.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
