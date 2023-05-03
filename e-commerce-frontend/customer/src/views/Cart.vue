<template>
  
  <h2 class="mt-2">Giỏ hàng của bạn</h2>
  <div v-if="cart.items.length == 0" class="text-center">
    <img src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" alt=""
      class="w-50">
  </div>
  <div v-else class="row ">
    <ul class="col-7 col-lg-7 col-sm-12">
      <CartItem v-for="item in cart.items" :key="item.productId" :item="item" @removeFromCart="removeFromCart" @updateItem="updateItemInCart"/>
    </ul>
    <div class="col-5 col-lg-5 col-sm-12">
      <div class="order_div">
        <h2>Đơn hàng</h2>
        <table class="table">
          <tr v-for="item in cart.items" :key="item.productId">
            <th class="text-start">
              {{ item.name }}
            </th>
            <td class="text-end">
              {{ item.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})  }} x {{ item.quantity }}
            </td>
          </tr>
          <tr>
            <th class="text-start">
              Tổng cộng
            </th>
            <td class="text-end">
              {{ cart.total.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})  }}
            </td>
          </tr>
        </table>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="fillData">ĐẶT HÀNG</button>
        <!-- Modal -->
        <div class="modal modal-lg fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Đơn đặt hàng</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <h5>Thông tin đơn hàng</h5>
                <table class="table table-striped">
                  <tr v-for="item in cart.items" :key="item.productId">
                    <th class="text-start">
                      {{ item.name }}
                    </th>
                    <td class="text-end">
                      {{ item.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})  }} x {{ item.quantity }} = {{ (item.price * item.quantity).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})  }}
                    </td>
                  </tr>
                  <tr>
                    <th class="text-start">
                      TỔNG CỘNG
                    </th>
                    <td class="text-end ">
                      {{ cart.total.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})  }}
                    </td>
                  </tr>
                </table>
                <hr>
                <h5>Thông tin khách hàng</h5>
                <Form :validation-schema="orderFormSchema">
                    <div class="form-group m-1 text-start">
                        <label for="name" class="mb-2 text-">Họ tên người nhận:</label>
                        <Field type="text" name="name" class="form-control " v-model="orderLocal.name" />
                        <ErrorMessage name="name" class="error-feedback" />
                    </div>
                    <div class="form-group m-1 text-start">
                        <label for="email" class="mb-2">Email:</label>
                        <Field type="text" name="email" class="form-control " v-model="orderLocal.email" />
                        <ErrorMessage name="email" class="error-feedback" />
                    </div>
                    <div class="form-group m-1 text-start">
                        <label for="phone" class="mb-2">Liên hệ:</label>
                        <Field type="text" name="phone" class="form-control " v-model="orderLocal.phone" />
                        <ErrorMessage name="phone" class="error-feedback" />
                    </div>
                    <div class="form-group m-1 text-start">
                        <label for="address" class="mb-2">Địa chỉ:</label>
                        <Field type="text" name="address" class="form-control" v-model="orderLocal.address"/>
                        <ErrorMessage name="address" class="error-feedback"/>
                    </div>
                    <div class="form-group m-1 text-start">
                        <label for="payment" class="mb-2">Hình thức thanh toán:</label>
                        <br>
                        <input type="radio" name="payment" id="TM" value="TM" checked> Tiền mặt <br>
                        <input type="radio" name="payment" id="" disabled class="text-opacity-5"> Ví điện tử (Chưa hỗ trợ) <br>
                        <input type="radio" name="payment" id="" disabled class="text-opacity-5"> Thẻ ngân hàng (Chưa hỗ trợ)
                    </div>
                    <div class="form-group m-1 text-start">
                        <label for="message" class="mb-2">Yêu cầu:</label>
                        <textarea name="message" class="form-control" v-model="orderLocal.message"></textarea>
                    </div>
                    <br>
                    <div class="form-group m-1">
                        <button @click="submitOrder" class="btn btn-primary w-100" data-bs-dismiss="modal">
                            Xác nhận đặt hàng
                        </button>
                    </div>
                  </Form>
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
import { mapActions } from 'pinia';
import CartItem from '../components/cart/CartItem.vue';
import { useCartStore } from '../stores/CartStore';
import CartService from '../services/cart.service';
import OrderService from '../services/order.service';
import CustomerService from "../services/customer.service";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
  components: {
    CartItem,
    Form,
    Field,
    ErrorMessage
  },
  data () {
    const orderFormSchema = yup.object().shape({
      fullname: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải có ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều hơn 50 ký tự."),
      email: yup
        .string()
        .required("Chưa nhập địa chỉ email.")
        .email("E-mail không đúng.")
        .max(50, "email chỉ chứa tối đa 50 ký tự."),
      address: yup
        .string()
        .max(255, "Địa chỉ chỉ chứa tối đa 255 ký tự."),
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
      
    });
    return {
      customer: null,
      orderLocal: [],
      orderFormSchema,
    }
  },
  methods: {
    ...mapActions(useCartStore, {
      getItemsInCart: "getItemsInCart",
    }),
    async removeFromCart(productId) {
      try {
        console.log(productId)
        const data = {
          productId: productId
        }
        await CartService.removeFromCart(data);
        this.getItemsInCart();
        console.log("remove from cart");
      } catch (error) {
        console.log(error);
      }
    },
    async updateItemInCart(productId, quantity) {
      try {
        const data = {
          productId,
          quantity
        }
        await CartService.updateCart(data);
        this.getItemsInCart();

      } catch (error) {
        console.log(error);
      }
    },
    async getInforUser() {
      try {
        const document = await CustomerService.profile();
        return this.customer = document;
      } catch (error) {
        console.log(error);
      }
    },
    async submitOrder () {
      try {
        const data = {
          name: this.orderLocal.name,
          email: this.orderLocal.email,
          phone: this.orderLocal.phone,
          message: this.orderLocal.message,
          address: this.orderLocal.address,
          payment: "TM"
        }
        await OrderService.create(data);
        this.getItemsInCart();
        alert("Đặt hàng thành công!");
        console.log("add order");
      } catch (error) {
        console.log(error)
      }
    },
    fillData () {
      this.orderLocal = this.customer;
      this.orderLocal.name = this.customer.fullname;
      return this.orderLocal;
    }
  },
  computed: {
    cart() {
      return useCartStore().cart;
    }
  },
 
  mounted() {
    this.getItemsInCart();
    this.getInforUser();
  }


};
</script>

<style scoped>

section {
  margin: 2rem auto;
  max-width: 40rem;
}

h2 {
  color: #292929;
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 1rem;
}

h3 {
  text-align: center;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.order_div {
  margin: 1rem auto;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  text-align: center;
  /* max-width: 50rem; */
}

  @import "@/assets/form.css";

</style>