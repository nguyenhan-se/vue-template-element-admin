export default {
  data() {
    return {
      /* Data pushed by webSocket*/
      webSocket: null,
      webSocketTaskData: {},
      showVehivlesTaskId: null,
      socketReconnectNum: 0, // No more than 5 times
      lockReconnect: false,
      connectSocketUrl: '', // url of socket connection
      connectSocketName: '', // url of socket connection
      // Heartbeat mechanism
      setHearTime: 10000,
      heartTimeOut: 20000,
      timeoutObj: null
    }
  },
  methods: {
    /* Heartbeat*/
    heartReset() {
      this.timeoutObj && clearTimeout(this.timeoutObj)
      // this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
    },
    heartStart() {
      this.timeoutObj && clearTimeout(this.timeoutObj)
      this.timeoutObj = setInterval(() => {
        // console.log('Send heartCheck',this.connectSocketName)
        if (this.webSocket.readyState !== 1) {
          // reconnect
          console.log('reconnect', this.socketReconnectNum)
          this.socketReconnect()
        } else {
          this.webSocket.send('heartCheck' + this.connectSocketName)
        }
      }, 10000)
    },
    /* websocket reconnect*/
    async socketReconnect() {
      // if(this.socketReconnectNum>7||this.lockReconnect)  {
      // After the socket is disconnected, it will reconnect 6 times
      if (this.socketReconnectNum > 5) {
        this.heartReset()
      } else {
        // console.log('socket reconnected' + this.connectSocketName+"count"+this.socketReconnectNum)
        this.socketReconnectNum++
        this.socketConnectMixin()
      }
    },
    resetSocketData() {
      this.socketReconnectNum = 0
      // this.lockReconnect=false
    },

    /* Instructions*/
    socketConnectMixin() {
      // console.log("socketConnectMixin is executed",this.socketReconnectNum);
      return new Promise((resolve) => {
        if (typeof WebSocket === 'undefined') {
          console.log('遗憾：您的浏览器不支持WebSocket')
        } else {
          console.log(' new WebSocket', this.connectSocketUrl)
          this.webSocket = new WebSocket(this.connectSocketUrl)
          // Connection open event
          this.webSocket.onopen = () => {
            this.heartStart()
            resolve()
          }
          // Message event received
          this.webSocket.onmessage = (msg) => {
            this.heartStart()
            this.resetSocketData()
            this.webSocketMessage(msg)
          }
          // Connection closed event
          this.webSocket.onclose = () => {
            // this.heartReset();
            // console.log('An error has occurred Socket has an error')
            // this.lockReconnect = false;
            // this.socketReconnect();
            console.log('Socket is closed', this.connectSocketName)
          }
          // An error event has occurred
          this.webSocket.onerror = () => {
            console.log('Socket error', this.connectSocketName)
            // this.lockReconnect = false;
            // this.socketReconnect();
          }
        }
      })
    },
    // webSocket message monitoring
    webSocketMessage() { },
    // Close websocket connection
    webSocketClose() {
      this.webSocket.close()
      this.heartReset()
    }
  }
}
