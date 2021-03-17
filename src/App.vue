<template>
  <nav class="bg-gradient-to-r from-purple-500 to-pink-500 py-2 flex justify-center absolute top-0 z-50 w-full">
    <router-link to="/" class="font-medium text-gray-50 hover:underline mx-6 my-2 cursor-pointer">Home</router-link>
    <router-link to="/quiz" class="font-medium text-gray-50 hover:underline mx-6 my-2 cursor-pointer">Assessment Quiz</router-link>
  </nav>
  <router-view class="relative z-0"></router-view>
</template>



<style>
#app {
  font-family: Commissioner, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
