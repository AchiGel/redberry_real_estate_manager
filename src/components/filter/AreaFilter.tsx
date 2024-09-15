import {
  ButtonArrow,
  FilterButton,
  FilterList,
  FilterWrapper,
} from "./RegionFilter";

export default function AreaFilter({
  areaClicked,
  setAreaClicked,
  setBedroomsClicked,
  setPriceClicked,
  setRegionClicked,
}: {
  areaClicked: boolean;
  setPriceClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setRegionClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setAreaClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setBedroomsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <FilterWrapper>
      <FilterButton
        direction={areaClicked}
        onClick={() => {
          setAreaClicked(!areaClicked);
          setRegionClicked(false);
          setPriceClicked(false);
          setBedroomsClicked(false);
        }}
      >
        ფართობი <ButtonArrow direction={areaClicked} />
      </FilterButton>
      {areaClicked ? <FilterList>Area filter</FilterList> : null}
    </FilterWrapper>
  );
}
