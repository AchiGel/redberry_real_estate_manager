import styled from "styled-components";
import { AgentFormTypes } from "../modals/AddAgentModal";
import { FormDataTypes } from "../../generalTypes.interface";
import { ErrorMessage } from "./InputFields";

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

export default function ImageUpload({
  setAgentForm,
  setFormData,
  required,
  formType,
  $validationError,
  setValidationError,
}: {
  setAgentForm?: React.Dispatch<React.SetStateAction<AgentFormTypes>>;
  setFormData?: React.Dispatch<React.SetStateAction<FormDataTypes>>;
  required: boolean;
  formType: string;
  $validationError: string | undefined;
  setValidationError: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      console.log("selected image", file);

      if (formType === "agent" && validateField(file)) {
        setValidationError((prevErrors: { [key: string]: string }) => {
          const { avatar, ...rest } = prevErrors;
          return rest;
        });
      }

      if (formType === "agent" && setAgentForm) {
        setAgentForm((prevForm) => ({
          ...prevForm,
          avatar: file,
        }));
      } else if (formType === "listing" && setFormData) {
        setFormData((prevForm) => ({
          ...prevForm,
          image: file,
        }));
      }
    }
  };

  const validateField = (file: File | null): boolean => {
    if (required && !file) {
      setValidationError((prev) => ({ ...prev, avatar: "სავალდებულო" }));
      return false;
    }

    return true;
  };

  return (
    <>
      <ImageUploadLabel htmlFor="image"></ImageUploadLabel>
      <ImageUloadImput
        id="image"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required={required}
      />
      {$validationError ? <ErrorMessage>სავალდებულო</ErrorMessage> : null}
    </>
  );
}
