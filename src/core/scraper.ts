import ScraperController from "./scraper-controller";
import ScraperModel from "./scraper-model";
import { throws } from "assert";

export default class Scraper {
  private model: ScraperModel;
  private controller: ScraperController;

  constructor() {
    this.model = new ScraperModel();
    this.controller = new ScraperController();
  }

  async crawl(sitesList: string[]) {
    for (const site of sitesList) {
      try {
        let contactsEmails;
        await this.controller.goToPage(site);
        const data = await this.controller.collectData(true, this.model);
        // If contacts page is exists
        if (data.contactsSection) {
          await this.controller.goToPage(data.contactsSection);
          contactsEmails = await this.controller.collectData(false, this.model);
          data.contactsEmails = contactsEmails;
        }

        return { data };
      } catch (e) {
        continue;
      }
    }
  }
}
