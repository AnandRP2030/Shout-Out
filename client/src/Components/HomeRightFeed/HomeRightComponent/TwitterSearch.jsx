import { Input , InputGroup, InputLeftElement} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import styles from "../homeRight.module.css";
const TwitterSearch = () => {
  return (
    <>
      <InputGroup w='90%'  className={styles.cursorPointer}>
        <InputLeftElement
          
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input type="tel" placeholder="Search" color='#fff'/>
      </InputGroup>
    </>
  );
};
export default TwitterSearch;
