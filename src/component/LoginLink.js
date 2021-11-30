import React from 'react';
import {Link} from 'react-router-dom';

function LoginLink() {
    return <div>
        <Link to="/Login">Already have an account? Login here...</Link>
    </div>;
}

export default LoginLink;
