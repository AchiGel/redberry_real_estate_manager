import Select from "react-select";

interface OptionType {
  value: string;
  label: string;
}

export default function Selector() {
  const options1: OptionType[] = [
    { value: "option1A", label: "Option 1A" },
    { value: "option1B", label: "Option 1B" },
    { value: "option1C", label: "Option 1C" },
  ];

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
  };

  return (
    <Select
      options={options1}
      placeholder="Select an option"
      onChange={handleChange}
      isMulti
    />
  );
}
