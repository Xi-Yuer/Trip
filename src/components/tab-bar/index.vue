<script setup>
import { ref, watch } from 'vue'

import TabBarData from '@/assets/data/tabbar.js'
import { getAssetsURL } from '@/utils/getAssets.js'
import { useRoute } from 'vue-router'

const route = useRoute()

// 当前路由索引值
const currentIndex = ref(0)

watch(
  () => route,
  newRoute => {
    const index = TabBarData.findIndex(item => item.path === newRoute.path)
    if (index === -1) return // 没有匹配到路由
    currentIndex.value = index
  },
  {
    deep: true,
  }
)
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="orange" route>
      <template v-for="(item, index) in TabBarData" :key="item.text">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img
              v-if="currentIndex !== index"
              :src="getAssetsURL(item.image)"
            />
            <img v-else :src="getAssetsURL(item.imageActive)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<style scoped lang="less">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 5px 0;
  border-top: 1px solid #f3f3f3;
  background-color: #f3f3f3;
  z-index: 1;
}
</style>
