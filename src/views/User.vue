<template>
  <div class="user-page">
    <div class="left">
      <div class="menu-item 在线">
        <div class="icon">&#xe603;</div>
        <div class="text">用户信息</div>
      </div>
    </div>
    <div class="right">
      <div class="title-bar">
        <div class="menu-1">用户管理</div>
        <div class="separate">></div>
        <div class="menu-2">用户信息</div>
      </div>
      <div class="content">
        <div class="content-bar">
          <div class="add-user button" @click="shouAddBox = true">添加用户</div>
          <div class="delete-user button">删除用户</div>
        </div>
        <div class="table-box">
          <table border="0" cellspacing=0>
            <tr>
              <th class="check-th"><CheckBox class="check" borderColor="#a3a4a6" v-model="isCheckAll" :size="12"></CheckBox></th>
              <th class="number-th">编号</th>
              <th>用户名称</th>
              <th>设备ip</th>
              <th>最后登录时间</th>
            </tr>
            <tr v-for="(item, ind) in tableData" :key="ind">
              <td class="check-td">
                <CheckBox class="check" v-model="item.isCheck" borderColor="#a3a4a6" :size="12"></CheckBox>
              </td>
              <td>{{item.sid}}</td>
              <td>{{item.username}}</td>
              <td>{{item.state}}</td>
              <td>{{item.state}}</td>
            </tr>
          </table>
        </div>
        <div class="page-box" v-if="tableData.length > 10">
          <div class="page-box-left">
            共13条,每页
            <input type="text" value="10"/>
            条
          </div>
          <Paging class="page-box-right" :page-index="1" :total="100" :page-size="20" @change="pageChange"></Paging>
        </div>
      </div>
    </div>
    <div class="show-box" v-show="shouAddBox">
      <div class="show-box-body">
        <div class="title">添加</div>
        <div class="input-box">
          <div class="text">用户名:</div>
          <input type="text"/>
        </div>
        <div class="input-box">
          <div class="text">密码:</div>
          <input type="text"/>
        </div>
        <div class="button-box">
          <div class="button cancel" @click="shouAddBox = false">取消</div>
          <div class="button submit" @click="addNewUser">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CheckBox from '@puge/checkbox'
import Paging from '../components/Paging'
export default {
  name: 'about',
  components: {
    Paging,
    CheckBox
  },
  data () {
    return {
      tableData: [
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" },
        { isCheck: false, id: 1, name: "测试", state: "在线" }
      ],
      isCheckAll: false,
      shouAddBox: false
    }
  },
  created () {
    axios.get('http://127.0.0.1:3000/getUserList').then((res) => {
      this.tableData = res.data
    })
  },
  methods: {
    pageChange () {

    },
    // 添加新用户
    addNewUser () {
      console.log('添加新用户!')
      this.shouAddBox = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-page{
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
  height: 50px;
  line-height: 50px;
  color: white;
  .icon {
    height: 50px;
    width: 50px;
    text-align: center;
  }
}

.right {
  width: calc(100% - 260px);
  .title-bar {
    display: flex;
    position: absolute;
    line-height: 20px;
    font-size: 14px;
    padding: 10px;
    .menu-1 {
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
      background-color: #6ebbe5;
    }
    .menu-2 {
      padding: 5px;
    }
    .separate {
      line-height: 30px;
      margin: 0 10px;
      color: #ccc;
    }
  }
}
.content {
  margin: 20px;
  margin-top: 60px;
  padding: 10px;
  background-color: white;
  height: calc(100% - 100px);
}
.content-bar {
  display: flex;
  .button {
    height: 30px;
    line-height: 30px;
    width: 100px;
    color: white;
    margin: 10px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
  }
  .add-user {
    background-color: #ffac1e;
    
  }
  .delete-user {
    background-color: #3071a9;
  }
}
.table-box {
  height: calc(100% - 95px);
}
table {
  width: 100%;
  tr {
    height: 30px;
    background-color: #f1f6f9;
  }
  th {
    font-size: 12px;
    background-color: #e4e9ec;
  }
  td {
    border-bottom: 1px solid #e5e9ea;
    border-right: 1px solid #e5e9ea;
  }
  .check-td {
    border-left: 1px solid #e5e9ea;
  }
  .table-box {
    height: calc(100% - 95px)
  }
  tr:nth-child(even){
    background-color: white;
  }
  .check-th, .number-th {
    width: 45px;
  }
}
.page-box {
  display: flex;
  justify-content: space-between;
  .page-box-left {
    color: #596174;
    input {
      width: 30px;
      text-align: center;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }
}
.show-box {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .show-box-body {
    width: 470px;
    height: 260px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: white;
    .title {
      background-color: #6e6e6e;
      color: white;
      text-align: left;
      padding: 0 10px;
      height: 45px;
      line-height: 45px;
    }
    .input-box {
      display: flex;
      justify-content: center;
      margin: 30px 0;
      line-height: 30px;
      .text {
        width: 80px;
      }
      input {
        height: 25px;
        width: 240px;
      }
    }
    .button-box {
      display: flex;
      justify-content: flex-end;
      margin: 0 40px;
      .button {
        background-color: #595959;
        color: white;
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin: 0 5px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
