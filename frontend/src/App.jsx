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
  const markdownContainerRef = useRef(null);
  
  const handleOkClick = () => {
    const value = markdownText.current.value;
    setMarkdown(value);
  };

  const handleDownloadPdf = () => {
    const element2 = markdownContainerRef.current;
    console.log(element2);
  

    const options = {
      margin: [10, 10],
      filename: 'markdown-preview.pdf',
      html2canvas: {
        scale: 2,
        scrollY: 0,
        useCORS: true,
        windowHeight: element2.scrollHeight,
        logging: true, 
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    };
  
    setTimeout(() => {
      html2pdf()
        .set(options)
        .from(element2)
        .save()
        .catch((error) => {
          console.error('PDF generation failed:', error);
        });
    }, 500);
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
                  height: '360px',
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


          <div style={{position: 'absolute', left: '-9999px', top: '0'}}>
          <Block
            ref = {markdownContainerRef}
            overrides={{
              Block: {
                style: {
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
          </div>

        </div>

      </div>
    </BaseProvider>
    
  )
}

export default App
