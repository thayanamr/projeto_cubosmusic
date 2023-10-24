import "./App.css";
import logo from "./assets/logo.svg";
import profile from "./assets/profile.jpg";
import { musics } from "./musics.js";
import next from "./assets/next.svg";
import pause from "./assets/pause.svg";
import play from "./assets/play.svg";
import previous from "./assets/previous.svg";
import stop from "./assets/stop.svg";
import { useEffect, useRef } from "react";
import { useState } from "react";

function App() {
  const [atualMusic, setAtualMusic] = useState({ url: "" });
  const [playerState, setPlayerState] = useState({
    playing: false,
  });

  function handlePlay() {
    if (!atualMusic.id) {
      setAtualMusic(musics[0]);
    }

    setPlayerState({
      ...playerState,
      playing: !playerState.playing,
    });
  }

  useEffect(() => {
    if (atualMusic.id) {
      if (!playerState.playing) {
        const audio = document.querySelector("#Player");
        audio.pause();
      } else {
        const audio = document.querySelector("#Player");
        audio.play();
      }
    }
  }, [playerState.playing]);

  useEffect(() => {
    if (playerState.playing) {
      const audio = document.querySelector("#Player");
      audio.play();
    }
  }, [atualMusic]);

  function playMusic(music) {
    setPlayerState({ playing: true });
    setAtualMusic(music);
  }

  function handlePrevious() {
    if (atualMusic.id === musics[0].id) {
      setAtualMusic(musics[musics.length - 1]);
    } else {
      setAtualMusic(musics[atualMusic.id - 2]);
    }
  }

  function handleNext() {
    if (atualMusic.id === musics[musics.length - 1].id) {
      setAtualMusic(musics[0]);
    } else {
      setAtualMusic(musics[atualMusic.id]);
    }
  }

  function handleStop() {
    const audio = document.querySelector("#Player");
    audio.pause();
    audio.currentTime = 0;
    setPlayerState({ playing: false });
  }

  return (
    <div className="container">
      <header>
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="profile">
          <img src={profile} />
          Bem-vindo, Daniel.
        </div>
      </header>
      <section>
        <div className="grid">
          <div className="grid-title">The best play list</div>

          <div className="grid-card">
            <audio src={atualMusic.url} id={"Player"} />
            {musics.map((music) => {
              return (
                <div key={music.id}>
                  <button onClick={() => playMusic(music)}>
                    <img src={music.cover} />
                    <h3>{music.title}</h3>
                    <p>{music.description}</p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <footer>
        <div className="listening">
          <h2>{atualMusic.title}</h2>
          <h3>{atualMusic.artist}</h3>
        </div>
        <div className="player">
          <div className="player-buttons">
            <button onClick={() => handleStop()}>
              <img src={stop} />
            </button>
            <button onClick={() => handlePrevious()}>
              <img src={previous} />
            </button>

            <button onClick={() => handlePlay()}>
              {playerState.playing ? <img src={pause} /> : <img src={play} />}
            </button>

            <button onClick={() => handleNext()}>
              <img src={next} />
            </button>
          </div>
          <div className="player-bar"></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
