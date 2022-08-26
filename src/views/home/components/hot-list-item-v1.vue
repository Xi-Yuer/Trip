<script setup>
import { computed } from 'vue'
const props = defineProps({
  house: {
    type: Object,
    default: () => ({}),
  },
})
const score = computed(()=> +props.house.commentScore)
</script>

<template>
  <div class="item">
    <img :src="house?.image?.url" />
    <div class="describe">
      <div class="summaryText">
        <span>{{ house?.summaryText }}</span>
      </div>
      <div class="houseName">
        <span>{{ house?.houseName }}</span>
      </div>
      <div class="core-price">
        <span class="core"><van-rate v-model="score" color="orange" size="13px" /></span>
        <span class="price">￥{{ house?.finalPrice }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.item {
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  color: white;
  background-color: white;
  font-size: 15px;
  overflow: hidden;
  img {
    width: 200px;
    height: 250px;
  }
  .describe {
    padding: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    .houseName {
      margin: 5px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .core-price {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
