<script setup>
const props = defineProps({
  titleText: {
    type: String,
    default: '',
  },
  footerText: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="section">
    <div class="header">
      <h2 class="title">{{ titleText }}</h2>
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="footer" v-if="props.footerText">
      <span>{{ footerText }}<van-icon name="arrow" /></span>
    </div>
  </div>
</template>

<style scoped lang="less">
.section {
  padding: 0 15px;
  margin-top: 12px;
  border-top: 5px solid #f2f3f4;
  background-color: #fff;

  .header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eee;

    .title {
      font-size: 20px;
      color: #333;
    }
  }

  .content {
    padding: 8px 0;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 44px;
    line-height: 44px;
    color: #ff9645;
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
