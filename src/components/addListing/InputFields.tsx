import styled from "styled-components";

export const InputFieldLayout = styled.div<{ $gridArea: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  grid-area: ${(props) =>
    props.$gridArea === "1"
      ? "3 / 1 / 3 / 3"
      : props.$gridArea === "2"
      ? "4 / 1 / 4 / 3"
      : "auto"};
`;

export const InputLabel = styled.label`
  color: #021526;
  font-size: 14px;
  font-weight: 500;
`;

const InputBox = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #808a93;
  width: 100%;
`;

export default function InputFields({
  type,
  label,
  id,
  $gridArea,
}: {
  type: string;
  label: string;
  id: string;
  $gridArea: string;
}) {
  return (
    <InputFieldLayout $gridArea={$gridArea}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputBox id={id} type={type} />
    </InputFieldLayout>
  );
}
