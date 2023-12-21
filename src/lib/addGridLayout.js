import { derived } from "svelte/store";

export const addGridLayout = () =>
    ({ tableState }) => {
        const pluginState = {};

        const deriveTableAttrs = (attrs) => {
            return derived([attrs, tableState.visibleColumns], ([$attrs, $visibleColumns]) => {
                return {
                    ...$attrs,
                    style: {
                        display: "grid",
                        "grid-template-columns": `repeat(${$visibleColumns.length}, auto)`
                    }
                };
            });
        };

        const deriveTableHeadAttrs = (attrs) => {
            return derived(attrs, ($attrs) => {
                return {
                    ...$attrs,
                    style: {
                        display: "contents"
                    }
                };
            });
        };

        const deriveTableBodyAttrs = (attrs) => {
            return derived(attrs, ($attrs) => {
                return {
                    ...$attrs,
                    style: {
                        display: "contents"
                    }
                };
            });
        };

        return {
            pluginState,
            deriveTableAttrs,
            deriveTableHeadAttrs,
            deriveTableBodyAttrs,
            hooks: {
                "thead.tr": () => {
                    const attrs = derived([], () => {
                        return {
                            style: {
                                display: "contents"
                            }
                        };
                    });
                    return { attrs };
                },
                "thead.tr.th": (cell) => {
                    return {
                        style: {
                            "grid-column": `${cell.colstart + 1} / span ${cell.colspan}`
                        }
                    };
                },
                "tbody.tr": () => {
                    const attrs = derived([], () => {
                        return {
                            style: {
                                display: "contents"
                            }
                        };
                    });
                    return { attrs };
                },
            },
        };
    };
