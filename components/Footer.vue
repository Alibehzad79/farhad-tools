<template>
    <div>
        <UContainer class="my-10 ">
            <UDivider>
                <div class="grid grid-cols-4 gap-10 mx-5 justify-items-center">
                    <NuxtLink to="#">
                        <Icon name="bxl:instagram" size="30" />
                    </NuxtLink>
                    <NuxtLink to="#">
                        <Icon name="bxl:telegram" size="30" />
                    </NuxtLink>
                    <NuxtLink to="#">
                        <Icon name="bxl:facebook" size="30" />
                    </NuxtLink>
                    <NuxtLink to="#">
                        <Icon name="bxl:whatsapp" size="30" />
                    </NuxtLink>
                </div>
            </UDivider>
            <div class="flex flex-col lg:flex-row items-center justify-between gap-10 text-center mt-10">
                <div class="flex flex-col gap-5 w-full lg:w-1/2">
                    <h2 class="text-2xl font-bold">فرهاد ابزار</h2>
                    <p class="text-gray-500">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
                    </p>
                    <UButton label="09111111111" icon="fluent:call-16-regular" variant="ghost" class="justify-center" />
                    <UButton label="09111111111" icon="fluent:call-16-regular" variant="ghost" class="justify-center" />
                    <UButton label="test@mail.com" icon="fluent:mail-16-regular" variant="ghost"
                        class="justify-center" />
                    <UButton label="test@mail.com" icon="fluent:mail-16-regular" variant="ghost"
                        class="justify-center" />
                </div>
                <div class="flex flex-col gap-5 w-full lg:w-1/2">
                    <h6 class="text-2xl font-bold">لینک های داخلی</h6>
                    <UVerticalNavigation :links="links" :ui="{ base: 'justify-center' }" />
                </div>
            </div>
        </UContainer>
    </div>
</template>

<script lang="ts" setup>

const links = [{
    label: 'خانه',
    icon: 'fluent:home-16-regular',
    to: '/',
    labelClass: "text-lg",
}, {
    label: 'فروشگاه',
    icon: 'fluent:building-shop-16-regular',
    to: { name: 'products' },
    labelClass: "text-lg",
}, {
    label: 'درباره ما',
    icon: 'fluent:people-team-16-regular',
    to: { name: 'about' },
    labelClass: "text-lg",
},
{
    label: 'تماس با ما',
    icon: 'fluent:call-16-regular',
    to: { name: 'contact' },
    labelClass: "text-lg",
}]

</script>

<style></style>