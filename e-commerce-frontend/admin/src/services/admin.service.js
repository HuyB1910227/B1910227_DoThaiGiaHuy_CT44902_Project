import createApiClient from "./api.service";
class UserService {
    constructor (baseUrl = "/api/admin") {
        this.api = createApiClient(baseUrl);
    }

    async login (data) {
        return (await this.api.post("/login", data)).data;
    }

    async logout () {
        return (await this.api.post("/logout")).data;
    }

}

export default new UserService();