import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App';
import ChatProvider from './context/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <ChatProvider>
        <App />
    </ChatProvider>
  </ChakraProvider>
);


