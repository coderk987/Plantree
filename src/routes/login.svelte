<script>
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { auth } from '../firebase';
	import { goto } from '$app/navigation';

	const provider = new GoogleAuthProvider();
	function signIn() {
		signInWithPopup(auth, provider)
			.then((result) => {
				console.log(result);
				goto('/');
			})
			.catch((err) => {
				console.log(err);
			});
	}
</script>

<main>
	<img src="logo.png" alt="" />
	<h1>Plantree</h1>

	<button on:click={signIn}>
		<svg width="20" height="20" fill="none" viewBox="0 0 22 20"
			><path
				fill="#4285F4"
				fill-rule="evenodd"
				d="M19.981 10.21c0-.654-.06-1.283-.172-1.886h-8.911v3.566h5.092c-.22 1.152-.886 2.128-1.888 2.782v2.313h3.058c1.79-1.605 2.821-3.968 2.821-6.776z"
				clip-rule="evenodd"
			/><path
				fill="#34A853"
				fill-rule="evenodd"
				d="M10.898 19.219c2.555 0 4.696-.826 6.262-2.234l-3.058-2.313c-.847.553-1.931.88-3.204.88-2.465 0-4.55-1.621-5.295-3.8H2.442v2.388c1.557 3.013 4.757 5.079 8.456 5.079z"
				clip-rule="evenodd"
			/><path
				fill="#FBBC05"
				fill-rule="evenodd"
				d="M5.603 11.752A5.414 5.414 0 015.307 10c0-.607.107-1.198.296-1.752V5.86H2.442a9.025 9.025 0 000 8.28l3.161-2.388z"
				clip-rule="evenodd"
			/><path
				fill="#EA4335"
				fill-rule="evenodd"
				d="M10.898 4.448c1.389 0 2.636.465 3.617 1.378l2.714-2.644c-1.64-1.487-3.78-2.4-6.331-2.4-3.699 0-6.9 2.065-8.456 5.078l3.161 2.388c.744-2.178 2.83-3.8 5.295-3.8z"
				clip-rule="evenodd"
			/></svg
		>
		Sign In with Google
	</button>
</main>

<style>
	img {
		height: 250px;
		text-align: center;
		margin-bottom: 1em;
	}
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
	h1 {
		font-size: 4rem;
		color: #00ad6b;
		text-align: center;
	}
	button {
		margin-top: 2em;
		background-color: #161616;
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		font-size: 2rem;
		cursor: pointer;
		border-radius: 5px;
		border: 2px solid #00ad6b;
		display: flex;
		align-items: center;
	}
	svg {
		margin-right: 1em;
		transform: scale(2);
	}
	button:hover {
		filter: brightness(1.4);
		transition: all 0.3 ease-in-out;
	}
</style>
