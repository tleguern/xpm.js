XPM.JS
======

The `xpm.js` library render XPM files in a `<canvas>` element.

XPM object
----------

Its constructor accepts up to 4 optional parameters: width, height,
number of colors and chars per pixel.

Example:

    var x = new XPM(32, 32, 2, 1);
    var y = new XPM();

XPM.load(buffer)
----------------

Construct a XPM object from the given buffer.

XPM.addColor(color)
-------------------

Add the given XPMColor object `color` to color list.

Example:

    var c = new XPMColor('!');
    x.addColor(c);

XPM.addLine(line)
-----------------

Add the given string `line` to the drawing. This interface is very
crude.

Example:

    x.addLine("#   #   #");
    x.addLine(" #  #  # ");
    x.addLine("  # # #  ");
    x.addLine("   ###   ");
    x.addLine("    #    ");

XPM.draw(colorscheme)
---------------------

Draw in a canvas element using colors from the given colorscheme.

Such colorscheme might be:

   * 'c', for 8-bits color;
   * 'g', for 8-bits greyscale;
   * 'g4', for 4-bits greyscale;
   * 'm', for monochrome;

For the moment missing colors from a colorscheme are not computed or
inferred.

XPMColor object
---------------

Its constructor takes a string.

Example:

    var bang = new XPMColor('!');

XPMColor.s([s])
---------------

Called without argument, this function will return the symbolic name
that was previously bound to it. With an argument it will bind to the
given name `s`.

The default value is 'None'.

XPMColor.c([c])
---------------

Called without argument, this function will return the color from the
'c' colorscheme that was previously bound to it. With an argument it
will bind to the given name `c`.

The value `c` can be specified by giving a color name, which will be
resolved with XPMNameResolver, or a hex value in the form `#rrggbb`. The
XPM format support the '%' followed by a HSV code, but this is not
implemented.

The default value is 'rgba(0, 0, 0, 0)'.

XPMColor.m([m])
---------------

Called without argument, this function will return the color from the
'm' colorscheme that was previously bound to it. With an argument it
will bind to the given name `c`.

The value `m` can be either "black" or "white".

The default value is 'white'.

XPMColor.g([g])
---------------

Called without argument, this function will return the color from the
'g' colorscheme that was previously bound to it. With an argument it
will bind to the given name `c`.

The value `g` can be any grey color in hex value: #F1F1F1, #0B0B0B,
 #111111, ...

The default value is '#FFFFFF'.

XPMColor.g4([g4])
-----------------

Called without argument, this function will return the color from the
'g4' colorscheme that was previously bound to it. With an argument it
will bind to the given name `c`.

The value `g4` can be any 4-bits grey color in hex value: #111111,
 #222222, #333333, ...

The default value is '#FFFFFF'.

XPMNameResolver object
----------------------

This object will be called whenever a color name is used in the 'c'
colorscheme.  A dummy default one is provided, but it will only return a
random color.

Two implementations are included in separate files:

   * xpmnr_x11.js: Provide X11 color name to rgba;
   * xpmnr_picons.js: Provide Picons color name to hex;

Documentation
-------------

Some documentation on the XPM file format is available here:
http://www.xfree86.org/current/xpm.pdf

Available colorschemes are:

   * 'c', for 8-bits color;
   * 'g', for 8-bits greyscale;
   * 'g4', for 4-bits greyscale;
   * 'm', for monochrome;


