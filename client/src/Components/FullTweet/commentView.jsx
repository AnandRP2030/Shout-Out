import React from "react";
import { useState } from "react";
import style from "../HomeFeed/HomeTweets/tweet.module.css";
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
} from "@chakra-ui/react";

import TwitterBlueSvg from "../Icon/twitterBlueSvg";
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

const CommentView = ({ content, ownersDetails }) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const { name, username, ownerPic } = ownersDetails;
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);

  const handleTweetClick = () => {
    if (moreOpen) {
      setMoreOpen(false);
    }
  };

  const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
    <Box>
      <Tag ref={ref} {...rest}>
        {children}
      </Tag>
    </Box>
  ));

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
            src={ownerPic}
            alt="userProfilePic"
          />
        </GridItem>
        <GridItem colSpan={9} h="auto">
          <HStack className={style.tweetHeader}>
            <HStack>
              <Box>
                <Text className={style.nameText}> {name} </Text>
              </Box>
              <Box>
                <TwitterBlueSvg height="25px" width="25px" />
              </Box>
              <Text className={style.usernameText}>@ {username} ·</Text>
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
              <Text> Not interested in this </Text>
            </HStack>
            <HStack>
              <Icon mr="10px" as={RiDeleteBin6Line} box={7} />
              <Text> Delete Comment</Text>
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
                    <Text fontSize="1.1rem" ml="2" as="b">
                      {" "}
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
                  <CustomCard
                    bgColor="transparent"
                    p={0}
                    color={retweeted ? "#82ff82" : "white"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRetweeted(!retweeted);
                    }}
                  >
                    <Icon as={AiOutlineRetweet} boxSize={5} />
                    <Text fontSize="1.1rem" ml="2" as="b">
                      {" "}
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
                  <CustomCard
                    bgColor="transparent"
                    color="white"
                    p={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLiked(!liked);
                    }}
                  >
                    <Icon
                      color="#ff0076"
                      as={liked ? FcLike : AiOutlineHeart}
                      boxSize={5}
                    />
                    <Text fontSize="1.1rem" ml="2" as="b">
                      {" "}
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
    </>
  );
};
export default CommentView;
