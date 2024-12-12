<script lang="ts">
	import { Toggle as TogglePrimitive } from 'bits-ui';
	import { type Size, type Variant, toggleVariants } from './index.js';
	import { cn } from '$lib/utils.js';

	type $$Props = TogglePrimitive.Props & {
		variant?: Variant;
		size?: Size;
	};
	type $$Events = TogglePrimitive.Events;

	interface Props { [key: string]: any }

	let {
		class: className = undefined,
		variant = 'default',
		size = 'default',
		pressed = $bindable(undefined),
		children,
		...rest
	}: Props = $props();
	
</script>

<TogglePrimitive.Root
	bind:pressed
	class={cn(toggleVariants({ variant, size, className }))}
	{...rest}
	on:click
>
	{@render children?.()}
</TogglePrimitive.Root>
