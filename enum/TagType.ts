export default class TagType {
	public static UNKNOWN : TagType = new TagType(0, "", null);
	public static PARODY : TagType = new TagType(1, "parody", "parodies");
	public static CHARACTER : TagType = new TagType(2, "character", "characters");
	public static TAG : TagType = new TagType(3, "tag", "tags");
	public static ARTIST : TagType = new TagType(4, "artist", "artists");
	public static GROUP : TagType = new TagType(5, "group", "groups");
	public static LANGUAGE : TagType = new TagType(6, "language", null);
	public static CATEGORY : TagType = new TagType(7, "category", null);
	public static values : TagType[] = [TagType.UNKNOWN, TagType.PARODY, TagType.CHARACTER, TagType.TAG, TagType.ARTIST, TagType.GROUP, TagType.LANGUAGE, TagType.CATEGORY];

	private id : number;
	private single : string;
	private plural : string;

	constructor(id : number, single : string, plural : string) {
		this.id = id;
		this.single = single;
		this.plural = plural;
	}

	public getId() : number { return this.id; }
	public getSingle() : string { return this.single; }
	public getPlural() : string { return this.plural; }

	public equals(o : TagType) : Boolean {
		if (this == o) return true;
		return o.id == this.id;
	}

	public getById(id : number) : TagType {
		return TagType.values.find(item => item.id == id);
	}

	public getByName(name : string) : TagType {
		return TagType.values.find(item => item.single == name || item.plural == name);
	}

}