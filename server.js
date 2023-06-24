const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// APIへのリクエストをプロキシする

app.use(
    '/sr_info_parsed',
    createProxyMiddleware({
        target: 'https://api.mihomo.me/sr_info_parsed',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
            '^/sr_info_parsed': ''
        }
    })
);

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'dist')));

// 全てのルートに対してindex.htmlを返す
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ポート番号の指定
const port = process.env.PORT || 80;

// サーバーの起動
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
