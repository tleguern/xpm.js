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

function XPM(width, height, colors, nchar) {
	"use strict";
	this.width = parseInt(width, 10);
	this.height = parseInt(height, 10);
	this.colors = parseInt(colors, 10);
	this.nchar = parseInt(nchar, 10);
	this.canvas.width = width;
	this.canvas.height = height;
	this.lines = 0;
}

XPM.prototype.width = 0;
XPM.prototype.height = 0;
XPM.prototype.colors = 0;
XPM.prototype.nchar = 0;
XPM.prototype.colormap = [];
XPM.prototype.canvas = document.createElement('canvas');
XPM.prototype.lines = 0;

XPM.prototype.addColor = function (ch, color) {
	"use strict";
	if (color === "None") {
		this.colormap[ch] = "rgba(0, 0, 0, 0)";
	} else {
		this.colormap[ch] = color;
	}
}

XPM.prototype.addLine = function (line) {
	"use strict";
	var i, ctx;

	ctx = this.canvas.getContext('2d');
	for (i = 0; i < line.length; i = i + 1) {
		ctx.fillStyle = this.colormap[line[i]];
		ctx.fillRect(i, this.lines, this.nchar, 1);
	}
	this.lines = this.lines + 1;
}

XPM.prototype.create = function () {
	"use strict";
	if (this.lines - 1 !== this.height) {
		console.warn("Bad height");
	}
	return this.canvas;
}

