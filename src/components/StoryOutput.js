import React from "react";

const StoryOutput = ({ story }) => (
  <div className="story-section">
    <label>Generated Story:</label>
    <div className="story-box">{story || <span className="placeholder">Story will appear here…</span>}</div>
  </div>
);

const AudioPlayer = ({ audioUrl }) => (
  <div className="audio-section">
    <label>🔊 Listen or Download:</label>
    <audio controls src={audioUrl} />
    <a href={audioUrl} download="news-story.mp3" className="download-btn">
      Download MP3
    </a>
  </div>
);

StoryOutput.AudioPlayer = AudioPlayer;
export default StoryOutput;