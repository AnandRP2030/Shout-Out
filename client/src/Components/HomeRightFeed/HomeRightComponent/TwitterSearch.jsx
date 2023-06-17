import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import styles from "../homeRight.module.css";
import { useState } from "react";

const TwitterSearch = () => {
  const [inputActive, setInputActive] = useState(false);
  return (
    <>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color={inputActive ? "#f91880" : "gray.300"} />}
        />
        <Input
          className={styles.searchBox}
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          type="tel"
          placeholder="Search"
          color="#fff"
        />
      </InputGroup>
    </>
  );
};
export default TwitterSearch;
