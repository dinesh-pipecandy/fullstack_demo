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

  createTodo(text){
    self = this;
    axios.post('/api/todo',{
        "text": text,
        "id": 0
    }).then(
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

  handleActions(action){
    switch(action.type){
      case "CREATE_TODO" :
        this.createTodo(action.text);
        break;

      case "DELETE_TODO":
        this.deleteTodo(action.id);
        break;

      default: break;

    }
  }
}

const todoStore = new TodoStore();

dispatcher.register(todoStore.handleActions.bind(todoStore));
// window.dispatcher = dispatcher;
export default todoStore;
