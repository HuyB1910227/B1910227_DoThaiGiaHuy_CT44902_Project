import Cookies from "js-cookie";
import { defineStore } from "pinia";
import router from '../router/index';
import AdminService from '../services/admin.service';
export const useAdminAuthStore = defineStore('AdminAuthStore', {
    state: () => ({
        token: "",
        isAuth: false,
    }),
    actions: {
        async logout () {
            try {
                const headers = {
                    Authorization: `Bearer ${this.token}`
                };
                await AdminService.logout({headers});
                Cookies.remove("adminToken");
                this.token = "";
                this.isAuth = false;
                router.push("admin/login");
            } catch (error) {
                console.log(error);
            }
        }
    }
})