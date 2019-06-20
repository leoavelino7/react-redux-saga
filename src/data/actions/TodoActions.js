const TODO_CREATE = "TODO_CREATE",
    TODO_UPDATE = "TODO_UPDATE",
    TODO_REMOVE = "TODO_REMOVE",
    TODO_CLEAR = "TODO_CLEAR";

export const create = description => {
    return {
        type: TODO_CREATE,
        data: {
            description
        }
    };
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
    };
};
export const clear = () => {
    return {
        type: TODO_CLEAR
    };
}