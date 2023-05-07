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
      content: `Elon Musk and his cute son X Æ A-12 (who is probably a Metallica fan 😂) visited the Oracle Red Bull Racing team at the Formula 1 Grand Prix in Miami. It's nice to see how a father includes his son in every aspect of his life. This is really not a common occurrence among people`,
      imageUrl:
        "https://pbs.twimg.com/media/FvfSsGIXgAA5vPT?format=jpg&name=small",
    },
    {
      tweetId: "xyz1234",
      name: "Elon Musk",
      username: "elonmusk",
      userProfilePic: "https://m.media-amazon.com/images/I/6113Q8ahTWL._AC_SS450_.jpg",
      time: "1h",
      content: `If WhatsApp is shutdown, what will be your backup ?
      `,
      imageUrl:
        "https://pbs.twimg.com/media/FMUZtY6XoAMfh3G?format=jpg&name=small",
    },
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
    {
      tweetId: "xyz1234",
      name: "Elon Musk",
      username: "elonmusk",
      userProfilePic: "https://pbs.twimg.com/media/Fvi2ScnaAAIcHyY?format=jpg&name=large",
      time: "1h",
      content: `Quote w your Indian-ness boys n girls 
      `,
      imageUrl:
        "https://pbs.twimg.com/media/FvhTc36WYAExZSu?format=jpg&name=large",
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
