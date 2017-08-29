// Remember, we're in a browser: prevent global variables from happening
// I am passing the jQuery variable into the IIFE so that
// I don't have to rely on global variable name changes in the future
(function($) {
	$(document).ready( () => {
		console.log("loaded");
		var numberOfInputs =  $(".field").size();
		var type = "text";
		$("#newFieldButton").click( () =>{
			console.log(numberOfInputs);
			if(numberOfInputs < 5){
				numberOfInputs ++;
				var newField = $("#firstField").clone();
				newField.find(".fieldLabel").attr('placeholder','field '  + numberOfInputs + " label");
				newField.find(".fieldLabel").val('');
				newField.find("#label0").attr('id',"label"+(numberOfInputs-1));
				newField.find("input[name=fieldType0]").attr("name","fieldType"+ (numberOfInputs-1));
				newField.find("input[type=radio]:checked").attr("checked","false");
				console.log(newField.html());
				newField.appendTo($("#firstField").parent());
			}

		});	
	});
})(jQuery);
