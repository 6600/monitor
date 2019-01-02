<template>
  <div class="user-page">
    <div class="left">
      <div class="menu-item" v-for="item in videoList" :key="item" @click="changeActive(item)">
        <div class="icon">&#xe603;</div>
        <div class="text">{{item}}</div>
      </div>
    </div>
    <div class="right">
      <div class="title-bar">
        <div class="menu-1">设备管理</div>
        <div class="separate">></div>
        <div class="menu-2">设备信息</div>
      </div>
      <div class="content">
        <div class="content-bar">
          <div class="add-user button" @click="shouAddBox = true">添加设备</div>
          <div class="delete-user button" @click="deleteUser">删除设备</div>
        </div>
        <div class="table-box">
          <table border="0" cellspacing=0>
            <tr>
              <th class="check-th"><CheckBox class="check" borderColor="#a3a4a6" v-model="isCheckAll" :size="12"></CheckBox></th>
              <th class="number-th">编号</th>
              <th>设备名称</th>
              <th>IP地址</th>
            </tr>
            <tr v-for="(item, ind) in tableData" :key="ind">
              <td class="check-td">
                <CheckBox class="check" v-model="item.isCheck" borderColor="#a3a4a6" :size="12"></CheckBox>
              </td>
              <td>{{item.device_id}}</td>
              <td>{{item.device_name}}</td>
              <td>{{item.device_ip}}</td>
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
          <div class="text">设备名:</div>
          <input type="text" v-model="addDeviceName"/>
        </div>
        <div class="input-box">
          <div class="text">设备IP:</div>
          <input type="text" v-model="addDeviceIP"/>
        </div>
        <div class="input-box">
          <div class="text">用户名:</div>
          <input type="text" v-model="addDeviceUser"/>
        </div>
        <div class="input-box">
          <div class="text">密码:</div>
          <input type="text" v-model="addDevicePassword"/>
        </div>
        <div class="button-box">
          <div class="button cancel" @click="shouAddBox = false">取消</div>
          <div class="button submit" @click="addNewDevice">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBox from '@puge/checkbox'
import Paging from '../components/Paging'
import { Order, websocket } from '@/Order.js'

export default {
  name: 'about',
  components: {
    Paging,
    CheckBox
  },
  data () {
    return {
      addDeviceName: "",
      addDeviceIP: "",
      addDeviceUser: "",
      addDevicePassword: "",
      videoList: [],
      tableData: [],
      isCheckAll: false,
      shouAddBox: false,
      peer_id: null,
      checkItem: 0
    }
  },
  created () {
    console.log("开始监听!")
    
    // 监听密码验证消息
    Order.$once(`message-10`, (res) => {
      this.videoList = res.sub_servers
      this.checkItem = res.sub_servers[0]
      this.reload()
    })
    // 请求设备列表
    // 获取区域列表
    this.peer_id = this.randomNum(6)
    const peerJson = JSON.stringify({
      role: 21,
      type: 10,
      peer_id: parseInt(this.peer_id)
    })
    websocket.send(peerJson)
    
  },
  methods: {
    reload () {
      // 创建摄像头
      websocket.send(JSON.stringify({
        peer_id: parseInt(this.peer_id),
        remote_peer_id: this.checkItem,
        type: 100
      }));
      Order.$once(`message-104`, (res) => {
        // console.log(res)
        this.tableData = res.devices_info
      })
      websocket.send(JSON.stringify({
        peer_id: parseInt(this.peer_id),
        remote_peer_id: this.checkItem,
        type: 104
      }))
    },
    pageChange () {

    },
    randomNum (n) { 
      var t=''; 
      for (var i=0;i<n;i++) { 
        t += Math.floor(Math.random()*10); 
      } 
      return t.replace(/\b(0+)/gi,""); 
    },
    deleteUser () {
      for (let item in this.tableData) {
        const value = this.tableData[item]
        if (value.isCheck) {
          websocket.send(JSON.stringify({
            type: 103,
            peer_id: parseInt(this.peer_id),
            remote_peer_id: this.checkItem,
            device_id: value.device_id
          }))
        }
      }
      this.reload()
    },
    // 添加新设备
    addNewDevice () {
      // 接收添加设备消息
      Order.$once(`message-102`, () => {
        this.shouAddBox = false
        this.reload()
      })
      console.log(JSON.stringify({
        type: 102,
        peer_id: parseInt(this.peer_id),
        remote_peer_id: this.checkItem,
        device_ip: this.addDeviceIP,
        device_name: this.addDeviceName,
        device_user: this.addDeviceUser,
        device_pw: this.addDevicePassword,
      }))
      websocket.send(JSON.stringify({
        type: 102,
        peer_id: parseInt(this.peer_id),
        remote_peer_id: this.checkItem,
        device_ip: this.addDeviceIP,
        device_name: this.addDeviceName,
        device_user: this.addDeviceUser,
        device_pw: this.addDevicePassword,
      }))
      // this.shouAddBox = false
    },
    changeActive (id) {
      this.checkItem = id
      this.reload()
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
  width: 260px;
  overflow: hidden;
  cursor: pointer;
  .icon {
    height: 50px;
    width: 50px;
    text-align: center;
  }
}
.menu-item:hover {
  background-color: #3385ff;
}
.menu-item:active {
  background-color: #78a5f1;
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
    height: 370px;
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
