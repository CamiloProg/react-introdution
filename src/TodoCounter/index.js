import React from 'react';
import './TodoCounter.css';
import { TodoSearch } from '../TodoSearch';

function TodoCounter({total,completed}) {
        return (
        <h2 className="TodoCounter">Has completado {completed} de {total} Todo's</h2>
    );
}

export {TodoCounter};