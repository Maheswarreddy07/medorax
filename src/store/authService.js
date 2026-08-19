import axios from "axios";

const api = axios.create({

    baseURL: import.meta.env.VITE_API_BASE_URL,

    timeout: 30000,

    headers: {
        "Content-Type": "application/json"
    }

});

const authService = {

    login(data) {

        return api.post("/auth/login", data);

    },

    logout() {

        return api.post("/auth/logout");

    },

    refreshToken() {

        return api.post("/auth/refresh");

    }

};

export default authService;