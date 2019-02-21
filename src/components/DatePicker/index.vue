<template>
  <el-date-picker
    :picker-options="pickerOptions"
    :format="format"
    v-model="date"
    type="daterange"
    align="right"
    unlink-panels
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    class="lr-date-picker"
    @change="changed"/>
</template>

<script>
export default {
  name: 'LrDatePicker',
  props: {
    value: {
      type: Array,
      required: true
    },
    format: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      date: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  watch: {
    date(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.$set(this, 'date', val)
    }
  },
  methods: {
    changed() {
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss">
.lr-date-picker{
  &.el-date-editor--daterange{
    width: 270px;
  }
  .el-range-separator{
    display: inline-block;
    margin-right: 6px;
  }
}
</style>
