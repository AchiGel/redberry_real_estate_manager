import styled from "styled-components";
import { ButtonArrow, FilterButton, FilterWrapper } from "./RegionFilter";

const PriceFilterLayout = styled.div`
  position: absolute;
  z-index: 1;
  top: 51px;
  border-radius: 10px;
  border: 1px solid #dbdbdb;
  background: #fff;
  box-shadow: 5px 5px 12px 0px rgba(2, 21, 38, 0.08);
  padding: 24px;
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
        <PriceFilterLayout>price filter</PriceFilterLayout>
      ) : null}
    </FilterWrapper>
  );
}
