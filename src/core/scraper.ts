import ScraperController from './scraper-controller';
import ScraperModel from './scraper-model';
import { throws } from 'assert';
import { Ora } from 'ora';

export default class Scraper {
	private model: ScraperModel;
	private controller: ScraperController;

	constructor() {
		this.model = new ScraperModel();
		this.controller = new ScraperController();
	}

	async crawl(sitesList: string[], spinner: Ora) {
		const crawlResults = [];
		for (const [index, site] of sitesList.entries()) {
			try {
				let contactsEmails;
				spinner.text = `Progress: ${Math.round(
					(index / sitesList.length) * 100
				)} collecting data for ${site}`;
				await this.controller.goToPage(site);
				const data = await this.controller.collectData(
					site,
					true,
					this.model
				);
				// If contacts page is exists
				if (data.contactsSection) {
					await this.controller.goToPage(data.contactsSection);
					contactsEmails = await this.controller.collectData(
						site,
						false,
						this.model
					);
					if (
						Array.isArray(data.emails) &&
						Array.isArray(contactsEmails.emails)
					)
						data.emails.push(...contactsEmails.emails);
					data.emails = Array.from(new Set(data.emails));
				}

				crawlResults.push(data);
			} catch (e) {
				continue;
			}
		}
		return crawlResults;
	}
}
