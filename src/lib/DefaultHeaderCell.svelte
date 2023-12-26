<script>
    import { onMount } from "svelte";
    import { Popover, PopoverButton, PopoverPanel } from "@rgossiaux/svelte-headlessui";
    import { createPopperActions } from "svelte-popperjs";

    export let title;
    export let onHideField;

    const [popperRef, popperContent] = createPopperActions({
        placement: "bottom"
    });
    const extraOpts = {
        modifiers: [{ name: "offset", options: { offset: [0, 8] } }]
    };

    let panel;
    onMount(() => {
        document.getElementsByTagName("body")[0].append(panel);
    });
</script>

<div class="flex flex-row gap-2 items-center">
    <div class="grow text-gray-500 text-sm">
        {title}
    </div>
    <Popover style="position: relative;">
        <PopoverButton class="hover:bg-gray-100 rounded-lg px-1 py-1 text-gray-600">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-dots"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                use:popperRef
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            </svg>
        </PopoverButton>

        <div bind:this={panel}>
            <PopoverPanel class="absolute -left-5 z-100 flex w-screen max-w-min px-4">
                <div
                    class="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow ring-1 ring-gray-900/5"
                    use:popperContent={extraOpts}
                >
                    <a
                        on:click={onHideField}
                        class="cursor-pointer hover:bg-gray-100 w-full block px-2 py-1 rounded-md text-gray-500"
                    >
                        Hide field
                    </a>
                </div>
            </PopoverPanel>
        </div>
    </Popover>
</div>
