(function($) {
	$(document).ready( () => {
		var requestConfig = {
			method: "GET",
			url: "/admin/structures/" + $("#slug").text() + "/JSON"
		}
		$.ajax(requestConfig).then((structure) => {
			console.log(JSON.stringify(structure));
			var convertToJquery = (field) => {
				var newField= $(); 			
				if(!field || field.type == "smallText"){
						
					newField = $("<input type=\"text\" >");
				}
				else if(field.type == "largeText"){
					newField = $("<input type=\"text box\">");
				}
				else if(field.type == "number"){
					newField = $("<input type=\"number\">");
				}
				else if(field.type == "checkBox"){
					newField = $("<input type=\"checkBox\">");
				}
				if(field && field.label){
					newField.attr('placeholder',field.label);
				}
					newField.addClass("inputField");
					newField.attr("data-label",field.label);
				console.log(newField);
				return newField;
			};
			for(var i=0;i<structure.fields.length; i++){
				$("<label>"+structure.fields[i].label+"</label>").appendTo($("#fields"));
				$("</br>").appendTo("#fields");
				convertToJquery(structure.fields[i]).appendTo($("#fields"));
				$("</br>").appendTo("#fields");
				
				
			};
			$(".inputField").after(" \n");
			console.log($("#fields").html());
		});
		$("#newEntry").submit( (event) => {
			event.preventDefault();
				var formValues = $(".inputField");
				console.log("jquery found " + formValues.size() + " entries");
				var formData = []; 
				for(let i = 0; i<formValues.size(); i++){
					var value = $(formValues[i]).val();
					var type = $(formValues[i]).attr("type");
					var label = $(formValues[i]).attr("data-label");
					formData.push({"label": label,"type": type,"value" : value});
					console.log("form data:");
				}
				var outputObject = {
					"title": $("#title").val(),
					"blurb" : $("#blurb").val(),
					"fields" : formData
				};

				console.log(JSON.stringify(outputObject));
				var requestConfig = {
					method: "POST",
					url: "/admin/structures/"+$("#slug").text()+"/new",
					contentType: "application/JSON",
					data: JSON.stringify(outputObject)
					
				};	
				console.log("request config:");
				console.log(JSON.stringify(requestConfig));
				$.ajax(requestConfig).then(function (responseMessage) {
					console.log(responseMessage);
				});	
			});
	});
})(jQuery); // jQuery is exported as $ and jQuery
