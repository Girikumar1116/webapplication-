var proId = '';
$(document).ready(function () {
    getAllProducts();
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






function getAllProducts(page = 1) {
    console.log('Calling getAllProducts with page:', page);
    $.ajax({
        url: `/api/Products?page=${page}`, // Pass the page number as a query parameter
        contentType: "application/json; charset=utf-8",
        type: 'GET',
    }).done(function (response) {
        console.log('Response:', response);

        // Handle the success case
        const productsList = $('#tblPro');
        productsList.empty();
        const products = response.product;

        // Loop through the paginated products and update the table
        products.forEach(product => {
            productsList.append(`
                <tr>
                    <td>${product.product_name}</td>
                    <td>${product.product_description}</td>
                    <td>${product.product_price}</td>
                    <td>${product.product_type}</td>
                    <td>${product.product_url}</td>
                    <td>${product.productExpiryDate}</td>
                    <td>
                        <button class="btn btn-primary edit">Edit</button>
                        &nbsp;&nbsp;&nbsp;
                        <button class="btn btn-danger" onClick="deleteProduct(${product.product_id})">Delete</button>
                    </td>
                </tr>
            `);
        });

        // Update pagination details if available
        if (response.length > 0) {
            var paginationDetails = $('.pagination-details');
            paginationDetails.text(`Page ${page} of ${response[0].totalPages}`);
        }

        // Display pagination buttons
        displayPaginationButtons(response[0].totalPages, page);
    }).fail(function (error) {
        // Handle the error case
        console.error('Error getting products:', error);
    });
}
function displayPaginationButtons(totalPages, currentPage) {
    var paginationButtons = $('.pagination-buttons');
    paginationButtons.empty();

    var buttonText = '<a href="#" class="prevPage">&laquo;</a>';
    for (var i = 1; i <= totalPages; i++) {
        var active = (i === currentPage) ? 'active' : '';
        buttonText += `<a href="#" class="page_index ${active}" data-page="${i}">${i}</a>`;
    }
    buttonText += '<a href="#" class="nextPage">&raquo;</a>';

    paginationButtons.html(buttonText);

    // Bind click event to pagination buttons
    paginationButtons.find('a').click(function (e) {
        e.preventDefault();
        var page = parseInt($(this).attr('data-page'));
        getAllProducts(page);
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
