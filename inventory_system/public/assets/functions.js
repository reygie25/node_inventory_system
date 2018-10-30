//add products
$(document).ready(function() {
    $('#updateBtn').hide();
    $('#cancelBtn').hide();
});

function edit(id, quantity, name, price){
	console.log(id);
	console.log(quantity);
	console.log(name);
	console.log(price);

	$('#name').val(name);
	$('#quantity').val(quantity);
	$('#price').val(price);
	$('#id').val(id);

	$('#updateBtn').show();
	$('#cancelBtn').show();
	$('#submitBtn').hide();
}

function cancel(){
	$('#updateBtn').hide();
	$('#cancelBtn').hide();
	$('#submitBtn').show();

	$('#name').val("");
	$('#quantity').val("");
	$('#price').val("");
	$('#id').val("");
}

