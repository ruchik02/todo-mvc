    let result=false;
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
            let count=0;
            for(let i in this.todos)
            {
                if(this.todos[i].isCompleted==false)
                {
                    count++;
                }
                console.log(count,"20");
            }
            let countValue=document.getElementById("count");
            countValue.innerText=count;
            console.log(countValue,"24");
        }
        remove(i){
            let obj=this.todos[i];
            console.log(obj,"28"); 
            this.todos=this.todos.filter(function(todo){
                return obj!=todo;
            })
            console.log(this.todos,"32");
            this.show();
            this.count();
        }
        toggling(){
            if(result==false){
                for(let i in this.todos){
                    this.todos[i].isCompleted=true;
                }
                result=true;
            }
                else{
                    for(let i in this.todos){
                        this.todos[i].isCompleted=false;
                    } 
                    result=false;
                }
                this.count();
                this.show();
       }
        toggle(e,i){
            if(e.target.checked){
                this.todos[i].isCompleted=true;
                console.log(this.todos,"55");
                this.show();

            }
            else{
                this.todos[i].isCompleted=false;
                console.log(this.todos,"61");
                this.show();
            }
            this.count();
        }
        add(task){
            this.todos.push(task);

        }
        clearCompleted(){
            this.todos=this.todos.filter(function(index){
                return !index.isCompleted;
            })
        this.show();
        }
        showCompleted(){
            let todo=document.getElementById('todos');
            todo.innerHTML="";
            console.log(todo,"79");
            active.style.border=`none`
            all.style.border='none'
            let completed=document.getElementById('completed');
            completed.style.border=`1px solid rgba(175, 47, 47, 0.2)`
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
            }
            todo.innerHTML=html;
            console.log(todo.innerHTML,"95");
        }
        showActive(){
            let todo=document.getElementById('todos');
            todo.innerHTML="";
            all.style.border='none'
            completed.style.border=`none`
            let active=document.getElementById('active');
            active.style.border=`1px solid rgba(175, 47, 47, 0.2)`
            console.log(todo,"100");
            let html=``;
            for(let todo1 in this.todos){
                if(this.todos[todo1].isCompleted===false){
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
            todo.innerHTML=html;
            console.log(todo.innerHTML,"116");
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
    inputText.addEventListener("keypress",function(e){
        if(e.key==='Enter' && inputText.value!=""){
            let footer=document.getElementById('footer');
            footer.style.visibility="visible";
            let text=e.target.value;
            let task=new todo(text,false);
            obj.add(task);
            inputText.value=null;
            console.log(obj,"162");
            obj.show();
            obj.count();
        }
    })
    function clearCompleted(){
        obj.clearCompleted();
    }
    function showActive(){
        obj.showActive();
    }
    function showAll(){
        obj.show()
    }
    function showCompleted(){
        obj.showCompleted()
    }
    function completedAll(){
        obj.toggling();
    }