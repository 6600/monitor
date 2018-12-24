<template>
  <div class="main-page" :class="{'is-shrink': isShrink}">
    <div class="title-bar">
      <div class="left">
        <div class="title">某某某安防管理系统</div>
        <div class="shrink icon" @click="isShrink = !isShrink">&#xe604;</div>
        <router-link tag="div" to="video" class="menu-item">
          <div class="icon">&#xe601;</div>
          <div class="text">视频显示</div>
        </router-link>
        <router-link tag="div" to="user" class="menu-item">
          <div class="icon">&#xe600;</div>
          <div class="text">用户管理</div>
        </router-link>
        <router-link tag="div" to="device" class="menu-item">
          <div class="icon">&#xe79e;</div>
          <div class="text">设备管理</div>
        </router-link>
      </div>
      <div class="user" @click="showMenu = !showMenu">
        <img class="user-img" src="../assets/user.png">
        <div class="hello">hello,</div>
        <div class="user-name">admin</div>
        <div class="drop-down icon">&#xe626;</div>
        <div class="menu" :class="{active: showMenu}">
          <div class="menu-item">
            <div class="icon">&#xe6e2;</div>
            <div class="menu-item-text">修改密码</div>
          </div>
          <div class="menu-item">
            <div class="icon">&#xe62c;</div>
            <div class="menu-item-text">退出系统</div>
          </div>
        </div>
      </div>
    </div>
    <router-view class="view"/>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      showMenu: false,
      isShrink: false
    }
  }
}
</script>

<style lang="less" scoped>
.main-page {
  width: 100%;
  height: 100%;
  background-color: #f0f4f7;
}
.title {
  height: 60px;
  line-height: 60px;
  color: #4a9ffa;
  font-size: 20px;
  width: 260px;
  background-color: #353746;
}
.title-bar {
  height: 60px;
  line-height: 60px;
  display: flex;
  z-index: 9;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0px 4px 8px 0px #ccced0;
}
.router-link-exact-active {
  background-color: #e4f5fd;
}
.menu {
  position: absolute;
  top: 65px;
  width: 120px;
  right: 3px;
  border-radius: 3px;
  background-color: white;
  height: 0;
  overflow: hidden;
}
.menu.active {
  height: auto;
  padding: 10px 0;
}

.left {
  display: flex;
  .menu-item {
    height: 60px;
    line-height: 60px;
    display: flex;
    padding: 0 10px;
    cursor: pointer;
    .icon {
      width: 30px;
      margin: 0 10px;
      text-align: center;
      font-size: 1.4rem;
    }
  }
}
.user {
  display: flex;
  cursor: pointer;
  .user-img {
    width: 35px;
    height: 35px;
    margin: 13px 0;
  }
  .hello {
    margin: 0 5px;
  }
  .user-name {
    color: #5fa9d9;
  }
  .drop-down {
    margin: 0 8px;
  }
  .menu-item {
    display: flex;
    height: 30px;
    line-height: 30px;
    color: #858585;
    cursor: pointer;
    .icon {
      width: 25px;
      height: 25px;
      text-align: center;
    }
  }
  .menu-item-text {
    font-size: 14px;
  }
}
.shrink {
  width: 51px;
  font-size: 23px;
}
</style>
