import Select from "react-select";
import { AgentsTypes, InputsBoxesTitles } from "./AddListingForm";
import { FormSectionGrid, FormSectionWrapper } from "./FormAddress";

export default function Agent({ agents }: { agents: AgentsTypes[] }) {
  const agentsOptions = agents.map((agent) => ({
    value: agent.id,
    label: agent.name + " " + agent.surname,
  }));
  return (
    <FormSectionWrapper>
      <InputsBoxesTitles>აგენტი</InputsBoxesTitles>
      <FormSectionGrid>
        <Select placeholder="აირჩიე" options={agentsOptions} />
      </FormSectionGrid>
    </FormSectionWrapper>
  );
}
