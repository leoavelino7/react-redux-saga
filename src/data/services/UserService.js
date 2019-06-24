import {
    ApiService
} from "./ApiService";

const ENDPOINT = "account";

export const UserService = {
    list() {
        return ApiService.get(ENDPOINT);
    },
    create(user) {
        return ApiService.post(ENDPOINT, user);
    },
    update(user) {
        return ApiService.put(ENDPOINT, user);
    },
    remove(userId) {
        return ApiService.delete(ENDPOINT, userId);
    }
}