import React from "react";
import { useState } from "react";
import "../../../styles/ui/SearchBar.scss";
import { FormField } from "./FormField";

export const SearchBar = (props) => {
  const [inputText, setInputText] = useState("");
  let returnList = [];

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    props.list.forEach((user) => {
      if (String(user.username).toLowerCase().includes(lowerCase) === true) {
        returnList.push(user);
      } else {
        for (var i = 0; i < returnList.length; i++) {
          if (String(returnList[i].username).toLowerCase() === user) {
            returnList.splice(i, 1);
            returnList = returnList;
            break;
          }
        }
      }
      props.searchFunction(returnList);
    });
  };
  return (
    <div class="input-group">
      <input
        type="search"
        id="form1"
        class="form-control"
        placeholder="Search..."
        onChange={(e) => inputHandler(e)}
      />
    </div>
  );
};
