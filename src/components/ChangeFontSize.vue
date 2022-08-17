<template>
  <select @change="changeSize" v-model="currentFontSize">
    <option :value="font" v-for="(style, font) in fontSize" :key="font">
      {{ font }}
    </option>
  </select>
</template>

<script>
export default {

  data () {
    return {
      fontSize: {
        大: 'font-size: 25px !important;',
        中: 'font-size: 20px !important;',
        小: 'font-size: 16px !important;'
      },
      currentFontSize: localStorage.getItem('fontSize') || '小'
    }
  },

  watch: {
  },

  methods: {
    //* 切換文字大小
    changeSize (e) {
      const fs = e.target.value
      localStorage.setItem('fontSize', fs)
      document.body.style = this.fontSize[fs]
    }
  },

  mounted () {
    document.body.style = this.fontSize[this.currentFontSize]
  }

}
</script>

<style lang='scss' scope></style>
