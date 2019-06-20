import React, { Component } from "react";

class TodoItem extends Component {
    static defaultProps = {
        item: {},
        onRemove: () => {},
        onUpdate: () => {}
    }

    constructor(props) {
        super(props);

        this.input = React.createRef();

        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.check = this.check.bind(this);
    }

    remove() {
        const { props } = this;
        props.onRemove(props.item.id);
    }

    update() {
        const { props } = this,
            { item } = props;

        item.description = this.input.current.value;
        props.onUpdate(item);
    }

    check() {
        const { props } = this,
            { item } = props;
        
        item.isChecked = !item.isChecked;
        props.onUpdate(item);
    }

    render() {
        const { props } = this,
            { item } = props;

        return (
            <li className="todo-list-item">
                <input className="tw-check" type="checkbox" checked={item.isChecked} onChange={this.check} />
                <input className="tw-input" ref={this.input} type="text" disabled={item.isChecked} defaultValue={item.description} onBlur={this.update}/>
                <button className="tw-btn" onClick={this.remove}>X</button>
            </li>
        );
    }
}

export default TodoItem;