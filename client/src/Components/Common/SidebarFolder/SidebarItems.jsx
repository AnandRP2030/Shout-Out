import DogeSvg from '../../Icon/dogeSvg';
import HomeSvg from '../../Icon/homeSvg';
import HashSvg from "../../Icon/hashSvg";
import MoreSvg from "../../Icon/moreSvg";
import NotificationSvg from "../../Icon/notificationSvg";
import ProfileSvg from "../../Icon/profileSvg";
import TwitterBlueSvg from "../../Icon/twitterBlueSvg";
import MsgSvg from "../../Icon/messegesSvg";
import CommunitySvg from "../../Icon/communitySvg";
import BookmarkSvg from "../../Icon/bookmarkSvg";
import { HStack, Heading } from "@chakra-ui/react";
import SpinTwit from '../../Icon/spinTwit';

const SidbarItems = ({label}) => {

    let Icon;
    if (label === "Home"){
        Icon = HomeSvg;
    }else if (label === "Explore"){
        Icon = HashSvg;
    }else if (label === "Communites"){
        Icon = CommunitySvg
    }else if (label === "Notifications"){
        Icon = NotificationSvg;
    }else if (label === "Messages"){
        Icon = MsgSvg;
    }else if (label === "Bookmarks"){
        Icon = BookmarkSvg;
    }else if (label === "Twitter Blue"){
        Icon = TwitterBlueSvg;
    }else if (label === "Profile"){
        Icon = ProfileSvg;
    }else if (label === ""){
        Icon = SpinTwit;
    }else {
        Icon = MoreSvg;
    }
    
    return (
        <HStack w='90%' h='60px'  pl={20}>
            <Icon/> 
            <Heading>{label} </Heading>
        </HStack>
    )
}

export default SidbarItems;