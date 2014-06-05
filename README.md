XPM.JS
======

The `xpm.js` library render XPM files in a `<canvas>` element.

XPM
---

Constructor for the XPM object. It accepts up to 4 opitional parameters:
width, height, number of colors and chars per pixel.

Exemple:

    var x = new XPM(32, 32, 2, 1);
    var y = new XPM();

XPM.load
--------

Construct a XPM object from a given buffer.

XPM.addColor
------------

Bind the specified string of characters to one color in one or multiple
colorscheme.

Available colorschemes are:

   * 'c', for 8-bits color;
   * 'g', for 8-bits greyscale;
   * 'g4', for 4-bits greyscale;
   * 'm', for monochrome;

Exemple:

    x.addColor('#', '{'c': '#FFFFFF'});
    x.addColor('!', '{'c': '#FFFFFF', 'm': 'black'});
    x.addColor('@', '{'g': '#FEFEFE'});

XPM.addLine
-----------

Add a line to the drawing. This interface is very crude.

Exemple:

    x.addLine("#   #   #");
    x.addLine(" #  #  # ");
    x.addLine("  # # #  ");
    x.addLine("   ###   ");
    x.addLine("    #    ");

XPM.draw
--------

Return the canvas element. An optional key can be given to select the
colorscheme to use.

Such keys are:

   * 'c', for 8-bits color;
   * 'g', for 8-bits greyscale;
   * 'g4', for 4-bits greyscale;
   * 'm', for monochrome;

For the moment missing colors from a colorscheme are not computed are
infered.

XPM.nameResolver
----------------

An optional interface, not implemented directly by `xpm.js`, which
allows the resolution of a color name to a sensible value in rgb or hex.

This method is expected to accept a string on input and return a string
if it finds a matching value, or null.

Such an implementation can be found in `xpmnr_x11.js`, which converts
X11 color names to their rgba values.

This mechanism is only available for the 'c' colorscheme.

Documentation
-------------

Some documentation on the XPM file format is available here:
http://www.xfree86.org/current/xpm.pdf
