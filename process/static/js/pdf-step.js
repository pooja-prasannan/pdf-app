$(document).ready(function() {
 $(".images-ids").contextmenu(function() {
                        return false;
                    });


        if($(".images img").length >0)
        {
            $(".upload-box").hide();
            $("#steps").show();
            $("#lbl-step-title ").text("Step 2: Organize")
        }
});

    Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
    };
    console.log("data", jsonData);

    var images = {};
    if(jsonData.length>0){
        $.each(data, function (i, img) {
            images[i+1] = img;
        });
     }
      var existing_data = window.localStorage.getItem('data');
      var data = {"images" : images}
      var selected = new Array();
      if (!existing_data) {
          data = JSON.stringify(data);
          window.localStorage.setItem('data', data);
      }
      $( function() {
          $(".wrapper").hide();
          $("#sortable").sortable({
//                revert: true,
                update: function( event, ui ) {
                    var image_ids = $("#sortable").sortable("toArray");
                    var data = window.localStorage.getItem('data');
                    data = JSON.parse(data)
                    data["order"] = image_ids
                    data = JSON.stringify(data)
                    window.localStorage.setItem('data', data);
                    console.log(window.localStorage.getItem('data'))
                }
            });
        $( "#next-button, #book_save" ).click(function(e) {

           console.log("jp", window.selected)
           //window.selected = new Array()
           console.log(window.localStorage.getItem('data'));

            e.preventDefault();
            var current_step = $("#next-button ").data("current-step");
            console.log("jp, current step", current_step)
            if (current_step == "drag") {

               $("#sortable" ).sortable( "disable" )
               $("#sortable" ).selectable({
                   selected: function(event, ui){

                       if ((ui.selected.id) && (!window.selected.includes(ui.selected.id))) {
                           window.selected.push(ui.selected.id);
                           console.log("selected--->", selected);

                       }
                   },
                   unselected: function(event, ui){
                       window.selected.remove(ui.unselected.id);
                       console.log("remove--->", selected);
                   }
               });
               $("#next-button ").data("current-step","front_cover");
               $("#lbl-step-title ").text("Step 3: Select Front Cover Images");
            }
            if (current_step == "front_cover") {

                console.log("--->", selected);
                var data = window.localStorage.getItem('data');

                data = JSON.parse(data)
                data["front_cover"] = window.selected

                var front_cover = data["front_cover"];
                var i;
                for (i = 0; i < front_cover.length; i++) {
                        $("#"+front_cover[i]).hide();
                }
                data = JSON.stringify(data)
                window.localStorage.setItem('data', data);
                $("#next-button ").data("current-step","back_cover");
                // reset selection
                //window.selected = new Array();
                window.selected.length = 0;
                $("div").removeClass("ui-selected");
                console.log("fcccccc",window.selected)
                $("#lbl-step-title ").text("Step 4: Select Back Cover Images")
//                $(".wrapper").hide();
            }


            if (current_step == "back_cover") {
                var data = window.localStorage.getItem('data');
                data = JSON.parse(data)
                data["back_cover"] = window.selected

                var back_cover = data["back_cover"];
                 for (i = 0; i < back_cover.length; i++) {
                        $("#"+back_cover[i]).hide();
                }
                 //remove selected divs
//                $("#sortable").children().removeClass("ui-selected");
                $("div").removeClass("ui-selected");
                data = JSON.stringify(data)
                window.localStorage.setItem('data', data);
                 // reset selection
                 //window.selected = new Array();
                 window.selected.length = 0;
                 console.log("bcccccc",window.selected)

                $("#next-button ").data("current-step","tabs");
                $("#lbl-step-title ").text("Step 5: Select Tabs");
//                $(".wrapper").hide();
            }

            if (current_step == "tabs") {

                //$(".wrapper").hide();

                if (window.selected.length % 2 != 0) {
                    alert("Please select EVEN number Tabs")
                    return false;
                }

                var data = window.localStorage.getItem('data');
                data = JSON.parse(data)

                var current_order =  data['order'];
                console.log(current_order)
                  for (i = 0; i < data["back_cover"].length; i++) {
                      current_order.remove(data["back_cover"][i])
                  }
                  for (i = 0; i < data["front_cover"].length; i++) {
                      current_order.remove(data["front_cover"][i])

                  }
            var j=0;
            var l = 0;
            var k = 0;
            var tab=[];
            var stack=[];
            var new_stack = [];
            var new_tab = [];
            var is_tab = false
            var is_stack =false


//           var ele= $('.ui-selected').attr('id');
//           alert(ele+"ws")

            for(var i =0; i< current_order.length; i++)
            {
            if (current_order[i] == window.selected[j]){
                    if (is_stack){
                        new_tab.push(tab)
                        tab =[]
                        is_stack=false}
                    tab.push(current_order[i])
                    j++
                    is_tab = true
            }
            else{
                if (is_tab){
                    new_stack.push(stack)
                    stack =[]
                    is_tab = false
                    is_stack = true
                }
                stack.push(current_order[i])
            }
            if ( i == current_order.length - 1){
                    new_tab.push(tab)
                    new_stack.push(stack)
            }
            }
            data["total_tabs"] = new_tab;
            data["total_stacks"] = new_stack
//            for (i=0;i< data["total_tabs"].length;i++){
//           for(j=0; j< data["total_tabs"][i].length;j++){
//                console.log("ffff",data["total_tabs"][i][0][0])
//
//              }
//            }
            console.log("order",current_order)

            // enabling sortable before adding

             $("#sortable").sortable({
                                        disabled: false,
//                                        revert: true,
                                        update: function( event, ui ) {
                                            var image_ids = $("#sortable").sortable("toArray");
                                            var data = window.localStorage.getItem('data');
                                            data = JSON.parse(data)
                                            data["new_order"] = image_ids
                                            data = JSON.stringify(data)
                                            window.localStorage.setItem('data', data);
                                            console.log(window.localStorage.getItem('data'))
                                        }
                                     });
                var i;


                $("#"+data["front_cover"][0]).show();
                $("#"+data["front_cover"][0]).append(`<div><label for="name">Front Cover</label></div>`);
            // show and hide tabsss

                        var a= data["total_tabs"]
                        for(var i=0,j=0;i<a.length;i++)
            {
//


                 $("#"+a[i][0]).show();
                 $("#"+a[i][0]).append(`<div><label for="name">Tab ${j+1} </label></div>`);
                 j++;
            }
             for(var i=0;i<a.length;i++)
            {

                for(var j=1;j<a[i].length;j++){
                 $("#"+a[i][j]).hide();
                }
            }
            // show and hide stacks
            var a= data["total_stacks"]

            for(var i=0,j=0;i<a.length;i++)
           {
//                   var first = a[i].shift();
	                 $("#"+a[i][0]).show();
	                $("#"+a[i][0]).append(`<div><label for="name">Stack ${j+1} </label></div>`);
	                j++
            }
            for(var i=0;i<a.length;i++)
            {

                for(var j=1;j<a[i].length;j++){
                  $("#"+a[i][j]).hide();
                }
            }


                $("#"+data["back_cover"][0]).show();
                $("#"+data["back_cover"][0]).append(`<div><label for="name">Back Cover</label></div>`);

//                 $("#back").append(`<div><button type="button" id="add-btn" >Add </button></div>`)

                // remove selected divs
                $("div").removeClass("ui-selected");
                data = JSON.stringify(data)
                window.localStorage.setItem('data', data);
                $("#next-button ").data("current-step","stack");
                // reset selection
                //window.selected = new Array();
                window.selected.length = 0;
                $("#next-button ").data("current-step","refine-components");
                $("#lbl-step-title ").text("Refine Components")
                $(".images-ids").addClass("context-menu-one");
                $("#lbl-step-title").append(`&nbsp <button name="define_book" class="orange-btn" id="define_book">Define Book Attribute</button>`);
                $("#lbl-step-title").append(`&nbsp <button name="save_btn" class="orange-btn" id="save_btn">Save</button>`);
		        $("#next-button").html("Build Book");
	            $("#sortable").append(`<div class="add-btn-div"><button name="add_btn" id="add_btn"> Add + </button></div>`);
                $("#add_btn").addClass("context-menu-two");
                $(".images-ids").bind("contextmenu",function(e){
                $(".images-ids").find(".con-menu").hide();
                $(this).find(".con-menu").show();
//                    $(document).mouseup(function(e)
//{
//                    var container = $(".con-menu");
//
//                    // if the target of the click isn't the container nor a descendant of the container
//                    if (!container.is(e.target) && container.has(e.target).length === 0)
//                    {
//                        container.hide();
//                    }
//                });

                });
                $(".con-menu button").click(function()
                {
                 $(this).parent().parent().hide();
                var del_element =  $(this).parent().parent().attr('id');

                var data = window.localStorage.getItem('data');
                data = JSON.parse(data)

                var del_index = data['order'].indexOf(del_element);
                data['order'].splice(del_index,1)
                data = JSON.stringify(data)
                window.localStorage.setItem('data', data);
                });

            }

            if (current_step == "refine-components") {
                $(".wrapper").hide();

                if (window.selected.length % 2 != 0) {
                    alert("Please select EVEN number Stack")
                    return false;
                }

//                window.selected = new Array();
//                 $("#next-button ").data("current-step","edit");
//                $("#lbl-step-title ").text("Step 5: Adjust Page");
//                  $("#next-button").html(`<button name="crop-save" class="orange-btn " data-current-step="crop" id="crop-save" >Save</button>`);

            }
            window.selected.length = 0;
        });

        $( "#sortable" ).disableSelection();
//        $(".ui-selectable img").click(function()
//        {
//            $(this).toggleClass("selected");
//        });
      });