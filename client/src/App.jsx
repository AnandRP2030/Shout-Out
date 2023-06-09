import { Box } from "@chakra-ui/react";
import Home from "./views/Home";
import Login from "./Components/Signup/Login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  const [tokenAvail, setTokenAvail] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token") || "";
    if (token) {
      setTokenAvail(true);
    } else {
      setTokenAvail(false);
      navigate("/signup");
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
