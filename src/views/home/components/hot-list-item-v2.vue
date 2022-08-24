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
  </div>
</template>

<style scoped lang="less">
.item {
  overflow: hidden;
  img {
    width: 200px;
    height: 250px;
  }
}
</style>
