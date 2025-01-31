import React, { useState, useRef } from 'react';
import { BaseProvider, LightTheme } from 'baseui';
import { Button } from 'baseui/button';
import { Textarea } from "baseui/textarea";
import {Block} from 'baseui/block';
import ReactMarkdown from 'react-markdown';

function App() {
  const [markdown, setMarkdown] = useState('# Hello, Markdown!');
  const markdownText = useRef('# Hello, Markdown!');
  
  const handleOkClick = () => {
    const value = markdownText.current.value;
    setMarkdown(value);
  }

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
          <Button onClick={handleOkClick}>OK</Button>
        </div>

        <div style={{flex:1, padding: '20px'}}>
          <h1>Markdown preview</h1>
          <Block
            overrides={{
              Block: {
                style: {
                  height: '360px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
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
    </BaseProvider>
    
  )
}

export default App
