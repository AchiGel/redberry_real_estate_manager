import styled from "styled-components";

export const ModalLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  height: 100vh;
  width: 100vw;
  background-color: rgba(2, 21, 38, 0.34);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AgentModalLayout = styled.div`
  width: 50%;
  padding: 87px 105px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 4px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 560px) {
    width: 90%;
    padding: 10px;
  }
`;

export const AgentInputsFlexbox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
`;

export const ErrorText = styled.p`
  color: #f93b1d;
  font-size: 14px;
  margin: 0;
`;

export const AgentInputLabel = styled.label`
  color: #021526;
  font-size: 14px;
  font-weight: 500;
`;

export const AgentInputBox = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #808a93;
  width: 100%;
`;

export const AgentInputFieldLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

export const AgentImageUploadLabel = styled.label`
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

export const AgentImageUloadImput = styled.input`
  display: none;
`;

export const AgentPreviewImageBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 92px;
  height: 82px;
`;

export const AgentRemoveImgPreview = styled.button`
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
