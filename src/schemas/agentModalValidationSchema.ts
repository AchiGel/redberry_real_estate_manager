import { z } from "zod";

export const agentSchema = z.object({
  name: z.string().min(2, "მინიმუმ 2 სიმბოლო").nonempty("სავალდებულო"),
  surname: z.string().min(2, "მინიმუმ 2 სიმბოლო").nonempty("სავალდებულო"),
  email: z
    .string()
    .nonempty("სავალდებულო")
    .email("არასწორი ელ.ფოსტა")
    .refine((val) => val.endsWith("@redberry.ge"), {
      message: "უნდა მთავრდებოდეს @redberry.ge-თ",
    }),
  phone: z
    .string()
    .nonempty("სავალდებულო")
    .regex(/^5\d{8}$/, "უნდა იყოს ფორმატის 5XXXXXXXX"),
  avatar: z.custom<FileList>(
    (val) => val instanceof FileList && val.length > 0,
    {
      message: "სავალდებულო",
    }
  ),
});

export type AgentFormTypes = z.infer<typeof agentSchema>;
