import * as TodoConstants from "../actions/TodoActions";

const TodoReducer = (todoList = [], action) => {

    switch(action.type) {
        case TodoConstants.TODO_CREATE:
            return [
                ...todoList,
                {
                    id: Date.now(),
                    isChecked: false,
                    description: action.data.description
                }
            ];

        case TodoConstants.TODO_REMOVE:
            //return todoList.filter(item => item.id !== action.data.itemId);
            const itemIndex = todoList.findIndex(item => item.id === itemIndex);
            return [
                ...todoList.slice(0, itemIndex),
                ...todoList.slice(itemIndex + 1)
            ];

        default: 
            return todoList;
    }
}

export default TodoReducer;
