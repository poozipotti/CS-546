(function($) {
	$(document).ready( () => {
		$("#formSubmit").click( (event) =>{
			event.preventDefault();
			var formValues = $(".field");
			console.log(formValues.size());
			var title = $("#titleInput").val();
			var type = $("#typeInput").val();
			var blurb = $("#blurbInput").val();
			//form Data is a mixed array;
			var formData = []; 
			for(let i = 0; i<formValues.size(); i++){
				var label = $(formValues[i]).find(".fieldLabel").val();
				var type = $(formValues[i]).find("input[name=fieldType"+(i)+"]:checked").val();
			
				formData.push({"label": label,"type": type});
				console.log("form data:");
				console.log(formData[i]);
			}
			
			var outputObject = {
				"title": title,
				"type" : type,
				"blurb" : blurb,
				"fields":formData	
			};
			console.log(JSON.stringify(outputObject));
			var requestConfig = {
				method: "POST",
				url: "/admin/new",
				contentType: "application/JSON",
				data: JSON.stringify(outputObject)
			};	
			$.ajax(requestConfig).then(function (responseMessage) {
				console.log("response gotten");
				window.location.href = ('/admin/structures');
				console.log("attempted redirect");
			});
	
	
		});	
	});
})(jQuery); // jQuery is exported as $ and jQuery
