<template>
  <div class="video-page">
    <div class="left">
      <ExpandList title="陕西省咸阳市">
        <div class="video-item">
          <div class="icon">&#xe68f;</div>
          <div class="text">工厂1</div>
        </div>
        <div class="video-item">
          <div class="icon">&#xe68f;</div>
          <div class="text">工厂2</div>
        </div>
        <div class="video-item">
          <div class="icon">&#xe68f;</div>
          <div class="text">工厂3</div>
        </div>
      </ExpandList>
    </div>
    <div class="right">
      <div class="content">
        <VideoBox class="video-box"></VideoBox>
        <VideoBox class="video-box"></VideoBox>
        <VideoBox class="video-box"></VideoBox>
        <VideoBox class="video-box"></VideoBox>
      </div>
    </div>
  </div>
</template>

<script>
import ExpandList from '../components/ExpandList'
import VideoBox from '../components/VideoBox'
export default {
  name: 'about',
  components: {
    VideoBox,
    ExpandList
  }
}
</script>

<style lang="less" scoped>
.video-page {
  display: flex;
  height: calc(100% - 60px);
}
.left {
  width: 260px;
  height: 100%;
  background-color: #21212d;
}
.menu-item {
  display: flex;
  height: 60px;
  line-height: 60px;
  color: white;
  cursor: pointer;
  .icon {
    height: 60px;
    width: 60px;
    text-align: center;
  }
}
.active {
  background-color: #6ebbe5;
}
.video-item {
  color: white;
  display: flex;
  display: flex;
  height: 45px;
  line-height: 45px;
  padding-left: 40px;
  cursor: pointer;
  background-color: #21212d;
  .icon {
    width: 45px;
    text-align: center;
  }
}
.content {
  margin: 20px;
  margin-top: 60px;
  padding: 10px;
  background-color: white;
  height: calc(100% - 100px);
}
.right {
  width: calc(100% - 260px);
}
.video-box {
  width: 50%;
  height: 50%;
  float: left;
}
</style>

