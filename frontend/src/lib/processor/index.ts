import { Ref, ref } from "vue";
import { data } from "./data";

export interface IProcessor {
	processes: { [key: number]: Ref<unknown> };
	execute: (pid: number) => Promise<Ref<unknown> | null>;
	invalidate: (pid: number) => void;
}

export function useProcessor(): IProcessor {
	const processes: { [key: number]: Ref<unknown> } = {};
	return {
		processes,
		execute: async (pid: number) => {
			if (!(pid in processes)) {
				processes[pid] = ref(data);
				return processes[pid];
			}
			return processes[pid];
		},
		invalidate: (pid: number) => {
			processes[pid].value = data.slice(0, data.length - 1);
		},
	};
}
