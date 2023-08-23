<script>
	import Textarea from '../../components/Textarea.svelte';
	import { textStore } from '../../stores/store';
	import { auth, db } from '../../lib/firebase/firebase';
	import {
		collection,
		addDoc,
		serverTimestamp,
		getDocs,
		setDoc,
		doc,
		query,
		orderBy
	} from 'firebase/firestore';
	import { onMount } from 'svelte';

	let text;
	let user;

	onMount(() => {
		auth.onAuthStateChanged((a) => {
			if (a) {
				user = a;
				getMyDocs();
			} else {
				return;
			}
		});
	});

	async function getMyDocs() {
		console.log('getting');
		if (user) {
			const docRef = collection(db, `users/${user.uid}/myclips`);
			const q = query(docRef, orderBy('createdAt', 'asc'));
			const docSnap = await getDocs(q);

			docSnap.forEach((doc) => {
				textStore.update((curr) => {
					return [doc.data(), ...curr];
				});
			});
		}
	}

	function addUser() {
		console.log(user.uid);
		const ref = doc(db, `users/${user.uid}`);
		setDoc(ref, {
			uid: user.uid
		});
	}

	async function handleInput() {
		addUser();
		if (user && text && text.trim().length >= 2) {
			const docRef = collection(db, `users/${user.uid}/myclips`);
			await addDoc(docRef, {
				text: text,
				uid: user.uid,
				createdAt: serverTimestamp()
			});

			textStore.update((val) => {
				return [{ text: text }, ...val];
			});

			text = '';
		}
	}
</script>

<div class="home-page">
	<header>
		<h3>M CLips</h3>
	</header>
	<main class="home-cont">
		<div class="top">
			<textarea bind:value={text} />
			<button on:click={handleInput}> CLIP</button>
		</div>
		<div class="center">
			{#if textStore.length != 0}
				<Textarea />
			{:else}
				<p>No content Clipped</p>
			{/if}
		</div>
	</main>
</div>

<style>
	header {
		width: 100%;
		height: 7vh;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0px;
		display: none;
	}

	.home-page {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: black;
		color: white;
		font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
			sans-serif;
	}

	.home-cont {
		width: 65%;
		height: 95vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		border-radius: 10px;
		background-color: '';
	}

	.home-cont > .top {
		flex: 0 0 30%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		background-color: #1b1b1b;
		border-radius: 20px;
	}

	.top > textarea {
		height: 60%;
		flex: 0 0 65%;
		width: 95%;
		padding: 20px;
		border: none;
		outline: none;
		border-radius: 10px;
		overflow-y: auto;
		overflow-x: hidden;
		background-color: #333333;
		color: whitesmoke;
		resize: none;
	}

	.top > button {
		width: 40%;
		height: 45px;
		border-radius: 5px;
		background-color: orange;
	}

	.home-cont > .center {
		flex: 0 0 65%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: '';
		overflow-y: auto;
		overflow-x: hidden;
		border: 1px solid #353839;
		border-radius: 20px;
	}
	::-webkit-scrollbar {
		background-color: transparent;
		width: 10px;
	}
	::-webkit-scrollbar-thumb {
		background-color: #353839;
		width: 60%;
		border-radius: 60px;
	}
	::-webkit-scrollbar-button {
		background-color: transparent;
	}

	@media (max-width: 600px) {
		.home-cont {
			width: 95%;
			height: 98vh;
		}
		.top {
			justify-content: center;
			gap: 7px;
		}
		.top > textarea {
			width: 95%;
			padding: 15px 0px;
			flex: 0 0 70%;
		}
		.top > button {
			height: 35px;
		}
	}
</style>
