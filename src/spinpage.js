var wheel = new Winwheel({
        'numSegments' : 4,
        'pointerAngle' : 0, 
        'segments'    :
            [
                {'fillStyle' : '#eae56f', 'text' : 'Tom'},
                {'fillStyle' : '#89f26e', 'text' : 'Mac'},
                {'fillStyle' : '#7de6ef', 'text' : 'Matt'},
                {'fillStyle' : '#e7706f', 'text' : 'Liam'}
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

wheel.startAnimation();
