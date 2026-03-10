
$(document).ready(function() {

    $('.text').textillate({
        loop: true,
        sync: true,
        in: {
            effect: "bounceIn",
        },
        out: {
            effect: "bounceOut",
        },
    });
    //siri configuration
      var siriWave = new SiriWave({
    container: document.getElementById("siri-container"),
    width: 640,
    height: 200,
   style:"ios9",
   amplitude: 1,
   autostart: true, 
  });
});

//siri message animation
 $('.siri-message').textillate({
        loop: true,
        sync: true,
        in: {
            effect: "fadeUpIn",
            sync: true,
        },
        out: {
            effect: "fadeOutup",
                sync: true,
        },
    });
  
// mic button click event
$("#MicBtn").click(function() {
    eel.playAssistantSound();
    $('#Oval').attr("hidden", true);
    $('#SiriWave').attr("hidden", false);
    eel.takeCommand()()
    eel.allcommands()()

}); 