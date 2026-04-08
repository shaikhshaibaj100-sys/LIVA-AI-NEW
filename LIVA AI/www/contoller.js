$(document).ready(function() {
    console.log("🎛️ Liva Controller - SIRI WAVE READY");

    // 🏠 Show Main UI
    eel.expose(showHood);
    function showHood() {
        console.log("🏠 Main UI");
        eel.DisplayMessage("Welcome back, sir!");
        eel.speak("welcome back sir");
        $('#Oval').show().removeAttr('hidden');
        $('#SiriWave').hide().attr('hidden', true);
        if (typeof siriWave !== 'undefined' && siriWave.stop) siriWave.stop();  // ✅ Fixed
    }

    // 👂 Show Siri UI
    eel.expose(showSiri);
    function showSiri() {
        console.log("👂 Siri UI");
        $('#Oval').hide().attr('hidden', true);
        //$('#SiriWave').hide().attr('hidden',false);
        $('#SiriWave').show().removeAttr('hidden');
        $('.siri1').text('🎤 Listening...');
        $('.siri1').css('font-size', '24px').css('color', '#fff').css('font-weight', 'bold').css('text-shadow', '0 0 10px #fff');
        if (typeof siriWave !== 'undefined' && siriWave.start) siriWave.start();
    }

    // Auto-focus chatbox
    $('#chatbox').focus();
});
    // 📱 Messages
    eel.expose(DisplayMessage);
    function DisplayMessage(text) {
        console.log("📱", text);
        $('.siri1').text(text);
    }

    // 🔥 SIRI WAVE - YOUR PERFECT SETTINGS
    var siriWave = new SiriWave({
        container: document.getElementById("siri-container"),
        width: 640,
        height: 200,
        cover: true,
        autostart: false,
        speed: 0.2,
        amplitude: 3,
        frequency: [0.2, 0.45],
        phase: 0
    });

    console.log("✅ SIRI WAVE INITIALIZED:", siriWave);

    // 🎵 Wave Controls
    eel.expose(startSiriWave);
    function startSiriWave() {
        console.log("▶️ Start SiriWave");
        if (siriWave && siriWave.start) siriWave.start();
    }

    eel.expose(stopSiriWave);
    function stopSiriWave() {
        console.log("⏹️ Stop SiriWave");
        if (siriWave && siriWave.stop) siriWave.stop();
    }

    // send button handler
        $('#sendBtn').click(function(e) {
        e.preventDefault();
        console.log("🎤 send button click")
        startSiriWave();
        });        
    // =================================================================
    // 🎛️ BUTTON HANDLERS - ALL FIXED! ✅
    // =================================================================

    // 🎤 MIC BUTTON - ALREADY CORRECT
    $('#MicBtn').click(function(e) {
        e.preventDefault();
        console.log("🎤 Mic clicked!");
        showSiri();
        eel.DisplayMessage("welcome back sir!");
        eel.speak("welcome back sir");
        eel.startAssistant();
    });

    /*$('#sendBtn').click(function(e) {
     e.preventDefault();
    console.log("🎤 send button click");
    showSiri();
    if 

        DisplayMessage("Please type something...")
    else
        DisplayMessage(`You: ${query}`); 
   
    eel.startAssistant();

     });/*

    $('#SendBtn').click(function(e) {  // ✅ Added SendBtn handler
        e.preventDefault();
        console.log("📱 Send button clicked!");
        const userInput = $('#chatbox').val().trim();
        if (userInput) {
            DisplayMessage(`You: ${userInput}`); 
            eel.handleCommand(userInput);  // Optionally trigger command processing
           
            $('#chatbox').val('');
        } else {
            DisplayMessage("Please type something...");
        }   
    });
    /* 📱 MESSAGE BUTTON - FIXED SELECTOR
    $('#msg-btn').click(function(e) {  // ✅ $('#msg-btn') NOT $('msg-btn')
        e.preventDefault();
        console.log("📱 Message button!");
        const userInput = $('#chatbox').val().trim();
        if (userInput) {
            DisplayMessage(`You: ${userInput}`);
            eel.messageAssistant(userInput);
            $('#chatbox').val('');
        } else {
            DisplayMessage("Please type something...");
        }
    });

    // ⚙️ SETTINGS BUTTON - FIXED SELECTOR  
    $('#SettingsBtn').click(function(e) {  // ✅ $('#SettingsBtn') NOT $('settings-btn')
        e.preventDefault();
        console.log("⚙️ Settings clicked!");
        eel.setting();
        // Optional: Show settings panel
        // toggleSettingsPanel();
    });*/

    // =================================================================
    // ⌨️ KEYBOARD SHORTCUTS
    // =================================================================
    $(document).keydown(function(e) {
        if (e.keyCode === 16) { // Shift → Siri
            e.preventDefault();
            showSiri();

        }
        if (e.keyCode === 27) { // Escape → Home
            showHood();
        }
        if (e.keyCode === 13 ) { // Ctrl+Enter → Send message
            $('#SendBtn').click();
            showSiri();
        }
    });

    // =================================================================
    // 🧪 AUTO TEST
    // =================================================================
    setTimeout(() => {
        console.log("🧪 Testing...");
        showSiri();
        setTimeout(() => {
            DisplayMessage("All buttons working!");
            showHood();
        }, 2000);
    }, 1000);

    console.log("✅ ALL BUTTONS FIXED!");
    console.log("🎤 #MicBtn → Voice");
    console.log("📱 #msg-btn → Text"); 
    console.log("⚙️ #SettingsBtn → Settings");
    console.log("⌨️ Space=Voice, Esc=Home, Ctrl+Enter=Send");






/*$(document).ready(function() {
    console.log("🎛️ Liva Controller - SIRI WAVE READY");

    // 🏠 Show Main UI
    eel.expose(showHood);
    function showHood() {
        console.log("🏠 Main UI");
        $('#Oval').show().removeAttr('hidden');
        $('#SiriWave').hide().attr('hidden', true);
        if (typeof siriWave !== 'undefined' && siriWave.stop) siriWave.stop();
    }

    // 👂 Show Siri UI
    eel.expose(showSiri);
    function showSiri() {
        console.log("👂 Siri UI");
        $('#Oval').hide().attr('hidden', true);
        $('#SiriWave').show().removeAttr('hidden');
        $('.siri1').text('🎤 Listening...');
        if (typeof siriWave !== 'undefined' && siriWave.start) siriWave.start();
    }

    // 📱 Messages
    eel.expose(DisplayMessage);
    function DisplayMessage(text) {
        console.log("📱", text);
        $('.siri1').text(text);
    }

    // 🔥 YOUR SIRI WAVE SETTINGS - PERFECT!
    var siriWave = new SiriWave({
        container: document.getElementById("siri-container"),
        width: 640,
        height: 200,
        cover: true,
        autostart: false,  // Don't auto start
        speed: 0.2,
        amplitude: 3,
        frequency: [0.2, 0.45],
        phase: 0
    });

    console.log("✅ SIRI WAVE INITIALIZED:", siriWave);

    // 🎵 Controls
    eel.expose(startSiriWave);
    function startSiriWave() {
        console.log("▶️ Start SiriWave");
        if (siriWave && siriWave.start) siriWave.start();
    }

    eel.expose(stopSiriWave);
    function stopSiriWave() {
        console.log("⏹️ Stop SiriWave");
        if (siriWave && siriWave.stop) siriWave.stop();
    }

    // 🎤 Mic Button
    $('#MicBtn').click(function(e) {
        e.preventDefault();
        console.log("🎤 Mic!");
        showSiri();
        eel.startAssistant();
    });
    $('msg-btn').click(function(e) {
        e.preventDefault();
        console.log("📱 Test Message!");
        eel.messageAssistant();
    });

    $('settings-btn').click(function(e) {
        e.preventDefault();
        console.log("⚙️ Settings button clicked!");
        eel.setting();
    }   );


    // ⌨️ Shortcuts
    $(document).keydown(function(e) {
        if (e.keyCode === 32) { // Spacebar
            e.preventDefault();
            showSiri();
        }
        if (e.keyCode === 27) { // Escape
            showHood();
        }
    });

    // 🧪 Auto test on load
    setTimeout(() => {
        console.log("🧪 Testing SiriWave...");
        showSiri();
        setTimeout(showHood, 3000);
    }, 2000);

    console.log("✅ READY! Spacebar = SiriWave");
});



/*$(document).ready(function() {
    console.log("🎛️ Liva AI Controller Loaded");

    // =================================================================
    // 🖥️ UI CONTROL FUNCTIONS (Exposed to Python)
    // =================================================================

    // 📱 Display messages on screen
    eel.expose(DisplayMessage);
    function DisplayMessage(query) {
        console.log("📱 Message:", query);
        
        // Update siri message list
        const siriMsg = $(".siri1 li:first");
        if (siriMsg.length) {
            siriMsg.text(query);
            // Restart textillate animation
            $('.siri1').textillate('stop');
            setTimeout(() => $('.siri1').textillate('start'), 100);
        }
        
        // Fallback if no siri-message
        const siri1 = document.querySelector(".siri1");
        if (siri1) {
            siri1.innerText = query;
        }
    }

    // 🟢 Show main UI (Oval/home screen) - FIXED
    eel.expose(showHood);
    function showHood() {
        console.log("🏠 Showing main UI");
        
        $('#Oval').show().removeAttr("hidden");
        $('#SiriWave').hide().attr("hidden", true);
        
        // Stop SiriWave
        if (window.siriWave) {
            window.siriWave.stop();
        }
    }

    // 🔴 Show listening UI (SiriWave) - FIXED
    eel.expose(showSiri);
    function showSiri() {
        console.log("👂 Showing listening UI");
        
        // Hide main UI
        $('#Oval').hide().attr("hidden", true);
        
        // Show SiriWave UI ✅ CORRECTED
        $('#SiriWave').show().removeAttr("hidden");
        
        // Display "Listening..." message
        DisplayMessage("Listening...");
        
        // Start SiriWave animation
        startSiriWave();
    }

    // =================================================================
    // 🎨 SIRI WAVE INITIALIZATION - FIXED
    // =================================================================
    window.siriWave = null;
    
    function initSiriWave() {
        const container = document.getElementById("siri-container");
        if (container && !window.siriWave) {
            try {
                window.siriWave = new SiriWave({
                    container: container,
                    autostart: false,
                    cover: true,
                    speed: 0.2,
                    amplitude: 2,
                    frequency: [0.1, 0.8],
                    phase: 0
                });
                console.log("✅ SiriWave initialized");
            } catch (e) {
                console.error("❌ SiriWave init failed:", e);
            }
        }
    }

    // Start SiriWave
    eel.expose(startSiriWave);
    function startSiriWave() {
        if (window.siriWave) {
            window.siriWave.start();
            console.log("🎵 SiriWave started");
        } else {
            // Try to init if not exists
            initSiriWave();
            setTimeout(startSiriWave, 100);
        }
    }

    // Stop SiriWave
    eel.expose(stopSiriWave);
    function stopSiriWave() {
        if (window.siriWave) {
            window.siriWave.stop();
            console.log("⏹️ SiriWave stopped");
        }
    }

    // Initialize SiriWave when DOM is ready
    setTimeout(initSiriWave, 500);

    // =================================================================
    // 🎛️ UI STATE MANAGEMENT
    // =================================================================
    let uiState = { isMainUI: true, isListeningUI: false };

    eel.expose(toggleUI);
    function toggleUI() {
        if (uiState.isMainUI) {
            showSiri();
            uiState.isMainUI = false;
            uiState.isListeningUI = true;
        } else {
            showHood();
            uiState.isMainUI = true;
            uiState.isListeningUI = false;
        }
    }

    eel.expose(resetUI);
    function resetUI() {
        console.log("🔄 Resetting to main UI");
        showHood();
        uiState.isMainUI = true;
        uiState.isListeningUI = false;
    }

    // =================================================================
    // 🎤 MIC BUTTON HANDLER
    // =================================================================
    $("#MicBtn").click(function(e) {
        e.preventDefault();
        console.log("🎤 Mic button clicked");
        eel.startAssistant();
    });

    // =================================================================
    // ⌨️ KEYBOARD SHORTCUTS
    // =================================================================
    $(document).keydown(function(e) {
        if (e.keyCode === 32) { // Spacebar
            e.preventDefault();
            toggleUI();
        }
        if (e.keyCode === 27) { // Escape
            e.preventDefault();
            resetUI();
        }
    });

    // Test buttons (remove in production)
    console.log("✅ Controller ready!");
    console.log("   Spacebar: Toggle UI");
    console.log("   Escape: Reset UI");
    console.log("   Mic Button: eel.startAssistant()");
});

*/



















/*$(document).ready(function() {
    console.log("🎛️ Liva AI Controller Loaded");

    // =================================================================
    // 🖥️ UI CONTROL FUNCTIONS (Exposed to Python)
    // =================================================================

    // 📱 Display messages on screen
    eel.expose(DisplayMessage);
    function DisplayMessage(query) {
        console.log("📱 Message:", query);
        
        // Update main text display
        document.querySelector(".siri1").innerText = query;
        
        // Also update siri message list if exists
        const siriMsg = $(".siri-message li:first");
        if (siriMsg.length) {
            siriMsg.text(query);
            // Restart textillate animation
            $('.siri-message').textillate('stop');
            setTimeout(() => $('.siri-message').textillate('start'), 100);
        }
    }
    // 🏠 Show main UI (Oval)
/*eel.expose(showHood);
function showHood() {
    console.log("🏠 Showing main UI");
    const $oval = $('#Oval');
    const $siriWave = $('#siri-container');
    
    if ($oval.length) {
        $oval.show().attr("hidden", false);
    }
    if ($siriWave.length) {
        $siriWave.hide().attr("hidden", true);
    }
}

// 👂 Show listening UI (SiriWave)
eel.expose(showSiri);
function showSiri() {
    console.log("👂 Showing listening UI");
    const $oval = $('#Oval');
    const $siriWave = $('#siri-container');
    
    if ($oval.length) {
        $oval.hide().attr("hidden", true);
    }
    if ($siriWave.length) {
        $siriWave.show().attr("hidden", false);
    } else {
        console.error("❌ #SiriWave element not found!");
    }
}
    // 🟢 Show main UI (Oval/home screen)
    eel.expose(showHood);
    function showHood() {
        console.log("🏠 Showing main UI");
        $('#Oval').attr("hidden", false);
        $('#SiriWave').attr("hidden", true);
    }

    // 🔴 Show listening UI (SiriWave)
    eel.expose(showSiri);
    function showSiri() {
        console.log("👂 Showing listening UI");
        $('#Oval').attr("hidden",false);
        $('#SiriWave').attr("hidden", true);
        eel.DisplayMessage("Listening...");
    }

    // =================================================================
    // 🎛️ UI STATE MANAGEMENT
    // =================================================================

    let uiState = {
        isMainUI: true,
        isListeningUI: false
    };

    // 🔄 Toggle between main and listening UI
    eel.expose(toggleUI);
    function toggleUI() {
        if (uiState.isMainUI) {
            showSiri();
            uiState.isMainUI = false;
            uiState.isListeningUI = true;
        } else {
            showHood();
            uiState.isMainUI = true;
            uiState.isListeningUI = false;
        }
    }

    // 💚 Reset to main UI (home screen)
    eel.expose(resetUI);
    function resetUI() {
        console.log("🔄 Resetting to main UI");
        showHood();
        uiState.isMainUI = true;
        uiState.isListeningUI = false;
    }

    // =================================================================
    // 🎨 ANIMATION CONTROLS
    // =================================================================

    // SiriWave control (if available)
    let siriWave;
    try {
        siriWave = new SiriWave({
            container: document.getElementById("siri-container"),
            autostart: false
        });
    } catch (e) {
        console.log("SiriWave not available");
    }

    eel.expose(startSiriWave);
    function startSiriWave() {
        if (siriWave) {
            siriWave.start();
            console.log("🎵 SiriWave started");
        }
    }

    eel.expose(stopSiriWave);
    function stopSiriWave() {
        if (siriWave) {
            siriWave.stop();
            console.log("⏹️ SiriWave stopped");
        }
    }

    // =================================================================
    // 🎤 MIC BUTTON HANDLER
    // =================================================================

    $("#MicBtn").click(function(e) {
        e.preventDefault();
        eel.startAssistant(); // Trigger Python assistant
    });

    // =================================================================
    // ⌨️ KEYBOARD SHORTCUTS
    // =================================================================

    $(document).keydown(function(e) {
        // Spacebar = Toggle UI
        if (e.keyCode === 32) {
            e.preventDefault();
            toggleUI();
        }
        // Escape = Reset to main UI
        if (e.keyCode === 27) {
            e.preventDefault();
            resetUI();
        }
    });

    console.log("✅ Controller ready!");
    console.log("   Spacebar: Toggle UI");
    console.log("   Escape: Reset UI");
});

*/























/*$(document).ready(function() {


eel.expose(DisplayMessage);
function DisplayMessage(query) {
    console.log(query);
    document.querySelector(".siri1").innerText = query;
}
//display hood animation
 eel.expose(showHood)
function showHood() {
    $('#Oval').attr("hidden",true);
    $('#SiriWave').attr("hidden", true);

}    






    // ---------------- });


/*$(document).ready(function()
 {DISPLAY MESSAGE ----------------
    eel.expose(DisplayMessage);
    function DisplayMessage(message) {
        $(".siri-message li:first").text(message);

        // restart animation properly
        $('.siri-message').textillate('stop');
        $('.siri-message').textillate('start');
    }

    // ---------------- SHOW MAIN HOOD ----------------
    eel.expose(showHood);
    function showHood() {

        // 🟢 Show main UI
        $('#Oval').attr("hidden", false);

        // 🔴 Hide Siri wave
        $('#SiriWave').attr("hidden", true);
    }

    // ---------------- SHOW LISTENING UI ----------------
   /* eel.expose(showSiri);
    function showSiri() {

        // 🔴 Hide main UI
        $('#Oval').attr("hidden", true);

        // 🟢 Show Siri wave
        $('#SiriWave').attr("hidden", false);
    }

});

eel.expose(showSiri);
function showSiri() {

    $('#Oval').attr("hidden", true);
    $('#SiriWave').attr("hidden", false);

  
}
*/
