import Select from "react-select";
import { InputsBoxesTitles } from "./AddListingForm";
import { FormSectionGrid, FormSectionWrapper } from "./FormAddress";
import { AgentTypes, FormDataTypes } from "../../generalTypes.interface";

export default function Agent({
  agents,
  formData,
  setFormData,
}: {
  agents: AgentTypes[];
  formData: FormDataTypes;
  setFormData: React.Dispatch<React.SetStateAction<FormDataTypes>>;
}) {
  const agentsOptions = agents.map((agent) => ({
    value: agent.id,
    label: agent.name + " " + agent.surname,
  }));
  const handleAgentChange = (
    selectedOption: { value: number; label: string } | null
  ) => {
    if (selectedOption) {
      setFormData((prevState) => ({
        ...prevState,
        agent_id: selectedOption.value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        agent_id: null,
      }));
    }
  };
  return (
    <FormSectionWrapper>
      <InputsBoxesTitles>აგენტი</InputsBoxesTitles>
      <FormSectionGrid>
        <Select
          placeholder="აირჩიე"
          options={agentsOptions}
          value={agentsOptions.find(
            (option) => option.value === formData.agent_id
          )}
          onChange={handleAgentChange}
        />
      </FormSectionGrid>
    </FormSectionWrapper>
  );
}
