// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import styled from "styled-components";
import { InputsBoxesTitles } from "./AddListingForm";
import { FormSectionGrid, FormSectionWrapper } from "./FormAddress";
import InputFields, {
  ErrorMessage,
  InputFieldLayout,
  InputLabel,
} from "./InputFields";
import ImageUpload from "./ImageUpload";
import { PropertyDetailsTypes } from "../../generalTypes.interface";

const TextAreaDescr = styled.textarea`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #808a93;
  width: 100%;
  height: 135px;
  resize: none;
`;

export default function PropertyDetails({
  formData,
  setFormData,
  listingErrors,
  setListingErrors,
}: PropertyDetailsTypes) {
  const validateDescription = (value: string) => {
    if (!value) return false;
    if (value.trim().split(" ").length < 5) return false;
    return true;
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      description: value,
    }));

    const error = validateDescription(value);
    setListingErrors((prevErrors) => ({
      ...prevErrors,
      description: error,
    }));
  };

  console.log(listingErrors);

  return (
    <FormSectionWrapper>
      <InputsBoxesTitles>ბინის დეტალები</InputsBoxesTitles>
      <FormSectionGrid>
        <InputFields
          $gridArea=""
          type="number"
          id="price"
          label="ფასი"
          value={formData.price || ""}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              price: e.target.value,
            }))
          }
          listingError={listingErrors?.price}
          setListingErrors={setListingErrors}
        />
        <InputFields
          $gridArea=""
          type="number"
          id="area"
          label="ფართობი"
          value={formData.area || ""}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              area: e.target.value,
            }))
          }
          listingError={listingErrors?.area}
          setListingErrors={setListingErrors}
        />
        <InputFields
          $gridArea=""
          type="number"
          id="bedrooms"
          label="საძინებლების რაოდენობა*"
          value={formData.bedrooms || ""}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              bedrooms: e.target.value,
            }))
          }
          listingError={listingErrors?.bedrooms}
          setListingErrors={setListingErrors}
        />
        <InputFieldLayout $gridArea="1">
          <InputLabel>აღწერა *</InputLabel>
          <TextAreaDescr
            value={formData.description}
            onChange={handleDescriptionChange}
          />
          {listingErrors?.description && (
            <ErrorMessage>{listingErrors?.description}</ErrorMessage>
          )}
        </InputFieldLayout>
        <InputFieldLayout $gridArea="2">
          <InputLabel>ატვირთეთ ფოტო *</InputLabel>
          <ImageUpload
            setFormData={setFormData}
            formType="listing"
            required={true}
            listingErrors={listingErrors}
            setListingErrors={setListingErrors}
          />
        </InputFieldLayout>
        {listingErrors?.image && (
          <ErrorMessage>{listingErrors?.image}</ErrorMessage>
        )}
      </FormSectionGrid>
    </FormSectionWrapper>
  );
}
