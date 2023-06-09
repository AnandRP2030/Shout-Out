import Home from "../../views/Home";
import CommentView from "./commentView";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import HomeCenterFeed from "../HomeFeed/HomeFeed";
import HomeRightFeed from "../HomeRightFeed/HomeRightFeed";
import SideBar from "../Common/SidebarFolder/Sidebar";
import HomeFeedHeader from "../HomeFeed/HomeFeedComponents/HomeFeedHeader";
import HomeTweetInput from "../HomeFeed/HomeFeedComponents/HomeTweetInput";
import HomeTweets from "../HomeFeed/HomeTweets/home-tweets";
import { useParams } from "react-router-dom";
import "./fullTweet.css";
import axios from "axios";
import { useEffect, useState } from "react";
import TweetReplay from "../Common/tweet Replay/tweetReplay";
import { useNavigate } from "react-router-dom";

const FullTweet = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [newCmntCount, setNewCmntCount] = useState(0);

  useEffect(() => {
    getTweet();
  }, [newCmntCount]);

  if (token) {
    token = token.replaceAll('"', "");
  } else {
    navigate("/signup");
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [comments, setComments] = useState([]);
  const [commentOwners, setCommentOwners] = useState([]);

  const { tweetId } = useParams();
  const getTweet = async () => {
    const GET_TWEET_URL = `${BASE_URL}/user/tweets/${tweetId}`;

    const response = await axios.get(GET_TWEET_URL, config);
    const { tweets } = response.data;

 

    const allComments = tweets[0].comments;
    allComments.reverse();
    let owners = [];

    for (const comment of allComments) {
      let owner = await findOwner(comment.commenter);
      owners.push(owner);
    }
    setComments(tweets[0].comments);
    setCommentOwners(owners);
  };


  const findOwner = async (userId) => {
    const GET_OWNER_URL = `${BASE_URL}/user/tweets/user/${userId}`;
    let owner = await axios.get(GET_OWNER_URL, config);
    return owner.data;
  };

  return (
    <>
      <Grid bgColor="#15202b" templateColumns="repeat(18, 1fr)" gap={4}>
        <GridItem colSpan={4}>
          <SideBar />
        </GridItem>
        <GridItem colSpan={9}>
          <Box
            className="homeCenterStyle"
            color="white"
            minHeight="1000px"
            pt="10px"
          >
            <HomeFeedHeader headerName="Thread" />
            <HomeTweets tweetIdentity={tweetId} />
            <TweetReplay
              setNewCmntCount={setNewCmntCount}
              newCmntCount={newCmntCount}
            />
            {comments.length > 0 && commentOwners.length > 0 && (
              <Box mt="20px">
                {comments.map((comment, idx) => {
                  const { commentContent, _id, time } = comment;
                  let ownersDetails = {
                    username: "Username",
                    name: "name",
                    ownerPic:
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                  };

                  {
                    commentOwners[idx] && commentOwners[idx].user.username &&
                      (ownersDetails.username = commentOwners[idx].user.username),
                      (ownersDetails.name = commentOwners[idx].user.name);
                    ownersDetails.ownerPic =
                      commentOwners[idx].user.profilePicture;
                  }
                  return (
                    <Box key={_id}>
                      <CommentView
                        ownersDetails={ownersDetails}
                        content={commentContent}
                      />
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        </GridItem>
        <GridItem colSpan={5}>
          <HomeRightFeed />
        </GridItem>
      </Grid>
    </>
  );
};
export default FullTweet;
