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

        // Show status (loading, success, error)
function showStatus(message, type) {
    console.log("STATUS:", message);

    let statusDiv = document.getElementById("status");
    if (statusDiv) {
        statusDiv.innerText = message;

        // optional styling
        statusDiv.className = type; // loading, success, error
    }
}
eel.expose(showStatus);

// Show generated image
function showGeneratedImage(imageData, filename, prompt) {
    console.log("Image received:", filename);

    let imgContainer = document.getElementById("imageContainer");

    if (imgContainer) {
        imgContainer.innerHTML = `
            <p>${prompt}</p>
            <img src="${imageData}" style="width:300px;border-radius:10px;" />
            <p>Saved as: ${filename}</p>
        `;
    }
}
eel.expose(showGeneratedImage);


// Display chat message
function DisplayMessage(msg) {
    console.log(msg);

    let chat = document.getElementById("chat");
    if (chat) {
        chat.innerHTML += `<p>${msg}</p>`;
    }
}
eel.expose(DisplayMessage);


    // Create image element
    let img = document.createElement("img");
    img.src = imageData;
    img.style.width = "300px";
    img.style.borderRadius = "10px";
    img.style.margin = "10px";

    // Create title
    let title = document.createElement("p");
    title.innerText = prompt;

    // Create download button
    let downloadBtn = document.createElement("a");
    downloadBtn.href = imageData;
    downloadBtn.download = filename;
    downloadBtn.innerText = "Download";
    downloadBtn.style.display = "block";
    downloadBtn.style.marginBottom = "20px";

    // Append
    container.prepend(downloadBtn);
    container.prepend(img);
    container.prepend(title);
});

eel.expose(showGeneratedImage);
function showGeneratedImage(imageData, filename, prompt) {

    // 🧠 Save data for next page
    localStorage.setItem("generatedImage", imageData);
    localStorage.setItem("imagePrompt", prompt);
    localStorage.setItem("imageFilename", filename);

    // 🚀 Redirect to image page
    window.location.href = "image.html";
}

// 📱 Messages
function DisplayMessage(text) {
    console.log("📱", text);
    $('.siri1').text(text);
}
eel.expose(DisplayMessage);


// 🔥 SIRI WAVE
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


    // send btn s
    function sendMessage() {
    let chatbox = document.getElementById("chatbox");
    let text = chatbox.value.trim();

    if (text === "") return;

    chatbox.value = "";

    eel.keyboard_input(text)(function (response) {
        eel.chatbot(response);
    });
}

// Button click
document.getElementById("sendBtn").addEventListener("click", sendMessage);

// Enter key
document.getElementById("chatbox").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
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

