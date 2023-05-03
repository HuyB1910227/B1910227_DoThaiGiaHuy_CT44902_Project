<template>
    <button @click="goBack" class="btn btn-primary"><i class="fa-sharp fa-solid fa-arrow-left"></i> Trở về</button>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    },
  };
  </script>