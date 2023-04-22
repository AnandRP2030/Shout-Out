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
        <Text fontSize='1.5rem' as='b' ml='2%' > Home </Text>
      </GridItem>
      <GridItem rowSpan={1} margin='auto' colSpan={3} fontSize='1rem' as='b'> 
        <Text fontSize='1.2rem' as='b'>For you </Text>
      </GridItem>
      <GridItem rowSpan={1} colSpan={3} fontSize='1rem' as='b' margin='auto'>
        <Text fontSize='1.2rem' as='b'>Following</Text>
      </GridItem>
    </Grid>
  );
};

export default HomeFeedHeader;
