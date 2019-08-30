import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {
  menu: any =
  [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenus:
      [
        { titulo: 'Dashboard', url: '/pages/dashboard' },
        { titulo: 'Progreso', url: '/pages/progress' },
        { titulo: 'Gráficas', url: '/pages/graficas1' },
        { titulo: 'Promesas', url: '/pages/promesas' },
        { titulo: 'Observables', url: '/pages/rxjs' }
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-settings',
      submenus:
      [
        { titulo: 'Médicos', url: '/pages/doctors' },
        { titulo: 'Hospitales', url: '/pages/hospitals' },
        { titulo: 'Usuarios', url: '/pages/users' }
      ]
    }
  ];

  constructor() {}
}
