// TTSMaker.com free API – supports Hindi/English
import axios from "axios";

export async function generateTTS(text) {
  // Hindi: hi-IN, English: en-US
  const lang = /[ऀ-ॿ]/.test(text) ? "hi-IN" : "en-US";
  const ttsApi = "https://api.ttsmaker.com/v1/create-tts-order";
  try {
    const res = await axios.post(ttsApi, {
      text,
      voice: lang === "hi-IN" ? "hi-IN-Neural2-C" : "en-US-Neural2-J",
      language: lang,
      output_type: "mp3"
    });
    if (res.data && res.data.speak_url) {
      return res.data.speak_url;
    }
    throw new Error("TTS failed");
  } catch {
    throw new Error("TTS API error");
  }
}