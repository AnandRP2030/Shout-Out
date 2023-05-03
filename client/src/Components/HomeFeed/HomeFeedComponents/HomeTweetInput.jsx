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
} from "@chakra-ui/react";

import {
  MdSchedule,
  BsEmojiHeartEyes,
  CgPoll,
  BsImage,
  IoLocationOutline,
  IoEarth,
} from "react-icons/all";
import { useState } from "react";

const HomeTweetInput = () => {
  const imageUrl =
    "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg?resize=1200:*";

  const [inputActive, setInputActive] = useState(false);


  return (
    <>
     
      <Grid
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(11, 1fr)"
        gap={4}
        h={inputActive ? "200px" : "120px"}
        className={style.tweetBox}
      >
        <GridItem rowSpan={4} colSpan={1}>
          <Image
            className={style.userProfilePic}
            src={imageUrl}
            alt="Profile"
          />
        </GridItem>
        <GridItem colSpan={10} rowSpan={1} display={inputActive ? "block": "none"}>
          <Select w="120px" className={style.selectAudience}>
            <option value="everyone">Everyone</option>
            <option value="private">Private</option>
          </Select>
        </GridItem>
        <GridItem colSpan={10} rowSpan={1} className={style.inputGrid}>
          <Input
            variant="unstyled"
            className={style.tweetInput}
            placeholder="What's happening?"
            onClick={() => setInputActive(true)}
          />
        </GridItem>
        <GridItem colSpan={10} rowSpan={1} display={inputActive ? "block": "none"}>
          <Link href="http://www.google.com" style={{ textDecoration: "none" }}>
            <HStack className={style.replayAudience}>
              <Icon as={IoEarth} boxSize={5} />
              <Text>Everyone can replay</Text>
            </HStack>
          </Link>
        </GridItem>
        <GridItem colSpan={10} rowSpan={1}>
          <HStack className={style.tweetLine}>
            <HStack className={style.tweetIcons}>
              <Icon as={BsImage} boxSize={5} />
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
