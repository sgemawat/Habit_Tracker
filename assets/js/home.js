
// Event listener for change in habit-status-dropdown
$('.habit-status-dropdown').on('change',function()
{
    // Get the id and status from the selected dropdown
    let id=this.id
    let status=$(this).val();
    // Redirect to the specified URL with id and status parameters
    window.location.href = `http://localhost:9000/habits/toggleStatus?id=${id}&status=${status}`;
})