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
    let visibleColumns = Object.fromEntries(flatColumns.map((c) => c.id).map((id) => [id, true]));
    $: $hiddenColumnIds = Object.entries(visibleColumns)
        .filter(([, visible]) => !visible)
        .map(([id]) => id);
</script>

<p>Hello</p>

<div class="w-3/4 m-auto mt-8">
    <table {...$tableAttrs} class="w-full">
        <thead>
            {#each $headerRows as headerRow (headerRow.id)}
                <Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
                    <tr {...rowAttrs}>
                        {#each headerRow.cells as cell (cell.id)}
                            <Subscribe attrs={cell.attrs()} let:attrs>
                                <th {...attrs} class="px-4 border-b-2 border-r text-left">
                                    <div class="flex flex-row gap-2 items-center">
                                        <div class="grow text-gray-500 text-sm"><Render of={cell.render()} /></div>
                                        <HeaderColmunMenu
                                            onHideField={() => {
                                                visibleColumns[cell.id] = false;
                                            }}
                                        />
                                    </div>
                                </th>
                            </Subscribe>
                        {/each}
                        <th class="px-4 py-2 border-b-2 text-left">
                            <HeaderAddColmunMenu bind:state={visibleColumns} />
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
