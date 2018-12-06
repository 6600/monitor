<template>
  <div class="main-page">
    <div class="left">
      <div class="title">某某某安防管理系统</div>
      <div class="menu-box">
        <div class="menu-item">
          <div class="icon">&#xe601;</div>
          <div class="text">视频显示</div>
        </div>
        <div class="menu-item">
          <div class="icon">&#xe600;</div>
          <div class="text">用户管理</div>
        </div>
        <div class="menu-item">
          <div class="icon">&#xe67c;</div>
          <div class="text">用户信息</div>
        </div>
        <div class="menu-item">
          <div class="icon">&#xe79e;</div>
          <div class="text">设备管理</div>
        </div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<style lang="less">
.main-page {
  display: flex;
  width: 100%;
  height: 100%;
}
.left {
  width: 285px;
  background-color: #21212d;
}
.title {
  height: 60px;
  line-height: 60px;
  color: #4a9ffa;
  font-size: 20px;
  background-color: #353746;
}
.menu-item {
  height: 60px;
  line-height: 60px;
  width: 100%;
  color: white;
  display: flex;
  .icon {
    width: 60px;
    text-align: center;
    font-size: 1.4rem;
  }
}
</style>
