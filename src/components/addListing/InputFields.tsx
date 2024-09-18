import styled from "styled-components";

const InputFieldLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
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
}: {
  type: string;
  label: string;
  id: string;
}) {
  return (
    <InputFieldLayout>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputBox id={id} type={type} />
    </InputFieldLayout>
  );
}
