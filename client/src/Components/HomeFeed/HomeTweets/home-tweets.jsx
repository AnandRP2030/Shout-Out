import Tweet from "./tweets";
import { useState, useEffect } from "react";
// import '~video-react/dist/video-react.css';
import { Player } from "video-react";
import axios from "axios";
import {store} from "../../../Redux/store.js";

let tweetCount = -1;
const unSubscribe = store.subscribe(() => {
  tweetCount = store.getState().tweets.newTweetsCount
})

const HomeTweets = () => {
 

  const [allTweets, setAllTweets] = useState([]);
  useEffect(() => {
    collectData();
  }, [tweetCount]);

  const collectData = async () => {
    let token = localStorage.getItem("token").replaceAll('"', "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const GET_ALL_TWEETS = `${import.meta.env.VITE_BASE_URL}/user/tweets`;
    const data = await axios.get(GET_ALL_TWEETS, config);
    displayContent(data.data);
  };

  const displayContent = (data) => {
    const { tweets, ownersInfo } = data;
    let Tweets = [];
    for (let i = tweets.length-1; i >= 0; i--) {
      let { username, name, email, _id, profilePicture } = ownersInfo[i]._doc;
      let ownerData = {
        username,
        name,
        email,
        userId: _id,
        profilePicture
      };
     

      let tweet = {
        content: tweets[i].content,
        comments: tweets[i].comments,
        totalNoCmts: tweets[i].comments.length,
        likes: tweets[i].likes,
        retweets: tweets[i].retweets,
        views: tweets[i].views,
        isPrivate: tweets[i].private,
        tweetId: tweets[i]._id,
        imageUrls: tweets[i].imageUrls,
        videoUrls: tweets[i].videoUrls,
        tweetOwner: ownerData,
      };
      Tweets.push(tweet);
    }

    setAllTweets(Tweets);
  };
  
  return (
    <>
      {allTweets?.map((elem, idx) => {
        return <Tweet key={elem.tweetId} tweetInfo={elem} />;
      })}
    </>
  );
};

export default HomeTweets;
