import React from 'react';
import { ProjectsStore } from '../stores/projectsStore'
import { ProjectStore } from '../stores/projectStore'
import { AuthStore } from '../stores/authStore';
import { TicketStore } from '../stores/ticketStore';
import { ProjectWikiStore } from '../stores/projectWikiStore';
import { ProjectWikiPageStore } from '../stores/projectWikiPageStore';

export const storeContext = React.createContext({
  authStore: new AuthStore(),
  projectsStore: new ProjectsStore(),
  projectStore: new ProjectStore(),
  ticketStore: new TicketStore(),
  projectWikiStore: new ProjectWikiStore(),
  projectWikiPageStore: new ProjectWikiPageStore(),
});
