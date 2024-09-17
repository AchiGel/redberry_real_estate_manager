import styled from "styled-components";

interface ChosenOptionProps {
  id?: number;
  name?: string;
  selectedBedrooms?: number | "";
  selectedPrices?: [number | null, number | null];
  selectedAreas?: [number | null, number | null];
  removeRegion?: (id: number) => void;
  removeBedrooms?: (bedroom: string) => void;
  removePrices?: () => void;
  removeAreas?: () => void;
}

const ChosenOptionCard = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 43px;
  border: 1px solid #dbdbdb;
  background: #fff;
`;

const OptionLabel = styled.h3`
  color: rgba(2, 21, 38, 0.8);
  font-size: 14px;
  font-weight: 400;
`;

const CloseButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  background-image: url("./close.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  height: 14px;
  width: 14px;
`;

export default function ChosenOption({
  id,
  name,
  selectedBedrooms,
  removeRegion,
  removeBedrooms,
  selectedPrices,
  removePrices,
  selectedAreas,
  removeAreas,
}: ChosenOptionProps) {
  const handleClick = () => {
    if (id && removeRegion) {
      removeRegion(id);
    } else if (selectedBedrooms !== undefined && removeBedrooms) {
      removeBedrooms("");
    } else if (removePrices && selectedPrices) {
      removePrices();
    } else if (removeAreas && selectedAreas) {
      removeAreas();
    }
  };

  const getPriceLabel = () => {
    if (
      selectedPrices &&
      selectedPrices[0] !== null &&
      selectedPrices[1] !== null
    ) {
      return `${selectedPrices[0]} ₾ - ${selectedPrices[1]} ₾`;
    }
    return null;
  };

  const getAreasLabel = () => {
    if (
      selectedAreas &&
      selectedAreas[0] !== null &&
      selectedAreas[1] !== null
    ) {
      return `${selectedAreas[0]} მ² - ${selectedAreas[1]} მ²`;
    }
  };

  return (
    <ChosenOptionCard>
      <OptionLabel>
        {name || selectedBedrooms || getPriceLabel() || getAreasLabel()}
      </OptionLabel>
      <CloseButton onClick={handleClick} />
    </ChosenOptionCard>
  );
}
