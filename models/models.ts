import { TagType, Language } from './enums';

class Gallery {
	id: Number | String;
	title: String;
	cover: String;
	language: Language;
	tags: Array<Tag>;
	page: Number;
	uploaded: Date;
	thumbs: Array<Thumb>;
}

class Tag {
	id: Number | String;
	name: String;
	count: Number | String;
	type: TagType;
}

class Thumb {
	id: Number | String;
	galleryId: Number | String;
	index: Number;
	small: File;
	smallLink: String;
	medium: File;
	mediumLink: String;
	large: File;
	largeLink: String;
}
