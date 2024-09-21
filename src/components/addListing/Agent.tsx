import Select from "react-select";
import { InputsBoxesTitles } from "./AddListingForm";
import { FormSectionGrid, FormSectionWrapper } from "./FormAddress";
import {
  AgentTypes,
  FormDataTypes,
  ListingErrorsTypes,
} from "../../generalTypes.interface";
import { ErrorMessage } from "./InputFields";

export default function Agent({
  agents,
  formData,
  setFormData,
  listingErrors,
  setListingErrors,
}: {
  agents: AgentTypes[];
  formData: FormDataTypes;
  setFormData: React.Dispatch<React.SetStateAction<FormDataTypes>>;
  listingErrors: ListingErrorsTypes | { [key: string]: string | undefined };
  setListingErrors: React.Dispatch<
    React.SetStateAction<ListingErrorsTypes | string | undefined>
  >;
}) {
  const agentsOptions = agents.map((agent) => ({
    value: agent.id,
    label: agent.name + " " + agent.surname,
  }));

  const validateAgent = (value: number | null) => {
    if (!value) return false;
    return true;
  };

  const handleAgentChange = (
    selectedOption: { value: number; label: string } | null
  ) => {
    const agentId = selectedOption ? selectedOption.value : null;

    setFormData((prevState) => ({
      ...prevState,
      agent_id: agentId,
    }));

    const error = validateAgent(agentId);
    setListingErrors((prevErrors) => ({
      ...prevErrors,
      agent_id: error,
    }));
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
      {listingErrors.agent_id && <ErrorMessage>სავალდებულო</ErrorMessage>}
    </FormSectionWrapper>
  );
}
