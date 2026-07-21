import z from "zod";

export const idSchema = z.string().nonempty()
export type ID = z.infer<typeof idSchema>
