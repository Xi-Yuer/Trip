<script setup>
import { computed, reactive, ref, watch } from 'vue'
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
const searchCityInfo = reactive({
  city: {},
  group: '',
})
// 检索城市
watch(
  () => searchValue.value,
  (newVlue, oldValue) => {
    currentCityGroup.value.cities.map((item, index) => {
      item.cities.map(iten => {
        if (newVlue === iten.cityName) {
          searchCityInfo.city = iten
          searchCityInfo.group = currentCityGroup.value.cities[index].group
        }
      })
    })
  },
  {
    deep: true,
  }
)

// tab切换
const tabActive = ref()
// 当前选项的城市数据
const currentCityGroup = computed(() => allCity.value[tabActive.value])

// 点击取消按钮返回
const cancelClick = () => {
  searchValue.value = ''
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
    autocomplete="off"
  />
  <van-tabs v-model:active="tabActive" color="orange">
    <template v-for="(value, key, index) in allCity" :key="key">
      <van-tab :title="value.title" :name="key">
        <div class="content">
          <!-- 热门城市 -->
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
            <!-- 默认全部城市数据 -->
            <template
              v-for="(iten, indey) in currentCityGroup.cities"
              :key="indey"
              v-if="!searchValue"
            >
              <van-index-anchor :index="iten.group" />
              <template v-for="(city, indev) in iten.cities" :key="indev">
                <van-cell :title="city.cityName" @click="cityClick(city)" />
              </template>
            </template>
            <!-- 搜索匹配结果 -->
            <template v-if="searchValue">
              <van-index-anchor :index="searchCityInfo.group" />
              <van-cell
                :title="searchCityInfo.city.cityName"
                @click="cityClick(searchCityInfo.city)"
              />
            </template>
            <!-- 无搜索结果 -->
            <template v-if="!searchCityInfo.group">
              <van-empty image-size="80" description="暂无匹配结果" />
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
