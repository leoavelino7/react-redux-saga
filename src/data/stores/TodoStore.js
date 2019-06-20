import Events from "events";

import AppDispatcher from "../dispatcher/appDispatcher";

import {
    TodoService
} from "../services/TodoService";

import TodoConstants from "../constants/TodoConstants";

const Channel = new Events.EventEmitter(),
    CHANGE_EVENT = "change";

let _todoList = [];

function createItem(description) {
    return TodoService.create({
            description,
            isChecked: false
        })
        .then(newItem => _todoList.push(newItem));
}

function updateItem(newItem) {
    const itemIndex = _todoList.findIndex(item => item.id === newItem.id);

    _todoList[itemIndex] = newItem;
    return TodoService.update(newItem);
}

function removeItem(id) {
    const itemIndex = _todoList.findIndex(item => item.id === id);

    _todoList.splice(itemIndex, 1);

    return TodoService.remove(id);
}

function clearAll() {
    const todo = [],
        done = [];

    _todoList.forEach(item => {
        (item.isChecked) ? done.push(item): todo.push(item);
    });

    done.forEach(item => removeItem(item.id));
    return _todoList = todo;
}

const TodoStore = {
    async getAll() {
        if (_todoList.length === 0) {
            _todoList = await TodoService.list();
        }
        return _todoList;
    },
    emitChange() {
        Channel.emit(CHANGE_EVENT);
    },
    addChangeListener(callback) {
        Channel.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback) {
        Channel.removeListener(CHANGE_EVENT, callback);
    }
}

async function handleAction(action) {
    // eslint-disable-next-line default-case
    switch (action.actionType) {
        case TodoConstants.TODO_CREATE:
            const {
                description
            } = action.data;
            await createItem(description);
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_UPDATE:
            const {
                item
            } = action.data;
            await updateItem(item);
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_REMOVE:
            const {
                itemId
            } = action.data;
            await removeItem(itemId);
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_CLEAR:
            await clearAll();
            TodoStore.emitChange();
            break;
    }
}

TodoStore.dispatchToken = AppDispatcher.register(handleAction);
export default TodoStore;