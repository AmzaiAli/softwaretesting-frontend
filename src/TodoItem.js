import React, { useEffect, useState } from 'react';

const TodoItem = ({ todo, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [deleteID, setDeleteId] = useState();
  const [editTodo, setEditTodo] = useState();
  const [updatedTodo, setUpdatedTodo] = useState(todo);

  useEffect(() => {
    onDelete(deleteID);
  }, [deleteID]);

  const handleEdit = () => {
    if (editing) {
      onEdit(updatedTodo);
    }
    setEditing(!editing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  return (
    <div style={styles.container}>
      {editing ? (
        <div style={styles.item}>
          <input
            style={styles.input}
            type="text"
            name="name"
            value={updatedTodo.name}
            onChange={handleChange}
          />
          <textarea
            style={styles.textarea}
            name="description"
            value={updatedTodo.description}
            onChange={handleChange}
          />

          <input
            style={styles.checkbox}
            type="checkbox"
            name="isCompleted"
            checked={updatedTodo.isCompleted}
            onChange={(e) =>
              setUpdatedTodo((prevTodo) => ({
                ...prevTodo,
                isCompleted: e.target.checked,
              }))
            }
          />
          <div style={styles.buttonsContainer}>
            <button style={styles.saveButton} onClick={handleEdit}>Save</button>
          </div>
        </div>
      ) : (
        <div style={styles.item}>
          <h3 style={styles.title}>{todo.name}</h3>
          <p>{todo.description}</p>

          <p style={styles.completeText}>
            Completed: {' '}
            <span style={todo.isCompleted ? styles.doneText : styles.notDoneText}>
              {todo.isCompleted ? 'Yes' : 'No'}
            </span>
          </p>
          <div style={styles.buttonsContainer}>
            <button style={styles.editButton} onClick={handleEdit}>Edit</button>
            <button style={styles.deleteButton} onClick={() => setDeleteId(todo.id)}>Delete</button>
          </div>
        </div>
      )}
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
  item: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
  textarea: {
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    resize: 'vertical',
    minHeight: '60px',
    wordWrap: 'break-word', // Add this property
  },
  checkbox: {
    marginBottom: '10px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  name: {
    marginBottom: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#777',
  },
  completeText: {
    display: 'flex',
    alignItems: 'center',
    color: '#888',
  },
  doneText: {
    fontWeight: 'bold',
    color: 'green',
  },
  notDoneText: {
    fontWeight: 'bold',
    color: 'red',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  editButton: {
    marginRight: '5px',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '3px',
    backgroundColor: '#4caf50',
    color: '#fff',
    cursor: 'pointer',
  },
  deleteButton: {
    marginRight: '5px',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '3px',
    backgroundColor: '#f44336',
    color: '#fff',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '3px',
    backgroundColor: '#4caf50',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default TodoItem;
