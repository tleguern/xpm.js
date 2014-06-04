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

function ENOSUPPORT(message) {
	this.name = "Functionality not implemented";
	this.message = message;
}

function EINVAL(message) {
	this.name = "Not a valid XPM file";
	this.message = message;
}

function XPM() {
	"use strict";
}

XPM.prototype.width = 0;
XPM.prototype.height = 0;
XPM.prototype.ncolors = 0;
XPM.prototype.cpp = 0;
XPM.prototype.xhotspot = 0;
XPM.prototype.yhotspot = 0;
XPM.prototype.name = "";
XPM.prototype.colormap = [];
XPM.prototype.monomap = [];
XPM.prototype.greymap = [];
XPM.prototype.greymap4bits = [];
XPM.prototype.canvas = document.createElement('canvas');
XPM.prototype.lines = [];

XPM.prototype.raw = function (width, height, ncolors, cpp) {
	"use strict";

	if (width <= 0 || height <= 0 || ncolors <= 0 || cpp <= 0) {
		throw new EINVAL("Ridiculous parameters");
	}

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
	}
	if (color.m) {
		if (color.m.toLowerCase() !== "black"
		    && color.m.toLowerCase() !== "white") {
			throw new EINVAL("Invalid 1-bit monochrome color");
		}
		this.monomap[chars] = color.m;
	}
	if (color.g4) {
		if (color.g4.charAt(0) !== '#'
		    || parseInt(color.g4.substr(1), 16) % 17 !== 0) {
			throw new EINVAL("Invalid 4-bit grayscale color");
		}
		this.greymap4bits[chars] = color.g4;
	}
	if (color.g) {
		if (color.g.charAt(0) !== '#') {
			throw new EINVAL("Invalid 8-bit grayscale color");
		}
		this.greymap[chars] = color.g;
	}
};

XPM.prototype.addLine = function (line) {
	"use strict";

	if (line.length / this.cpp > this.width) {
		throw EINVAL("Line too long");
	} else if (line.length / this.cpp < this.width) {
		throw EINVAL("Line too short");
	}

	this.lines.push(line);
};

XPM.prototype.draw = function (colorscheme) {
	"use strict";
	var ss, color, colormap, y, x, ctx;

	if (typeof(colorscheme) === undefined) {
		if (Object.keys(this.colormap).length !== 0) {
			colormap = this.colormap;
		} else if (Object.keys(this.monomap).length !== 0) {
			colormap = this.monomap;
		} else if (Object.keys(this.greymap).length !== 0) {
			colormap = this.greymap;
		} else if (Object.keys(this.greymap4bits).length !== 0) {
			colormap = this.greymap4bits;
		} else {
			throw new EINVAL("No colorscheme available");
		}
	} else {
		if (colorscheme.toLowerCase() == "m") {
			colormap = this.monomap;
		} else if (colorscheme.toLowerCase() == "g") {
			colormap = this.greymap;
		} else if (colorscheme.toLowerCase() == "g4") {
			colormap = this.greymap4bits;
		} else if (colorscheme.toLowerCase() == "c") {
			colormap = this.colormap;
		} else {
			throw new EINVAL("Invalid colorscheme");
		}
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
	this.canvas.name = this.name;
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
				throw new EINVAL("Missing XPM comment");
			}
			section = 1;
			break;
		case 1:
			if (line.lastIndexOf('{') === -1
			    || line.lastIndexOf('*') === -1
			    || line.lastIndexOf('[') === -1
			    || line.lastIndexOf(']') === -1) {
				throw new EINVAL("Missing C struct");
			}
			if (line.substr(0, line.indexOf('*')).trim()
			    !== "static char") {
				throw new EINVAL("Wrong C struct");
			}
			this.name = line.substr(line.indexOf('*') + 1,
			    line.indexOf('[') - line.indexOf('*') - 1).trim();

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
				throw new EINVAL("Invalid width");
			}
			if (a[1]) {
				this.height = parseInt(a[1], 10);
			} else {
				throw new EINVAL("Invalid height");
			}
			if (a[2]) {
				this.ncolors = parseInt(a[2], 10);
			} else {
				throw new EINVAL("Invalid ncolors");
			}
			if (a[3]) {
				this.cpp = parseInt(a[3], 10);
			} else {
				throw new EINVAL("Invalid cpp");
			}

			this.canvas.width = this.width;
			this.canvas.height = this.height;

			if (a[4] && a[5]) {
				this.xhotspot =  parseInt(a[4], 10);
				this.yhotspot =  parseInt(a[5], 10);
			} else if (a[4] && a[4] === "XPMEXT") {
				throw ENOSUPPORT("XPMEXT");
			}
			
			section = 3;
			break;
		case 3:	/* <Colors> */
			/*
			 * TODO: - Parse color value;
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
					throw EINVAL("Color key " + val[1]);
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
			throw EINVAL("Extra garbage at end of file");
		}
	} while (pos !== buffer.length);
};

