<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useCityStore } from '@/stores/modules/city'

const router = useRouter()

const cityStore = useCityStore()
await cityStore.getCity()
const { allCity } = storeToRefs(cityStore)

// 索引栏
const indexList = computed(() => {
  const list = currentCityGroup.value.cities.map(item => item.group)
  list.unshift('#')
  return list
})

// 搜索
const searchValue = ref('')
// tab切换
const tabActive = ref()
// 当前选项的城市数据
const currentCityGroup = computed(() => allCity.value[tabActive.value])

// 点击取消按钮返回
const cancelClick = () => {
  router.back()
}

// 城市点击
const cityClick = city => {
  cityStore.currentCity = city
  router.back()
}
</script>

<template>
  <!-- 搜索框 -->
  <van-search
    v-model="searchValue"
    placeholder="城市/区域/位置"
    shape="round"
    show-action
    :clearable="false"
    @cancel="cancelClick"
  />
  <van-tabs v-model:active="tabActive" color="orange">
    <template v-for="(value, key, index) in allCity" :key="key">
      <van-tab :title="value.title" :name="key">
        <div class="content">
          <van-index-bar :index-list="indexList">
            <van-index-anchor index="热门"> </van-index-anchor>
            <div class="hotcity">
              <template
                v-for="hotCity in currentCityGroup.hotCities"
                :key="hotCity.cityName"
              >
                <span @click="cityClick(hotCity)">{{ hotCity.cityName }}</span>
              </template>
            </div>
            <template v-for="(iten, indey) in currentCityGroup.cities">
              <van-index-anchor :index="iten.group" />
              <template v-for="(city, indev) in iten.cities" :key="indev">
                <van-cell :title="city.cityName" @click="cityClick(city)" />
              </template>
            </template>
          </van-index-bar>
        </div>
      </van-tab>
    </template>
  </van-tabs>
</template>

<style scoped lang="less">
.content {
  height: calc(100vh - 98px);
  overflow-y: auto;
}
.hotcity {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  padding-right: 25px;
  justify-content: space-around;
  span {
    width: 70px;
    height: 28px;
    font-size: 12px;
    text-align: center;
    color: #000;
    background-color: #fff4ec;
    line-height: 28px;
    border-radius: 15px;
    margin: 6px 0;
  }
}
</style>
