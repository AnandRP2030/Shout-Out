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
  grid,
  background,
  Input,
  Button,
  Textarea,
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
  GrVolumeMute,
  MdReportGmailerrorred,
  BiBlock,
  VscMute,
} from "react-icons/all";
import style from "./tweet.module.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TWEET_DELETED,
  TWEET_EDITED,
} from "../../../Redux/ActionTypes/tweetActionTypes";
import { store } from "../../../Redux/store.js";

const Tweet = ({ tweetInfo }) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleTweetClick = () => {
    if (moreOpen) {
      setMoreOpen(false);
    }
  }
  let {
    content,
    comments,
    imageUrls,
    likes,
    isPrivate,
    retweets,
    totalNoCmts,
    tweetId,
    views,
    videoUrls,
  } = tweetInfo;
  let { username, name, email, userId, profilePicture } = tweetInfo.tweetOwner;
  if (content.length > 300) content = content.substring(0, 220);
  let gridHeight = 4;
  let len = content.length;
  if (len < 100) gridHeight = 2;
  else if (len < 170) gridHeight = 3;

  const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
    <Box>
      <Tag ref={ref} {...rest}>
        {children}
      </Tag>
    </Box>
  ));

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  let token = localStorage.getItem("token").replaceAll('"', "");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // tweet crud methods
  const deleteTweet = async () => {
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
    } else if (res.status === 403) {
      console.log("You can't delete others tweet ");
    } else {
      console.log("server error");
    }
  };

  const [editContent, setEditContent] = useState(content);

  const submitEditedContent = async () => {
    const EDIT_URL = `${BASE_URL}/user/tweets/edit/${tweetId}`;
    let res = await axios.patch(EDIT_URL, { editContent }, config);

    if (res.status === 200) {
      console.log("edited successfully");

      store.dispatch({ type: TWEET_EDITED });
    }
    setEditOpen(false);
  };

  return (
    <>
      <Grid
        h="auto"
        templateColumns="repeat(10, 1fr)"
        gap={4}
        className={style.tweetBox}
        onClick={handleTweetClick}
      >
        <GridItem className={style.userProfilePicBox} colSpan={1}>
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
              <Text className={style.usernameText}>@{username} ·</Text>
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
                  onClick={() => setMoreOpen(!moreOpen)}
                  bgColor="transparent"
                  color="white"
                >
                  <Icon as={FiMoreHorizontal} boxSize={5} />{" "}
                </CustomCard>
              </Tooltip>
            </Box>
          </HStack>

          <Box className={style.moreBox} display={moreOpen ? "block" : "none"}>
            <HStack>
              <Icon mr="10px" as={TbMoodSadSquint} box={7} />
              <Text> Not interested in this Tweet </Text>
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
            <HStack className={style.tweetOptions}>
              <HStack>
                <Tooltip
                  bgColor="#f91880"
                  label="Replay"
                  openDelay={400}
                  closeDelay={400}
                >
                  <CustomCard bgColor="transparent" color="white" p={0}>
                    <Icon as={FaRegComment} boxSize={5} />
                    <Text fontSize="1.1rem" ml="2">
                      {" "}
                      {totalNoCmts}
                    </Text>
                  </CustomCard>
                </Tooltip>
              </HStack>
              <HStack>
                <Tooltip
                  bgColor="#f91880"
                  label="Retweet"
                  openDelay={400}
                  closeDelay={400}
                >
                  <CustomCard bgColor="transparent" color="white" p={0}>
                    <Icon as={AiOutlineRetweet} boxSize={5} />
                    <Text fontSize="1.1rem" ml="2">
                      {" "}
                      {retweets}
                    </Text>
                  </CustomCard>
                </Tooltip>
              </HStack>

              <HStack>
                <Tooltip
                  bgColor="#f91880"
                  label="Like"
                  openDelay={400}
                  closeDelay={400}
                >
                  <CustomCard bgColor="transparent" color="white" p={0}>
                    <Icon as={AiOutlineHeart} boxSize={5} />
                    <Text fontSize="1.1rem" ml="2">
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
                    <Text fontSize="1.1rem" ml="2">
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
    </>
  );
};
export default Tweet;
