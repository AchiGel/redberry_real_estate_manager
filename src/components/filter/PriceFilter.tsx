// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import styled from "styled-components";
import {
  ButtonArrow,
  FilterButton,
  FilterList,
  FilterListTitle,
  FilterWrapper,
  SelectButton,
} from "./RegionFilter";
import { useState } from "react";
import { PriceFilterProps } from "../../generalTypes.interface";
import { ErrorMessage } from "../addListing/InputFields";

export const PriceInputsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 24px;
`;

export const PriceInput = styled.input`
  color: rgba(2, 21, 38, 0.4);
  font-size: 14px;
  font-weight: 400;
  outline: none;
  border-radius: 6px;
  border: 1px solid #808a93;
  padding: 10px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const PriceListContainer = styled.div`
  display: flex;
  gap: 35%;
  width: 100%;
  justify-content: flex-start;
`;

export const PriceList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

export const PriceListTitle = styled.h3`
  color: #021526;
  font-size: 14px;
  font-weight: bold;
`;

export const HiddenCheckbox = styled.input`
  display: none;
`;

export const PriceLabel = styled.label`
  cursor: pointer;
  font-size: 14px;
  color: #021526;
  margin: 5px 0;
  &:hover {
    font-weight: bold;
  }
`;

export default function PriceFilter({
  priceClicked,
  setPriceClicked,
  setRegionClicked,
  setAreaClicked,
  setBedroomsClicked,
  setSelectedPrices,
}: PriceFilterProps) {
  const prices = [50000, 100000, 150000, 200000, 300000];

  const [tempPrices, setTempPrices] = useState<[number | null, number | null]>([
    null,
    null,
  ]);

  const [inputTempPrices, setInputTempPrices] = useState<
    [number | null, number | null]
  >([null, null]);

  const [errorMessage, setErrorMessage] = useState(false);

  const handlePriceFromSelect = (value: number) => {
    setTempPrices((prev) => [value, prev[1]]);
  };

  const handlePriceToSelect = (value: number) => {
    setTempPrices((prev) => [prev[0], value]);
  };

  const handlePriceRange = () => {
    if (tempPrices[0] !== null && tempPrices[1] !== null) {
      if (tempPrices[1] < tempPrices[0]) {
        setErrorMessage(true);
        return;
      } else {
        setSelectedPrices(tempPrices);
        setInputTempPrices([null, null]);
        setTempPrices([null, null]);
        setErrorMessage(false);
        setPriceClicked(false);
        return;
      }
    }

    if (inputTempPrices[0] === null || inputTempPrices[1] === null) {
      setErrorMessage(true);
      return;
    }

    if (inputTempPrices[1] < inputTempPrices[0]) {
      setErrorMessage(true);
      return;
    }

    setSelectedPrices(inputTempPrices);

    setInputTempPrices([null, null]);
    setTempPrices([null, null]);
    setErrorMessage(false);
    setPriceClicked(false);
  };

  const handleInputChange = (index: number, value: string) => {
    const parsedValue = value ? Number(value) : null;
    setInputTempPrices((prev) => {
      const newValues = [...prev];
      newValues[index] = parsedValue;
      return newValues;
    });
  };

  return (
    <FilterWrapper>
      <FilterButton
        $direction={priceClicked}
        onClick={() => {
          setPriceClicked(!priceClicked);
          setRegionClicked(false);
          setAreaClicked(false);
          setBedroomsClicked(false);
        }}
      >
        საფასო კატეგორია <ButtonArrow $direction={priceClicked} />
      </FilterButton>
      {priceClicked ? (
        <FilterList>
          <FilterListTitle>ფასის მიხედვით</FilterListTitle>
          <PriceInputsContainer>
            <PriceInput
              placeholder="დან"
              type="number"
              value={
                inputTempPrices[0] !== null ? inputTempPrices[0].toString() : ""
              }
              onChange={(e) => handleInputChange(0, e.target.value)}
            />
            <PriceInput
              placeholder="მდე"
              type="number"
              value={
                inputTempPrices[1] !== null ? inputTempPrices[1].toString() : ""
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
                ჩაწერეთ ვალიდური მონაცემები (საბოლოო ფასი უნდა აღემატებოდეს
                საწყისს)
              </ErrorMessage>
            </div>
          )}
          <PriceListContainer>
            <PriceList>
              <PriceListTitle>მინ. ფასი</PriceListTitle>
              {prices.map((el) => (
                <PriceLabel key={el} onClick={() => handlePriceFromSelect(el)}>
                  <HiddenCheckbox type="checkbox" />
                  {el + " ₾"}
                </PriceLabel>
              ))}
            </PriceList>
            <PriceList>
              <PriceListTitle>მაქს. ფასი</PriceListTitle>
              {prices.map((el) => (
                <PriceLabel key={el} onClick={() => handlePriceToSelect(el)}>
                  <HiddenCheckbox type="checkbox" />
                  {el + " ₾"}
                </PriceLabel>
              ))}
            </PriceList>
          </PriceListContainer>
          <SelectButton onClick={handlePriceRange}>არჩევა</SelectButton>
        </FilterList>
      ) : null}
    </FilterWrapper>
  );
}
