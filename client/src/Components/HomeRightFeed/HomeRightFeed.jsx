
import { VStack, useBreakpointValue } from "@chakra-ui/react";
import TwitterSearch from "./HomeRightComponent/TwitterSearch";
import WhatHappening from "./whatHappening/whatHappening";
import style from "./homeRight.module.css";

const HomeRightFeed = () => {
  return (
    <VStack className={style.homeRightParent}  maxW='400px' w={['30%']}>
        <TwitterSearch/>
        <WhatHappening/>
    </VStack>
  );
};

export default HomeRightFeed;
