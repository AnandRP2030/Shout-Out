import style from "../homeFeed.module.css";
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
  useBreakpointValue,
} from "@chakra-ui/react";

import {
  MdSchedule,
  BsEmojiHeartEyes,
  CgPoll,
  TiDropbox,
  BsImage,
  IoLocationOutline,
  IoEarth,
  ImImages,
} from "react-icons/all";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { NEW_TWEET_ADDED } from "../../../Redux/ActionTypes/tweetActionTypes.js";
import { store } from "../../../Redux/store.js";
import { useToast } from "@chakra-ui/react";

const HomeTweetInput = () => {
  const [tweetData, setTweetData] = useState({
    content: "",
    audience: "Everyone",
  });
  const [images, setImages] = useState(null);

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
    if (images) {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTweetData({ ...tweetData, [name]: value });
  };
  // tweeting
  const userTweeted = async () => {
    const tweetObj = {
      content: tweetData.content,
      imageUrls: images,
      audience: tweetData.audience,
    };
    const data = await sendToServer(tweetObj);
    setTweetData({
      content: "",
      audience: "",
    });
    setImages(null);

    toast({
      duration: 1500,
      position: "bottom-center",
      render: () => (
        <Box color="white" p={3} bg="#f91880">
          <Text textAlign="center"> Your Tweet was sent. </Text>
        </Box>
      ),
    });
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

  //image uploading
  const imageInputRef = useRef(null);

  const handleFileSelection = () => {
    imageInputRef.current.click();
  };
  const handleFileInput = (event) => {
    const API_BASE_URL = "https://api.cloudinary.com/v1_1/dpl5bxxv5";

    const file = event.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "shout-image-preset");
    data.append("cloud_name", "dpl5bxxv5");

    fetch(`${API_BASE_URL}/image/upload`, {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setImages(data.secure_url);
      })
      .catch((err) => console.log(err));
  };

  // responsive
  const tabletSize = useBreakpointValue([true, true, false]);
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
        <GridItem colSpan={tabletSize ? 2 : 1}>
          <Image
            className={style.userProfilePic}
            src={profilePicture}
            alt="Profile"
            w={["70%", "80%"]}
          />
        </GridItem>
        <GridItem
          colSpan={tabletSize ? 9 : 10}
          display={inputActive ? "block" : "none"}
        >
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
          colSpan={tabletSize ? 9 : 10}
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
          colSpan={tabletSize ? 9 : 10}
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
        <GridItem colSpan={tabletSize ? 11 : 11} ml="80px">
          {/* start  */}
          <Box
            display={dragAreaOpen ? "flex" : "none"}
            className={style.dropbox}
            onClick={handleFileSelection}
          >
            <Input
              type="file"
              ref={imageInputRef}
              style={{ display: "none" }}
              onChange={handleFileInput}
            />
            <Icon as={TiDropbox} boxSize={10}></Icon>
            <Text ml="20px" fontSize={20}>
              Click here
            </Text>
            <Image
              className={style.uploadingImages}
              display={images ? "block" : "none"}
              src={images}
              alt="..."
            />
          </Box>
          {/* end  */}
          <HStack w={["100%", "80%"]} className={style.tweetLine}>
            <HStack w={["50%", "50%", "25%"]} className={style.tweetIcons}>
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
