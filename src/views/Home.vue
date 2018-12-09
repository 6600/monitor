<template>
  <div class="login-page">
    <div class="login-box">
      <div class="left">
        <div class="text-box">
          <div class="text title">Welcome</div>
          <div class="text content">某某某安防管理系统</div>
        </div>
      </div>
      <div class="right">
        <div class="login">
          <div class="username">
            <span class="icon">&#xe600;</span>
            <input placeholder="请输入用户名" type="text">
          </div>
          <div class="password">
            <span class="icon">&#xe6e2;</span>
            <input placeholder="请输入密码" type="text">
          </div>
          <div class="save-user-name">
            <CheckBox class="check" v-model="saveUserName" :size="12"/>
            <span>记住密码</span>
          </div>
          <WaterRipple class="login-button" @onClick="login" text="登陆"></WaterRipple>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import WaterRipple from 'waterripple'
import CheckBox from '@puge/checkbox'
export default {
  name: 'home',
  components: {
    CheckBox,
    WaterRipple
    // HelloWorld
  },
  data () {
    return {
      saveUserName: false
    }
  },
  methods: {
    login () {
      console.log('点击了！')
      this.$router.push('about')
    }
  }
}
</script>

<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-color: skyblue;
}
.login-box {
  height: 500px;
  width: 960px;
  box-shadow: 1px 1px 7px rgba(51, 51, 51, 0.25);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
}
.left, .right {
  width: 50%;
  height: 100%;
  position: relative;
}
.left {
  background-color: rgba(255, 255, 255, 0.1);
}
.right {
  background-color: white;
}
.text-box {
  line-height: 50px;
  height: 100px;
  color: white;
  font-size: 2rem;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  margin: auto;
}
.login {
  padding: 40px 40px;
}
.login-button {
  background-color: #009fe9;
  color: white;
  line-height: 40px;
  border-radius: 25px;
  margin: 20px 0;
  font-size: 1.2rem;
}
.save-user-name {
  display: flex;
  margin: 40px 0;
  .form {
    margin: 4px;
    padding-right: 2px;
  }
  span {
    color: #999798;
    line-height: 26px;
  }
}
.username, .password {
  height: 40px;
  margin: 40px 0;
  border-bottom: 1px solid #ccc;
  .icon {
    height: 40px;
    line-height: 40px;
    width: 40px;
    color: #c3c1c1;
  }
  input {
    border: none;
    width: calc(100% - 40px);
    height: 36px;
  }
}
</style>

