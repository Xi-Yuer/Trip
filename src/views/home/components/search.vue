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

const PriceFilter = ref(0)
const PeopleCount = ref(-1)
const StayTimeCount = ref(0)
const Price = [
  { text: '所有价格', value: 0 },
  { text: '150以下', value: 1 },
  { text: '150-300', value: 2 },
  { text: '300-500', value: 3 },
  { text: '500以上', value: 4 },
]
const People = [
  { text: '人数不限', value: -1 },
  { text: '1人', value: 0 },
  { text: '2人', value: 1 },
  { text: '3人及以上', value: 2 },
]

const Stay = [
  {
    text: '长期租赁',
    value: 0,
  },
  {
    text: '1天以内',
    value: 1,
  },
  {
    text: '2天以内',
    value: 3,
  },
  {
    text: '3天及以上',
    value: 4,
  },
]

// 日期
const nowDate = new Date() // 今天
const tomorrowDate = nowDate.setDate(nowDate.getDate() + 1) // 明天

const startDate = ref(formartMonthDay(new Date())) // 格式化后的开始日期
const leaveDate = ref(formartMonthDay(tomorrowDate)) // 格式化后的结束日期

const stayTime = ref(1) // 停留几天（默认为一天）

const show = ref(false)
// 日期文案个性化定制
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
const start = ref()
const end = ref()
const onConfirm = date => {
  const [startTime, endTime] = date
  start.value = startTime
  end.value = endTime
  stayTime.value = getDiffDate(startTime, endTime) // 计算停留时间 单位/天
  show.value = false
}

// 城市页面跳转
const cityCilck = () => {
  router.push('/city')
}
// 搜索页面跳转
const routerToSearchPage = () => {
  router.push({
    name: 'searchPage',
    params: {
      PriceFilter: PriceFilter.value,
      PeopleCount: PeopleCount.value,
      stayTime: stayTime.value,
      start: start.value,
      end: end.value,
      currentCity: currentCity.value.cityName,
    },
  })
}
</script>

<template>
  <!-- 价格/人数选择 -->
  <van-dropdown-menu :overlay="false" active-color="orange">
    <van-dropdown-item v-model="PriceFilter" :options="Price" />
    <van-dropdown-item v-model="PeopleCount" :options="People" />
    <van-dropdown-item v-model="StayTimeCount" :options="Stay" />
  </van-dropdown-menu>
  <!-- 位置信息 -->
  <div class="location section">
    <div class="city" @click="cityCilck">
      <van-icon name="location-o" />{{ currentCity.cityName }}
    </div>
    <div class="position" @click="positionClick">
      <span class="text">
        我的位置
        <van-icon name="guide-o" />
      </span>
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
  <!-- 关键字 -->
  <div class="section keyword bottom-gray-line">热门民宿</div>
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
  <!-- 搜索按钮 -->
  <div class="search-btn" @click="routerToSearchPage">
    <div class="btn">开始搜索</div>
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
:deep(.van-dropdown-menu__bar) {
  box-shadow: none !important;
  justify-content: space-between;
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
    padding: 0 20px;
    margin: 0 auto;
  }
}
</style>
