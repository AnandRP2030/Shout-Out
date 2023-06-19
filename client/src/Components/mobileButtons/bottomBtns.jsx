import { HStack, Icon } from "@chakra-ui/react";

import {
  FcHome,
  FcBinoculars,
  FcVoicePresentation,
  FcSms,
  FcSportsMode,
} from "react-icons/all";
import { useNavigate } from "react-router-dom";

import "./bottomBtns.css";
const BottomBtns = () => {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate("/");
  };

  const redirectSignup = () => {
    navigate("/signup");
  };
  const redirectLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <HStack className="bottomStack">
        <Icon boxSize={30} as={FcBinoculars} />
        <Icon boxSize={30} as={FcSms} />
        <Icon onClick={redirectHome} boxSize={30} as={FcHome} />
        <Icon onClick={redirectSignup} boxSize={30} as={FcVoicePresentation} />
        <Icon onClick={redirectLogin} boxSize={30} as={FcSportsMode} />
      </HStack>
    </>
  );
};
export default BottomBtns;
