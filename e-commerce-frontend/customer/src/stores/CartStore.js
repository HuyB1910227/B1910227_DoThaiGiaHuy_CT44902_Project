import { defineStore } from "pinia";
import router from '../router/index';
import CartService from '../services/cart.service';
import ProductService from '../services/product.service';

export const useCartStore = defineStore('CartStore', {
    state: () => ({
        cart: {
            items: [],
            total: 0
        },
        // cartLength: 0
    }),
    getters: {
        // getLength: (state) => {
            
        //     return state.cart.items.lenght;
         
        // }
    },
    actions: {
        async getCart() {
            try {
                const cart = await CartService.get();
                // console.log(this.cart);
                return cart;
            } catch (error) {
                console.log(error);
            }
        },
        async getItemsInCart() {
            const cart = await this.getCart();
            this.cart.items = [];
            this.cart.total = cart.total;
            for (const item of cart.items) {
                const foundItem = await ProductService.get(item.productId);
                foundItem.quantity = item.quantity;
                this.cart.items.push(foundItem);
            }
            
        },
        async addToCart(productId, quantity) {
            try {
                const data = {
                    productId,
                    quantity
                }
                await CartService.addToCart(data);
                
                await this.getItemsInCart();
                // this.getLength();
                
            } catch (error) {
                console.log(error);
            }
        },
        
        
    }
})