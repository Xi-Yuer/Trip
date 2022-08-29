<script setup>
import Search from './components/search.vue'
import Categories from './components/categories.vue'
import HotList from './components/hot-list.vue'
import SearchBar from '@/components/seaarch-bar/index.vue'

import { useHomeStore } from '@/stores/modules/home'

import { useScroll } from '@/hooks/useScroll.js'
import { computed, onActivated, watch } from 'vue'
const homeStore = useHomeStore()

// 首页数据初始化
homeStore.getHotCity()
homeStore.getCategories()
homeStore.getHotList()

const { isBottom, scrollTop } = useScroll()

// 加载更多
watch(
  () => isBottom.value,
  async newValue => {
    if (newValue) {
      await homeStore.getHotList()
      isBottom.value = false
    }
  }
)

// 是否显示顶部搜索栏
const isShowSearchBar = computed(() => scrollTop.value >= 350)

// 记录滚动的位置信息
onActivated(() => {
  window.scrollTo({
    top: scrollTop.value,
  })
})
</script>

<script>
export default {
  name: 'home',
}
</script>

<template>
  <div class="main">
    <Transition>
      <SearchBar v-if="isShowSearchBar" />
    </Transition>
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
