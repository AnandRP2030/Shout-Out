import SidbarItems from './SidebarItems'; 
import { Stack, HStack, VStack } from '@chakra-ui/react'
import HomeSvg from '../../Icon/homeSvg';



const SideBar = () => {
    return (
        <VStack w='18%'  height='1200px' bgColor='gray'>
            <SidbarItems label={"Home"}/>
            {/* <HomeSvg/> */}
            <HomeSvg/>
        </VStack>
    )
}
export default SideBar;