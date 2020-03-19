import { Command, flags } from '@oclif/command';
import readXlsxFile from 'read-excel-file/node';

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
		const { args, flags } = this.parse(EmailScraperCli);

		const name = flags.name || 'world';
		this.log('To start programm you need input path for file');
		if (args.file) {
			try {
				const raws = await readXlsxFile(args.file);
				console.log(raws);
			} catch (e) {
				console.log(e);
			}
		}
	}
}

export = EmailScraperCli;
