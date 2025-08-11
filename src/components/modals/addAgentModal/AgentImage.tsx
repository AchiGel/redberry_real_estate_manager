import { useState } from "react";
import {
  AgentInputFieldLayout,
  AgentInputLabel,
  AgentImageUploadLabel,
  AgentPreviewImageBox,
  AgentRemoveImgPreview,
  AgentImageUloadImput,
  ErrorText,
} from "./addAgentModalStyled.ts";

interface RegisterReturn {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  ref: React.Ref<HTMLInputElement>;
}

interface AgentImageProps {
  error?: string | null;
  register: RegisterReturn;
}

export default function AgentImage({ error, register }: AgentImageProps) {
  const [imagePrev, setImagePrev] = useState<File | null>(null);

  const removePreview = () => {
    setImagePrev(null);
  };

  const avatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImagePrev(e.target.files[0]);
  };

  return (
    <AgentInputFieldLayout>
      <AgentInputLabel htmlFor="photo">ატვირთეთ ფოტო *</AgentInputLabel>
      <AgentImageUploadLabel htmlFor="photo">
        {imagePrev && (
          <AgentPreviewImageBox>
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
            <AgentRemoveImgPreview onClick={removePreview} />
          </AgentPreviewImageBox>
        )}
      </AgentImageUploadLabel>
      <AgentImageUloadImput
        type="file"
        id="photo"
        accept="image/*"
        {...register}
        onChange={(e) => {
          register.onChange(e);
          avatarChange(e);
        }}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </AgentInputFieldLayout>
  );
}
