import * as TodoConstants from '../actions/TodoActions'

//essa função recebe o estado e uma ação
const TodoReducer = (todoList = [], action) => {
    switch (action.type) {
        case TodoConstants.TODO_LIST:
            return action.todoList

        case TodoConstants.TODO_CREATE:
            //não podemos modificar o state, já que é uma função pura
            //retorno meu estado mais o item novo
            return [...todoList, action.newItem]
        
        case TodoConstants.TODO_REMOVE:
            //ou seja retornamos um NOVO array, onde não tenha o item removido
            //return todoList.filter(item => item.id !== action.id)
            const itemIndex = todoList.findIndex(item => item.id === action.id)
            //ou seja pegamos de 0 até a posição 2, e de 2+1 (3) 
            //agora não preciso percorrer o array inteiro como na solução anterior
            return [...todoList.slice(0, itemIndex), ...todoList.slice(itemIndex + 1)]

        case TodoConstants.TODO_CLEAR:
            return todoList.filter(item => item.isChecked === false)
        

        case TodoConstants.TODO_UPDATE:
            return todoList.map(item=>{
                if(item.id===action.item.id){
                    return action.item
                }
                return item
            })

        default: return todoList //retono o estado, como o estado é o mesmo não vai disparar nenhuma alteração

        //como vou enviar um array novo, ele vai ver que houve alteração no todoreducer

    }
}

export default TodoReducer