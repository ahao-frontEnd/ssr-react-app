import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
// ServerStyleSheet 用于在服务器端收集 styled-components 的样式
import { ServerStyleSheet } from 'styled-components'
import App from './App.jsx';

export const render = async (url) => {
    // 创建一个 ServerStyleSheet 实例
    const sheet = new ServerStyleSheet();

    const appHtml = renderToString(
        sheet.collectStyles(
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        )
    )

    const styleTags = sheet.getStyleTags(); // 获取收集到的样式标签字符串

    return { appHtml, styleTags };
}