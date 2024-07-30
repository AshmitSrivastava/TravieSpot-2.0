import React, { useState } from 'react';
import axios from 'axios';

const Vaish = () => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [images, setImages] = useState([]);
  const [generatedImage, setGeneratedImage] = useState('');

  const handleFileChange = (event) => {
    setImages([...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('prompt', prompt);
    formData.append('negativePrompt', negativePrompt);

    try {
      const response = await axios.post('YOUR_MODEL_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setGeneratedImage(response.data.imageUrl); // Adjust based on your API response
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Prompt:</label>
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </div>
        <div>
          <label>Negative Prompt:</label>
          <input type="text" value={negativePrompt} onChange={(e) => setNegativePrompt(e.target.value)} />
        </div>
        <div>
          <label>Upload Images:</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <button type="submit">Generate Image</button>
      </form>
      {generatedImage && <img src={generatedImage} alt="Generated" />}
    </div>
  );
};

export default Vaish;
