        $(document).ready(function(){
            loadListe();
        })

        $(document).on("change", ".tddCheckbox", function(){
            let todoId = $(this).prop("value");
            let checkedStatus = $(this).prop("checked")

            updateTodoItem(todoId, checkedStatus);
        });

        function updateTodoItem(todoId, checkedStatus) {
            $.ajax({
                url: "http://20.224.117.218:5000/todos",
                method: "PUT",
                data: JSON.stringify({
                    id: todoId,
                    done: checkedStatus }),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).done(function(data){
                updateListe(data)
            });
        }

        function loadListe(){
            $.ajax({
                url: "http://20.224.117.218:5000/todos",

            }).done(function(data) {
                updateListe(data)
            });
        }

        function addItemToListe(){
            let content = $("#ToDo").val();
            $.ajax({
                url: "http://20.224.117.218:5000/todos",
                method: "POST",
                data: JSON.stringify({ name: content}),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).done(function(data){
                updateListe(data)
            });
        }

        function updateListe(data){
            $("#liste").empty();

            for(let i = 0; i < data.length; i++){

                let completedDuty = "";
                let checkboxChecked = "";

                if ((data[i]['done'] == "true")) {
                    completedDuty = "done text-muted text-decoration-line-through";
                    checkboxChecked = "checked";
                }

                let todoItem = `<li class="list-group-item ${completedDuty}">
                                  <input class="form-check-input me-1 rounded-0 tddCheckbox" type="checkbox" ${checkboxChecked} value="${data[i]['id']}" aria-label="...">
                                  ${data[i]['name']} <i onClick="deleteItem('${data[i]['id']}')" class="bi bi-x-square rounded float-end icon"></i>
                                </li>`

            $("#liste").append(todoItem);
            }
        }

        function deleteItem(id){
            console.log(id)
            $.ajax({
                url: "http://20.224.117.218:5000/todos/" + id,
                method: "DELETE",

            }).done(function(data){
                updateListe(data)
            });
        }
        

        /*function testText(){
            $("#liste").empty();

            // test zur Ausgabe vom input in der Console
            //let content = $( "#ToDo" ).val();
            //console.log(content);

            let todoItem = `<li class="list-group-item text-muted text-decoration-line-through">
                              <input class="form-check-input me-1 rounded-0" type="checkbox" value="" aria-label="...">
                              Test Test! <i type="button" class="bi bi-x-square rounded float-end icon"></i>
                            </li>`

            $("#liste").append(todoItem);
        }*/
