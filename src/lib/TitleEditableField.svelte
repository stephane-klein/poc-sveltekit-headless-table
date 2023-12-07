<script>
    export let data;
    let isEditing = false;
    let tmpData;
</script>

<h2 class="flex flex-row items-center gap-2">
    {#if isEditing}
        <input class="grow" type="text" bind:value={tmpData} />
        <button
            on:click={() => {
                isEditing = false;
                data = tmpData;
            }}
        >
            Save
        </button>
        <button
            on:click={() => {
                isEditing = false;
            }}
        >
            cancel
        </button>
    {:else}
        <span class="text-3xl grow">{data}</span>
        <span>
            <button
                class="hover:bg-gray-100 px-2 py-1"
                on:click={() => {
                    tmpData = data;
                    isEditing = true;
                }}
            >
                Edit title
            </button>
        </span>
    {/if}
</h2>
