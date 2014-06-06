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
	"use strict";
	this.name = "Functionality not implemented";
	this.message = message;
}

function EINVAL(message) {
	"use strict";
	this.name = "Not a valid XPM file";
	this.message = message;
}

function XPMNameResolver(name) {
	"use strict";
	/* Dummy resolver */
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function XPMColor(char) {
	"use strict";
	this.char = char;

	var color = {
		's': 'None',
		'c': '',
		'm': '',
		'g': '',
		'g4': ''
	};

	this.s = function(s) {
		"use strict";
		if (typeof s === "undefined") {
			return color.s;
		}
		if (color.s.toLowerCase() !== "none") {
			color.s = s;
		}
	}
	this.c = function(c) {
		"use strict";
		if (typeof c === "undefined") {
			if (color.c !== '') {
				return color.c;
			} else if (color.m !== '') {
				return color.m;
			} else {
				return "rgba(0, 0, 0, 0)";
			}
		}
		if (c.toLowerCase() === "none") {
			return;
		} else if (c[0] !== '#') {
			color.c = XPMNameResolver(c);
		} else { 
			color.c = c;
		}
	}
	this.m = function(m) {
		"use strict";
		if (typeof m === "undefined") {
			if (color.m !== '') {
				return color.m;
			} else if (color.c !== '') {
				return colorToMono(color.c);
			} else {
				return "white";
			}
		}
		if (m !== "black" && m !== "white") {
			throw new EINVAL("Invalid 1-bit monochrome color");
		}
		color.m = m;
	}
	this.g = function(g) {
		"use strict";
		if (typeof g === "undefined") {
			if (color.g !== '') {
				return color.g;
			} else if (color.c !== '') {
				color.g = colorToGrey(color.c);
				return color.g;
			} else if (color.m !== '') {
				return color.m;
			} else {
				return "#FFFFFF";
			}
		}
		if (g.charAt(0) !== '#') {
			throw new EINVAL("Invalid 8-bit grayscale color");
		}
		color.g = g;
	}
	this.g4 = function(g4) {
		"use strict";
		if (typeof g4 === "undefined") {
			if (color.g4 !== '') {
				return color.g4;
			} else {
				return "#FFFFFF";
			}
		}
		if (parseInt(g4.substr(1), 16) % 17 !== 0) {
			throw new EINVAL("Invalid 4-bit grayscale color");
		}
		color.g4 = g4;
	}

	function colorToGrey(color) {
		var r, g, b, c, grey;

		c = parseInt(color.substring(1), 16);
		r = (c >> 16);
		g = (c >> 8 & 255);
		b = (c & 255);
		grey = 0.299 * r + 0.587 * g + 0.114 * b;
		grey = Math.floor(grey).toString(16);
		return '#' + grey + grey + grey;
	}
	function colorToMono(color) {
		var c;

		c = parseInt(color.substring(1), 16);
		if (c > 0x7fffff) {
			return "white";
		} else {
			return "black";
		}
	}
}

function XPMColorMap() {
	"use strict";
	var colors = [];

	this.push = function (xpmcolor) {
		"use strict";
		colors.push(xpmcolor);
	}

	this.find = function (char, colorscheme) {
		"use strict";
		colorscheme = colorscheme || 'c';

		for (var i = 0; i < colors.length; i = i + 1) {
			if (colors[i].char == char) {
				switch (colorscheme) {
				case 's':
					return colors[i].s();
					break;
				case 'c':
					return colors[i].c();
					break;
				case 'm':
					return colors[i].m();
					break;
				case 'g':
					return colors[i].g();
					break;
				case 'g4':
					return colors[i].g4();
					break;
				}
			}
		}
		/* Do something here? */
	}
}

function XPM(width, height, ncolors, cpp) {
	"use strict";
	this.width = width || 0;
	this.height = height || 0;
	this.ncolors = ncolors || 0;
	this.cpp = cpp || 0;
	this.xhotspot = 0;
	this.yhotspot = 0;
	this.name = "";
	this.colors = new XPMColorMap();
	this.lines = [];
	this.canvas = document.createElement('canvas');
}

XPM.prototype.addColor = function (color) {
	"use strict";
	this.colors.push(color);
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
	var ss, color, y, x, ctx;

	this.canvas.width = this.width;
	this.canvas.height = this.height;

	ctx = this.canvas.getContext('2d');
	for (y = 0; y < this.lines.length; y = y + 1) {
		for (x = 1; x < this.lines[y].length; x = x + 1) {
			ss = this.lines[y].substring((x - 1) * this.cpp,
			    x * this.cpp);
			color = this.colors.find(ss, colorscheme);
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
	var a = [];

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
			var chars, color;

			line = line.substr(line.indexOf('"') + 1,
			    line.lastIndexOf('"') - 1);

			chars = line.substr(0, this.cpp);
			line = line.substr(this.cpp);
			line = line.replace(/\s+/g, ' ').trim();

			color = new XPMColor(chars);

			a = line.split(' ');
			for (var i = 0; i < a.length; i = i + 2) {
				if (a[i] == 'c') {
					color.c(a[i + 1]);
				} else if (a[i] === 'm') {
					color.m(a[i + 1]);
				} else if (a[i] === 's') {
					color.s(a[i + 1]);
				} else if (a[i] === 'g') {
					color.g(a[i + 1]);
				} else if (a[i] === 'g4') {
					color.g4(a[i + 1]);
				} else {
					throw EINVAL("Color key " + a[i + 1]);
				}
			}

			this.addColor(color);

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

