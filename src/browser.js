export function random(len) {
	var array = new Uint8Array(len), i=0;
	if (array.length <= 65536) return crypto.getRandomValues(array);
	for (; i < array.length; i += 65536) {
		crypto.getRandomValues(array.subarray(i, i + 65536));
	}
	return array;
}
