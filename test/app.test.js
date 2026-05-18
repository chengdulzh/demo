const assert = require('assert');
const { greet, add } = require('../src/app');

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`  PASS: ${name}`);
        passed++;
    } catch (err) {
        console.error(`  FAIL: ${name}`);
        console.error(`    ${err.message}`);
        failed++;
    }
}

console.log('Running unit tests...\n');

test('greet should return greeting message', () => {
    const result = greet('Jenkins');
    assert.ok(result.includes('Jenkins'), 'Result should include name');
});

test('add should return the sum of two numbers', () => {
    assert.strictEqual(add(1, 2), 3);
    assert.strictEqual(add(-1, 1), 0);
});

test('add should handle zero', () => {
    assert.strictEqual(add(0, 0), 0);
});

console.log(`\nTest results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
    process.exit(1);
}
