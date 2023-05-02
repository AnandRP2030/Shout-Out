import {
  Grid,
  Image,
  GridItem,
  Select,
  Input,
  Link,
  Text,
  Icon,
  HStack
} from "@chakra-ui/react";
import style from "../homeFeed.module.css";
import { IoEarth } from "react-icons/io5";

const HomeTweetInput = () => {
  const imageUrl =
    "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1229892983-square.jpg?resize=1200:*";

  return (
    <>
      <Grid
        h="200px"
        templateRows="repeat(8, 1fr)"
        templateColumns="repeat(15, 1fr)"
        gap={4}
        mt={10}
        className={style.tweetBox}
      >
        <GridItem rowSpan={8} colSpan={2} bg="tomato">
          <Image
            className={style.userProfilePic}
            src={imageUrl}
            alt="Profile"
          />
        </GridItem>
        <GridItem colSpan={13} rowSpan={1}>
          <Select w="150px" h="24px" className={style.selectAudience}>
            <option style={{ color: "black" }} value="everyone">
              Everyone
            </option>
            <option style={{ color: "black" }} value="private">
              Private
            </option>
          </Select>
        </GridItem>
        <GridItem colSpan={13} rowSpan={2} className={style.inputGrid}>
          <Input
            variant="unstyled"
            className={style.tweetInput}
            placeholder="What's happening?"
          />
        </GridItem>
        <GridItem colSpan={13} rowSpan={2}>
          <Link href="http://www.google.com" style={{textDecoration:"none"}} >
            <HStack className={style.replayAudience}>
              <Icon as={IoEarth} boxSize={5} />
              <Text>Everyone can replay</Text>
            </HStack>
          </Link>
        </GridItem>
        <GridItem colSpan={13} rowSpan={2} >
          <HStack>
                
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};
export default HomeTweetInput;
