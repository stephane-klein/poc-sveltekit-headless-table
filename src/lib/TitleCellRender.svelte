<script>
    export let title;
    export let id;
</script>

<div on:click|stopPropagation class="px-4 py-2">
    <a class="hover:text-blue-700 hover:underline">{title}</a>
</div>
