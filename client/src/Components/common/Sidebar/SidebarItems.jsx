
import { HStack, Heading } from "@chakra-ui/react";
import HomeSvg from '../../Icon/homeSvg';

const SidbarItems = ({label}) => {

    return (
        <HStack>
             
             {/* <HomeSvg/> */}
            <Heading>{label} </Heading>
        </HStack>
    )
}

export default SidbarItems;