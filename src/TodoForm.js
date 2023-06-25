import React, { useState } from 'react';

const TodoForm = ({ onCreate }) => {
  const [newTodo, setNewTodo] = useState({
    name: '',
    description: '',
    isCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(newTodo);
    setNewTodo({
      name: '',
      description: '',
      isCompleted: false,
    });
  };

  return (
    <div style={styles.container}>
      <h1>Add Gajle</h1>
      <h3 style={styles.title}>Create Todo</h3>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name:</label>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Enter name"
            value={newTodo.name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Description:</label>
          <textarea
            style={styles.textarea}
            name="description"
            placeholder="Enter description"
            value={newTodo.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div style={styles.inputGroup}>
          <input
            style={styles.checkbox}
            type="checkbox"
            name="isCompleted"
            checked={newTodo.isCompleted}
            onChange={handleChange}
          />
          <label style={styles.checkboxLabel}>Completed</label>
        </div>
        <button style={styles.createButton} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '50%',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  inputGroup: {
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    resize: 'vertical',
    minHeight: '60px',
  },
  checkbox: {
    marginRight: '5px',
  },
  checkboxLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  createButton: {
    marginTop: '10px',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '3px',
    backgroundColor: '#4caf50',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default TodoForm;
