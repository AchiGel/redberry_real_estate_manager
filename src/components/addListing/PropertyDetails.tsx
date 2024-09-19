import styled from "styled-components";
import { InputsBoxesTitles } from "./AddListingForm";
import { FormSectionGrid, FormSectionWrapper } from "./FormAddress";
import InputFields, { InputFieldLayout, InputLabel } from "./InputFields";
import ImageUpload from "./ImageUpload";
import { FormDataTypes } from "../../generalTypes.interface";

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
}: {
  formData: FormDataTypes;
  setFormData: React.Dispatch<React.SetStateAction<FormDataTypes>>;
}) {
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
        />
        <InputFieldLayout $gridArea="1">
          <InputLabel>აღწერა *</InputLabel>
          <TextAreaDescr
            value={formData.description}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
        </InputFieldLayout>
        <InputFieldLayout $gridArea="2">
          <InputLabel>ატვირთეთ ფოტო *</InputLabel>
          <ImageUpload setFormData={setFormData} formType="listing" />
        </InputFieldLayout>
      </FormSectionGrid>
    </FormSectionWrapper>
  );
}
