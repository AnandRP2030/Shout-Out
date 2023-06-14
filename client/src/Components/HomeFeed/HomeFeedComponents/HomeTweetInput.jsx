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
  Box,useBreakpointValue,
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
import { useState, useEffect } from "react";
import axios from "axios";
import { NEW_TWEET_ADDED } from "../../../Redux/ActionTypes/tweetActionTypes.js";
import { store } from "../../../Redux/store.js";
import {useToast} from "@chakra-ui/react";

const HomeTweetInput = () => {
  const [tweetData, setTweetData] = useState({
    content: "",
    audience: "Everyone",
  });
  const [images, setImages] = useState([]);
  const toast = useToast();
  const [profilePicture, setProfilePicture] = useState(
    "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg?resize=1200:*"
  );

  const [inputActive, setInputActive] = useState(false);

  const [dragAreaOpen, setDragAreaOpen] = useState(false);
  const uploadImg = (e) => {
    e.stopPropagation();
    setDragAreaOpen(!dragAreaOpen);
  };

  useEffect(() => {
    if (tweetData.content.length > 0) {
      setInputActive(true);
    } else {
      setInputActive(false);
    }
    if (images.length > 0) {
      setDragAreaOpen(true);
    }
  }, [images, tweetData]);

  useEffect(() => {
    const callData = async () => {
      let userData = await getUserDetails();
      setProfilePicture(userData.profilePicture);
    };
    callData();
  }, []);

  const getUserDetails = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const GET_USERDETAILS_URL = `${BASE_URL}/user/user-details`;
    let token = localStorage.getItem("token");
    token = token.replaceAll('"', "");
    let res = await axios.get(GET_USERDETAILS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  // drag drop

  const maxNumber = 4;
  const imageAdded = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTweetData({ ...tweetData, [name]: value });
  };
  // tweeting
  const userTweeted = async () => {
    const newImage = images?.map((elem) => {
      return elem.data_url;
    });

    const tweetObj = {
      content: tweetData.content,
      imageUrls: newImage,
      audience: tweetData.audience,
    };
    const data = await sendToServer(tweetObj);
    setTweetData({
      content: "",
      audience: "",
    });
    setImages([]);
  
    toast({
      duration: 1500,
      position: 'bottom-center',
      render: () => (
        <Box color='white' p={3} bg='#f91880'>
          <Text textAlign='center'> Your Tweet was sent. </Text>
        </Box>
      ),
    })

  };



  const sendToServer = async (tweet) => {
    let token = localStorage.getItem("token");
    token = token.replaceAll('"', "");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const createTweetUrl = `${
      import.meta.env.VITE_BASE_URL
    }/user/tweets/create`;
    const response = await axios.post(createTweetUrl, tweet, {
      headers: headers,
    });

    if (response.status === 201) {
     
      const addNewTweet = () => {
        return {
          type: NEW_TWEET_ADDED,
        };
      };
      store.dispatch(addNewTweet());
    }
    return response.data;
  };

  const tabletSize = useBreakpointValue([true, true, false])
  return (
    <>
      <Grid
        
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
            src={profilePicture}
            alt="Profile"
          />
        </GridItem>
        <GridItem colSpan={10} display={inputActive ? "block" : "none"}>
          <Select
            w="120px"
            ml="0"
            onChange={handleChange}
            className={style.selectAudience}
            name="audience"
            value={tweetData.audience}
          >
            <option value="Everyone">Everyone</option>
            <option value="Private">Private</option>
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
            name="content"
            onChange={handleChange}
            value={tweetData.content}
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
            onChange={imageAdded}
            maxNumber={maxNumber}
            acceptType={["jpg", "png", "gif "]}
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

                {images &&
                  images?.map((image, idx) => {
                    return (
                      <Box key={idx}>
                        <Image
                          src={image.data_url}
                          alt="uploading..."
                          className={style.uploadingImages}
                        />
                      </Box>
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
            <Button className={style.tweetBtn} onClick={userTweeted}>
              {" "}
              Shout{" "}
            </Button>
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};
export default HomeTweetInput;
