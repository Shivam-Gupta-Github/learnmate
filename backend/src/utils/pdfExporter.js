import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { marked } from "marked";

export async function exportToPDF(markdownText) {
  const outputDir = path.resolve("output");
  const filePath = path.join(outputDir, `notes_${Date.now()}.pdf`);
  fs.mkdirSync(outputDir, { recursive: true });

  // Convert Markdown to HTML
  const htmlContent = marked.parse(markdownText);

  // Basic styled HTML template
  const html = `
  <html>
  <head>
    <style>
      body {
        font-family: 'Helvetica', sans-serif;
        line-height: 1.6;
        padding: 40px;
        color: #222;
      }
      h1, h2, h3 {
        color: #1a73e8;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
      }
      ul { margin-left: 20px; }
      li { margin-bottom: 6px; }
      strong { font-weight: bold; color: #000; }
      p { margin: 10px 0; }
      .highlight {
        background: #f8f9fa;
        padding: 10px;
        border-left: 3px solid #1a73e8;
        border-radius: 5px;
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>${htmlContent}</body>
  </html>`;

  // Launch headless browser to render the HTML to PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.pdf({ path: filePath, format: "A4" });
  await browser.close();

  return filePath;
}
