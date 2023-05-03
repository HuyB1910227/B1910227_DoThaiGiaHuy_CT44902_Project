import createApiClient from "./api.service";
class OrderService {
    constructor (baseUrl = "/api/order") {
        this.api = createApiClient(baseUrl);
    }
    async getAll () {
        return (await this.api.get("/")).data;
    }
    async get (id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async execute (id, data) {
        return (await this.api.patch(`/${id}`, data)).data;
    }
}

export default new OrderService();