$(document).ready(function() {
    console.log("🎤 Liva AI - Frontend Ready!");

    // =================================================================
    // 🎭 TEXT ANIMATIONS
    // =================================================================
    $('.text').textillate({
        loop: true,
        sync: true,
        in: { effect: "bounceIn" },
        out: { effect: "bounceOut" }
    });

    $('.siri1').textillate({
        loop: true,
        sync: true,
        in: { effect: "fadeInUp", sync: true },
        out: { effect: "fadeOutUp", sync: true }
    });

    // =================================================================
    // 🎵 SIRI WAVE SETUP
    // =================================================================
    let siriWave;
    try {
        siriWave = new SiriWave({
            container: document.getElementById("siri-container"),
            width: 640,
            height: 200,
            style: "ios9",
            amplitude: 2,
            speed: 0.2,
            frequency: 4,
            autostart: false
        });
        console.log("✅ SiriWave ready!");
    } catch (e) {
        console.error("❌ SiriWave error:", e);
    }

    // =================================================================
    // 🌍 GLOBAL STATE
    // =================================================================
    let isListening = false;
    let messageHistory = [];  // Chat history

    // =================================================================
    // 🖥️ MESSAGE SYSTEM (Exposed to Python)
    // =================================================================
    eel.expose(DisplayMessage);
    function DisplayMessage(message) {
        console.log("📱 Display:", message);
        addToHistory("LIVA", message);  // Add to history
        
        $(".siri1").text(message);  // Fixed selector
        
        // Restart animation
        $('.siri1').textillate('stop');
        setTimeout(() => $('.siri1').textillate('start'), 100);
    }

    // 💾 Message History
    function addToHistory(user = "", ai = "") {
        if (user) messageHistory.push({type: 'user', text: user, time: new Date().toLocaleTimeString()});
        if (ai) messageHistory.push({type: 'ai', text: ai, time: new Date().toLocaleTimeString()});
        console.log("💾 History length:", messageHistory.length);
    }

    // =================================================================
    // 🎤 VOICE CONTROL - MAIN MIC BUTTON
    // =================================================================
    $('#MicBtn').click(function(e) {  // Fixed arrow function
        e.preventDefault();
        toggleListening();
    });

    function toggleListening() {
        if (isListening) {
            stopListening();
            speak("Stopping assistant");
        } else {
            startListening();
        }
    }

    function startListening() {
        console.log("🎤 Listening started...");
        isListening = true;
        eel.playAssistantSound();
        
        // UI Switch - FIXED
        $('#Oval').hide().attr('hidden', true);
        $('#SiriWave').show().removeAttr('hidden');
        
        // Wave animation
        if (siriWave) siriWave.start();
        
        DisplayMessage("🔴 Listening...");
        processCommand();
    }

    function stopListening() {
        console.log("🛑 Listening stopped");
        isListening = false;
        
        // Stop wave
        if (siriWave) siriWave.stop();
        
        // UI Switch - FIXED
        $('#SiriWave').hide().attr('hidden', true);
        $('#Oval').show().removeAttr('hidden');
        
        DisplayMessage("Click 🎤 to start");
    }

    // =================================================================
    // 🧠 COMMAND PROCESSING
    // =================================================================
    function processCommand() {
        if (!isListening) return;
        
        DisplayMessage("👂 Listening...");
        if (siriWave) siriWave.start();

        eel.takeCommand()()
            .then(query => {
                console.log("👤 Heard:", query);
                
                if (!query?.trim()) {
                    if (isListening) setTimeout(processCommand, 800);
                    return;
                }
                
                // Stop wave during processing
                if (siriWave) siriWave.stop();
                
                // Show user query
                addToHistory(query);
                DisplayMessage(`You: ${query}`);
                
                handleCommand(query.toLowerCase().trim());
            })
            .catch(err => {
                console.error("❌ Error:", err);
                if (isListening) {
                    DisplayMessage("😵 Didn't hear clearly");
                    setTimeout(processCommand, 1500);
                }
            });
    }

    function handleCommand(query) {
        console.log("🤖 Processing:", query);
        
        // 🎯 Command Router
        if (query.includes("open") || query.includes("launch")) {
            DisplayMessage("🚀 Opening...");
            eel.opencommand(query);
        }
        else if (query.includes("play") || query.includes("youtube")) {
            DisplayMessage("🎵 Playing...");
            eel.Playyoutube(query);
        }
        else if (query.includes("search") || query.includes("google")) {
            DisplayMessage("🔍 Searching...");
            eel.googlesearch(query);
        }
        else if (query.includes("music") || query.includes("song")) {
            DisplayMessage("🎶 Playing music...");
            eel.youtubeplaymusic(query);
        }
        else if (query.includes("time") || query.includes("clock")) {
            const now = new Date().toLocaleTimeString();
            speak(`The time is ${now}`);
            DisplayMessage(`⏰ ${now}`);
        }
        else if (query.includes("date")) {
            const today = new Date().toLocaleDateString();
            speak(`Today is ${today}`);
            DisplayMessage(`📅 ${today}`);
        }
        else if (query.includes("stop") || query.includes("exit") || query.includes("quit")) {
            DisplayMessage("👋 Goodbye!");
            setTimeout(stopListening, 1000);
            return;
        }
        else if (query.includes("clear") || query.includes("history")) {
            messageHistory = [];
            DisplayMessage("🗑️ History cleared!");
            return;
        }
        else {
            eel.speak("Sorry, I didn't understand. Try 'open chrome', 'play music', or 'what time?'");
            DisplayMessage("❓ Try: open, play, search, time, date");
        }
        
        // Continue listening loop
        setTimeout(() => isListening && processCommand(), 3000);
    }

    // =================================================================
    // 🗣️ SPEAK HELPER
    // =================================================================
    function speak(text) {
        console.log("🗣️ Speaking:", text);
        DisplayMessage(text);
        eel.speakText(text);
    }

    // =================================================================
    // 📱 TEXT INPUT BUTTON
    // =================================================================
    $('#msg-btn').click(function(e) {
        e.preventDefault();
        const query = $('#chatbox').val().trim();
        if (query) {
            addToHistory(query);
            handleCommand(query.toLowerCase().trim());
            $('#chatbox').val('');
        } else {
            DisplayMessage("Please type a command...");
        }
    });

    // =================================================================
    // ⚙️ SETTINGS BUTTON
    // =================================================================
    $('#SettingsBtn').click(function(e) {
        e.preventDefault();
        console.log("⚙️ Settings!");
        eel.setting();
        DisplayMessage("⚙️ Settings opened");
    });

    // =================================================================
    // ⌨️ KEYBOARD SHORTCUTS
    // =================================================================
    $(document).keydown(function(e) {
        if (e.keyCode === 32) { // Spacebar → Toggle voice
            e.preventDefault();
            toggleListening();
        }
        if (e.keyCode === 27) { // Escape → Stop
            stopListening();
        }
        if (e.keyCode === 13 && e.ctrlKey) { // Ctrl+Enter → Send text
            $('#msg-btn').click();
        }
    });

    // =================================================================
    // 👁️ VISIBILITY HANDLING
    // =================================================================
    $(document).on('visibilitychange', function() {
        if (document.hidden && isListening) {
            console.log("👁️ Tab hidden → Stop listening");
            stopListening();
        }
    });

    // =================================================================
    // 🧪 WELCOME & AUTO TEST
    // =================================================================
    setTimeout(() => {
        DisplayMessage("🎤 Click mic or press Spacebar!");
        console.log("✅ main.js fully loaded!");
        console.log("📋 Commands: open, play, search, music, time, date");
        console.log("⌨️  Space=Voice, Esc=Stop, Ctrl+Enter=Text");
    }, 1500);

    console.log("🚀 Liva AI ready for action!");
});











/*$(document).ready(function() {
    console.log("🎤 Liva AI - Frontend Ready!");

    // Text animations
    $('.text').textillate({
        loop: true,
        sync: true,
        in: { effect: "bounceIn" },
        out: { effect: "bounceOut" }
    });

    $('.siri1').textillate({
        loop: true,
        sync: true,
        in: { effect: "fadeInUp", sync: true },
        out: { effect: "fadeOutUp", sync: true }
    });

    // Siri Wave setup
    let siriWave;
    try {
        siriWave = new SiriWave({
            container: document.getElementById("siri-container"),
            width: 640,
            height: 200,
            style: "ios9",
            amplitude: 2,
            speed: 0.2,
            frequency: 4,  
            autostart: false
        });
    } catch (e) {
        console.error("SiriWave error:", e);
    }

    // Global state
    let isListening = false;

    // 🖥️ Message Display Function (exposed to Python)
    eel.expose(DisplayMessage);
    function DisplayMessage(message) {
        console.log("📱 Display:", message);
        $(".siri1 li:first").text(message);
        
        // Restart animation
        $('.siri1').textillate('stop');
        setTimeout(() => $('.siri1').textillate('start'), 100);
    }

    // 🎤 MAIN MIC BUTTON
    $('#MicBtn').click(e => {
        e.preventDefault();
        toggleListening();
    });

    function toggleListening() {
        if (isListening) {
            stopListening();
            speak("Stopping assistant");
        } else {
            startListening();
        }
    }

    function startListening() {
        console.log("🎤 Listening started...");
        
        isListening = true;
        eel.playAssistantSound();
        
        // UI Switch
        $('#Oval').hide();
        $('#SiriWave').show();
        
        // Start wave animation
        if (siriWave) siriWave.start();
        
        DisplayMessage("🔴 Listening...");
        processCommand();
    }

    function stopListening() {
        console.log("🛑 Listening stopped");
        
        isListening = false;
        
        // Stop wave
        if (siriWave) siriWave.stop();
        
        // UI Switch
        $('#SiriWave').hide();
        $('#Oval').show();
        
        DisplayMessage("Click 🎤 to start");
    }

    function processCommand() {
        if (!isListening) return;
        
        DisplayMessage("👂 Listening...");
        if (siriWave) siriWave.start();

        eel.takeCommand()()
            .then(query => {
                console.log("👤 Heard:", query);
                
                if (!query?.trim()) {
                    if (isListening) setTimeout(processCommand, 800);
                    return;
                }
                
                // Stop wave during processing
                if (siriWave) siriWave.stop();
                
                // Show what user said
                DisplayMessage(`You: ${query}`);
                
                handleCommand(query.toLowerCase().trim());
            })
            .catch(err => {
                console.error("❌ Error:", err);
                if (isListening) {
                    eel.DisplayMessage("😵 Didn't hear");
                    setTimeout(processCommand, 1500);
                }
            });
    }
  
    



    function handleCommand(query) {
        console.log("🤖 Command:", query);
        
        // Command routing
        if (query.includes("open") || query.includes("launch")) {
            eel.opencommand(query);
        }
        else if (query.includes("play") || query.includes("youtube")) {
            eel.Playyoutube(query);
        }
        else if (query.includes("search") || query.includes("google")) {
            eel.googlesearch(query);
        }
        else if (query.includes("music") || query.includes("song")) {
            eel.youtubeplaymusic(query);
        }
        else if (query.includes("stop") || query.includes("exit") || query.includes("quit")) {
            DisplayMessage("👋 Goodbye!");
            setTimeout(stopListening, 1000);
            return;
        }
        else {
            eel.speak("Sorry, I didn't understand. Try 'open chrome' or 'play music'");
            DisplayMessage("❓ Command not recognized");
        }
        
        // Continue loop
        setTimeout(() => isListening && processCommand(), 2500);
    }

    // ⌨️ Keyboard Shortcuts
    $(document).keydown(e => {
        if (e.keyCode === 32) { // Spacebar
            e.preventDefault();
            toggleListening();
        }
        if (e.keyCode === 27) { // Escape
            stopListening();
        }
    });

    // Pause when tab loses focus
    $(document).on('visibilitychange', () => {
        if (document.hidden && isListening) stopListening();
    });

    console.log("✅ Ready! 🎤 Click mic or Spacebar");
});

*/























/*$(document).ready(function() {

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

/*
  
// mic button click event
/*$("#MicBtn").click(function() {
    eel.playAssistantSound();
    $('#Oval').attr("hidden", true);
    $('#SiriWave').attr("hidden", false);
    eel.speak()()
    eel.takeCommand()()
    eel.allcommands()()
    eel.opencommand()()
    eel.Playyoutube()()

}); */

/*eel.expose(DisplayMessage);
function DisplayMessage(message) {

    $(".siri-message li:first").text(message);

    // restart animation properly
    $('.siri-message').textillate('stop');
    $('.siri-message').textillate('start');
}

// Siri message animation
$('.siri1').textillate({
    loop: true,
    sync: true,
    in: {
        effect: "fadeInUp",   // smoother than fadeUpIn
        sync: true,
    },
    out: {
        effect: "fadeOutUp",  // ✅ fixed
        sync: true,
    },
});

/*$("#MicBtn").click(function () {

    eel.playAssistantSound();

    $('#Oval').attr("hidden", true);
    $('#SiriWave').attr("hidden", false);

    eel.takeCommand()().then(function (query) {

        console.log("User said:", query);

        if (!query) return;

        // Speak the command
        eel.speak(query);

        // Open app
        if (query.includes("open")) {
            eel.opencommand(query);
        }

        // Play YouTube
        if (query.includes("play")) {
            eel.Playyoutube(query);
        }

    });

});*/


/*function startAssistant() {

    eel.playAssistantSound();

    $('#Oval').attr("hidden", true);
    $('#SiriWave').attr("hidden", false);

    eel.takeCommand()().then(function (query) {

        console.log("User said:", query);

        if (!query) {
            return startAssistant(); // 🔁 restart listening
        }

        query = query.toLowerCase();

        // Execute commands
        if (query.includes("open")) {
            eel.opencommand(query);
        }
        else if (query.includes("play")) {
            eel.Playyoutube(query);
        }
        else {
            eel.speak("command not recognized");
        }

        // 🔁 START LISTENING AGAIN AFTER COMPLETION
        setTimeout(() => {
            startAssistant();
        }, 1000); // small delay (1 sec)

    });
}


// Button click
$("#MicBtn").click(function () {
    startAssistant();
});*/

/*let isListening = false;

function startAssistant() {

    if (!isListening) return;
    eel.allcommands()() // optional: to log all commands in Python console
    eel.takeCommand()().then(function (query) {

        console.log("User said:", query);
        eel.speak(query); // speak the command
        eel.DisplayMessage(query)  
        eel.speak("processing command..."); // feedback
        eel.DisplayMessage("processing command") 

        if (!query) {
            return startAssistant();
        }

        query = query.toLowerCase();

        if (query.includes("open")) {
            eel.opencommand(query);
        }
        else if (query.includes("play")) {
            eel.Playyoutube(query);
        }
        else if (query.includes("stop")) {

            eel.speak("stopping assistant");
            eel.DisplayMessage("Liva: Stopping assistant")


            isListening = false; // 🛑 stop loop

            // 🔥 UI CHANGE
            $('#SiriWave').attr("hidden", true);   // hide siri wave
            $('#Oval').attr("hidden", false);      // show main UI

            return;
        }
        else {
            eel.speak("please say  again...");
            eel.DisplayMessage("please say  again...");
        }

        if (isListening) {
            setTimeout(startAssistant, 1000);
        }

    });
}



// 🎤 START BUTTON
$("#MicBtn").click(function () {

    isListening = true;

    eel.playAssistantSound();

    // 🔥 UI CHANGE
    $('#Oval').attr("hidden", true);
    $('#SiriWave').attr("hidden", false);

    startAssistant();

let isListening = false;

function startAssistant() {

    if (!isListening) return;

    // Show listening message
    eel.DisplayMessage("Listening...");

    eel.takeCommand()().then(function (query) {

        console.log("User said:", query);

        if (!query) {
            setTimeout(startAssistant, 1200);
            return;
        }

        query = query.toLowerCase().trim();

        // Show user speech
        eel.DisplayMessage(query);

        // Small delay for natural feel
        setTimeout(() => {
            eel.speak("Processing command");
        }, 300);

        // ---------------- COMMANDS ----------------

        if (query.startsWith("open")) {
            eel.opencommand(query);
        }
        else if (query.startsWith("play")) {
            eel.Playyoutube(query);
        }
        else if (query.includes("stop") || query.includes("exit")) {

            eel.speak("Stopping assistant");
            eel.DisplayMessage("Liva: Stopping assistant");

            isListening = false;

            // UI switch
            $('#SiriWave').attr("hidden", true);
            $('#Oval').attr("hidden", false);

            return;
        }
        else {
            eel.speak("Please say again");
            eel.DisplayMessage("Command not recognized");
        }

        // 🔁 Continue loop
        if (isListening) {
            setTimeout(startAssistant, 1200);
        }

    }).catch(function (err) {
        console.error("Error:", err);
        setTimeout(startAssistant, 1500);
    });
}


// 🎤 START BUTTON
$("#MicBtn").click(function () {

    // Prevent multiple loops
    if (isListening) return;

    isListening = true;

    eel.playAssistantSound();

    // UI switch
    $('#Oval').attr("hidden", true);
    $('#SiriWave').attr("hidden", false);

    startAssistant();
});
*/




