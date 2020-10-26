import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { random } from '../src/node';

test('exports', () => {
	assert.type(random, 'function');
});

test('returns', () => {
	let foo = random(12);
	assert.instance(foo, Buffer);
	assert.is(foo.byteLength, 12);
	assert.is(foo.length, 12);
});

test.run();
