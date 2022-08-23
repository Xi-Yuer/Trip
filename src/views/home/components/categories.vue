<script setup>
import { useHomeStore } from '@/stores/modules/home.js'
import { storeToRefs } from 'pinia'

const { categories } = storeToRefs(useHomeStore())
</script>

<template>
  <div class="categries">
    <template v-for="(item, index) in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="" />
        <div class="text">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.categries {
  display: flex;
  overflow-x: auto;
  text-align: center;
  padding: 15px 0;
  &::-webkit-scrollbar{
      display: none;
  }
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70px;
    flex-shrink: 0;
    img {
      width: 32px;
      height: 32px;
    }
    .text {
      font-size: 12px;
      margin-top: 8px;
    }
  }
}
</style>
