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
`;

export const PriceListContainer = styled.div`
  display: flex;
  gap: 24px;
`;

export const PriceList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

export const PriceListTitle = styled.h3`
  color: #021526;
  font-size: 14px;
  font-weight: 500;
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

  const handlePriceFromSelect = (value: number) => {
    setTempPrices((prev) => [value, prev[1]]);
  };

  const handlePriceToSelect = (value: number) => {
    setTempPrices((prev) => [prev[0], value]);
  };

  const handlePriceRange = () => {
    setSelectedPrices(tempPrices);
    setPriceClicked(false);
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
            <PriceInput placeholder="დან" type="number" />
            <PriceInput placeholder="მდე" type="number" />
          </PriceInputsContainer>
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
