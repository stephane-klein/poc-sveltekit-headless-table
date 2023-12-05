<script>
    export let state;

    import { Popover, PopoverButton, PopoverPanel } from "@rgossiaux/svelte-headlessui";

    let visibleFields;
    let hiddenFields;
    $: {
        visibleFields = Object.fromEntries(Object.entries(state).filter((element) => element[1] === true));
        hiddenFields = Object.fromEntries(Object.entries(state).filter((element) => element[1] === false));
    }
</script>

<Popover style="position: relative;">
    <PopoverButton class="hover:bg-gray-100 px-2 rounded-lg px-1.5 py-1.5 text-gray-600">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-plus"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
        </svg>
    </PopoverButton>

    <PopoverPanel class="absolute -left-5 z-10 mt-5 flex w-screen max-w-min px-4">
        <div
            class="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5"
        >
            <h3>Visible fields</h3>

            <div class="flex flex-col gap-1 my-2">
                {#each Object.keys(visibleFields) as fieldName}
                    <div class="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">
                        <input
                            id="col-hide-{fieldName}"
                            class="cursor-pointer"
                            type="checkbox"
                            bind:checked={state[fieldName]}
                        />
                        <label for="col-hide-{fieldName}" class="text-base cursor-pointer">&nbsp;{fieldName}</label>
                    </div>
                {/each}
            </div>

            <h3>Hidden fields</h3>

            <div class="flex flex-col gap-1 my-2">
                {#each Object.keys(hiddenFields) as fieldName}
                    <div class="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">
                        <input id="col-hide-{fieldName}" type="checkbox" bind:checked={state[fieldName]} />
                        <label for="col-hide-{fieldName}" class="text-base cursor-pointer">&nbsp;{fieldName}</label>
                    </div>
                {/each}
            </div>
        </div>
    </PopoverPanel>
</Popover>
