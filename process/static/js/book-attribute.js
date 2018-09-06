$(document).ready(function() {

var clone_div;

    $(document).on("click", '#define_book', function(e){


            $("#next-button ").data("current-step","set-book-attributes");
            $("#lbl-step-title ").text("Set Book Attribute");

           // $("#next-button").html(`<button name="build-back" class="orange-btn "  id="build-back-btn">Back</button>`);
            $("#lbl-step-title").append(`&nbsp <button name="back_to_refinement" class="orange-btn" id="back_to_refine">Back</button>`);

            $(".wrapper").hide();
            $("#next-button").attr("id","build-book");
            $("#next-button").hide();
            $("#sortable").hide();

            $("#copy").html(
                `<div class="page-items">
                 Book Thickness <input type="text" name="book-thickness" value=".5" id="book-thickness">
                Book Height <input type="text" name="book_height" value="11" id="book-height">
                Book Width <input type="text" name="book_width" value="8.5" id="book-width">
                #Tabs <input type="text" name="tabs" value="12" id="tabs">
                Tab Rows <input type="text" name="tab_rows" value="2" id="tab_rows">

                Cover Type <select name="cover_type" id="cover_type">
                  <option id="leather">Leather</option>
                  <option id="paper">Paper</option>
                </select>

                Corner Type <select name="corner_type" id="corner_type">
                    <option   value="round" id="round_id">Rounded</option>
                    <option   value="square" id="square_id">Square</option>
                    <option   value="square" id="none">None</option>
                </select>

                Material Type <select name="material_type" id="material_type">
                    <option   value="gold" id="gold">Gold</option>
                    <option   value="silver" id="silver">Silver</option>
                    <option   value="brass" id="brass">Brass</option>
                </select>
                </div>


                <div class="page-items">
                # of Rings <input type="text" name="no_of_rings" value="12" id="no_of_rings">
                 # of Rings Set <input type="text" name="no_of_rings_set" value="1" id="no_of_rings_set">

                Ring Type <select name="ring_type1">
                  <option id="metal">Metal</option>
                  <option id="plastic">Plastic</option>
                </select>

                 Ring Material <select name="ring_material">
                  <option id="gold">Gold</option>
                  <option id="silver">Silver</option>
                  <option id="black">Matte Black</option>
                </select>

                Hole Type <select name="hole_type" id="hole_type">
                  <option   value="square">Square</option>
                  <option   value="circle">Circle</option>
                </select>

                Hole  Width <input type="text" name="hole_width" value="1" id="hole_width">
                Hole  Height <input type="text" name="hole_height" value="1" id="hole_height">
                </div>

                <div class="page-items">
                # offset from edge <input type="text" name="offset" value="1" id="offset">
                Thickness <input type="text" name="thickness" value="1" id="thickness">

                Pairs <input type="text" name="ring_pair" value="1" id="ring_pair">
                Pair Separation <input type="text" name="pair_separation" value="12" id="pair_separation">
                Compression <input type="text" name="ring_compression" value="12" id="ring_compression">
                Set Offset <input type="text" name="set_offset" value="12" id="set_offset">

                R1 <input type="text" name="r1" value="0" id="r1">
                R2 <input type="text" name="r2" value="0" id="r2">
                R3 <input type="text" name="r3" value="0" id="r3">
                R4 <input type="text" name="r4" value="0" id="r4">

                </div>
                <div class="custom-books">

                        <div class="paper-style">
                            <div class="paper"></div>
                            <div class="rings"></div>
                        </div>

                        <div class="side">
                             <h2>Side</h2>
                             <div class="thickness"></div>
                        </div>

                </div>`);
                    setTimeout(function(){
             $(".rings").empty();
             $(".tabs-tags").empty();
            var bookthick = $("#book-thickness").val();
            var paperhgt = $(".paper").height();
            var numOfRings = $("#no_of_rings").val();
            var numOfRingset = $("#no_of_rings_set").val();
            var ringHoleType =$("#hole_type").val();
            var paperCornerType =$("#corner_type").val();
            var bookWidth = $("#book-width").val();
            $(".thickness").height(bookthick*50);
            $(".paper").css({"width": bookWidth*52.9})
            var totalRings = numOfRings*numOfRingset;
            $(".rings .ring-hole").addClass(ringHoleType);
                $(".paper").addClass(paperCornerType);
                var ringHgt = paperhgt/totalRings;
                $(".rings").css("line-height", ringHgt);
                var ringmgnTop = 5;
            for (var i = 0; i< totalRings; i++) {
                rings();
            }
            var tabs = $("#tabs").val();
            for (var i =0; i < tabs; i++) {
            tabbs(tabs)
            }
            $("input").bind("keyup",function(){
                var paperhgt = $(".paper").height();
                var numOfRings = $("#no_of_rings").val();
                var numOfRingset = $("#no_of_rings_set").val();
                var totalRings = numOfRings*numOfRingset;
                var ringHgt = paperhgt/totalRings;
                var ringHoleType =$("#hole_type").val();
                var paperCornerType =$("#corner_type").val();
                var bookthick = $("#book-thickness").val();
                $(".thickness").height(bookthick*50);
                var ringmgnTop = 5
                $(".rings").css({"line-height": ringHgt+"px"});
                $(".rings").empty();
                $(".tabs-tags").empty();
                var tabs = $("#tabs").val();
                for (var i =0; i < tabs; i++) {
                tabbs(tabs)
                }
                for (var i =0; i < totalRings; i++) {
                rings();
                }
                var bookWidth = $("#book-width").val();
            $(".paper").css({"width": bookWidth*52.9})
            var paperCornerType =$("#corner_type").val();
            var bookWidth = $("#book-width").val();
                $(".rings .ring-hole").removeClass("round");
                $(".rings .ring-hole").removeClass("square");
                $(".paper").removeClass("round");
                $(".paper").removeClass("square");
                $(".rings .ring-hole").addClass(ringHoleType);
                $(".paper").addClass(paperCornerType);
            });
            $("select").change(function()
            {
                var ringHoleType =$("#hole_type").val();
            var paperCornerType =$("#corner_type").val();
                $(".rings .ring-hole").removeClass("round");
                $(".rings .ring-hole").removeClass("square");
                $(".paper").removeClass("round");
                $(".paper").removeClass("square");
                $(".rings .ring-hole").addClass(ringHoleType);
                $(".paper").addClass(paperCornerType);
            });

            var paperhgt = $(".paper").height();
            var numOfRings = $("#no_of_rings").val();
            var numOfRingset = $("#no_of_rings_set").val();
            var totalRings = numOfRings*numOfRingset;
            var ringHgt = paperhgt/totalRings;
            var ringHoleType =$("#hole_type").val();
            var paperCornerType =$("#corner_type").val();
            $(".rings").css("line-height", ringHgt);
                var ringmgnTop = 5
            function rings()
            {
                $(".rings").append('<div class="ring-hole"></div>');
                $(".rings .ring-hole").addClass(ringHoleType);

            }
            function tabbs(tabs)
            {

                $(".tabs-tags").append('<div class="tab-tag tag'+tabs+'"></div>');

            }

            },500)
        })

         $(document).on("click", '#build-book', function(e){

                 var bookDimenstions = [];
             var book_width =$("#book-width").val();
             var book_height =$("#book-height").val();
             var book_thickness = $('#book-thickness').val();
             var tab_rows = $('#tab_rows').val();

             bookDimenstions.push(book_width,book_height);
             bookDimenstions.push(book_thickness,tab_rows);
             console.log(bookDimenstions);


            var corner_type = $("#corner_type option:selected").val();
            var ring_type = $("#ring_type2 option:selected").val();
            var metalCorners = {};
            var ring_type_list=[];
            ring_type_list.push(ring_type);
            metalCorners[corner_type] = ring_type_list
            console.log("metalCorners",metalCorners);


            var no_of_rings = $("#no_of_rings").val();
            var cluster_space = $("#cluster_space").val();
            var cuout_type = $("#cuout_type option:selected").val();
            var hole_width = $("#hole_width").val();
            var hole_height = $("#hole_height").val();
            var offset= $("#offset").val();
            var thickness = $("#thickness").val();
            var space = $("#space").val();
            var cluster_space = $("#cluster_space").val();
            var ring_compression = $("#ring_compression").val();
            var set_offset = $("#set_offset").val();
            var ringSets = {};
            var ring_set_list=[];
            ring_set_list.push(corner_type,ring_type,no_of_rings,cluster_space,cuout_type,hole_width,hole_height);
            ring_set_list.push(offset,thickness,space,cluster_space,ring_compression,set_offset)
            ringSets["ringSet1"]= ring_set_list;
            console.log("ringSets",ringSets);


            var tab_values = {};
            var tab_values_list=[];
            // hardcoding 2 values- width and height for tabValues as 20px and 80xp
            tab_values_list.push("20px","80px");
            tab_values["tabValues"]=tab_values_list;
            console.log("tabValues",tab_values);



            var cover_type = $("#cover_type option:selected").val();
            var width = "20px";
            var cover_values=[]
            cover_values.push(cover_type,width,"True")
            console.log("cover_values",cover_values);



            var datas = window.localStorage.getItem('data');
            datas = JSON.parse(datas)
            console.log("dataa",datas)
            var new_order = datas["order"]
            var arrays =[];
            var arrayss =[];
            var max=0;
            var len = datas["total_tabs"].length;
            for(i=0;i< datas["total_tabs"].length;i++)
            {

            var tab_pos = datas["total_tabs"][i][0];
            var pos = new_order.indexOf(tab_pos);



            var one = datas["total_tabs"][i][datas["total_tabs"][i].length-1]
            var two = i<len-1?datas["total_tabs"][i+1][0]:datas["total_tabs"][i][0];

            var pos1 = datas["order"].indexOf(one);
            var pos2 = datas["order"].indexOf(two);
            if(pos1+1 == pos2){

            for(var j=0;j<datas[total_stacks].length;j++)
            {
            max = max>datas[total_stacks][j].length?max:datas[total_stacks][j].length

            }
            var cut = new_order.splice(pos,2)
            var elementss = new_order.splice(0,pos)

            if(elementss.length ==0){
            console.log("no compoent")
            }
            else{
            arrays.push([elementss.length,"1"])
            arrays.push([max,"0"])
            }
            }
            else{
                        var cut = new_order.splice(pos,2);
                        var elementss = new_order.splice(0,pos)

                        if(elementss.length ==0){
                        console.log("no compoent")
                        }
                        else{
                        arrays.push([elementss.length,"1"])
                        }
             }
            }
            var month_values={};
            for( var k=0;k<arrays.length;k++){

            month_values["month"+k]=arrays[k];
            }
            console.log(month_values)


            var book_attribute={"bookDimenstions":bookDimenstions,
                                "monthValues":month_values,
                                "tabValues":tab_values,
                                "metalCorners":metalCorners,
                                "ringSets":ringSets,
                                "coverValues":cover_values
                   };

            var formdata ={ "book_attribute":book_attribute,
                            "upload_id":upload_id,
                            "merge_image":window.localStorage.getItem('data')
            }
          $("#sortable").empty();
          // Use `jQuery.ajax` method
          $.ajax('/merge-images/', {
            method: "POST",
            data: JSON.stringify(formdata ),

            processData: false,
            contentType: false,
            success(data) {
              console.log('Upload success', data['img_url']);
              for(var inc =0;inc< data['img_url'].length;inc++){
             $("#sortable").append(` <div  id=${inc} class="images-ids"  class="ui-state-default">
              <img src="#"  width="150px" height="250px" class="img-responsive" alt=""> </div>`)
              $("#"+inc).find('img').attr('src', data['img_url'][inc]).width(250).height(dimension);
              }
            },
            error() {
              console.log('Upload error');
            },
          });




         });


        $(document).on("click", '#back_to_refine', function(e){

          $(".page-items").hide();
          $(".custom-books").hide();
          $("#lbl-step-title ").text("Refine Components");
          $("#next-button").show();;
          $("#lbl-step-title").append(`&nbsp <button name="define_book" class="orange-btn" id="define_book">Define Book Attribute</button>`);
          $("#lbl-step-title").append(`&nbsp <button name="save_btn" class="orange-btn" id="save_btn">Save</button>`);
          $("#sortable").show();


        });


});
