import {
    TodoService
} from "../services/TodoService";

export const TODO_LIST      = "TODO_LIST",
    TODO_LIST_RESPONSE      = "TODO_LIST_RESPONSE",
    TODO_CREATE             = "TODO_CREATE",
    TODO_CREATE_RESPONSE    = "TODO_CREATE_RESPONSE",
    TODO_UPDATE             = "TODO_UPDATE",
    TODO_REMOVE             = "TODO_REMOVE",
    TODO_CLEAR              = "TODO_CLEAR";

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
    return async dispatch => {
        await TodoService.update(item);
        dispatch({
            type: TODO_UPDATE,
            data: {
                item
            }
        })
    }
};

export const remove = itemId => {
    return async dispatch => {
        await TodoService.remove(itemId);
        dispatch({
            type: TODO_REMOVE,
            data: {
                itemId
            }
        })
    }
};

export const clear = () => {
    return (dispatch, getState) => {
        const todoList = getState().TodoReducer;
        todoList.forEach(item => {
            if (item.isChecked) {
                TodoService.remove(item.id);
            }
        })
        dispatch({
            type: TODO_CLEAR
        });
    };
}