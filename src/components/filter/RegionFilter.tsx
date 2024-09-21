import { useEffect, useState } from "react";
import styled from "styled-components";
import { PropertyTypes, RegionFilterProps } from "../../generalTypes.interface";

interface TempRegion {
  id: number;
  name: string;
}

export const FilterWrapper = styled.div`
  position: relative;
`;

export const FilterButton = styled.button<{ $direction?: boolean }>`
  transition: all 0.4s ease;
  border: none;
  outline: none;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  background-color: ${(props) => (props.$direction ? "#F3F3F3" : "#fff")};
  &:hover {
    background-color: #f3f3f3;
    cursor: pointer;
  }
`;

export const ButtonArrow = styled.span<{ $direction: boolean }>`
  background-image: url("./listingicons/button-icon.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  width: 14px;
  height: 14px;
  display: block;
  transform: ${(props) => (props.$direction ? "none" : "rotate(180deg)")};
`;

export const FilterList = styled.div`
  position: absolute;
  z-index: 1;
  top: 51px;
  padding: 24px;
  border-radius: 10px;
  border: 1px solid #dbdbdb;
  background: #fff;
  box-shadow: 5px 5px 12px 0px rgba(2, 21, 38, 0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FilterListTitle = styled.h2`
  color: #021526;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 24px;
`;

const RegionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 50px;
  margin-bottom: 32px;
`;

export const SelectButton = styled.button`
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 8px;
  background: #f93b1d;
  align-self: flex-end;
`;

const RegionCheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RegionCheckBox = styled.input`
  width: 20px;
  height: 20px;
  &:checked {
    background-color: green;
  }
`;

export default function RegionFilter({
  regions,
  setRegionsSelected,
  setFilteredOptions,
  listing,
  regionsSelected,
  regionClicked,
  setRegionClicked,
  setPriceClicked,
  setAreaClicked,
  setBedroomsClicked,
  handleUserInteraction,
}: RegionFilterProps) {
  const [tempRegionsSelected, setTempRegionsSelected] = useState<TempRegion[]>(
    []
  );

  // console.log("tempRegionsSelected", tempRegionsSelected);

  const handleSelectRegions = () => {
    setRegionsSelected(tempRegionsSelected);
    setTempRegionsSelected([]);
    setRegionClicked(false);
  };

  useEffect(() => {
    if (!regionsSelected || !listing) return;

    setFilteredOptions(
      listing.filter((el: PropertyTypes) =>
        regionsSelected.some((region) => region.id === el.city.region.id)
      )
    );
  }, [regionsSelected, setFilteredOptions, listing]);

  const handleRegionChange = (region: TempRegion) => {
    setTempRegionsSelected((prevSelected) =>
      prevSelected.some((r) => r.id === region.id)
        ? prevSelected.filter((r) => r.id !== region.id)
        : [...prevSelected, region]
    );
  };

  return (
    <FilterWrapper>
      <FilterButton
        $direction={regionClicked}
        onClick={() => {
          setRegionClicked(!regionClicked);
          handleUserInteraction();
          setPriceClicked(false);
          setAreaClicked(false);
          setBedroomsClicked(false);
        }}
      >
        რეგიონი <ButtonArrow $direction={regionClicked} />
      </FilterButton>
      {regionClicked ? (
        <FilterList>
          <FilterListTitle>რეგიონის მიხედვით</FilterListTitle>
          <RegionsGrid>
            {regions?.length
              ? regions.map((el) => (
                  <RegionCheckBoxContainer key={el.id}>
                    <RegionCheckBox
                      id={el.name}
                      value={el.name}
                      type="checkbox"
                      checked={tempRegionsSelected.some((r) => r.id === el.id)}
                      onChange={() =>
                        handleRegionChange({ id: el.id, name: el.name })
                      }
                    />
                    <label htmlFor={el.name}>{el.name}</label>
                  </RegionCheckBoxContainer>
                ))
              : null}
          </RegionsGrid>
          <SelectButton onClick={handleSelectRegions}>არჩევა</SelectButton>
        </FilterList>
      ) : null}
    </FilterWrapper>
  );
}
