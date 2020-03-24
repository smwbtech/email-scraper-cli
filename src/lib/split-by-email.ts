import { CollectedDataResult, SplitedDataResult } from '../@types/scraper';

export default function(dataArr: CollectedDataResult[]): SplitedDataResult[] {
	const resultArr: SplitedDataResult[] = [];
	for (const site of dataArr) {
		let tmp = {
			site: site.site,
			title: site.title ? site.title : '',
			keywords: site.keywords ? site.keywords : '',
			description: site.description ? site.description : ''
		};
		if (site.emails && site.emails.length > 0) {
			for (const email of site.emails) {
				const res: SplitedDataResult = Object.assign({}, tmp, {
					email
				});
				resultArr.push(res);
			}
		} else resultArr.push(Object.assign({}, tmp, { email: '' }));
	}

	return resultArr;
}
