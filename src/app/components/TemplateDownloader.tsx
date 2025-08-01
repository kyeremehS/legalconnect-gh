"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Eye, Star, FileText } from "lucide-react";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  downloads: string;
  fileSize: string;
  format: string;
  featured: boolean;
}

interface TemplateDownloaderProps {
  template: Template;
}

export default function TemplateDownloader({ template }: TemplateDownloaderProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadCount, setDownloadCount] = useState(
    parseInt(template.downloads.replace('K', '00').replace('.', ''))
  );

  const generatePDF = async (title: string) => {
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 120
>>
stream
BT
/F1 12 Tf
50 750 Td
(${title}) Tj
0 -20 Td
(LegalConnect Template) Tj
0 -20 Td
(Generated on ${new Date().toLocaleDateString()}) Tj
0 -40 Td
(This is a sample template for ${title}) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000074 00000 n 
0000000120 00000 n 
0000000179 00000 n 
0000000380 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
456
%%EOF`;

    return new Blob([pdfContent], { type: 'application/pdf' });
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const blob = await generatePDF(template.title);
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${template.title.replace(/\s+/g, '_')}.${template.format.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      setDownloadCount(prev => prev + 1);
      
      // Show success notification
      alert('Template downloaded successfully!');
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const formatDownloadCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            {template.format}
          </span>
        </div>
        {template.featured && (
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
        )}
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">{template.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{template.description}</p>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <span>{formatDownloadCount(downloadCount)} downloads</span>
        <span>{template.fileSize}</span>
      </div>

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex-1 bg-[#d4a017] text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-[#b8941f] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isDownloading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
              Downloading...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download
            </>
          )}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
        >
          <Eye className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}