import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { randomFillSync } from 'crypto';
import { random } from '../src/browser';

// @ts-ignore
global.crypto = {
	getRandomValues(arr) {
		return randomFillSync(arr);
	}
}

test('exports', () => {
	assert.type(random, 'function');
});

test('returns', () => {
	let foo = random(12);
	assert.instance(foo, Uint8Array);
	assert.is(foo.byteLength, 12);
	assert.is(foo.length, 12);
});

test.run();
