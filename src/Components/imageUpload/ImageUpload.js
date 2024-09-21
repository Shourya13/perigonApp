import React from "react";

import "./imageUpload.scss";

const ImageUpload = (props) => {
  const { selectedImage, setSelectedImage } = props;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload is-flex is-flex-direction-column is-align-items-center">
      {selectedImage && (
        <img
          className="img-upload-preview"
          src={selectedImage}
          alt="Uploaded Preview"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-5 img-upload-input"
      />
    </div>
  );
};

export default ImageUpload;
