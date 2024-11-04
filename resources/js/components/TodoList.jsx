import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';

axios.defaults.baseURL = 'http://todo-asiaquest.test';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos(); // Ambil todos saat komponen pertama kali dimuat
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('/todos'); // Memanggil API
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const addTodo = async () => {
        if (newTodo.trim()) {
            try {
                const response = await axios.post('/todos', { description: newTodo });
                setTodos([...todos, response.data]);
                setNewTodo('');
            } catch (error) {
                console.error("Error adding todo:", error);
            }
        }
    };

    const toggleTodo = async (id) => {
        try {
            const todo = todos.find(todo => todo.id === id);
            const updatedTodo = { ...todo, completed: !todo.completed };

            await axios.put(`/todos/${id}`, updatedTodo); // Update todo melalui API
            setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
        } catch (error) {
            console.error("Error toggling todo:", error);
        }
    };

    const editTodo = async (id, newDescription) => {
        try {
            await axios.put(`/todos/${id}`, { description: newDescription }); // Update deskripsi todo
            setTodos(todos.map(todo => (todo.id === id ? { ...todo, description: newDescription } : todo)));
        } catch (error) {
            console.error("Error editing todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`/todos/${id}`); // Menghapus todo melalui API
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedTodos = Array.from(todos);
        const [removed] = reorderedTodos.splice(result.source.index, 1);
        reorderedTodos.splice(result.destination.index, 0, removed);

        setTodos(reorderedTodos);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div 
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                        className="container mt-5"
                    >
                        <h1 className="text-center mb-4">Todo List</h1>
                        <div className="input-group mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                value={newTodo} 
                                onChange={(e) => setNewTodo(e.target.value)} 
                                placeholder="Add a new task" 
                            />
                            <button className="btn btn-primary" onClick={addTodo}>Add</button>
                        </div>
                        <div>
                            {todos.map((todo, index) => (
                                <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                                    {(provided) => (
                                        <div 
                                            ref={provided.innerRef} 
                                            {...provided.draggableProps} 
                                            {...provided.dragHandleProps}
                                        >
                                            <TodoItem 
                                                todo={todo} 
                                                onToggle={toggleTodo} 
                                                onDelete={deleteTodo} 
                                                onEdit={editTodo} // Pass the edit function
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default TodoList;
