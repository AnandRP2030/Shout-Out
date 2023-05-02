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
import style from "../homeFeed.module.css";
import { IoEarth } from "react-icons/io5";
import { BsImage } from "react-icons/bs";
import { CgPoll } from "react-icons/all";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { MdSchedule } from "react-icons/all";
import { IoLocationOutline } from "react-icons/all";

const HomeTweetInput = () => {
  const imageUrl =
    "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg?resize=1200:*";

  return (
    <>
      <Grid
        h="200px"
        templateRows="repeat(8, 1fr)"
        templateColumns="repeat(22, 1fr)"
        gap={4}
        mt={10}
        className={style.tweetBox}
      >
        <GridItem rowSpan={8} colSpan={2}>
          <Image
            className={style.userProfilePic}
            src={imageUrl}
            alt="Profile"
          />
        </GridItem>
        <GridItem colSpan={20} rowSpan={1}>
          <Select w="150px" h="24px" className={style.selectAudience}>
            <option style={{ color: "black" }} value="everyone">
              Everyone
            </option>
            <option style={{ color: "black" }} value="private">
              Private
            </option>
          </Select>
        </GridItem>
        <GridItem colSpan={20} rowSpan={2} className={style.inputGrid}>
          <Input
            variant="unstyled"
            className={style.tweetInput}
            placeholder="What's happening?"
          />
        </GridItem>
        <GridItem colSpan={20} rowSpan={2}>
          <Link href="http://www.google.com" style={{ textDecoration: "none" }}>
            <HStack className={style.replayAudience}>
              <Icon as={IoEarth} boxSize={5} />
              <Text>Everyone can replay</Text>
            </HStack>
          </Link>
        </GridItem>
        <GridItem colSpan={20} rowSpan={2}>
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
