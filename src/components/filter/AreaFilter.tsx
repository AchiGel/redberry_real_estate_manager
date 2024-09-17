import { useState } from "react";
import {
  ButtonArrow,
  FilterButton,
  FilterList,
  FilterListTitle,
  FilterWrapper,
  SelectButton,
} from "./RegionFilter";
import {
  HiddenCheckbox,
  PriceInput,
  PriceInputsContainer,
  PriceLabel,
  PriceList,
  PriceListContainer,
  PriceListTitle,
} from "./PriceFilter";

export default function AreaFilter({
  areaClicked,
  setAreaClicked,
  setBedroomsClicked,
  setPriceClicked,
  setRegionClicked,
  setSelectedAreas,
}: {
  areaClicked: boolean;
  setPriceClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setRegionClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setAreaClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setBedroomsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAreas: React.Dispatch<
    React.SetStateAction<[number | null, number | null]>
  >;
}) {
  const areas = [30, 50, 70, 100, 150];

  const [tempAreas, setTempAreas] = useState<[number | null, number | null]>([
    null,
    null,
  ]);

  const handleAreaFromSelect = (value: number) => {
    setTempAreas((prev) => [value, prev[1]]);
  };

  const handleAreaToSelect = (value: number) => {
    setTempAreas((prev) => [prev[0], value]);
  };

  const handleAreaRange = () => {
    setSelectedAreas(tempAreas);
    setAreaClicked(false);
  };

  return (
    <FilterWrapper>
      <FilterButton
        $direction={areaClicked}
        onClick={() => {
          setAreaClicked(!areaClicked);
          setRegionClicked(false);
          setPriceClicked(false);
          setBedroomsClicked(false);
        }}
      >
        ფართობი <ButtonArrow $direction={areaClicked} />
      </FilterButton>
      {areaClicked ? (
        <FilterList>
          <FilterListTitle>ფასის მიხედვით</FilterListTitle>
          <PriceInputsContainer>
            <PriceInput placeholder="დან" type="number" />
            <PriceInput placeholder="მდე" type="number" />
          </PriceInputsContainer>
          <PriceListContainer>
            <PriceList>
              <PriceListTitle>მინ. მ²</PriceListTitle>
              {areas.map((el) => (
                <PriceLabel key={el} onClick={() => handleAreaFromSelect(el)}>
                  <HiddenCheckbox type="checkbox" />
                  {el + " მ²"}
                </PriceLabel>
              ))}
            </PriceList>
            <PriceList>
              <PriceListTitle>მაქს. მ²</PriceListTitle>
              {areas.map((el) => (
                <PriceLabel key={el} onClick={() => handleAreaToSelect(el)}>
                  <HiddenCheckbox type="checkbox" />
                  {el + " მ²"}
                </PriceLabel>
              ))}
            </PriceList>
          </PriceListContainer>
          <SelectButton onClick={handleAreaRange}>არჩევა</SelectButton>
        </FilterList>
      ) : null}
    </FilterWrapper>
  );
}
