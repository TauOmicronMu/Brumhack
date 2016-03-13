/*
 * Work out the colours for the segments, based on the
 * number of overall segments.
 */

var segments = 6;

var colours = randomColor({
	count : segments,
        luminosity : "dark",
});

var duration = 5;

function alertFinished() {
    alert(wheel.getIndicatedSegment().text + " wins!");
}

var wheel = new Winwheel({
        'numSegments' : segments,
        'pointerAngle' : 0, 
        'textFontSize' : 36,
        'textFontFamily' : 'Quicksand',
        'textFontWeight' : 'Bold',
        'textFillStyle' : '#ffffff',
        'strokeStyle' : 'white', 
        'lineWidth' : 8, 
        'segments'    :
            [
                {'fillStyle' : colours[0], 'text' : 'Tom'},
                {'fillStyle' : colours[1], 'text' : 'Mac'},
                {'fillStyle' : colours[2], 'text' : 'Matt'},
                {'fillStyle' : colours[3], 'text' : 'Liam'},
                {'fillStyle' : colours[4], 'text' : 'Aiste'},
                {'fillStyle' : colours[5], 'text' : 'Bianca'}
            ],
        'animation' : 
            {
                'type' : 'spinToStop',
                'duration' : duration,
                'spins' : 8
            },
        'callbackFinished' : 'alertFinished()',
        /*
        This will draw a red line at 'pointerAngle' degrees and show you 
        where the wheel thinks that many degrees is.
        'pointerGuide' : 
            {
                'display' : true,
                'strokeStyle' : 'red',
                'lineWidth' : 3
            }
         */
});

/*
 * Spin the wheel for 'duration' seconds. 
 */
wheel.startAnimation();
setTimeout(alertFinished, duration*1000);
setTimeout(moveIntoView, 5000,3);
