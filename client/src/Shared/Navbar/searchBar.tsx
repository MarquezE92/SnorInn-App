import style from "./searchBar.module.css";
import { useAppDispatch } from "../../Redux/Store/hooks";
import { ChangeEvent, useState } from "react";
import { getRoomsByName } from "../../Redux/slice/rooms";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  const onSearchValueChange = (event:ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter") {
      if (searchValue) {
        dispatch(getRoomsByName(searchValue));
        setSearchValue("");
      }
    }
  }

  return (
    <>
      <form>
        <input
          type="text"
          value={searchValue}
          className={style.input}
          placeholder="Search by name..."
          onChange={onSearchValueChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </>
  );
};

export default SearchBar;
