import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { randomFillSync } from 'crypto';
import { random } from '../src/browser';

// @ts-ignore
global.crypto = {
	getRandomValues(arr) {
		if (arr.byteLength > 65536) {
			throw new Error('QuotaExceededError');
		}
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

test('quota boundary and empty requests', () => {
	assert.is(random(0).length, 0);
	assert.is(random(65536).length, 65536);
});

test('requests exceeding one WebCrypto allocation', () => {
	for (const length of [65537, 131072, 131073]) {
		const value = random(length);
		assert.instance(value, Uint8Array);
		assert.is(value.length, length);
	}
});

test('fills every requested byte across allocation boundaries', () => {
	const original = global.crypto.getRandomValues;
	global.crypto.getRandomValues = arr => {
		assert.ok(arr.byteLength <= 65536);
		arr.fill(165);
		return arr;
	};
	try {
		const value = random(131073);
		assert.is(value.length, 131073);
		for (const byte of value) assert.is(byte, 165);
	} finally {
		global.crypto.getRandomValues = original;
	}
});

test.run();
