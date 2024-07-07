const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const buildDir = path.resolve(__dirname, 'build');
const jsFiles = [];

function getJavaScriptFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      getJavaScriptFiles(filePath);
    } else if (filePath.endsWith('.js')) {
      jsFiles.push(filePath);
    }
  });
}

getJavaScriptFiles(buildDir);

jsFiles.forEach((filePath) => {
  const code = fs.readFileSync(filePath, 'utf8');
  const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 1
  });
  fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode(), 'utf8');
});

console.log('Obfuscation complete.');
