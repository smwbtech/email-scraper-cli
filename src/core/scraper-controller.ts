import * as puppeteer from "puppeteer";

const protocolPattern = /^http(s){0,1}:\/\/.+$/;

export default class ScraperController {
  private browser: puppeteer.Browser | undefined;
  private page: puppeteer.Page | undefined;

  async goToPage(site: string) {
    try {
      // If this is first site in list launch puppeteer
      if (!this.browser) {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
        this.page.setViewport({
          width: 1920,
          height: 979,
          deviceScaleFactor: 1
        });
        await this.page.setUserAgent(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
        );
      }
      // If site has no protocol
      if (protocolPattern.test(site)) site = `http://${site}`;
      await this.page?.goto(site);
    } catch (e) {
      console.log(e);
    }
  }

  private async collectEmail() {
    if (this.page) {
      try {
        const emails = await this.page.evaluate(() => {
          const emailPattern = /((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/gi;
          const html = document.documentElement.innerHTML;
          const emails = html.match(emailPattern);
          return emails;
        });
        return emails;
      } catch (e) {
        console.log(e);
      }
    }
  }

  private async collectMeta(options: CollectDataOptions) {
    const { titleSelector, descriptionSelectors, keywordsSelector } = options;
    if (this.page) {
      try {
        const { title, keywords, description } = await this.page.evaluate(
          options => {
            const titleElement = document.querySelector(
              titleSelector
            ) as HTMLTitleElement | null;
            const keywordsElement = document.querySelector(
              keywordsSelector
            ) as HTMLMetaElement | null;
            let descriptionElement: HTMLMetaElement | null = null;
            // Iterate over descriptions selectors and get HTMLMetaElement element
            for (const descriptionSelector of descriptionSelectors) {
              descriptionElement = document.querySelector(descriptionSelector);
              if (descriptionElement) break;
            }
            return {
              title: titleElement?.innerText,
              keywords: keywordsElement?.getAttribute("content"),
              description: descriptionElement?.getAttribute("content")
            };
          },
          { titleSelector, descriptionSelectors, keywordsSelector }
        );
        return { title, keywords, description };
      } catch (e) {
        console.log(e);
      }
    }
  }

  private async collectContacts() {
    if (this.page) {
      try {
        const contacts = this.page.evaluate(() => {
          const links = document.querySelectorAll("a");
          if (links) {
            const linksArr = [...links];
            let href: string | undefined | null;
            for (const link of linksArr) {
              if (link.innerText.match(/контакты/i)) {
                href = link.getAttribute("href");
                break;
              }
            }
            if (href)
              return href.includes(window.location.origin)
                ? href
                : `${window.location.origin}${href}`;
            return href;
          }
        });
        return contacts;
      } catch (e) {
        console.log(e);
      }
    }
  }

  async collectData(collectOnlyEmail: boolean) {
    if (this.page) {
      try {
      } catch (e) {
        console.log(e);
      }
    }
  }
}
