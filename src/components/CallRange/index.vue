<template>
  <el-time-picker
    v-model="rangeValue"
    :clearable="(search || false)"
    :picker-options="pickerOptions"
    format="H:mm"
    is-range
    range-separator="至"
    start-placeholder="开始"
    end-placeholder="结束"
    placeholder="选择时间范围"
    class="lr-call-range"
    @change="changed"/>
</template>

<script>
export default {
  name: 'LrCallRange',
  props: {
    value: {
      type: Array,
      required: true
    },
    search: { // 是否作为搜索条件使用
      type: Boolean,
      default: false
    },
    isAdd: { // 新增是，将时间缩减至  9：00 - 21：00
      type: Boolean,
      default: false
    }
  },
  data() {
    let result = []
    if (this.search) {
      result = null
    } else if (this.value.length > 0) {
      result = [this.minute2Date(this.value[0]), this.minute2Date(this.value[1])]
    }
    return {
      rangeValue: result
    }
  },
  computed: {
    pickerOptions() {
      if (this.isAdd) {
        return {
          selectableRange: '09:00:00 - 21:00:00'
        }
      } else {
        return {}
      }
    }
  },
  watch: {
    value(val) {
      if (this.search) { // 搜索条件下不进行数据同步
        return
      }
      if (this.isEqual()) {
        return
      }
      if (val.length > 0) {
        this.$set(this, 'rangeValue', [this.minute2Date(val[0]), this.minute2Date(val[1])])
      } else {
        this.$set(this, 'rangeValue', [])
      }
    },
    rangeValue(val) {
      if (this.isEqual()) {
        return
      }
      if (!val || val.length === 0) {
        this.$emit('input', [])
      } else {
        this.$emit('input', [this.date2Minute(val[0]), this.date2Minute(val[1])])
      }
    }
  },
  methods: {
    isEqual() {
      const value = this.value
      const rangeValue = this.rangeValue
      if (rangeValue === null) {
        return false
      }

      if (value.length === 0 && rangeValue.length === 0) {
        return true
      }
      if (this.date2Minute(rangeValue[0]) === value[0] && this.date2Minute(rangeValue[1]) === value[1]) {
        return true
      }
      return false
    },
    minute2Date(minute) {
      const todayStart = this.$moment(this.$moment().format('YYYY-MM-DD')).toDate()
      return new Date(todayStart.getTime() + minute * 60 * 1000)
    },
    date2Minute(date) {
      return date.getHours() * 60 + date.getMinutes()
    },
    changed(val) {
      if (val === null) {
        this.$set(this, 'rangeValue', [])
      }
      if (val) {
        this.$emit('input', [this.date2Minute(val[0]), this.date2Minute(val[1])])
      } else {
        this.$emit('input', [])
      }
      this.$emit('change')
    },
    clear() {
      this.$set(this, 'rangeValue', null)
    }
  }
}

</script>

<style lang="scss">
.lr-call-range{
  .el-range-separator{
    display: inline-block;
    margin-right: 8px;
    line-height: 24px;
  }
}
</style>
