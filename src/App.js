import React, { useEffect, useState } from 'react';

import { getTodos, createTodo, updateTodo, deleteTodo } from './api'; // Import API functions
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await getTodos(); // Fetch todos from the API
      setTodos(fetchedTodos);
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  };

  const handleCreateTodo = async (newTodo) => {
    try {
      const createdTodo = await createTodo(newTodo); // Create a new todo using the API
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
    } catch (error) {
      console.log('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (updatedTodo) => {
    try {
      const editedTodo = await updateTodo(updatedTodo); // Update the todo using the API
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
      );

      // Fetch the updated todos from the API
      fetchTodos();
    } catch (error) {
      console.log('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId); // Delete the todo using the API
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.log('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <div >
        
        <TodoForm onCreate={handleCreateTodo} />
        <TodoList todos={todos} onDelete={handleDeleteTodo} onEdit={handleUpdateTodo} />
      </div>
    </div>
  );
};

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
 
//   },
//   appContainer: {
//     margin: '60px',
//   },
// };

export default App;
