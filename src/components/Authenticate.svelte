<script>
	import {
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		signOut
	} from 'firebase/auth';
	import { auth } from '../lib/firebase/firebase';
	import { onMount } from 'svelte';

	let email;
	let pass;
	let confirmPass;
	let signup = false;

	async function regUser() {
		if (email && pass) {
			if (signup) {
				try {
					await createUserWithEmailAndPassword(auth, email, pass);
				} catch (error) {
					alert('Sorry an error occured');
				}
			} else {
				await signInWithEmailAndPassword(auth, email, pass);
			}
			(email = ''), (pass = ''), (confirmPass = '');
		}
	}

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const acceptedRoute = ['/'];
			if (!user && !acceptedRoute.includes(window.location.pathname)) {
				window.location.href = '/';
				return;
			}
			if (!user) {
				return;
			}
			if (user && window.location.pathname === '/') {
				window.location.href = '/home';
			}
		});
	});
</script>

<div class="auth-page">
	<section class="center">
		<div class="input-sec">
			<input type="text" placeholder="Enter email" bind:value={email} />
			<input type="password" placeholder="Enter password" bind:value={pass} />
			{#if signup}
				<input type="password" placeholder="Confirm password" bind:value={confirmPass} />
			{/if}
			<button on:click={regUser}>Submit</button>
			<div class="join-action">
				{#if !signup}
					<span> <button on:click={(e) => (signup = !signup)}>I wish to SingUp</button></span>
				{:else}
					<span><button on:click={(e) => (signup = !signup)}>login Instead</button></span>
				{/if}
			</div>
		</div>
	</section>
</div>

<style>
	input,
	button {
		border: none;
		outline: none;
		height: 45px;
		padding: 0px 15px;
	}
	.auth-page {
		width: 100%;
		height: 100vh;
		background-color: coral;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.center {
		width: 60vw;
		height: 60vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #1b1b1b;
		border-radius: 10px;
	}
	.input-sec {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 7px;
	}

	.input-sec > input {
		width: 70%;
		border-radius: 5px;
	}

	.input-sec > button {
		width: 50%;
		margin-top: 10px;
		border-radius: 5px;
		background-color: orange;
	}

	.join-action {
		flex: 0 0 40px;
		width: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 7px;
		font-size: 14px;
		color: whitesmoke;
		font-family: 'Courier New', Courier, monospace;
		letter-spacing: 0cm;
		word-spacing: 0.0002cm;
	}

	.join-action > span > button {
		background-color: transparent;
		height: 30px;
		padding: 2px;
		font-family: 'Courier New', Courier, monospace;
		color: whitesmoke;
	}

	@media (max-width: 600px) {
		.center {
			width: 93%;
			height: 50vh;
		}
	}
</style>
