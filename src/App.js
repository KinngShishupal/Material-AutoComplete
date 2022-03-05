/* eslint-disable no-use-before-define */

import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {
  const filter = createFilterOptions();
  // inputValue: what we enter
  // value:what we select
  // value onchange works together
  // inputvalue and oninputchnage work together
  // we can write them just to have control otherwise it works automatically for normal features

  const [value, setValue] = React.useState([]); //it is array of objects

  //to get initially filled values
  // const [value, setValue] = React.useState([
  //   { title: "The Shawshank Redemption", year: 1994 },
  //   { title: "The Godfather", year: 1972 },
  //   { title: "The Godfather: Part II", year: 1974 },
  // ]);

  const [inputValue, setInputValue] = React.useState("");

  const allSelected = top100Films.length === value.length;

  console.log("allSelectedallSelected", allSelected);

  const handleToggleOption = (selectedOptions) => setValue(selectedOptions);
  const handleClearOptions = () => setValue([]);

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setValue(top100Films);
    } else {
      handleClearOptions();
    }
  };

  const handleToggleSelectAll = () => {
    handleSelectAll && handleSelectAll(!allSelected);
  };

  const handleChange = (event, selectedOptions, reason) => {
    console.log(
      "qqqqqqqqqqq",
      event,
      "1111111111",
      selectedOptions,
      "22222222",
      reason
    );
    console.log(
      "xxxxxxxxxxxxxxxx",
      selectedOptions.find((option) => option.year === "select-all")
    );
    // to check if select all is checked or not
    if (reason === "select-option" || reason === "remove-option") {
      if (selectedOptions.find((option) => option.value === "select-all")) {
        handleToggleSelectAll();
        // let result = [];
        // result = top100Films.filter((el) => el.value !== "select-all");
        // return onChange(result);
        // setValue(result);
      } else {
        handleToggleOption && handleToggleOption(selectedOptions);
        // return onChange(selectedOptions);
        // setValue(selectedOptions);ss
      }
    } else if (reason === "clear") {
      handleClearOptions && handleClearOptions();
    }
  };

  return (
    <Autocomplete
      limitTags={2}
      value={value}
      onChange={handleChange}
      // onChange={(event, newValue) => {
      //   console.log("newValue", newValue);
      //   setValue(newValue);
      // }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        console.log("inputValue", inputValue);
        setInputValue(newInputValue);
      }}
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      // to modify the available lisyt of options we use filteroptions
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return [{ label: "Select All", value: "select-all" }, ...filtered];
      }}
      getOptionSelected={(option, value) => {
        console.log("seected", option, value);
        return option.value === value.value;
      }}
      renderOption={(option, { selected }) => {
        const selectAllProps =
          option.value === "select-all" // To control the state of 'select-all' checkbox
            ? { checked: allSelected }
            : {};

        return (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
              {...selectAllProps}
            />
            {option.label}
          </React.Fragment>
        );
      }}
      style={{ width: 500 }}
      // renderinput is basically the text input we see on screen
      renderInput={(params) => {
        console.log("paramsparams", params);
        return (
          <TextField
            {...params}
            variant="outlined"
            label="Checkboxes"
            placeholder="Favorites"
          />
        );
      }}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

const top100Films = [
  { label: "foo", value: "foo" },
  { label: "bar", value: "bar" },
  { label: "jar", value: "jar" },
  { label: "nar", value: "nar" },
  { label: "mar", value: "mar" },
  { label: "far", value: "far" },
];
