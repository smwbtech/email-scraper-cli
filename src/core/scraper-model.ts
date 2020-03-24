import { CollectDataOptions } from '../@types/scraper';

export default class ScraperModel implements CollectDataOptions {
	public titleSelector = 'title';
	public descriptionSelectors = [
		'[name="description"]',
		'[property="og:description"]'
	];
	public keywordsSelector = '[name="keywords"]';
}
