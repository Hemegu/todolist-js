export default class Search{
    constructor(){
        this.searchBtn = document.getElementById('search');
        this.selectRadio = document.getElementsByName('type');
        this.searchString = document.querySelector('.form-control');
    }

    onClick(callback){
        this.searchBtn.onclick = (e) =>
        {
            e.preventDefault();
            let radioValue = '';
            let radioSelected;
            for(let radio of this.selectRadio){
                if(radio.checked)
                {
                    radioSelected = radio;
                    radioValue = radioSelected.value;
                }
            }

            console.log(radioValue+' '+this.searchString.value);
            callback(radioValue,this.searchString.value);
            this.searchString.value = '';
            if(radioSelected !== undefined)
                radioSelected.checked = false;
        }
    }
}