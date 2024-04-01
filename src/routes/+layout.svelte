<ul>
    <!-- todo: get these paths as names insntead of hard-coding -->
    <li><a href="/dgfiles/list">List</a></li>
    <li><a href="/dgfiles/new">New</a></li>
    <li><a href="/dgfiles/search">Search</a></li>
    <!-- todo: render below ones conditionally, only for specific access levels -->
    <li><a href="/dgfiles/structure">Structure</a></li>
</ul>

<slot />

<style>
    :global(*){
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :global(body){
        padding-inline: 20px;
    }
    ul {
        list-style: none;
        display: flex;
        gap: 10px;
        margin-block: 20px;
    }
</style>