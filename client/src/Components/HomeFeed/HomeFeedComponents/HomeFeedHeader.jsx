import { Grid, GridItem , Text} from "@chakra-ui/react";

const HomeFeedHeader = () => {
  return (
    <Grid
      h="100px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={1} colSpan={6}>
        <Text fontSize='1.5rem' as='b'> Home </Text>
      </GridItem>
      <GridItem rowSpan={1} colSpan={3} fontSize='1rem' as='b'>For you</GridItem>
      <GridItem rowSpan={1} colSpan={3} fontSize='1rem' as='b'>Following</GridItem>
    </Grid>
  );
};

export default HomeFeedHeader;
