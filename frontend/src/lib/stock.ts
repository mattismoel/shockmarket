import z from "zod"
import { idSchema } from "./base";
import { createFileUrl, pbBaseFieldsSchema, pbIdSchema } from "./pocketbase";
const impactSchema = z.object({
  id: idSchema,
  text: z.string().nonempty(),
  sources: z.union([z.string().array(), z.null()]),

  climateRating: z.number().optional(),
  healthRating: z.number().optional(),
  rightsRating: z.number().optional(),
})

const pbImpactSchema = z.object({
  ...pbBaseFieldsSchema.shape,

  text: z.string().nonempty(),
  sources: z.union([z.string().array(), z.null()]),

  climateRating: z.number().optional(),
  healthRating: z.number().optional(),
  rightsRating: z.number().optional(),
})

const stockSchema = z.object({
  id: idSchema,
  ticker: z.string().nonempty(),
  companyName: z.string().nonempty(),
  description: z.string().nonempty(),
  outboundHref: z.url(),
  video: z.union([z.url(), z.undefined()]),
  impacts: impactSchema.array().min(1),
  price: z.number().positive(),
  changePct: z.number()
})

const pbStockSchema = z.object({
  ...pbBaseFieldsSchema.shape,
  ticker: z.string().nonempty(),
  companyName: z.string().nonempty(),
  description: z.string().nonempty(),
  outboundHref: z.url(),
  video: z.union([z.string(), z.literal("")]),
  impacts: pbIdSchema.array().nonempty(),
  price: z.number().positive(),
  changePct: z.number(),

  expand: z.object({
    impacts: pbImpactSchema.array().nonempty()
  })
})

export type Impact = z.infer<typeof impactSchema>
export type Stock = z.infer<typeof stockSchema>

export type PBImpact = z.infer<typeof pbImpactSchema>
export type PBStock = z.infer<typeof pbStockSchema>

export const mapPBStock = (record: PBStock): Stock => {
  return stockSchema.parse({
    ...record,
    video: record.video ? createFileUrl("stocks", record.id, record.video) : undefined,
    impacts: record.expand.impacts,
  })
}
