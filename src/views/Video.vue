<template>
  <div class="video-page">
    <div class="left">
      <ExpandList v-for="(item, index) in subList" :title="index + ''" :key="index">
        <div class="video-item" v-for="video in item" :key="video.device_id" @click="addVideo(video, index)">
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
        <VideoBox v-for="(item, index) in videoList" class="video-box" :style="getVideoBox()" :title="item.title" @delete="deleteVideo(index)" :key="index"></VideoBox>
      </div>
    </div>
  </div>
</template>

<script>
import ExpandList from '../components/ExpandList'
import VideoBox from '../components/VideoBox'
import { Order, websocket } from '@/Order.js'

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
      createPeer_type: 150,
      client_status: 0,
      ICEConfiguration: {
        iceServers: [
          {
            urls: "turn:rtcmediaserver.top:3478",
            username: "ipctest", 
            credential: "ipctest"
          }
        ]
      },
      device_id: null,
      peer_id: null,
      sub_servers: null
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
    deleteVideo (index) {
      let copyData = this.videoList
      copyData[index] = {}
      console.log(index)
      this.videoList = []
      this.videoList = copyData
    },
    randomNum (n) { 
      var t=''; 
      for (var i=0;i<n;i++) { 
        t += Math.floor(Math.random()*10); 
      } 
      return t.replace(/\b(0+)/gi,""); 
    },
    addNewVideoElement() {
      var video = document.createElement('video');
      video.autoplay = true;
      
      document.appendChild(video);
      
      //var text = document.createTextNode(text_info);
        //video_view.appendChild(text);
        
      return video
    },
    createPeer (peer_id, device_id) {
      this.device_id = device_id;

      console.log('createPeer: add stream peer\n');
      this.createPeerInternal();
    },
    createPeerInternal () {
      console.log('createPeerInternal\n');
      if (this.connection == null) {
        this.connection = new RTCPeerConnection(this.ICEConfiguration);
      }

      this.connection.onaddstream = (e) => {
        var view = this.addNewVideoElement(e.stream.id);
        view.srcObject = e.stream;
        this.view_map.set(e.stream.id, view);

        console.log('onaddstream stream id:' + e.stream.id + '\n');
      };

      this.connection.onremovestream = (e) => {
        console.log('onremovestream stream id: ' + e.stream.id);
        if (this.view_map.has(e.stream.id)) {
          document.removeChild(this.view_map.get(e.stream.id));
          this.view_map.delete(e.stream.id);
          console.log('onremovestream stream id: ' + e.stream.id + ' removed');
        }
      };

      this.connection.onicecandidate = (event) => {
        this.onIceCandidate(this.connection, event);
      };

      this.connection.onicegatheringstatechange = () => {
        this.onIceGatheringStateChange(this.connection);
      };

      this.connection.oniceconnectionstatechange = () => {
        this.onIceConnectionStateChange(this.connection);
      };

      console.log('createOffer\n');
      var onSuccess = this.onSuccess.bind(this);
      this.connection.createOffer({
          offerToReceiveAudio: 1,
          offerToReceiveVideo: 1
        })
        .then(onSuccess, this.logError);
    },
    setRemoteSDP (sdp) {
      var desc = new Object();
      desc.type = 'answer';
      desc.sdp = sdp;
      this.connection.setRemoteDescription(desc);
    },
    onSuccess (desc) {
      console.log('onSuccess sdp:' + desc.sdp.length);
      this.connection.setLocalDescription(desc);
      this.sdp = desc.sdp;

      if (this.client_status == 1) {
        var peerObj = new Object();
        peerObj.peer_id = parseInt(this.peer_id);
        peerObj.remote_peer_id = parseInt(this.sub_servers);
        peerObj.device_id = this.device_id;
        peerObj.type = this.createPeer_type;
        peerObj.sdp = this.sdp;
        var peerJson = JSON.stringify(peerObj);
        websocket.send(peerJson);
      }
      this.client_status = 1; // connected
    },
    onIceCandidate (event) {
      if (event.candidate) {
        if (event.candidate.sdpMid == "audio") {
          let begin = this.sdp.indexOf("m=audio");
          if (begin > 0) {
            let end = this.sdp.indexOf("\r\n", begin);
            let subStr = this.sdp.substr(begin, end - begin);
            this.sdp = this.sdp.replace(subStr, subStr + "\r\na=candidate:" + event.candidate.candidate);
          }
        }
        if (event.candidate.sdpMid == "video") {
          let begin = this.sdp.indexOf("m=video");
          if (begin > 0) {
            let end = this.sdp.indexOf("\r\n", begin);
            let subStr = this.sdp.substr(begin, end - begin);
            this.sdp = this.sdp.replace(subStr, subStr + "\r\na=candidate:" + event.candidate.candidate);
          }
        }
      }
    },
    onIceGatheringStateChange () {
      console.log('onIceGatheringStateChange:' + this.connection.iceGatheringState);
      if (this.connection.iceGatheringState == "complete") {
        console.log('onIceGatheringStateChange: complete\n' + this.sdp.length);

        var peerObj = new Object();
        peerObj.peer_id = parseInt(this.peer_id);
        peerObj.remote_peer_id = parseInt(this.sub_servers);
        peerObj.device_id = this.device_id
        peerObj.type = this.createPeer_type;
        peerObj.sdp = this.sdp;
        var peerJson = JSON.stringify(peerObj);
        console.log(peerJson)
        websocket.send(peerJson);
        console.log(this.connection)
      }
    },
    onIceConnectionStateChange () {
      if (this.connection.iceConnectionState == "completed") {
        console.log("ok")
      }
    },
    logError (err) {
      console.err(err)
    },
    addVideo (videoInfo, subInfo) {
      console.log(videoInfo)
      this.sub_servers = subInfo
      this.createPeer_type = 150;
      this.createPeer(subInfo, videoInfo.device_id)
    }
  },
  created () {
    let index = 0
    let copySubList = {}
    // 监听列表项目消息
    Order.$on(`message-104`, (data) => {
      index--
      copySubList[data.peer_id] = data.devices_info
      if (index === 0) {
        this.subList = copySubList
      }
    })
    // 监听列表消息
    Order.$on(`message-10`, (data) => {
      data.sub_servers.forEach(element => {
        copySubList[element + ""] = []
        var peerObj = new Object();
        peerObj.peer_id = parseInt(data.peer_id);
        peerObj.remote_peer_id = parseInt(element);
        peerObj.type = 104;
        var peerJson = JSON.stringify(peerObj)
        // console.log(copySubList)
        index ++
        websocket.send(peerJson)
      })
      // this.subList = data.sub_servers
      // console.log(newVideoList)
    })
  },
  mounted () {
    // 获取区域列表
    this.peer_id = this.randomNum(6);
	
    var peerObj = new Object();
    peerObj.peer_id = parseInt(this.peer_id);
    peerObj.role = 21;
    peerObj.type = 10;
    var peerJson = JSON.stringify(peerObj); 
    websocket.send(peerJson);

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
  margin-top: 50px;
  padding: 10px;
  background-color: white;
  height: calc(100% - 90px);
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
  position: absolute;
  font-size: 30px;
  right: 10px;
  top: 10px;
  .icon {
    cursor: pointer;
    color: lightslategray;
  }
}
</style>

