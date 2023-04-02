import React from 'react';
import { ProjectsStore } from '../stores/projectsStore'

export const storeContext = React.createContext({
  projectsStore: new ProjectsStore(),
});
