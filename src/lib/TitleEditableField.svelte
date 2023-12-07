<script>
    export let data;
    let editMode = false;
    let tmpData;
</script>

<h2 class="flex flex-row items-center gap-2">
    {#if editMode}
        <input class="grow" type="text" bind:value={tmpData} />
        <button
            on:click={() => {
                editMode = false;
                data = tmpData;
            }}
        >
            Save
        </button>
        <button
            on:click={() => {
                editMode = false;
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
                    editMode = true;
                }}
            >
                Edit title
            </button>
        </span>
    {/if}
</h2>
