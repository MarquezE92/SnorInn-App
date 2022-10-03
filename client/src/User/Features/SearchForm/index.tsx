import React, { ChangeEvent } from "react";
import style from "./index.module.css";
import { places } from "./constantes";
import { useState } from "react";

const SearchForm = () => {
  const [select, setSelect] = useState("");

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  return (
    <div className={style.card}>
      <select onChange={handleSelect}>
        <option disabled selected>
          PLACE
        </option>
        {places?.map((place: string, i: number) => (
          <option key={i} value={place}>
            {place}
          </option>
        ))}
      </select>

      <select onChange={handleSelect}>
        <option disabled selected>
          N° BEDS
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>

      <select onChange={handleSelect}>
        <option disabled selected>
          CATEGORY
        </option>
        <option value="Basic">Basic</option>
        <option value="Standard">Standard</option>
        <option value="Premium">Premium</option>
      </select>
      <button>Search</button>
    </div>
  );
};

export default SearchForm;
