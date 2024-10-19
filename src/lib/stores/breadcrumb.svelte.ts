import { getContext, setContext } from 'svelte';

export interface UrlPathSection {
	section: string;
	href: string;
}

const capitalize = (s: string): string => {
	return s.charAt(0).toUpperCase() + s.slice(1);
};

class UrlPathStore {
	paths = $state<UrlPathSection[]>([] as UrlPathSection[]);

	constructor() {
		$effect(() => {
			this.paths = [{ section: 'Home', href: '/app' }];
		});
	}

	#clear() {
		this.paths = [] as UrlPathSection[];
	}

	update(path: string) {
		// clear old paths
		this.#clear();
		// build up new paths
		const pathSections = path.split('/').slice(1);
		for (let i = 0; i < pathSections.length; i++) {
			this.paths.push({
				section: pathSections[i] == 'app' ? 'Home' : capitalize(pathSections[i]),
				href: '/' + pathSections.slice(0, i + 1).join('/')
			} satisfies UrlPathSection);
		}
	}
}

const URL_PATH_STORE = 'url_path_store';
export type { UrlPathStore };

export function setUrlPathStore(): UrlPathStore {
	const newUrlPathStore = new UrlPathStore();
	setContext(URL_PATH_STORE, newUrlPathStore);
	return newUrlPathStore;
}

export function getUrlPathStore(): UrlPathStore {
	return getContext(URL_PATH_STORE);
}
