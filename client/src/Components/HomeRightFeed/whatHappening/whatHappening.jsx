import {
  Grid,
  Center,
  GridItem,
  Heading,
  VStack,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import style from "../homeRight.module.css";

const WhatHappening = () => {
  let trending1 = `https://rukminim1.flixcart.com/image/832/832/l5h2xe80/mobile/5/x/r/-original-imagg4xza5rehdqv.jpeg?q=70`;
  let trending2 = `https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSFbSoytClcYQT1jF-iXyQBeMMJikDy50ARyLz3S_gqpEgbfVBcz75Jb0RizfjKFA0XOPCOFQSsqTs1DvE` 
  let trending4 = `https://www.shefinds.com/files/2023/05/Jennifer-Lawrence-74th-Venice-Film-Festival-Italy.jpg`
  let trending3 = `https://t4.ftcdn.net/jpg/05/95/69/35/240_F_595693569_w5sVhYnHyEe4vcpB09QoBJMzrQcZLqks.jpg`
  let trending5 = `https://imgk.timesnownews.com/story/kohli-rcb-happy-AP_3.jpg?tr=w-400,h-300,fo-auto`
  


  return (
    <Grid
      templateRows="repeat(30, 1fr)"
      templateColumns="repeat(15, 1fr)"
      gap={4}
      id={style.trendingContainer}
      ml='5%'
      w={[170, 210, 210, 320, 350]}
    >
      <GridItem rowSpan={3} colSpan={15}>
        <Text fontSize={{base: '20px', md: '22px', lg: '24px'}} as="b">
          What's Happening
        </Text>
      </GridItem>
     

      <GridItem rowSpan={5} colSpan={19}>
        <Box className={style.trendingBox}>
          <Box>
            <Text color="#8b98a5"> Tredning in India </Text>
            <Text fontSize={{base: '20px', md: '18px', lg: '16px'}} as="b"> Nothing Phone </Text>
            <Text color="#8b98a5"> 1200 Tweets </Text>
          </Box>

          <Image w={20} h={20} src={trending1} alt="Trending" />
        </Box>
      </GridItem>
      <GridItem rowSpan={5} colSpan={19}>
        <Box className={style.trendingBox}>
          <Box>
            <Text color="#8b98a5"> Sports · Trending</Text>
            <Text as="b"> The Legend</Text>
            <Text color="#8b98a5"> 134K Tweets </Text>
          </Box>

          <Image w={20} h={20} src={trending2} alt="Trending" />
        </Box>
      </GridItem>
      <GridItem rowSpan={5} colSpan={19}>
        <Box className={style.trendingBox}>
          <Box>
            <Text color="#8b98a5"> Technology · Trending</Text>
            <Text as="b"> Artificial general intelligence</Text>
            <Text color="#8b98a5"> 200 Tweets</Text>
          </Box>

          <Image w={20} h={20} src={trending3} alt="Trending" />
        </Box>
      </GridItem>
      <GridItem rowSpan={5} colSpan={19}>
        <Box className={style.trendingBox}>
          <Box>
            <Text color="#8b98a5"> IPL · Today </Text>
            <Text as="b"> Congratulations RCB</Text>
            <Text color="#8b98a5"> Trending with <span className={style.TredninghashTag}>  #RCBvsSRH </span></Text>
          </Box>

          <Image w={15} h={15} src={trending5} alt="Trending" />
        </Box>
      </GridItem>
      <GridItem rowSpan={5} colSpan={19}>
        <Box className={style.trendingBox}>
          <Box>
            <Text color="#8b98a5"> Entertainment </Text>
            <Text as="b"> Jennifer Lawrence</Text>
            <Text color="#8b98a5"> Tredning with <span className={style.TredninghashTag}> #Oscar </span> </Text>
          </Box>

          <Image w={20} h={20} src={trending4} alt="Trending" />
        </Box>
      </GridItem>
      <GridItem rowSpan={3} colSpan={19}>
        <Text fontSize="md" cursor='pointer' color='#f8187f' as="b">
          Show more
        </Text>
      </GridItem>
    </Grid>
  );
};
export default WhatHappening;
