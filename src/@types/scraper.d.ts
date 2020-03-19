declare interface CollectDataOptions {
	titleSelector: string;
	descriptionSelectors: string[];
	keywordsSelector: string;
}

declare interface MetaData {
	title: string | undefined;
	keywords: string | null | undefined;
	description: string | null | undefined;
}

declare interface CollectedDataResult {
	emails: RegExpMatchArray | null | undefined;
	contactsSection: string | null | undefined;
	title: string | undefined;
	keywords: string | null | undefined;
	description: string | null | undefined;
}
