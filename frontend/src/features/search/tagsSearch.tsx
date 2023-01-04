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
  setTags: Dispatch<SetStateAction<string[]>>;
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
  function handleChange(newOptionsArray: MultiValue<Option>) {
    const optionsArray = Array.from(newOptionsArray.values());
    const tagsArray = optionsArray.map(option => option.value);
    setTags(tagsArray);
    dispatch(updateTags(tagsArray));
    setSelectedOptions(optionsArray);
  }
  

  //delete a selected tag from the 'selectedOptions' array using the filter method
  function handleDelete(value: string) {
    const updatedOptions = selectedOptions.filter((option) => option.value !== value);
    const updatedTags = updatedOptions.map((option) => option.value);
    dispatch(updateTags(updatedTags));
    setTags(updatedTags);
    setSelectedOptions(updatedOptions);
  }
  
  return (
    <Select
      className={purpose === "search" ? "filterTagsSearchBar" : "setTags"} 
      placeholder={purpose === "search" ? "Filter posts" : "Set Tags"}
      options={options}
      onChange={handleChange}
      value={selectedOptions}
      isMulti
      // components={{
      //   MultiValue: ({ data, children, ...props }) => {
      //     const dataArray = Object.entries(data);
      //     return (
      //       <div {...props}>
      //         {dataArray.map(([key, value]) => {
      //           const option: Option = { value, label: value };
      //           return (
      //             <div key={key}>
      //               {option.label}
      //               <button className="tagDelete" onClick={() => handleDelete(option.value)}>x</button>
      //             </div>
      //           );
      //         })}
      //       </div>
      //     );
      //   }
      // }}
    />
  );
}

export default TagsSearch;



        // MultiValue: ({ data, children, ...props }) => (
        //   <div {...props}>
        //     <div key={selectedOptions.length}>
        //       {selectedOptions[selectedOptions.length - 1].label}
        //       <button className="tagDelete" onClick={() => handleDelete(selectedOptions[selectedOptions.length - 1].value)}>x</button>
        //     </div>
        //     {selectedOptions.map(option => (
        //       <div key={option.value}>
        //         {option.label}
        //         <button className="tagDelete" onClick={() => handleDelete(option.value)}>x</button>
        //       </div>
        //     ))}
        //   </div>
        // )