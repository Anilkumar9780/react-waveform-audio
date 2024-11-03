import React, { useState } from "react";
import MusicList from "./MusicList";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false)
  };

  const handleOpenModal = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("https://s3.eu-central-1.amazonaws.com/some-sprouts/Mindcrush.mp3"); // Changed URL for testing
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      setAudioBlob(URL.createObjectURL(blob));
      setIsModalOpen(true)
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false)
      console.error("Error fetching audio:", error);
    }
  };

  return (
    <div className="app">
      <button className="btn" onClick={() => handleOpenModal()}>Open Modal</button>
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => handleCloseModal()}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="close-modal-heading" >Audio Playback</h2>
            <button className="close-modal" onClick={() => handleCloseModal()}>X</button>
            <MusicList audioBlob={audioBlob} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;