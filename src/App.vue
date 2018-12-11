<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { Order, websocket } from '@/Order.js'

export default {
  created () {

    websocket.onopen = () => {
      console.log("打开!")
      // onOpen(evt)
    }
    // websocket.onclose = function(evt) { 
    //   onClose(evt) 
    // }
    websocket.onmessage = (evt) => {
      const data = JSON.parse(evt.data)
      console.log('收到消息:', data)
      Order.$emit(`message-${data.type}`, data)
    }
    // websocket.onerror = function(evt) { 
    //   onError(evt) 
    // }
  }
}
</script>


<style lang="less">
.login-page {
  background-image: url("./assets/login_bk.png")
}
@font-face {
  font-family: 'iconfont';  /* project id 952414 */
  src: url('//at.alicdn.com/t/font_952414_67u9cfnbw8i.eot');
  src: url('//at.alicdn.com/t/font_952414_67u9cfnbw8i.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_952414_67u9cfnbw8i.woff') format('woff'),
  url('//at.alicdn.com/t/font_952414_67u9cfnbw8i.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_952414_67u9cfnbw8i.svg#iconfont') format('svg');
}
.icon {
  font-family: "iconfont";
  font-style: normal;
  font-weight: normal;
  display: inline-block;
  user-select: none;
  cursor: pointer;
}
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.view .left, .view .right {
  transition: width 0.5s;
}
.is-shrink .view .left {
  width: 0;
}
.is-shrink .view .right {
  width: 100%;
}

// 收缩兰样式
.left .expand-list-box .list {
  color: white;
  background-color: #21212d;
  border-bottom: 1px solid #282834;
}
.left .expand-list-box .list svg {
  fill: white;
}
</style>
