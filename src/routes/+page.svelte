<script>
    import { LoremIpsum } from "lorem-ipsum";
    import { writable } from "svelte/store";
    import { Subscribe } from "svelte-subscribe";
    import { createTable, Render, createRender } from "svelte-headless-table";
    import { addHiddenColumns } from "svelte-headless-table/plugins";
    import { addGridLayout } from "$lib/addGridLayout.js";
    import { Pane, Splitpanes } from "svelte-splitpanes";

    import DefaultHeaderCell from "$lib/DefaultHeaderCell.svelte";
    import AddColumnHeaderCell from "$lib/AddColumnHeaderCell.svelte";
    // import HeaderAddColmunMenu from "$lib/HeaderAddColumnMenu.svelte";
    // import HeaderColmunMenu from "$lib/HeaderColumnMenu.svelte";
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
        },
        {
            id: 29,
            title: lorem.generateWords(3).capitalize(),
            status: "Todo"
        },
        {
            id: 30,
            title: lorem.generateWords(9).capitalize(),
            status: "Todo"
        },
        {
            id: 31,
            title: lorem.generateWords(12).capitalize(),
            status: "Todo"
        },
        {
            id: 32,
            title: lorem.generateWords(5).capitalize(),
            status: "Todo"
        },
        {
            id: 33,
            title: lorem.generateWords(8).capitalize(),
            status: "Todo"
        },
        {
            id: 34,
            title: lorem.generateWords(9).capitalize(),
            status: "Todo"
        },
        {
            id: 35,
            title: lorem.generateWords(4).capitalize(),
            status: "Todo"
        }
    ]);

    const table = createTable(data, {
        hideCols: addHiddenColumns(),
        grid: addGridLayout() // CSS Grid is used to implement table sticky header, more info see https://github.com/stephane-klein/poc-sveltekit-headless-table/issues/1#issuecomment-1865949792
    });

    const columnCaptions = {
        title: "Title",
        status: "Status"
    };
    const columns = table.createColumns([
        table.column({
            id: "title",
            header: () =>
                createRender(DefaultHeaderCell, {
                    title: "Title",
                    onHideField: () => {
                        visibleColumns["title"] = false;
                    }
                }),
            accessor: (item) => item,
            cell: ({ row, value }) =>
                createRender(TitleCellRender, {
                    id: value.id,
                    title: value.title
                }).on("click", () => {
                    $detailPanelRowDataId = row.dataId;
                })
        }),
        table.column({
            id: "status",
            header: () =>
                createRender(DefaultHeaderCell, {
                    title: "Status",
                    onHideField: () => {
                        visibleColumns["status"] = false;
                    }
                }),
            accessor: "status"
        }),
        table.column({
            id: "add_column",
            header: () =>
                createRender(AddColumnHeaderCell, {
                    columns: columnCaptions,
                    state: visibleColumns,
                    onChange: (newValue) => {
                        console.log("newValue", newValue);
                        visibleColumns = newValue;
                    }
                }),
            accessor: () => ""
        })
    ]);

    const { flatColumns, headerRows, rows, tableAttrs, tableHeadAttrs, tableBodyAttrs, pluginStates } =
        table.createViewModel(columns);

    const { hiddenColumnIds } = pluginStates.hideCols;
    let visibleColumns = Object.fromEntries(
        flatColumns
            .map((c) => c.id)
            .filter((id) => id != "add_column")
            .map((id) => [id, true])
    );

    $: $hiddenColumnIds = Object.entries(visibleColumns)
        .filter(([, visible]) => !visible)
        .map(([id]) => id);

    let panelHorizontal = true;
</script>

<div class="max-h-screen h-screen flex flex-col">
    <div class="m-auto w-5/6">
        <p class="p-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae pulvinar erat. Aliquam quis dolor vitae
            enim pellentesque sagittis. Suspendisse in dui eu lectus egestas posuere quis id quam. Vivamus eget posuere
            justo. Vestibulum quis neque at lorem tristique rhoncus sed in risus. Cras porta in ligula a dignissim.
            Proin laoreet nulla nec volutpat dictum. Etiam commodo semper neque, a venenatis eros tempor tristique.
            Aliquam suscipit, ipsum sit amet ultrices sagittis, elit mi pellentesque nunc, sit amet suscipit mauris ante
            eget magna.
        </p>

        <p class="p-2">
            Proin ut rhoncus est. Phasellus est justo, scelerisque sit amet elementum at, placerat quis tellus. Proin
            magna purus, tincidunt vel egestas in, mollis faucibus turpis. Vivamus auctor eros id dolor varius, non
            tempus tortor vestibulum. Aliquam velit justo, gravida quis odio nec, mollis dapibus leo. Aliquam erat
            volutpat. Vestibulum rutrum eleifend sapien, pellentesque commodo ex ullamcorper et. Suspendisse vitae ante
            libero. Sed lacus sapien, dapibus efficitur purus ut, elementum bibendum eros. Duis eget tempor felis, vitae
            interdum lorem.
        </p>
    </div>

    <Splitpanes horizontal={panelHorizontal} theme="my-theme" class="grow">
        <Pane minSize={40} class="relative">
            <table {...$tableAttrs} class="w-full">
                <thead {...$tableHeadAttrs}>
                    {#each $headerRows as headerRow (headerRow.id)}
                        <Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
                            <tr {...rowAttrs}>
                                {#each headerRow.cells as cell (cell.id)}
                                    <Subscribe attrs={cell.attrs()} let:attrs>
                                        <th {...attrs} class="px-4 border-b-2 border-r text-left">
                                            <Render of={cell.render()} />
                                        </th>
                                    </Subscribe>
                                {/each}
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
    /* Add table sticky header */
    [role="table"] {
        overflow-y: auto;
        position: absolute;
        top: 0;
        left: 0;
        min-height: 100%;
        width: 100%;
    }
    [role="columnheader"] {
        background-color: white;
        position: sticky;
        top: 0;
        padding: 5px;
        border-bottom: 1px solid #e3e4e4;
    }

    /* Small modification to the splitpane component theme.
       The source code come from: https://orefalo.github.io/svelte-splitpanes/examples/styling/splitters
    */
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
