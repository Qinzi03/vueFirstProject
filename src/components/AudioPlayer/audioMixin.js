/**
 * 全局音频播放组件
 */
export default {
  data() {
    return {
      current_audio_id: '',
      audioClass: 'lr-audio-holder',
      playInterval: null, // 用于对外发送播放时间
      audio: null
    }
  },
  created() {
    this.$bus.$on('stopNotify', _ => {
      this.stopNotify()
    })
  },
  beforeDestroy() {
    this.$bus.$off('stopNotify')
  },
  mounted() {
    this.createAudioPlayer()
    const audio = this.getAudio()
    this.$nextTick(_ => {
      this.$bus.$on('play', ({ id, src, current = 0 }) => {
        if (this.current_audio_id !== id) {
          this.current_audio_id = id
          audio.src = src
        }
        audio.currentTime = current
        audio.play()
        this.startNotify()
      })
      this.$bus.$on('pause', ({ id }) => {
        if (id === this.current_audio_id) {
          audio.pause()
          this.stopNotify()
        }
      })
    })
  },
  methods: {
    createAudioPlayer() { // 创建全局音频播放器
      if (!document.querySelector(`.${this.audioClass}`)) {
        const audioContainer = document.createElement('audio')
        audioContainer.classList = this.audioClass
        document.body.append(audioContainer)
      }
    },
    getAudio() {
      if (!this.audio) {
        this.audio = document.querySelector(`.${this.audioClass}`)
      }
      return this.audio
    },
    startNotify() { // 向外传递播放进度
      this.stopNotify()
      this.notify()
      this.playInterval = setInterval(_ => {
        this.notify()
      }, 1000)
    },
    notify() {
      this.$bus.$emit('reset', this.current_audio_id)
      this.$bus.$emit(this.current_audio_id, { // 当前播放进度
        current: Math.ceil(this.audio.currentTime),
        total: Math.ceil(this.audio.duration)
      })
    },
    stopNotify() {
      if (this.playInterval) {
        clearInterval(this.playInterval)
        this.playInterval = null
      }
    }
  }
}
