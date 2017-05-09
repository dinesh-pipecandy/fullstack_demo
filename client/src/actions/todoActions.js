import dispatcher from '../dispatcher/dispatcher';

export function createTodo(todo){
  dispatcher.dispatch({
    type:"CREATE_TODO",
    todo,
  });
}

export function deleteTodo(id){
  dispatcher.dispatch({
    type:"DELETE_TODO",
    id
  });
}

export function modifyTodo(todo){
  dispatcher.dispatch({
    type:"MODIFY_TODO",
    todo
  });
}
