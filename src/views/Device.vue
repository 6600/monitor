<template>
  <div class="device-page">
    <div class="left">
      <ExpandList title="陕西省咸阳市">
        <div class="expand-item">
          <div class="icon">&#xe646;</div>
          <div class="text">工厂1</div>
        </div>
        <div class="expand-item">
          <div class="icon">&#xe646;</div>
          <div class="text">工厂2</div>
        </div>
        <div class="expand-item">
          <div class="icon">&#xe646;</div>
          <div class="text">工厂3</div>
        </div>
      </ExpandList>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import ExpandList from '../components/ExpandList'
export default {
  name: 'about',
  components: {
    ExpandList
  }
}
</script>

<style lang="less" scoped>
.device-page{
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
  .icon {
    height: 60px;
    width: 60px;
    text-align: center;
  }
}
.active {
  background-color: #6ebbe5;
}
.expand-item {
  color: white;
  background-color: #21212d;
}
.expand-item {
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
    font-size: 27px;
    line-height: 35px;
  }
}
</style>

