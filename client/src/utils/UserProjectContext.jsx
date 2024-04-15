// ProjectContext.js
import React, { createContext, useState } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;
