import React, { useState } from 'react';
import Select, { SingleValue, MultiValue } from 'react-select';

type Option = {
  label: string; 
  value: string;
};

function TagsSearch() {
  const tagsList = ['Bitter Gourd', 'Recipe', 'Orange', 'Apple'];
  const options = tagsList.map(tag => ({ value: tag, label: tag }));
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  function handleChange(selectedOption: MultiValue<Option>) {
    if (selectedOption){
      setSelectedOptions([...selectedOptions, ...selectedOption]);
    }
    
  }

  function handleDelete(index: number) {
    setSelectedOptions(selectedOptions.filter((_, i) => i !== index));
  }

  return (
    <>
      {selectedOptions.map((option, index) => (
        <span key={index} className="selected-tag">
          {option.label}
          <button onClick={() => handleDelete(index)}>x</button>
        </span>
      ))}
      <Select
        options={options}
        onChange={handleChange}
        value={selectedOptions}
        isMulti
      />
    </>
  );
}

export default TagsSearch;


// import React, { useState } from 'react';
// import Select, { SingleValue } from 'react-select';

// type Option = { value: string };

// export default function TagsSearch() {
//   const tagsList = ['Bitter Gourd', 'Recipe', 'Orange', 'Apple'];
//   const options = tagsList.map(tag => ({value: tag}));
//   const [selectedTag, setSelectedTag] = useState('');
//   const [selectedOptions, setSelectedOptions] = useState<SingleValue<Option>[]>([]);

//   function handleChange(selectedOption: SingleValue<Option>) {
//     if (selectedOption) {
//       setSelectedTag(selectedOption.value);
//       setSelectedOptions([...selectedOptions, selectedOption]);
//     }
//   }

//   return (
//     <>
//       <Select
//         options={options}
//         onChange={handleChange}
//       />
//       <input 
//         className="filterTags formInput"
//         type="text" 
//         placeholder="Filter Posts"
//         value={selectedTag}
//       />
//     </>
//   );
// }

