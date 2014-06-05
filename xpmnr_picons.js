/* jslint browser: true, devel: true, indent: 8, maxlen: 80 */

/*
 * Copyright (c) 2014 Tristan Le Guern <tleguern@bouledef.eu>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

function XPMNameResolver(name) {
	"use strict";
	if (name in PiconsToHex) {
		return PiconsToHex[name];
	}
	return null;
}

PiconsToHex = {
	'black': '#000000',
	'dark slate grey': '#2F4F4F',
	'slate grey': '#708090',
	'grey': '#BEBEBE',
	'gainsboro': '#DCDCDC',
	'white': '#FFFFFF',
	'navy': '#000080',
	'blue': '#0000FF',
	'dodger blue': '#1E90FF',
	'sky blue': '#87CEEB',
	'lavender': '#E6E6FA',
	'sea green': '#2E8B57',
	'lime green': '#32CD32',
	'green': '#00FF00',
	'pale green': '#98FB98',
	'violet': '#EE82EE',
	'magenta': '#FF00FF',
	'purple': '#A020F0',
	'cyan': '#00FFFF',
	'sienna': '#A0522D',
	'peru': '#CD853F',
	'orange': '#FFA500',
	'gold': '#FFD700',
	'yellow': '#FFFF00',
	'tan': '#D2B48C',
	'wheat': '#F5DEB3',
	'lemon chiffon': '#FFFACD',
	'firebrick': '#B22222',
	'red': '#FF0000',
	'tomato': '#FF6347'
};

