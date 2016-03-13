var singles = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];

function genName() {
    var name = "";
    for(var i = 0; i < 5; i ++) {
        name += singles[Math.floor(Math.random()*35)];
    };
    return name;
}

