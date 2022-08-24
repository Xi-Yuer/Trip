<script setup>
defineProps({
  house: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <div class="item">
    <img :src="house.image.url" />
    <div class="describe">
      <div class="location">
        <span>
          <van-icon name="location-o" />
          {{ house.location }}
        </span>
      </div>
      <div class="houseName">
        <span>{{ house.houseName }}</span>
      </div>
      <div class="summaryText">
        <span>{{ house.summaryText }}</span>
      </div>
      <div class="price">
        <span class="finalPrice">￥{{ house.finalPrice }}</span>
        <span class="productPrice">￥{{ house.productPrice }}</span>
        <span class="priceTipBadge">{{ house.priceTipBadge.text }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.item {
  overflow: hidden;
  box-shadow: 0 0 10px 1px rgb(238, 238, 238);
  border-radius: 5px;
  height: 250px;
  img {
    width: 200px;
    height: 130px;
  }
  .describe {
    padding: 10px;
    .location {
      color: #999999;
      font-size: 13px;
    }
    .houseName {
      margin: 5px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .summaryText {
      color: #999999;
      font-size: 13px;
    }
    .price {
      display: flex;
      margin-top: 5px;
      align-items: flex-start;
      .finalPrice {
        color: #fa705e;
      }
      .productPrice {
        font-size: 12px;
        text-decoration: line-through;
        color: #999999;
        margin: 0 8px 0 0;
      }
      .priceTipBadge {
        background-color: #e98f84;
        font-size: 12px;
        padding: 2px 8px;
        text-align: center;
        border-radius: 10px;
        color: white;
      }
    }
  }
}
</style>
