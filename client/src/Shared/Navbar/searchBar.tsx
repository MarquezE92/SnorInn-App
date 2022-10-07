import style from "./searchBar.module.css";
import { useAppDispatch } from "../../Redux/Store/hooks";
import { ChangeEvent, useState, useEffect } from "react";
import { getRoomsByName, getRoomsByPage, setEmptyRooms } from "../../Redux/slice/rooms";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  const onSearchValueChange = (event:ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit=(e:any)=>{
    e.preventDefault()
    dispatch(getRoomsByName(searchValue))
  }

  useEffect(()=>{
    // if(searchValue==''){
    //   dispatch(getRoomsByPage())
    // }
    // dispatch(getRoomsByName(searchValue))
    return()=>{
      dispatch(setEmptyRooms())
    }
  },[searchValue])

 
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
