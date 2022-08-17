<template>
  <nav>
    <ul class="d-flex list-unstyled">
      <li class="mx-3">
        <router-link to="/">Home</router-link>
      </li>
      <li class="mx-3">
        <router-link to="/about">About</router-link>
      </li>
      <li class="mx-3">
        <router-link to="/test">test</router-link>
      </li>
      <li class="mx-3">
        字型：
        <ChangeFontSize></ChangeFontSize>
      </li>
    </ul>

  </nav>
  <router-view />
</template>

<script>
import ChangeFontSize from '@/components/ChangeFontSize.vue'
export default {
  components: {
    ChangeFontSize
  },

  mounted () {
  }
}
</script>

<style lang="scss">
@import "@/assets/stylesheets/all.scss";
</style>
