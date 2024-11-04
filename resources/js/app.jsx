import React from 'react';
import { createRoot } from 'react-dom/client'; // Menggunakan createRoot
import TodoList from './components/TodoList';

const App = () => {
    return (
        <div>
            <TodoList />
        </div>
    );
};

// Menggunakan createRoot untuk merender aplikasi
const root = createRoot(document.getElementById('app'));
root.render(<App />);