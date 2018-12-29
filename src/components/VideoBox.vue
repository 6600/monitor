<template>
  <div class="video" :class="{'is-enlarge': isEnlarge}">
    <div class="title" v-show="video.title">
      <div class="text">{{video.title}}</div>
      <div class="tool">
        <div class="icon enlarge" @click="isEnlarge = !isEnlarge">&#xe963;</div>
        <div class="icon delete" @click='$emit("delete")'>&#xe647;</div>
      </div>
    </div>
    <div class="screen"></div>
    <div class="control">
      <div class="up icon" @mousedown="upStart" @mouseup="mouseUp">&#xe684;</div>
      <div class="down icon" @mousedown="downStart" @mouseup="mouseUp">&#xe629;</div>
      <div class="left icon" @mousedown="leftStart" @mouseup="mouseUp">&#xe62f;</div>
      <div class="right icon" @mousedown="rightStart" @mouseup="mouseUp">&#xe62e;</div>
    </div>
    <video autoplay="true"></video>
  </div>
</template>

<script>
import { websocket } from '@/Order.js'
export default {
  name: 'about',
  data () {
    return {
      isEnlarge: false
    }
  },
  props: {
    video: null,
    srcObject: null,
    peerID: String
  },
  methods: {
    mouseUp () {
      const peerJson = JSON.stringify({
        type: 120,
        peer_id: parseInt(this.peerID),
        device_id: this.video.peer_con.device_id,
        remote_peer_id: this.video.peerId
      })
      console.log('控制摄像头停止!', peerJson)
      websocket.send(peerJson)
    },
    upStart () {
      const peerJson = JSON.stringify({
        type: 112,
        peer_id: parseInt(this.peerID),
        device_id: this.video.peer_con.device_id,
        remote_peer_id: this.video.peerId
      })
      console.log('控制摄像头向上!', peerJson)
      websocket.send(peerJson)
    },
    downStart () {
      const peerJson = JSON.stringify({
        type: 113,
        peer_id: parseInt(this.peerID),
        device_id: this.video.peer_con.device_id,
        remote_peer_id: this.video.peerId
      })
      console.log('控制摄像头向下!', peerJson)
      websocket.send(peerJson)
    },
    leftStart () {
      const peerJson = JSON.stringify({
        type: 114,
        peer_id: parseInt(this.peerID),
        device_id: this.video.peer_con.device_id,
        remote_peer_id: this.video.peerId
      })
      console.log('控制摄像头向左!', peerJson)
      websocket.send(peerJson)
    },
    rightStart () {
      const peerJson = JSON.stringify({
        type: 115,
        peer_id: parseInt(this.peerID),
        device_id: this.video.peer_con.device_id,
        remote_peer_id: this.video.peerId
      })
      console.log('控制摄像头向右!', peerJson)
      websocket.send(peerJson)
    }
  },
  watch: {
    srcObject: {
      handler: function (val) {
        console.log('------------------------')
        console.log(this.$el.childNodes[3])
        this.$el.childNodes[3].srcObject = val
        console.log(this.$el.childNodes[3].srcObject)
      },
      deep: true
    }
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
  z-index: 999;
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