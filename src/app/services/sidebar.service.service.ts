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
        { titulo: 'Gráficas', url: '/pages/graficas1' }
      ]
    }
  ];

  constructor() {}
}
