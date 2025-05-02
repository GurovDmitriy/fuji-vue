import { ConfigInjectionKey } from "@/config/keys.ts"
import { inject } from "vue"

export function useConfigContext() {
  return inject(ConfigInjectionKey)
}
