import {
    TodoService
} from "../services/TodoService";

export const TODO_LIST = "TODO_LIST",
    TODO_LIST_RESPONSE = "TODO_LIST_RESPONSE",
    TODO_CREATE = "TODO_CREATE",
    TODO_CREATE_RESPONSE = "TODO_CREATE_RESPONSE",
    TODO_UPDATE = "TODO_UPDATE",
    TODO_REMOVE = "TODO_REMOVE",
    TODO_CLEAR = "TODO_CLEAR";

export const list = () => {
    return {
        type: TODO_LIST
    }
};

export const listResponse = todoList => {
    return {
        type: TODO_LIST_RESPONSE,
        data: {
            todoList
        }
    }
};

export const create = description => {
    return {
        type: TODO_CREATE,
        data: {
            description
        }
    }
};

export const createResponse = newItem => {
    return {
        type: TODO_CREATE_RESPONSE,
        data: {
            newItem
        }
    }
};

export const update = item => {
    return {
        type: TODO_UPDATE,
        data: {
            item
        }
    };
};

export const remove = itemId => {
    return {
        type: TODO_REMOVE,
        data: {
            itemId
        }
    }
};

export const clear = () => {
    return {
        type: TODO_CLEAR
    };
}