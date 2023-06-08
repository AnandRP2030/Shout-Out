import {
  Button,
  GridItem,
  HStack,
  Icon,
  Textarea,
  Image,
  Box,
} from "@chakra-ui/react";
import { BsEmojiHeartEyes, BsImage } from "react-icons/bs";
import { CgPoll } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import { MdSchedule } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import style from "../HomeFeed/HomeTweets/tweet.module.css";
import style2 from "../HomeFeed/HomeTweets/tweet.module.css";

const TweetReplay = () => {
  const [commentContent, setCommentContent] = useState("");
  const [inputActive, setInputActive] = useState(false);

  const newComment = async () => {
    if (!commentContent) return;
    let res = await saveComment(commentContent);
    if (res.status === 201) {
      console.log("comment added");
    } else {
      console.log(res);
    }

    dispatch({ type: TWEET_EDITED });
    toggleCommentBox(index);
    setCommentBox(false);
  };

  const saveComment = async (commentContent) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    let token = localStorage.getItem("token").replaceAll('"', "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let tweetId = tweetInfo.tweetId;
    const COMMENT_URL = `${BASE_URL}/user/tweets/comment/${tweetId}`;
    let res = await axios.patch(COMMENT_URL, { commentContent }, config);
    return res;
  };
  return (
    <Box margin="auto" w="80%">
      <HStack className={style.userProfilePicBox} colSpan={1}>
        <GridItem >
          <Image
            className={style.userProfilePic}
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="userProfilePic"
          />
        </GridItem>
        <GridItem h="120px" colSpan={9}>
          <Textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            h="120px"
            fontSize="1.2rem"
            letterSpacing={2}
            placeholder="Tweet your replay!"
            onFocus={() => {
              inputActive(true);
            }}
            onBlur={() => {
              inputActive(false);
            }}
          />

          <Button onClick={newComment} className={style2.tweetBtn}>
            {" "}
            Comment{" "}
          </Button>
        </GridItem>
      </HStack>
      <HStack className={style2.tweetLine} mt="20px">
        <HStack className={style2.tweetIcons}>
          <Icon as={BsImage} boxSize={5} />
          <Icon as={CgPoll} boxSize={5} />
          <Icon as={BsEmojiHeartEyes} boxSize={5} />
          <Icon as={MdSchedule} boxSize={5} />
          <Icon as={IoLocationOutline} boxSize={5} />
        </HStack>
      </HStack>
    </Box>
  );
};

export default TweetReplay;
