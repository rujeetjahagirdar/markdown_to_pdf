import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';

const engine = new Styletron();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider>
        <App />
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>
);