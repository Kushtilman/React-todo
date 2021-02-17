import React, {Component} from 'react';

import TodoList from "../todo-list";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import AddItem from "../add-item";
import '../../main.scss';


export default class App extends Component {
    maxId = 0;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Learn React'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
                // todoData.splice(idx, 1); вот так делать нельзя, поскольку мы меняем состояние (существующий массив)
            const newArray = [ //в этой функции мы создаём новый массив от начала до индекса, который удаляется и от индекса до конца, а затем склеиваем их спредами в переменной
                ...todoData.slice(0, idx),
                ...todoData.slice(idx +1)
            ];

            return {
                todoData: newArray
            }
        })
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text)

        this.setState(({ todoData }) => {
            const oldArray = [
                ...todoData,
                newItem
            ];

            return {
                todoData: oldArray
            }
        })
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName] };

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx +1)
        ];
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        })
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        })
    };

    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    };

    onSearchChange = (term) => {
        this.setState({ term });
    };

    filter(items, filter) {
        switch (filter) {
            case 'all': return items;
            case 'active': return items.filter((item) => !item.done);
            case 'done': return items.filter((item) => item.done);
            default: return items;
        }
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    render() {
        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(
            this.search(todoData, term), filter);
        const doneCount = todoData.filter(
            (el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className='todo-wrap'>
                <AppHeader toDo={ todoCount } done={ doneCount } />
                <div className="top-panel d-flex justify-content-between">
                    <SearchPanel
                        onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange} />
                </div>
                <TodoList
                    todos = { visibleItems }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone={ this.onToggleDone }
                />
                <AddItem
                    todos = { this.state.todoData }
                    onAddItem = { this.addItem }
                />
            </div>
        )
    };
}
