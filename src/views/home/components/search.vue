<script setup>
import { useRouter } from 'vue-router'
import { useCityStore } from '@/stores/modules/city'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { formartMonthDay, getDiffDate } from '@/utils/format-time'
import { useHomeStore } from '@/stores/modules/home'

const router = useRouter()
const homeStore = useHomeStore()
const cityStore = useCityStore()

const { currentCity } = storeToRefs(cityStore)

// 热门城市数据
const { HotCity } = storeToRefs(homeStore)

// 定位相关
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    res => {
      console.log(res)
    },
    err => {
      console.log(err)
    }
  )
}

// 日期
const nowDate = new Date() // 今天
const tomorrowDate = nowDate.setDate(nowDate.getDate() + 1) // 明天

const startDate = ref(formartMonthDay(new Date())) // 格式化后的开始日期
const leaveDate = ref(formartMonthDay(tomorrowDate)) // 格式化后的结束日期

const stayTime = ref(1) // 停留几天（默认为一天）

const show = ref(false)
// 日期文案
const formatter = day => {
  const month = day.date.getMonth() + 1
  const date = day.date.getDate()
  if (day.type === 'start') {
    day.bottomInfo = '入住'
  } else if (day.type === 'end') {
    day.bottomInfo = '离店'
  }

  return day
}

// 确定日期
const onConfirm = date => {
  const [startTime, endTime] = date
  stayTime.value = getDiffDate(startTime, endTime) // 计算停留时间 单位：天
  show.value = false
}

const cityCilck = () => {
  router.push('/city')
}
</script>

<template>
  <!-- 位置信息 -->
  <div class="location">
    <div class="city" @click="cityCilck">
      {{ currentCity.cityName }}
    </div>
    <div class="position" @click="positionClick">
      <span class="text">我的位置</span>
      <img src="@/assets/img/home/icon_location.png" alt="" />
    </div>
  </div>
  <!-- 日期范围 -->
  <div class="data-range section" @click="show = true">
    <div class="start">
      <div class="date">
        <span class="tip">入住</span>
        <span class="time">{{ startDate }}</span>
      </div>
    </div>
    <div class="stay">共{{ stayTime }}天</div>
    <div class="end">
      <div class="date">
        <span class="tip">离店</span>
        <span class="time">{{ leaveDate }}</span>
      </div>
    </div>
  </div>
  <!-- 日历组件 -->
  <van-calendar
    v-model:show="show"
    type="range"
    @confirm="onConfirm"
    :formatter="formatter"
    color="orange"
  />
  <!-- 价格/人数选择 -->
  <div class="section price-counter bottom-gray-line">
    <div class="start">价格不限</div>
    <div class="end">人数不限</div>
  </div>
  <!-- 关键字 -->
  <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

  <!-- 热门建议 -->
  <div class="section hot-suggests">
    <template v-for="(item, index) in HotCity" :key="index">
      <div
        class="item"
        :style="{
          color: item?.tagText?.color,
          background: item?.tagText?.background?.color,
        }"
      >
        {{ item.tagText.text }}
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .city {
    flex: 1;
  }
  .position {
    position: relative;
    width: 74px;
    display: flex;
    align-items: center;
    .text {
      font-size: 12px;
    }
    img {
      position: relative;
      top: -2px;
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}
.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    display: flex;
    height: 44px;
    align-items: center;
  }
  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid var(--line-color);
  }
}

.hot-suggests {
  margin: 10px 0;
  height: auto;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
</style>
