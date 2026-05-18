const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const srcDir = path.join(__dirname, '..', 'src');

console.log('Building project...');

if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const distPath = path.join(distDir, file);
    fs.copyFileSync(srcPath, distPath);
    console.log(`  Copied: ${file}`);
}

const buildInfo = {
    name: 'demo-app',
    version: process.env.APP_VERSION || '1.0.0',
    buildTime: new Date().toISOString(),
    buildNumber: process.env.BUILD_NUMBER || 'local'
};
fs.writeFileSync(
    path.join(distDir, 'build-info.json'),
    JSON.stringify(buildInfo, null, 2)
);

console.log('Build completed successfully.');
console.log('Output directory: dist/');
