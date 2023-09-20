<template>
    <div class="wrapper">
      <h1>EASYBUILD</h1>
      <div class="btn-box">
        <button class="btn" @click="previewApplication">预览</button>
        <button class="btn" @click="saveLayout">保存</button>
        <button class="btn" @click="releaseApplication">发布</button>
      </div>
    </div>
  </template>
  
  <script>
    import exportSchema from '@/utils/layoutParser'
    import * as api from '@/services/apiService'
    export default {
      methods: {
        /**
         * 导出并保存当前布局至远程服务器
         */
        saveLayout () {
          console.log(exportSchema())
          api.saveLayout(exportSchema())
        },
        /**
         * 导出并发布当前应用
         */
        releaseApplication () {
          api.releaseApplication(exportSchema())
        },
        /**
         * 预览当前应用
         */
        previewApplication () {

        }
      }
    }
  </script>
  
  <style scoped lang="less">
  /* Your CSS code goes here */
  .wrapper {
    background: black;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 0 15px;
  }
  
  .btn-box {
    display: flex;
    width: 200px;
    justify-content: space-around;
  }
  
  .btn {
    background: white;
    color: #333;
    font-size: 13px;
    padding: 2px 10px;
    border-radius: 4px;
    transition: background-color 0.2s; /* 添加过渡效果，使颜色变化平滑 */
  }
  
  /* 添加 :active 伪类样式 */
  .btn:hover {
    background: #5794f5;
    color: white;
  }
  </style>
  