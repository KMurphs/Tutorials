var isAddTaskVisible = true;
var lastEntryID;

$("#control").on("click", function(){
	if(isAddTaskVisible)
		$("#new_task_container").css("display","none");
	else
		$("#new_task_container").css("display","table-row");

	isAddTaskVisible = !isAddTaskVisible;
});


$("#new_task").on("keydown", function(event){
	if(event.which === 13){
		var new_task = $("#new_task").val();
		$("#new_task").val("");

		lastEntryID = new_task.toUpperCase().replace(/ /g,"");
		var new_task_entry = "<tr id=\"" + lastEntryID + "\"><td><div class=\"moves\"><i class=\"fas fa-trash-alt\"></i>yourNewTask</div></td></tr>";
		new_task_entry = new_task_entry.replace("yourNewTask", new_task);

		$("tbody").html($("tbody").html() + new_task_entry);
	}
});



$("table tbody tr").on("click", function(){
	console.log(this.id);
	$( "#" + this.id ).remove();
});







