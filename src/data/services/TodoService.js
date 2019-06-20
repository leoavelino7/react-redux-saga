import {
    ApiService
} from "./ApiService";

const ENDPOINT = "todo";

export const TodoService = {
    list() {
        return ApiService.get(ENDPOINT);
    },
    create(item) {
        return ApiService.post(ENDPOINT, item);
    },
    update(item) {
        return ApiService.put(ENDPOINT, item);
    },
    remove(itemId) {
        return ApiService.delete(ENDPOINT, itemId);
    }
}