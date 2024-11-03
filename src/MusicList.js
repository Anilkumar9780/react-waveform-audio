// import React, { useState, useRef } from "react";
// import ReactWaves from "@dschoon/react-waves";
// import "./App.css";

// const MusicList = ({audioBlob}) => {
//   const [playing, setPlaying] = useState(false);
//   const audioRef = useRef(null);

//   const handleWaveClick = (event) => {
//     if (!audioRef.current) return;
//     const waveContainer = event.target.closest(".react-waves");
//     const clickX = event.clientX - waveContainer.getBoundingClientRect().left;
//     const totalWidth = waveContainer.offsetWidth;
//     const clickPosition = clickX / totalWidth;
//     audioRef.current.currentTime = audioRef.current.duration * clickPosition;
//   };

//   return (
//     <div className="music-player">
//       {audioBlob ? (
//         <>
//           <ReactWaves
//             audioFile={audioBlob}
//             className="react-waves"
//             options={{
//               barWidth: 3,
//               barHeight: 5,
//               barGap: 6,
//               backend: "MediaElement",
//               normalize: true,
//               cursorWidth: 0,
//               mediaType: "audio",
//               hideScrollbar: true,
//               responsive: true,
//               progressColor: "#2492FC",
//               waveColor: "#E9EFF4",
//             }}
//             zoom={1}
//             volume={0.03}
//             playing={playing}
//             onClick={handleWaveClick} // Added onClick handler for the waveform
//           />
//           <audio
//             ref={audioRef}
//             src={audioBlob}
//             controls
//             onPlay={() => setPlaying(true)}
//             onPause={() => setPlaying(false)}
//           />
//         </>
//       ) : (
//         <p>Loading audio...</p>
//       )}
//     </div>
//   );
// };

// export default MusicList;



// class base components
import React, { Component } from "react";
import ReactWaves from "@dschoon/react-waves";
import "./App.css";

class MusicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTrack: this.props?.audioBlob,
            playing1: true
        };
    }

    componentDidMount() {
        var players = document.getElementsByTagName("audio");
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            player.id = "player" + i;
            player.controlsList = "nodownload";
            player.crossOrigin = "anonymous";
            player.volume = 0.1;
            player.controls = true;
        }
    }

    render() {
        return (
            <div className="music-player">
                {!this.state?.currentTrack || this.props?.isLoading ? (
                    <div className="loader"/>
                ) : (
                    <ReactWaves
                        audioFile={this.state?.currentTrack}
                        className={"react-waves"}
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
                            waveColor: "#E9EFF4"
                        }}
                        zoom={1}
                        volume={0.03}
                        playing={this.state.playing1}
                    />
                )}
            </div>
        );
    }
}
export default MusicList;

