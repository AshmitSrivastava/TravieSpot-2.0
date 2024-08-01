import React, { useState } from 'react';
import { Client } from "@gradio/client";

const HF_TOKEN = "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"; // Replace with your Hugging Face token
const textToImageUrl = "https://api-inference.huggingface.co/models/TencentARC/PhotoMaker-V2";

function ImageGenerator() {
  const [inputTxt, setInputTxt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchImage(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    return await response.blob();
  }

  async function query(data) {
    try {
      setLoading(true);
      setError('');
      const exampleFile = await fetchImage('https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png');
      const client = await Client.connect("TencentARC/PhotoMaker-V2");

      const result = await client.predict("/generate_image", {
        upload_images: exampleFile,
        prompt: data.prompt,
        negative_prompt: data.negative_prompt,
        aspect_ratio_name: "Instagram (1:1)",
        style_name: "(No style)",
        num_steps: 20,
        style_strength_ratio: 15,
        num_outputs: 1,
        guidance_scale: 0.1,
        seed: 0,
        use_doodle: true,
        sketch_image: {
          background: exampleFile,
          layers: [],
          composite: null
        },
        adapter_conditioning_scale: 0.5,
        adapter_conditioning_factor: 0.5,
      });

      const objectURL = URL.createObjectURL(result[0]);
      setGeneratedImage(objectURL);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleGenerate = () => {
    if (!inputTxt.trim()) {
      setError('Please enter a text prompt.');
      return;
    }
    query({ prompt: inputTxt, negative_prompt: "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry" });
  };

  return (
    <>
      <div>Image Generator</div>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter your text prompt here..."
        value={inputTxt}
        onChange={(e) => setInputTxt(e.target.value)}
      />
      <br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {error && <p>{error}</p>}
      {generatedImage && (
        <div>
          <h2>Generated Image</h2>
          <img src={generatedImage} alt="Generated" />
        </div>
      )}
    </>
  );
}

export default ImageGenerator;
