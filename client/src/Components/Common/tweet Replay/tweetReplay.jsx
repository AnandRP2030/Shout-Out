import {
  Button,
  HStack,
  Icon,
  Image,
  Box,
  Input,
  Text,
} from "@chakra-ui/react";
import { BsEmojiHeartEyes, BsImage } from "react-icons/bs";
import { CgPoll } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import { MdSchedule } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUser } from "../../../Redux/Reducers/user.reducer";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./tweetReplay.css";

const TweetReplay = ({ setNewCmntCount, newCmntCount }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { tweetId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  const [commentContent, setCommentContent] = useState("");

  const [inputActive, setInputActive] = useState(false);
  const activeUserProPic = useSelector((state) => {
    return state.user.profilePicture;
  });

  const newComment = async () => {
    if (!commentContent) return;
    let res = await saveComment(commentContent);
    if (res.status === 201) {
      console.log("comment added");
      setNewCmntCount(newCmntCount + 1);
      toast({
        duration: 1000,
        position: "bottom-center",
        render: () => (
          <Box color="white" p={3} bg="#f91880" borderRadius="10px">
            <Text textAlign="center" fontSize="1.2rem">
              {" "}
              Your Replay added.{" "}
            </Text>
          </Box>
        ),
      });
    } else {
      console.log(res);
    }
    setCommentContent("");
  };

  const saveComment = async (commentContent) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    let token = localStorage.getItem("token") || "";
    if (token) {
      token = token.replaceAll('"', "");
    } else {
      navigate("/signup");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const COMMENT_URL = `${BASE_URL}/user/tweets/comment/${tweetId}`;
    let res = await axios.patch(COMMENT_URL, { commentContent }, config);
    return res;
  };

  return (
    <Box margin="auto" className="tweetReplayBox">
      <HStack mt="20px" colSpan={1}>
        <Image
          className="activeUserPicture"
          src={
            activeUserProPic
              ? activeUserProPic
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="userProfilePic"
        />

        <Input
          value={commentContent}
          className="inputArea"
          placeholder="Tweet your replay!"
          onFocus={(e) => {
            e.stopPropagation();
            setInputActive(true);
          }}
          onBlur={(e) => {
            e.stopPropagation();
            setInputActive(false);
          }}
          onChange={(e) => {
            e.stopPropagation();
            setCommentContent(e.target.value);
          }}
        />

        <Button className="replayBtn" onClick={newComment}>
          {" "}
          Replay{" "}
        </Button>
      </HStack>
      <HStack mt="20px">
        {inputActive && (
          <HStack ml="92px" color="#f91880">
            <Icon as={BsImage} boxSize={5} />
            <Icon as={CgPoll} boxSize={5} />
            <Icon as={BsEmojiHeartEyes} boxSize={5} />
            <Icon as={MdSchedule} boxSize={5} />
            <Icon as={IoLocationOutline} boxSize={5} />
          </HStack>
        )}
      </HStack>
    </Box>
  );
};

export default TweetReplay;
