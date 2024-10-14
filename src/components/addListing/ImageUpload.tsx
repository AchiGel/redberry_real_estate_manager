/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import styled from "styled-components";
import { AgentFormTypes } from "../modals/AddAgentModal";
import { FormDataTypes } from "../../generalTypes.interface";
import { ErrorMessage } from "./InputFields";
import { useState } from "react";

const ImageUploadLabel = styled.label`
  position: relative;
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

const PreviewImageBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 92px;
  height: 82px;
`;

const RemoveImgPreview = styled.button`
  position: absolute;
  bottom: -5px;
  right: -8px;
  background-color: transparent;
  border: none;
  outline: none;
  width: 24px;
  height: 24px;
  background-image: url("./listingicons/trash.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
`;

export default function ImageUpload({
  setAgentForm,
  setFormData,
  required,
  formType,
  $validationError,
  setErrors,
  listingErrors,
  setListingErrors,
}: {
  setAgentForm?: React.Dispatch<React.SetStateAction<AgentFormTypes>>;
  setFormData?: (
    e: React.Dispatch<React.SetStateAction<FormDataTypes>>
  ) => void | React.Dispatch<React.SetStateAction<FormDataTypes>>;
  required: boolean;
  formType: string;
  $validationError: string | undefined;
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}) {
  const [imagePrev, setImagePrev] = useState<null | File>(null);

  const removePreview = () => {
    setImagePrev(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (validateField(file)) {
        setImagePrev(file);
        if (formType === "agent") {
          setErrors((prevErrors) => {
            const { avatar, ...rest } = prevErrors;
            return rest;
          });
        } else if (formType === "listing") {
          setListingErrors((prevErrors) => {
            const { image, ...rest } = prevErrors;
            return rest;
          });
        }

        if (formType === "agent") {
          setAgentForm((prevForm) => ({
            ...prevForm,
            avatar: file,
          }));
        } else if (formType === "listing") {
          setFormData((prevForm) => ({
            ...prevForm,
            image: file,
          }));
        } else {
          console.log("File validation failed");
        }
      }
    }
  };

  const validateField = (file: File | null): boolean => {
    if (required && !file) {
      setErrors((prev) => ({ ...prev, avatar: "სავალდებულო" }));
      return false;
    }
    return true;
  };

  console.log($validationError);

  return (
    <>
      <ImageUploadLabel htmlFor="image">
        {imagePrev && (
          <PreviewImageBox>
            <img
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "4px",
              }}
              src={URL.createObjectURL(imagePrev)}
              alt="image"
            />
            <RemoveImgPreview onClick={removePreview} />
          </PreviewImageBox>
        )}
      </ImageUploadLabel>
      <ImageUloadImput
        name="image"
        id="image"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {$validationError ? <ErrorMessage>სავალდებულო</ErrorMessage> : null}
      {listingErrors.image && <ErrorMessage>სავალდებულო</ErrorMessage>}
    </>
  );
}
