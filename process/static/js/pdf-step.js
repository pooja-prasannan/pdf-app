$(document).ready(function() {

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

    console.log("dataaaaaaaaaaaaaaaaaaaa", jsonData);

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
          $("#sortable").sortable({
                revert: true,
                update: function( event, ui ) {
                    var image_ids = $("#sortable").sortable("toArray");
                    var data = window.localStorage.getItem('data');
                    data = JSON.parse(data)
                    data["order"] = image_ids
                    data = JSON.stringify(data)
                    window.localStorage.setItem('data', data);
                }
            });
        $( "#next-button" ).click(function(e) {
            e.preventDefault();
            var current_step = $("#next-button ").data("current-step");
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
                console.log(">>>>>>>>>>>>>>>>1111",data)
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
                window.selected = new Array();
                $("#lbl-step-title ").text("Step 4: Select Back Cover Images")
            }
            if (current_step == "back_cover") {

                var data = window.localStorage.getItem('data');
                data = JSON.parse(data)
                data["back_cover"] = window.selected
                var back_cover = data["back_cover"];
//                var all_divs = $("div .ui-state-default")
//                var i;
//                console.log(data["images"].length)
//                for (var key  in data["images"]){
//                        $("#"+key).hide();
//                }
                 for (i = 0; i < back_cover.length; i++) {
                        $("#"+back_cover[i]).hide();
                }
                // remove selected divs
//                $("div").removeClass("ui-selected");
                data = JSON.stringify(data)
                window.localStorage.setItem('data', data);
                $("#next-button ").data("current-step","tabs");
                // reset selection
                window.selected = new Array();
                $("#lbl-step-title ").text("Step 5: Select Tabs");

            }
            if (current_step == "tabs") {

                if (window.selected.length % 2 != 0) {
                    alert("Please select EVEN number Tabs")
                    return false;
                }
                var data = window.localStorage.getItem('data');
                data = JSON.parse(data)
                data["tabs"] = window.selected
                var all_divs = $("div .ui-state-default")
                var i;
                console.log("tab length",data["tabs"].length)
//                for (var key  in data["order"]+1){
//                        $("#"+key).show();
//                }


                $("#"+data["front_cover"][0]).show();
                
                 for (var i = 0; i < data["tabs"].length; i++) {

                          if (data["tabs"][i] % 2 == 0) {

                        $("#"+data["tabs"][i]).show();
                        }
                         if (data["tabs"][i] % 2 != 0) {

                        $("#"+data["tabs"][i]).hide();
                        }
                }
                $("#"+data["back_cover"][0]).show();


                // remove selected divs
                $("div").removeClass("ui-selected");
                data = JSON.stringify(data)
                window.localStorage.setItem('data', data);
                $("#next-button ").data("current-step","stack");
                // reset selection
                window.selected = new Array();
                $("#next-button ").data("current-step","refine-components");
                $("#lbl-step-title ").text("Step 6: Refine Components")
            }
            if (current_step == "refine-components") {

                if (window.selected.length % 2 != 0) {
                    alert("Please select EVEN number Stack")
                    return false;
                }

            }

        });

        $( "#sortable" ).disableSelection();
//        $(".ui-selectable img").click(function()
//        {
//            $(this).toggleClass("selected");
//        });
      });