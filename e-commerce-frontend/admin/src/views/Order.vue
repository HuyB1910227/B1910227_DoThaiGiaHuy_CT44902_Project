<template>
     <div class="row">
            <div class="col-md-12">
                <div class="card m-2 border-0">
                    <div class="card-header border-0 bg-white">
                        <h4 class="font-weight-bolder text-uppercase text-primary opacity-7 ">Quản lý đặt hàng</h4>
                        <div class="row">
                        <div class="col p-1">
                            <!-- <router-link to="/orders/add" class="btn btn-outline-primary"><i class="fa-solid fa-plus"></i> Thêm sản phẩm</router-link> -->

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
                                        <th class="text-uppercase text-secondary opacity-7">Mã đơn</th>
                                        <th class="text-uppercase text-secondary opacity-7">Người nhận</th>
                                        <th class="text-uppercase text-secondary opacity-7">Liên hệ</th>
                                        <th class="text-uppercase text-secondary opacity-7">Tin nhắn</th>
                                        <th class="text-uppercase text-secondary opacity-7">Số lượng</th>
                                        <th class="text-uppercase text-secondary opacity-7">Tổng tiền</th>
                                        <th class="text-uppercase text-secondary opacity-7">Ngày đặt</th>
                                        <th class="text-uppercase text-secondary opacity-7">Trạng thái</th>
                                        <th class="text-uppercase text-secondary opacity-7">Thao tác</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-if="filteredDataCount > 0" v-for="(order, index) in filteredData" :key="order._id">
                                        <td>
                                            {{ order._id }}
                                        </td>
                                        <td>
                                            {{ order.name }}
                                        </td>
                                        <td>
                                            +{{ order.phone }} <br>
                                            +{{ order.email }}
                                        </td>
                                        <td>
                                            {{ order.message }}
                                        </td>
                                        <td>
                                            {{ order.details.length}}
                                        </td>
                                        <td>
                                            {{ order.total.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}) }}
                                        
                                        </td>
                                        <td>
                                            {{ formatDate(order.createdAt) }}
                                        </td>
                                        <td>
                                            <span v-if="order.status == 0" class="font-italic">Chờ xác nhận...</span>
                                            <span v-else-if="order.status == 1" class="font-italic font-weight-bold">Đã xác nhận</span>
                                            <span v-else-if="order.status == -1" class="font-italic font-weight-bold">Đã hủy</span>
                                        </td>
                                        <td>
                                            <button class="btn btn-outline-primary m-1" @click="fillDetails(order._id)" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                <i class="fa-solid fa-circle-info"></i>
                                            </button><br>
                                            <button class="btn btn-primary m-1" @click="confirm(order._id)" v-if="order.status == 0">
                                                <i class="fa-solid fa-check"></i>
                                            </button>
                                            <button class="btn btn-danger m-1" @click="cancel(order._id)" v-if="order.status == 0">
                                                <i class="fa-solid fa-ban"></i>
                                            </button>
                                            
                                        </td>
                                    </tr>
                                    <tr v-else>
                                        <td colspan="9" class="text-center fst-italic fw-bolder">
                                            Không tìm thấy dữ liệu phù hợp...
                                        </td>
                                    
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <!-- modal -->
                <div class="modal modal-xl fade" id="staticBackdrop"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" v-if="orderDetail != null">
                <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Đơn đặt hàng</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h5>Thông tin đơn hàng</h5>
                            <p>Mã vận đơn: {{ orderDetail._id}}</p>
                            <table class="table table-striped" >
                                <tr>
                                    <th>
                                        STT
                                    </th>
                                    <th>
                                        Mã sản phẩm
                                    </th>
                                    <th>
                                        Sản phẩm
                                    </th>
                                    <th>
                                        Số lượng
                                    </th>
                                    <th>
                                        Đơn giá
                                    </th>
                                    <th>
                                        Tổng
                                    </th>
                                </tr>
                                <tr v-for="(item, index) in orderDetail.details" key="item._id">
                                    <td>
                                        {{ ++index }}
                                    </td>
                                    <td>
                                        {{ item._id }}
                                    </td>
                                    <td>
                                        {{ item.name }}
                                    </td>
                                    <td>
                                        {{ item.quantity }}
                                    </td>
                                    <td>
                                        {{ item.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}) }}
                                    </td>
                                    <td>
                                        {{ (item.price * item.quantity).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}) }}
                                    </td>
                                </tr>
                                <tr col-span="5">
                                    <h5>Tổng cộng: {{ orderDetail.total.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}}</h5>
                                </tr>
                            </table>
                            <hr>
                            <h5>Thông tin khách hàng</h5>
                            <table class="table">
                                <tr>
                                    <th class="w-50">Họ tên người nhận:</th>
                                    <td>{{ orderDetail.name }}</td>
                                </tr>
                                <tr>
                                    <th class="w-50">Địa chỉ email:</th>
                                    <td>{{ orderDetail.email }}</td>
                                </tr>
                                <tr>
                                    <th class="w-50">Số điện thoại:</th>
                                    <td>{{ orderDetail.phone }}</td>
                                </tr>
                                <tr>
                                    <th class="w-50">Địa chỉ:</th>
                                    <td>{{ orderDetail.address }}</td>
                                </tr>
                                <tr>
                                    <th class="w-50">Hình thức thanh toán:</th>
                                    <td>{{ orderDetail.payment }}</td>
                                </tr>
                                <tr>
                                    <th class="w-50">Lời nhắn:</th>
                                    <td v-if="orderDetail.message == null" class="ft-italic">Không</td>
                                    <td>{{ orderDetail.message }}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
                            <!-- <button type="button" class="btn btn-primary">Understood</button> -->
                        </div>
                    
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import moment from 'moment';
import InputSearch from '../components/InputSearch.vue';
import OrderService from '../services/order.service';
export default {
    components: {
        InputSearch,
    },
    data () {
        return {
            orders: [],
            orderDetail: {
                name: "",
                email: "",
                phone: "",
                address: "",
                payment: "",
                message: "",
                details: [],
                total: 0

            },
            searchText: ""
        }
    },
    computed: {
        orderStrings() {
            return this.orders.map((order) => {
                const { _id, name, email, phone, address, total, status, message, createdAt } = order;
                return [_id, name, email, phone, address, total, status, message, createdAt].join("");
            });
        },
        filteredData() {
            if (!this.searchText)
                return this.orders;
            return this.orders.filter((order, index) => {
                return this.orderStrings[index].includes(this.searchText);
            });
        },
        filteredDataCount() {
            return this.filteredData.length;
        },
    },
    methods: {
        async retriveOrder () {
            try {
                this.orders = await OrderService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async confirm (id) {
            if(confirm("Bạn chắc chắn muốn xác nhận đơn hàng này!")){
                try {
                    await OrderService.execute(id, {status: 1});
                    this.retriveOrder();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async cancel (id) {
            if(confirm("Bạn chắc chắn muốn hủy đơn hàng này!")){
                try {
                    await OrderService.execute(id, {status: -1});
                    this.retriveOrder();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        fillDetails (id) {
            return this.orderDetail = this.orders.find((order) => order._id === id);
        },
        refreshList() {
            this.retriveOrder(); 
        },
        moment: function () {
            return moment();
        },
        formatDate (time) {
            return time.substring(0, 10);
        }
    },
    mounted () {
        this.refreshList();
    }
}
</script>