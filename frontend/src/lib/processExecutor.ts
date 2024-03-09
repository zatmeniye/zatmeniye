import { Ref, ref } from "vue";
import { userList } from "@/data";

export class ProcessExecutor {
	constructor() {}

	async execute(_: number): Promise<Ref<any> | null> {
		const data = ref<any>(null);
		setTimeout(() => {
			data.value = userList;
		}, 5_000);
		return data;
	}
}
