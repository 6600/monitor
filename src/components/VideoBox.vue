<template>
  <div class="video" :class="{'is-enlarge': isEnlarge}">
    <div class="title">
      <div class="text">{{title}}</div>
      <div class="icon enlarge" @click="isEnlarge = !isEnlarge">&#xe963;</div>
    </div>
    <div class="screen"></div>
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
</style>