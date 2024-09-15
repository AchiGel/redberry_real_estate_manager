import { ButtonArrow, FilterButton, FilterWrapper } from "./RegionFilter";

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
          setAreaClicked(!bedroomsClicked);
          setRegionClicked(false);
          setPriceClicked(false);
          setBedroomsClicked(false);
        }}
      >
        საძინებლების რაოდენობა <ButtonArrow direction={bedroomsClicked} />
      </FilterButton>
    </FilterWrapper>
  );
}
