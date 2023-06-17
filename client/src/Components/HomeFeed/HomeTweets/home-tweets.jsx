import Tweet from "./tweets";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const HomeTweets = () => {
  const [commentBoxIndex, setCommentBoxIndex] = useState(-1);
  const toggleCommentBox = (index) => {
    setCommentBoxIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const allTweetsData = useSelector((state) => state.tweets);

  const [allTweets, setAllTweets] = useState([]);
  useEffect(() => {
    collectData();
  }, [allTweetsData]);  

  const collectData = async () => {
    let token = localStorage.getItem("token").replaceAll('"', "");
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
      let { username, name, email, _id, profilePicture } = ownersInfo[i]._doc;

      let ownerData = {
        username,
        name,
        email,
        userId: _id,
        profilePicture,
      };

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

      Tweets.push(tweet);
    }
    setAllTweets(Tweets);
  };

  return (
    <>
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
