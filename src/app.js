import config from './config';
import {InlineViewStrategy} from 'aurelia-templating';

System.set('blank', System.newModule({
	Blank: function Blank() {
		this.getViewStrategy = () => new InlineViewStrategy('<template><span></span></template>');
	}
}));

export class App {
	constructor() {
		this.service = {};
		this.settings = {
			url: '',
			flatten: true,
			idProperty: '',
			outFields: [],
			returnGeometry: false
		};

		window.addEventListener('resize', () => {
			const currentRoute = this.router.currentInstruction.config.route;
			if (currentRoute === 'settings' || currentRoute === '/') {
				this.router.navigate('resize');
			}
		});
	}

	configureRouter(configuration, router) {
		configuration.title = 'ArcGIS Server Store';

		configuration.map([
			{ route: 'settings', moduleId: 'components/store-settings', title: 'Settings', nav: true, settings: { icon: 'fa-gears', settings: this.settings, service: this.service }}
		]);

		configuration.mapUnknownRoutes((instruction) => {
			if (instruction.fragment === '/') {
				if (window.innerWidth < config.SCREEN_SMALL_BREAKPOINT_PX) {
					return { redirect: 'settings' };
				}
				return { moduleId: 'blank' };
			}
			return { redirect: '' };
		});

		this.router = router;
	}
}
