import { getRequestEvent } from "$app/server";
import z from "zod";
import { PUBLIC_POCKETBASE_PUBLIC_URL } from "$env/static/public"

export const pbIdSchema = z.string().nonempty()

export const pbBaseFieldsSchema = z.object({
  id: pbIdSchema,
  created: z.coerce.date(),
  updated: z.coerce.date(),
})

export const getLocalsPocketBase = () => {
  const { locals } = getRequestEvent()
  return locals.pocketbase
}

export const createExpandString = (properties: string[]) => {
  return properties.join(",")
}

export const createFileUrl = (collection: string, id: string, file: string) => {
  return `${PUBLIC_POCKETBASE_PUBLIC_URL}/api/files/${collection}/${id}/${file}`
}
