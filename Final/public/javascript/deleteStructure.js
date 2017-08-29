(function($) {
	$(document).ready( () => {
		$(".deleteStructure").click( (event) => {
			if($(event.target).text() === "delete"){
				$(event.target).text("confrim?");
			}else{
				var requestConfig = {
					method: "DELETE",
					url: "/admin/structures/"+$(event.target).parent().attr("id"),
				};	
				$.ajax(requestConfig).then(function (responseMessage) {
					console.log("delete:" + responseMessage);
					$(event.target).parent().remove();
				});	
			}
		});
	});
})(jQuery); // jQuery is exported as $ and jQuery
