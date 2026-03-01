const fs = require('fs');

const data = JSON.parse(fs.readFileSync('eslint-json.json', 'utf8'));
const errors = [];

data.forEach(file => {
    if (file.errorCount > 0) {
        file.messages.forEach(msg => {
            if (msg.severity === 2) {
                errors.push(`${file.filePath}:${msg.line}:${msg.column} - ${msg.message} (${msg.ruleId})`);
            }
        });
    }
});

fs.writeFileSync('parsed-errors.txt', errors.join('\n'));
console.log('Errors parsed');