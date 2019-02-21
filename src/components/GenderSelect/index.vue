<template>
  <div class="lr-robort-select">
    <span class="lr-robort-face lr-robort-left-face" @click="handleChange(menval)">
      <span class="lr-img-box">
        <img v-if="value===menval" src="../../assets/menselect.png">
        <img v-else src="../../assets/men.png">
      </span>
      <span class="lr-robort-sex">男</span>
    </span>
    <span class="lr-robort-face" @click="handleChange(wmenval)">
      <span class="lr-img-box">
        <img v-if="value===wmenval" src="../../assets/wmenselet.png">
        <img v-else src="../../assets/wmen.png">
      </span>
      <span class="lr-robort-sex">女</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'GenderSelect',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    menval: {
      type: [String, Number],
      required: true
    },
    wmenval: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('change', val)
    }
  }
}

</script>

<style lang="scss">
  .lr-robort-select{
    text-align: center;
    padding-left: 9px ;
    .lr-robort-face{
      display: inline-block;
      cursor: pointer;
      .lr-img-box{
        display: inline-block;
        width: 60px;
        height: 60px;
        img{
          width: 100%;
          height: auto;
        }
      }
      .lr-robort-sex{
        display: inline-block;
        float: right;
        font-size: 14px;
        color: rgba(0,0,0,0.43);
        margin-left: 16px;
        margin-top: 15px;
      }
    }
    .lr-robort-left-face{
      margin-right: 64px;
    }
  }
</style>
