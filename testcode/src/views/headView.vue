<template>
    <div class="wrapper">
      <h1>EASYBUILD</h1>
      <div class="btn-box">
        <button class="btn">预览</button>
        <button class="btn">保存</button>
        <button class="btn">发布</button>
      </div>
    </div>
  </template>
  
  <script>
  // Your JavaScript code goes here (if needed)
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
  