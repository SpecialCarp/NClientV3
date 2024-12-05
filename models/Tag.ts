import TagType from "@/enum/TagType";

export default class Tag {
	private id : Number;
	private name : String;
	private count : Number;
	private type : TagType;
	private status : TagStatus;

	constructor(id : Number,
		name : String,
		count : Number,
		type : TagType = TagType.UNKNOWN,
		status : TagStatus = TagStatus.DEFAULT
	) {
		this.id = id;
		this.name = name;
		this.count = count;
		this.type = type;
		this.status = status;
	}

	public getId() : Number { return this.id; }
	public getName() : String { return this.name; }
	public getCount() : Number { return this.count; }
	public getType() : TagType { return this.type; }
	public getStatus() : TagStatus { return this.status; }
}

export enum TagStatus {
	DEFAULT, AVOIDED, ACCEPTED
}