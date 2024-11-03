import React, { useState, useEffect, useRef } from "react"; 
import ReactWaves from "@dschoon/react-waves";
import "./App.css";

const MusicList = () => {
  const [playing, setPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRef = useRef(null);

  const fetchAudioBlob = async () => {
    try {
      const response = await fetch("https://s3.eu-central-1.amazonaws.com/some-sprouts/Mindcrush.mp3"); // Changed URL for testing
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      setAudioBlob(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  useEffect(() => {
    fetchAudioBlob();
  }, []);

  return (
    <div className="music-player">
      {audioBlob ? (
        <>
          <ReactWaves
            audioFile={audioBlob}
            className="react-waves"
            options={{
              barWidth: 3,
              barHeight: 5,
              barGap: 6,
              backend: "MediaElement",
              normalize: true,
              cursorWidth: 0,
              mediaType: "audio",
              hideScrollbar: true,
              responsive: true,
              progressColor: "#2492FC",
              waveColor: "#E9EFF4",
            }}
            zoom={1}
            volume={0.03}
            playing={playing}
          />
          <audio
            ref={audioRef}
            src={audioBlob}
            controls
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        </>
      ) : (
        <p>Loading audio...</p>
      )}
    </div>
  );
};

const Music = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app">
      <button onClick={openModal}>Open Modal</button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
            <MusicList />
          </div>
        </div>
      )}
    </div>
  );
};

export default Music;