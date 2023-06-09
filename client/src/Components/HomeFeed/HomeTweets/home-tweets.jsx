import Tweet from "./tweets";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box, Center, CircularProgress } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomeTweets = ({ tweetIdentity }) => {
  const navigate = useNavigate();
  const [commentBoxIndex, setCommentBoxIndex] = useState(-1);
  const toggleCommentBox = (index) => {
    setCommentBoxIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const [isProgress, setIsProgress] = useState(false);
  const allTweetsData = useSelector((state) => state.tweets);

  const [allTweets, setAllTweets] = useState([]);
  useEffect(() => {
    setIsProgress(true);
    collectData();
  }, [allTweetsData]);

  const collectData = async () => {
    let token = localStorage.getItem("token") || "";
    if (token) {
      token = token.replaceAll('"', "");
    } else {
      navigate("/signup");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let GET_ALL_TWEETS = `${import.meta.env.VITE_BASE_URL}/user/tweets`;
    const data = await axios.get(GET_ALL_TWEETS, config);
  
    displayContent(data.data);
  };

  const displayContent = (data) => {
    const { tweets, ownersInfo, tweetsStatus } = data;
    let Tweets = [];
    for (let i = tweets.length - 1; i >= 0; i--) {
      const randomNum = Math.floor(Math.random() * 100) + 100;

      let ownerData = {
        username: "username",
        name: "name",
        email: "email",
        userId: randomNum,
        profilePicture:
          "https://cdn.landesa.org/wp-content/uploads/default-user-image.png",
      };

      if (ownersInfo[i]._doc) {
        ownerData.username = ownersInfo[i]._doc.username;
        ownerData.name = ownersInfo[i]._doc.name;
        ownerData.email = ownersInfo[i]._doc.email;
        ownerData._id = ownersInfo[i]._doc._id;
        ownerData.profilePicture = ownersInfo[i]._doc.profilePicture;
      }

      let tweet = {
        content: tweets[i].content,
        comments: tweets[i].comments,
        totalNoCmts: tweets[i].comments.length,
        likes: tweets[i].likes.length,
        retweets: tweets[i].retweets.length,
        views: tweets[i].views,
        isPrivate: tweets[i].private,
        tweetId: tweets[i]._id,
        imageUrls: tweets[i].imageUrls,
        videoUrls: tweets[i].videoUrls,
        tweetOwner: ownerData,
        tweetStatus: tweetsStatus[i],
      };

      if (tweetIdentity) {
        if (tweetIdentity === tweet.tweetId) {
          Tweets.push(tweet);
          break;
        }
      } else {
        Tweets.push(tweet);
      }
    }
    setIsProgress(false);
    setAllTweets(Tweets);
  };

  return (
    <>
      <Center w="8%" m="auto" display={isProgress ? "block" : "none"}>
        <CircularProgress isIndeterminate color="#f91880" value={80} />
      </Center>
      {allTweets?.map((elem, idx) => {
        return (
          <Tweet
            key={elem.tweetId}
            index={idx}
            tweetInfo={elem}
            commentBoxIndex={commentBoxIndex}
            toggleCommentBox={toggleCommentBox}
          />
        );
      })}
    </>
  );
};

export default HomeTweets;
