import { Box, Text } from "@chakra-ui/react";
const Responsive = () => {
  return (
    <Box
      w={[300, 400, null, 1500, 2000, 2500]}
      h={{ base: "800px", xl: "1000px", lg: "500px", md: "300px", sm: "140px" }}
      bg="red.200"
      pt={[5, 10, 15, 20, 25, 30]}
    >
      <Text
        color="black"
        fontSize={{ base: "24px", md: "40px", lg: "60px", xl: "90px" }}
        bg={['red', 'green', 'yellow', 'black', 'orange', 'white']}
     >
        {" "}
        Iam a text from chakra ui{" "}
      </Text>

      <Text fontSize={['sm', 'md', 'lg', 'xl']}>
        sm, md, lg, xl
      </Text>
    </Box>
  );
};
export default Responsive;
