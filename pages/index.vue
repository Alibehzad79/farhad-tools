<template>
  <div>
    <UContainer>
      <div class="mt-10 flex flex-col gap-10">
        <div>
          <UCarousel :items="items" :ui="{ item: 'basis-full h-[15rem] lg:h-[25rem]' }"
            class="rounded-lg overflow-hidden" indicators arrows dir="rtl" ref="carouselRef">

            <template #default="{ item }">
              <div class="flex flex-col relative">
                <img :src="item?.image" :alt="item?.title" :title="item?.title" loading="lazy">
                <div class="absolute bg-gray-200 p-5 line-clamp-1 w-full flex justify-between items-center">
                  <span class="font-bold text-xl">{{ item?.title }}</span>
                  <UButton label="خرید" size="xl" :to="item?.url" />
                </div>
              </div>
            </template>

          </UCarousel>
        </div>
        <div v-if="categories_tags"
          class="flex flex-col items-center gap-5 w-full border border-gray-200 dark:border-gray-800 p-5 rounded-xl">
          <h6 class="text-xl font-extrabold">جستوجو بر حسب دسته بندی</h6>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
            <UButton v-for="item in categories_tags['categories']" class="justify-center" :label="item?.name"
              variant="soft" size="xl" :to="{ name: 'search', query: { 'query': item?.slug } }" />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from "~/stores/product"

const productStore = useProductStore()
await productStore.getCategoriesTags()

const { categories_tags } = storeToRefs(productStore)


definePageMeta({
})

useSeoMeta({
  title: "خانه"
})


const items = [
  {
    title: "متن شماره 1",
    url: "https://picsum.photos/1920/1080?random=1",
    image: "https://picsum.photos/1920/1080?random=1"
  },
  {
    title: "title 2",
    url: "https://picsum.photos/1920/1080?random=2",
    image: "https://picsum.photos/1920/1080?random=2"
  },
  {
    title: "title 3",
    url: "https://picsum.photos/1920/1080?random=3",
    image: "https://picsum.photos/1920/1080?random=3"
  },
  {
    title: "title 3",
    url: "https://picsum.photos/1920/1080?random=3",
    image: "https://picsum.photos/1920/1080?random=3"
  },
]


const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 3000)
})






</script>

<style></style>