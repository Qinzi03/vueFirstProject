<template>
  <div class="lr-call-range-slider">
    <div class="lr-call-range-slide__item">
      <div v-for="(item, $index) of division" v-if="$index < division.length" :key="$index" class="lr-call-range-slide__item__check" @click.stop="toggleItem(item)">
        <template v-if="item.checked">
          <div style="background: #4875e5;">
            &nbsp;
          </div>
        </template>
        <template v-else>
          <div style="background: #f2f4fd;">
            &nbsp;
          </div>
        </template>
      </div>
    </div>
    <div class="lr-call-range-slide__label">
      <div v-for="(item, $index) of division" v-if="$index < division.length" :key="$index" class="lr-call-range-slide__label__content">
        <template v-if="item.index % 2 === 0">
          <template v-if="item.index === 0">
            {{ start + ((item.index) / 2) }}
          </template>
          <template v-else>
            <div style="margin-left: -8px">
              {{ start + ((item.index) / 2) }}
            </div>
          </template>
        </template>
      </div>
    </div>
    <div class="lr-call-range-slide__label--last">
      {{ end }}
    </div>
  </div>
</template>

<script>
/**
 * 呼叫时段选择控件(半小时一个刻度)
 *
 * init() 初始化数据
 * getValue() 获取当前值
 */

export default {
  name: 'LrCallRangeSlider',
  props: {
    start: {
      type: Number,
      default: 9
    },
    end: {
      type: Number,
      default: 23
    }
  },
  data() {
    return {
      today: this.$moment().format('YYYY-MM-DD'),
      division: [],
      result: [] // 选中的结果集
    }
  },
  created() {
    this.computeDivision()
  },
  methods: {
    setDefaultSelection() {
      this.division.forEach(item => {
        item.checked = true
      })
    },
    updateResult() {
      const newResult = []
      const splitIndex = [] // 当前有效数据中，不连续的时间节点
      const checkedList = this.division.filter(item => item.checked === true)
      if (checkedList.length >= 1) {
        for (let i = 0; i < (checkedList.length - 1); i++) {
          if ((checkedList[i + 1].index - checkedList[i].index) !== 1) {
            splitIndex.push(i + 1)
            continue
          }
        }
        let startIndex = 0
        splitIndex.forEach(index => {
          newResult.push([
            (this.start * 2 + checkedList[startIndex].index) * 30,
            (this.start * 2 + checkedList[index - 1].index) * 30 + 30
          ])
          startIndex = index
        })
        newResult.push([
          (this.start * 2 + checkedList[startIndex].index) * 30,
          (this.start * 2 + (checkedList[checkedList.length - 1].index) + 1) * 30
        ])
      }

      this.result = null
      this.result = this.parseCallRangeToTime(newResult)
    },
    init(val = []) {
      if (val.length === 0) {
        this.setDefaultSelection()
      } else {
        // 初始化时对所有的值进行校验，不符合的值直接被过滤掉
        val.forEach(item => {
          if (item[0] % 30 === 0 && item[1] % 30 === 0) {
            const startIndex = item[0] / 30 - this.start * 2
            const endIndex = item[1] / 30 - this.start * 2
            for (let i = startIndex; i < endIndex; i++) {
              if (i >= 0) {
                const divisionValueIndex = this.division.findIndex(item => item.index === i)
                if (divisionValueIndex !== -1) {
                  this.division[divisionValueIndex].checked = true
                }
              }
            }
          }
        })
      }
      this.updateResult()
    },
    getDivisionCount() { // 获取要分隔的区间
      return (this.end - this.start) * 2
    },
    computeDivision() {
      const divisionCount = this.getDivisionCount()
      for (let i = 0; i < divisionCount; i++) {
        this.division.push({
          index: i,
          checked: false
        })
      }
    },
    toggleItem(item) {
      item.checked = !item.checked
      this.$nextTick(_ => {
        this.updateResult()
      })
    },
    getValue() {
      return this.result
    },
    parseCallRangeToTime(callRangeList) {
      const result = []
      callRangeList.forEach(callRange => {
        result.push([
          this.$moment(this.today).add(callRange[0], 'm').toDate().getTime(),
          this.$moment(this.today).add(callRange[1], 'm').toDate().getTime()
        ])
      })
      return result
    }
  }
}
</script>

<style lang="scss">
$sliderBorder: #d6d9fb;

.lr-call-range-slider{
  position: relative;
  .lr-call-range-slide__item{
    display: flex;
    .lr-call-range-slide__item__check{
      flex: 1;
      border: 1px solid $sliderBorder;
      border-right: 0;
      text-align: center;
      line-height: 32px;
      &:last-child{
        border-right: 1px solid $sliderBorder;
      }
      &:hover{
        cursor: pointer;
      }
    }

  }
  .lr-call-range-slide__label{
    display: flex;
    .lr-call-range-slide__label__content{
      flex: 1;
    }
  }
  .lr-call-range-slide__label--last{
    position: absolute;
    right: 0;
    bottom: 0;
  }

}
</style>
