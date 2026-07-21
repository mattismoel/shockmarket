import PocketBase from "pocketbase"
import type { Handle } from "@sveltejs/kit";
import { PUBLIC_POCKETBASE_URL } from "$env/static/public"

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pocketbase = new PocketBase(PUBLIC_POCKETBASE_URL)

  event.locals.pocketbase.authStore.loadFromCookie(event.request.headers.get("cookie") || "")

  try {
    event.locals.pocketbase.authStore.isValid && await event.locals.pocketbase.collection("_superUsers").authRefresh()
  } catch (_) {
    event.locals.pocketbase.authStore.clear()
  }

  const response = await resolve(event)

  response.headers.append("set-cookie", event.locals.pocketbase.authStore.exportToCookie())

  return response
}
