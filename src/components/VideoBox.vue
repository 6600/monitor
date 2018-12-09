<template>
  <div class="video" :class="{'is-enlarge': isEnlarge}">
    <div class="title" v-show="title">
      <div class="text">{{title}}</div>
      <div class="tool">
        <div class="icon enlarge" @click="isEnlarge = !isEnlarge">&#xe963;</div>
        <div class="icon delete" @click='$emit("delete")'>&#xe647;</div>
      </div>
    </div>
    <div class="screen"></div>
    <div class="control" v-show="title">
      <div class="up icon">&#xe684;</div>
      <div class="down icon">&#xe629;</div>
      <div class="left icon">&#xe62f;</div>
      <div class="right icon">&#xe62e;</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'about',
  data () {
    return {
      isEnlarge: false
    }
  },
  props: {
    title: String
  }
}
</script>

<style lang="less" scoped>
.screen {
  margin: 5px;
  position: relative;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  background-color: #676767;
}
.video {
  position: relative;
}
.title {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  top: 5px;
  padding: 0 5px;
  margin-left: 5px;
  width: calc(100% - 20px);
  height: 25px;
  display: flex;
  color: white;
  line-height: 25px;
  justify-content: space-between;
  .icon {
    height: 25px;
    line-height: 25px;
    text-align: center;
    width: 25px;
    cursor: pointer;
  }
  .tool {
    display: flex;
  }
}
.video.is-enlarge {
  position: fixed;
  width: 100% !important;
  height: 100% !important;
  left: 0;
  top: 0;
  z-index: 999;
  .screen {
    margin: 0;
    width: 100%;
    height: 100%;
  }
}
.control {
  position: absolute;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  bottom: 5px;
  right: 5px;
  font-size: 20px;
  .icon {
    width: 25px;
    text-align: center;
    cursor: pointer;
  }
  .icon:hover {
    background-color: gray;
  }
}
</style>