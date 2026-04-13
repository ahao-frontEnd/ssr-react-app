const exprees = require('express');
const { createServer: createViteServer } = require('vite');
const fs = require('node:fs');
const path = require('node:path');

const createServer = async () => {
    // 创建一个 express 实例
    const app = exprees();

    // 创建 vite 服务
    const vite = await createViteServer({
        server: { middlewareMode: true }, // 将 Vite 作为中间件使用
        appType: 'custom', // 以自定义模式启动 Vite, 表示 Vite 不会自动加载 index.html
    });

    app.use(vite.middlewares); // 将 Vite 的中间件挂载到 Express 上

    // 处理所有请求
    app.use('*', async (req, res) => {
        const url = req.originalUrl; // 获取请求的 URL
        console.log('请求的 URL: ', url);

        // 读取 index.html 文件
        let template = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');

        // ssrLoadModule - 加载一个模块，并且让 Vite 处理它（例如转换、编译、缓存等）
        const { render } = await vite.ssrLoadModule(
            path.resolve(__dirname, '../app/server.jsx')
        )

        // 根据 url，调用 render 函数，得到 appHtml
        const { appHtml, styleTags } = await render(url); 

        // 将 appHtml 注入到 template 中
        const html = template.replace(`<!--app-html-->`, appHtml);
        // 将样式标签注入到 template 中
        const htmlWithStyles = html.replace(`<!--style-tags-->`, styleTags);

        // 将 html 响应给客户端
        res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlWithStyles);
    });

    // 启动服务器
    app.listen(3000, () => {
        console.log('服务器已启动，访问 http://localhost:3000');
    });
};

createServer();