import createApiClient from "./api.service";
class CustomerService {
    constructor (baseUrl = "/api/customers") {
        this.api = createApiClient(baseUrl);
    }
    
    async profile () {
        return (await this.api.get("/profile")).data;
    }
}

export default new CustomerService();