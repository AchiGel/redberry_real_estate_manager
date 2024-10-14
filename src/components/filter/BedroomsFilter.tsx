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
import { BedroomFilterProps } from "../../generalTypes.interface";

export default function BedroomsFilter({
  bedroomsClicked,
  setAreaClicked,
  setBedroomsClicked,
  setPriceClicked,
  setRegionClicked,
  setSelectedBedrooms,
}: BedroomFilterProps) {
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
              style={{ width: "30px" }}
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
