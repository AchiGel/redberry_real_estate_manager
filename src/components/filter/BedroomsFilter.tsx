import {
  ButtonArrow,
  FilterButton,
  FilterList,
  FilterWrapper,
} from "./RegionFilter";

export default function BedroomsFilter({
  bedroomsClicked,
  setAreaClicked,
  setBedroomsClicked,
  setPriceClicked,
  setRegionClicked,
}: {
  bedroomsClicked: boolean;
  setPriceClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setRegionClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setAreaClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setBedroomsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <FilterWrapper>
      <FilterButton
        direction={bedroomsClicked}
        onClick={() => {
          setBedroomsClicked(!bedroomsClicked);
          setRegionClicked(false);
          setPriceClicked(false);
          setAreaClicked(false);
        }}
      >
        საძინებლების რაოდენობა <ButtonArrow direction={bedroomsClicked} />
      </FilterButton>
      {bedroomsClicked ? <FilterList>Bedrooms filter</FilterList> : null}
    </FilterWrapper>
  );
}
