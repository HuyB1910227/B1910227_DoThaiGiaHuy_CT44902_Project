<template>
    <div class="row border ">
        <CategoryCard v-for="(category, index) in categories" :key="category._id" :category="category"/>
    </div>
</template>

<script>
import CategoryCard from './CategoryCard.vue';
import CategoryService from '../../services/category.service';
export default {
    components: {
      CategoryCard
    },
    data () {
        return {
            categories: [],
        };
    },
    methods: {
        async retriveCategory () {
            try {
                this.categories = await CategoryService.getAll();
                console.log(this.categories);
            } catch (error) {
                console.log(error);
            }
        },
        
        refreshList() {
            this.retriveCategory();
           
        },
        getImageURL(category) {
            return `http://localhost:9000/${category.image}`;
        }
     },
    mounted () {
        this.refreshList();
    }
}
</script>
