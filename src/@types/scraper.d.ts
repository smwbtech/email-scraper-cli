export interface CollectDataOptions {
	titleSelector: string;
	descriptionSelectors: string[];
	keywordsSelector: string;
}

export interface MetaData {
	title: string | undefined;
	keywords: string | null | undefined;
	description: string | null | undefined;
}

export interface CollectedDataResult {
	site: string;
	emails: RegExpMatchArray | null | undefined;
	contactsSection: string | null | undefined;
	title: string | undefined;
	keywords: string | null | undefined;
	description: string | null | undefined;
}

export interface SplitedDataResult {
	site: string;
	email: string;
	title: string;
	keywords: string;
	description: string;
}
