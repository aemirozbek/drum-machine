import { links } from "./audio-clips";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
  let [displayedAudio, setDisplayedAudio] = useState("");

  function handleClick(index) {
    
      let myAudio = document.getElementById(keys[index]);
      myAudio.currentTime = 0;
      myAudio.play().catch(()=>{})

    setDisplayedAudio(audioName(links[index]));
  }
  function handleKeyDown(event) {
      let pressedKey = event.key.toUpperCase();
      if (keys.filter((elem) => elem === pressedKey).length === 0) return; //Check if the user pressed an undefined key
      let myAudio = document.getElementById(pressedKey);
      myAudio.currentTime = 0;
      myAudio.play().catch(()=>{})

    setDisplayedAudio(audioName(links[keys.indexOf(pressedKey)]));
  }

  function audioName(audioLink) {
    return audioLink.match(/drums\/(.*?)\.mp3/)?.[1] || null;
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{displayedAudio}</div>

      {links.map((link, index) => (
        <div
          id={audioName(links[index])}
          className="drum-pad"
          key={index}
          onClick={() => {
            handleClick(index);
          }}
        >
          {keys[index]}
          <audio id={keys[index]} className="clip" key={index} src={link} />
        </div>
      ))}
    </div>
  );
}

export default App;
