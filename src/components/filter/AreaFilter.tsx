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
import { AreaFilterProps } from "../../generalTypes.interface";
import { ErrorMessage } from "../addListing/InputFields";

export default function AreaFilter({
  areaClicked,
  setAreaClicked,
  setBedroomsClicked,
  setPriceClicked,
  setRegionClicked,
  setSelectedAreas,
  handleUserInteraction,
}: AreaFilterProps) {
  const areas = [30, 50, 70, 100, 150];

  const [tempAreas, setTempAreas] = useState<[number | null, number | null]>([
    null,
    null,
  ]);

  const [inputTempAreas, setInputTempAreas] = useState<
    [number | null, number | null]
  >([null, null]);

  const [errorMessage, setErrorMessage] = useState(false);

  const handleAreaFromSelect = (value: number) => {
    setTempAreas((prev) => [value, prev[1]]);
  };

  const handleAreaToSelect = (value: number) => {
    setTempAreas((prev) => [prev[0], value]);
  };

  const handleAreaRange = () => {
    if (tempAreas[0] !== null && tempAreas[1] !== null) {
      if (tempAreas[1] < tempAreas[0]) {
        setErrorMessage(true);
        return;
      } else {
        setSelectedAreas(tempAreas);
        setInputTempAreas([null, null]);
        setTempAreas([null, null]);
        setErrorMessage(false);
        setAreaClicked(false);
        return;
      }
    }

    if (inputTempAreas[0] === null || inputTempAreas[1] === null) {
      setErrorMessage(true);
      return;
    }

    if (inputTempAreas[1] < inputTempAreas[0]) {
      setErrorMessage(true);
      return;
    }

    setSelectedAreas(inputTempAreas);

    setInputTempAreas([null, null]);
    setTempAreas([null, null]);
    setErrorMessage(false);
    setAreaClicked(false);
  };

  const handleInputChange = (index: number, value: string) => {
    const parsedValue = value ? Number(value) : null;
    setInputTempAreas((prev) => {
      const newValues = [...prev];
      newValues[index] = parsedValue;
      return newValues;
    });
  };

  return (
    <FilterWrapper>
      <FilterButton
        $direction={areaClicked}
        onClick={() => {
          setAreaClicked(!areaClicked);
          handleUserInteraction();
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
            <PriceInput
              placeholder="დან"
              type="number"
              value={
                inputTempAreas[0] !== null ? inputTempAreas[0].toString() : ""
              }
              onChange={(e) => handleInputChange(0, e.target.value)}
            />
            <PriceInput
              placeholder="მდე"
              type="number"
              value={
                inputTempAreas[1] !== null ? inputTempAreas[1].toString() : ""
              }
              onChange={(e) => handleInputChange(1, e.target.value)}
            />
          </PriceInputsContainer>
          {errorMessage && (
            <div
              style={{
                marginTop: "-16px",
                fontSize: "12px",
                marginBottom: "10px",
              }}
            >
              <ErrorMessage>
                ჩაწერეთ ვალიდური მონაცემები (მაქსიმალური ფართობი უნდა
                აღემატებოდეს საწყისს)
              </ErrorMessage>
            </div>
          )}
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
