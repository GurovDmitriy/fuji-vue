<script setup lang="ts">
import anime from "animejs/lib/anime.es.js"
import { onBeforeUnmount, onMounted, ref } from "vue"

const element = ref<Element | null>(null)
let animeInstance: ReturnType<typeof anime> | null | undefined = null

onMounted(() => {
  animate(element)
})

onBeforeUnmount(() => {
  destroy()
})

function animate(el: typeof element) {
  if (el.value) {
    animeInstance = anime({
      targets: el.value,
      rotate: "1turn",
      duration: 2600,
      easing: "linear",
      loop: true,
    })
  }
}

function destroy() {
  if (animeInstance) {
    animeInstance.pause()
    animeInstance = undefined

    element.value = null
  }
}
</script>

<template>
  <div class="f-icon" ref="element">
    <svg
      class="f-icon"
      width="800"
      height="800"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m16 16 3 3m-1-7h4M8 8 5 5m11 3 3-3M8 16l-3 3m-3-7h4m6-10v4m0 12v4"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.f-icon {
  display: block;
  width: 100%;
  height: auto;
}
</style>
