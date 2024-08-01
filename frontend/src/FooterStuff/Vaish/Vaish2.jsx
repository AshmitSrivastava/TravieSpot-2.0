import React, { useState } from 'react';

const HF_TOKEN = "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"; // Replace with your actual token
const modelUrl = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large";

const ImageCaptioning = () => {
  const [imageFile, setImageFile] = useState(null);
  const [finRes, setFinRes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const fetchImageAndCaption = async () => {
    if (!imageFile) {
      setError('Please upload an image.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Convert the image file to a Blob
      const imageBlob = new Blob([imageFile], { type: imageFile.type });
      
      // Log the image Blob
      console.log('Image Blob:', imageBlob);

      // Perform inference
      const inferenceResponse = await fetch(modelUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/octet-stream', // Proper content type for binary data
        },
        body: imageBlob,
      });

      // Log the inference request details
      console.log('Request to model URL:', modelUrl);
      console.log('Request headers:', {
        Authorization: `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/octet-stream'
      });

      if (!inferenceResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await inferenceResponse.json();

      // Log the inference result
      console.log('Inference Result:', result);
      
      // Set the caption using `generated_text`
      setFinRes(result[0]?.generated_text || 'No caption available');
    } catch (err) {
      console.error('Error performing image captioning:', err);
      setError('Error performing image captioning: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Image Captioning</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={fetchImageAndCaption} disabled={!imageFile}>
        Generate Caption
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {finRes && <p><strong>Caption:</strong> {finRes}</p>}
    </div>
  );
};

export default ImageCaptioning;
