<script>
	import Authenticate from '../components/Authenticate.svelte';

	function checkUser() {
		window.location.href = '/home';
	}
	if (window) {
		checkUser();
	}
</script>

<main>
	<Authenticate />
</main>
