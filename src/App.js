import React, { Component } from 'react';
import './App.css';

import ToDoList from './views/components/ToDoList';
import NewToDoItem from './views/components/NewToDoItem';

//não posso importar ex import TodoActions from... pois no arquivo não tem um export default
//assim pego todos os exports com o *
import * as TodoActions from './data/actions/TodoActions';
import { connect } from 'react-redux'

class App extends Component {

  //quando o componente for montado
  componentDidMount(){
    //passamos nossa action
    this.props.dispatch(TodoActions.list())
  }

  render() {
    const { props } = this;
    const { dispatch } = props
    return (
      <div className="App">
        <NewToDoItem onAdd={(description) => { dispatch(TodoActions.create(description)) }} />
        <hr />
        <button className="tw-btn" onClick={() => dispatch(TodoActions.clear())} >Limpar</button>
        <hr />
        <ToDoList items={props.todoList} onRemove={(id) => { dispatch(TodoActions.remove(id)) }} onUpdate={(item) => dispatch(TodoActions.update(item))} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoList: state.TodoReducer
})

//a função connect acaba retornando uma função que pede nosso componente
export default connect(mapStateToProps)(App);
