import styled from "styled-components";
import { InputsBoxesTitles } from "./AddListingForm";

const IsRentalLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RadioBox = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const Label = styled.label`
  margin-left: 7px;
  color: #021526;
  font-size: 14px;
  font-weight: 400;
`;

export default function IsRental() {
  return (
    <IsRentalLayout>
      <InputsBoxesTitles>გარიგების ტიპი</InputsBoxesTitles>
      <RadioBox>
        <label>
          <input id="forSale" type="radio" name="transaction" value="იყიდება" />
          <Label htmlFor="forSale">იყიდება</Label>
        </label>
        <label>
          <input
            id="forRent"
            type="radio"
            name="transaction"
            value="ქირავდება"
          />
          <Label htmlFor="forRent">ქირავდება</Label>
        </label>
      </RadioBox>
    </IsRentalLayout>
  );
}
