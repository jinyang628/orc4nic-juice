import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select, { MultiValue } from 'react-select';
import { updateTags } from './tagsSlice';

type Option = {
  //string that represents the human-readable label for the option
  //used to display the option to the user
  label: string; 
  //string that represents the underlying value for the option 
  //used to identify the option
  value: string;
};

type Props = {
  purpose: string;
  setTags?: Dispatch<SetStateAction<string[]>>;
};

function TagsSearch({ purpose, setTags }: Props) {
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();

  //static list, can change to dynamic later
  const tagsList = ['Bitter Gourd', 'Recipe', 'Orange', 'Apple'];
  //each tag is transformed into an 'Option' object with a 'label' and 'value' property
  const options = tagsList.map((tag, index) => ({ value: tag, label: tag }));
  /*
  this state variable is initialised with an empty array and will be used to store the 
  currently selected tags 
  */
 
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(new Array<Option>());

  //used to update the 'selectedOptions' state variable when tag is selected
  function handlePostTagsChange(newOptionsArray: MultiValue<Option>) {
    //make an array with elements of Options type
    const optionsArray = Array.from(newOptionsArray.values());
    //make an array with elements of string type
    const tagsArray = optionsArray.map(option => option.value);
    //these different functions take in elements of different types

    //because i made setTags an option prop, even though i know this function wont be called if setTags
    //is not defined, i still need to tell the code explicitly 
    if (setTags){
      setTags(tagsArray);
    }
    dispatch(updateTags(tagsArray));
    setSelectedOptions(optionsArray);
  }
  
  return (
    <Select
      className={purpose === "search" ? "filterTagsSearchBar" : "setTags"} 
      placeholder={purpose === "search" ? "Filter posts" : "Set Tags"}
      options={options}
      onChange={handlePostTagsChange}
      value={selectedOptions}
      isMulti
    />
  );
}

export default TagsSearch;
