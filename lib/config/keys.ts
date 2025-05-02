import type { ConfigContext } from "@/interfaces"
import type { InjectionKey } from "vue"

export const ConfigInjectionKey = Symbol() as InjectionKey<ConfigContext>
