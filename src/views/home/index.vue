<script setup>
import { ref } from 'vue'

import Search from './components/search.vue'


import { useHomeStore } from '@/stores/modules/home'
const homeStore = useHomeStore()

// 请求热门城市数据
homeStore.getHotCity()
homeStore.getCategories()
</script>

<template>
  <van-nav-bar title="泓源旅途" />
  <div class="banner">
    <img src="@/assets/img/home/banner.webp" alt="" />
  </div>
  <Search  />
</template>

<style scoped lang="less">
:deep(.van-nav-bar__title) {
  color: var(--primary-color);
  font-weight: 700;
}
.banner {
  img {
    width: 100%;
  }
}
</style>
