import {EventEmitter} from 'events';
import dispatcher from "../dispatcher/dispatcher";
var axios = require('axios');

class TodoStore extends EventEmitter{
  constructor(){
    super();
    this.todos = [];
  }

  refresh(){
    self = this;
    axios.get('/api/todo')
      .then(function(res){
        self.todos = res.data;
        self.emit("change");
      });
  }

  getAll(){
    return this.todos;
  }

  createTodo(todo){
    console.log(todo);
    self = this;
    axios.post('/api/todo',todo).then(
      function(res){
        self.refresh();
      }
    );
  }

  deleteTodo(id){
      self = this;
      axios.delete('/api/todo/'+id).then(
        function(res){
          self.refresh();
        }
      );
  }

  modifyTodo(todo){
    self = this;
    axios.put('/api/todo',todo).then(
      function(res){
        self.refresh();
      }
    );
  }

  handleActions(action){
    switch(action.type){
      case "CREATE_TODO" :
        this.createTodo(action.todo);
        break;

      case "DELETE_TODO":
        this.deleteTodo(action.id);
        break;
      case "MODIFY_TODO":
        this.modifyTodo(action.todo);
        break;
      default: break;

    }
  }
}

const todoStore = new TodoStore();

dispatcher.register(todoStore.handleActions.bind(todoStore));
// window.dispatcher = dispatcher;
export default todoStore;
