/*
 * jslint browser: true, devel: true, continue: true, todo: true,
 * indent: 8, maxlen: 80
 */

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
}

XPM.prototype.width = 0;
XPM.prototype.height = 0;
XPM.prototype.ncolors = 0;
XPM.prototype.cpp = 0;
XPM.prototype.xhotspot = 0;
XPM.prototype.yhotspot = 0;
XPM.prototype.colormap = [];
XPM.prototype.monomap = [];
XPM.prototype.canvas = document.createElement('canvas');
XPM.prototype.nlines = 0;
XPM.prototype.lines = [];

XPM.prototype.raw = function (width, height, ncolors, cpp) {
	"use strict";

	this.width = parseInt(width, 10);
	this.height = parseInt(height, 10);
	this.ncolors = parseInt(ncolors, 10);
	this.cpp = parseInt(cpp, 10);
	this.canvas.width = this.width;
	this.canvas.height = this.height;
};

XPM.prototype.addColor = function (chars, color) {
	"use strict";
	var c, default_color = "rgba(0, 0, 0, 0)";

	if (color.c) {
		if (color.c.toLowerCase() === "none") {
			this.colormap[chars] = default_color;
		} else if (typeof(XPM.prototype.nameResolver) !== "undefined") {
			c = this.nameResolver(color.c);
			this.colormap[chars] = c === null ? default_color : c;
		} else {
			this.colormap[chars] = color.c;
		}
	} else if (color.m) {
		if (color.m.toLowerCase !== "black"
		    && color.m.toLowerCase !== "white") {
			throw "Not a valid XPM file - Invalid monochrome color";
		}
		this.monomap[chars] = color.m;
	}
};

XPM.prototype.addLine = function (line) {
	"use strict";

	this.nlines = this.nlines + 1;
	this.lines.push(line);
};

XPM.prototype.draw = function (colorscheme) {
	"use strict";
	var ss, color, colormap, y, x, ctx;
	colorscheme = colorscheme || "c";

	if (colorscheme.toLowerCase() == "m") {
		colormap = this.monomap;
	} else {
		colormap = this.colormap;
	}

	ctx = this.canvas.getContext('2d');
	for (y = 0; y < this.lines.length; y = y + 1) {
		for (x = 1; x < this.lines[y].length; x = x + 1) {
			ss = this.lines[y].substring((x - 1) * this.cpp,
			    x * this.cpp);
			color = colormap[ss];
			ctx.fillStyle = color;
			ctx.fillRect(x, y, 1, 1);
		}
	}
	return this.canvas;
};

XPM.prototype.load = function (buffer) {
	"use strict";
	var lastPos, section, offset, line, pos, ncolors, lines;

	lastPos = section = offset = ncolors = lines = 0;
	do {
		pos = buffer.indexOf('\n', lastPos);
		if (buffer[pos - 1] === '\r') {
			offset = 1;
		}
		if (pos === 0) {
			pos = buffer.length;
		}
		line = buffer.substr(lastPos, pos - lastPos - offset);
		pos = pos + 1;
		lastPos = pos;

		/* TODO: Multi-line comments */
		if (section > 0 && line.substr(0, 2) === "/*"
		    && line.substr(line.length - 2, line.length) === "*/") {
			continue;
		}

		switch (section) {
		case 0:
			if (line !== "/* XPM */") {
				throw "Not a valid XPM file - section 1";
			}
			section = 1;
			break;
		case 1:
			/* TODO: Check for a correct C struct */
			if (line[line.length - 1] !== '{') {
				throw "Not a valid XPM file - section 2";
			}
			section = 2;
			break;
		case 2:	/* <Values> */
			var a;

			line = line.substr(line.indexOf('"') + 1,
			    line.lastIndexOf('"') - 1);
			line = line.replace(/\s+/g, ' ').trim();

			a = line.split(' ');
			if (a[0]) {
				this.width = parseInt(a[0], 10);
			} else {
				throw "Invalid <Values> line: width";
			}
			if (a[1]) {
				this.height = parseInt(a[1], 10);
			} else {
				throw "Invalid <Values> line: height";
			}
			if (a[2]) {
				this.ncolors = parseInt(a[2], 10);
			} else {
				throw "Invalid <Values> line: ncolors";
			}
			if (a[3]) {
				this.cpp = parseInt(a[3], 10);
			} else {
				throw "Invalid <Values> line: cpp";
			}

			this.canvas.width = this.width;
			this.canvas.height = this.height;

			if (a[4] && a[5]) {
				this.xhotspot =  parseInt(a[4], 10);
				this.yhotspot =  parseInt(a[5], 10);
			} else if (a[4] && a[4] === "XPMEXT") {
				throw "Not implemented";
			}
			
			section = 3;
			break;
		case 3:	/* <Colors> */
			/*
			 * TODO: - Handle 'm', 'g' and 'g4' keys;
			 *       - Parse color value;
			 */
			var key, val, chars, cit;
			var map = [];

			line = line.substr(line.indexOf('"') + 1,
			    line.lastIndexOf('"') - 1);

			chars = line.substr(0, this.cpp);
			line = line.substr(this.cpp);
			line = line.replace(/\s+/g, ' ').trim();

			cit = Iterator(line.split(' '));
			for (key in cit) {
				val = cit.next();
				if (key[1] == 'c') {
					map.c = val[1];
				} else if (key[1] === 'm') {
					map.m = val[1];
				} else if (key[1] === 's') {
					map.s = val[1];
				} else if (key[1] === 'g') {
					map.g = val[1];
				} else if (key[1] === 'g4') {
					map.g4 = val[1];
				} else {
					throw "Not implemented";
				}
			}
			this.addColor(chars, map);

			ncolors = ncolors + 1;
			if (this.ncolors === ncolors) {
				section = 4;
			}
			break;
		case 4:	/* <Pixels> */
			line = line.substr(line.indexOf('"') + 1,
			    line.lastIndexOf('"') - 1);

			if (line.length / this.cpp !== this.width) {
				throw "Not a valid XPM file - invalid line";
			}

			this.addLine(line);

			lines = lines + 1;
			if (this.height === lines) {
				section = 5;
			}
			break;
		case 5: /* <Extensions> */
			/* TODO */
			section = -1;
			break;
		case -1:
			return;
		default:
			throw "Not a valid XPM file";
		}
	} while (pos !== buffer.length);
};

