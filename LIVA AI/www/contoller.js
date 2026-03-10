
$(document).ready(function() {


//display speak message in the frontend
    eel.expose(DisplayMessage) 
    function DisplayMessage(message) {
       $(".siri-message li:first").text(message);
       $('.siri-message').textillate('start');    
}

//display hood animation
 eel.expose(showHood)
function showHood() {
    $('#Oval').attr("hidden", false);
    $('#SiriWave').attr("hidden", true);

}    




});