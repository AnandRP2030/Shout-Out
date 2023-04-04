import SidbarItems from './SidebarItems';
import { Stack, HStack, VStack, Image } from '@chakra-ui/react'


const SideBar = () => {
    return (
        <VStack w='18%'  height='1200px'>
            
            {/* <FontAwesomeIcon icon={faEnvelope} />  */}
            {/* worked  */}


            <SidbarItems label={""}/>            
            <SidbarItems label={"Home"}/>
            <SidbarItems label={"Explore"}/>
            <SidbarItems label={"Communites"}/>
            <SidbarItems label={"Notifications"}/>
            <SidbarItems label={"Messages"}/>
            <SidbarItems label={"Bookmarks"}/>
            <SidbarItems label={"Twitter Blue"}/>
            <SidbarItems label={"Profile"}/>
            <SidbarItems label={"More"}/>
            
        </VStack>
    )
}
export default SideBar;