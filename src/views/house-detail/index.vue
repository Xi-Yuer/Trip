<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getHouseDetail } from '@/service/modules/house.js'

import Swipe from './components/swipe.vue'

const route = useRoute()
const router = useRouter()

// 房屋id
const routeParamsHouseId = route.params.id || 51953704

const { mainPart, currentHouse } = await getHouseDetail(routeParamsHouseId)

// 返回
const onClickLeft = () => {
  router.back()
}
</script>

<template>
  <van-nav-bar
    title="房屋详情"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <Swipe :swipe="mainPart?.topModule?.housePicture?.housePics" />
</template>

<style scoped lang="less"></style>
