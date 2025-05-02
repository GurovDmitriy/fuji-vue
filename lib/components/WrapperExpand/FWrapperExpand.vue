<script setup lang="ts">
import anime from "animejs/lib/anime.es"
import { onBeforeUnmount } from "vue"

interface WrapperExpandProps {
  direction: "horizontal" | "vertical"
  anim: boolean
}

const props = withDefaults(defineProps<Partial<WrapperExpandProps>>(), {
  direction: "horizontal",
  anim: true,
})

let animeInstance: ReturnType<typeof anime> | null | undefined = null

function onLeave(el: Element | null | undefined, done: () => any) {
  if (!props.anim) {
    done()
    return
  }

  destroy()
  animateLeave(el as HTMLElement, done)
}

function onEnter(el: Element | null | undefined, done: () => any) {
  if (!props.anim) {
    done()
    return
  }

  destroy()
  animateEnter(el as HTMLElement, done)
}

onBeforeUnmount(() => {
  destroy()
})

function animateEnter(el: HTMLElement | null | undefined, done: () => any) {
  if (el) {
    animeInstance = anime({
      targets: el,
      width:
        props.direction === "horizontal"
          ? [`0px`, `${el.scrollWidth}px`]
          : undefined,
      height:
        props.direction === "vertical"
          ? [`0px`, `${el.scrollHeight}px`]
          : undefined,
      opacity: [0, 1],
      duration: 200,
      easing: "easeInExpo",
      complete: () => {
        el.style.height = ""
        el.style.width = ""

        done()
      },
    })
  }
}

function animateLeave(el: HTMLElement | null | undefined, done: () => any) {
  if (el) {
    animeInstance = anime({
      targets: el,
      width:
        props.direction === "horizontal"
          ? [`${el.scrollWidth}px`, `0px`]
          : undefined,
      height:
        props.direction === "vertical"
          ? [`${el.scrollHeight}px`, `0px`]
          : undefined,
      opacity: [1, 0],
      duration: 200,
      easing: "easeOutExpo",
      complete: () => {
        el.style.height = ""
        el.style.width = ""

        done()
      },
    })
  }
}

function destroy() {
  if (animeInstance) {
    animeInstance.pause()
    animeInstance = undefined
  }
}
</script>

<template>
  <transition @enter="onEnter" @leave="onLeave" :css="false">
    <slot name="default"></slot>
  </transition>
</template>
