<script setup>
import { ref } from 'vue'

import TabBarData from '@/assets/data/tabbar.js'
import { getAssetsURL } from '@/utils/getAssets.js'

const currentIndex = ref(0)
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="orange">
      <template v-for="(item, index) in TabBarData" :key="item.text">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetsURL(item.image)" />
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
}
</style>
