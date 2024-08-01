import React, { useState } from 'react';

const HF_TOKEN = "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";
const textToImageUrl = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4";

function Vaish() {
  const [inputTxt, setInputTxt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function query(data) {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(textToImageUrl, {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to generate image: ${errorDetails.error}`);
      }

      const result = await response.blob();
      const objectURL = URL.createObjectURL(result);
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
    query({ inputs: inputTxt });
  };

  return (
    <>
      <div>Vaish</div>
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

export default Vaish;
