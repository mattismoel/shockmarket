import { query } from "$app/server";
import { createExpandString, getLocalsPocketBase } from "./pocketbase";
import { mapPBStock, type PBStock } from "./stock";

const EXPAND_PROPERTIES = ["impacts"]

export const listStocks = query(async () => {
  const pb = getLocalsPocketBase()

  const records = await pb.collection("stocks").getFullList<PBStock>({
    expand: createExpandString(EXPAND_PROPERTIES)
  })

  return records.map(record => mapPBStock(record))
})
