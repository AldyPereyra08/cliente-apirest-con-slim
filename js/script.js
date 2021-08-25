

$(document).ready(function () {
    //Muestra los productos GET
    function getProductos() {
        $.ajax({ 
            url: "http://localhost/slim/api.php/productos",
            type: "get",
            success: function (response) {
                $("#tabla-productos").html('');
                $.each(JSON.parse(response), function (i, index) {
                    if (index.id.length) {
                        $(".table").append("<tr><th>" + index.id + "</th>" +
                            "<td>" + index.name + "</td>" +
                            "<td>"  + index.description + "</td>" +
                            "<td>" + "$" + index.price + "</td>" +
                            "<td><button class='delete btn btn-danger btn-sm' data-producto='" + index.id + "'>Borrar</button></td>" +
                            "<td><button class='update btn btn-info btn-sm' data-producto='" + index.id + "'>Editar</button></td>" +
                            "</tr>");
                    }
                });

                //Elimina fila DELETE
                $(".delete").unbind("click").click(function () {
                    $.ajax({
                        url: "http://localhost/slim/api.php/productos/" + $(this).data("producto"),
                        type: "delete",
                        success: function (response) {
                            $(".table").html("<thead><tr><th>ID</th><th>Nombre</th><th>Descripcion</th><th>Precio</th><th>Eliminar</th><th>Editar</th></tr></thead>");
                            getProductos();
                            $("#form").attr("data-producto", "0");
                            $("#form")[0].reset();
                        }
                    });
                });
                //FIN Elimina fila DELETE

                //Actualizacion datos producto UPDATE
                $(".update").unbind("click").click(function () {
                $("#id_formU").val($(this).parents("tr").find("th")[0].innerHTML);
                $("#name_formU").val($(this).parents("tr").find("td")[0].innerHTML);
                $("#description_formU").val($(this).parents("tr").find("td")[1].innerHTML);
                $("#price_formU").val($(this).parents("tr").find("td")[2].innerHTML);
                });
                //FIN Actualizacion datos producto UPDATE
            }
        });
    }
    //FIN Muestra los productos GET

    getProductos();

// Guardar productos POST
if ($("#form").data("producto") === 0) {
    $("#form").submit(function (e) {
        e.preventDefault();
var nombre = $("#name_formP").val();
var descripcion = $("#description_formP").val();
var precio = $("#price_formP").val();

        $.ajax({
            url: "http://localhost/slim/api.php/productos",
            type: "post",
            data: { name: nombre,
                    description: descripcion, 
                    price: precio 
                },
            success: function (response) {
                $(".table").html("<thead><tr><th>ID</th><th>Nombre</th><th>Descripcion</th><th>Precio</th><th>Eliminar</th><th>Editar</th></tr></thead>");

                getProductos();
                $("#form")[0].reset();
            }
        });

        return false;
    });

}
//FIN Guardar productos POST

//Actualizar datos desde formulario UPDATE
$("#btnActualizar").click(function () {
    var id = $('#id_formU').val();
    var nombre = $('#name_formU').val();
    var descripcion = $('#description_formU').val();
    var precio = $('#price_formU').val();

    $.ajax({
        url: "http://localhost/slim/api.php/productos/" + id,
        type: "put",
        data: { 
            id: id, 
            name: nombre, 
            description: descripcion, 
            price: precio
        },
        success: function () {
            $(".table").html("<thead><tr><th>ID</th><th>Nombre</th><th>Descripcion</th><th>Precio</th><th>Eliminar</th><th>Editar</th></tr></thead>");
            getProductos();
            $("#formUpdate").attr("data-producto", "0");
            $("#formUpdate")[0].reset();
        },
        error: function (err) {
            console.log("Error")
        } 
    });
});
//FIN Actualizar datos desde formulario UPDATE

});




