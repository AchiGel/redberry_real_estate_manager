import { useState } from "react";
import { PriceInput, PriceInputsContainer } from "./PriceFilter";
import {
  ButtonArrow,
  FilterButton,
  FilterList,
  FilterListTitle,
  FilterWrapper,
  SelectButton,
} from "./RegionFilter";

export default function BedroomsFilter({
  bedroomsClicked,
  setAreaClicked,
  setBedroomsClicked,
  setPriceClicked,
  setRegionClicked,
  setSelectedBedrooms,
}: {
  bedroomsClicked: boolean;
  setPriceClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setRegionClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setAreaClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setBedroomsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBedrooms: React.Dispatch<React.SetStateAction<number | "">>;
}) {
  const [tempBedrooms, setTempBedrooms] = useState<number | "">("");

  const handleBedroomsSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);

    setTempBedrooms(value);
  };

  const handleBedrooms = () => {
    setSelectedBedrooms(tempBedrooms);
    setTempBedrooms("");
    setBedroomsClicked(false);
  };

  return (
    <FilterWrapper>
      <FilterButton
        $direction={bedroomsClicked}
        onClick={() => {
          setBedroomsClicked(!bedroomsClicked);
          setRegionClicked(false);
          setPriceClicked(false);
          setAreaClicked(false);
        }}
      >
        საძინებლების რაოდენობა <ButtonArrow $direction={bedroomsClicked} />
      </FilterButton>
      {bedroomsClicked ? (
        <FilterList>
          <FilterListTitle>საძინებლების რაოდენობა</FilterListTitle>
          <PriceInputsContainer>
            <PriceInput
              style={{ width: "20%" }}
              type="number"
              placeholder="2"
              value={tempBedrooms}
              onChange={handleBedroomsSelect}
            />
          </PriceInputsContainer>
          <SelectButton onClick={handleBedrooms}>არჩევა</SelectButton>
        </FilterList>
      ) : null}
    </FilterWrapper>
  );
}
