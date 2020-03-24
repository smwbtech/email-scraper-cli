import { Command, flags } from '@oclif/command';
import ora from 'ora';
import { promises as fsPromises } from 'fs';
// https://github.com/oclif/oclif/issues/335
// @ts-ignore
import readXlsxFile from 'read-excel-file/node';
// @ts-ignore
import json2xls from 'json2xls';
import splitBySite from './lib/split-by-email';
import Scraper from './core/scraper';

class EmailScraperCli extends Command {
	static description = 'describe the command here';

	static flags = {
		// add --version flag to show CLI version
		version: flags.version({ char: 'v' }),
		help: flags.help({ char: 'h' }),
		// flag with a value (-n, --name=VALUE)
		name: flags.string({ char: 'n', description: 'name to print' }),
		// flag with no value (-f, --force)
		force: flags.boolean({ char: 'f' })
	};

	static args = [{ name: 'file' }];

	async run() {
		const { args } = this.parse(EmailScraperCli);

		const spinner = ora(
			`Reading and convering data from file: "${args.file}"'`
		).start();
		if (args.file) {
			try {
				let pathArr = args.file.split('/');
				pathArr.splice(-1);
				const path = pathArr.join('/');
				const scraper = new Scraper();
				const raws = (await readXlsxFile(args.file)) as Array<[]>;
				const sites = raws.flat();
				const data = await scraper.crawl(sites, spinner);
				const splitedData = splitBySite(data);
				const xls = json2xls(splitedData);
				await fsPromises.writeFile(
					`${path}/parser-data-${Date.now()}.xlsx`,
					xls,
					'binary'
				);
				spinner.succeed('Data is collected');
			} catch (e) {
				console.log(e);
			} finally {
				this.exit();
			}
		} else {
			spinner.fail('Wrong path to the file');
		}
	}
}

export = EmailScraperCli;
