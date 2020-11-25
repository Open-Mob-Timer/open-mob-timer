import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesktopNotificationService {

  constructor() { }

  public requestPermission(): void {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications. Not all features will work properly');
    }
    else {
      Notification.requestPermission().then((permission) => {
        const notification = new Notification('Desktop notifications enable');
      });
    }
  }

  public notify(message: string): void {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications. Not all features will work properly');
    }

    else if (Notification.permission === 'granted') {
      const notification = new Notification(message);
    }

    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          const notification = new Notification(message);
        }
      });
    }
  }
}
