import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Counter from './components/Counter.jsx';

const App = () => {
    return (
        <div>
            <h1>Hello, SSR!</h1>
            <p>This is a simple server-side rendered React application.</p>
            <hr />
            <br />
            <br />
            <Counter></Counter>
            <Routes>
                <Route path="/" element={<h2>Home Page</h2>} />
                <Route path="/about" element={<h2>About Page</h2>} />
            </Routes>
        </div>
    )
}

export default App;