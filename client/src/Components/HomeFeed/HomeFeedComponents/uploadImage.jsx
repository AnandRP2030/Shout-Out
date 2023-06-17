import React, { useState } from "react";
const UploadImage = () => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const API_BASE_URL = 'https://api.cloudinary.com/v1_1/dpl5bxxv5';
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "shout-image-preset");
    data.append("cloud_name", "dpl5bxxv5");
    fetch(`${API_BASE_URL}/image/upload`, {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.secure_url );
        console.log(data)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={url} />
      </div>
    </div>
  );
};
export default UploadImage;
