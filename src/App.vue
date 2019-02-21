<template>
  <div id="app">
    <div>
      <router-view/>
    </div>
    <div v-if="!preCacheExtraFile">
      <img src="./assets/loading.gif" >
    </div>
  </div>
</template>

<script>
// import router from './router'
export default{
  name: 'App',
  data() {
    return {
      preCacheExtraFile: true // 为了让 loading.gif 能被serviceWorker 捕捉到
    }
  }
}
</script>
