import {Grid, GridItem, Skeleton} from "@chakra-ui/react";

const HomeSkeleton = () => {
  return (
    <Grid h="auto" templateColumns="repeat(20, 1fr)" gap={4}>
      <GridItem colSpan={4}>
        <Skeleton height="100%" />
      </GridItem>
      <GridItem colSpan={11}>
        <Skeleton height="100%" />
      </GridItem>
      <GridItem colSpan={5}>
        <Skeleton height="100%" />
      </GridItem>
    </Grid>
  );
};
export default HomeSkeleton;
