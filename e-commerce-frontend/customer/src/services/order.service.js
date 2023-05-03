import createApiClient from "./api.service";
class OrderService {
    constructor (baseUrl = "/api/order") {
        this.api = createApiClient(baseUrl);
    }
    async create (data) {
        return (await this.api.post("/", data)).data;
    }

    async personalOrder() {
        return (await this.api.get("/customer")).data;
    }
    async execute (id, data) {
        return (await this.api.patch(`/${id}`, data)).data;
    }
}

export default new OrderService();
