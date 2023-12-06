<script>
    export let title;
    export let id;
</script>

<div on:click|stopPropagation>
    <a class="hover:text-blue-700 hover:underline">{title}</a>
</div>
