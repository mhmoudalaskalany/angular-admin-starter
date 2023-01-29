import { Injector } from '@angular/core';
import { SessionManager } from 'core/guards/session-manager';

export class Shell {
    // injector to get instance of services without constructor injection
    public static Injector: Injector;
    public static get Session(): SessionManager {
      return SessionManager.Current();
    }
}
