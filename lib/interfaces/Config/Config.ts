import type { Ref } from "vue"

export interface Config {
  iconLoading: any
}

export interface ConfigContext {
  config: Ref<Config>
}

export interface ConfigProviderProps {
  config: Config
}
