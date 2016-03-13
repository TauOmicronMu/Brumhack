var pages = ["#page1", "#page2", "#page3", "#page4"];

function moveIntoView(n) {
    /*
     * Move the page into view.
     */
    console.log("Attempted to move page " + n + " into view.");
    $(pages[n-1]).css("left","0px");
    $(pages[n-1]).css("top","0px");
    $(pages[n-1]).css("height","100%");
    $(pages[n-1]).css("width","100%");
    /*
     * Move the other pages out of view.
     */
     for(var i = 0; i < pages.length; i++) {
         if(!((n-1) === i)) {
             console.log("Attempted to move page " + i + " into view.");
             $(pages[i]).css("left","-500%");
             $(pages[i]).css("top","-500%");
             $(pages[i]).css("height","0px");
             $(pages[i]).css("width","0px");
         }
     }
}; 

