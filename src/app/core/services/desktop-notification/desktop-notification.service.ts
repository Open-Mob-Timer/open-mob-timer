import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesktopNotificationService {

  constructor() { }

  public requestPermission(): Promise<void> {
    if (!('Notification' in window) || Notification.permission === 'denied') {
      console.log('here');
      return;
    }

    Notification.requestPermission().then((permission) => { });
  }

  public notify(message: string): void {
    let notification;
    console.log(Notification.permission);
    if (Notification.permission === 'denied') {
      return;
    }

    else if (Notification.permission === 'granted') {
      notification = new Notification(message);
    }

    else {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          notification = new Notification(message);
        }
      });
    }
  }
}
