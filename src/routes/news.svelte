<script>
	import { onMount } from 'svelte';
	import { each } from 'svelte/internal';
	import Header from '../lib/Header.svelte';

	let dt = [];

	onMount(() => {
		const options = {
			method: 'GET',
			headers: {
				'X-BingApis-SDK': 'true',
				'X-RapidAPI-Key': '38ca3414dbmsh2a1a5a049cd6a69p15700ajsn337caada5613',
				'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
			}
		};

		fetch(
			'https://bing-news-search1.p.rapidapi.com/news/search?q=Air%20Pollution&safeSearch=Off&textFormat=Raw&freshness=Day',
			options
		)
			.then((response) => response.json())
			.then((response) => (dt = response.value))
			.catch((err) => console.error(err));
	});

	$: console.log(dt);
</script>

<body>
	<Header />
	<main>
		<div class="newsList">
			{#each dt as item}
				<div class="item">
					<img
						src={item.image
							? item.image.thumbnail.contentUrl
							: 'https://newsroom.unl.edu/announce/files/file36457.gif'}
						alt=""
					/>
					<a href={item.url} target="__blank"><h2>{item.name}</h2></a>
				</div>
			{/each}
		</div>
	</main>
</body>

<style>
	main {
		display: flex;
		justify-content: center;
	}
	.newsList {
		width: 800px;
		max-width: 90vh;
		padding: 0.5em;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.item {
		width: 100%;
		margin: 1em 0;
		background-color: rgb(23, 23, 23);
		display: flex;
		align-items: center;
		border-radius: 5px;
	}
	.item > img {
		width: 70px;
		border: 2px solid #00ad6b;
		margin-right: 1em;
		border-radius: 5px;
	}
	.item h2 {
		color: #6edbb1;
		font-size: 1.5rem;
	}
	a {
		text-decoration: none;
	}
</style>
