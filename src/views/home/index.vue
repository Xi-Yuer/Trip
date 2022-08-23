<script setup>
import { ref, watch } from 'vue'

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
  <van-nav-bar title="泓源旅途" />
  <div class="banner">
    <img src="@/assets/img/home/banner.webp" alt="" />
  </div>
  <Search />
  <Categories />
  <HotList />
  <button @click="homeStore.getHotList()">++</button>
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
