<template>
  <div class="lr-audio" @click.stop="">
    <div class="lr-audio__button">
      <template v-if="state === 0">
        <svg-icon icon-class="player_play" class="lr-audio__icon" @click.native.stop="play"/>
      </template>
      <template v-else>
        <svg-icon icon-class="player_pause" class="lr-audio__icon" @click.native.stop="pause"/>
      </template>
    </div>
    <div v-if="progress" class="lr-audio__progress">
      <el-slider v-model="percent" :disabled="total === 0" :format-tooltip="formatSeconds" @change="dragPoint"/>
    </div>
    <div v-if="progress" class="lr-audio__time">
      {{ currentTime | audioTime }}/{{ total | audioTime }}
    </div>
  </div>
</template>

<script>
import { idGenerator, formatSeconds } from '@/utils/index'
export default {
  name: 'LrAudioPlayer',
  filters: {
    audioTime(time) {
      return formatSeconds(time)
    }
  },
  props: {
    src: {
      type: String,
      required: true
    },
    progress: { // 是否显示进度
      type: Boolean,
      default: true
    },
    preCache: { // 是否提前加载源
      type: Boolean,
      default: false
    }
  },
  data() {
    const $this = this
    return {
      id: `audio_${idGenerator.next()}`,
      formatSeconds() {
        return formatSeconds($this.currentTime)
      },
      loadingAudioState: -1, // 音频加载状态
      currentTime: 0,
      total: 0,
      state: 0, // 0 未播放 | 1 播放中 (播放结束后变成未播放)
      timer: null,
      percent: 0 // 当前进度条
    }
  },
  created() {
    if (this.preCache) {
      this.loadAudioMeta()
    }
    this.$bus.$on(this.id, current => {
      this.state = 1
      this.currentTime = current.current
      if (!isNaN(current.total)) {
        this.total = current.total
      }
      this.percent = parseInt(this.currentTime * 100 / this.total)
      if (this.currentTime === this.total) {
        this.$bus.$emit('stopNotify')
        this.end()
      }
    })
    this.$bus.$on('reset', audioId => {
      if (audioId !== this.id) {
        this.state = 0
        this.currentTime = 0
      } else { // 停止当前音频
        this.state = 0
        this.currentTime = 0
        this.percent = 0
      }
    })
  },
  beforeDestroy() {
    this.$bus.$emit('pause', { id: this.id })
  },
  methods: {
    loadAudioMeta() {
      const $this = this
      var audio = new Audio()
      audio.onloadedmetadata = function() {
        if (!$this.total) {
          $this.total = Math.ceil(audio.duration)
        }
      }
      audio.src = this.src
    },
    play() {
      this.$bus.$emit('play', {
        id: this.id,
        src: this.src
      })
      this.state = 1
    },
    pause() {
      this.$bus.$emit('pause', {
        id: this.id
      })
      this.state = 0
    },
    end() { // 当前音频结束播放
      this.$bus.$emit('reset', this.id)
    },
    dragPoint(val) { // 拖拽时间点
      const current = parseInt(val * this.total / 100)
      this.pause()
      setTimeout(_ => { // 防止上一次的播放时间导致进度条错位的问题
        this.$bus.$emit(this.id, {
          current: current,
          total: this.total
        })
        this.$nextTick(_ => {
          this.$bus.$emit('play', {
            id: this.id,
            src: this.src,
            current: current
          })
        })
      }, 700)
    }
  }
}
</script>

<style lang="scss">
$sliderColor: #6BDBAB;

.lr-audio{
  display: flex;
  align-items: center;
  margin: 8px 0;
  .lr-audio__button{
    i{
      font-size: 24px;
      color: #6BDBAB;
      &:hover{
        cursor: pointer;
      }
    }
  }
  .lr-audio__time{
    color: rgba(0,0,0,0.43);
  }
  .lr-audio__progress{
    flex: 1;
    margin: 0 12px 0 12px;
    .lr-audio__progress__number{
      background: #6BDBAB;
      height: 100%;
      border-radius: 8px;
    }
    .el-slider__bar{
      background-color: $sliderColor;
    }
    .el-slider__button{
      border-color: $sliderColor;
    }
    .disabled .el-slider__button{
      border-color: #c0c4cc;
    }
  }
}
.lr-audio__icon{
  font-size: 24px;
}

</style>
