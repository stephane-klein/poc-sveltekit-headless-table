<script>
    import { LoremIpsum } from "lorem-ipsum";
    import { readable, writable } from "svelte/store";
    import { Subscribe } from "svelte-subscribe";
    import { createTable, Render, createRender } from "svelte-headless-table";
    import { addHiddenColumns } from "svelte-headless-table/plugins";
    import HeaderAddColmunMenu from "$lib/HeaderAddColumnMenu.svelte";
    import HeaderColmunMenu from "$lib/HeaderColumnMenu.svelte";
    import TitleCellRender from "$lib/TitleCellRender.svelte";

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    const lorem = new LoremIpsum();

    const data = readable([
        {
            id: 1,
            title: lorem.generateWords(5).capitalize(),
            status: "Todo"
        },
        {
            id: 2,
            title: lorem.generateWords(8).capitalize(),
            status: "Todo"
        },
        {
            id: 3,
            title: lorem.generateWords(10).capitalize(),
            status: "Todo"
        },
        {
            id: 4,
            title: lorem.generateWords(10).capitalize(),
            status: "Todo"
        },
        {
            id: 5,
            title: lorem.generateWords(7).capitalize(),
            status: "Todo"
        },
        {
            id: 6,
            title: lorem.generateWords(6).capitalize(),
            status: "Todo"
        },
        {
            id: 7,
            title: lorem.generateWords(9).capitalize(),
            status: "Todo"
        },
        {
            id: 8,
            title: lorem.generateWords(3).capitalize(),
            status: "Todo"
        },
        {
            id: 9,
            title: lorem.generateWords(9).capitalize(),
            status: "Todo"
        },
        {
            id: 10,
            title: lorem.generateWords(12).capitalize(),
            status: "Todo"
        },
        {
            id: 11,
            title: lorem.generateWords(5).capitalize(),
            status: "Todo"
        },
        {
            id: 12,
            title: lorem.generateWords(8).capitalize(),
            status: "Todo"
        },
        {
            id: 13,
            title: lorem.generateWords(9).capitalize(),
            status: "Todo"
        },
        {
            id: 14,
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
            accessor: (item) => item,
            cell: ({ value }) =>
                createRender(TitleCellRender, {
                    id: value.id,
                    title: value.title
                }).on("click", (event) => {
                    console.log("ici1");
                    console.log(event);
                    console.log(value);
                })
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

<div class="flex flex-row h-full">
    <div class="h-full grow">
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
                        <tr {...rowAttrs} class="hover:bg-gray-100 cursor-pointer">
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
    <div class="w-1/4 border flex flex-row">
        <div class="relative w-2">
            <div
                class="absolute bg-gray-300 h-full w-1 hover:border-x-4 hover:border-gray-200 box-content
                cursor-col-resize"
            ></div>
        </div>
        <div class="px-2">Panel right</div>
    </div>
</div>
