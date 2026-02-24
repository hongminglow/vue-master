<template>
	<div class="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
		<ComparisonCard
			title="Form Validation (Zod & Libraries)"
			description="Comparing React Hook Form with Zod vs Vue Form with Zod."
			:reactCode="reactSnippet"
			:vueCode="vueSnippet"
		>
			<template #demo>
				<div class="flex flex-col gap-4">
					<form
						@submit.prevent="handleSubmit"
						class="max-w-md w-full p-6 bg-slate-800 border-2 border-slate-700/50 rounded-xl space-y-5 shadow-lg relative"
					>
						<div v-for="fieldKey in Object.keys(formData)" :key="fieldKey" class="flex flex-col gap-1.5">
							<label class="capitalize font-bold text-slate-300 text-sm tracking-wide">
								{{ fieldKey }}
							</label>
							<input
								v-model="formData[fieldKey as keyof typeof formData]"
								:type="fieldKey === 'password' ? 'password' : 'text'"
								class="px-3 py-2.5 bg-slate-900 border rounded-lg focus:outline-none focus:ring-2 transition-all w-full text-white placeholder-slate-500"
								:class="
									errors[fieldKey]
										? 'border-red-500 focus:ring-red-500'
										: 'border-slate-700 focus:ring-green-500 focus:border-transparent'
								"
								:placeholder="'Enter ' + fieldKey"
							/>
							<span v-if="errors[fieldKey]" class="text-xs font-medium text-red-400 mt-1 flex items-center gap-1">
								<span>⚠️</span> {{ errors[fieldKey] }}
							</span>
						</div>

						<button
							type="submit"
							class="w-full mt-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold shadow-md transition-colors cursor-pointer"
						>
							Submit & Validate
						</button>
						<button
							type="button"
							@click="clearForm"
							class="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold shadow-md transition-colors cursor-pointer"
						>
							Clear Form
						</button>
					</form>
				</div>
			</template>
			<template #takeaway>
				<ul class="space-y-4">
					<li>
						<strong class="text-green-400 block mb-1">🛡️ Universal Zod Ecosystem</strong>
						Zod handles schema validations equally perfectly across React and Vue. While React often ties it to
						`@hookform/resolvers`, Vue provides libraries that are structurally identical in purpose.
					</li>
					<li>
						<strong class="text-green-400 block mb-1">📝 Native v-model Power</strong>
						Because of Vue's native two-way binding (`v-model`), you often don't strictly *need* a massive form library
						if you only want basic validation. You can simply bind inputs directly to a `ref()` object and test its
						`.value` against a Zod schema upon submit!
					</li>
					<li>
						<strong class="text-green-400 block mb-1">🚀 Advanced Form Packages</strong>
						When you need complex state management (touched, dirty, submitting states, complex array paths), Vue offers
						extremely powerful packages mirroring React Hook Form. The two most prominent are `@tanstack/vue-form`
						(headless, built by Tanner Linsley's team alongside the React version) and `vee-validate` (extremely mature,
						Vue-specific form engine).
					</li>
					<li class="p-4 bg-slate-800/80 rounded-lg border-2 border-blue-500/30 mt-4">
						<strong class="text-blue-400 block mb-2 text-lg">💡 Beginner's Golden Rule: Form State</strong>
						<div class="space-y-3 text-slate-300">
							<p>
								<strong>Never use <code>reactive()</code> for form state! Always use <code>ref()</code>.</strong>
							</p>
							<p>
								Why? Because forms almost always need to be <strong>cleared</strong> or <strong>reset</strong>. If you
								build your form with <code>const formData = reactive({ user: '', pass: '' })</code>, you cannot do
								<code>formData = {}</code> to clear the form. It will instantly destroy all reactivity and break your
								UI.
							</p>
							<p>
								If you build your form with <code>const formData = ref({ user: '', pass: '' })</code>, you can
								completely reset the entire form back to a blank slate securely with a single line of code: <br /><code
									class="text-blue-300 bg-slate-900 px-1 rounded"
									>formData.value = { user: '', pass: '' }</code
								>.
							</p>
						</div>
					</li>
				</ul>
			</template>
		</ComparisonCard>
	</div>
</template>

<script setup lang="ts">
import ComparisonCard from "@/components/ComparisonCard.vue";
import { ref } from "vue";
import { z } from "zod";

const schema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

const formData = ref({
	username: "",
	password: "",
});

const errors = ref<Record<string, string>>({});

const clearForm = () => {
	// Thanks to ref(), we can reset the entire state instantly!
	formData.value = { username: "", password: "" };
	errors.value = {};
};

const handleSubmit = () => {
	// Clear previous errors
	errors.value = {};

	const result = schema.safeParse(formData.value);

	if (!result.success) {
		const fieldErrors = result.error.flatten().fieldErrors;
		for (const [key, val] of Object.entries(fieldErrors)) {
			if (val) errors.value[key] = val[0];
		}
	} else {
		alert("Form is perfectly valid! ✅\\n" + JSON.stringify(result.data, null, 2));
	}
};

const reactSnippet = `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(3)
});

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} />
      {errors.username && <p>{errors.username.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}`;

const vueSnippet = `<script setup>
// using standard v-model with generic Zod, or use
// @tanstack/vue-form / vee-validate for advanced field states!
import { ref } from 'vue';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(3)
});

const formData = ref({ username: '' });
const errors = ref({});

const onSubmit = () => {
  // Clear previous errors
  errors.value = {};

  const res = schema.safeParse(formData.value);
  if (!res.success) {
    // Map zod errors to our error object state
    Object.keys(res.error.flatten().fieldErrors).forEach(k => {
      errors.value[k] = res.error.flatten().fieldErrors[k][0];
    })
  } else {
    // Form is valid! Beautifully clear the form using ref:
    formData.value = { username: '' };
  }
};
<\/script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="formData.username" />
    <span v-if="errors.username">{{ errors.username[0] }}</span>
    <button type="submit">Submit</button>
  </form>
</template>`;
</script>
