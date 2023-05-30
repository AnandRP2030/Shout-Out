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
} from "@chakra-ui/react";
import style from "./tweet.module.css";
import TwitterBlueSvg from "../../Icon/twitterBlueSvg";
import {
  FaRegComment,
  AiOutlineRetweet,
  AiOutlineHeart,
  BiBarChart,
  FaShare,
  FiMoreHorizontal,
} from "react-icons/all";
import React from "react";

const Tweet = ({ tweetInfo }) => {
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

  return (
    <Grid
      h="auto"
      templateColumns="repeat(10, 1fr)"
      gap={4}
      className={style.tweetBox}
      // bgColor='red'
    >
      <GridItem className={style.userProfilePicBox} colSpan={1}>
        <Image
          className={style.userProfilePic}
          src={profilePicture}
          alt="userProfilePic"
        />
      </GridItem>
      <GridItem colSpan={9} h="auto">
        <GridItem>
          <HStack>
            <Text className={style.nameText}> {name}</Text>
            <Box>
              <TwitterBlueSvg height="25px" width="25px" />
            </Box>
            <Text className={style.usernameText}>@{username} ·</Text>
            <Text className={style.timeText}> {"1h"} </Text>

            <Tooltip label="More">
              <CustomCard bgColor="transparent" color="white" ml="345px">
                <Text>
                  <Icon as={FiMoreHorizontal} boxSize={5} />{" "}
                </Text>
              </CustomCard>
            </Tooltip>
          </HStack>
        </GridItem>
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
              <Tooltip label="Replay">
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
              <Tooltip label="Retweet">
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
              <Tooltip label="Like">
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
              <Tooltip label="View">
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
              <Tooltip label="Share">
                <CustomCard bgColor="transparent" color="white" p={0}>
                  <Icon as={FaShare} boxSize={5} />
                </CustomCard>
              </Tooltip>
            </HStack>
          </HStack>
        </GridItem>
      </GridItem>
    </Grid>
  );
};
export default Tweet;
