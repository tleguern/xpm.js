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
}

XPM.prototype.width = 0;
XPM.prototype.height = 0;
XPM.prototype.colors = 0;
XPM.prototype.chars = 0;
XPM.prototype.xhotspot = 0;
XPM.prototype.yhotspot = 0;
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

XPM.prototype.addColor = function (chars, color, key) {
	"use strict";
	var default_color = "rgba(0, 0, 0, 0)";
	key = key || "c";

	if (color === "None" || color === "none") {
		this.colormap[chars] = default_color;
	} else if (typeof(XPM.prototype.nameResolver) != "undefined") {
		var ret = this.nameResolver(color);
		this.colormap[chars] = ret == null ? default_color : ret;
	} else {
		this.colormap[chars] = color;
	}
}

XPM.prototype.addLine = function (line) {
	"use strict";
	var i, ctx;

	ctx = this.canvas.getContext('2d');
	for (i = 1; i < line.length; i = i + 1) {
		var ss = line.substring((i - 1) * this.chars, i * this.chars);
		var color = this.colormap[ss];
		ctx.fillStyle = color;
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

XPM.prototype.load = function (buffer) {
	"use strict";
	var lastPos, section, offset, line, pos;
	var colors, lines;

	lastPos = section = offset = 0;
	colors = lines = 0;
	do {
		pos = buffer.indexOf('\n', lastPos);
		if (buffer[pos - 1] === '\r') {
			offset = 1;
		}
		if (pos === 0) {
			pos = buffer.length;
		}
		line = buffer.substr(lastPos, pos - lastPos);
		pos = pos + 1;
		lastPos = pos;

		/* TODO: Multi-line comments */
		if (section > 0 && line.substr(0, 2) === "/*"
		    && line.substr(line.length - 2, line.length) === "*/") {
			continue;
		}

		switch(section) {
		case 0: {
			if (line !== "/* XPM */") {
				throw "Not a valid XPM file - section 1";
			} else {
				section = 1;
			}
			break;
		}
		case 1: {
			/* TODO: Check for a correct C struct */
			if (line[line.length - 1] !== '{') {
				throw "Not a valid XPM file - section 2";
			} else {
				section = 2;
			}
			break;
		}
		case 2:	/* <Values> */ {
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
				this.colors = parseInt(a[2], 10);
			} else {
				throw "Invalid <Values> line: ncolors";
			}
			if (a[3]) {
				this.chars = parseInt(a[3], 10);
			} else {
				throw "Invalid <Values> line: cpp";
			}

			this.canvas.width = this.width;
			this.canvas.height = this.height;

			if (a[4] && a[5]) {
				this.xhotspot =  parseInt(a[4], 10);
				this.yhotspot =  parseInt(a[5], 10);
			} else if (a[4] && a[4] === "XPMEXT") {
				throw "XPMEXT is not implemented";
			}
			
			section = 3;
			break;
		}
		case 3:	/* <Colors> */ {
			/*
			 * TODO: - Handle 'm', 'g' and 'g4' keys;
			 *       - Parse color value;
			 */
			var key, val, chars, cit;

			line = line.substr(line.indexOf('"') + 1,
			    line.lastIndexOf('"') - 1);

			chars = line.substr(0, this.chars);
			line = line.substr(this.chars);
			line = line.replace(/\s+/g, ' ').trim();

			cit = Iterator(line.split(' '));
			for (key in cit) {
				val = cit.next();
				if (key[1] == 'c') {
					this.addColor(chars, val[1]);
				} else {
					console.warn("Not implemented: "
					    + key[1]);
				}
			}

			colors = colors + 1;
			if (this.colors === colors) {
				section = 4;
			}
			break;
		}
		case 4:	/* <Pixels> */ {
			/* TODO: error and cleanup checks */
			line = line.substr(line.indexOf('"') + 1,
			    line.lastIndexOf('"') - 1);

			this.addLine(line);

			lines = lines + 1;
			if (this.height === lines) {
				section = 5;
			}
			break;
		}
		case 5: /* <Extensions> */ {
			/* TODO */
			section = -1;
			break;
		}
		case -1:
			return;
		default:
			throw "Not a valid XPM file";
		}
	} while (pos !== buffer.length);
}

