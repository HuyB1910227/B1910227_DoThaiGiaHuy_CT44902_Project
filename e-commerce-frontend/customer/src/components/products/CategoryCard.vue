<template>
  <div class="border p-2" style="height: 200px; width: 150px; display:inline-block; cursor: pointer;" @click="goToCategory(category._id)">
    <div class="cardbox-shadow text-center">
      <img class="card-img-top rounded-circle" :src="getImageURL(category)" alt="Card image cap"
        style="height: 110px; width: 110px;">
      <div class="card-body p-2">
        <h5 class="card-title ">{{ category.name }}</h5>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },


  methods: {
    getImageURL(category) {
      return `http://localhost:9000/${category.image}`;
    },
    goToCategory(productId) {
      this.$router.push({ name: "category.allProduct", params: { id: productId } });
    },
  },
};
</script>