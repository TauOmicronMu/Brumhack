var wheel = new Winwheel({
        'numSegments' : 4,
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
});

wheel.startAnimation();
