<script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';
	import { type ToggleVariants, getToggleGroupCtx } from './index.js';
	import { cn } from '$lib/utils.js';
	import { toggleVariants } from '$lib/components/ui/toggle/index.js';

	type $$Props = ToggleGroupPrimitive.ItemProps & ToggleVariants;


	
	interface Props { [key: string]: any }

	let {
		class: className = undefined,
		variant = 'default',
		size = 'default',
		value,
		children,
		...rest
	}: Props = $props();

	const ctx = getToggleGroupCtx();
</script>

<ToggleGroupPrimitive.Item
	class={cn(
		toggleVariants({
			variant: ctx.variant || variant,
			size: ctx.size || size
		}),
		className
	)}
	{value}
	{...rest}
>
	{@render children?.()}
</ToggleGroupPrimitive.Item>
