import { inject, provide, type InjectionKey, type Ref } from "vue";

// Define the shape of the experiment state we're sharing
export interface ExperimentState {
	toggleState: Ref<boolean>;
	username: Ref<string>;
	incrementCount: () => void;
	resetState: () => void;
}

// Create a unique injection key for type safety
// Symbol creates a unique identifier that prevents key collisions
// Even if another library uses Symbol("ExperimentState"), it will be different
// This is better than using a string key which could accidentally conflict
export const ExperimentStateKey: InjectionKey<ExperimentState> = Symbol("ExperimentState");

// Provider composable (for parent)
export function useExperimentProvider(state: ExperimentState) {
	provide(ExperimentStateKey, state);
	return state;
}

// Consumer composable (for children)
export function useExperimentState() {
	const state = inject(ExperimentStateKey);

	if (!state) {
		throw new Error("useExperimentState must be used within a component that provides ExperimentState");
	}

	return state;
}
