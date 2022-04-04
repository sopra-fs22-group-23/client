import "../../styles/ui/FilterButton.scss";
import React, { Component } from "react";

class FilterButton extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <div onChange={this.onChangeValue}>
        <div class="filterButton">
          <input type="radio" id="a25" name="check-substitution-2" />
          <label class="btn btn-default" for="a25">
            Admin
          </label>
        </div>
        <div class="filterButton">
          <input type="radio" id="a50" name="check-substitution-2" />
          <label class="btn btn-default" for="a50">
            Collaborator
          </label>
        </div>
        <div class="filterButton">
          <input type="radio" id="a75" name="check-substitution-2" />
          <label class="btn btn-default" for="a75">
            Guest
          </label>
        </div>
      </div>
    );
  }
}

export default FilterButton;
