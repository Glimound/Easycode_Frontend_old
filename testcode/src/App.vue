<template>
  <div id="app">
  <head-view></head-view>
  <div class="content-box">
  <left-view></left-view>
  <center-view></center-view>
  <right-view></right-view>
  </div>
  </div>
  
  </template>
  
  <script>
  import headView from './views/headView.vue'
  import leftView from './views/leftView.vue'
  import centerView from './views/centerView.vue'
  import rightView from './views/rightView.vue'
  
  export default{
  name:'App',
  components:{
    headView,
    leftView,
    centerView,
    rightView
  }
  }
  </script>
  
  <style scoped lang="less">
  .content-box{
    display: flex;
    height: calc(100vh - 80px);

  }
  </style>