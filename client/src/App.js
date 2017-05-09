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

    render(){
      return(
      <li key={this.props.todo.id}>
        <span>{this.props.todo.text}</span>
        <button onClick={()=>this.removeItem()}>X</button>
      </li>
    );
    }
}

class TodoList extends Component{
  constructor(){
    super();
    this.state = {
      list:TodoStore.getAll(),
      value:'',
    };
    this.reloadTodos = this.reloadTodos.bind(this);
  }

reloadTodos(){
  this.setState({list:TodoStore.getAll(),value:''});
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
        <TodoItem key={this.state.list[i].id} todo={this.state.list[i]} removeNode={(x)=>this.removeTodo(x)}/>
      );
    }
    return(
      <div>
        <div>
          <input  type="text"
                  value={this.state.value}
                  placeholder="What do you want to do?"
                  onChange={(e)=>this.handleChange(e)}
                  onKeyPress={(e)=>this.handleKeyPress(e)}
                  ></input>
          <button onClick={(e)=>this.addTodo(e)} >Add</button>
        </div>
        <div>
          <ul>
            {list}
          </ul>
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
    todoActions.createTodo(this.state.value);
  }

  handleChange(event){
    const curr_state = this.state;
    curr_state.value = event.target.value;
    this.setState(curr_state);
  }

  removeTodo(id){
    todoActions.deleteTodo(id);
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
            <Link to='/page1'>Page1</Link>&nbsp;
            <Link to='/page2'>Page2</Link>&nbsp;
            <Link to='/page3'>Page Three</Link>
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
