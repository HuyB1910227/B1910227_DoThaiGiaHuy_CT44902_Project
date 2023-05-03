import createApiClient from "./api.service";

class CategoryService {
    constructor (baseUrl = "/api/categories") {
        this.api = createApiClient(baseUrl);
    }
    
    async getAll () {
        return (await this.api.get("/")).data;
    }

    async get (id) {
        return (await this.api.get(`/${id}`)).data;
    }
    
}

export default new CategoryService();