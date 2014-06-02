XPM.JS
======

The `xpm.js` library render XPM files in a `<canvas>` element.

XPM.raw
-------

Initialize an XPM object yourself.

XPM.addColor
------------

Bind the specified string of characters to a color.

Exemple:

    x.addColor('#', '#FFFFFF');

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
----------

Return the canvas element.

XPM.nameResolver
----------------

An optional interface, not implemented directly by `xpm.js`, which
allows the resolution of a color name to a sensible value in rgb or hex.

This method is expected to accept a string on input and return a string
if it finds a matching value, or null.

Such an implementation can be found in `xpmnr_x11.js`, which convert X11
color names to their rgba values.

Documentation
-------------

Some documentation on the XPM file format is available here:
http://www.xfree86.org/current/xpm.pdf
