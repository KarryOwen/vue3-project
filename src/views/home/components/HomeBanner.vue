<script setup>
import { getBannerAPI } from '@/apis/home'
import { onMounted } from 'vue'
import { ref } from 'vue'
const datas = ref([])
const getDatas = async() => {
  const ans = await getBannerAPI().then((ans) => ans.result)
  // console.log(ans)
  datas.value = ans
}
onMounted(() => {
  getDatas()
})
</script>



<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in datas" :key="item.id">
        <img
          :src=item.imgUrl
          alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
