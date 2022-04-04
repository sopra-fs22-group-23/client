import React from "react";
import "../../styles/ui/SearchBar.scss";

export const SearchBar = () => {
  return (
    <div class="input-group">
      <input
        type="search"
        id="form1"
        class="form-control"
        placeholder="Search"
      />
      <button type="button" class="searchButton">
        <label class="searchButton-label">Search</label>
      </button>
    </div>
  );
};
