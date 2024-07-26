class RouteController {
    constructor() {
      if (RouteController.instance) {
        return RouteController.instance;
    	}
			RouteController.instance = this;
		}

    routesName = {
			profile: "/profile",
    }

    navigateTo(route) {
      console.log(route)
    }
}

const instance = new RouteController();
Object.freeze(instance);

export default instance;