import React from 'react';

const ProjectDetails = ({ project }) => {
    if(!project) {
        return 
        <p>No Project selected. </p>
    }


return (
<div>
            <h2>{project.title}</h2>
            <p>Description: {project.description}</p>
            <p>Tech Stack: {project.techSelection.map(tech => `${tech.category}: ${tech.technologies.join(', ')}`).join('; ')}</p>
            <p>Comments: {project.comments.join(', ')}</p>
            <p>Date: {new Date(project.dateStamp).toLocaleDateString()}</p>
        </div>
    );
};

export default ProjectDetails;