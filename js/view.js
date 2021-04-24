import AddTodo from './components/addTodo.js';
import Modal from './components/modal.js';
import Search from './components/search.js';

export default class View {

    constructor() {
        this.model = null;
        this.table = document.getElementById('table');

        this.addTodoFrom = new AddTodo();
        this.addTodoFrom.onClick( (t,d) => this.addTodo(t, d) );

        this.modal = new Modal();
        this.modal.onClick( ( id, data ) => this.editTodo(id, data)  );

        this.searchFrom = new Search();
        this.searchFrom.onClick((r,s) => this.searchTodo(r,s));

        this.flag = false;
    }

    setModel(model) {
        this.model = model;
    }

    render(){
        const todos = this.model.getTodos();
        if(todos && todos.length > 0){
            todos.forEach( t => this.createRow(t));
        }
    }

    addTodo(title, description) {  
        const todo = this.model.addTodo(title, description);
        this.createRow(todo);
    }

    editTodo(id, data){
        console.log(id, data);
        this.model.editTodo(id, data);
        const row = document.getElementById(id);
        row.children[0].innerText = data.title;
        row.children[1].innerText = data.description;
        row.children[2].children[0].checked = data.completed;
    }

    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    toogleCompleted(id){
        this.model.toogleCompleted(id);
    }

    searchTodo(rvalue, ssearch){

        const todos = this.model.getTodos();
        const todorows = document.getElementsByClassName('todo-row');
        const rows = Array.from(todorows);

        for(let i=0; i<rows.length; i++)
        {
            rows[i].remove();
        }    
        
       if(rvalue === 'completed'){
            for(let todo of todos)
            {
                if(todo.completed && (todo.title.includes(ssearch)||todo.description.includes(ssearch)))
                    this.createRow(todo);
            }
            
        }
        else if(rvalue === 'uncompleted'){
            for(let todo of todos)
            {
                if(!todo.completed && (todo.title.includes(ssearch)||todo.description.includes(ssearch)))
                    this.createRow(todo);
            }
        }
        else if((rvalue === 'all' || rvalue === '') )
        {
            for(let todo of todos)
            {
                if(todo.title.includes(ssearch)||todo.description.includes(ssearch))
                    this.createRow(todo);
            }
        }
    }

    createRow(todo){
        const row = table.getElementsByTagName('tbody')[0].insertRow();
        row.setAttribute('id', todo.id);
        row.setAttribute('class','todo-row');
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center">
            </td>
            <td class="text-right">
            </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toogleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1')
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-bs-toggle', 'modal');
        editBtn.setAttribute('data-bs-target', '#modal');
        editBtn.onclick = () => this.modal.setValues( {
            id: todo.id,
            title: row.children[0].innerText,
            description: row.children[1].innerText,
            completed: row.children[2].children[0].checked
        } )
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);
    }
}