import style from "./searchBar.module.css";
import { useAppDispatch } from "../../Redux/Store/hooks";
import { ChangeEvent, useState, useEffect } from "react";
import { getRoomsByName } from "../../Redux/slice/rooms";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  const onSearchValueChange = (event:ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };


  useEffect(
    () => {
      setTimeout(() => {dispatch(getRoomsByName(searchValue))}, 1000)
      
    }, [searchValue]
  )

  return (
    <>
      <form>
        <input
          type="text"
          value={searchValue}
          className={style.input}
          placeholder="Search by name..."
          onChange={onSearchValueChange}
        />
      </form>
    </>
  );
};

export default SearchBar;
