<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import GoodsItem from '../home/components/GoodsItem.vue'

// 获取面包屑数据
const route = useRoute()
const datas = ref([])
const getDatas = async () => {
  datas.value = await getCategoryFilterAPI(route.params.id).then(ans => ans.result)
}
onMounted(() => getDatas())

// 获取goods数据
const list = ref([])
const listData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getList = async () => {
  list.value = await getSubCategoryAPI(listData.value).then(ans => ans.result.items)
}
onMounted(() => getList())

// 切换筛选
const tabChange = () => {
  listData.page = 1
  getList()
}

// 无限加载
const disabled = ref(false)
const load = async () => {
  listData.value.page++
  const newList = await getSubCategoryAPI(listData.value).then(ans => ans.result.items)
  list.value = [...list.value, ...newList]
  if (newList.length === 0) disabled = true
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${datas.parentId}` }">{{ datas.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ datas.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="listData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem v-for="goods in list" :key="goods.id" :goods="goods"></GoodsItem>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
