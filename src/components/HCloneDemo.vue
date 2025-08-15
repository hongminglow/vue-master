<script lang="ts">
import { defineComponent, h, cloneVNode } from "vue";

export default defineComponent({
	name: "HCloneDemo",
	setup() {
		const children = [
			h("button", { onClick: () => console.log("original 1") }, "Original 1"),
			h("button", { onClick: () => console.log("original 2") }, "Original 2"),
		];

		return () =>
			h("div", { class: "p-4 border rounded mt-4 bg-white" }, [
				h("h3", { class: "font-semibold mb-2" }, "1) Created with h()"),
				h("div", { class: "flex gap-2 mb-4" }, children),

				h("h3", { class: "font-semibold mb-2" }, "2) cloneVNode of those nodes (inject class & handler)"),
				h(
					"div",
					{ class: "flex gap-2" },
					children.map((vnode) =>
						cloneVNode(vnode, {
							class: ["injected", (vnode.props && vnode.props.class) || ""],
							onClick: (...args: any[]) => {
								// call original handler if it exists
								const orig = vnode.props && (vnode.props as any).onClick;
								if (typeof orig === "function") orig(...args);
								console.log("injected click handler");
							},
						})
					)
				),
			]);
	},
});
</script>

<style scoped>
.injected {
	background: #eff6ff;
	border: 1px solid #bfdbfe;
	padding: 6px 12px;
	border-radius: 6px;
}
</style>
