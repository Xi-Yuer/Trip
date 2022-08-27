<script setup>
const props = defineProps({
  swipe: {
    type: Array,
    default: () => [],
  },
})

const swipeGroup = {}

for (const item of props.swipe) {
  swipeGroup[item.enumPictureCategory]
    ? swipeGroup[item.enumPictureCategory].push(item)
    : (swipeGroup[item.enumPictureCategory] = [])
}

const getTitle = str => {
  return str.replace('：', '')
}

// 获取类别索引
const getCategoryIndex = item => swipeGroup[item.enumPictureCategory].findIndex( n => item === n) + 1
</script>

<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <template v-for="swipe in props.swipe" :key="swipe.title">
      <van-swipe-item>
        <img :src="swipe.albumUrl" alt="" />
      </van-swipe-item>
    </template>
    <template #indicator="{ active, total }">
      <div class="custom-indicator">
        <template v-for="(swipeGropItem, key, index) in swipeGroup" :key="key">
         <div class="category-item">
              <span class="item" :class="{ active: swipe[active]?.enumPictureCategory == key }">{{ getTitle(swipeGropItem[0].title) }}</span>
              <span class="count" v-if="swipe[active]?.enumPictureCategory == key">{{getCategoryIndex(swipe[active])}} / {{swipeGropItem.length}}</span>
         </div>
        </template>
      </div>
    </template>
  </van-swipe>
</template>

<style scoped lang="less">
img {
  width: 100%;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 0px;
  font-size: 12px;
  display: flex;
  align-items: center;
  .category-item {
      margin: 0 5px 0 0;
      border: 1px solid white;
      .item {
        color: white;
        background: rgba(0, 0, 0, 0.514);
      }
      .active {
        background-color: white;
        color: black;
      }
  }
}
</style>
