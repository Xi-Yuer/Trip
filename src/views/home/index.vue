<script setup>
import Search from './components/search.vue'
import Categories from './components/categories.vue'
import HotList from './components/hot-list.vue'

import { useHomeStore } from '@/stores/modules/home'
const homeStore = useHomeStore()

// 首页数据初始化
homeStore.getHotCity()
homeStore.getCategories()
homeStore.getHotList()
</script>

<template>
  <div class="main">
    <van-nav-bar title="泓源旅途" />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <Search />
    <Categories />
    <HotList />
  </div>
</template>

<style scoped lang="less">
.main {
  overflow-y: auto;
}
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
