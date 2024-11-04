import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(todo.description);

    const handleEdit = () => {
        if (editedDescription.trim()) {
            onEdit(todo.id, editedDescription); // Call the edit function with the new description
        }
        setIsEditing(false); // Exit editing mode
    };

    return (
        <div className={`card mb-3 ${todo.completed ? 'bg-light' : 'border-secondary'}`}>
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <input 
                        type="checkbox" 
                        checked={todo.completed} 
                        onChange={() => onToggle(todo.id)} 
                    />
                    {isEditing ? (
                        <input 
                            type="text" 
                            value={editedDescription} 
                            onChange={(e) => setEditedDescription(e.target.value)} 
                            onBlur={handleEdit} // Save on blur
                            onKeyDown={(e) => e.key === 'Enter' && handleEdit()} // Save on enter key
                            className="ms-2 form-control d-inline w-auto"
                        />
                    ) : (
                        <span 
                            onClick={() => setIsEditing(true)} 
                            className={`ms-2 ${todo.completed ? 'text-decoration-line-through' : ''} ${isHovered ? 'text-success' : 'text-body'}`}
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {todo.description}
                        </span>
                    )}
                </div>
                <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => onDelete(todo.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
