// Use OpenAI or HuggingFace inference endpoint
// For demo: use HuggingFace's public "google/flan-t5-base" for summarization
// For production: Use your own key or API

import axios from "axios";

export async function generateStory(inputText) {
  // Example using HuggingFace Inference API (NO API key needed for certain models)
  const HF_API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-base";
  const prompt = `Summarize this news in a dramatic story style:\n${inputText}`;
  try {
    const res = await axios.post(
      HF_API_URL,
      { inputs: prompt },
      { headers: { Accept: "application/json" } }
    );
    if (res.data && res.data[0]?.generated_text) {
      return res.data[0].generated_text;
    }
    return "Story generation failed.";
  } catch {
    return "Failed to connect to AI API.";
  }
}