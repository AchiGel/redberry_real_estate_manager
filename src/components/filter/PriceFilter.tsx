import styled from "styled-components";
import {
  ButtonArrow,
  FilterButton,
  FilterList,
  FilterListTitle,
  FilterWrapper,
  SelectButton,
} from "./RegionFilter";

const PriceInputsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 24px;
`;

const PriceInput = styled.input`
  color: rgba(2, 21, 38, 0.4);
  font-size: 14px;
  font-weight: 400;
  outline: none;
  border-radius: 6px;
  border: 1px solid #808a93;
  padding: 10px;
`;

const PriceListContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const PriceList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

const PriceListTitle = styled.h3`
  color: #021526;
  font-size: 14px;
  font-weight: 500;
`;

export default function PriceFilter({
  priceClicked,
  setPriceClicked,
  setRegionClicked,
  setAreaClicked,
  setBedroomsClicked,
}: {
  priceClicked: boolean;
  setPriceClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setRegionClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setAreaClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setBedroomsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const prices = [50000, 100000, 150000, 200000, 300000];

  return (
    <FilterWrapper>
      <FilterButton
        direction={priceClicked}
        onClick={() => {
          setPriceClicked(!priceClicked);
          setRegionClicked(false);
          setAreaClicked(false);
          setBedroomsClicked(false);
        }}
      >
        საფასო კატეგორია <ButtonArrow direction={priceClicked} />
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
                <label>
                  <input type="checkbox" />
                  {el}
                </label>
              ))}
            </PriceList>
            <PriceList>
              <PriceListTitle>მაქს. ფასი</PriceListTitle>
              {prices.map((el) => (
                <label>
                  <input type="checkbox" />
                  {el}
                </label>
              ))}
            </PriceList>
          </PriceListContainer>
          <SelectButton>არჩევა</SelectButton>
        </FilterList>
      ) : null}
    </FilterWrapper>
  );
}
