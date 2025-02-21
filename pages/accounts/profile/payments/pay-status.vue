<template>
    <div>
        <div v-if="query" class="mt-10">
            <UContainer>
                <UAlert variant="soft" :title="query?.status === 'OK' ? 'پرداخت موفق' : 'پرداخت ناموفق'"
                    :description="query?.status === 'OK' ? 'پرداخت با موفقیت انجام شده است.' : 'مشکلی  در پرداخت به وجود آمده، اگر هزینه کسر شده، بعد از 48 ساعت به حسابتان برگشت داده خواهد شد.'"
                    :color="query?.status === 'OK' ? 'green' : 'red'"
                    :actions="[{ label: 'بازگشت به خانه', variant: 'solid', to: '/' }, { label: 'بازگشت به پروفایل', variant: 'outline', to: { name: 'profile' } }]"
                    :icon="query?.status === 'OK' ? 'fluent:checkmark-circle-16-regular' : 'fluent:dismiss-circle-16-regular'" />
            </UContainer>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useIntervalFn, useTimeAgo } from '@vueuse/core'
definePageMeta({
    name: "pay-status",
    middleware: "auth"
})

const route = useRoute()
const query = route.query


</script>

<style></style>