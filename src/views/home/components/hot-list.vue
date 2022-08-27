<script setup>
import { useHomeStore } from '@/stores/modules/home.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import HotItemV1 from './hot-list-item-v1.vue'
import HotItemV2 from './hot-list-item-v2.vue'

const { hotList } = storeToRefs(useHomeStore())

const router = useRouter()

const redirectHouseDetailPage = data => {
  router.push({
    name: 'HouseDetail',
    params: {
      id: data.houseId,
    },
  })
}
</script>

<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in hotList" :key="item.data.houseId">
        <template v-if="item.discoveryContentType === 9">
          <HotItemV1
            :house="item.data"
            @click="redirectHouseDetailPage(item.data)"
          />
        </template>
        <template v-if="item.discoveryContentType === 3">
          <HotItemV2
            :house="item.data"
            @click="redirectHouseDetailPage(item.data)"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  padding: 0px 8px;
  margin-bottom: 55px;
  .title {
    font-size: 22px;
    padding: 10px;
  }
  .list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 10px;
    grid-column-gap: 10px;
  }
}
</style>
