import Tweet from "./tweets";
import { useState } from "react";


const HomeTweets = () => {
  let dummyData = [
    
    {
      tweetId: "xyz1234",
      name: "Elon Musk",
      username: "elonmusk",
      userProfilePic: "https://m.media-amazon.com/images/I/6113Q8ahTWL._AC_SS450_.jpg",
      time: "1h",
      content: `My 99℅ of the problem are all related to money
      `,
      imageUrl:
        "https://pbs.twimg.com/media/Fvddr0UWYAAjYnP?format=jpg&name=small",
    },
   
  ];
  const [allTweets, setAllTweets] = useState(dummyData);
  return (
    <>
      {allTweets?.map((elem, idx) => {  
        return (
          <Tweet 
            key={elem.tweetId}
            tweetInfo={elem}
          />
        );
      })}
    </>
  );
};

export default HomeTweets;
