import createApiClient from "./api.service";
class CustomerService {
    constructor (baseUrl = "/api/customers") {
        this.api = createApiClient(baseUrl);
    }
    
    async getAll () {
        return (await this.api.get("/")).data;
    }
}

export default new CustomerService();