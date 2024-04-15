// ProjectContext.js
import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext); // Define the custom hook

export const ProjectProvider = ({ children }) => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;