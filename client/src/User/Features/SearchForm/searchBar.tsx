import style from "./searchBar.module.css";
import { useAppDispatch } from "../../../Redux/Store/hooks";
import { ChangeEvent, useState, useEffect } from "react";
import {
  getRoomsByName,
  getRoomsByPage,
  setEmptyRooms,
} from "../../../Redux/slice/rooms";
import { SetState } from "immer/dist/internal";


type props ={
  jump:()=>void
}

const SearchBar = ({jump}:props) => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  const onSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (searchValue) {
      console.log(searchValue)
    dispatch(getRoomsByName(searchValue));
    jump()
  } else if (searchValue.length === 0) {
    console.log(searchValue)
    dispatch(setEmptyRooms())
    jump()
  }
};

  useEffect(() => {
    // if(searchValue==''){
    //   dispatch(getRoomsByPage())
    // }
    // dispatch(getRoomsByName(searchValue))
    return () => {
      dispatch(setEmptyRooms());
      setSearchValue('')
    };
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
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
