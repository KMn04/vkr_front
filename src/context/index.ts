import React from 'react';
import { ProjectsStore } from '../stores/projectsStore'
import { ProjectStore } from '../stores/projectStore'

export const storeContext = React.createContext({
  projectsStore: new ProjectsStore(),
  projectStore: new ProjectStore(),
});
