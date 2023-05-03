import createApiClient from "./api.service";
class CartService {
    constructor (baseUrl = "/api/cart") {
        this.api = createApiClient(baseUrl);
    }
    async get () {
        return (await this.api.get("/")).data;
    }
    
    async addToCart (data) {
        return (await this.api.put(`/add`, data)).data;
    }
    async removeFromCart(data) {
        return (await this.api.put("/remove", data)).data;
    }
    async updateCart(data) {
        return (await this.api.put("/update", data)).data;
    }
    // async get (id) {
    //     return (await this.api.get(`/${id}`)).data;
    // }
    // async update (id, data) {
    //     return (await this.api.put(`${id}`, data)).data;
    // }
    // async delete (id) {
    //     return (await this.api.delete(`/${id}`)).data;
    // }
}

export default new CartService();