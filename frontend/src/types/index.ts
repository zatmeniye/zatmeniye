export interface IWidget {
	id: number;
	type: IType;
	props: IProp[] | null;
	slots: ISlot[] | null;
}

export interface IType {
	name: string;
	dataTransfer: boolean;
}

export interface IProp {
	name: string;
	type: string;
	value: string;
}

export interface ISlot {
	name: string;
	widgets: IWidget[];
}
