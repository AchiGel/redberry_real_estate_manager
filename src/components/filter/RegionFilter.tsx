import { useState } from "react";
import { RegionsTypes } from "./FilterSection";
import styled from "styled-components";

const RegionsWrapper = styled.div`
  position: relative;
`;

const RegionsFilterButton = styled.button<{ direction: boolean }>`
  transition: all 0.4s ease;
  border: none;
  outline: none;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  background-color: ${(props) => (props.direction ? "#F3F3F3" : "#fff")};
  &:hover {
    background-color: #f3f3f3;
    cursor: pointer;
  }
`;

const ButtonArrow = styled.span<{ direction: boolean }>`
  background-image: url("./listingicons/button-icon.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  width: 14px;
  height: 14px;
  display: block;
  transform: ${(props) => (props.direction ? "none" : "rotate(180deg)")};
`;

const RegionsList = styled.div`
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

const RegionsListTitle = styled.h2`
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

const SelectButton = styled.button`
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

export default function RegionFilter({
  regions,
  setRegionsSelected,
}: {
  regions: RegionsTypes[] | undefined;
  regionsSelected: number[];
  setRegionsSelected: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const [regionsClicked, setRegionsClicked] = useState(false);
  const [tempRegionsSelected, setTempRegionsSelected] = useState<number[]>([]);

  const handleRegionChange = (region: number) => {
    setTempRegionsSelected((prevSelected) =>
      prevSelected.includes(region)
        ? prevSelected.filter((r) => r !== region)
        : [...prevSelected, region]
    );
  };

  const handleSelectRegions = () => {
    setRegionsSelected(tempRegionsSelected);
    setRegionsClicked(false);
  };

  return (
    <RegionsWrapper>
      <RegionsFilterButton
        direction={regionsClicked}
        onClick={() => setRegionsClicked(!regionsClicked)}
      >
        რეგიონი <ButtonArrow direction={regionsClicked} />
      </RegionsFilterButton>
      {regionsClicked ? (
        <RegionsList>
          <RegionsListTitle>რეგიონის მიხედვით</RegionsListTitle>
          <RegionsGrid>
            {regions?.length
              ? regions.map((el) => (
                  <div key={el.id}>
                    <input
                      id={el.name}
                      value={el.name}
                      type="checkbox"
                      checked={tempRegionsSelected.includes(el.id)}
                      onChange={() => handleRegionChange(el.id)}
                    />
                    <label htmlFor={el.name}>{el.name}</label>
                  </div>
                ))
              : null}
          </RegionsGrid>
          <SelectButton onClick={handleSelectRegions}>არჩევა</SelectButton>
        </RegionsList>
      ) : null}
    </RegionsWrapper>
  );
}
