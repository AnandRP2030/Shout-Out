import { Box } from "@chakra-ui/react";
import Home from "./views/Home";
import Login from "./Components/Signup/Login";
import { useEffect, useState } from "react";

function App() {
  const [tokenAvail, setTokenAvail] = useState(false);
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token")) || "";
    if (token) {
      console.log('worked')
    }else {
      console.log('not wor')
      
    }
    if (token) {
      setTokenAvail(true);
    }else {
      setTokenAvail(false)
    }
  }, [tokenAvail]);

  return (
    <>
      {tokenAvail ? (
        <Box bgColor="#15202b" w="100%">
          <Home />
        </Box>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
