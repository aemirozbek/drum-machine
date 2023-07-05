import { links1, links2, displayNames } from "./audio-clips";
import { useState, useEffect } from "react";

function App() {
  const keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
  let [volume, setVolume] = useState("1");
  let [displayScreen, setDisplayScreen] = useState("");
  let [bank, setBank] = useState(links1);

  function handleClick(index) {
    let myAudio = document.getElementById(keys[index]);
    myAudio.currentTime = 0;
    myAudio.play().catch(() => {});

    let myAudioName = audioName(bank[index]);
    addAndRemoveClickedClass(myAudioName);
    setDisplayScreen(displayNames[myAudioName]);
  }

  function handleKeyDown(event) {
    let pressedKey = event.key.toUpperCase();
    if (keys.filter((elem) => elem === pressedKey).length === 0) return; //Check if the user pressed an undefined key
    let myAudio = document.getElementById(pressedKey);
    myAudio.currentTime = 0;
    myAudio.play().catch(() => {});

    let myAudioName = audioName(bank[keys.indexOf(pressedKey)]);
    addAndRemoveClickedClass(myAudioName);
    setDisplayScreen(displayNames[myAudioName]);
  }

  function addAndRemoveClickedClass(audioNameParameter) {
    //For the color change of the clicked drum pad
    let clickedPad = document.getElementById(audioNameParameter);
    clickedPad.classList.add("clicked");
    setTimeout(() => {
      clickedPad.classList.remove("clicked");
    }, 100);
  }

  function audioName(audioLink) {
    return audioLink.match(/drums\/(.*?)\.mp3/)?.[1] || null;
  }

  function volumeControl(event) {
    const newVolume = parseFloat(event.target.value);
    setDisplayScreen("Volume: " + (newVolume * 100).toFixed(0));
    setTimeout(() => {
      setDisplayScreen("");
    }, 1000);
    setVolume(newVolume);
    let audioFiles = document.getElementsByClassName("clip");
    for (var i = 0; i < audioFiles.length; i++) {
      audioFiles[i].volume = newVolume;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div id="main-wrapper">
      <div id="drum-machine">
        <div id="drum-wrapper-wrapper">
          <div id="drum-wrapper">
            {bank.map((link, index) => (
              <div
                id={audioName(bank[index])}
                className="drum-pad"
                key={index}
                onClick={() => {
                  handleClick(index);
                }}
              >
                {keys[index]}
                <audio
                  id={keys[index]}
                  className="clip"
                  key={index}
                  src={link}
                />
              </div>
            ))}
          </div>
        </div>
        <div id="options-wrapper">
          <div id="display">{displayScreen}</div>
          <div id="volumeSlider">
            <input
              type="range"
              className="form-range"
              id="volumeRange"
              max="1"
              min="0"
              step="0.01"
              value={volume}
              onChange={volumeControl}
            />
          </div>
          <div id="switch-wrapper">
            <p id="switch-text">Bank Switch</p>
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => {
                  bank === links1 ? setBank(links2) : setBank(links1);
                }}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
