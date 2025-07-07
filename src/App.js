import React, { useState } from "react";
import NewsInput from "./components/NewsInput";
import StoryOutput from "./components/StoryOutput";
import "./styles/App.css";

function App() {
  const [newsScript, setNewsScript] = useState("");
  const [story, setStory] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loadingStory, setLoadingStory] = useState(false);
  const [loadingVoice, setLoadingVoice] = useState(false);
  const [theme, setTheme] = useState("light");

  const handleGenerateStory = async () => {
    setLoadingStory(true);
    setStory("");
    try {
      // ai.js: call AI API
      const { generateStory } = await import("./api/ai");
      const result = await generateStory(newsScript);
      setStory(result);
    } catch (err) {
      setStory("⚠️ Story generate nahi ho paayi. Please try again.");
    }
    setLoadingStory(false);
  };

  const handleGenerateVoice = async () => {
    setLoadingVoice(true);
    setAudioUrl("");
    try {
      // tts.js: call TTS API
      const { generateTTS } = await import("./api/tts");
      const result = await generateTTS(story);
      setAudioUrl(result);
    } catch (err) {
      setAudioUrl("");
      alert("⚠️ Voice generate nahi ho paayi.");
    }
    setLoadingVoice(false);
  };

  return (
    <div className={`app-container ${theme}`}>
      <header>
        <h1>📰 AI News App</h1>
        <button className="theme-btn" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>
      <main>
        <NewsInput value={newsScript} onChange={setNewsScript} />
        <button className="main-btn" onClick={handleGenerateStory} disabled={!newsScript || loadingStory}>
          {loadingStory ? "Generating..." : "Generate Story"}
        </button>
        <StoryOutput story={story} />
        {story && (
          <button className="main-btn" onClick={handleGenerateVoice} disabled={loadingVoice}>
            {loadingVoice ? "Generating Voice..." : "Speak"}
          </button>
        )}
        {audioUrl && <StoryOutput.AudioPlayer audioUrl={audioUrl} />}
      </main>
      <footer>
        <small>Made free by AI ✨ | No login, no ads!</small>
      </footer>
    </div>
  );
}

export default App;