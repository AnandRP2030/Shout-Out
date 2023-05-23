import ImageUploading from "react-images-uploading";
import { useState } from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import style from "./image.module.css";
import { TiDropbox } from "react-icons/ti";

const ImageUpload = ({ dragAreaOpen }) => {
  const [images, setImages] = useState();
  const maxNumber = 4;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className={style.App} color="black">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className={style.imageitemwrapper}>
            <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className={style.image_item}>
                <img src={image.data_url} alt="" width="100" />
                <div className={style.imageitemwrapper}>
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};
export default ImageUpload;
