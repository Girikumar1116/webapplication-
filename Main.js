var proId = '';
$(document).ready(function(){ 
    showProducts();
    $("#btn-UpdatePro").click(function(){
        if (proId != '')
        { updateProduct(proId); }
        else { alert("No proper product id found for update"); }
    });
    $("#btn-CreatePro").click(function () {
       
        window.location.href = ('Formpage.html');
        $("btn-ok").click(function () {
            alert("product created successully");
        });
    });
    /*$('#btn-Edit').click(function () {
        alert("edit option");
        window.location.href = 'Formpage.html?edit=';
        
    });*/
    $(document).on('click', '#btn-Edit', function () {
 
        window.location.href = 'Formpage.html?edit=';
        
    });
  
});
function CreateProduct() {
    var url = "/api/Products";
    var product = {};

    if ($("#product_name").val() === '' || $("#product_description").val() === '' || $("#product_price").val() === '' || $("#product_type").val() === '' || $("#product_url").val() === '' || $("#ProductExpiryDate").val() === '') {
        alert("not filled can be left blank ");
    }
    else {
        
        product.product_name = $("#product_name").val();
        product.product_description = $("#product_description").val();
        product.product_price = $("#product_price").val();
        product.product_type = $("#product_type").val();
        product.product_url = $("#product_url").val();
        product.ProductExpiryDate = $("#ProductExpiryDate").val();

        if (product) {
            $.ajax({
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(product),
                type: "Post",
                success: function (result) {
                    clearForm();
                    alert("created succesfull");
                },
                error: function (msg) {
                    alert("error" + JSON.stringify(msg));
                }

            });
        }
    }
}

function showProducts() {
    var url = "/api/Products/";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            //if  (result) {
            $("#tblPro").html('');
            var row = "";
            for (var i = 0; i < result.length; i++) {
                row += "<tr>"
                    + "<td>" + result[i].product_name + "</td>"
                    + "<td>" + result[i].product_description + "</td>"
                    + "<td>" + result[i].product_price + "</td>"
                    + "<td>" + result[i].product_type + "</td>"
                    + "<td>" + result[i].product_url + "</td>"
                    + "<td>" + result[i].productExpiryDate + "</td>"
                    /*+ "<td><button id='btn-Edit'class='btn btn-primary edit'onclick='editProduct(" + result[i].product_id +")'>Edit</button>&nbsp;&nbsp;&nbsp;<button class='btn btn-danger' onClick='deleteProduct(" + result[i].product_id+")'>Delete</button></td>"*/
                    + "<td><button id='btn-Edit' class='btn btn-primary edit' >Edit</button>&nbsp;&nbsp;&nbsp;<button class='btn btn-danger' onClick='deleteProduct(" + result[i].product_id + ")'>Delete</button></td>"
            }
            //if (row != "") {
            $("#tblPro").html(row)
            ////}
            //}
        },
        error: function (msg) {
            alert("error" + msg);
        }
    });
}
function clearForm() {
    
    $("#product_name").val('');
    $("#product_description").val('');
    $("#product_price").val('');
    $("#product_type").val('');
    $("#product_url").val('');
    $("#ProductExpiryDate").val('');
}
function deleteProduct(id) {
    alert(id);
    var url = "/api/Products/" + id;
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Delete",
        success: function (result) {
            clearForm();
            alert("hello");
            alert(JSON.stringify(result))
                console.log('<<<<<<<<<<')
            console.log(result)

            
        },
        error: function (msg) {
            alert( msg);
        }

    });
}
function editProduct(id) {
    
    alert("hello");
    var url = "/api/Products/" + id;
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                proId = result.product_id;
                $("#product_name").val(result.product_name);
                $("#product_description").val(result.product_description);
                $("#product_price").val(result.product_price);
                $("#product_type").val(result.product_type);
                $("#product_url").val(result.product_url);
                $("#ProductExpiryDate").val(result.productExpiryDate);
            }
            $("#btn-CreatePro").prop('disabled', true);
            $("#btn-UpdatePro").prop('disabled', false);

        },
        error: function (msg) {
            alert(msg);
        }

    });
}
function updateProduct(id) {
    var url = "/api/Products/"+id;
    var product = {};
 
    product.product_name = $("#product_name").val();
    product.product_description = $("#product_description").val();
    product.product_price = $("#product_price").val();
    product.product_type = $("#product_type").val();
    product.product_url = $("#product_url").val();
    product.ProductExpiryDate = $("#ProductExpiryDate").val();
    console.log("data", product)

        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(product),
            type: "Put",
            success: function (result) {
                clearForm();
                showProducts();
                $("#btn-CreatePro").prop('disabled', false);
                $("#btn-UpdatePro").prop('disabled', true);

            },
            error: function (msg) {
                alert("error" + msg);
                
                
            }

        });
}
