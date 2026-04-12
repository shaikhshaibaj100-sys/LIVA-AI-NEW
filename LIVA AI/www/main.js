
//this function runs perfectly
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
    $('#SendBtn').click(function(e) {  // Text input button
        e.preventDefault();
        const query = $('#chatbox').val().trim();
        if (query) {
            handleCommand(query.toLowerCase().trim());
            return;
        }

        else {
            DisplayMessage("Please type a command...");
        }       
        
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
       
        $('#Oval').hide().attr('hidden',true);
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

        $('#SiriWave').hide().attr('hidden',true);
        $('#Oval').show().removeAttr('hidden');
        stopListening();
        speakeroff();
        toggleListening();

        
        DisplayMessage("Click 🎤 to start");
    }

    function speakeroff() {
        console.log("🛑 Speaking stopped"); 
            if (siriWave) siriWave.stop();

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
            eel.speak("Opening...",query);
            DisplayMessage("🚀 Opening...");
            eel.opencommand(query);
        }
        else if (query.includes("play") || query.includes("youtube")) {
            eel.speak("Playing...",query);
            DisplayMessage("🎵 Playing...");
            eel.Playyoutube(query);
        }
        else if (query.includes("search") || query.includes("google")) {
            eel.speak("Searching...",query);      
            DisplayMessage("🔍 Searching...");
            eel.googlesearch(query);
        }
        else if (query.includes("create image") || query.includes("generate image")) {
            eel.speak("Creating image...",query);
            DisplayMessage("🖼️ Creating image...");
            eel.createimage (query);
        }
        else if (query.includes("music") || query.includes("song")) {
            eel.speak("Playing music...",query);

            DisplayMessage("🎶 Playing music...");
            eel.youtubeplaymusic(query);
        }
        
        else if(query.includes("hii") || query.includes("hello") || query.includes("hey")) {
           // eel.speak("Hello! How can I assist you today?");
            DisplayMessage("👋 Hello! How can I assist you today?");
            eel.chatbot(query)();
        }
        
        else if(query.includes("Assistant name") || query.includes("your name") || query.includes("who are you")) {
            //eel.speak("AM LIVA OUR PERSONAL AI ASSISTANT");
           // DisplayMessage("am liva our personal ai assistant");
            eel.chatbot(query)();
        }

        


        else if (query.includes("what")|| query.includes("who") || query.includes("when") || query.includes("where") || query.includes("why") || query.includes("how")) {
            eel.speak("Let me find that out...");
            DisplayMessage("🔎 Let me find that out...");
            eel.googlesearch(query)();
        }
        else if (query.includes("how are you")) {
            eel.speak("I'm doing well. How can I help you?");
            DisplayMessage(`🤔 ${response}`);
            eel.chatbot(query)();
        }
        else if (query.includes("who are you") || query.includes(" your name")) {
            eel.speak("I'm Liva, your AI assistant!");
            DisplayMessage("👤 I'm Liva, your AI assistant!");
            eel.chatbot(query)();
        }
        else if (query.includes("time") || query.includes("clock")) {
            let now = new Date();

           let hours = now.getHours();       // 0–23
           let minutes = now.getMinutes();   // 0–59
           let seconds = now.getSeconds();   // 0–59

        console.log(hours + ":" + minutes + ":" + seconds);
            //eel.speak("The current time is " + hours + ":" + minutes);
           // DisplayMessage(`⏰ ${hours}:${minutes}`);
            eel.chatbot(query);
        }

        else if (query.includes("date")) {
            let day = now.getDate();      // Day of month
            let month = now.getMonth();   // 0–11 (0 = January)
            let year = now.getFullYear();

        console.log(day + "/" + (month + 1) + "/" + year);
           // eel.speak("Today's date is " + day + "/" + (month + 1) + "/" + year);
           // DisplayMessage(`📅 ${day}/${month + 1}/${year }`);
            eel.chatbot(query);
        }

        
        else if (query.includes("sleep pc") || query.includes("sleep")) {
            eel.speak("Sleeping in 10 seconds...");
            DisplayMessage("🔌 Sleeping...");
            eel.sleep_computer();
        }

        else if (query.includes("stop") || query.includes("exit") || query.includes("quit")) {
            eel.speak("Goodbye!");
            DisplayMessage("👋 Goodbye!");
            setTimeout(stopListening, 1000);
            eel.chatbot(query);
            return;
        }
        else if (query.includes("clear") || query.includes("history")) {
            messageHistory = [];
            DisplayMessage("🗑️ History cleared!");
            eel.chatbot(query);
            return;
        }
        else {
            eel.speak("Sorry, I didn't understand that. ");
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
        if (e.keyCode === 16) { // Shift → Toggle voice
            e.preventDefault();
            toggleListening();
        }
        if (e.keyCode === 27) { // Escape → Stop
            stopListening();
            showHood();
        }
        if (e.keyCode === 13 ) { // Ctrl+Enter → Send text
            $('#sendBtn').click();
            showSiri();
            handleCommand($('#chatbox').val().trim().toLowerCase());
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



