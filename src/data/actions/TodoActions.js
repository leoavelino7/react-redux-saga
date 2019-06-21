import {
    TodoService
} from "../services/TodoService";

export const TODO_LIST = "TODO_LIST",
    TODO_CREATE = "TODO_CREATE",
    TODO_UPDATE = "TODO_UPDATE",
    TODO_REMOVE = "TODO_REMOVE",
    TODO_CLEAR = "TODO_CLEAR";

export const list = () => {
    return async dispatch => {
        const todoList = await TodoService.list();
        dispatch({
            type: TODO_LIST,
            data: {
                todoList
            }
        });
    }
}

export const create = description => {
    return async dispatch => {
        const item = await TodoService.create({
            description,
            isChecked: false
        });
        dispatch({
            type: TODO_CREATE,
            data: {
                item
            }
        });
    };
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