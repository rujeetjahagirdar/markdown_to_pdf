import { useState, useRef } from 'react';
import { BaseProvider, LightTheme } from 'baseui';
import { Button } from 'baseui/button';
import { Textarea } from "baseui/textarea";
import {Block} from 'baseui/block';
import ReactMarkdown from 'react-markdown';
import html2pdf from 'html2pdf.js';


function App() {
  const [markdown, setMarkdown] = useState(null);
  const markdownText = useRef(null);
  const previewRef = useRef(null);
  
  const handleOkClick = () => {
    const value = markdownText.current.value;
    setMarkdown(value);
  };

  // const handleDownloadPdf = () => {
  //   const element = previewRef.current; // Get the preview section
  //   const options = {
  //     margin: 10,
  //     filename: 'markdown-preview.pdf',
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  //   };

  //   // Generate PDF from the preview section
  //   html2pdf().from(element).set(options).save();
  // };

  const handleDownloadPdf = () => {
    const element = previewRef.current;
    console.log(element);
  
    // 1. Clone the preview content
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.innerHTML = element.innerHTML;
  
    // 2. Add critical styles to the cloned content
    tempDiv.style.backgroundColor = '#fff';
    tempDiv.style.color = '#333';
    tempDiv.style.width = '100%'; // Match original width
    tempDiv.style.padding = '20px';
    tempDiv.style.fontFamily = 'Arial, sans-serif'; // Force font
    console.log(tempDiv);
    document.body.appendChild(tempDiv);
  
    // 3. Configure PDF options
    const options = {
      margin: [10, 10],
      filename: 'markdown-preview.pdf',
      html2canvas: {
        scale: 2,
        scrollY: 0,
        useCORS: true,
        windowHeight: element.scrollHeight, // Capture full height
        logging: true, // Debug in browser console
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    };
  
    // 4. Wait for images/fonts to load
    setTimeout(() => {
      html2pdf()
        .set(options)
        .from(element)
        .save()
        .then(() => {
          document.body.removeChild(tempDiv); // Cleanup
        })
        .catch((error) => {
          console.error('PDF generation failed:', error);
        });
    }, 500); // Increase delay to 1 second
  };


  return (
    <BaseProvider theme={LightTheme}>
      <div style={{display: 'flex', height:'100vh'}}>

        <div style={{flex:1, padding: '20px', borderRight: '1px solid #ccc'}}>
          <h1>Markdown Editor</h1>
          <Textarea
          defaultValue={markdown}
          // onChange={(e)=> setMarkdown(e.target.value)}
          inputRef = {markdownText}
          placeholder='Enter Markdown Here'
          overrides={{
            Input: {
              style: {
                height: '400px', 
                fontSize: '16px',
              },
            },
          }}>
          </Textarea>
          <Button onClick={handleOkClick} style={{ marginTop: '20px' }}>OK</Button>
        </div>

        <div style={{flex:1, padding: '20px'}}>
          <h1>Markdown preview</h1>
          <Block
            ref = {previewRef}
            overrides={{
              Block: {
                style: {
                  // height: '360px',
                  backgroundColor: '#fff',
                  padding: '20px',
                  overflowY: 'auto',
                  color: '#333',
                },
              },
            }}
          >
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Block>
          <Button onClick={handleDownloadPdf} style={{ marginTop: '20px' }}>
            Download PDF
          </Button>
          
        </div>

      </div>
    </BaseProvider>
    
  )
}

export default App
