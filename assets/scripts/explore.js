// explore.js

window.addEventListener('DOMContentLoaded', init);

var voiceMap = new Map();

var voiceSelectionPopulated = false;
// has a check to run again in case it did not load the voices the first time
function populateVoiceSelection(){
  if(voiceSelectionPopulated){
    return;
  }
  let textToSpeakSelect = document.getElementById('voice-select');
  let allVoices = window.speechSynthesis.getVoices();
  if(allVoices.length > 0){
    voiceSelectionPopulated = true;
  }
  console.log(allVoices);
  allVoices.forEach(voice => {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;

    if (voice.default) {
      option.textContent += " — DEFAULT";
    }
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    textToSpeakSelect.appendChild(option);
    voiceMap.set(option.textContent, voice);
  });
}

function init() {
  let textToSpeakTextField = document.getElementById('text-to-speak');
  let textToSpeakButton = document.getElementsByTagName('button')[0];
  let textToSpeakSelect = document.getElementById('voice-select');
  let voiceImage = document.querySelector('[alt="Smiling face"]');
  populateVoiceSelection();
  
  // has a check to run again in case it did not load the voices the first time
  window.speechSynthesis.addEventListener('onvoiceschanged', populateVoiceSelection);
  textToSpeakSelect.addEventListener('click', ()=>populateVoiceSelection());

  textToSpeakButton.addEventListener('click', ()=>{
    voiceImage.src = "./assets/images/smiling-open.png";
    let utterance = new SpeechSynthesisUtterance(textToSpeakTextField.value);
    utterance.voice = voiceMap.get(textToSpeakSelect.value);
    window.speechSynthesis.speak(utterance);
    var voiceSpeakingCheckInterval = setInterval(()=>{
      if(!window.speechSynthesis.speaking){
        voiceImage.src = "./assets/images/smiling.png"
        clearInterval(voiceSpeakingCheckInterval);
      }
    }, 100);
  });
  
}