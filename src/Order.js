'use strict'
import Vue from 'vue'
const Order = new Vue()

const websocket = new WebSocket("wss://rtcmediaserver.top:61888")

export { Order, websocket}