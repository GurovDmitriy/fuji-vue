<template>
  <div class="f-icon">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.f-icon {
  display: block;
  width: 100%;
  height: auto;
}

.f-icon :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}
</style>
