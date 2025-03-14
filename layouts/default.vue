<template>
  <div>
    <div v-if="load" class="z-50 w-screen h-screen absolute backdrop-blur-sm">
      <MyLoading class="absolute left-1/2 top-1/2" />
    </div>

    <div class="flex flex-col gap-3" :class="{ 'hidden': load }">
      <div v-if="!online" class="flex justify-center items-center gap-2 bg-red-500 fixed bottom-0 w-full z-50">
        <Icon name="fluent:wifi-off-20-regular" class="bg-white" size="18" />
        <span class="text-white">شما آنلاین نیستید</span>
      </div>
      <Header />
      <div>
        <slot />
      </div>
      <Footer />
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useOnline } from '@vueuse/core'

const online = useOnline()

const load = ref(true)
tryOnMounted(() => {
  load.value = false

})
</script>

<style></style>