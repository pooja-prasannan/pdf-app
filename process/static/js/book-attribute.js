$(document).ready(function() {

var clone_div;

    $(document).on("click", '#define_book', function(e){


            $("#next-button ").data("current-step","set-book-attributes");
            $("#lbl-step-title ").text("Set Book Attribute");

           // $("#next-button").html(`<button name="build-back" class="orange-btn "  id="build-back-btn">Back</button>`);
            $("#lbl-step-title").append(`&nbsp <button name="back_to_refinement" class="orange-btn" id="back_to_refine">Back</button>`);
            $("#lbl-step-title").append(`&nbsp <button id="tab-settings"><i class="fa fa-pencil" aria-hidden="true"></i></button>`);
            $(".wrapper").hide();
            $("#next-button").attr("id","build-book");
            $("#next-button").hide();
            $("#sortable").hide();
            if( !$('#copy').html()){

             $("#copy").html(
                `<div class="page-items">
                 <span>Book Thickness <input type="text" name="book-thickness" value=".5" id="book-thickness" maxlength="4">%</span>
                 <span>Book Height <input type="text" name="book_height" value="11" id="book-height" maxlength="4"></span>
                 <span>Book Width <input type="text" name="book_width" value="8.5" id="book-width" maxlength="4"></span>
                 <span>#Tabs <input type="text" name="tabs" value="12" id="tabs" max-length="4"></span>
                 <span>Tab Rows <input type="text" name="tab_rows" value="2" id="tab_rows" maxlength="4"></span>

                 <span>Cover Type <select name="cover_type" id="cover_type">
                  <option id="leather">Leather</option>
                  <option id="paper">Paper</option>
                </select></span>

                 <span>Corner Type <select name="corner_type" id="corner_type">
                    <option   value="round" id="round_id">Rounded</option>
                    <option   value="square" id="square_id">Square</option>
                    <option   value="square" id="none">None</option>
                </select></span>

                 <span>Material Type <select name="material_type" id="material_type">
                    <option   value="gold" id="gold">Gold</option>
                    <option   value="silver" id="silver">Silver</option>
                    <option   value="brass" id="brass">Brass</option>
                </select></span>
                </div>


                <div class="page-items">
                 <span># of Rings <input type="text" name="no_of_rings" value="12" id="no_of_rings" maxlength="4"></span>
                  <span># of Rings Set <input type="text" name="no_of_rings_set" value="1" id="no_of_rings_set" maxlength="4"></span>

                <span> Ring Type <select name="ring_type1">
                  <option id="metal">Metal</option>
                  <option id="plastic">Plastic</option>
                </select></span>

                 <span> Ring Material <select name="ring_material">
                  <option id="gold">Gold</option>
                  <option id="silver">Silver</option>
                  <option id="black">Matte Black</option>
                </select></span>

                 <span>Hole Type <select name="hole_type" id="hole_type">
                  <option   value="square">Square</option>
                  <option   value="circle">Circle</option>
                </select></span>

                 <span>Hole  Width <input type="text" name="hole_width" value="1" id="hole_width" maxlength="4"></span>
                 <span>Hole  Height <input type="text" name="hole_height" value="1" id="hole_height" maxlength="4"></span>
                </div>

                <div class="page-items">
                <span> # offset from edge <input type="text" name="offset" value="1" id="offset" maxlength="4"></span>
                 <span>Thickness <input type="text" name="thickness" value="1" id="thickness" maxlength="4"></span>

                 <span>Pairs <input type="text" name="ring_pair" value="1" id="ring_pair" maxlength="4"></span>
                 <span>Pair Separation <input type="text" name="pair_separation" value="12" id="pair_separation" maxlength="4"></span>
                 <span>Compression <input type="text" name="ring_compression" value="12" id="ring_compression" maxlength="4"></span>
                 <span>Set Offset <input type="text" name="set_offset" value="12" id="set_offset" max-length="4"></span>

                <span> R1 <input type="text" name="r1" value="0" id="r1" maxlength="4"></span>
                 <span>R2 <input type="text" name="r2" value="0" id="r2" maxlength="4"></span>
                 <span>R3 <input type="text" name="r3" value="0" id="r3" maxlength="4"></span>
                 <span>R4 <input type="text" name="r4" value="0" id="r4" maxlength="4"></span>

                </div>
                <div class="custom-books">

                        <div class="paper-style">
                            <div class="paper"></div>
                            <div class="rings"></div>

                        </div>
                    <hr/>
                        <div class="side">
                             <h2>Side</h2>
                             <div class="thickness"></div>
                        </div>

                </div>`);
             }
             else{

             $("#copy").show();
             }

             setTimeout(function(){
             $(".rings").empty();
             $(".tabs-tags").empty();
            var bookthick = $("#book-thickness").val();
            var paperhgt = $(".paper").height();
            var bookWdth = $("#book-width").val();
            var bookHgt = $("#book-height").val();
            var numOfRings = $("#no_of_rings").val();
            var numOfRingset = $("#no_of_rings_set").val();
            var ringHoleType =$("#hole_type").val();
            var paperCornerType =$("#corner_type").val();
            $(".thickness").height(bookthick*50);
            $(".paper").css({"width": (bookWdth)*50})
            $(".side").css({"width": bookWdth*50})
            $(".paper").css({"height": bookHgt*50})
            $(".paper-style").css({"height": bookHgt*50});
            $(".thickness").css({"width": bookWdth*50});
            var r1 = $("#r1").val();
             var r2 = $("#r2").val();
             var r3 = $("#r3").val();
             var r4 = $("#r4").val();
            var totalRings = numOfRings*numOfRingset;
            $(".rings .ring-hole").addClass(ringHoleType);
                // $(".paper").addClass(paperCornerType);
                var ringHgt = paperhgt/totalRings;
                $(".rings").css("line-height", ringHgt);
                var ringmgnTop = 5;
            for (var i = 0; i< totalRings; i++) {
                rings();
            }
            var tabs = $("#tabs").val();

            tabbs(tabs)

            $("input").bind("keyup",function(){
                var r1 = $("#r1").val();
                var r2 = $("#r2").val();
                var r3 = $("#r3").val();
                var r4 = $("#r4").val();
                var bookWdth = $("#book-width").val();
                var bookHgt = $("#book-height").val();
                var paperhgt = $(".paper").height();
                var numOfRings = $("#no_of_rings").val();
                var numOfRingset = $("#no_of_rings_set").val();
                var totalRings = numOfRings*numOfRingset;
                var ringHgt = paperhgt/totalRings;
                var paperCornerType =$("#corner_type").val();
                var bookthick = $("#book-thickness").val();
                $(".paper").css({"width": (bookWdth)*50})
                $(".side").css({"width": bookWdth*50})
                $(".paper").css({"height": bookHgt*50})
                $(".paper-style").css({"height": bookHgt*50});
                $(".thickness").css({"width": (bookWdth*50)});
                $(".thickness").height(bookthick*50);
                var ringmgnTop = 5
                $(".rings").css({"line-height": ringHgt+"px"});
                $(".rings").empty();
                $(".tabs-tags").empty();
                var tabs = $("#tabs").val();

                tabbs(tabs)

                for (var i =0; i < totalRings; i++) {
                rings();
                }
                var bookWidth = $("#book-width").val();

            // var paperCornerType =$("#corner_type").val();
            var bookWidth = $("#book-width").val();
                // $(".rings .ring-hole").removeClass("round");
                // $(".rings .ring-hole").removeClass("square");
                // $(".paper").removeClass("round");
                // $(".paper").removeClass("square");
                $(".rings .ring-hole").addClass(ringHoleType);
                // $(".paper").addClass(paperCornerType);
            });
            $("select").change(function()
            {
                var ringHoleType =$("#hole_type").val();
            // var paperCornerType =$("#corner_type").val();
                $(".rings .ring-hole").removeClass("round");
                $(".rings .ring-hole").removeClass("square");
                // $(".paper").removeClass("round");
                // $(".paper").removeClass("square");
                $(".rings .ring-hole").addClass(ringHoleType);
                // $(".paper").addClass(paperCornerType);
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

                //$(".tabs-tags").append('<div class="tab-tag tag'+tabs+'"></div>');

            }


            },500)
        })

         $(document).on("click", '#build-book', function(e){

//             var bookDimenstions = [];
             var book_width =$("#book-width").val();
             var book_height =$("#book-height").val();
             var book_thickness = $('#book-thickness').val();
             var tabs = $('#tabs').val();
             var tab_rows = $('#tab_rows').val();
             var cover_type = $("#cover_type option:selected").val();
             var corner_type = $("#corner_type option:selected").val();
             var material_type = $("#material_type option:selected").val();

             var no_of_rings = $("#no_of_rings").val();
             var no_of_ringset = $("#no_of_rings_set").val();
             var ring_type = $("#ring_type2 option:selected").val();

             var ring_material = $("#ring_material option:selected").val();
             var hole_type = $("#hole_type option:selected").val();
             var hole_width = $("#hole_width").val();
             var hole_height = $("#hole_height").val();
             var offset= $("#offset").val();
             var thickness = $("#thickness").val();
             var ring_pair = $("#ring_pair").val();
             var pair_separation = $("#pair_separation").val();
             var ring_compression = $("#ring_compression").val();
             var set_offset = $("#set_offset").val();
             var r1 = $("#r1").val();
             var r2 = $("#r2").val();
             var r3 = $("#r3").val();
             var r4 = $("#r4").val();

             var final_data={
             "book_width":book_width,
             "book_height":book_height,
             "book_thickness":book_thickness,
             "tabs":tabs,
             "tab_rows":tab_rows,
             "cover_type":cover_type,
             "corner_type":corner_type,
             "material_type":material_type,
             "no_of_rings":no_of_rings,
             "no_of_ringset":no_of_ringset,
             "ring_type":ring_type,
             "ring_material":ring_material,
             "hole_type":hole_type,
             "hole_width":hole_width,
             "hole_height":hole_height,
             "offset":offset,
             "thickness":thickness,
             "ring_pair":ring_pair,
             "pair_separation":pair_separation,
             "ring_compression":ring_compression,
             "set_offset":set_offset,
             "r1":r1,
             "r2":r2,
             "r3":r3,
             "r4":r4
             }


//             bookDimenstions.push(book_width,book_height);
//             bookDimenstions.push(book_thickness,tab_rows);
//             console.log(bookDimenstions);


//            var corner_type = $("#corner_type option:selected").val();
//
//            var metalCorners = {};
//            var ring_type_list=[];
//            ring_type_list.push(ring_type);
//            metalCorners[corner_type] = ring_type_list
//            console.log("metalCorners",metalCorners);


//
//            var cluster_space = $("#cluster_space").val();
//            var cuout_type = $("#cuout_type option:selected").val();


//            var space = $("#space").val();
//            var cluster_space = $("#cluster_space").val();
//            var ring_compression = $("#ring_compression").val();
//            var set_offset = $("#set_offset").val();
//            var ringSets = {};
//            var ring_set_list=[];
//            ring_set_list.push(corner_type,ring_type,no_of_rings,cluster_space,cuout_type,hole_width,hole_height);
//            ring_set_list.push(offset,thickness,space,cluster_space,ring_compression,set_offset)
//            ringSets["ringSet1"]= ring_set_list;
//            console.log("ringSets",ringSets);


//            var tab_values = {};
//            var tab_values_list=[];
//            // hardcoding 2 values- width and height for tabValues as 20px and 80xp
//            tab_values_list.push("20px","80px");
//            tab_values["tabValues"]=tab_values_list;
//            console.log("tabValues",tab_values);



//            var cover_type = $("#cover_type option:selected").val();
//            var width = "20px";
//            var cover_values=[]
//            cover_values.push(cover_type,width,"True")
//            console.log("cover_values",cover_values);



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


//            var book_attribute={"bookDimenstions":bookDimenstions,
//                                "monthValues":month_values,
//                                "tabValues":tab_values,
//                                "metalCorners":metalCorners,
//                                "ringSets":ringSets,
//                                "coverValues":cover_values
//                   };

            var formdata ={ "book_attribute":final_data,
                            "upload_id":upload_id,
                            "merge_image":window.localStorage.getItem('data')
            }
          $("#sortable").empty();
          $("#copy").hide();
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

//          $(".page-items").hide();
//          $(".custom-books").hide();
            $("#build-book").show();
            $("#build-book").html("Build Book");
              $("#next-button").attr("id","build-book");
           $("#copy").hide();
          $("#lbl-step-title ").text("Refine Components");
          $("#next-button").show();
          $("#lbl-step-title").append(`&nbsp <button name="define_book" class="orange-btn" id="define_book">Define Book Attribute</button>`);
          $("#lbl-step-title").append(`&nbsp <button name="save_btn" class="orange-btn" id="save_btn">Save</button>`);
          $("#sortable").show();
        });


        $(document).on('click','#tab_to_attribute', function(e) {


//          if($(this).hasClass("tab-to-refine") ) {
          $("#tab-shows").hide();
          $("#lbl-step-title ").text("Set Book Attribute");
          $("#lbl-step-title").append(`&nbsp <button name="back_to_refinement" class="orange-btn" id="back_to_refine">Back</button>`);
            $("#lbl-step-title").append(`&nbsp <button id="tab-settings"><i class="fa fa-pencil" aria-hidden="true"></i></button>`);
           $("#copy").show();
             $("#build-book").show();
           $("#build-book").html("Build Book");
            $("#next-button").attr("id","build-book");
//          $("#next-button").show();
//          $("#lbl-step-title").append(`&nbsp <button name="define_book" class="orange-btn" id="define_book">Define Book Attribute</button>`);
//          $("#lbl-step-title").append(`&nbsp <button name="save_btn" class="orange-btn" id="save_btn">Save</button>`);
//          $("#copy").show();

//          }
//          else{
//          alert("no class ")
//          }
        });

        var tabs_nos;
        var tabs_rows_nos;
        $(document).on("click", '#tab-settings', function(e){

          $("#lbl-step-title ").text("Set Tab Dimensions");
          $("#tab-shows").show();
//          $("#lbl-step-title").append(`&nbsp <button name="define_book" class="orange-btn" id="define_book">Define Book Attribute</button>`);
//          $("#lbl-step-title").append(`&nbsp <button name="save_btn" class="orange-btn" id="save_btn">Save</button>`);
          $("#copy").hide();
           $("#lbl-step-title").append(`&nbsp <button name="back_to_attribute" class="orange-btn" id="tab_to_attribute">Back</button>`);
          $("#build-book").hide();
//          $("#build-book").addClass("tab-to-refine");
          var data = window.localStorage.getItem('data');
          data = JSON.parse(data)
          var tab_page=data["front_cover"][0];
          var tab_page_src= $("#"+tab_page ).find('img').attr("src");
           tabs_nos = $(".page-items #tabs").val();
           tabs_rows_nos = $(".page-items #tab_rows").val();
          $("#tab-shows").html(`<div class="tab-settings-container">
                                  <div class="tab-settings">
                                                    <h2>Tab Settings</h2>
                                                    <span>Width <input type="number" id="tab-width" max-length="4" value="20"/>%</span>
                                                    <span>Height <input type="number" id="tab-height" max-length="4" value="8"/>%</span>
                                                    <div>Corner 1 : <input type="number" id="tab-c1-type" value="0"/> <input type="number" id="tab-c1-br" maxlength="4" value="50"/>%</div>
                                                    <div>Corner 2 : <input type="number" id="tab-c2-type" value="0"/> <input type="number" id="tab-c2-br" maxlength="4" value="50"/>%</div>
                                                    <div>Corner 3 : <input type="number" id="tab-c3-type" value="0"/> <input type="number" id="tab-c3-br" maxlength="4" value="0"/>%</div>
                                                    <div>Corner 4 : <input type="number" id="tab-c4-type" value="0"/> <input type="number" id="tab-c4-br" maxlength="4" value="0"/>%</div>
                                  </div>
                                <div class="tab-image" id= "tab_eg">
                                    <div class="tab"></div>
                                     <img src= "#"  width="250px"  class="img-responsive" alt="">

                                </div></div>`);
             $("#tab_eg").find('img').attr('src',tab_page_src);
            $('.tab').draggable({
                containment: "parent"
            }).filter('.tab').draggable("option", "axis", "y");
            var imgHeight_tabset = $(".tab-image img").height();
            $(".tab-image .tab").css({"height": (imgHeight_tabset)/(tabs_nos/tabs_rows_nos)});
            $(".tab-settings input").bind("keyup",function(){
                var tWwidth = $("#tab-width").val();
                var tWheight = $("#tab-height").val();
                var tabImgeHt = $(".tab-image img").height();
                var tabImgeWdt = $(".tab-image img").width();
                var tabBR1 = $("#tab-c1-br").val();
                var tabBR2 = $("#tab-c2-br").val();
                var tabBR3 = $("#tab-c3-br").val();
                var tabBR4 = $("#tab-c4-br").val();
                $(".tab-image .tab").css({"height": tabImgeHt/100 * tWwidth});
                $(".tab-image .tab").css({"width": tabImgeWdt/100 * tWheight});
                $(".tab-image .tab").css({"border-top-right-radius": (tabImgeWdt/100 * tWheight)/100 * tabBR1 +"px"});
                $(".tab-image .tab").css({"border-bottom-right-radius":(tabImgeWdt/100 * tWheight)/100 * tabBR2 +"px"});
                $(".tab-image .tab").css({"border-top-left-radius": (tabImgeWdt/100 * tWheight)/100 * tabBR3 +"px"});
                $(".tab-image .tab").css({"border-bottom-left-radius":(tabImgeWdt/100 * tWheight)/100 * tabBR4+"px"});

            });


        });

        $(document).on("click", '#build-book', function(e){

          $("#tab-shows").hide();

          $("#lbl-step-title ").text("Refine Components");
          $("#next-button").show();;
          $("#lbl-step-title").append(`&nbsp <button name="define_book" class="orange-btn" id="define_book">Define Book Attribute</button>`);
          $("#lbl-step-title").append(`&nbsp <button name="save_btn" class="orange-btn" id="save_btn">Save</button>`);
          $("#sortable").show();


        });


});