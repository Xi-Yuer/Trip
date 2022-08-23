<script setup>
import { useHomeStore } from '@/stores/modules/home.js'
import { storeToRefs } from 'pinia'

const { hotList } = storeToRefs(useHomeStore())
</script>

<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in hotList" :key="item.data.houseId">
        <h3>{{ item.data.houseName }}</h3>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  padding: 0px 8px;
  .title {
    font-size: 22px;
    padding: 10px;
  }
}
</style>
