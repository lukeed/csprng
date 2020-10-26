import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { random } from '../src/browser';

test('exports', () => {
	assert.type(random, 'function');
});

test.run();
