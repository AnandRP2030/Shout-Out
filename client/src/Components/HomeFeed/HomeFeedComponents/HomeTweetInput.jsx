import style from "../homeFeed.module.css";
import ImageUploading from "react-images-uploading";
import {
  Grid,
  Image,
  GridItem,
  Select,
  Input,
  Link,
  Text,
  Icon,
  HStack,
  Button,
  Box,
} from "@chakra-ui/react";

import {
  MdSchedule,
  BsEmojiHeartEyes,
  CgPoll,
  TiDropbox,
  BsImage,
  IoLocationOutline,
  IoEarth,
} from "react-icons/all";
import { useState } from "react";

const HomeTweetInput = () => {
  const imageUrl =
    "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg?resize=1200:*";

  const [inputActive, setInputActive] = useState(false);

  const [dragAreaOpen, setDragAreaOpen] = useState(false);
  const uploadImg = () => {
    setDragAreaOpen(!dragAreaOpen);
  };

  // drag drop
  const [images, setImages] = useState();
  const maxNumber = 4;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <>
      <Grid
        // templateRows="repeat(10, 1fr)"
        templateColumns="repeat(11, 1fr)"
        gap={4}
        h={
          !inputActive && !dragAreaOpen
            ? "141px"
            : inputActive && dragAreaOpen
            ? "367px"
            : inputActive && !dragAreaOpen
            ? "222px"
            : dragAreaOpen && !inputActive
            ? "300px"
            : "222px"
        }
        className={style.tweetBox}
      >
        <GridItem colSpan={1}>
          <Image
            className={style.userProfilePic}
            src={imageUrl}
            alt="Profile"
          />
        </GridItem>
        <GridItem colSpan={10} display={inputActive ? "block" : "none"}>
          <Select w="120px" ml="0" className={style.selectAudience}>
            <option value="everyone">Everyone</option>
            <option value="private">Private</option>
          </Select>
        </GridItem>
        <GridItem
          ml={inputActive ? "80px" : "0"}
          colSpan={10}
          className={style.inputGrid}
        >
          <Input
            variant="unstyled"
            className={style.tweetInput}
            placeholder="What's happening?"
            onClick={() => setInputActive(!inputActive)}
          />
        </GridItem>
        <GridItem
          colSpan={10}
          display={inputActive ? "block" : "none"}
          ml="80px"
        >
          <Link href="#" style={{ textDecoration: "none" }}>
            <HStack className={style.replayAudience}>
              <Icon as={IoEarth} boxSize={5} />
              <Text>Everyone can replay</Text>
            </HStack>
          </Link>
        </GridItem>
        <GridItem colSpan={10} ml="80px">
          {/* start  */}

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
              <Box
                display={dragAreaOpen ? "flex" : "none"}
                className={style.dropbox}
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                <Icon as={TiDropbox} boxSize={10}></Icon>
                <Text ml="20px" fontSize={20}>
                  Drag and drop or click here
                </Text>
                {imageList.map((image, idx) => {
                  return (
                    <div key={idx}>
                      <Image w='20px' h='20px' src={image.data_url} alt="" width="100" />
                    </div>
                  );
                })}
              </Box>
            )}
          </ImageUploading>

          {/* end  */}
          <HStack className={style.tweetLine}>
            <HStack className={style.tweetIcons}>
              <Icon onClick={uploadImg} as={BsImage} boxSize={5} />
              <Icon as={CgPoll} boxSize={5} />
              <Icon as={BsEmojiHeartEyes} boxSize={5} />
              <Icon as={MdSchedule} boxSize={5} />
              <Icon as={IoLocationOutline} boxSize={5} />
            </HStack>
            <Button className={style.tweetBtn}> Tweet </Button>
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};
export default HomeTweetInput;
