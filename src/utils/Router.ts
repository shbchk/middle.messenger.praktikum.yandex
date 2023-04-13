import Block from './Block';
import Route from './Route';

class Router {
  // eslint-disable-next-line no-use-before-define
  static __instance: Router;

  protected routes: Route[] = [];

  protected history: History = window.history;

  private _currentRoute: Route | null = null;

  constructor() {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Block, props: any = {}) {
    const route = new Route(pathname, block, props);

    this.routes!.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  protected _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  protected getRoute(pathname: string) {
    return this.routes!.find((route) => route.match(pathname));
  }

  public go(pathname: string) {
    this.history!.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  public back() {
    window.history.back();
  }
}

export default Router;
