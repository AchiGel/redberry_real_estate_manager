import styled from "styled-components";

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

export default function ChosenOption({ title }: { title: number }) {
  return (
    <ChosenOptionCard>
      <OptionLabel>{title}</OptionLabel>
      <CloseButton />
    </ChosenOptionCard>
  );
}
