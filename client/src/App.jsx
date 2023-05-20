import { Box } from "@chakra-ui/react";
import Home from "./views/Home";
import Login from "./Components/Signup/Login";
import { useEffect, useState } from "react";

function App() {
  const [tokenAvail, setTokenAvail] = useState(true);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
 
    console.log('tOKEN',token)
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
