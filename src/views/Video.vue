<template>
  <div class="video-page">
    <div class="left">
      <ExpandList v-for="(item, index) in subList" :title="index + ''" :key="index">
        <div class="video-item" v-for="video in item" :key="video.device_id" @click="createPeer(index, video.device_id, 150)">
          <div class="icon">&#xe68f;</div>
          <div class="text">{{video.device_name}}</div>
        </div>
      </ExpandList>
    </div>
    <div class="right">
      <div class="split-box">
        <div class="split-button icon" @click="changeVideoSplit(4)">&#xe6f8;</div>
        <div class="split-button icon" @click="changeVideoSplit(9)">&#xe708;</div>
        <div class="split-button icon" @click="changeVideoSplit(16)">&#xe709;</div>
      </div>
      <div class="content">
        <VideoBox v-for="(item, index) in videoList" class="video-box" :id="'video-' + index" :style="getVideoBox()" :video="item" :srcObject="item.srcObject" @delete="deleteVideo(index, item)" :key="index"></VideoBox>
      </div>
    </div>
  </div>
</template>

<script>
import ExpandList from '../components/ExpandList'
import VideoBox from '../components/VideoBox'
import { Order, websocket } from '@/Order.js'

/* eslint-disable */

export default {
  name: 'about',
  components: {
    VideoBox,
    ExpandList
  },
  data () {
    return {
      subList: {},
      videoList: [
        {title: "视频1"},
        {title: "视频2"},
        {title: "视频3"},
        {title: "视频4"},
      ],
      connection: null,
      client_status: 0,
      peer_id: null,
      sub_servers: null,
      videoIndex: 0
    }
  },
  methods: {
    getVideoBox () {
      return {
        width: `${100/Math.sqrt(this.videoList.length)}%`,
        height: `${100/Math.sqrt(this.videoList.length)}%`
      }
    },
    changeVideoSplit (number) {
      let newList = []
      for (let index = 0; index < number ; index++) {
        newList.push({title: `视频${index}`})
      }
      console.log(newList)
      this.videoList = newList
    },
    deleteVideo (index, item) {
      console.log('删除屏幕:', item)
      // 关闭监控器
      Order.$once(`message-151`, (data) => {
        console.log('销毁摄像头实例!')
        if (this.checkVideoList(data.device_id) !== -1) {
          this.videoList[this.checkVideoList(data.device_id)].peer_con.connection.setRemoteDescription({
            type: 'answer',
            sdp: data.sdp
          })
          // 移除元素
          console.log('remove video')
          this.videoList[this.checkVideoList(data.device_id)] = {}
        }
        else {
          console.log('setRemoteSDP failed, no user:' + data.peer_id)
        }
      })
      // 发送151消除
      const peerJson = JSON.stringify({
        peer_id: parseInt(this.peer_id),
        remote_peer_id: this.sub_servers,
        device_id: item.peer_con.device_id,
        type: 151,
        sdp: this.sdp
      })
      // console.log('发送数据:', peerJson)
      websocket.send(peerJson)
      this.createPeer(item.peerId, item.peer_con.device_id, 151)
      let copyData = this.videoList
      copyData[index] = {}
      console.log(index)
      this.videoList = []
      this.videoList = copyData
      console.log('stop IPC')
    },
    randomNum (n) { 
      var t=''; 
      for (var i=0;i<n;i++) { 
        t += Math.floor(Math.random()*10); 
      } 
      return t.replace(/\b(0+)/gi,""); 
    },
    // orderType 150播放 151 停止
    // 创建视频监控
    // regionID: 区域ID
    // device_id: 驱动ID
    createPeer (regionID, device_id, orderType) {
      if (orderType === 150) {
        console.log('创建摄像头实例!')
        Order.$on(`message-150`, (data) => {
          console.log(this.checkVideoList(data.device_id))
          if (this.checkVideoList(data.device_id) !== -1) {
            this.videoList[this.checkVideoList(data.device_id)].peer_con.connection.setRemoteDescription({
              type: 'answer',
              sdp: data.sdp
            })
          }
          else {
            console.log('setRemoteSDP failed, no user:' + data.peer_id)
          }
        })
        regionID = parseInt(regionID)
        // 创建一个摄像头实例
        let monitor = new this.PeerConnection(this, orderType, device_id)
        monitor.device_id = device_id
        // console.log(regionID)
        this.addVideoList(regionID, monitor)
      } else {
        this.videoList[this.checkVideoList(device_id)].peer_con.connection.close()
      }
      
    },
    // 检查监控列表是否包含
    checkVideoList (device_id) {
      const videoList = this.videoList
      for(let key in videoList) {
        if (videoList[key].peer_con.device_id && videoList[key].peer_con.device_id === parseInt(device_id)) {
          return key
        }
      }
      return -1
    },
    addVideoList (peerId, peer_con) {
      const videoList = this.videoList
      for(let key in videoList) {
        if (!videoList[key].peerId) {
          videoList[key].peerId = peerId
          videoList[key].peer_con = peer_con
          return key
        }
      }
      return -1
    },
    logError (err) {
      console.err(err)
    },
    // 启动摄像头进程
    initSubServer (peer_id) {
      const peerJson = JSON.stringify({
        type: 140,
        peer_id: parseInt(peer_id),
        remote_peer_id: parseInt(this.sub_servers)
      })
      console.log(peerJson)
      websocket.send(peerJson);
      
      const ptzCreate = JSON.stringify({
        type: 100,
        peer_id: parseInt(peer_id),
        remote_peer_id: parseInt(this.sub_servers)
      })
      console.log(ptzCreate)
      websocket.send(ptzCreate)
    },
    // 创建摄像头实例
    PeerConnection(vueData, orderType, device_id) {
      this.sdp = null
      this.orderType = orderType
      // RTC实例
      this.connection = new RTCPeerConnection({
        iceServers: [{
          urls: "turn:rtcmediaserver.top:3478",
          username: "ipctest", 
          credential: "ipctest"
        }]
      })
      
      this.connection.onaddstream = (e) => {
        // var view = vueData.addNewVideoElement();
        vueData.videoList[vueData.checkVideoList(device_id)].srcObject = e.stream
        vueData.$forceUpdate()
        console.log('onaddstream stream id:' + e.stream.id + '\n' );
      };
      
      this.connection.onicecandidate = (event) => {
        //console.log('onIceCandidate:\n' , event.candidate);
        if (event.candidate) {
          if(event.candidate.sdpMid == "audio") {
            var begin = this.sdp.indexOf("m=audio");
            if(begin > 0) {
              var end = this.sdp.indexOf("\r\n", begin);
              var subStr = this.sdp.substr(begin, end - begin);
              this.sdp = this.sdp.replace(subStr, subStr + "\r\na=candidate:" + event.candidate.candidate);
            }
          }
          if(event.candidate.sdpMid == "video") {
            var begin = this.sdp.indexOf("m=video");
            if(begin > 0) {
              var end = this.sdp.indexOf("\r\n", begin);
              var subStr = this.sdp.substr(begin, end - begin);
              this.sdp = this.sdp.replace(subStr, subStr + "\r\na=candidate:" + event.candidate.candidate);
            }
          }
        }
      };
        
      this.connection.onicegatheringstatechange = () => {
        const connection = this.connection
        console.log('onIceGatheringStateChange:' + connection.iceGatheringState);
        if (connection.iceGatheringState == "complete") {
          console.log('onIceGatheringStateChange: complete\n' + this.sdp.length);
          const peerJson = JSON.stringify({
            peer_id: parseInt(vueData.peer_id),
            remote_peer_id: vueData.sub_servers,
            device_id,
            type: this.orderType,
            sdp: this.sdp
          })
          // console.log('发送数据:', peerJson)
          websocket.send(peerJson)
        }
      }
      
      this.onSuccess = function(desc) {
        console.log('onSuccess sdp:' + desc.sdp.length);
        this.connection.setLocalDescription(desc);
        this.sdp = desc.sdp;
        
        if(this.client_status == 1) {
          const peerJson = JSON.stringify({
            peer_id: parseInt(peer_id),
            remote_peer_id: parseInt(this.sub_servers),
            device_id,
            type: this.orderType,
            sdp: this.sdp
          })
          console.log('发送数据:', peerJson)
          websocket.send(peerJson)
        }
        this.client_status = 1;// connected
      };

      console.log('createOffer\n');
      var onSuccess = this.onSuccess.bind(this);
      // 设置视频比率
      this.connection.createOffer({
          offerToReceiveAudio: 1,
          offerToReceiveVideo: 1
        })
        .then(onSuccess, vueData.logError);
      
    }
  },
  beforeDestroy () {
    // 销毁监听
    Order.$off(`message-150`)
  },
  created () {
    let index = 0
    let copySubList = {}
    // 监听列表消息
    Order.$once(`message-10`, (data) => {
      // 104返回了指定子服务下的摄像头列表
      data.sub_servers.forEach(element => {
        // 监听列表项目消息
        Order.$once(`message-104`, (data) => {
          index--
          copySubList[data.peer_id] = data.devices_info
          if (index === 0) {
            this.subList = copySubList
          }
        })
        // 注册remote----
        this.sub_servers = parseInt(element)
        copySubList[element + ""] = []
        const peerJson = JSON.stringify({
          peer_id: parseInt(data.peer_id),
          remote_peer_id: parseInt(element),
          type: 104
        })
        // console.log(copySubList)
        index ++
        console.log('发送')
        websocket.send(peerJson)
        this.initSubServer(this.peer_id)
      })
    })

    // 获取区域列表
    this.peer_id = this.randomNum(6);
    const peerJson = JSON.stringify({
      role: 21,
      type: 10,
      peer_id: parseInt(this.peer_id)
    })
    websocket.send(peerJson)
  }
}
</script>

<style lang="less" scoped>
.video-page {
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
  cursor: pointer;
  .icon {
    height: 60px;
    width: 60px;
    text-align: center;
  }
}
.active {
  background-color: #6ebbe5;
}
.video-item {
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
  }
}
.content {
  margin: 20px;
  padding: 10px;
  background-color: white;
  height: calc(100% - 60px);
}
.right {
  position: relative;
  width: calc(100% - 260px);
}
.video-box {
  width: 50%;
  height: 50%;
  float: left;
}
.split-box {
  display: flex;
  position: fixed;
  font-size: 30px;
  right: 180px;
  top: 15px;
  .icon {
    cursor: pointer;
    color: lightslategray;
  }
}
</style>

