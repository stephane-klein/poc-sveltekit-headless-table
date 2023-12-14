<script>
    import { LoremIpsum } from "lorem-ipsum";
    import { readable, writable } from "svelte/store";
    import { Subscribe } from "svelte-subscribe";
    import { createTable, Render, createRender } from "svelte-headless-table";
    import { addHiddenColumns } from "svelte-headless-table/plugins";
    import { Pane, Splitpanes } from "svelte-splitpanes";

    import HeaderAddColmunMenu from "$lib/HeaderAddColumnMenu.svelte";
    import HeaderColmunMenu from "$lib/HeaderColumnMenu.svelte";
    import TitleCellRender from "$lib/TitleCellRender.svelte";
    import TitleEditableField from "$lib/TitleEditableField.svelte";

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    const lorem = new LoremIpsum();

    const detailPanelRowDataId = writable(null);

    const data = writable([
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
        },
        {
            id: 15,
            title: lorem.generateWords(5).capitalize(),
            status: "Todo"
        },
        {
            id: 16,
            title: lorem.generateWords(8).capitalize(),
            status: "Todo"
        },
        {
            id: 17,
            title: lorem.generateWords(10).capitalize(),
            status: "Todo"
        },
        {
            id: 18,
            title: lorem.generateWords(10).capitalize(),
            status: "Todo"
        },
        {
            id: 19,
            title: lorem.generateWords(7).capitalize(),
            status: "Todo"
        },
        {
            id: 20,
            title: lorem.generateWords(6).capitalize(),
            status: "Todo"
        },
        {
            id: 21,
            title: lorem.generateWords(9).capitalize(),
            status: "Todo"
        },
        {
            id: 22,
            title: lorem.generateWords(3).capitalize(),
            status: "Todo"
        },
        {
            id: 23,
            title: lorem.generateWords(9).capitalize(),
            status: "Todo"
        },
        {
            id: 24,
            title: lorem.generateWords(12).capitalize(),
            status: "Todo"
        },
        {
            id: 25,
            title: lorem.generateWords(5).capitalize(),
            status: "Todo"
        },
        {
            id: 26,
            title: lorem.generateWords(8).capitalize(),
            status: "Todo"
        },
        {
            id: 27,
            title: lorem.generateWords(9).capitalize(),
            status: "Todo"
        },
        {
            id: 28,
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
            cell: ({ row, value }) =>
                createRender(TitleCellRender, {
                    id: value.id,
                    title: value.title
                }).on("click", (event) => {
                    $detailPanelRowDataId = row.dataId;
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

    let panelHorizontal = true;
</script>

<div class="h-screen">
    <Splitpanes horizontal={panelHorizontal} theme="my-theme">
        <Pane minSize={40}>
            <table {...$tableAttrs} class="w-full">
                <thead>
                    {#each $headerRows as headerRow (headerRow.id)}
                        <Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
                            <tr {...rowAttrs}>
                                {#each headerRow.cells as cell (cell.id)}
                                    <Subscribe attrs={cell.attrs()} let:attrs>
                                        <th {...attrs} class="px-4 border-b-2 border-r text-left">
                                            <div class="flex flex-row gap-2 items-center">
                                                <div class="grow text-gray-500 text-sm">
                                                    <Render of={cell.render()} />
                                                </div>
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
                                        <td {...attrs} class="border-b border-r">
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
        </Pane>
        {#if $detailPanelRowDataId !== null}
            <Pane minSize={20} size={40}>
                <div class="p-4 flex flex-col gap-2">
                    <div class="flex flex-row justify-end">
                        {#if panelHorizontal == true}
                            <button on:click={() => (panelHorizontal = false)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="icon icon-tabler icon-tabler-layout-sidebar-right"
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
                                    <path
                                        d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
                                    />
                                    <path d="M15 4l0 16" />
                                </svg>
                            </button>
                        {:else}
                            <button on:click={() => (panelHorizontal = true)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="icon icon-tabler icon-tabler-layout-bottombar"
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
                                    <path
                                        d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
                                    />
                                    <path d="M4 15l16 0" />
                                </svg>
                            </button>
                        {/if}
                        <button on:click={() => ($detailPanelRowDataId = null)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-x"
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
                                <path d="M18 6l-12 12" />
                                <path d="M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div>
                        <TitleEditableField bind:data={$data[$detailPanelRowDataId].title} />
                    </div>
                </div>
            </Pane>
        {/if}
    </Splitpanes>
</div>

<style>
    :global(.splitpanes.my-theme .splitpanes__pane) {
        background-color: white;
    }
    :global(.splitpanes.my-theme .splitpanes__splitter) {
        background-color: #eee;
        box-sizing: border-box;
        position: relative;
        flex-shrink: 0;
    }
    :global(.splitpanes.my-theme .splitpanes__splitter:before),
    :global(.splitpanes.my-theme .splitpanes__splitter:after) {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: rgba(0, 0, 0, 0.15);
        transition: background-color 0.3s;
    }
    :global(.splitpanes.my-theme .splitpanes__splitter:hover:before),
    :global(.splitpanes.my-theme .splitpanes__splitter:hover:after) {
        background-color: rgba(0, 0, 0, 0.25);
    }
    :global(.splitpanes.my-theme .splitpanes__splitter:first-child) {
        cursor: auto;
    }

    :global(.my-theme.splitpanes .splitpanes .splitpanes__splitter) {
        z-index: 1;
    }
    :global(.my-theme.splitpanes--vertical > .splitpanes__splitter),
    :global(.my-theme .splitpanes--vertical > .splitpanes__splitter) {
        width: 7px;
        border-left: 1px solid #eee;
        cursor: col-resize;
    }
    :global(.my-theme.splitpanes--vertical > .splitpanes__splitter:before),
    :global(.my-theme.splitpanes--vertical > .splitpanes__splitter:after),
    :global(.my-theme .splitpanes--vertical > .splitpanes__splitter:before),
    :global(.my-theme .splitpanes--vertical > .splitpanes__splitter:after) {
        transform: translateY(-50%);
        width: 1px;
        height: 30px;
    }
    :global(.my-theme.splitpanes--vertical > .splitpanes__splitter:before),
    :global(.my-theme .splitpanes--vertical > .splitpanes__splitter:before) {
        margin-left: -2px;
    }
    :global(.my-theme.splitpanes--vertical > .splitpanes__splitter:after),
    :global(.my-theme .splitpanes--vertical > .splitpanes__splitter:after) {
        margin-left: 1px;
    }
    :global(.my-theme.splitpanes--horizontal > .splitpanes__splitter),
    :global(.my-theme .splitpanes--horizontal > .splitpanes__splitter) {
        height: 7px;
        border-top: 1px solid #eee;
        cursor: row-resize;
    }
    :global(.my-theme.splitpanes--horizontal > .splitpanes__splitter:before),
    :global(.my-theme.splitpanes--horizontal > .splitpanes__splitter:after),
    :global(.my-theme .splitpanes--horizontal > .splitpanes__splitter:before),
    :global(.my-theme .splitpanes--horizontal > .splitpanes__splitter:after) {
        transform: translateX(-50%);
        width: 30px;
        height: 1px;
    }
    :global(.my-theme.splitpanes--horizontal > .splitpanes__splitter:before),
    :global(.my-theme .splitpanes--horizontal > .splitpanes__splitter:before) {
        margin-top: -2px;
    }
    :global(.my-theme.splitpanes--horizontal > .splitpanes__splitter:after),
    :global(.my-theme .splitpanes--horizontal > .splitpanes__splitter:after) {
        margin-top: 1px;
    }
</style>
