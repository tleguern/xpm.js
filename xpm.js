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
	} else if (color in this.X11NameToHex) {
		this.colormap[ch] = this.X11NameToHex[color];
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

/* Generated with misc/rgb2js */
XPM.prototype.X11NameToHex = {
	'snow': 'rgba(255, 250, 250, 1)',
	'ghost white': 'rgba(248, 248, 255, 1)',
	'GhostWhite': 'rgba(248, 248, 255, 1)',
	'white smoke': 'rgba(245, 245, 245, 1)',
	'WhiteSmoke': 'rgba(245, 245, 245, 1)',
	'gainsboro': 'rgba(220, 220, 220, 1)',
	'floral white': 'rgba(255, 250, 240, 1)',
	'FloralWhite': 'rgba(255, 250, 240, 1)',
	'old lace': 'rgba(253, 245, 230, 1)',
	'OldLace': 'rgba(253, 245, 230, 1)',
	'linen': 'rgba(250, 240, 230, 1)',
	'antique white': 'rgba(250, 235, 215, 1)',
	'AntiqueWhite': 'rgba(250, 235, 215, 1)',
	'papaya whip': 'rgba(255, 239, 213, 1)',
	'PapayaWhip': 'rgba(255, 239, 213, 1)',
	'blanched almond': 'rgba(255, 235, 205, 1)',
	'BlanchedAlmond': 'rgba(255, 235, 205, 1)',
	'bisque': 'rgba(255, 228, 196, 1)',
	'peach puff': 'rgba(255, 218, 185, 1)',
	'PeachPuff': 'rgba(255, 218, 185, 1)',
	'navajo white': 'rgba(255, 222, 173, 1)',
	'NavajoWhite': 'rgba(255, 222, 173, 1)',
	'moccasin': 'rgba(255, 228, 181, 1)',
	'cornsilk': 'rgba(255, 248, 220, 1)',
	'ivory': 'rgba(255, 255, 240, 1)',
	'lemon chiffon': 'rgba(255, 250, 205, 1)',
	'LemonChiffon': 'rgba(255, 250, 205, 1)',
	'seashell': 'rgba(255, 245, 238, 1)',
	'honeydew': 'rgba(240, 255, 240, 1)',
	'mint cream': 'rgba(245, 255, 250, 1)',
	'MintCream': 'rgba(245, 255, 250, 1)',
	'azure': 'rgba(240, 255, 255, 1)',
	'alice blue': 'rgba(240, 248, 255, 1)',
	'AliceBlue': 'rgba(240, 248, 255, 1)',
	'lavender': 'rgba(230, 230, 250, 1)',
	'lavender blush': 'rgba(255, 240, 245, 1)',
	'LavenderBlush': 'rgba(255, 240, 245, 1)',
	'misty rose': 'rgba(255, 228, 225, 1)',
	'MistyRose': 'rgba(255, 228, 225, 1)',
	'white': 'rgba(255, 255, 255, 1)',
	'black': 'rgba(0, 0, 0, 1)',
	'dark slate gray': 'rgba(47, 79, 79, 1)',
	'DarkSlateGray': 'rgba(47, 79, 79, 1)',
	'dark slate grey': 'rgba(47, 79, 79, 1)',
	'DarkSlateGrey': 'rgba(47, 79, 79, 1)',
	'dim gray': 'rgba(105, 105, 105, 1)',
	'DimGray': 'rgba(105, 105, 105, 1)',
	'dim grey': 'rgba(105, 105, 105, 1)',
	'DimGrey': 'rgba(105, 105, 105, 1)',
	'slate gray': 'rgba(112, 128, 144, 1)',
	'SlateGray': 'rgba(112, 128, 144, 1)',
	'slate grey': 'rgba(112, 128, 144, 1)',
	'SlateGrey': 'rgba(112, 128, 144, 1)',
	'light slate gray': 'rgba(119, 136, 153, 1)',
	'LightSlateGray': 'rgba(119, 136, 153, 1)',
	'light slate grey': 'rgba(119, 136, 153, 1)',
	'LightSlateGrey': 'rgba(119, 136, 153, 1)',
	'gray': 'rgba(190, 190, 190, 1)',
	'grey': 'rgba(190, 190, 190, 1)',
	'light grey': 'rgba(211, 211, 211, 1)',
	'LightGrey': 'rgba(211, 211, 211, 1)',
	'light gray': 'rgba(211, 211, 211, 1)',
	'LightGray': 'rgba(211, 211, 211, 1)',
	'midnight blue': 'rgba(25, 25, 112, 1)',
	'MidnightBlue': 'rgba(25, 25, 112, 1)',
	'navy': 'rgba(0, 0, 128, 1)',
	'navy blue': 'rgba(0, 0, 128, 1)',
	'NavyBlue': 'rgba(0, 0, 128, 1)',
	'cornflower blue': 'rgba(100, 149, 237, 1)',
	'CornflowerBlue': 'rgba(100, 149, 237, 1)',
	'dark slate blue': 'rgba(72, 61, 139, 1)',
	'DarkSlateBlue': 'rgba(72, 61, 139, 1)',
	'slate blue': 'rgba(106, 90, 205, 1)',
	'SlateBlue': 'rgba(106, 90, 205, 1)',
	'medium slate blue': 'rgba(123, 104, 238, 1)',
	'MediumSlateBlue': 'rgba(123, 104, 238, 1)',
	'light slate blue': 'rgba(132, 112, 255, 1)',
	'LightSlateBlue': 'rgba(132, 112, 255, 1)',
	'medium blue': 'rgba(0, 0, 205, 1)',
	'MediumBlue': 'rgba(0, 0, 205, 1)',
	'royal blue': 'rgba(65, 105, 225, 1)',
	'RoyalBlue': 'rgba(65, 105, 225, 1)',
	'blue': 'rgba(0, 0, 255, 1)',
	'dodger blue': 'rgba(30, 144, 255, 1)',
	'DodgerBlue': 'rgba(30, 144, 255, 1)',
	'deep sky blue': 'rgba(0, 191, 255, 1)',
	'DeepSkyBlue': 'rgba(0, 191, 255, 1)',
	'sky blue': 'rgba(135, 206, 235, 1)',
	'SkyBlue': 'rgba(135, 206, 235, 1)',
	'light sky blue': 'rgba(135, 206, 250, 1)',
	'LightSkyBlue': 'rgba(135, 206, 250, 1)',
	'steel blue': 'rgba(70, 130, 180, 1)',
	'SteelBlue': 'rgba(70, 130, 180, 1)',
	'light steel blue': 'rgba(176, 196, 222, 1)',
	'LightSteelBlue': 'rgba(176, 196, 222, 1)',
	'light blue': 'rgba(173, 216, 230, 1)',
	'LightBlue': 'rgba(173, 216, 230, 1)',
	'powder blue': 'rgba(176, 224, 230, 1)',
	'PowderBlue': 'rgba(176, 224, 230, 1)',
	'pale turquoise': 'rgba(175, 238, 238, 1)',
	'PaleTurquoise': 'rgba(175, 238, 238, 1)',
	'dark turquoise': 'rgba(0, 206, 209, 1)',
	'DarkTurquoise': 'rgba(0, 206, 209, 1)',
	'medium turquoise': 'rgba(72, 209, 204, 1)',
	'MediumTurquoise': 'rgba(72, 209, 204, 1)',
	'turquoise': 'rgba(64, 224, 208, 1)',
	'cyan': 'rgba(0, 255, 255, 1)',
	'light cyan': 'rgba(224, 255, 255, 1)',
	'LightCyan': 'rgba(224, 255, 255, 1)',
	'cadet blue': 'rgba(95, 158, 160, 1)',
	'CadetBlue': 'rgba(95, 158, 160, 1)',
	'medium aquamarine': 'rgba(102, 205, 170, 1)',
	'MediumAquamarine': 'rgba(102, 205, 170, 1)',
	'aquamarine': 'rgba(127, 255, 212, 1)',
	'dark green': 'rgba(0, 100, 0, 1)',
	'DarkGreen': 'rgba(0, 100, 0, 1)',
	'dark olive green': 'rgba(85, 107, 47, 1)',
	'DarkOliveGreen': 'rgba(85, 107, 47, 1)',
	'dark sea green': 'rgba(143, 188, 143, 1)',
	'DarkSeaGreen': 'rgba(143, 188, 143, 1)',
	'sea green': 'rgba(46, 139, 87, 1)',
	'SeaGreen': 'rgba(46, 139, 87, 1)',
	'medium sea green': 'rgba(60, 179, 113, 1)',
	'MediumSeaGreen': 'rgba(60, 179, 113, 1)',
	'light sea green': 'rgba(32, 178, 170, 1)',
	'LightSeaGreen': 'rgba(32, 178, 170, 1)',
	'pale green': 'rgba(152, 251, 152, 1)',
	'PaleGreen': 'rgba(152, 251, 152, 1)',
	'spring green': 'rgba(0, 255, 127, 1)',
	'SpringGreen': 'rgba(0, 255, 127, 1)',
	'lawn green': 'rgba(124, 252, 0, 1)',
	'LawnGreen': 'rgba(124, 252, 0, 1)',
	'green': 'rgba(0, 255, 0, 1)',
	'chartreuse': 'rgba(127, 255, 0, 1)',
	'medium spring green': 'rgba(0, 250, 154, 1)',
	'MediumSpringGreen': 'rgba(0, 250, 154, 1)',
	'green yellow': 'rgba(173, 255, 47, 1)',
	'GreenYellow': 'rgba(173, 255, 47, 1)',
	'lime green': 'rgba(50, 205, 50, 1)',
	'LimeGreen': 'rgba(50, 205, 50, 1)',
	'yellow green': 'rgba(154, 205, 50, 1)',
	'YellowGreen': 'rgba(154, 205, 50, 1)',
	'forest green': 'rgba(34, 139, 34, 1)',
	'ForestGreen': 'rgba(34, 139, 34, 1)',
	'olive drab': 'rgba(107, 142, 35, 1)',
	'OliveDrab': 'rgba(107, 142, 35, 1)',
	'dark khaki': 'rgba(189, 183, 107, 1)',
	'DarkKhaki': 'rgba(189, 183, 107, 1)',
	'khaki': 'rgba(240, 230, 140, 1)',
	'pale goldenrod': 'rgba(238, 232, 170, 1)',
	'PaleGoldenrod': 'rgba(238, 232, 170, 1)',
	'light goldenrod yellow': 'rgba(250, 250, 210, 1)',
	'LightGoldenrodYellow': 'rgba(250, 250, 210, 1)',
	'light yellow': 'rgba(255, 255, 224, 1)',
	'LightYellow': 'rgba(255, 255, 224, 1)',
	'yellow': 'rgba(255, 255, 0, 1)',
	'gold': 'rgba(255, 215, 0, 1)',
	'light goldenrod': 'rgba(238, 221, 130, 1)',
	'LightGoldenrod': 'rgba(238, 221, 130, 1)',
	'goldenrod': 'rgba(218, 165, 32, 1)',
	'dark goldenrod': 'rgba(184, 134, 11, 1)',
	'DarkGoldenrod': 'rgba(184, 134, 11, 1)',
	'rosy brown': 'rgba(188, 143, 143, 1)',
	'RosyBrown': 'rgba(188, 143, 143, 1)',
	'indian red': 'rgba(205, 92, 92, 1)',
	'IndianRed': 'rgba(205, 92, 92, 1)',
	'saddle brown': 'rgba(139, 69, 19, 1)',
	'SaddleBrown': 'rgba(139, 69, 19, 1)',
	'sienna': 'rgba(160, 82, 45, 1)',
	'peru': 'rgba(205, 133, 63, 1)',
	'burlywood': 'rgba(222, 184, 135, 1)',
	'beige': 'rgba(245, 245, 220, 1)',
	'wheat': 'rgba(245, 222, 179, 1)',
	'sandy brown': 'rgba(244, 164, 96, 1)',
	'SandyBrown': 'rgba(244, 164, 96, 1)',
	'tan': 'rgba(210, 180, 140, 1)',
	'chocolate': 'rgba(210, 105, 30, 1)',
	'firebrick': 'rgba(178, 34, 34, 1)',
	'brown': 'rgba(165, 42, 42, 1)',
	'dark salmon': 'rgba(233, 150, 122, 1)',
	'DarkSalmon': 'rgba(233, 150, 122, 1)',
	'salmon': 'rgba(250, 128, 114, 1)',
	'light salmon': 'rgba(255, 160, 122, 1)',
	'LightSalmon': 'rgba(255, 160, 122, 1)',
	'orange': 'rgba(255, 165, 0, 1)',
	'dark orange': 'rgba(255, 140, 0, 1)',
	'DarkOrange': 'rgba(255, 140, 0, 1)',
	'coral': 'rgba(255, 127, 80, 1)',
	'light coral': 'rgba(240, 128, 128, 1)',
	'LightCoral': 'rgba(240, 128, 128, 1)',
	'tomato': 'rgba(255, 99, 71, 1)',
	'orange red': 'rgba(255, 69, 0, 1)',
	'OrangeRed': 'rgba(255, 69, 0, 1)',
	'red': 'rgba(255, 0, 0, 1)',
	'hot pink': 'rgba(255, 105, 180, 1)',
	'HotPink': 'rgba(255, 105, 180, 1)',
	'deep pink': 'rgba(255, 20, 147, 1)',
	'DeepPink': 'rgba(255, 20, 147, 1)',
	'pink': 'rgba(255, 192, 203, 1)',
	'light pink': 'rgba(255, 182, 193, 1)',
	'LightPink': 'rgba(255, 182, 193, 1)',
	'pale violet red': 'rgba(219, 112, 147, 1)',
	'PaleVioletRed': 'rgba(219, 112, 147, 1)',
	'maroon': 'rgba(176, 48, 96, 1)',
	'medium violet red': 'rgba(199, 21, 133, 1)',
	'MediumVioletRed': 'rgba(199, 21, 133, 1)',
	'violet red': 'rgba(208, 32, 144, 1)',
	'VioletRed': 'rgba(208, 32, 144, 1)',
	'magenta': 'rgba(255, 0, 255, 1)',
	'violet': 'rgba(238, 130, 238, 1)',
	'plum': 'rgba(221, 160, 221, 1)',
	'orchid': 'rgba(218, 112, 214, 1)',
	'medium orchid': 'rgba(186, 85, 211, 1)',
	'MediumOrchid': 'rgba(186, 85, 211, 1)',
	'dark orchid': 'rgba(153, 50, 204, 1)',
	'DarkOrchid': 'rgba(153, 50, 204, 1)',
	'dark violet': 'rgba(148, 0, 211, 1)',
	'DarkViolet': 'rgba(148, 0, 211, 1)',
	'blue violet': 'rgba(138, 43, 226, 1)',
	'BlueViolet': 'rgba(138, 43, 226, 1)',
	'purple': 'rgba(160, 32, 240, 1)',
	'medium purple': 'rgba(147, 112, 219, 1)',
	'MediumPurple': 'rgba(147, 112, 219, 1)',
	'thistle': 'rgba(216, 191, 216, 1)',
	'snow1': 'rgba(255, 250, 250, 1)',
	'snow2': 'rgba(238, 233, 233, 1)',
	'snow3': 'rgba(205, 201, 201, 1)',
	'snow4': 'rgba(139, 137, 137, 1)',
	'seashell1': 'rgba(255, 245, 238, 1)',
	'seashell2': 'rgba(238, 229, 222, 1)',
	'seashell3': 'rgba(205, 197, 191, 1)',
	'seashell4': 'rgba(139, 134, 130, 1)',
	'AntiqueWhite1': 'rgba(255, 239, 219, 1)',
	'AntiqueWhite2': 'rgba(238, 223, 204, 1)',
	'AntiqueWhite3': 'rgba(205, 192, 176, 1)',
	'AntiqueWhite4': 'rgba(139, 131, 120, 1)',
	'bisque1': 'rgba(255, 228, 196, 1)',
	'bisque2': 'rgba(238, 213, 183, 1)',
	'bisque3': 'rgba(205, 183, 158, 1)',
	'bisque4': 'rgba(139, 125, 107, 1)',
	'PeachPuff1': 'rgba(255, 218, 185, 1)',
	'PeachPuff2': 'rgba(238, 203, 173, 1)',
	'PeachPuff3': 'rgba(205, 175, 149, 1)',
	'PeachPuff4': 'rgba(139, 119, 101, 1)',
	'NavajoWhite1': 'rgba(255, 222, 173, 1)',
	'NavajoWhite2': 'rgba(238, 207, 161, 1)',
	'NavajoWhite3': 'rgba(205, 179, 139, 1)',
	'NavajoWhite4': 'rgba(139, 121, 94, 1)',
	'LemonChiffon1': 'rgba(255, 250, 205, 1)',
	'LemonChiffon2': 'rgba(238, 233, 191, 1)',
	'LemonChiffon3': 'rgba(205, 201, 165, 1)',
	'LemonChiffon4': 'rgba(139, 137, 112, 1)',
	'cornsilk1': 'rgba(255, 248, 220, 1)',
	'cornsilk2': 'rgba(238, 232, 205, 1)',
	'cornsilk3': 'rgba(205, 200, 177, 1)',
	'cornsilk4': 'rgba(139, 136, 120, 1)',
	'ivory1': 'rgba(255, 255, 240, 1)',
	'ivory2': 'rgba(238, 238, 224, 1)',
	'ivory3': 'rgba(205, 205, 193, 1)',
	'ivory4': 'rgba(139, 139, 131, 1)',
	'honeydew1': 'rgba(240, 255, 240, 1)',
	'honeydew2': 'rgba(224, 238, 224, 1)',
	'honeydew3': 'rgba(193, 205, 193, 1)',
	'honeydew4': 'rgba(131, 139, 131, 1)',
	'LavenderBlush1': 'rgba(255, 240, 245, 1)',
	'LavenderBlush2': 'rgba(238, 224, 229, 1)',
	'LavenderBlush3': 'rgba(205, 193, 197, 1)',
	'LavenderBlush4': 'rgba(139, 131, 134, 1)',
	'MistyRose1': 'rgba(255, 228, 225, 1)',
	'MistyRose2': 'rgba(238, 213, 210, 1)',
	'MistyRose3': 'rgba(205, 183, 181, 1)',
	'MistyRose4': 'rgba(139, 125, 123, 1)',
	'azure1': 'rgba(240, 255, 255, 1)',
	'azure2': 'rgba(224, 238, 238, 1)',
	'azure3': 'rgba(193, 205, 205, 1)',
	'azure4': 'rgba(131, 139, 139, 1)',
	'SlateBlue1': 'rgba(131, 111, 255, 1)',
	'SlateBlue2': 'rgba(122, 103, 238, 1)',
	'SlateBlue3': 'rgba(105, 89, 205, 1)',
	'SlateBlue4': 'rgba(71, 60, 139, 1)',
	'RoyalBlue1': 'rgba(72, 118, 255, 1)',
	'RoyalBlue2': 'rgba(67, 110, 238, 1)',
	'RoyalBlue3': 'rgba(58, 95, 205, 1)',
	'RoyalBlue4': 'rgba(39, 64, 139, 1)',
	'blue1': 'rgba(0, 0, 255, 1)',
	'blue2': 'rgba(0, 0, 238, 1)',
	'blue3': 'rgba(0, 0, 205, 1)',
	'blue4': 'rgba(0, 0, 139, 1)',
	'DodgerBlue1': 'rgba(30, 144, 255, 1)',
	'DodgerBlue2': 'rgba(28, 134, 238, 1)',
	'DodgerBlue3': 'rgba(24, 116, 205, 1)',
	'DodgerBlue4': 'rgba(16, 78, 139, 1)',
	'SteelBlue1': 'rgba(99, 184, 255, 1)',
	'SteelBlue2': 'rgba(92, 172, 238, 1)',
	'SteelBlue3': 'rgba(79, 148, 205, 1)',
	'SteelBlue4': 'rgba(54, 100, 139, 1)',
	'DeepSkyBlue1': 'rgba(0, 191, 255, 1)',
	'DeepSkyBlue2': 'rgba(0, 178, 238, 1)',
	'DeepSkyBlue3': 'rgba(0, 154, 205, 1)',
	'DeepSkyBlue4': 'rgba(0, 104, 139, 1)',
	'SkyBlue1': 'rgba(135, 206, 255, 1)',
	'SkyBlue2': 'rgba(126, 192, 238, 1)',
	'SkyBlue3': 'rgba(108, 166, 205, 1)',
	'SkyBlue4': 'rgba(74, 112, 139, 1)',
	'LightSkyBlue1': 'rgba(176, 226, 255, 1)',
	'LightSkyBlue2': 'rgba(164, 211, 238, 1)',
	'LightSkyBlue3': 'rgba(141, 182, 205, 1)',
	'LightSkyBlue4': 'rgba(96, 123, 139, 1)',
	'SlateGray1': 'rgba(198, 226, 255, 1)',
	'SlateGray2': 'rgba(185, 211, 238, 1)',
	'SlateGray3': 'rgba(159, 182, 205, 1)',
	'SlateGray4': 'rgba(108, 123, 139, 1)',
	'LightSteelBlue1': 'rgba(202, 225, 255, 1)',
	'LightSteelBlue2': 'rgba(188, 210, 238, 1)',
	'LightSteelBlue3': 'rgba(162, 181, 205, 1)',
	'LightSteelBlue4': 'rgba(110, 123, 139, 1)',
	'LightBlue1': 'rgba(191, 239, 255, 1)',
	'LightBlue2': 'rgba(178, 223, 238, 1)',
	'LightBlue3': 'rgba(154, 192, 205, 1)',
	'LightBlue4': 'rgba(104, 131, 139, 1)',
	'LightCyan1': 'rgba(224, 255, 255, 1)',
	'LightCyan2': 'rgba(209, 238, 238, 1)',
	'LightCyan3': 'rgba(180, 205, 205, 1)',
	'LightCyan4': 'rgba(122, 139, 139, 1)',
	'PaleTurquoise1': 'rgba(187, 255, 255, 1)',
	'PaleTurquoise2': 'rgba(174, 238, 238, 1)',
	'PaleTurquoise3': 'rgba(150, 205, 205, 1)',
	'PaleTurquoise4': 'rgba(102, 139, 139, 1)',
	'CadetBlue1': 'rgba(152, 245, 255, 1)',
	'CadetBlue2': 'rgba(142, 229, 238, 1)',
	'CadetBlue3': 'rgba(122, 197, 205, 1)',
	'CadetBlue4': 'rgba(83, 134, 139, 1)',
	'turquoise1': 'rgba(0, 245, 255, 1)',
	'turquoise2': 'rgba(0, 229, 238, 1)',
	'turquoise3': 'rgba(0, 197, 205, 1)',
	'turquoise4': 'rgba(0, 134, 139, 1)',
	'cyan1': 'rgba(0, 255, 255, 1)',
	'cyan2': 'rgba(0, 238, 238, 1)',
	'cyan3': 'rgba(0, 205, 205, 1)',
	'cyan4': 'rgba(0, 139, 139, 1)',
	'DarkSlateGray1': 'rgba(151, 255, 255, 1)',
	'DarkSlateGray2': 'rgba(141, 238, 238, 1)',
	'DarkSlateGray3': 'rgba(121, 205, 205, 1)',
	'DarkSlateGray4': 'rgba(82, 139, 139, 1)',
	'aquamarine1': 'rgba(127, 255, 212, 1)',
	'aquamarine2': 'rgba(118, 238, 198, 1)',
	'aquamarine3': 'rgba(102, 205, 170, 1)',
	'aquamarine4': 'rgba(69, 139, 116, 1)',
	'DarkSeaGreen1': 'rgba(193, 255, 193, 1)',
	'DarkSeaGreen2': 'rgba(180, 238, 180, 1)',
	'DarkSeaGreen3': 'rgba(155, 205, 155, 1)',
	'DarkSeaGreen4': 'rgba(105, 139, 105, 1)',
	'SeaGreen1': 'rgba(84, 255, 159, 1)',
	'SeaGreen2': 'rgba(78, 238, 148, 1)',
	'SeaGreen3': 'rgba(67, 205, 128, 1)',
	'SeaGreen4': 'rgba(46, 139, 87, 1)',
	'PaleGreen1': 'rgba(154, 255, 154, 1)',
	'PaleGreen2': 'rgba(144, 238, 144, 1)',
	'PaleGreen3': 'rgba(124, 205, 124, 1)',
	'PaleGreen4': 'rgba(84, 139, 84, 1)',
	'SpringGreen1': 'rgba(0, 255, 127, 1)',
	'SpringGreen2': 'rgba(0, 238, 118, 1)',
	'SpringGreen3': 'rgba(0, 205, 102, 1)',
	'SpringGreen4': 'rgba(0, 139, 69, 1)',
	'green1': 'rgba(0, 255, 0, 1)',
	'green2': 'rgba(0, 238, 0, 1)',
	'green3': 'rgba(0, 205, 0, 1)',
	'green4': 'rgba(0, 139, 0, 1)',
	'chartreuse1': 'rgba(127, 255, 0, 1)',
	'chartreuse2': 'rgba(118, 238, 0, 1)',
	'chartreuse3': 'rgba(102, 205, 0, 1)',
	'chartreuse4': 'rgba(69, 139, 0, 1)',
	'OliveDrab1': 'rgba(192, 255, 62, 1)',
	'OliveDrab2': 'rgba(179, 238, 58, 1)',
	'OliveDrab3': 'rgba(154, 205, 50, 1)',
	'OliveDrab4': 'rgba(105, 139, 34, 1)',
	'DarkOliveGreen1': 'rgba(202, 255, 112, 1)',
	'DarkOliveGreen2': 'rgba(188, 238, 104, 1)',
	'DarkOliveGreen3': 'rgba(162, 205, 90, 1)',
	'DarkOliveGreen4': 'rgba(110, 139, 61, 1)',
	'khaki1': 'rgba(255, 246, 143, 1)',
	'khaki2': 'rgba(238, 230, 133, 1)',
	'khaki3': 'rgba(205, 198, 115, 1)',
	'khaki4': 'rgba(139, 134, 78, 1)',
	'LightGoldenrod1': 'rgba(255, 236, 139, 1)',
	'LightGoldenrod2': 'rgba(238, 220, 130, 1)',
	'LightGoldenrod3': 'rgba(205, 190, 112, 1)',
	'LightGoldenrod4': 'rgba(139, 129, 76, 1)',
	'LightYellow1': 'rgba(255, 255, 224, 1)',
	'LightYellow2': 'rgba(238, 238, 209, 1)',
	'LightYellow3': 'rgba(205, 205, 180, 1)',
	'LightYellow4': 'rgba(139, 139, 122, 1)',
	'yellow1': 'rgba(255, 255, 0, 1)',
	'yellow2': 'rgba(238, 238, 0, 1)',
	'yellow3': 'rgba(205, 205, 0, 1)',
	'yellow4': 'rgba(139, 139, 0, 1)',
	'gold1': 'rgba(255, 215, 0, 1)',
	'gold2': 'rgba(238, 201, 0, 1)',
	'gold3': 'rgba(205, 173, 0, 1)',
	'gold4': 'rgba(139, 117, 0, 1)',
	'goldenrod1': 'rgba(255, 193, 37, 1)',
	'goldenrod2': 'rgba(238, 180, 34, 1)',
	'goldenrod3': 'rgba(205, 155, 29, 1)',
	'goldenrod4': 'rgba(139, 105, 20, 1)',
	'DarkGoldenrod1': 'rgba(255, 185, 15, 1)',
	'DarkGoldenrod2': 'rgba(238, 173, 14, 1)',
	'DarkGoldenrod3': 'rgba(205, 149, 12, 1)',
	'DarkGoldenrod4': 'rgba(139, 101, 8, 1)',
	'RosyBrown1': 'rgba(255, 193, 193, 1)',
	'RosyBrown2': 'rgba(238, 180, 180, 1)',
	'RosyBrown3': 'rgba(205, 155, 155, 1)',
	'RosyBrown4': 'rgba(139, 105, 105, 1)',
	'IndianRed1': 'rgba(255, 106, 106, 1)',
	'IndianRed2': 'rgba(238, 99, 99, 1)',
	'IndianRed3': 'rgba(205, 85, 85, 1)',
	'IndianRed4': 'rgba(139, 58, 58, 1)',
	'sienna1': 'rgba(255, 130, 71, 1)',
	'sienna2': 'rgba(238, 121, 66, 1)',
	'sienna3': 'rgba(205, 104, 57, 1)',
	'sienna4': 'rgba(139, 71, 38, 1)',
	'burlywood1': 'rgba(255, 211, 155, 1)',
	'burlywood2': 'rgba(238, 197, 145, 1)',
	'burlywood3': 'rgba(205, 170, 125, 1)',
	'burlywood4': 'rgba(139, 115, 85, 1)',
	'wheat1': 'rgba(255, 231, 186, 1)',
	'wheat2': 'rgba(238, 216, 174, 1)',
	'wheat3': 'rgba(205, 186, 150, 1)',
	'wheat4': 'rgba(139, 126, 102, 1)',
	'tan1': 'rgba(255, 165, 79, 1)',
	'tan2': 'rgba(238, 154, 73, 1)',
	'tan3': 'rgba(205, 133, 63, 1)',
	'tan4': 'rgba(139, 90, 43, 1)',
	'chocolate1': 'rgba(255, 127, 36, 1)',
	'chocolate2': 'rgba(238, 118, 33, 1)',
	'chocolate3': 'rgba(205, 102, 29, 1)',
	'chocolate4': 'rgba(139, 69, 19, 1)',
	'firebrick1': 'rgba(255, 48, 48, 1)',
	'firebrick2': 'rgba(238, 44, 44, 1)',
	'firebrick3': 'rgba(205, 38, 38, 1)',
	'firebrick4': 'rgba(139, 26, 26, 1)',
	'brown1': 'rgba(255, 64, 64, 1)',
	'brown2': 'rgba(238, 59, 59, 1)',
	'brown3': 'rgba(205, 51, 51, 1)',
	'brown4': 'rgba(139, 35, 35, 1)',
	'salmon1': 'rgba(255, 140, 105, 1)',
	'salmon2': 'rgba(238, 130, 98, 1)',
	'salmon3': 'rgba(205, 112, 84, 1)',
	'salmon4': 'rgba(139, 76, 57, 1)',
	'LightSalmon1': 'rgba(255, 160, 122, 1)',
	'LightSalmon2': 'rgba(238, 149, 114, 1)',
	'LightSalmon3': 'rgba(205, 129, 98, 1)',
	'LightSalmon4': 'rgba(139, 87, 66, 1)',
	'orange1': 'rgba(255, 165, 0, 1)',
	'orange2': 'rgba(238, 154, 0, 1)',
	'orange3': 'rgba(205, 133, 0, 1)',
	'orange4': 'rgba(139, 90, 0, 1)',
	'DarkOrange1': 'rgba(255, 127, 0, 1)',
	'DarkOrange2': 'rgba(238, 118, 0, 1)',
	'DarkOrange3': 'rgba(205, 102, 0, 1)',
	'DarkOrange4': 'rgba(139, 69, 0, 1)',
	'coral1': 'rgba(255, 114, 86, 1)',
	'coral2': 'rgba(238, 106, 80, 1)',
	'coral3': 'rgba(205, 91, 69, 1)',
	'coral4': 'rgba(139, 62, 47, 1)',
	'tomato1': 'rgba(255, 99, 71, 1)',
	'tomato2': 'rgba(238, 92, 66, 1)',
	'tomato3': 'rgba(205, 79, 57, 1)',
	'tomato4': 'rgba(139, 54, 38, 1)',
	'OrangeRed1': 'rgba(255, 69, 0, 1)',
	'OrangeRed2': 'rgba(238, 64, 0, 1)',
	'OrangeRed3': 'rgba(205, 55, 0, 1)',
	'OrangeRed4': 'rgba(139, 37, 0, 1)',
	'red1': 'rgba(255, 0, 0, 1)',
	'red2': 'rgba(238, 0, 0, 1)',
	'red3': 'rgba(205, 0, 0, 1)',
	'red4': 'rgba(139, 0, 0, 1)',
	'DeepPink1': 'rgba(255, 20, 147, 1)',
	'DeepPink2': 'rgba(238, 18, 137, 1)',
	'DeepPink3': 'rgba(205, 16, 118, 1)',
	'DeepPink4': 'rgba(139, 10, 80, 1)',
	'HotPink1': 'rgba(255, 110, 180, 1)',
	'HotPink2': 'rgba(238, 106, 167, 1)',
	'HotPink3': 'rgba(205, 96, 144, 1)',
	'HotPink4': 'rgba(139, 58, 98, 1)',
	'pink1': 'rgba(255, 181, 197, 1)',
	'pink2': 'rgba(238, 169, 184, 1)',
	'pink3': 'rgba(205, 145, 158, 1)',
	'pink4': 'rgba(139, 99, 108, 1)',
	'LightPink1': 'rgba(255, 174, 185, 1)',
	'LightPink2': 'rgba(238, 162, 173, 1)',
	'LightPink3': 'rgba(205, 140, 149, 1)',
	'LightPink4': 'rgba(139, 95, 101, 1)',
	'PaleVioletRed1': 'rgba(255, 130, 171, 1)',
	'PaleVioletRed2': 'rgba(238, 121, 159, 1)',
	'PaleVioletRed3': 'rgba(205, 104, 137, 1)',
	'PaleVioletRed4': 'rgba(139, 71, 93, 1)',
	'maroon1': 'rgba(255, 52, 179, 1)',
	'maroon2': 'rgba(238, 48, 167, 1)',
	'maroon3': 'rgba(205, 41, 144, 1)',
	'maroon4': 'rgba(139, 28, 98, 1)',
	'VioletRed1': 'rgba(255, 62, 150, 1)',
	'VioletRed2': 'rgba(238, 58, 140, 1)',
	'VioletRed3': 'rgba(205, 50, 120, 1)',
	'VioletRed4': 'rgba(139, 34, 82, 1)',
	'magenta1': 'rgba(255, 0, 255, 1)',
	'magenta2': 'rgba(238, 0, 238, 1)',
	'magenta3': 'rgba(205, 0, 205, 1)',
	'magenta4': 'rgba(139, 0, 139, 1)',
	'orchid1': 'rgba(255, 131, 250, 1)',
	'orchid2': 'rgba(238, 122, 233, 1)',
	'orchid3': 'rgba(205, 105, 201, 1)',
	'orchid4': 'rgba(139, 71, 137, 1)',
	'plum1': 'rgba(255, 187, 255, 1)',
	'plum2': 'rgba(238, 174, 238, 1)',
	'plum3': 'rgba(205, 150, 205, 1)',
	'plum4': 'rgba(139, 102, 139, 1)',
	'MediumOrchid1': 'rgba(224, 102, 255, 1)',
	'MediumOrchid2': 'rgba(209, 95, 238, 1)',
	'MediumOrchid3': 'rgba(180, 82, 205, 1)',
	'MediumOrchid4': 'rgba(122, 55, 139, 1)',
	'DarkOrchid1': 'rgba(191, 62, 255, 1)',
	'DarkOrchid2': 'rgba(178, 58, 238, 1)',
	'DarkOrchid3': 'rgba(154, 50, 205, 1)',
	'DarkOrchid4': 'rgba(104, 34, 139, 1)',
	'purple1': 'rgba(155, 48, 255, 1)',
	'purple2': 'rgba(145, 44, 238, 1)',
	'purple3': 'rgba(125, 38, 205, 1)',
	'purple4': 'rgba(85, 26, 139, 1)',
	'MediumPurple1': 'rgba(171, 130, 255, 1)',
	'MediumPurple2': 'rgba(159, 121, 238, 1)',
	'MediumPurple3': 'rgba(137, 104, 205, 1)',
	'MediumPurple4': 'rgba(93, 71, 139, 1)',
	'thistle1': 'rgba(255, 225, 255, 1)',
	'thistle2': 'rgba(238, 210, 238, 1)',
	'thistle3': 'rgba(205, 181, 205, 1)',
	'thistle4': 'rgba(139, 123, 139, 1)',
	'gray0': 'rgba(0, 0, 0, 1)',
	'grey0': 'rgba(0, 0, 0, 1)',
	'gray1': 'rgba(3, 3, 3, 1)',
	'grey1': 'rgba(3, 3, 3, 1)',
	'gray2': 'rgba(5, 5, 5, 1)',
	'grey2': 'rgba(5, 5, 5, 1)',
	'gray3': 'rgba(8, 8, 8, 1)',
	'grey3': 'rgba(8, 8, 8, 1)',
	'gray4': 'rgba(10, 10, 10, 1)',
	'grey4': 'rgba(10, 10, 10, 1)',
	'gray5': 'rgba(13, 13, 13, 1)',
	'grey5': 'rgba(13, 13, 13, 1)',
	'gray6': 'rgba(15, 15, 15, 1)',
	'grey6': 'rgba(15, 15, 15, 1)',
	'gray7': 'rgba(18, 18, 18, 1)',
	'grey7': 'rgba(18, 18, 18, 1)',
	'gray8': 'rgba(20, 20, 20, 1)',
	'grey8': 'rgba(20, 20, 20, 1)',
	'gray9': 'rgba(23, 23, 23, 1)',
	'grey9': 'rgba(23, 23, 23, 1)',
	'gray10': 'rgba(26, 26, 26, 1)',
	'grey10': 'rgba(26, 26, 26, 1)',
	'gray11': 'rgba(28, 28, 28, 1)',
	'grey11': 'rgba(28, 28, 28, 1)',
	'gray12': 'rgba(31, 31, 31, 1)',
	'grey12': 'rgba(31, 31, 31, 1)',
	'gray13': 'rgba(33, 33, 33, 1)',
	'grey13': 'rgba(33, 33, 33, 1)',
	'gray14': 'rgba(36, 36, 36, 1)',
	'grey14': 'rgba(36, 36, 36, 1)',
	'gray15': 'rgba(38, 38, 38, 1)',
	'grey15': 'rgba(38, 38, 38, 1)',
	'gray16': 'rgba(41, 41, 41, 1)',
	'grey16': 'rgba(41, 41, 41, 1)',
	'gray17': 'rgba(43, 43, 43, 1)',
	'grey17': 'rgba(43, 43, 43, 1)',
	'gray18': 'rgba(46, 46, 46, 1)',
	'grey18': 'rgba(46, 46, 46, 1)',
	'gray19': 'rgba(48, 48, 48, 1)',
	'grey19': 'rgba(48, 48, 48, 1)',
	'gray20': 'rgba(51, 51, 51, 1)',
	'grey20': 'rgba(51, 51, 51, 1)',
	'gray21': 'rgba(54, 54, 54, 1)',
	'grey21': 'rgba(54, 54, 54, 1)',
	'gray22': 'rgba(56, 56, 56, 1)',
	'grey22': 'rgba(56, 56, 56, 1)',
	'gray23': 'rgba(59, 59, 59, 1)',
	'grey23': 'rgba(59, 59, 59, 1)',
	'gray24': 'rgba(61, 61, 61, 1)',
	'grey24': 'rgba(61, 61, 61, 1)',
	'gray25': 'rgba(64, 64, 64, 1)',
	'grey25': 'rgba(64, 64, 64, 1)',
	'gray26': 'rgba(66, 66, 66, 1)',
	'grey26': 'rgba(66, 66, 66, 1)',
	'gray27': 'rgba(69, 69, 69, 1)',
	'grey27': 'rgba(69, 69, 69, 1)',
	'gray28': 'rgba(71, 71, 71, 1)',
	'grey28': 'rgba(71, 71, 71, 1)',
	'gray29': 'rgba(74, 74, 74, 1)',
	'grey29': 'rgba(74, 74, 74, 1)',
	'gray30': 'rgba(77, 77, 77, 1)',
	'grey30': 'rgba(77, 77, 77, 1)',
	'gray31': 'rgba(79, 79, 79, 1)',
	'grey31': 'rgba(79, 79, 79, 1)',
	'gray32': 'rgba(82, 82, 82, 1)',
	'grey32': 'rgba(82, 82, 82, 1)',
	'gray33': 'rgba(84, 84, 84, 1)',
	'grey33': 'rgba(84, 84, 84, 1)',
	'gray34': 'rgba(87, 87, 87, 1)',
	'grey34': 'rgba(87, 87, 87, 1)',
	'gray35': 'rgba(89, 89, 89, 1)',
	'grey35': 'rgba(89, 89, 89, 1)',
	'gray36': 'rgba(92, 92, 92, 1)',
	'grey36': 'rgba(92, 92, 92, 1)',
	'gray37': 'rgba(94, 94, 94, 1)',
	'grey37': 'rgba(94, 94, 94, 1)',
	'gray38': 'rgba(97, 97, 97, 1)',
	'grey38': 'rgba(97, 97, 97, 1)',
	'gray39': 'rgba(99, 99, 99, 1)',
	'grey39': 'rgba(99, 99, 99, 1)',
	'gray40': 'rgba(102, 102, 102, 1)',
	'grey40': 'rgba(102, 102, 102, 1)',
	'gray41': 'rgba(105, 105, 105, 1)',
	'grey41': 'rgba(105, 105, 105, 1)',
	'gray42': 'rgba(107, 107, 107, 1)',
	'grey42': 'rgba(107, 107, 107, 1)',
	'gray43': 'rgba(110, 110, 110, 1)',
	'grey43': 'rgba(110, 110, 110, 1)',
	'gray44': 'rgba(112, 112, 112, 1)',
	'grey44': 'rgba(112, 112, 112, 1)',
	'gray45': 'rgba(115, 115, 115, 1)',
	'grey45': 'rgba(115, 115, 115, 1)',
	'gray46': 'rgba(117, 117, 117, 1)',
	'grey46': 'rgba(117, 117, 117, 1)',
	'gray47': 'rgba(120, 120, 120, 1)',
	'grey47': 'rgba(120, 120, 120, 1)',
	'gray48': 'rgba(122, 122, 122, 1)',
	'grey48': 'rgba(122, 122, 122, 1)',
	'gray49': 'rgba(125, 125, 125, 1)',
	'grey49': 'rgba(125, 125, 125, 1)',
	'gray50': 'rgba(127, 127, 127, 1)',
	'grey50': 'rgba(127, 127, 127, 1)',
	'gray51': 'rgba(130, 130, 130, 1)',
	'grey51': 'rgba(130, 130, 130, 1)',
	'gray52': 'rgba(133, 133, 133, 1)',
	'grey52': 'rgba(133, 133, 133, 1)',
	'gray53': 'rgba(135, 135, 135, 1)',
	'grey53': 'rgba(135, 135, 135, 1)',
	'gray54': 'rgba(138, 138, 138, 1)',
	'grey54': 'rgba(138, 138, 138, 1)',
	'gray55': 'rgba(140, 140, 140, 1)',
	'grey55': 'rgba(140, 140, 140, 1)',
	'gray56': 'rgba(143, 143, 143, 1)',
	'grey56': 'rgba(143, 143, 143, 1)',
	'gray57': 'rgba(145, 145, 145, 1)',
	'grey57': 'rgba(145, 145, 145, 1)',
	'gray58': 'rgba(148, 148, 148, 1)',
	'grey58': 'rgba(148, 148, 148, 1)',
	'gray59': 'rgba(150, 150, 150, 1)',
	'grey59': 'rgba(150, 150, 150, 1)',
	'gray60': 'rgba(153, 153, 153, 1)',
	'grey60': 'rgba(153, 153, 153, 1)',
	'gray61': 'rgba(156, 156, 156, 1)',
	'grey61': 'rgba(156, 156, 156, 1)',
	'gray62': 'rgba(158, 158, 158, 1)',
	'grey62': 'rgba(158, 158, 158, 1)',
	'gray63': 'rgba(161, 161, 161, 1)',
	'grey63': 'rgba(161, 161, 161, 1)',
	'gray64': 'rgba(163, 163, 163, 1)',
	'grey64': 'rgba(163, 163, 163, 1)',
	'gray65': 'rgba(166, 166, 166, 1)',
	'grey65': 'rgba(166, 166, 166, 1)',
	'gray66': 'rgba(168, 168, 168, 1)',
	'grey66': 'rgba(168, 168, 168, 1)',
	'gray67': 'rgba(171, 171, 171, 1)',
	'grey67': 'rgba(171, 171, 171, 1)',
	'gray68': 'rgba(173, 173, 173, 1)',
	'grey68': 'rgba(173, 173, 173, 1)',
	'gray69': 'rgba(176, 176, 176, 1)',
	'grey69': 'rgba(176, 176, 176, 1)',
	'gray70': 'rgba(179, 179, 179, 1)',
	'grey70': 'rgba(179, 179, 179, 1)',
	'gray71': 'rgba(181, 181, 181, 1)',
	'grey71': 'rgba(181, 181, 181, 1)',
	'gray72': 'rgba(184, 184, 184, 1)',
	'grey72': 'rgba(184, 184, 184, 1)',
	'gray73': 'rgba(186, 186, 186, 1)',
	'grey73': 'rgba(186, 186, 186, 1)',
	'gray74': 'rgba(189, 189, 189, 1)',
	'grey74': 'rgba(189, 189, 189, 1)',
	'gray75': 'rgba(191, 191, 191, 1)',
	'grey75': 'rgba(191, 191, 191, 1)',
	'gray76': 'rgba(194, 194, 194, 1)',
	'grey76': 'rgba(194, 194, 194, 1)',
	'gray77': 'rgba(196, 196, 196, 1)',
	'grey77': 'rgba(196, 196, 196, 1)',
	'gray78': 'rgba(199, 199, 199, 1)',
	'grey78': 'rgba(199, 199, 199, 1)',
	'gray79': 'rgba(201, 201, 201, 1)',
	'grey79': 'rgba(201, 201, 201, 1)',
	'gray80': 'rgba(204, 204, 204, 1)',
	'grey80': 'rgba(204, 204, 204, 1)',
	'gray81': 'rgba(207, 207, 207, 1)',
	'grey81': 'rgba(207, 207, 207, 1)',
	'gray82': 'rgba(209, 209, 209, 1)',
	'grey82': 'rgba(209, 209, 209, 1)',
	'gray83': 'rgba(212, 212, 212, 1)',
	'grey83': 'rgba(212, 212, 212, 1)',
	'gray84': 'rgba(214, 214, 214, 1)',
	'grey84': 'rgba(214, 214, 214, 1)',
	'gray85': 'rgba(217, 217, 217, 1)',
	'grey85': 'rgba(217, 217, 217, 1)',
	'gray86': 'rgba(219, 219, 219, 1)',
	'grey86': 'rgba(219, 219, 219, 1)',
	'gray87': 'rgba(222, 222, 222, 1)',
	'grey87': 'rgba(222, 222, 222, 1)',
	'gray88': 'rgba(224, 224, 224, 1)',
	'grey88': 'rgba(224, 224, 224, 1)',
	'gray89': 'rgba(227, 227, 227, 1)',
	'grey89': 'rgba(227, 227, 227, 1)',
	'gray90': 'rgba(229, 229, 229, 1)',
	'grey90': 'rgba(229, 229, 229, 1)',
	'gray91': 'rgba(232, 232, 232, 1)',
	'grey91': 'rgba(232, 232, 232, 1)',
	'gray92': 'rgba(235, 235, 235, 1)',
	'grey92': 'rgba(235, 235, 235, 1)',
	'gray93': 'rgba(237, 237, 237, 1)',
	'grey93': 'rgba(237, 237, 237, 1)',
	'gray94': 'rgba(240, 240, 240, 1)',
	'grey94': 'rgba(240, 240, 240, 1)',
	'gray95': 'rgba(242, 242, 242, 1)',
	'grey95': 'rgba(242, 242, 242, 1)',
	'gray96': 'rgba(245, 245, 245, 1)',
	'grey96': 'rgba(245, 245, 245, 1)',
	'gray97': 'rgba(247, 247, 247, 1)',
	'grey97': 'rgba(247, 247, 247, 1)',
	'gray98': 'rgba(250, 250, 250, 1)',
	'grey98': 'rgba(250, 250, 250, 1)',
	'gray99': 'rgba(252, 252, 252, 1)',
	'grey99': 'rgba(252, 252, 252, 1)',
	'gray100': 'rgba(255, 255, 255, 1)',
	'grey100': 'rgba(255, 255, 255, 1)',
	'dark grey': 'rgba(169, 169, 169, 1)',
	'DarkGrey': 'rgba(169, 169, 169, 1)',
	'dark gray': 'rgba(169, 169, 169, 1)',
	'DarkGray': 'rgba(169, 169, 169, 1)',
	'dark blue': 'rgba(0, 0, 139, 1)',
	'DarkBlue': 'rgba(0, 0, 139, 1)',
	'dark cyan': 'rgba(0, 139, 139, 1)',
	'DarkCyan': 'rgba(0, 139, 139, 1)',
	'dark magenta': 'rgba(139, 0, 139, 1)',
	'DarkMagenta': 'rgba(139, 0, 139, 1)',
	'dark red': 'rgba(139, 0, 0, 1)',
	'DarkRed': 'rgba(139, 0, 0, 1)',
	'light green': 'rgba(144, 238, 144, 1)',
	'LightGreen': 'rgba(144, 238, 144, 1)'
};

