<template>
  <div>
    <NuxtLoadingIndicator :color="uiPrimary ?? 'indigo'" class="shadow-lg shadow-indigo-500/50" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
const uiPrimary = useStorage('nuxt-ui-primary', 'indigo');


</script>
