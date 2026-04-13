import React from 'react';
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

const root = document.getElementById('root');

// hydrateRoot 用于将 React 组件挂载到已经由服务器渲染好的 HTML 上
hydrateRoot(
    root,
    <BrowserRouter>
        <App />
    </BrowserRouter>
)