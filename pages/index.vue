<template>
  <div>
    <UContainer>
      <div class="mt-10 flex flex-col gap-10">
        <div>
          <UCarousel :items="items" :ui="{ item: 'basis-full h-[15rem] lg:h-[25rem]' }"
            class="rounded-lg overflow-hidden shadow p-4" indicators arrows dir="rtl" ref="carouselRef">
            <template #default="{ item }">
              <div class="justify-between items-center hidden lg:flex gap-10 cursor-pointer"
                @click="navigateTo(item?.url, { external: true })">
                <div class="w-1/2">
                  <img :src="item?.image" :alt="item?.title" :title="item?.title" loading="lazy" class="rounded-xl">
                </div>
                <div class="w-1/2 flex flex-col justify-around gap-5 h-full">
                  <div class="flex flex-col gap-3">
                    <span class="font-bold line-clamp-1 text-lg">{{ item?.title }}</span>
                    <p class="line-clamp-4 text-gray-500">{{ item?.description }}</p>
                  </div>
                  <div>
                    <UButton label="اطلاعات بیشتر" class="justify-center w-full" variant="link" />
                  </div>
                </div>
              </div>
              <div class="lg:hidden" @click="navigateTo(item?.url, { external: true })">
                <img :src="item?.mobileImage" :alt="item?.title" :title="item?.title" loading="lazy" class="rounded-xl">
              </div>
            </template>

          </UCarousel>
        </div>
        <div v-if="categories_tags['categories']"
          class="flex flex-col items-center gap-5 w-full border border-gray-200 dark:border-gray-800 p-5 rounded-xl">
          <h6 class="text-md lg:text-lg font-extrabold">جستوجو بر حسب دسته بندی</h6>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
            <CategoryBox v-for="item in categories_tags['categories']" :key="item.id" :name="item?.name"
              :slug="item?.slug" />
          </div>
        </div>
        <NewProductsCarusel />
        <PopularProductsCarusel />
        <DiscountProductsCarusel />
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
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    url: "https://picsum.photos/1920/1080?random=1",
    image: "https://picsum.photos/1920/1080?random=1",
    mobileImage: "https://picsum.photos/1920/1080?random=5",
  },
  {
    title: "متن شماره 2",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    url: "https://picsum.photos/1920/1080?random=2",
    image: "https://picsum.photos/1920/1080?random=2",
    mobileImage: "https://picsum.photos/1920/1080?random=5",
  },
  {
    title: "متن شماره 3",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    url: "https://picsum.photos/1920/1080?random=3",
    image: "https://picsum.photos/1920/1080?random=3",
    mobileImage: "https://picsum.photos/1920/1080?random=5",
  },
  {
    title: "متن شماره 3",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    url: "https://picsum.photos/1920/1080?random=3",
    image: "https://picsum.photos/1920/1080?random=3",
    mobileImage: "https://picsum.photos/1920/1080?random=5",
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