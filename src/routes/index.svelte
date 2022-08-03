<script>
	import Header from '../lib/Header.svelte';
	import { db, auth, storage } from '../firebase';
	import {
		doc,
		updateDoc,
		arrayUnion,
		setDoc,
		getDoc,
		increment,
		query,
		onSnapshot,
		collection,
		orderBy
	} from 'firebase/firestore';
	import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

	let show = false;
	let link = '';

	async function submitFile() {
		let ref = doc(db, 'submits', auth.currentUser.email);
		const docSnap = await getDoc(ref);
		if (docSnap.exists()) {
			updateDoc(ref, {
				file: arrayUnion(link),
				ctr: increment(1)
			});
		} else {
			setDoc(ref, {
				name: auth.currentUser.displayName,
				email: auth.currentUser.email,
				img: auth.currentUser.photoURL,
				file: [link],
				ctr: 1
			});
		}
		show = false;
	}

	let q = query(collection(db, 'submits'), orderBy('ctr'));
	let list = [];
	const unsubscribe = onSnapshot(q, (querySnapshot) => {
		let fb = [];
		querySnapshot.forEach((doc) => {
			let item = { ...doc.data(), id: doc.id };
			fb = [item, ...fb];
		});
		list = fb;
	});

	let file;
	let prog = 0;

	const handleFile = () => {
		if (file && file[0]) {
			const storageRef = ref(storage, `media/${file[0].name}`);
			console.log(file);
			const uploadTask = uploadBytesResumable(storageRef, file[0]);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + prog + '% done');
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							break;
					}
				},
				(error) => {
					console.log(error);
				},
				() => {
					console.log('im run');
					getDownloadURL(storageRef).then((downloadURL) => {
						link = downloadURL;
					});
				}
			);
		}
	};

	const removeFile = () => {
		const storageRef = ref(storage, `${id}/${file[0].name}`);
		deleteObject(storageRef).then(() => {
			console.log('Removed File');
		});
		file = [];
	};
</script>

<body>
	<Header />
	<main>
		<div class="list">
			<h1><i class="bi bi-trophy" style="margin-right: 0.5em; color: #00ad6b;" /> Leaderboard:</h1>
			<div class="items">
				{#each list as e, i}
					<div class="item">
						<div class="info">
							<h2 class="rank" class:gold={i == 0} class:silv={i == 1} class:bronz={i == 2}>
								{i + 1}
							</h2>
							<div class="profile">
								<img src={e.img} alt="" srcset="" />
								<div class="txt">
									<h2>{e.name}</h2>
									<h3>{e.id}</h3>
								</div>
							</div>
						</div>

						<h2 class="score"><span>{e.ctr || 0}</span> trees</h2>
					</div>
				{/each}
			</div>
		</div>
	</main>
</body>

<div class="new">
	<div
		class="button"
		on:click={() => {
			show = true;
		}}
	>
		<i class="bi bi-plus-circle-fill" />
		<h1>Submit New</h1>
	</div>
</div>

{#if show == true}
	<div
		class="upload"
		on:click|self={() => {
			show = false;
		}}
	>
		<input type="file" bind:files={file} id="lmao" on:change={handleFile} />
		<div class="form">
			<div class="top">
				<h1>Upload Proof:</h1>
			</div>
			<label class="upBox" for="lmao">
				<i class="bi bi-folder-plus" />
				Click to Upload Media File
			</label>
			{#if file}
				<div class="fileProg">
					<div class="progBar" style="width: {prog}%" />
				</div>
			{/if}
			<div class="link">
				<h2>Or Upload from URL:</h2>
				<input type="text" bind:value={link} />
			</div>
			<button class="submitUpload" on:click={submitFile}
				><i class="bi bi-upload" /> Upload File</button
			>
		</div>
	</div>
{/if}

<style>
	main {
		display: flex;
		justify-content: center;
		padding: 1rem;
	}
	.new {
		position: absolute;
		bottom: 0;
		padding: 1em;
		z-index: 100;
	}
	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #121212;
		padding: 0.1em 1em;
		padding-left: 5px;
		border-radius: 100px 20px 20px 100px;
	}
	.button i {
		color: #6edbb1;
		font-size: 2rem;
		margin-right: 0.2em;
	}
	.upload {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: hsla(0, 0%, 7%, 0.4);
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 20px;
		background-color: #0e0e0e;
		width: 550px;
	}
	.form > .top {
		border-bottom: 2px solid #6edbb1;
		margin: 0;
		width: 100%;
		padding: 0.5em 1em;
	}
	.upBox {
		padding: 1em;
		font-size: 2rem;
		font-weight: 800;
		margin: 1em 0;
		border: 3px dashed #6edbb1;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #1d1d1d;
	}
	.upBox i {
		font-size: 5rem;
		color: #00ad6b;
	}
	.link {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0.5em 1em;
	}
	.link > input {
		margin-top: 0.5em;
		width: 100%;
		padding: 0.5em;
		border: 1px solid #6edbb1;
		border-radius: 5px;
		background-color: #1d1d1d;
		color: whitesmoke;
	}
	.submitUpload {
		margin: 1em 0;
		padding: 0.5em 1em;
		border: 1px solid currentColor;
		border-radius: 5px;
		background-color: transparent;
		color: whitesmoke;
	}

	.list {
		width: 700px;
		padding: 0.5em 0;
		background-color: rgb(24, 23, 23);
		border-radius: 10px;
	}
	.list > h1 {
		font-size: 2rem;
		font-weight: 800;
		margin: 0;
		border-bottom: 2px solid #6edbb1;
		padding: 0 0.5em;
		padding-bottom: 0.2em;
	}
	.items {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0.5em 0.5em;
	}
	.info {
		display: flex;
		align-items: center;
	}
	.profile {
		display: flex;
		align-items: center;
	}
	.item img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 0.5em;
	}
	.rank {
		font-size: 2rem;
		font-weight: 800;
		margin: 0 0.5em;
		padding: 0 0.5em;
		padding-bottom: 0.2em;
	}
	.txt > h2,
	.txt > h3 {
		margin: 0;
		vertical-align: middle;
	}
	.txt > h3 {
		font-size: 1rem;
		color: gray;
	}
	.score {
		font-size: 1.8rem;
		font-weight: 800;
		margin: 0 0.5em;
		padding: 0 0.5em;
		padding-bottom: 0.2em;
	}
	.score > span {
		color: #00ad6b;
		font-size: 2rem;
	}
	#lmao {
		display: none;
	}
	.fileProg {
		background-color: rgb(6, 6, 6);
		width: 90%;
		padding: 0.5em;
		border-radius: 10px;
	}
	.progBar {
		height: 15px;
		background-color: #00ad6b;
		border-radius: 5px;
	}
	.gold {
		color: #f9d71c;
	}
	.silv {
		color: #b8b4b4;
	}
	.bronz {
		color: #b08d57;
	}
</style>
