<script>
	let email;
	let pass;
	let confirmPass;

	function regUser() {
		console.log('hey');
	}
</script>

<div class="auth-page">
	<section class="center">
		<div class="input-sec">
			<input type="text" placeholder="Enter Text" bind:value={email} />
			<input type="password" placeholder="Enter Text" bind:value={pass} />
			<input type="password" placeholder="Enter Text" bind:value={confirmPass} />
			<button>Submit</button>
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
		background-color: blue;
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
		background-color: coral;
	}
</style>
