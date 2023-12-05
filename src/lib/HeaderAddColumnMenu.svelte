<script>
    export let ids;
    export let hideForId;
    export let updateHideForIdState;

    import { Popover, PopoverButton, PopoverPanel } from "@rgossiaux/svelte-headlessui";

    console.log("ids", ids);
    console.log("hideForId", hideForId);
</script>

<Popover style="position: relative;">
    <PopoverButton class="hover:bg-gray-100 px-2 py-1">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-plus"
            width="24"
            height="24"
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

    <PopoverPanel class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
        <div
            class="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5"
        >
            <a href="/analytics" class="block p-2 hover:text-indigo-600">Analytics</a>
            <a href="/engagement" class="block p-2 hover:text-indigo-600">Engagement</a>
            <a href="/security" class="block p-2 hover:text-indigo-600">Security</a>
            <a href="/integrations" class="block p-2 hover:text-indigo-600">Integrations</a>

            <h3>Visible fields</h3>

            {#each ids as id}
                <div>
                    <input
                        id="col-hide-{id}"
                        type="checkbox"
                        checked={hideForId[id]}
                        on:input={(event) => {
                            console.log("event", event.target.checked);
                            console.log("ici1", hideForId);
                            hideForId[id] = event.target.checked;
                            updateHideForIdState(hideForId);
                        }}
                    />
                    <label for="col-hide-{id}">{id}</label>
                </div>
            {/each}

            <h3>Hidden fields</h3>
        </div>
    </PopoverPanel>
</Popover>
