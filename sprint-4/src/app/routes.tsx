import { createBrowserRouter } from 'react-router';
import { Dashboard } from './components/Dashboard';
import { GestaoEPIs } from './components/GestaoEPIs';
import { Alertas } from './components/Alertas';
import { DetalheAlerta } from './components/DetalheAlerta';
import { Relatorios } from './components/Relatorios';
import { Login } from './components/Login';
import { GerenciamentoZonas } from './components/GerenciamentoZonas';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/',
    Component: Dashboard,
  },
  {
    path: '/epis',
    Component: GestaoEPIs,
  },
  {
    path: '/alertas',
    Component: Alertas,
  },
  {
    path: '/alerta/:id',
    Component: DetalheAlerta,
  },
  {
    path: '/relatorios',
    Component: Relatorios,
  },
  {
    path: '/zonas',
    Component: GerenciamentoZonas,
  },
]);
