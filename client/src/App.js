import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoStore from './stores/todostore.js';
import * as todoActions from './actions/todoActions';


import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Page1 from './pages/page1';
import Page2 from './pages/page2';
import Page3 from './pages/page3';
import NotFound from './pages/notfound';

class TodoItem extends Component{
    removeItem(){
      this.props.removeNode(this.props.todo.id);
    }
    editItem(){
      this.props.editItem(this.props.todo);
    }
    render(){
      return(
      <tr key={this.props.todo.id}>
        <td>{this.props.todo.text}</td>
        <td><button onClick={()=>this.removeItem()}>X</button></td>
        <td><button onClick={()=>this.editItem()}>/</button></td>
      </tr>
    );
    }
}

class TodoList extends Component{
  constructor(){
    super();
    this.state = {
      list:TodoStore.getAll(),
      value:{
        text:'',
        id:0
      },
    };
    this.reloadTodos = this.reloadTodos.bind(this);
  }

reloadTodos(){
  this.setState({list:TodoStore.getAll(),value:{text:'',id:0}});
}
  componentWillMount(){
    TodoStore.on("change", this.reloadTodos);
  }

  componentWillUnmount(){
    TodoStore.removeListener("change", this.reloadTodos);
  }



  render(){
    var list = [];
    for(var i=0;i<this.state.list.length;i++){
      list.push(
        <TodoItem key={this.state.list[i].id}
                  todo={this.state.list[i]}
                  removeNode={(x)=>this.removeTodo(x)}
                  editItem={(x)=>this.editTodo(x)}
                  />
      );
    }
    return(
      <div>
        <div>
          <input  type="text"
                  value={this.state.value.text}
                  placeholder="What do you want to do?"
                  onChange={(e)=>this.handleChange(e)}
                  onKeyPress={(e)=>this.handleKeyPress(e)}
                  ></input>
          <button onClick={(e)=>this.addTodo(e)} >Add</button>
        </div>
        <div>
          <table>
            <tbody>
              {list}
            </tbody>
          </table>
        </div>
      </div>
  );
}

  handleKeyPress(event){
    if(event.charCode===13){
          this.addTodo(event);
        }
  }

  addTodo(event){
    if (this.state.value.id == 0) {
      todoActions.createTodo(this.state.value);
    }else{
      todoActions.modifyTodo(this.state.value);
    }
  }

  handleChange(event){
    const curr_state = this.state;
    curr_state.value.text = event.target.value;
    this.setState(curr_state);
  }

  removeTodo(id){
    todoActions.deleteTodo(id);
  }

  editTodo(todo){
      const curr_state = this.state;
      curr_state.value = todo;
      this.setState(curr_state);
  }
}
//<img src={logo} className="App-logo" alt="logo" />
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">

          <img src='logo.svg' className="App-logo" alt="logo" />
          <h2>ToDo list</h2>
        </div>
          <p className="App-intro"></p>
        <div>
        <Router>
          <div>
            <Link to='/'>Home</Link>&nbsp;
            <Link to='/page1'>One 1</Link>&nbsp;
            <Link to='/page2'>Two 2</Link>&nbsp;
            <Link to='/page3'>Three 3</Link>
            <Switch>
              <Route path="/" exact component={TodoList}/>
              <Route path="/page1" component={Page1}/>
              <Route path="/page2" component={Page2}/>
              <Route path="/page3" component={Page3}/>
              <Route component={NotFound}/>
            </Switch>

          </div>
        </Router>
        </div>
      </div>
    );
  }
}
export default App;
