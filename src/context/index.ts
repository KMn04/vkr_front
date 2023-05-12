import React from 'react';
import { ProjectsStore } from '../stores/projectsStore'
import { ProjectStore } from '../stores/projectStore'
import { AuthStore } from '../stores/authStore';
import { TicketStore } from '../stores/ticketStore';
import { ProjectWikiStore } from '../stores/projectWikiStore';
import { ProjectWikiPageStore } from '../stores/projectWikiPageStore';
import { CurrenciesStore } from '../stores/currenciesStore';
import { ProjectStatusesStore } from '../stores/projectStatusesStore';
import { RolesStore } from '../stores/rolesStore';
import { TaskPrioritiesStore } from '../stores/taskPrioritiesStore';
import { TaskStatusesStore } from '../stores/taskStatusesStore';
import { TaskTypesStore } from '../stores/taskTypesStore';

export const storeContext = React.createContext({
  authStore: new AuthStore(),
  projectsStore: new ProjectsStore(),
  projectStore: new ProjectStore(),
  ticketStore: new TicketStore(),
  projectWikiStore: new ProjectWikiStore(),
  projectWikiPageStore: new ProjectWikiPageStore(),
  currenciesStore: new CurrenciesStore(),
  projectStatusesStore: new ProjectStatusesStore(),
  rolesStore: new RolesStore(),
  taskPrioritiesStore: new TaskPrioritiesStore(),
  taskStatusesStore: new TaskStatusesStore(),
  taskTypesStore: new TaskTypesStore()
});
