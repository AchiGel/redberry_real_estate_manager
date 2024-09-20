import styled from "styled-components";
import { InputsBoxesTitles } from "./AddListingForm";
import {
  FormDataTypes,
  ListingErrorsTypes,
} from "../../generalTypes.interface";
import { ErrorMessage } from "./InputFields";

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

export default function IsRental({
  formData,
  onInputChange,
  listingErrors,
  setListingErrors,
}: {
  formData: FormDataTypes;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  listingErrors: ListingErrorsTypes;
  setListingErrors: React.Dispatch<React.SetStateAction<ListingErrorsTypes>>;
}) {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "იყიდება" ? 0 : 1;

    setListingErrors((prevErrors) => ({
      ...prevErrors,
      is_rental: undefined,
    }));

    onInputChange({
      ...e,
      target: {
        ...e.target,
        name: "is_rental",
        value: value,
      },
    });
  };

  return (
    <IsRentalLayout>
      <InputsBoxesTitles>გარიგების ტიპი</InputsBoxesTitles>
      <RadioBox>
        <label>
          <input
            id="forSale"
            type="radio"
            name="transaction"
            value="იყიდება"
            checked={formData.is_rental === 0}
            onChange={handleRadioChange}
          />
          <Label htmlFor="forSale">იყიდება</Label>
        </label>
        <label>
          <input
            id="forRent"
            type="radio"
            name="transaction"
            value="ქირავდება"
            checked={formData.is_rental === 1}
            onChange={handleRadioChange}
          />
          <Label htmlFor="forRent">ქირავდება</Label>
        </label>
      </RadioBox>
      {listingErrors.is_rental && (
        <ErrorMessage>{listingErrors.is_rental}</ErrorMessage>
      )}
    </IsRentalLayout>
  );
}
