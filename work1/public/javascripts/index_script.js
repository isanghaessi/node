document.getElementById('graph_form').addEventListener('submit', (event) => {
	if (
		document.getElementById('group_id_input').value == '' ||
		document.getElementById('patient_id_input').value == ''
	) {
		event.preventDefault();
		alert('group_id / patient_id is essential!');
	}
});
