import { IWidget } from "@/types";
import { useId } from "@/lib";

export const table: IWidget = {
	id: useId(),
	type: {
		name: "DataTable",
		dataTransfer: false,
	},
	props: [
		{
			name: "value",
			type: "array",
			value: "data",
			fromVar: true,
			twoWay: false,
		},
	],
	slots: [
		{
			name: "default",
			widgets: [
				{
					id: useId(),
					type: {
						name: "Column",
						dataTransfer: true,
					},
					props: [
						{
							name: "field",
							type: "string",
							value: "name",
							fromVar: false,
							twoWay: false,
						},
						{
							name: "header",
							type: "string",
							value: "название",
							fromVar: false,
							twoWay: false,
						},
					],
					slots: null,
					emits: null,
					initHandlers: null,
				},
				{
					id: useId(),
					type: {
						name: "Column",
						dataTransfer: true,
					},
					props: [
						{
							name: "field",
							type: "string",
							value: "address.city",
							fromVar: false,
							twoWay: false,
						},
						{
							name: "header",
							type: "string",
							value: "город",
							fromVar: false,
							twoWay: false,
						},
					],
					slots: null,
					emits: null,
					initHandlers: null,
				},
				{
					id: useId(),
					type: {
						name: "Column",
						dataTransfer: true,
					},
					props: [
						{
							name: "header",
							type: "string",
							value: "действия",
							fromVar: false,
							twoWay: false,
						},
					],
					slots: [
						{
							name: "body",
							widgets: [
								{
									id: useId(),
									type: { name: "Button", dataTransfer: false },
									props: [
										{
											name: "label",
											type: "string",
											value: "удалить",
											fromVar: false,
											twoWay: false,
										},
										{
											name: "severity",
											type: "string",
											value: "danger",
											fromVar: false,
											twoWay: false,
										},
									],
									emits: [
										{
											name: "click",
											handlers: [
												{
													name: "invalidate",
													props: [
														{
															name: "pid",
															type: "number",
															value: "10",
															fromVar: false,
															twoWay: false,
														},
													],
												},
											],
										},
									],
									slots: null,
									initHandlers: null,
								},
							],
						},
					],
					emits: null,
					initHandlers: null,
				},
			],
		},
	],
	emits: null,
	initHandlers: [
		{
			name: "execute",
			props: [
				{
					name: "pid",
					type: "number",
					value: "10",
					fromVar: false,
					twoWay: false,
				},
			],
		},
	],
};
