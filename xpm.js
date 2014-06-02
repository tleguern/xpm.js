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

function XPM() {
	"use strict";
	this.canvas.width = 0;
	this.canvas.height = 0;
}

XPM.prototype.width = 0;
XPM.prototype.height = 0;
XPM.prototype.colors = 0;
XPM.prototype.chars = 0;
XPM.prototype.colormap = [];
XPM.prototype.canvas = document.createElement('canvas');
XPM.prototype.lines = 0;

XPM.prototype.raw = function (width, height, colors, chars) {
	this.width = parseInt(width, 10);
	this.height = parseInt(height, 10);
	this.colors = parseInt(colors, 10);
	this.chars = parseInt(chars, 10);
	this.canvas.width = this.width;
	this.canvas.height = this.height;

}

XPM.prototype.addColor = function (char, color) {
	"use strict";
	var default_color = "rgba(0, 0, 0, 0)";

	if (color === "None") {
		this.colormap[char] = default_color;
	} else if (typeof(XPM.prototype.nameResolver) != "undefined") {
		var ret = this.nameResolver(color);
		this.colormap[char] = ret == null ? default_color : ret;
	} else {
		this.colormap[char] = color;
	}
}

XPM.prototype.addLine = function (line) {
	"use strict";
	var i, ctx;

	ctx = this.canvas.getContext('2d');
	for (i = 1; i < line.length; i = i + 1) {
		var sc = line.substring((i - 1) * this.chars, i * this.chars);
		ctx.fillStyle = this.colormap[sc];
		ctx.fillRect(i, this.lines, 1, 1);
	}
	this.lines = this.lines + 1;
}

XPM.prototype.draw = function () {
	"use strict";
	if (this.lines !== this.height) {
		console.warn("Badly constructed XPM file -- wrong height");
	}
	if (this.colors !== Object.keys(this.colormap).length) {
		console.warn("Badly constructed XPM file -- wrong number of colors");
	}
	return this.canvas;
}

