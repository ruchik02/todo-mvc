let todos = [];
let res = false;
function gettodos(){
    fetch("/").then((response) => {
        return response.text();
    }).then((data) => {
        todos = JSON.parse(data);
        console.log(todos,"8");
        obj.show();
    })
}
class todo {
    constructor(text, isCompleted) {
        this.text = text;
        this.isCompleted = isCompleted;
    }
}
class myTodo{
    constructor(){
    }
    add(task) {
        console.log(task,"23");
        fetch('/addtodos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                todos = data;
                obj.show();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    show(){
        let todos1=document.getElementById("todos");
        console.log(todos,"120");
        todos1.innerHTML="";
        let all=document.getElementById('all');
        all.style.border=`1px solid rgba(175, 47, 47, 0.2)`
        active.style.border=`none`
        completed.style.border=`none`
        let html=``;
        for(let todo1 in this.todos){
            if(this.todos[todo1].isCompleted===true){
                html+=`<div class="todos" id="todos">
                <ul id="ul" class="todo-list">
                    <li>
                    <input type="checkbox" onclick="obj.toggle(event,${todo1})" checked name="checkbox" id="checker" class="check-box">
                    <label for="todoLbael" class="data line-through">${this.todos[todo1].text}</label>
                    <label for="todoCross" class="cross" onclick=(obj.remove(${todo1}))>X</label>
                </li>
                </ul>
            </div>`

            }
            else{
                html+=`<div class="todos" id="todos">
                <ul id="ul" class="todo-list">
                    <li>
                    <input type="checkbox" onclick="obj.toggle(event,${todo1})" name="checkbox" id="checker" class="check-box">
                    <label for="todoLbael" class="data">${this.todos[todo1].text}</label>
                    <label for="todoCross" class="cross" onclick=(obj.remove(${todo1}))>X</label>
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
    gettodos();
    inputText.addEventListener("keypress",function(e){
        if(e.key==='Enter' && inputText.value!=""){
            let footer=document.getElementById('footer');
            footer.style.visibility="visible";
            let text=e.target.value;
            let task=new todo(text,false);
            obj.add(task);
            inputText.value=null;
            console.log(obj,"84");
            obj.show();
            // obj.count();
        }
    })
