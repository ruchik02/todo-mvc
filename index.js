class todo{
    constructor(text,isCompleted){
        this.text=text;
        this.isCompleted=isCompleted;
    }
}
class myTodo{
    constructor(){
        this.todos=[];
    }
    count(){

    }
    remove(){

    }
    toggle(){

    }
    add(task){
        this.todos.push(task);

    }
    clearCompleted(){

    }
    remove(){

    }
    showCompleted(){

    }
    showActive(){

    }
    show(){
        let todos1=document.getElementById("todos");
        console.log(todos,"38");
        todos1.innerHTML="";
        let html=``;
        for(let todo1 in this.todos){
            if(this.todos[todo1].completed===true){
                html+=`<div class="todos" id="todos">
                <ul id="ul" class="todo-list">
                    <li>
                       <input type="checkbox" name="checkbox" id="checker" class="check-box">
                       <label for="todoLbael" class="data">${this.todos[todo1].text}</label>
                       <label for="todoCross" class="cross">X</label>
                   </li>
                </ul>
             </div>`

            }
            else{
                html+=`<div class="todos" id="todos">
                <ul id="ul" class="todo-list">
                    <li>
                       <input type="checkbox" name="checkbox" id="checker" class="check-box">
                       <label for="todoLbael" class="data">${this.todos[todo1].text}</label>
                       <label for="todoCross" class="cross">X</label>
                   </li>
                </ul>
             </div>`
            }
        }
        todos1.innerHTML=html;

    }
}
let inputText=document.getElementById('input-text');
let obj=new myTodo();
inputText.addEventListener("keypress",function(e){
    if(e.key==='Enter' && inputText.value!=""){
        let text=e.target.value;
        let task=new todo(text,false);
        obj.add(task);
        inputText.value=null;
        console.log(obj,"78");
        obj.show();
    }
})