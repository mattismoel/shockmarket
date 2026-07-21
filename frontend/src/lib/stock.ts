import z from "zod"
import { calculateAverage } from "./math";
import { idSchema } from "./base";
import { createFileUrl, pbBaseFieldsSchema, pbIdSchema } from "./pocketbase";

const RATINGS: string[] = ["Extremely Unethical", "Very Unethical", "Poor", "Neutral", "Good", "Very Ethical", "Extremely Ethical"]

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

export const calculateEthicsRating = ({ impacts }: Stock) => {
  const impactRatings = impacts.map(impact => calculateImpactRating(impact))

  let impactSum = 0.0

  impactRatings.forEach(rating => impactSum += rating)

  return impactSum / impacts.length
}



export const calculateImpactRating = (impact: Impact) => {
  const activeCount = (impact.climateRating ? 1 : 0) + (impact.healthRating ? 1 : 0) + (impact.rightsRating ? 1 : 0)

  if (activeCount === 0) return 0.0

  return calculateAverage(impact.climateRating ?? 0, impact.healthRating ?? 0, impact.rightsRating ?? 0)

}

export const getImpactRatings = ({ impacts }: Stock) => {
  return {
    climate: calculateAverage(...impacts.map(impact => impact.climateRating ?? 0)),
    health: calculateAverage(...impacts.map(impact => impact.healthRating ?? 0)),
    rights: calculateAverage(...impacts.map(impact => impact.rightsRating ?? 0)),
  }
}

export const getEthicsText = (rating: number) => {
  const normalisedRating = normaliseRating(rating)
  return RATINGS[Math.floor(normalisedRating * RATINGS.length)]
}

/**
 * @description Returns the normalised ethics rating, i.e. converting it from the interval [-1.0, 1.0] to [0.0, 1.0]
 */
export const normaliseRating = (rating: number) => {
  return (rating * 0.5) + 0.5
}
