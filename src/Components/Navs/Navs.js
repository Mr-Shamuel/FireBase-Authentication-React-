import React from 'react';
import { Link } from 'react-router-dom';

const Navs = () => {
    return (
        <div>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/login'>Register</Link>
        </div>
    );
};

export default Navs;