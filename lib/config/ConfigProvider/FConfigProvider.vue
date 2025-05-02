<script setup lang="ts">
import { ConfigInjectionKey } from "@/config/keys.ts"
import { FIconLoading } from "@/icons"
import type { Config, ConfigContext, ConfigProviderProps } from "@/interfaces"
import { markRaw, provide, ref, watch } from "vue"

const props = defineProps<Partial<ConfigProviderProps>>()

const config = ref({
  iconLoading: markRaw(FIconLoading),
} satisfies Config)

watch(
  () => props.config,
  (newConfig) => {
    config.value = {
      ...config.value,
      ...newConfig,
    }
  },
  { immediate: true },
)

const context = {
  config,
} satisfies ConfigContext

provide(ConfigInjectionKey, context)
</script>

<template>
  <slot></slot>
</template>
