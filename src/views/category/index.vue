<script setup>

import GoodsItem from '@/views/home/components/GoodsItem.vue'
import { useBanner } from './composables/useBanner'
import { useCategory } from './composables/useCategory'

// 获取面包屑导航数据
const { data } = useCategory()

// 获取banner数据
const { datas } = useBanner()

</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ data.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="home-banner">
      <el-carousel height="500px">
        <el-carousel-item v-for="item in datas" :key="item.id">
          <img :src=item.imgUrl alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 列表渲染 -->
    <div class="sub-list">
      <h3>全部分类</h3>
      <ul>
        <li v-for="i in data.children" :key="i.id">
          <RouterLink :to="`sub/${i.id}`">
            <img :src="i.picture" />
            <p>{{ i.name }}</p>
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="ref-goods" v-for="item in data.children" :key="item.id">
      <div class="head">
        <h3>- {{ item.name }}-</h3>
      </div>
      <div class="body">
        <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
// 轮播图样式
.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 500px;
  }
}

//
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>
