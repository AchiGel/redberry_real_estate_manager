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
          <TextAreaDescr />
        </InputFieldLayout>
      </FormSectionGrid>
    </FormSectionWrapper>
  );
}
