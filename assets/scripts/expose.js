// expose.js

var jsConfetti = null;
window.addEventListener('DOMContentLoaded', init);

function init() {
  if(jsConfetti == null){
    jsConfetti = new JSConfetti();
  }
  let hornSelector = document.getElementById('horn-select');

  hornSelector.addEventListener('change', (e)=>{
    let hornSelector = e.target;
    let value = hornSelector.value;

    // set image
    let img = document.querySelector('[alt="No image selected"]');
    img.src = `./assets/images/${value}.svg`;
    
    // set sound
    let audio = document.getElementsByTagName('audio')[0];
    audio.src = `./assets/audio/${value}.mp3`;
  });

  let volumeSlider = document.getElementById('volume');

  volumeSlider.addEventListener('change', (e)=>{
    let volumeSlider = e.target;
    let value = volumeSlider.value;

    // set volume level image
    let level = value == 0 ? 0 : Math.min(3, Math.ceil(value/33));
    let levelImg = document.querySelector('[alt="Volume level 2"]');
    levelImg.src = `./assets/icons/volume-level-${level}.svg`;
    
    // set sound volume
    let audio = document.getElementsByTagName('audio')[0];
    audio.volume = value/100;
  });

  let playBtn = document.getElementsByTagName('button')[0];
  console.log(playBtn)
  playBtn.addEventListener('click', (e)=>{
    // play sound
    let audio = document.getElementsByTagName('audio')[0];
    audio.play();

    // check for confetti
    if(document.getElementById('horn-select').value == 'party-horn'){
      // for(let i = 0; i < 1000; i++){
        jsConfetti.addConfetti();
      // }
    }
  });
}