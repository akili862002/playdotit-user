interface IEventManager {
  fire(name: string, payload?: any): IEventManager;
  addListener(name: string, fn: (payload: any) => void): IEventManager;
}

declare var eventManager: IEventManager;
