const http = require('http');

const PORT = process.env.PORT || 3000;

function greet(name) {
    return `Hello, ${name}! Welcome to Jenkins Pipeline Demo.`;
}

function add(a, b) {
    return a + b;
}

if (require.main === module) {
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(greet('World'));
    });

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = { greet, add };
