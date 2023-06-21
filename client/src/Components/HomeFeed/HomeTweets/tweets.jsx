import {
  Icon,
  Box,
  HStack,
  Grid,
  GridItem,
  Image,
  Text,
  Tooltip,
  Tag,
  Button,
  Textarea,
  useBreakpointValue,
} from "@chakra-ui/react";

import TwitterBlueSvg from "../../Icon/twitterBlueSvg";
import {
  FaRegComment,
  AiOutlineRetweet,
  AiOutlineHeart,
  BiBarChart,
  FaShare,
  FiMoreHorizontal,
  RiDeleteBin6Line,
  AiOutlineEdit,
  TbMoodSadSquint,
  MdReportGmailerrorred,
  BiBlock,
  VscMute,
  FcLike,
} from "react-icons/all";
import style from "./tweet.module.css";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TWEET_DELETED,
  TWEET_EDITED,
} from "../../../Redux/ActionTypes/tweetActionTypes";
import { store } from "../../../Redux/store.js";
import CommentBox from "../HomeFeedComponents/CommentBox";
import { useToast } from "@chakra-ui/react";
import BottomBtns from "../../mobileButtons/bottomBtns";

const Tweet = ({ tweetInfo, index, commentBoxIndex, toggleCommentBox }) => {
  const toast = useToast();
  const [moreOpen, setMoreOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [commentPosition, setCommentPosition] = useState({ top: 0 });

  const [commentBox, setCommentBox] = useState(false);
  const navigate = useNavigate();

  let { content, imageUrls, likes, retweets, totalNoCmts, tweetId, views } =
    tweetInfo;
  let { username, name, profilePicture } = tweetInfo.tweetOwner;
  let { liked, retweeted } = tweetInfo.tweetStatus;

  let gridHeight = 4;
  let len = content.length;
  if (len < 100) gridHeight = 2;
  else if (len < 170) gridHeight = 3;

  const handleTweetClick = () => {
    if (moreOpen) {
      setMoreOpen(false);
    }
    navigate(`/fulltweet/${tweetId}`);
  };

  const [editContent, setEditContent] = useState(content);
  const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
    <Box>
      <Tag ref={ref} {...rest}>
        {children}
      </Tag>
    </Box>
  ));

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  let token = localStorage.getItem("token") || "";
  if (!token) {
    navigate("/signup");
  }

  token = token.replaceAll('"', "");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // tweet crud methods
  const deleteTweet = async (event) => {
    event.stopPropagation();

    const DELETE_URL = `${BASE_URL}/user/tweets/delete/${tweetId}`;
    let res = await axios.delete(DELETE_URL, config);
    if (res.status === 204) {
      console.log(content, "item deleted");

      const deleteTweet = () => {
        return {
          type: TWEET_DELETED,
        };
      };
      store.dispatch(deleteTweet());

      toast({
        duration: 1000,
        position: "bottom-center",
        render: () => (
          <Box color="white" p={3} bg="#f91880" borderRadius="10px">
            <Text textAlign="center" fontSize="1.2rem">
              {" "}
              Your Tweet was deleted.{" "}
            </Text>
          </Box>
        ),
      });
    } else if (res.status === 403) {
      console.log("You can't delete others tweet ");
    } else {
      console.log("server error");
    }
  };

  const submitEditedContent = async (e) => {
    e.stopPropagation();
    try {
      const EDIT_URL = `${BASE_URL}/user/tweets/edit/${tweetId}`;
      let res = await axios.patch(EDIT_URL, { editContent }, config);
      console.log(res.status, "sttus");
      if (res.status === 200) {
        console.log("edited successfully");
        store.dispatch({ type: TWEET_EDITED });
      }
      setEditOpen(false);

      toast({
        duration: 1500,
        position: "bottom-center",
        render: () => (
          <Box color="white" p={3} bg="#f91880">
            <Text textAlign="center"> Your Tweet was Edited. </Text>
          </Box>
        ),
      });
    } catch (err) {
      console.log("error on submitEditContent", err);
    }
  };

  const tweetLiked = async (event) => {
    event.stopPropagation();
    const LIKE_URL = `${BASE_URL}/user/tweets/like/${tweetId}`;
    await axios.patch(LIKE_URL, {}, config);

    store.dispatch({ type: TWEET_EDITED });
    let toastContent = "Tweet Liked";
    if (liked) {
      toastContent = "Tweet Unliked";
    }
    toast({
      duration: 1000,
      position: "bottom-center",

      render: () => (
        <Box color="white" p={3} bg="#f91880" borderRadius="10px">
          <Text textAlign="center" fontSize="1.2rem">
            {toastContent}
          </Text>
        </Box>
      ),
    });
  };

  const tweetRetweeted = async (event) => {
    event.stopPropagation();
    const RETWEET_URL = `${BASE_URL}/user/tweets/retweet/${tweetId}`;
    await axios.patch(RETWEET_URL, {}, config);
    store.dispatch({ type: TWEET_EDITED });
    let toastContent = "Tweet Retweeted.";
    if (retweeted) {
      toastContent = "Undo retweet";
    }

    toast({
      duration: 1000,
      position: "bottom-center",
      render: () => (
        <Box color="white" p={3} bg="#f91880" borderRadius="10px">
          <Text textAlign="center" fontSize="1.2rem">
            {toastContent}
          </Text>
        </Box>
      ),
    });
  };

  const toggleCommentBox2 = (event) => {
    event.stopPropagation();
    const topPosition = window.scrollY + 100;
    setCommentBox(!commentBox);
    setCommentPosition({ top: topPosition });
    toggleCommentBox(index);
  };

  const mobileSize = useBreakpointValue([true, true, false]);
  const bottomBtnsOn = useBreakpointValue([true, false]);

  return (
    <>
      <Grid
        h="auto"
        templateColumns={mobileSize ? "repeat(11, 1fr)" : "repeat(10, 1fr)"}
        gap={4}
        className={style.tweetBox}
        onClick={handleTweetClick}
      >
    
        <GridItem
          className={style.userProfilePicBox}
          colSpan={mobileSize ? 2 : 1}
        >
          <Image
            className={style.userProfilePic}
            src={profilePicture}
            alt="userProfilePic"
          />
        </GridItem>
        <GridItem colSpan={9} h="auto">
          <HStack className={style.tweetHeader}>
            <HStack>
              <Box>
                <Text className={style.nameText}> {name}</Text>
              </Box>
              <Box>
                <TwitterBlueSvg height="25px" width="25px" />
              </Box>
              <Text
                display={mobileSize ? "none" : "block"}
                className={style.usernameText}
              >
                @{username} ·
              </Text>
              <Text className={style.timeText} ml="200px">
                {" "}
                {"1h"}{" "}
              </Text>
            </HStack>
            <Box>
              <Tooltip
                label="More"
                bgColor="#f91880"
                openDelay={400}
                closeDelay={400}
              >
                <CustomCard
                  onClick={(e) => {
                    e.stopPropagation();
                    setMoreOpen(!moreOpen);
                  }}
                  bgColor="transparent"
                  color="white"
                >
                  <Icon as={FiMoreHorizontal} boxSize={5} />{" "}
                </CustomCard>
              </Tooltip>
            </Box>
          </HStack>

          {commentBoxIndex === index && commentBox && (
            <CommentBox
              tweetInfo={tweetInfo}
              index={index}
              toggleCommentBox={toggleCommentBox}
              boxPosition={commentPosition}
              setCommentBox={setCommentBox}
            />
          )}

          <Box
            className={style.moreBox}
            onClick={(e) => e.stopPropagation()}
            display={moreOpen ? "block" : "none"}
          >
            <HStack>
              <Icon mr="10px" as={TbMoodSadSquint} box={7} />
              <Text> Not interested </Text>
            </HStack>
            <HStack onClick={deleteTweet}>
              <Icon mr="10px" as={RiDeleteBin6Line} box={7} />
              <Text onClick={deleteTweet}> Delete Tweet</Text>
            </HStack>

            <HStack
              onClick={() => {
                setEditOpen(true);
                setMoreOpen(false);
              }}
            >
              <Icon mr="10px" as={AiOutlineEdit} box={7} />
              <Text> Edit Tweet </Text>
            </HStack>

            <HStack>
              <Icon mr="10px" as={VscMute} box={7} />
              <Text> Mute Author</Text>
            </HStack>
            <HStack>
              <Icon mr="10px" as={MdReportGmailerrorred} box={7} />
              <Text> Report Tweet </Text>
            </HStack>
            <HStack>
              <Icon mr="10px" as={BiBlock} box={7} />
              <Text> Block User</Text>
            </HStack>
          </Box>
          <GridItem mt={2}>
            <Text className={style.textContent}>{content}</Text>
          </GridItem>
          {imageUrls && imageUrls.length > 0 ? (
            <GridItem>
              <Image
                className={style.tweetImage}
                src={imageUrls[0]}
                objectFit="contain"
                alt="content-img"
              />
            </GridItem>
          ) : (
            ""
          )}

          <GridItem mt="20px">
            <HStack w={["100%", "100%", "70%"]} className={style.tweetOptions}>
              <HStack>
                <Tooltip
                  bgColor="#f91880"
                  label="Replay"
                  openDelay={400}
                  closeDelay={400}
                >
                  <CustomCard
                    bgColor="transparent"
                    color="white"
                    p={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleCommentBox2(event);
                    }}
                  >
                    <Icon as={FaRegComment} boxSize={5} />
                    <Text fontSize="1.1rem" ml="2" as="b">
                      {" "}
                      {totalNoCmts}
                    </Text>
                  </CustomCard>
                </Tooltip>
              </HStack>
              <HStack>
                <Tooltip
                  bgColor="#f91880"
                  label={retweeted ? "Undo Retweet" : "Retweet"}
                  openDelay={400}
                  closeDelay={400}
                >
                  <CustomCard
                    color={retweeted ? "#82ff82" : "white"}
                    bgColor="transparent"
                    p={0}
                    onClick={tweetRetweeted}
                  >
                    <Icon as={AiOutlineRetweet} boxSize={5} />
                    <Text fontSize="1.1rem" ml="2" as="b">
                      {" "}
                      {retweets}
                    </Text>
                  </CustomCard>
                </Tooltip>
              </HStack>

              <HStack>
                <Tooltip
                  bgColor="#f91880"
                  label={liked ? "Unlike" : "Like"}
                  openDelay={400}
                  closeDelay={400}
                >
                  <CustomCard
                    bgColor="transparent"
                    color={liked ? "#f44336" : "white"}
                    p={0}
                    onClick={tweetLiked}
                  >
                    <Icon
                      color="#ff0076"
                      as={liked ? FcLike : AiOutlineHeart}
                      boxSize={5}
                    />
                    <Text fontSize="1.1rem" ml="2" as="b">
                      {" "}
                      {likes}
                    </Text>
                  </CustomCard>
                </Tooltip>
              </HStack>
              <HStack>
                <Tooltip
                  bgColor="#f91880"
                  label="View"
                  openDelay={400}
                  closeDelay={400}
                >
                  <CustomCard bgColor="transparent" color="white" p={0}>
                    <Icon as={BiBarChart} boxSize={5} />
                    <Text fontSize="1.1rem" ml="2" as="b">
                      {" "}
                      {views}
                    </Text>
                  </CustomCard>
                </Tooltip>
              </HStack>
              <HStack>
                <Tooltip
                  bgColor="#f91880"
                  label="Share"
                  openDelay={400}
                  closeDelay={400}
                >
                  <CustomCard bgColor="transparent" color="white" p={0}>
                    <Icon as={FaShare} boxSize={5} />
                  </CustomCard>
                </Tooltip>
              </HStack>
            </HStack>
          </GridItem>
        </GridItem>
      </Grid>

      {editOpen && (
        <HStack className={style.editBox}>
          <Textarea
            onChange={(e) => setEditContent(e.target.value)}
            value={editContent}
            resize="vertical"
            style={{ minHeight: "50px", maxHeight: "100px" }}
            placeholder="Empty tweet not allowed"
          />
          <Button
            onClick={() => {
              setEditOpen(false);
              setEditContent(content);
            }}
            bg="red"
          >
            {" "}
            Discard{" "}
          </Button>
          <Button onClick={submitEditedContent} bg="#3182ce">
            {" "}
            Save{" "}
          </Button>
        </HStack>
      )}

      {bottomBtnsOn && <BottomBtns />}
    </>
  );
};
export default Tweet;
