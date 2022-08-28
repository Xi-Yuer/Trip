<script setup>
const props = defineProps({
  house: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <div class="infos">
    <div class="name">{{ house.houseName }}</div>
    <div class="tags" v-if="house.houseTags">
      <template v-for="(tag, index) in house.houseTags" :key="tag.tagCode">
        <span
          class="item"
          :style="{
            color: tag.tagText?.color,
            background: tag.tagText?.background.color,
          }"
        >
          {{ tag.tagText?.text }}
        </span>
      </template>
    </div>
    <div class="comment extra">
      <div class="left">
        <span class="score">{{ house.commentBrief?.overall }}</span>
        <span class="title">{{ house.commentBrief?.scoreTitle }}</span>
        <span class="brief">{{ house.commentBrief?.brief }}</span>
      </div>
      <div class="right">
        <span class="count">
          {{ house.commentBrief?.totalCount }}条评论
          <van-icon name="comment-o" />
        </span>
      </div>
    </div>
    <div class="location extra">
      <div class="left address">{{ house.nearByPosition?.address }}</div>
      <div class="right">地图周边<van-icon name="location-o" /></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.infos {
  padding: 16px;
  background-color: #fff;

  .name {
    font-weight: 700;
    font-size: 20px;
    color: #333;
    text-align: justify;
    line-height: 24px;
    overflow: hidden;
    margin-bottom: 6px;
  }

  .tags {
    margin: 10px 0;

    .item {
      font-size: 12px;
      margin: 0 2px;
      padding: 1px 3px;
    }
  }

  .extra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    margin: 12px 0;
    border-radius: 5px;
    font-size: 12px;
    background-color: #f5f7fa;

    .right {
      color: #ff9645;
    }
  }

  .comment {
    .score {
      font-size: 18px;
      font-weight: 700;
      color: #333;
    }

    .title {
      color: #333;
      font-weight: 700;
      margin: 0 3px;
    }

    .brief {
      color: #666;
    }
  }

  .location {
    .address {
      font-size: 14px;
      font-weight: 700;
      color: #333;
    }
  }
}
</style>
