<template>
  <div class="lr-date-picker">
    <el-date-picker
      v-model="chooseTime"
      :editable="false"
      :clearable="true"
      :picker-options="pickerOptions"
      class="el-date-editor-operate"
      prefix-icon=""
      type="daterange"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="handleChooseTime"/>
  </div>
</template>
<script>
const now = new Date()
const today = new Date(new Date().toLocaleDateString()).getTime() // 今天0点
import { getReacentDay } from '@/utils/index'
export default {
  name: 'LrMyDatePicker',
  props: {
    processDisplayTime: {
      type: Function,
      default: function(time) {
        return this.$moment(time).format('YYYY-MM-DD')
      }
    },
    processUsedTime: {
      type: Function,
      default: function(time) {
        return this.$moment(time).format('YYYY-MM-DD')
      }
    },
    labelDate: { // 是否显示标签日期
      type: Boolean,
      default: true
    },
    pastDate: { // 是否需要禁用过去日期
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeNow: today, // 当前时间毫秒
      chooseTime: [],
      pickerOptions: {
        onPick: (date) => {
          return false
        },
        disabledDate: (time) => {
          if (this.pastDate) {
            return time.getTime() < this.timeNow
          }
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const end = getReacentDay(1).end
            const start = getReacentDay(1).start
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const end = getReacentDay(2, true).end
            const start = getReacentDay(2).start
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近7天',
          onClick(picker) {
            const end = getReacentDay(7).end
            const start = getReacentDay(7).start
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近30天',
          onClick(picker) {
            const end = getReacentDay(30).end
            const start = getReacentDay(30).start
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  mounted() {
    if (!this.labelDate) {
      this.pickerOptions.shortcuts = undefined
    }
    // this.handlerProcessTime(now, now)
  },
  methods: {
    doClear() {
      this.chooseTime = ''
      this.$emit('change', {
        start: '',
        end: ''
      })
    },
    handlerProcessTime(start, end) {
      if (start === null && end === null) {
        this.chooseTime = []
        this.$emit('change', {
          start: '',
          end: ''
        })
      }
      this.chooseTime = [this.processDisplayTime(start), this.processDisplayTime(end)]
      this.$emit('change', {
        start: this.processUsedTime(start),
        end: this.processUsedTime(end)
      })
    },
    handleChooseTime(time) {
      if (!time) {
        this.chooseTime = ''
        this.$emit('change', {
          start: '',
          end: ''
        })
        return
      }
      this.handlerProcessTime(time[0], time[1])
    },
    resetDate() {
      this.handlerProcessTime(now, now)
    }
  }
}
</script>
<style lang="scss" scoped>
.lr-date-picker{
  display: inline-block;
  .el-input__inner{
    width:100% !important;
  }
}
</style>

