import { useState, useEffect } from 'react';
import axios from 'axios';
import './ImagesDetails.css'; // Updated CSS file name

const ImagesDetails = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://18.60.190.183:3000/getImages');
        setImages(response.data);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="images-details-container">
      <h2>Images Gallery</h2>
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div className="images-gallery">
          {images.map((image) => (
            <div className="image-item" key={image.id} onClick={() => handleImageClick(image)}>
              <img src={image.url} alt={image.description} />
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="image-modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <img src={selectedImage.url} alt={selectedImage.description} />
            <p>{selectedImage.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesDetails;
