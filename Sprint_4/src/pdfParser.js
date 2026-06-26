import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
// from pdfjs documentation examples picked out only the reading part not the rendering
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
export async function extractTextFromPDF(file) {
  try {
    
  } catch (error) {
    
  }
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let extraced = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const pageText = content.items.map((item) => item.str).join(" ");
    extraced += pageText + "\n";
  }

  return extraced.trim();
}