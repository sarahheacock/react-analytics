const express = require('express');
const app = express();
const sockjs = require('sockjs');
const chokidar = require('chokidar');
const path = require('path');
const http = require('http');

const watch = (conn) => {
    chokidar.watch(path.resolve(__dirname, '../build')).on('all', (event, path) => {
        console.log(event, path);
        if (event === 'change') {
            conn.write(event);
        }
    });
}

const connect = (echo) => {
    echo.on('connection', (conn) => {
        watch(conn);

        conn.on('data', function(message) {
            conn.write(message);
        });
        conn.on('close', function() {});
    });
}

app.get('/', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../build/panel.html'));
});

app.get('/panel.js', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../build/panel.js'));
});

app.get('/reload.js', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../build/reload.js'));
});

app.get('/sock.js', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../build/sock.js'));
});

const port = 3000;
const echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
const server = http.createServer(app);
echo.installHandlers(server, { prefix:'/echo' });

server.listen(port, '127.0.0.1', () => {
    connect(echo);
    console.log(`App listening on port ${port}`);
})