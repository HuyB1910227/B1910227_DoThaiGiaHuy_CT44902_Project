<template>
    <div class="row">
            <div class="col-md-12">
                <div class="card m-2 border-0">
                    <div class="card-header border-0 bg-white">
                        <h4 class="font-weight-bolder text-uppercase text-primary opacity-7 ">Danh mục khách hàng</h4>
                        <div class="row">
                        <div class="col p-1">
                            <!-- <router-link to="/products/add" class="btn btn-outline-primary"><i class="fa-solid fa-plus"></i> Thêm sản phẩm</router-link> -->

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
                                        <th class="text-uppercase text-secondary opacity-7">Họ và tên</th>
                                        <th class="text-uppercase text-secondary opacity-7">Email</th>
                                        <th class="text-uppercase text-secondary opacity-7">SĐT</th>
                                        <th class="text-uppercase text-secondary opacity-7">Địa chỉ</th>
                                      

                                    </tr>
                                </thead>
                                    <tr v-if="filteredDataCount > 0" v-for="(customer, index) in filteredData" :key="customer._id" >
                                        <td>{{ ++index }}</td>
                                        <td>{{ customer.fullname }}</td>
                                        <td>{{ customer.email }}</td>
                                        <td>{{ customer.phone }}</td>
                                        <td>{{ customer.address }}</td>

                                    </tr>
                                    <tr v-else>
                                        <td colspan="5" class="text-center fst-italic fw-bolder">
                                            Không tìm thấy dữ liệu phù hợp...
                                        </td>
                                    
                                    </tr>
                                <tbody>
                                    
                                        
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
import CustomerService from '../services/customer.service';
export default {
    components: {
        InputSearch,
    },
    data () {
        return {
            customers: [],
            searchText: ""
        };
    },
    computed: {
            customerStrings() {
                return this.customers.map((customer) => {
                    const { fullname, email, phone, address } = customer;
                    return [fullname, email, phone, address].join("");
                });
            },
            filteredData() {
                if (!this.searchText)
                    return this.customers;
                return this.customers.filter((customer, index) => {
                    return this.customerStrings[index].includes(this.searchText);
                });
            },
            filteredDataCount() {
                return this.filteredData.length;
            },
        },
    methods: {
        async retriveCategory () {
            try {
                this.customers = await CustomerService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        
        refreshList() {
            this.retriveCategory();
           
        },
      
     },
    mounted () {
        this.refreshList();
    }
}
</script>
<style scoped>
    #products-table th,
    #products-table td {
        padding-left: 0px !important;
    }
    
    .card  {
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
        }
</style>