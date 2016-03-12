var wheel = new Winwheel({
        'numSegments' : 6,
        'pointerAngle' : 0, 
        'textFontSize' : 12,
        'textFontFamily' : 'Quicksand',
        'textFontWeight' : 'bold',
        'lineWidth' : 0,
        'strokeStyle' : 'black', 
        'segments'    :
            [
                {'fillStyle' : '#eae56f', 'text' : 'Tom'},
                {'fillStyle' : '#89f26e', 'text' : 'Mac'},
                {'fillStyle' : '#7de6ef', 'text' : 'Matt'},
                {'fillStyle' : '#e7706f', 'text' : 'Liam'},
                {'fillStyle' : '#000000', 'text' : 'Aiste'},
                {'fillStyle' : '#ff0000', 'text' : 'Bianca'}
            ],
        'animation' : 
            {
                'type' : 'spinToStop',
                'duration' : 5,
                'spins' : 8
            }
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

/*
 * Return the winner.
 */
