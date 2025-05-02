<script setup lang="ts">
import { FWrapperExpand } from "@/components"
import { useConfigContext } from "@/config"
import type { Color, Size } from "@/interfaces"
import { computed, type VNode } from "vue"

const configContext = useConfigContext()!

export type FButtonType = "solid" | "outlined" | "dashed" | "text" | "link"
export type FButtonStatus = "default" | "loading" | "disabled"
export type FButtonIconPosition = "left" | "right" | "top" | "bottom"

export interface FButtonProps {
  type: FButtonType
  size: Size
  color: Color
  status: FButtonStatus
  iconPosition: FButtonIconPosition
  as: any
}

const props = withDefaults(defineProps<Partial<FButtonProps>>(), {
  type: "solid",
  size: "m",
  color: "primary",
  status: "default",
  iconPosition: "left",
  as: "button",
})

const slots = defineSlots<{
  default: () => VNode[]
  iconLoading?: () => VNode[]
  icon?: () => VNode[]
}>()

const meta = computed(() => {
  return {
    classes: Object.entries(props).map(([key, value]) => {
      return `f-button-${key}-${value}`
    }),
    disabled: ["disabled", "loading"].includes(props.status),
    loading: props.status === "loading",
    direction: ["top", "bottom"].includes(props.iconPosition)
      ? ("vertical" as const)
      : ("horizontal" as const),
    animExpand: !slots.icon,
    visibleIcon: props.status !== "loading" && slots.icon,
  }
})

const config = computed(() => {
  return {
    iconLoading: configContext.config.value.iconLoading,
  }
})
</script>

<template>
  <component
    :is="props.as"
    class="f-button f-button-override"
    :class="meta.classes"
    :disabled="meta.disabled"
  >
    <FWrapperExpand :direction="meta.direction" :anim="meta.animExpand">
      <div v-if="meta.visibleIcon">
        <div class="f-button__icon">
          <slot name="icon"></slot>
        </div>
      </div>
      <div v-else-if="meta.loading">
        <div class="f-button__icon">
          <slot name="iconLoading">
            <component :is="config.iconLoading" />
          </slot>
        </div>
      </div>
    </FWrapperExpand>
    <span class="f-button__content">
      <slot name="default"></slot>
    </span>
  </component>
</template>

<style lang="scss">
// **********
// default
// **********

.f-button {
  display: inline-flex;
  align-items: center;

  color: var(--f-default-color-text);

  background: none;
  background-color: transparent;
  border: 1px solid transparent;

  transition:
    opacity var(--f-default-transition),
    border var(--f-default-transition),
    background-color var(--f-default-transition);

  &:hover {
    cursor: var(--f-default-cursor-hover);
    opacity: var(--f-default-opacity-hover);
  }

  &:active {
    opacity: var(--f-default-opacity-active);

    animation: wave-animation 0.6s linear;
  }

  &:disabled {
    cursor: var(--f-default-cursor-disabled);
    opacity: var(--f-default-opacity-disabled);
  }
}

.f-button-status-loading {
  cursor: var(--f-default-cursor-hover);
  opacity: var(--f-default-opacity-loading);

  &:disabled {
    cursor: var(--f-default-cursor-hover);
    opacity: var(--f-default-opacity-loading);
  }
}

.f-button-type-text {
  &:hover {
    background-color: var(--f-color-secondary);
  }
}

// **********
// color
// **********
@each $key, $value in $f-color-text-color {
  .f-button-color-#{$key}.f-button-type-solid {
    color: var(--f-color-#{$key}-text-color);
  }
}

@each $key, $value in $f-color {
  .f-button-color-#{$key}:not(.f-button-type-solid) {
    color: var(--f-color-#{$key});
  }
}

.f-button-color-default:not(.f-button-type-solid) {
  color: var(--f-default-color-text);
}

// **********
// background
// **********
@each $key, $value in $f-color {
  .f-button-color-#{$key}.f-button-type-solid:not(.f-button-type-text):not(
      .f-button-type-link
    ) {
    background-color: var(--f-color-#{$key});
  }
}

// **********
// size
// **********
@each $key, $value in $f-button-size-padding {
  .f-button-size-#{$key} {
    padding: var(--f-button-size-#{$key}-padding);

    border-width: var(--f-button-size-#{$key}-border-width);
    border-radius: var(--f-button-size-#{$key}-radius);
  }
}

// **********
// border
// **********
@each $key, $value in $f-color {
  .f-button-color-#{$key}:not(.f-button-type-text):not(.f-button-type-link) {
    border-color: var(--f-color-#{$key});
  }
}

.f-button-type-dashed {
  border-style: dashed;
}

// **********
// icon
// **********

.f-button__icon {
  width: 1.2em;
  height: auto;
}

.f-button-iconPosition-left {
  flex-direction: row;
}

.f-button-iconPosition-right {
  flex-direction: row-reverse;
}

.f-button-iconPosition-top {
  flex-direction: column;
}

.f-button-iconPosition-bottom {
  flex-direction: column-reverse;
}

@each $key, $value in $f-button-size-icon-space {
  .f-button-size-#{$key} .f-button__icon {
    padding: var(--f-button-size-#{$key}-icon-space);
  }
}

.f-button-iconPosition-left .f-button__icon {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
}

.f-button-iconPosition-right .f-button__icon {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
}

.f-button-iconPosition-top .f-button__icon {
  padding-top: 0;
  padding-right: 0;
  padding-left: 0;
}

.f-button-iconPosition-bottom .f-button__icon {
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 0;
}
</style>
