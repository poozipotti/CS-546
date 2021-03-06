(function($) {
	$(document).ready( () => {
		$(".editStructure").click( (event) => {
			if($(event.target).text() === "edit"){
				$(event.target).text("submit");
				$(event.target).parent().find(".editable").attr("contenteditable","true");
				var shouldHide = $(event.target).parent().find(".canHide");
				var shouldShow = $(event.target).parent().find(".hidden");
				shouldHide.addClass("hidden");
				shouldHide.removeClass("canHide");
				shouldShow.removeClass("hidden");
				shouldShow.addClass("canHide");
			}else{
				var formValues = $(".field");
				var formData = []; 
				for(let i = 0; i<formValues.size(); i++){
					var label = $(formValues[i]).find(".fieldLabel").text();
					var type = $(formValues[i]).find("input[name=fieldType"+(i)+"]:checked").val();
					$(formValues[i]).find("#label" + i).text("label:" + label + " | type: " + type);
					formData.push({"label": label,"type": type});
					console.log("form data:");
					console.log(formData[i]);
				}
				var outputObject = {
					"title": $(event.target).parent().find("#title").text(),
					"type" : $(event.target).parent().find("#type").text(),
					"blurb" : $(event.target).parent().find("#blurb").text(),
					"fields" : formData
				};

				console.log(JSON.stringify(outputObject));
				var requestConfig = {
					method: "PUT",
					url: "/admin/structures/"+$(event.target).parent().attr("id"),
					contentType: "application/JSON",
					data: JSON.stringify(outputObject)
					
				};	
				$.ajax(requestConfig).then(function (responseMessage) {
					console.log(responseMessage);
					$(event.target).parent().find(".editable").attr("contenteditable","false");
					$(event.target).text("edit");
					var shouldHide = $(event.target).parent().find(".canHide");
					var shouldShow = $(event.target).parent().find(".hidden");
					shouldHide.addClass("hidden");
					shouldHide.removeClass("canHide");
					shouldShow.removeClass("hidden");
					shouldShow.addClass("canHide");
				});	
			}
		});
	});
})(jQuery); // jQuery is exported as $ and jQuery
