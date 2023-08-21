<script>
	import { textStore } from '../stores/store';
</script>

<div class="text-area">
	{#each $textStore as text}
		<div class="text-cont"><p>{text.text}</p></div>
	{/each}
</div>

<style>
	.text-area {
		width: 100%;
		height: 100%;
		padding: 20px 0px;
		display: flex;
		background-color: '';
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 9px;
	}

	.text-cont {
		flex: 0 0 auto;
		min-height: 70px;
		width: 95%;
		margin: 0px 0px;
		font-size: 16px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 20px 20px;
		border-radius: 7px;
		border: 0.5px solid #1b1b1b;
		font-size: 14px;
		color: whitesmoke;
	}

	@media (max-width: 600px) {
		.text-cont {
			min-height: 35px;
			font-size: 12px;
		}
	}
</style>
