<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card m-2 border-0">
                <div class="card-header border-0 bg-white">
                    <h4 class="font-weight-bolder text-uppercase text-primary opacity-7 ">Danh mục sản phẩm</h4>
                    <div class="row">
                        <div class="col p-1">
                            <router-link to="/categories/add" class="btn btn-outline-primary"><i
                                    class="fa-solid fa-plus"></i> Thêm danh mục</router-link>
                        </div>
                        <div class="col">
                            <InputSearch v-model="searchText" class="mt-2" />
                        </div>
                    </div>

                </div>

                <div class="card-body">
                    <div class="table-responsive p-0">
                        <table class="table align-items-center justify-content-center mb-0" id="products-table">
                            <thead>
                                <tr>
                                    <th class="text-uppercase text-secondary opacity-7">STT</th>
                                    <th class="text-uppercase text-secondary opacity-7">Hình ảnh</th>
                                    <th class="text-uppercase text-secondary opacity-7">Tên</th>
                                    <th class="text-uppercase text-secondary opacity-7">Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-if="filteredDataCount > 0" v-for="(category, index) in filteredData"
                                    :key="category._id">
                                    <td> {{ ++index }}</td>
                                    <td>
                                        <img :src="getImageURL(category)" alt="">
                                    </td>
                                    <td>{{ category.name }}</td>

                                    <td>
                                        <router-link :to="{
                                            name: 'category.edit',
                                            params: { id: category._id },
                                        }" class="btn btn-warning me-1 text-white"> <i
                                                class="fa-solid fa-pen-to-square"></i>

                                        </router-link>


                                        <button class="button-del" @click="deleteCategory(category._id)">
                                            <i class="fa fa-trash"></i>
                                        </button>

                                    </td>

                                </tr>
                                <tr v-else>
                                    <td colspan="4" class="text-center fst-italic fw-bolder">
                                        Không tìm thấy dữ liệu phù hợp...
                                    </td>
                                    
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from '../components/InputSearch.vue';
import CategoryService from '../services/category.service';
export default {
    components: {
        InputSearch,
    },
    data() {
        return {
            categories: [],
            searchText: ""
        };
    },
    computed: {
        categoryStrings() {
            return this.categories.map((category) => {
                const { name } = category;
                return [name].join("");
            });
        },
        filteredData() {
            if (!this.searchText)
                return this.categories;
            return this.categories.filter((category, index) => {
                return this.categoryStrings[index].includes(this.searchText);
            });
        },
        filteredDataCount() {
            return this.filteredData.length;
        },
    },
    methods: {
        async retriveCategory() {
            try {
                this.categories = await CategoryService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCategory(id) {
            if (confirm("Bạn chắc chắn muốn xóa liên hệ này?")) {
                try {
                    await CategoryService.delete(id);

                    this.retriveCategory();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        refreshList() {
            this.retriveCategory();

        },
        getImageURL(category) {
            return `http://localhost:9000/${category.image}`;
        }
    },
    mounted() {
        this.refreshList();
    }
}
</script>
<style scoped>
#products-table th,
#products-table td {
    padding-left: 0px !important;
}

.card {
    background-color: #fff;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1);
}

td img {
    width: 100px;
    height: 100px;
}

.button-del {
    background-color: #ea4c4c;
    border-radius: 8px;
    border-style: none;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
    line-height: 20px;
    list-style: none;
    margin: 0;
    outline: none;
    padding: 10px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: color 100ms;
    vertical-align: baseline;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.button-del:hover,
.button-del:focus {
    background-color: #f08282;
}</style>