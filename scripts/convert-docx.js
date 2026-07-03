/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");

const DOCS_DIR = path.join(__dirname, "../DuAnWord");
const OUTPUT_HTML_DIR = path.join(__dirname, "../src/data/documents");
const OUTPUT_JSON_PATH = path.join(__dirname, "../src/data/documents.json");

// Vietnamese slugify function to generate clean, SEO-friendly URLs
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function convertAll() {
  console.log("Starting conversion of docx files...");
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_HTML_DIR)) {
    fs.mkdirSync(OUTPUT_HTML_DIR, { recursive: true });
  }

  // Read files in DuAnWord directory
  const files = fs.readdirSync(DOCS_DIR);
  const docxFiles = files.filter(f => f.endsWith(".docx"));
  
  console.log(`Found ${docxFiles.length} docx files to convert.`);
  
  const documentsIndex = [];

  for (const file of docxFiles) {
    const filePath = path.join(DOCS_DIR, file);
    const fileNameWithoutExt = path.basename(file, ".docx");
    
    // Generate clean slug
    // Remove starting numbers like "1. " from slug
    const cleanTitle = fileNameWithoutExt.replace(/^\d+\.\s*/, "");
    const slug = slugify(cleanTitle);
    
    console.log(`Converting: "${file}" -> slug: "${slug}"`);

    try {
      // Convert docx to HTML using mammoth
      // Configure mammoth options if needed (e.g. styleMap)
      const options = {
        styleMap: [
          "p[style-name='Heading 1'] => h1:fresh",
          "p[style-name='Heading 2'] => h2:fresh",
          "p[style-name='Heading 3'] => h3:fresh",
          "p[style-name='Heading 4'] => h4:fresh",
          "ul > li => li:fresh",
          "ol > li => li:fresh"
        ]
      };

      const result = await mammoth.convertToHtml({ path: filePath }, options);
      const htmlFragment = result.value;
      const warnings = result.messages;
      
      if (warnings.length > 0) {
        console.warn(`Warnings for ${file}:`, warnings);
      }

      // Save HTML fragment
      const outputHtmlPath = path.join(OUTPUT_HTML_DIR, `${slug}.html`);
      fs.writeFileSync(outputHtmlPath, htmlFragment, "utf8");

      // Save to JSON index
      documentsIndex.push({
        id: documentsIndex.length + 1,
        title: fileNameWithoutExt, // e.g. "1. Thao tác cơ bản với tệp tin và thư mục"
        slug: slug,
        originalName: file,
        wordCount: htmlFragment.replace(/<[^>]*>/g, "").split(/\s+/).length
      });

      console.log(`Successfully saved HTML fragment for "${slug}"`);
    } catch (err) {
      console.error(`Error converting file ${file}:`, err);
    }
  }

  // Write JSON metadata index file
  fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(documentsIndex, null, 2), "utf8");
  console.log(`Successfully generated metadata index at ${OUTPUT_JSON_PATH}`);
}

convertAll();
