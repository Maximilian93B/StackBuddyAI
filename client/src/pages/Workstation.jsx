import React, { useEffect } from 'react'
import CreateProjectForm from '../components/CreateProjectForm';
import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';
function Workstation () {
    const navigate = useNavigate();

    useEffect(() => {
        if (!AuthService.loggedIn()) {
            navigate('/login'); // Adjust the path as needed
        }
    }, [navigate]);
    return (
        <div>
            <CreateProjectForm></CreateProjectForm>
            <h1>This is out workstation page</h1>
        </div>
    )
}

export default Workstation; 