import AppDispatcher from "../dispatcher/appDispatcher";
import TodoConstants from "../constants/TodoConstants";

const TodoActions = {
    create(description) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_CREATE,
            data: {
                description
            }
        });
    },
    update(item) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_UPDATE,
            data: {
                item
            }
        });
    },
    remove(itemId) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_REMOVE,
            data: {
                itemId
            }
        });
    },
    clear() {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_CLEAR
        });
    }
}

export default TodoActions;