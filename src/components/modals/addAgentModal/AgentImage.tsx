import { useState } from "react";
import {
  AgentInputFieldLayout,
  AgentInputLabel,
  AgentImageUploadLabel,
  AgentPreviewImageBox,
  AgentRemoveImgPreview,
  AgentImageUloadImput,
  ErrorText,
} from "./addAgentModal";
import { AgentFormTypes } from "./AddAgentModal.tsx";

type AgentImageProps = {
  error: string | undefined;
  setAgentForm: React.Dispatch<React.SetStateAction<AgentFormTypes>>;
  agentForm: AgentFormTypes;
};

export default function AgentImage({
  error,
  setAgentForm,
  agentForm,
}: AgentImageProps) {
  const [imagePrev, setImagePrev] = useState<null | File>(null);

  const removePreview = () => {
    setImagePrev(null);
  };

  const avatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImagePrev(e.target.files[0]);
    setAgentForm({
      ...agentForm,
      avatar: e.target.files?.[0] || null,
    });
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
        onChange={avatarChange}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </AgentInputFieldLayout>
  );
}
