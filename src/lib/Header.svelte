<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth } from '../firebase';
	import { page } from '$app/stores';

	let tab = 1;

	onMount(() => {
		if (!auth.currentUser) goto('/login');
		let path = $page.url.pathname;
		if (path == '/home') tab = 1;
		else if (path == '/news') tab = 2;
		else if (path == '/user') tab = 3;
	});
</script>

<header>
	<div class="curPage">
		<i class="bi bi-house-door-fill" />
		<h1>Home</h1>
	</div>
	<div class="menu">
		<div
			class="home"
			on:click={() => {
				goto('/');
				tab = 1;
			}}
		>
			<i class="bi bi-house-door-fill" class:active={tab == 1} />
		</div>
		<div
			class="news"
			on:click={() => {
				goto('/news');
				tab = 2;
			}}
		>
			<i class="bi bi-newspaper" class:active={tab == 2} />
		</div>
		<div class="user">
			<i class="bi bi-person-circle" />
		</div>
	</div>
	<div class="logo">
		<img src="logo.png" alt="" />
		<h1>Plantree</h1>
	</div>
</header>

<style>
	header {
		background: rgb(11, 11, 11);
		display: flex;
		padding: 0.5em 1em;
		justify-content: space-between;
	}
	img {
		width: 39px;
		height: 50px;
		margin-right: 1em;
	}
	h1 {
		font-size: 2rem;
		color: #00ad6b;
	}
	.logo {
		display: flex;
	}
	.curPage {
		display: flex;
	}
	i {
		font-size: 2rem;
		margin-right: 1em;
		color: #6edbb1;
	}
	.menu {
		display: flex;
	}
	.menu i {
		font-size: 2rem;
		margin-right: 2.5em;
		color: #6edbb1;
	}
	.active {
		border-bottom: 3px solid #00ad6b;
		padding: 5px 0;
		padding-top: 0;
	}
</style>
