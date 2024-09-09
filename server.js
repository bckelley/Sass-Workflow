const express = require('express')
const fs = require('fs')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express()
const port = '3002'

app.use('/dist/css', express.static(path.join(__dirname, 'dist/css')))

app.use('/src/edits', express.static(path.join(__dirname, 'src/edits')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
})

app.get('/api/files', (req, res) => {
    const dirPath = path.join(__dirname, 'src/edits/')
    const exts = '.html'

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error("Error reading directory", err)
            return res.status(500).json({ error: "Could not read the directory" })
        }

        res.json({ files: files })
    })
})

app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true
}))

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})