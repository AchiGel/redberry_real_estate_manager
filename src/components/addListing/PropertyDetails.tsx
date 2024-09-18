import styled from "styled-components";
import { InputsBoxesTitles } from "./AddListingForm";
import { FormSectionGrid, FormSectionWrapper } from "./FormAddress";
import InputFields, { InputFieldLayout, InputLabel } from "./InputFields";

const TextAreaDescr = styled.textarea`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #808a93;
  width: 100%;
  height: 135px;
  resize: none;
`;

const ImageUploadLabel = styled.label`
  display: inline-block;
  transition: all 0.4s ease;
  width: 100%;
  height: 120px;
  border-radius: 8px;
  border: 1px dashed #2d3648;
  background-image: url("./listingicons/plus-circle.svg");
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    cursor: pointer;
    border: 1px solid #2d3648;
    scale: 0.99;
  }
`;

const ImageUloadImput = styled.input`
  display: none;
`;

export default function PropertyDetails() {
  return (
    <FormSectionWrapper>
      <InputsBoxesTitles>ბინის დეტალები</InputsBoxesTitles>
      <FormSectionGrid>
        <InputFields $gridArea="" type="number" id="price" label="ფასი" />
        <InputFields $gridArea="" type="number" id="area" label="ფართობი" />
        <InputFields
          $gridArea=""
          type="number"
          id="bedrooms"
          label="საძინებლების რაოდენობა*"
        />
        <InputFieldLayout $gridArea="1">
          <InputLabel>აღწერა *</InputLabel>
          <TextAreaDescr />
        </InputFieldLayout>
        <InputFieldLayout $gridArea="2">
          <InputLabel>ატვირთეთ ფოტო *</InputLabel>
          <ImageUploadLabel htmlFor="image"></ImageUploadLabel>
          <ImageUloadImput id="image" />
        </InputFieldLayout>
      </FormSectionGrid>
    </FormSectionWrapper>
  );
}
