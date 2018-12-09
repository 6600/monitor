<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
.login-page {
  background-image: url("./assets/login_bk.png")
}
@font-face {
  font-family: 'iconfont';  /* project id 952414 */
  src: url('//at.alicdn.com/t/font_952414_m90ibmn9lym.eot');
  src: url('//at.alicdn.com/t/font_952414_m90ibmn9lym.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_952414_m90ibmn9lym.woff') format('woff'),
  url('//at.alicdn.com/t/font_952414_m90ibmn9lym.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_952414_m90ibmn9lym.svg#iconfont') format('svg');
}
.icon {
  font-family: "iconfont";
  font-style: normal;
  font-weight: normal;
  display: inline-block;
  user-select: none;
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
</style>
