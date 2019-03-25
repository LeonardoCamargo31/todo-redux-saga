import * as TodoActions from '../actions/TodoActions'
import { TodoService } from '../services/TodoService'

import { all, put, takeEvery, takeLatest, select } from 'redux-saga/effects'//funções que trabalham com efeito estarão aqui
//put tem o mesmo efeito do dispatch, com o assim podemos enviar para store
//imagina é disparada a ação de listar 50 vezes (takeEvery pega todas as vezes que a action foi disparada), não faz sentido, e sim buscar apenas uma vez (takeLatest só pega a ultima)

export function* hello() {
    console.log('olá')
}

//essa função ela fica observando as ações que estão sendo disparadas para store, 
//e dai ele acaba executando uma função, quem fica observando é o wate-saga
//a função executada é chamada worker-saga

function* listAll() {
    //antes usavamos o await, agora podemos usar o yield
    const todoList = yield TodoService.list()
    yield put(TodoActions.listResponse(todoList))
}
function* watchListAll() {
    //e passamos a action que queremos observar e função que desejamos executar
    yield takeLatest(TodoActions.TODO_LIST, listAll)
}

//worker-saga
//create(action.description) 
function* create({ description, isChecked }) {
    const newItem = yield TodoService.create({ description, isChecked })
    yield put(TodoActions.createResponse(newItem))
}
function* watchCreate() {
    //e passamos a action que queremos observar e função que desejamos executar
    yield takeEvery(TodoActions.TODO_CREATE, create)
}

function* remove(action) {
    yield TodoService.remove(action.id)
}
function* watchRemove() {
    yield takeEvery(TodoActions.TODO_REMOVE, remove)
}

function* clear() {
    const state = yield select()//ele retorna o estado da nossa aplicação
    const todoList = state.TodoReducer

    //uma nova lista com os itens que vão permanecer 
    const newTodoList=todoList.filter(item => !item.isChecked )//false

    //e a lista para remover
    const toRemove=todoList.filter(item => item.isChecked)//true

    toRemove.forEach(item => TodoService.remove(item.id))//removendo item

    //e enviamos a nova lista a store, usamos a action listResponse que recebe uma lista e atualiza
    yield put(TodoActions.listResponse(newTodoList))
}
function* watchClear() {
    yield takeLatest(TodoActions.TODO_CLEAR, clear)
}


function* update({ item }) {
    TodoService.update(item)
}
function* watchUpdate() {
    yield takeEvery(TodoActions.TODO_UPDATE, update)
}

export default function* TodoSaga() { //indicando um gerenrator com *
    //como se fosse um return, mas ele é proprio dos generators, quando ele chega no yield ele da uma pausa, ele não chega a encerrar como o return
    //exemplo yield 5 ele para, e quando essa função for chamada novamente, ela continua a partir da parada até yield 3 
    yield all([
        hello(),
        watchListAll(),
        watchCreate(),
        watchRemove(),
        watchClear(),
        watchUpdate()
    ])
}