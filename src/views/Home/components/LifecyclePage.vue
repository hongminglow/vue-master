<template>
	<div class="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto space-y-8 pb-12">

		<!-- Header -->
		<div class="space-y-2">
			<h1 class="text-3xl font-bold text-white flex items-center gap-3">
				<span class="text-green-400">🌱</span> Vue Lifecycle Hooks
			</h1>
			<p class="text-slate-400 text-lg">
				Every Vue component goes through a predictable sequence of stages — creation, mounting, updating, and
				unmounting. Lifecycle hooks let you run code at exactly the right moment.
			</p>
		</div>

		<!-- Lifecycle Flow Diagram -->
		<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
			<div class="bg-slate-800/80 p-5 border-b border-slate-700/50 flex items-center justify-between">
				<h3 class="text-lg font-bold text-white flex items-center gap-2">
					<span class="text-blue-400">📐</span> The Lifecycle at a Glance
				</h3>
				<span class="text-xs font-mono px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">Overview</span>
			</div>
			<div class="p-6">
				<div class="relative">
					<div class="absolute left-6 top-3 bottom-3 w-0.5 bg-slate-600/50 rounded"></div>
					<div class="space-y-2 pl-16 relative text-sm">

						<div class="relative">
							<div class="absolute -left-[2.75rem] top-1 w-7 h-7 rounded-full bg-slate-700 border-2 border-slate-500 flex items-center justify-center text-slate-400 text-xs font-bold">C</div>
							<div class="p-3 bg-slate-800/60 rounded-lg border border-slate-700/40 flex items-center justify-between">
								<span class="text-slate-400">Component instantiated, props &amp; reactive data set up</span>
								<span class="font-mono text-xs text-slate-500 bg-slate-900 px-2 py-0.5 rounded">setup()</span>
							</div>
						</div>

						<div class="relative">
							<div class="absolute -left-[2.75rem] top-1 w-7 h-7 rounded-full bg-slate-700 border-2 border-purple-400 flex items-center justify-center text-purple-400 text-xs font-bold">B</div>
							<div class="p-3 bg-slate-800/60 rounded-lg border border-purple-500/20 flex items-center justify-between">
								<span class="text-slate-300">Before DOM is created &amp; inserted</span>
								<span class="font-mono text-xs text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">onBeforeMount</span>
							</div>
						</div>

						<div class="relative">
							<div class="absolute -left-[2.75rem] top-1 w-7 h-7 rounded-full bg-slate-700 border-2 border-green-400 flex items-center justify-center text-green-400 text-xs font-bold">M</div>
							<div class="p-3 bg-slate-800/60 rounded-lg border border-green-500/20 flex items-center justify-between">
								<span class="text-slate-300">DOM inserted — template refs are now accessible</span>
								<span class="font-mono text-xs text-green-300 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded">onMounted</span>
							</div>
						</div>

						<div class="relative">
							<div class="absolute -left-[2.75rem] top-1 w-7 h-7 rounded-full bg-slate-700 border-2 border-yellow-400 flex items-center justify-center text-yellow-400 text-xs font-bold">U</div>
							<div class="p-3 bg-slate-800/60 rounded-lg border border-yellow-500/20 flex items-center justify-between">
								<span class="text-slate-300">Reactive data changed, before DOM re-renders</span>
								<span class="font-mono text-xs text-yellow-300 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">onBeforeUpdate</span>
							</div>
						</div>

						<div class="relative">
							<div class="absolute -left-[2.75rem] top-1 w-7 h-7 rounded-full bg-slate-700 border-2 border-yellow-400 flex items-center justify-center text-yellow-400 text-xs font-bold">U</div>
							<div class="p-3 bg-slate-800/60 rounded-lg border border-yellow-500/20 flex items-center justify-between">
								<span class="text-slate-300">DOM has been patched after a reactive change</span>
								<span class="font-mono text-xs text-yellow-300 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">onUpdated</span>
							</div>
						</div>

						<div class="relative">
							<div class="absolute -left-[2.75rem] top-1 w-7 h-7 rounded-full bg-slate-700 border-2 border-orange-400 flex items-center justify-center text-orange-400 text-xs font-bold">K</div>
							<div class="p-3 bg-slate-800/60 rounded-lg border border-orange-500/20 flex items-center justify-between">
								<span class="text-slate-300">Component cached inside <code>&lt;KeepAlive&gt;</code> — hidden but alive</span>
								<span class="font-mono text-xs text-orange-300 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded">onDeactivated</span>
							</div>
						</div>

						<div class="relative">
							<div class="absolute -left-[2.75rem] top-1 w-7 h-7 rounded-full bg-slate-700 border-2 border-orange-400 flex items-center justify-center text-orange-400 text-xs font-bold">K</div>
							<div class="p-3 bg-slate-800/60 rounded-lg border border-orange-500/20 flex items-center justify-between">
								<span class="text-slate-300">Component restored from <code>&lt;KeepAlive&gt;</code> cache back to DOM</span>
								<span class="font-mono text-xs text-orange-300 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded">onActivated</span>
							</div>
						</div>

						<div class="relative">
							<div class="absolute -left-[2.75rem] top-1 w-7 h-7 rounded-full bg-slate-700 border-2 border-rose-400 flex items-center justify-center text-rose-400 text-xs font-bold">D</div>
							<div class="p-3 bg-slate-800/60 rounded-lg border border-rose-500/20 flex items-center justify-between">
								<span class="text-slate-300">Component is about to be fully removed from DOM</span>
								<span class="font-mono text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">onBeforeUnmount</span>
							</div>
						</div>

						<div class="relative">
							<div class="absolute -left-[2.75rem] top-1 w-7 h-7 rounded-full bg-slate-700 border-2 border-rose-400 flex items-center justify-center text-rose-400 text-xs font-bold">D</div>
							<div class="p-3 bg-slate-800/60 rounded-lg border border-rose-500/20 flex items-center justify-between">
								<span class="text-slate-300">Component removed — watchers &amp; effects cleaned up</span>
								<span class="font-mono text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">onUnmounted</span>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

		<!-- Individual Hook Deep Dives -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-5">

			<!-- onMounted -->
			<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
				<div class="bg-slate-800/80 p-4 border-b border-slate-700/50 flex items-center justify-between">
					<h3 class="text-base font-bold text-white flex items-center gap-2">
						<span class="text-green-400">🟢</span>
						<code class="text-green-300">onMounted</code>
					</h3>
					<span class="text-xs font-mono px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400">Most Used</span>
				</div>
				<div class="p-5 space-y-3 flex-1">
					<p class="text-slate-300 text-sm leading-relaxed">
						Fires once after the component's DOM is created and inserted into the page. Template refs are
						guaranteed to be populated. This is your <strong>entry point for anything DOM-dependent</strong>.
					</p>
					<div class="bg-slate-900 rounded-lg p-3 font-mono text-xs border border-slate-700 shadow-inner leading-relaxed overflow-x-auto">
						<span class="text-blue-300">onMounted</span><span class="text-slate-300">(() => {</span><br />
						<span class="text-slate-500">&nbsp;&nbsp;// ✅ DOM is ready, refs are accessible</span><br />
						<span class="text-slate-300">&nbsp;&nbsp;chart.</span><span class="text-green-300">init</span><span class="text-slate-300">(canvasRef.value)</span><br />
						<span class="text-slate-300">&nbsp;&nbsp;fetchUser()</span><br />
						<span class="text-slate-300">})</span>
					</div>
					<div class="p-3 bg-slate-800/60 rounded-lg border border-slate-700/40 text-xs text-slate-400 leading-relaxed">
						<strong class="text-slate-300">🎯 Use for:</strong> Fetching initial data, initialising third-party
						libraries (charts, maps), attaching non-reactive event listeners, reading DOM dimensions.
					</div>
				</div>
			</div>

			<!-- onUnmounted -->
			<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
				<div class="bg-slate-800/80 p-4 border-b border-slate-700/50 flex items-center justify-between">
					<h3 class="text-base font-bold text-white flex items-center gap-2">
						<span class="text-rose-400">🔴</span>
						<code class="text-rose-300">onUnmounted</code>
					</h3>
					<span class="text-xs font-mono px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400">Cleanup</span>
				</div>
				<div class="p-5 space-y-3 flex-1">
					<p class="text-slate-300 text-sm leading-relaxed">
						Fires after the component has been fully removed from the DOM. All child components are also
						unmounted. <strong>The go-to hook for cleaning up</strong> anything you started in
						<code>onMounted</code>.
					</p>
					<div class="bg-slate-900 rounded-lg p-3 font-mono text-xs border border-slate-700 shadow-inner leading-relaxed overflow-x-auto">
						<span class="text-slate-500">// Set up in onMounted:</span><br />
						<span class="text-blue-300">const</span><span class="text-slate-300"> timer = </span><span class="text-yellow-300">setInterval</span><span class="text-slate-300">(tick, 1000)</span><br /><br />
						<span class="text-blue-300">onUnmounted</span><span class="text-slate-300">(() => {</span><br />
						<span class="text-slate-500">&nbsp;&nbsp;// ✅ Prevent memory leaks</span><br />
						<span class="text-yellow-300">&nbsp;&nbsp;clearInterval</span><span class="text-slate-300">(timer)</span><br />
						<span class="text-slate-300">&nbsp;&nbsp;socket.</span><span class="text-rose-300">disconnect</span><span class="text-slate-300">()</span><br />
						<span class="text-slate-300">})</span>
					</div>
					<div class="p-3 bg-slate-800/60 rounded-lg border border-slate-700/40 text-xs text-slate-400 leading-relaxed">
						<strong class="text-slate-300">🎯 Use for:</strong> Clearing timers/intervals, disconnecting websockets,
						removing manual event listeners, destroying chart/map instances.
					</div>
				</div>
			</div>

			<!-- onBeforeMount -->
			<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
				<div class="bg-slate-800/80 p-4 border-b border-slate-700/50 flex items-center justify-between">
					<h3 class="text-base font-bold text-white flex items-center gap-2">
						<span class="text-purple-400">🟣</span>
						<code class="text-purple-300">onBeforeMount</code>
					</h3>
					<span class="text-xs font-mono px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400">Rare</span>
				</div>
				<div class="p-5 space-y-3 flex-1">
					<p class="text-slate-300 text-sm leading-relaxed">
						Runs just before Vue inserts the component into the DOM. Reactive data is ready, but
						<code>templateRef.value</code> is still <code>null</code>. Rarely needed in practice — most
						initialisation should happen in <code>setup()</code> or <code>onMounted</code>.
					</p>
					<div class="bg-slate-900 rounded-lg p-3 font-mono text-xs border border-slate-700 shadow-inner leading-relaxed overflow-x-auto">
						<span class="text-blue-300">onBeforeMount</span><span class="text-slate-300">(() => {</span><br />
						<span class="text-slate-500">&nbsp;&nbsp;// ❌ DOM not ready yet</span><br />
						<span class="text-slate-500">&nbsp;&nbsp;// console.log(myRef.value) → null</span><br /><br />
						<span class="text-slate-500">&nbsp;&nbsp;// ✅ Good for last-chance data setup</span><br />
						<span class="text-slate-300">&nbsp;&nbsp;prepareConfig()</span><br />
						<span class="text-slate-300">})</span>
					</div>
					<div class="p-3 bg-slate-800/60 rounded-lg border border-slate-700/40 text-xs text-slate-400 leading-relaxed">
						<strong class="text-slate-300">🎯 Use for:</strong> Last-chance reactive data prep before render.
						In SSR apps, this also runs server-side (unlike <code>onMounted</code>).
					</div>
				</div>
			</div>

			<!-- onUpdated -->
			<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
				<div class="bg-slate-800/80 p-4 border-b border-slate-700/50 flex items-center justify-between">
					<h3 class="text-base font-bold text-white flex items-center gap-2">
						<span class="text-yellow-400">🟡</span>
						<code class="text-yellow-300">onUpdated</code>
					</h3>
					<span class="text-xs font-mono px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">Careful</span>
				</div>
				<div class="p-5 space-y-3 flex-1">
					<p class="text-slate-300 text-sm leading-relaxed">
						Fires after every DOM re-render triggered by a reactive data change. The DOM is fresh
						here. However, <strong>mutating state inside this hook will cause an infinite loop</strong> — use
						<code>watch</code> for reacting to specific data instead.
					</p>
					<div class="bg-slate-900 rounded-lg p-3 font-mono text-xs border border-slate-700 shadow-inner leading-relaxed overflow-x-auto">
						<span class="text-blue-300">onUpdated</span><span class="text-slate-300">(() => {</span><br />
						<span class="text-slate-500">&nbsp;&nbsp;// ✅ Read fresh DOM after reactive change</span><br />
						<span class="text-slate-300">&nbsp;&nbsp;console.</span><span class="text-green-300">log</span><span class="text-slate-300">(listRef.value?.scrollHeight)</span><br /><br />
						<span class="text-slate-500">&nbsp;&nbsp;// ❌ Never mutate state here!</span><br />
						<span class="text-slate-500">&nbsp;&nbsp;// count.value++ → infinite loop</span><br />
						<span class="text-slate-300">})</span>
					</div>
					<div class="p-3 bg-slate-800/60 rounded-lg border border-slate-700/40 text-xs text-slate-400 leading-relaxed">
						<strong class="text-slate-300">🎯 Use for:</strong> Reading updated DOM measurements after <em>any</em>
						reactive change. Prefer <code>watch</code> if you need to react to a <em>specific</em> piece of data.
					</div>
				</div>
			</div>

			<!-- onActivated / onDeactivated -->
			<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
				<div class="bg-slate-800/80 p-4 border-b border-slate-700/50 flex items-center justify-between">
					<h3 class="text-base font-bold text-white flex items-center gap-2">
						<span class="text-orange-400">🟠</span>
						<code class="text-orange-300">onActivated</code> / <code class="text-orange-300">onDeactivated</code>
					</h3>
					<span class="text-xs font-mono px-2 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400">KeepAlive only</span>
				</div>
				<div class="p-5 space-y-3 flex-1">
					<p class="text-slate-300 text-sm leading-relaxed">
						Only relevant inside a <code>&lt;KeepAlive&gt;</code> wrapper. When a component is hidden,
						it isn't unmounted — it's <em>deactivated</em>. When shown again, it's <em>activated</em>.
						Neither <code>onMounted</code> nor <code>onUnmounted</code> fire during these transitions.
					</p>
					<div class="bg-slate-900 rounded-lg p-3 font-mono text-xs border border-slate-700 shadow-inner leading-relaxed overflow-x-auto">
						<span class="text-blue-300">onActivated</span><span class="text-slate-300">(() => {</span><br />
						<span class="text-slate-500">&nbsp;&nbsp;// Tab switched back to this component</span><br />
						<span class="text-slate-300">&nbsp;&nbsp;refreshData()  </span><span class="text-slate-500">// re-sync stale data</span><br />
						<span class="text-slate-300">})</span><br /><br />
						<span class="text-blue-300">onDeactivated</span><span class="text-slate-300">(() => {</span><br />
						<span class="text-slate-500">&nbsp;&nbsp;// Tab switched away, component cached</span><br />
						<span class="text-slate-300">&nbsp;&nbsp;pauseVideo()   </span><span class="text-slate-500">// pause anything live</span><br />
						<span class="text-slate-300">})</span>
					</div>
					<div class="p-3 bg-slate-800/60 rounded-lg border border-slate-700/40 text-xs text-slate-400 leading-relaxed">
						<strong class="text-slate-300">🎯 Use for:</strong> Refreshing stale data when a cached tab re-appears,
						pausing video/audio/animations when hidden, re-subscribing to real-time feeds.
					</div>
				</div>
			</div>

			<!-- onBeforeUnmount -->
			<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
				<div class="bg-slate-800/80 p-4 border-b border-slate-700/50 flex items-center justify-between">
					<h3 class="text-base font-bold text-white flex items-center gap-2">
						<span class="text-rose-400">🔴</span>
						<code class="text-rose-300">onBeforeUnmount</code>
					</h3>
					<span class="text-xs font-mono px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400">Cleanup</span>
				</div>
				<div class="p-5 space-y-3 flex-1">
					<p class="text-slate-300 text-sm leading-relaxed">
						Fires just <em>before</em> the component is torn down. The component is still fully functional —
						the DOM still exists and all child components are still mounted. Last chance to
						<strong>save state or trigger graceful shutdown logic</strong> before destruction.
					</p>
					<div class="bg-slate-900 rounded-lg p-3 font-mono text-xs border border-slate-700 shadow-inner leading-relaxed overflow-x-auto">
						<span class="text-blue-300">onBeforeUnmount</span><span class="text-slate-300">(() => {</span><br />
						<span class="text-slate-500">&nbsp;&nbsp;// DOM still exists here!</span><br />
						<span class="text-slate-300">&nbsp;&nbsp;saveScrollPosition()</span><br />
						<span class="text-slate-300">&nbsp;&nbsp;flushPendingRequests()</span><br />
						<span class="text-slate-300">})</span>
					</div>
					<div class="p-3 bg-slate-800/60 rounded-lg border border-slate-700/40 text-xs text-slate-400 leading-relaxed">
						<strong class="text-slate-300">🎯 Use for:</strong> Saving component state before navigation,
						cancelling in-flight async requests, flushing analytics events.
					</div>
				</div>
			</div>

		</div>

		<!-- Quick Comparison Table -->
		<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
			<div class="bg-slate-800/80 p-5 border-b border-slate-700/50 flex items-center justify-between">
				<h3 class="text-lg font-bold text-white flex items-center gap-2">
					<span class="text-yellow-400">📊</span> Quick Reference
				</h3>
				<span class="text-xs font-mono px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">Cheat Sheet</span>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-slate-700/50 bg-slate-800/40">
							<th class="text-left px-5 py-3 text-slate-400 font-bold uppercase text-xs tracking-widest">Hook</th>
							<th class="text-left px-5 py-3 text-slate-400 font-bold uppercase text-xs tracking-widest">DOM ready?</th>
							<th class="text-left px-5 py-3 text-slate-400 font-bold uppercase text-xs tracking-widest">Fires on</th>
							<th class="text-left px-5 py-3 text-slate-400 font-bold uppercase text-xs tracking-widest">React equivalent</th>
							<th class="text-left px-5 py-3 text-slate-400 font-bold uppercase text-xs tracking-widest">Frequency</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-700/30">
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3 font-mono text-purple-300 text-xs">onBeforeMount</td>
							<td class="px-5 py-3 text-slate-300">❌ Not yet</td>
							<td class="px-5 py-3 text-slate-300">Once</td>
							<td class="px-5 py-3 font-mono text-[#61DAFB] text-xs">—</td>
							<td class="px-5 py-3 text-slate-400 text-xs">Rare</td>
						</tr>
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3 font-mono text-green-300 text-xs">onMounted</td>
							<td class="px-5 py-3 text-slate-300">✅ Yes</td>
							<td class="px-5 py-3 text-slate-300">Once</td>
							<td class="px-5 py-3 font-mono text-[#61DAFB] text-xs">useEffect(() =&gt; {}, [])</td>
							<td class="px-5 py-3 text-slate-400 text-xs">Very common</td>
						</tr>
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3 font-mono text-yellow-300 text-xs">onBeforeUpdate</td>
							<td class="px-5 py-3 text-slate-300">✅ Stale</td>
							<td class="px-5 py-3 text-slate-300">Every update</td>
							<td class="px-5 py-3 font-mono text-[#61DAFB] text-xs">—</td>
							<td class="px-5 py-3 text-slate-400 text-xs">Rare</td>
						</tr>
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3 font-mono text-yellow-300 text-xs">onUpdated</td>
							<td class="px-5 py-3 text-slate-300">✅ Fresh</td>
							<td class="px-5 py-3 text-slate-300">Every update</td>
							<td class="px-5 py-3 font-mono text-[#61DAFB] text-xs">useEffect (with deps)</td>
							<td class="px-5 py-3 text-slate-400 text-xs">Occasional</td>
						</tr>
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3 font-mono text-orange-300 text-xs">onActivated</td>
							<td class="px-5 py-3 text-slate-300">✅ Yes</td>
							<td class="px-5 py-3 text-slate-300">KeepAlive restore</td>
							<td class="px-5 py-3 font-mono text-[#61DAFB] text-xs">—</td>
							<td class="px-5 py-3 text-slate-400 text-xs">KeepAlive only</td>
						</tr>
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3 font-mono text-orange-300 text-xs">onDeactivated</td>
							<td class="px-5 py-3 text-slate-300">✅ Yes</td>
							<td class="px-5 py-3 text-slate-300">KeepAlive hide</td>
							<td class="px-5 py-3 font-mono text-[#61DAFB] text-xs">—</td>
							<td class="px-5 py-3 text-slate-400 text-xs">KeepAlive only</td>
						</tr>
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3 font-mono text-rose-300 text-xs">onBeforeUnmount</td>
							<td class="px-5 py-3 text-slate-300">✅ Still</td>
							<td class="px-5 py-3 text-slate-300">Once</td>
							<td class="px-5 py-3 font-mono text-[#61DAFB] text-xs">—</td>
							<td class="px-5 py-3 text-slate-400 text-xs">Occasional</td>
						</tr>
						<tr class="hover:bg-slate-800/30 transition-colors">
							<td class="px-5 py-3 font-mono text-rose-300 text-xs">onUnmounted</td>
							<td class="px-5 py-3 text-slate-300">❌ Gone</td>
							<td class="px-5 py-3 text-slate-300">Once</td>
							<td class="px-5 py-3 font-mono text-[#61DAFB] text-xs">useEffect cleanup fn</td>
							<td class="px-5 py-3 text-slate-400 text-xs">Very common</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- React comparison callout -->
		<div class="flex flex-col rounded-xl border-2 border-slate-700/50 bg-[#0F172A] overflow-hidden shadow-lg">
			<div class="bg-slate-800/80 p-5 border-b border-slate-700/50 flex items-center justify-between">
				<h3 class="text-lg font-bold text-white flex items-center gap-2">
					<svg viewBox="-11.5 -10.23174 23 20.46348" class="w-5 h-5 fill-none stroke-[#61DAFB]">
						<circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
						<g stroke="#61DAFB" stroke-width="1">
							<ellipse rx="11" ry="4.2" />
							<ellipse rx="11" ry="4.2" transform="rotate(60)" />
							<ellipse rx="11" ry="4.2" transform="rotate(120)" />
						</g>
					</svg>
					React vs Vue: Lifecycle Mapping
				</h3>
				<span class="text-xs font-mono px-2 py-1 rounded bg-slate-700 border border-slate-600 text-slate-400">For React Devs</span>
			</div>
			<div class="p-6 space-y-4 text-sm text-slate-300 leading-relaxed">
				<p>
					In React, <code>useEffect</code> does the heavy lifting for all lifecycle phases — you just vary
					the dependency array and return value. Vue <strong>explicitly names each phase</strong>, which makes
					intent far clearer at a glance.
				</p>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="bg-slate-900 rounded-lg p-4 border border-slate-700 space-y-2">
						<p class="text-xs font-bold text-[#61DAFB] uppercase tracking-widest mb-3">React</p>
						<div class="font-mono text-xs space-y-1 text-slate-300 leading-loose">
							<div><span class="text-yellow-300">useEffect</span>(<span class="text-slate-400">() =&gt; {</span></div>
							<div class="pl-4 text-slate-500">// runs after every render</div>
							<div class="pl-4"><span class="text-yellow-300">return</span> () =&gt; { /* cleanup */ }</div>
							<div><span class="text-slate-400">})</span></div>
							<div class="mt-2"><span class="text-yellow-300">useEffect</span>(<span class="text-slate-400">() =&gt; {</span></div>
							<div class="pl-4 text-slate-500">// runs once on mount</div>
							<div class="pl-4"><span class="text-yellow-300">return</span> () =&gt; { /* unmount */ }</div>
							<div><span class="text-slate-400">}, [])</span></div>
						</div>
					</div>
					<div class="bg-slate-900 rounded-lg p-4 border border-slate-700 space-y-2">
						<p class="text-xs font-bold text-green-400 uppercase tracking-widest mb-3">Vue 3 Equivalent</p>
						<div class="font-mono text-xs space-y-1 text-slate-300 leading-loose">
							<div><span class="text-green-300">onUpdated</span><span class="text-slate-400">(() =&gt; {</span></div>
							<div class="pl-4 text-slate-500">// runs after every DOM patch</div>
							<div><span class="text-slate-400">})</span></div>
							<div class="mt-2"><span class="text-green-300">onMounted</span><span class="text-slate-400">(() =&gt; {</span></div>
							<div class="pl-4 text-slate-500">// runs once on mount</div>
							<div><span class="text-slate-400">})</span></div>
							<div><span class="text-green-300">onUnmounted</span><span class="text-slate-400">(() =&gt; {</span></div>
							<div class="pl-4 text-slate-500">// cleanup</div>
							<div><span class="text-slate-400">})</span></div>
						</div>
					</div>
				</div>
				<div class="p-4 bg-slate-800/60 rounded-lg border border-slate-700/40 text-xs text-slate-400 leading-relaxed">
					<strong class="text-slate-300">💡 Key insight:</strong> Vue's dedicated hooks mean you never accidentally conflate
					"mount" with "update" logic — a common React footgun when developers forget whether their
					<code>useEffect</code> is supposed to run once or on every change.
				</div>
			</div>
		</div>

	</div>
</template>

<script setup lang="ts">
// No reactive state needed — this is a pure documentation page
</script>
