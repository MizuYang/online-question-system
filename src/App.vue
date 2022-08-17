<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/test">test</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import "@/assets/stylesheets/all.scss";
</style>
