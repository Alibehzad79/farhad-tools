<template>
  <div>
    <div v-if="!online" class="flex justify-center items-center gap-2 bg-red-500">
      <Icon name="fluent:wifi-off-20-regular" class="bg-white" size="18" />
      <span class="text-white">شما آنلاین نیستید</span>
    </div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { useOnline } from '@vueuse/core'

const online = useOnline()
</script>

<style></style>