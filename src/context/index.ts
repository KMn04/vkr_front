import React from 'react';
import { ProjectsStore } from '../stores/projectsStore'
import { ProjectStore } from '../stores/projectStore'
import { AuthStore } from '../stores/authStore';

export const storeContext = React.createContext({
  authStore: new AuthStore(),
  projectsStore: new ProjectsStore(),
  projectStore: new ProjectStore(),
});
