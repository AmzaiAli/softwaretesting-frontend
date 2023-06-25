import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onEdit }) => {
  const [showCompleted, setShowCompleted] = useState(true);
  const [showNotCompleted, setShowNotCompleted] = useState(true);

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'completed') {
      setShowCompleted(checked);
    } else if (name === 'notCompleted') {
      setShowNotCompleted(checked);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (todo.isCompleted && !showCompleted) {
      return false;
    }
    if (!todo.isCompleted && !showNotCompleted) {
      return false;
    }
    return true;
  });

  return (
    <div style={styles.container}>
      <div style={styles.filterContainer}>
        <label>
          <input
            style={styles.filterCheckbox}
            type="checkbox"
            name="completed"
            checked={showCompleted}
            onChange={handleFilterChange}
          />
          Show Completed
        </label>
        <label>
          <input
            style={styles.filterCheckbox}
            type="checkbox"
            name="notCompleted"
            checked={showNotCompleted}
            onChange={handleFilterChange}
          />
          Show Not Completed
        </label>
      </div>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  filterContainer: {
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterCheckbox: {
    marginLeft: '10px',
  },
};

export default TodoList;
