<template>
  <div>
    <UContainer>
      <div class="mt-5 hidden lg:flex flex-row items-center justify-between">
        <div>
          <h1 class="text-3xl">فرهاد ابزار</h1>
        </div>
        <div>
          <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
        </div>
        <div class="flex items-center gap-3">
          <NuxtLink to="/accounts/login">
            <UButton label="ورود" size="xl" icon="fluent:key-16-regular" />
          </NuxtLink>
          <NuxtLink to="/accounts/login">
            <UButton label="ثبت نام" variant="soft" size="xl" icon="fluent:person-add-16-regular" />
          </NuxtLink>
          <UButton
            :icon="colorMode.value === 'dark' ? 'fluent:weather-sunny-16-regular' : 'fluent:weather-moon-16-regular'"
            variant="ghost" @click="changeColorMode" />
        </div>
      </div>
      <div class="lg:hidden mt-5 flex justify-between">
        <div>
          <h1 class="text-3xl">فرهاد ابزار</h1>
        </div>
        <div class="flex items-center gap-3">
          <UButton icon="fluent:line-horizontal-3-16-regular" @click="isOpen = !isOpen" />
          <UButton
            :icon="colorMode.value === 'dark' ? 'fluent:weather-sunny-16-regular' : 'fluent:weather-moon-16-regular'"
            variant="ghost" @click="changeColorMode" />
        </div>
        <USlideover v-model="isOpen" dir="rtl" title="منو">
          <div class="p-4 flex-1">
            <UCard class="flex flex-col flex-1 h-full"
              :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
              <template #header>
                <div class="flex items-center justify-between">
                  <h6 class="text-xl">منو</h6>
                  <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-x-mark-20-solid" square padded
                    @click="isOpen = false" />
                </div>
              </template>

              <div>
                <UVerticalNavigation :links="links" />
              </div>

              <template #footer>
                <div class="flex items-center justify-between">
                  <NuxtLink to="/accounts/login">
                    <UButton label="ورود" size="xl" icon="fluent:key-16-regular" />
                  </NuxtLink>
                  <NuxtLink to="/accounts/login">
                    <UButton label="ثبت نام" variant="soft" size="xl" icon="fluent:person-add-16-regular" />
                  </NuxtLink>
                </div>
              </template>
            </UCard>
          </div>
        </USlideover>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
const links = [{
  label: 'خانه',
  icon: 'fluent:home-16-regular',
  to: '/',
  labelClass: "text-lg"
}, {
  label: 'فروشگاه',
  icon: 'fluent:building-shop-16-regular',
  to: '/products',
  labelClass: "text-lg"
}, {
  label: 'درباره ما',
  icon: 'fluent:people-team-16-regular',
  to: '/about',
  labelClass: "text-lg"
},
{
  label: 'تماس با ما',
  icon: 'fluent:call-16-regular',
  to: '/contact',
  labelClass: "text-lg"
}]


const colorMode = useColorMode()
const changeColorMode = () => colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'

const isOpen = ref(false)

</script>

<style></style>