import z from "zod";

export const schema = z.object({
  address: z.string().min(2, "მინიმუმ 2 სიმბოლო"),
  image: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "ფაილი სავალდებულოა")
    .refine((files) => files[0].size <= 1024 * 1024, "არ უნდა აღემატებოდეს 1MB")
    .transform((files) => files[0]), // convert to File
  region_id: z.string().min(1, "სავალდებულო").transform(Number),
  city_id: z.string().min(1, "სავალდებულო").transform(Number),
  zip_code: z.string(), // stays string
  price: z.string().regex(/^\d+$/, "რიცხობრივი").transform(Number),
  area: z.string().regex(/^\d+$/, "რიცხობრივი").transform(Number),
  bedrooms: z.string().regex(/^\d+$/, "რიცხობრივი").transform(Number),
  description: z.string().refine((val) => val.trim().split(" ").length >= 5, {
    message: "მინიმუმ 5 სიტყვა",
  }),
  is_rental: z.enum(["1", "0"]).transform((val) => Number(val)),
  agent_id: z.number().min(1, "სავალდებულო"),
});

export type FormData = z.infer<typeof schema>;
