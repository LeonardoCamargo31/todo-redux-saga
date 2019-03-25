import { TodoService } from '../services/TodoService'

export const TODO_LIST = 'TODO_LIST';
export const TODO_CREATE = 'TODO_CREATE';
export const TODO_UPDATE = 'TODO_UPDATE';
export const TODO_REMOVE = 'TODO_REMOVE';
export const TODO_CLEAR = 'TODO_CLEAR';


export const list = () => {
    //retornamos uma função, com middleware thunk
    //ele não envia esse objeto direto para store, ele injeta o dispatch e uma função getstate
    return async (dispatch) => {//getState para pegar os dados da store
        const todoList = await TodoService.list()//como é uma função assincrona vamos receber uma promisse , podemos usar o then ou transformar em sincrona com await
        dispatch({//ai sim retornamos o objeto
            type: TODO_LIST,
            todoList
        })
    }
}

//no redux temos uma unica unica store, já no flux varias
//criamos um reducer para cada funcionalidade da aplicação
//e depois juntamos todos esses reducers em uma unica store

//a função do reducer é receber o estado da aplicação e retornar o novo estado

//essa action retorna um objeto e passamos para store, só que com thunk queremos passar pela api
export const create = (description) => {
    return async (dispatch) => {
        const newItem = await TodoService.create({
            description,
            isChecked: false
        })
        dispatch({
            type: TODO_CREATE,
            newItem
        })
    }
}

export const update = (item) => {
    return async (dispatch) => {
        await TodoService.update(item)
        dispatch({
            type: TODO_UPDATE,
            item
        })
    }
}

export const remove = (id) => {
    return async (dispatch) => {
        await TodoService.remove(id)
        dispatch({
            type: TODO_REMOVE,
            id
        })
    }
}

export const clear = () => {
    //se não tivesse thunk, cada lugar que fosse passar o clear teriamos que acessar a store
    //como estamos retorndo uma função no lugar de um objeto, temo o getState que retorna o estado da store
    return (dispatch, getState) => {
        const todoList = getState().TodoReducer
        todoList.forEach(item => {
            if (item.isChecked) {
                TodoService.remove(item.id)//removendo item
            }
        })
        dispatch({
            type: TODO_CLEAR
        })
    }
}
