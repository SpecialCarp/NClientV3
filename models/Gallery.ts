import Tag from '@/models/Tag';
import Language from "@/enum/Language";

export default class Gallery {
	private id : number;
	private title : string;
	private cover : string;
	private language : Language;
	private tags : Array<Tag>;
	private favorite : Boolean;
	private page : number;
	private uploaded : Date;

	constructor(id : number, title : string, cover : string = null, language : Language = null, tags : Array<Tag> = [], page : number = null, uploaded : Date = null) {
		this.id = id;
		this.title = title;
		this.cover = cover;
		this.language = language;
		this.tags = tags;
		this.page = page;
		this.uploaded = uploaded;
	}

	public getId() : number { return this.id; }
	public getTitle() : string { return this.title; }
	public getCover() : string { return this.cover; }
	public getLanguage() : Language { return this.language; }
	public getTags() : Array<Tag> { return this.tags; }
	public getFavorite() : Boolean { return this.favorite; }
	public getPage() : number { return this.page; }
	public getUploaded() : Date { return this.uploaded; }

	public setCover(cover : string) : Gallery {
		this.cover = cover;
		return this;
	}
	public setLanguage(language : Language) : Gallery {
		this.language = language;
		return this;
	}
	public setTags(tags : Array<Tag>) : Gallery {
		this.tags = tags;
		return this;
	}
	public setFavorite(favorite : Boolean) : Gallery {
		this.favorite = favorite;
		return this;
	}
	public setPage(page : number) : Gallery {
		this.page = page;
		return this;
	}
	public setUploaded(uploaded : Date) : Gallery {
		this.uploaded = uploaded;
		return this;
	}
	public addTag(tag : Tag) : Gallery {
		this.tags.push(tag);
		return this;
	}

}