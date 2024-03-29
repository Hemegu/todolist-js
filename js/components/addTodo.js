import Alert from './alert.js';

export default class AddTodo {
    constructor(){
        this.btn = document.getElementById('add');
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');

        this.alert = new Alert('alert');
    }

    onClick(callback){
        this.btn.onclick = () => {
            console.log("apretaste el boton add");
            if(title.value === '' && description.value === ''){
                this.alert.show('Title and description is required');
                return;
            }

            this.alert.hide();

            callback(this.title.value, this.description.value);
            this.title.value = '';
            this.description.value = '';

        }
    }
}