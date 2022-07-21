import React from 'react'
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from "../TodoSearch/index.js";
import { TodoList } from "../TodoList/index.js";
import { TodoItem } from "../TodoItem/index.js";
import { CreateTodoButtom } from "../CreateTodoButton/index";
import { Modal } from "../Modal";

function useLocalStorage (itemName, initialValue){
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    // Simulamos un segundo de delay de carga 
      setTimeout(() => {
        // Manejamos la tarea dentro de un try/catch por si ocurre algún error
        try {
          const localStorageItem = localStorage.getItem(itemName);
          let parsedItem;
          
          if (!localStorageItem) {
            localStorage.setItem(itemName, JSON.stringify(initialValue));
            parsedItem = initialValue;
          } else {
            parsedItem = JSON.parse(localStorageItem);
          }
  
          setItem(parsedItem);
        } catch(error) {
        // En caso de un error lo guardamos en el estado
          setError(error);
        } finally {
          // También podemos utilizar la última parte del try/cath (finally) para terminar la carga
          setLoading(false);
        }
      }, 1000);
    });

  const saveItem = (newItem)=> {
    try{
      const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem);
    } catch(error) {
      setError(error);
    }
  };

  return {
    item,
    saveItem,
    loading,
    error,
  };
}



function App() {
  const {
    item: todos,
    saveItem:saveTodos,
    loading,
    error
  } = useLocalStorage('TODOS_V1', []);
  const [searchValue,setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false)
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }
  
  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return (
    <React.Fragment>
      <TodoCounter
        total={totalTodos}
        completed={completedTodos}
      />
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
      {loading && <p>Estamos cargando, no desesperes</p>}
      {error && <p>Error uwu</p>}
      {(!loading && !searchedTodos.length) && <p>Crea tu primer todo!</p>}

        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      {openModal && (
      <Modal>
        <p>Teleport</p>
      </Modal>
      )}

      <CreateTodoButtom 
        setOpenModal={setOpenModal}
      />
    </React.Fragment>
  );
}

export default App;
