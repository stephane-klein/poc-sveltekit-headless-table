<script>
    import { LoremIpsum } from "lorem-ipsum";
    import { readable, writable } from "svelte/store";
    import { Subscribe } from "svelte-subscribe";
    import { createTable, Render } from "svelte-headless-table";
    import { addHiddenColumns } from "svelte-headless-table/plugins";
    import HeaderAddColmunMenu from "$lib/HeaderAddColumnMenu.svelte";
    import HeaderColmunMenu from "$lib/HeaderColumnMenu.svelte";

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    const lorem = new LoremIpsum();

    const data = readable([
        {
            title: lorem.generateWords(5).capitalize(),
            status: "Todo"
        },
        {
            title: lorem.generateWords(8).capitalize(),
            status: "Todo"
        },
        {
            title: lorem.generateWords(10).capitalize(),
            status: "Todo"
        },
        {
            title: lorem.generateWords(10).capitalize(),

            status: "Todo"
        },
        {
            title: lorem.generateWords(7).capitalize(),
            status: "Todo"
        },
        {
            title: lorem.generateWords(6).capitalize(),
            status: "Todo"
        },
        {
            title: lorem.generateWords(9).capitalize(),
            status: "Todo"
        },
        {
            title: lorem.generateWords(3).capitalize(),
            status: "Todo"
        },
        {
            title: lorem.generateWords(9).capitalize(),
            status: "Todo"
        },
        {
            title: lorem.generateWords(12).capitalize(),
            status: "Todo"
        },
        {
            title: lorem.generateWords(5).capitalize(),
            status: "Todo"
        },
        {
            title: lorem.generateWords(8).capitalize(),
            status: "Todo"
        },
        {
            title: lorem.generateWords(9).capitalize(),
            status: "Todo"
        },
        {
            title: lorem.generateWords(4).capitalize(),
            status: "Todo"
        }
    ]);

    const table = createTable(data, {
        hideCols: addHiddenColumns()
    });

    const columns = table.createColumns([
        table.column({
            header: "Title",
            accessor: "title"
        }),
        table.column({
            header: "Status",
            accessor: "status"
        })
    ]);

    const { flatColumns, headerRows, rows, tableAttrs, tableBodyAttrs, pluginStates } = table.createViewModel(columns);
    const { hiddenColumnIds } = pluginStates.hideCols;
    const ids = flatColumns.map((c) => c.id);
    let hideForId = Object.fromEntries(ids.map((id) => [id, false]));
    $: $hiddenColumnIds = Object.entries(hideForId)
        .filter(([, hide]) => hide)
        .map(([id]) => id);

    function updateHideForIdState(updatedState) {
        hideForId = { ...updatedState };
    }
</script>

<div class="w-3/4 m-auto mt-8">
    <table {...$tableAttrs} class="w-full">
        <thead>
            {#each $headerRows as headerRow (headerRow.id)}
                <Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
                    <tr {...rowAttrs}>
                        {#each headerRow.cells as cell (cell.id)}
                            <Subscribe attrs={cell.attrs()} let:attrs>
                                <th {...attrs} class="px-4 py-2 border-b-2 border-r text-left">
                                    <div class="flex flex-row gap-2">
                                        <div class="grow"><Render of={cell.render()} /></div>
                                        <!-- <input id="hide-{cell.id}" type="checkbox" bind:checked={hideForId[cell.id]} /> -->
                                        <HeaderColmunMenu />
                                    </div>
                                </th>
                            </Subscribe>
                        {/each}
                        <th class="px-4 py-2 border-b-2 text-left">
                            <HeaderAddColmunMenu {hideForId} {updateHideForIdState} />
                        </th>
                    </tr>
                </Subscribe>
            {/each}
        </thead>
        <tbody {...$tableBodyAttrs}>
            {#each $rows as row (row.id)}
                <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                    <tr {...rowAttrs}>
                        {#each row.cells as cell (cell.id)}
                            <Subscribe attrs={cell.attrs()} let:attrs>
                                <td {...attrs} class="px-4 py-2 border-b border-r">
                                    <Render of={cell.render()} />
                                </td>
                            </Subscribe>
                        {/each}
                        <td class="px-4 py-2 border-b"></td>
                    </tr>
                </Subscribe>
            {/each}
        </tbody>
    </table>
</div>
