$(document).ready(function() {

    var clone_div;
        $(document).on("click", '#define_book', function(e){


                $("#next-button ").data("current-step","set-book-attributes");
                $("#lbl-step-title ").text("Set Book Attribute");
                $("#lbl-step-title").append(`&nbsp <button name="back_to_refinement" class="orange-btn" id="back_to_refine">Back</button>`);
                $("#lbl-step-title").append(`&nbsp <button id="tab-settings" class="orange-btn"><i class="fa fa-pencil" aria-hidden="true"></i></button>`);
                $(".wrapper").hide();
                $("#next-button").attr("id","build-book");
                $("#build-book").hide();
                $("#imgInp").hide();
                $("#sortable").hide();

                 if(status && !$('#copy').html()){

                 $("#copy").html(
                    `<div class="page-items">
                     <span>Book Thickness <input type="number" name="book-thickness" value=${json_datas.book_thickness} id="book-thickness" maxlength="4">%</span>
                     <span>Book Height <input type="number" name="book_height" value=${json_datas.book_height} id="book-height" maxlength="4"></span>
                     <span>Book Width <input type="number" name="book_width" value=${json_datas.book_width} id="book-width" maxlength="4"></span>
                     <span>#Tabs <input type="number" name="tabs" value=${json_datas.tabs} id="tabs" max-length="4"></span>
                     <span>Tab Rows <input type="number" name="tab_rows" value=${json_datas.tab_rows} id="tab_rows" maxlength="4"></span>

                     <span>Cover Type <select name="cover_type" id="cover_type">
                      <option value ="leather" id="leather">Leather</option>
                      <option value ="paper" id="paper">Paper</option>
                    </select></span>


                     <span>Corner Type <select name="corner_type" id="corner_type">
                        <option   value="round" id="round_id">Rounded</option>
                        <option   value="square" id="square_id">Square</option>
                        <option   value="none" id="none">None</option>
                    </select></span>

                     <span>Material Type <select name="material_type" id="material_type">
                        <option   value="gold" id="gold">Gold</option>
                        <option   value="silver" id="silver">Silver</option>
                        <option   value="brass" id="brass">Brass</option>
                    </select></span>
                    </div>


                    <div class="page-items">
                     <span># of Rings <input type="number" name="no_of_rings" value=${json_datas.no_of_rings} id="no_of_rings" maxlength="4"></span>
                      <span># of Rings Set <input type="number" name="no_of_rings_set" value=${json_datas.no_of_ringset} id="no_of_rings_set" maxlength="4"></span>

                    <span> Ring Type <select name="ring_type1" id="ring_type1">
                      <option id="metal">Metal</option>
                      <option id="plastic">Plastic</option>
                    </select></span>

                     <span> Ring Material <select name="ring_material" id="ring_material">
                      <option id="gold">Gold</option>
                      <option id="silver">Silver</option>
                      <option id="black">Matte Black</option>
                    </select></span>

                     <span>Hole Type <select name="hole_type" id="hole_type">
                      <option   value="square" >Square</option>
                      <option   value="circle">Circle</option>
                    </select></span>

                     <span>Hole  Width <input type="number" name="hole_width" value=${json_datas.hole_width} id="hole_width" maxlength="4"></span>
                     <span>Hole  Height <input type="number" name="hole_height" value=${json_datas.hole_height} id="hole_height" maxlength="4"></span>
                    </div>

                    <div class="page-items">
                    <span> Offset from Edge <input type="number" name="offset" value=${json_datas.offset} id="offset" maxlength="4"></span>
                     <span>Thickness <input type="number" name="thickness" value=${json_datas.thickness} id="thickness" maxlength="4"></span>

                     <span>Pairs <input type="number" name="ring_pair" value=${json_datas.ring_pair} id="ring_pair" maxlength="4"></span>
                     <span>Pair Separation <input type="number" name="pair_separation" value=${json_datas.pair_separation} id="pair_separation" maxlength="4"></span>
                     <span>Compression <input type="number" name="ring_compression" value=${json_datas.ring_compression} id="ring_compression" maxlength="4"></span>
                     <span>Set Offset <input type="number" name="set_offset" value=${json_datas.set_offset} id="set_offset" max-length="4"></span>

                    <span> R1 <input type="number" name="r1" value=${json_datas.r1} id="r1" maxlength="4"></span>
                     <span>R2 <input type="number" name="r2" value=${json_datas.r2} id="r2" maxlength="4"></span>
                     <span>R3 <input type="number" name="r3" value=${json_datas.r3} id="r3" maxlength="4"></span>
                     <span>R4 <input type="number" name="r4" value=${json_datas.r4} id="r4" maxlength="4"></span>

                    </div>
                    <div class="custom-books">

                            <div class="paper-style">
                                <div class="paper"></div>
                                <div class="rings" id="id_rings"></div>

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
                 var selectedCover = $("#cover_type").val();
                 var selectedCorner = $("#corner_type").val();
                 var selectedMaterial = $("#material_type").val();
                 var selectedRingType = $("#ring_type1").val();
                 var selectedRingMaterial= $("#ring_material").val();
                 var selectedHole= $("#hole_type").val();
                 $("#cover_type").val(selectedCover);
                 $("#corner_type").val(selectedCorner);
                 $("#material_type").val(selectedMaterial);
                 $("#ring_type1").val(selectedRingType);
                 $("#ring_material").val(selectedRingMaterial);
                 $("#hole_type").val(selectedHole);
                 }

                 var data = window.localStorage.getItem('data');
                 data = JSON.parse(data)
                 var tab_value = data['total_tabs'].length;


                if( !$('#copy').html()){
                 var ratio = height/width;
                 var roundedHeight = +(ratio*8.5).toFixed(2);
//                 alert(roundedHeight)
                 //$("#book-height").val(roundedHeight);
                 $("#copy").html(
                    `<div class="page-items">
                     <span>Book Thickness <input type="number" name="book-thickness" value="10" id="book-thickness" maxlength="4">%</span>
                     <span>Book Height <input type="number" name="book_height" value=${roundedHeight} id="book-height" maxlength="4"></span>
                     <span>Book Width <input type="number" name="book_width" value="8.5" id="book-width" maxlength="4"></span>
                     <span>#Tabs <input type="number" name="tabs" value="12" id="tabs" max-length="4"></span>
                     <span>Tab Rows <input type="number" name="tab_rows" value="1" id="tab_rows" maxlength="4"></span>

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
                     <span># of Rings <input type="number" name="no_of_rings" value="6" id="no_of_rings" maxlength="4"></span>
                     <span># of Rings Set <input type="number" name="no_of_rings_set" value="2" id="no_of_rings_set" maxlength="4"></span>

                    <span> Ring Type <select name="ring_type1" id="ring_type1">
                      <option id="metal">Metal</option>
                      <option id="plastic">Plastic</option>
                    </select></span>

                     <span> Ring Material <select name="ring_material"  id="ring_material">
                      <option id="gold">Gold</option>
                      <option id="silver">Silver</option>
                      <option id="black">Matte Black</option>
                    </select></span>

                     <span>Hole Type <select name="hole_type" id="hole_type">
                      <option   value="square">Square</option>
                      <option   value="circle">Circle</option>
                    </select></span>

                     <span>Hole  Width <input type="number" name="hole_width" value="3" id="hole_width" maxlength="4"></span>
                     <span>Hole  Height <input type="number" name="hole_height" value="3" id="hole_height" maxlength="4"></span>
                    </div>

                    <div class="page-items">
                    <span> Offset from Edge <input type="number" name="offset" value="5" id="offset" maxlength="4"></span>
                     <span>Thickness <input type="number" name="thickness" value=".5" id="thickness" maxlength="4"></span>

                     <span>Pairs <input type="number" name="ring_pair" value="1" id="ring_pair" maxlength="4" data-max="3"></span>
                     <span>Pair Separation <input type="number" name="pair_separation" value=".01" id="pair_separation" maxlength="4"></span>
                     <span>Compression <input type="number" name="ring_compression" value="0" id="ring_compression" maxlength="4"></span>
                     <span>Set Offset <input type="number" name="set_offset" value="0" id="set_offset" max-length="4"></span>

                    <span> R1 <input type="number" name="r1" value="0" id="r1" maxlength="4"></span>
                     <span>R2 <input type="number" name="r2" value="0" id="r2" maxlength="4"></span>
                     <span>R3 <input type="number" name="r3" value="0" id="r3" maxlength="4"></span>
                     <span>R4 <input type="number" name="r4" value="0" id="r4" maxlength="4"></span>

                    </div>
                    <div class="custom-books">

                            <div class="paper-style">
                                <div class="paper"></div>
                                <div class="rings" id="id_rings"></div>

                            </div>
                        <hr/>
                            <div class="side">
                                 <h2>Side</h2>
                                 <div class="thickness"></div>
                            </div>

                    </div>`);
                     setTimeout(function(){
                        $(".thickness").css({"width": 600/ratio});
                        $(".paper").css({"width": 600/ratio});
                        $(".side").css({"width": 600/ratio});
                     },500);
                 }
                 else{
                 $("#copy").show();
                 var selectedCover = $("#cover_type").val();
                 var selectedCorner = $("#corner_type").val();
                 var selectedMaterial = $("#material_type").val();
                 var selectedRingType = $("#ring_type1").val();
                 var selectedRingMaterial= $("#ring_material").val();
                 var selectedHole= $("#hole_type").val();
                 $("#cover_type").val(selectedCover);
                 $("#corner_type").val(selectedCorner);
                 $("#material_type").val(selectedMaterial);
                 $("#ring_type1").val(selectedRingType);
                 $("#ring_material").val(selectedRingMaterial);
                 $("#hole_type").val(selectedHole);
                  setTimeout(function(){
                        $(".thickness").css({"width": 600/$('book-height').val()/$('book-width').val()});
                        $(".paper").css({"width": 600/$('book-height').val()/$('book-width').val()});
                         $(".side").css({"width": 600/$('book-height').val()/$('book-width').val()});
                     },500);
                 }

                 setTimeout(function(){
                 var data = window.localStorage.getItem('data');
                 data = JSON.parse(data);
                 var front_page = data["front_cover"][0];
                 var front_page_src = $("#"+front_page ).find('img').attr("src");
                    $(".paper").css({
                        "background-image":"url("+front_page_src+")"
                    })
                 $(".rings").empty();
                 var ratio = height/width;
                 var roundedHeight = +(ratio*$("#book-width").val()).toFixed(2);
                 //$("#book-height").val(roundedHeight);
                 var datas = window.localStorage.getItem('data');
                 datas = JSON.parse(datas)
                 var len = datas["total_tabs"].length;
                 $("#tabs").val(len);
                 $(".tabs-tags").empty();
                 var r1 = $("#r1").val();
                 var r2 = $("#r2").val();
                 var r3 = $("#r3").val();
                 var r4 = $("#r4").val();
                 var pairs = $("#ring_pair").val();
                 var pair_separation = $("#pair_separation").val();
                 var pair_thick =$("#thickness").val();
                 var offset = $("#offset").val();
                 var hole_width = $("#hole_width").val();
                 var hole_hgt = $("#hole_height").val();
                var bookthick = $("#book-thickness").val();
                var paperhgt = $(".paper").height();
                var bookWdth = $("#book-width").val();
                var bookHgt = $("#book-height").val();
                var numOfRings = $("#no_of_rings").val();
                var numOfRingset = $("#no_of_rings_set").val();
                var ringHoleType =$("#hole_type").val();
                var paperCornerType =$("#corner_type").val();

                $(".rings").css({"left" : (((bookWdth/bookHgt)*600)*offset)/100})

                // $(".rings").append('<div class="ring-set'+numOfRingset+'"></div>');

                $(".paper").css({"border-top-right-radius": 6 * r1 +"px"});
                $(".paper").css({"border-bottom-right-radius":6 * r2 +"px"});
                $(".paper").css({"border-top-left-radius": 6 * r3 +"px"});
                $(".paper").css({"border-bottom-left-radius":6 * r4+"px"});


                var r1 = $("#r1").val();
                 var r2 = $("#r2").val();
                 var r3 = $("#r3").val();
                 var r4 = $("#r4").val();
                var totalRings = numOfRings*numOfRingset;
                $(".holes").addClass(ringHoleType);
                    var ringHgt = paperhgt/totalRings;
                    var ringmgnTop = 5;
                    for(var j=0; j<numOfRingset; j++)
                    {
                        var ring_panel = document.getElementById("id_rings");
                        var div = document.createElement("div");
                        ring_panel.appendChild(div);

                        var content = "<div class='ring-set s"+totalRings+"'>";
                        for (var i =0; i < numOfRings; i++)
                        {

                            content = content+ '<div class="ring-hole"><div class="holes"></div></div>';
                        }
                        content = content + '</div>';
                        div.innerHTML = content;
                    }
                    $(".rings div div.ring-set").css({"height":(600/numOfRingset)+ "px"});
                    $(".holes").css({"width": (600*hole_width)/100});
                    $(".holes").css({"height": (600*hole_hgt)/100});
                    $(".pairs").css({"margin-top":((6*hole_hgt)/pairs) - (pair_thick*pairs)+"px"})
                    $(".thickness").height((600*bookthick)/100);
                for (k=1; k<=pairs; k++)
                {
                    var className = "ringPairs" + k.toString()
                    $(".ring-hole").append("<div class=" + className + "></div>")
                }
                tabbs(tabs)

                $("input").bind("keyup",function(){

                    $('.paper').removeClass(paperCornerType);
                    var r1 = $("#r1").val();
                    var r2 = $("#r2").val();
                    var r3 = $("#r3").val();
                    var r4 = $("#r4").val();
                    var set_offset = $("#set_offset").val();
                    var pair_separation = $("#pair_separation").val();
                    var pairs = $("#ring_pair").val();
                    var pair_thick =$("#thickness").val();
                    var hole_width = $("#hole_width").val();
                    var hole_hgt = $("#hole_height").val();
                    var bookWdth = $("#book-width").val();
                    var bookHgt = $("#book-height").val();
                    var paperhgt = $(".paper").height();
                    var offset = $("#offset").val();
                    var ring_comp = $("#ring_compression").val();
                    var numOfRings = $("#no_of_rings").val();
                    var numOfRingset = $("#no_of_rings_set").val();
                    var totalRings = numOfRings*numOfRingset;
                    var ringHgt = paperhgt/totalRings;
                    var paperCornerType =$("#corner_type").val();
                    var bookthick = $("#book-thickness").val();
                    $(".paper").css({"width": (bookWdth/bookHgt)*600});
                    $(".side").css({"width": (bookWdth/bookHgt)*600});
                    $(".rings").css({"left" : (((bookWdth/bookHgt)*600)*offset)/100})

                    $(".thickness").css({"width": (bookWdth/bookHgt)*600})
                    $(".thickness").height((600*bookthick)/100);
                    $(".paper").css({"border-top-right-radius": 6 * r1 +"px"});
                    $(".paper").css({"border-bottom-right-radius":6 * r2 +"px"});
                    $(".paper").css({"border-top-left-radius": 6 * r3 +"px"});
                    $(".paper").css({"border-bottom-left-radius":6 * r4+"px"});

                    var ringmgnTop = 5
                    $(".rings").empty();
                    $(".tabs-tags").empty();
                    var tabs = $("#tabs").val();
                    var css = "span.pairs.separation { position: absolute!important;top:"+((6*hole_hgt) - (pair_thick*6))/2+"px; margin-top:0px!important; }.ring-hole .pairs::after{height: " + (6)*pair_thick+ "px!important; .ring-set{margin-top:" + 6*ring_comp+ "px!important;margin-bottom:" + 6*ring_comp+ "px!important;}",
                    head = document.head || document.getElementsByTagName("head")[0],
                    style = document.createElement("style");

                style.type = "text/css";
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                }
                else {
                    style.appendChild(document.createTextNode(css));
                }

                head.appendChild(style);
                    tabbs(tabs);
                    for(var j=0; j<numOfRingset; j++)
                    {
                        var ring_panel = document.getElementById("id_rings");
                        var div = document.createElement("div");
                        ring_panel.appendChild(div);

                        var content = "<div class='ring-set s"+totalRings+"'>";
                        for (var i =0; i < numOfRings; i++)
                        {
                            content = content+ '<div class="ring-hole"><div class="holes"></div></div>';
                            // $(".rings .ring-hole").addClass(ringHoleType);
                        }
                        content = content + '</div>';
                        div.innerHTML = content;
                    }

                var bookWidth = $("#book-width").val();
                var bookWidth = $("#book-width").val();
                $(".rings div div.ring-set").css({"height":(600/numOfRingset)+ "px"});
                $(".holes").css({"width": (600*hole_width)/100});
                $(".holes").css({"height": (600*hole_hgt)/100});
                $(".rings div:first-child .ring-set").css({"top":-(6*set_offset)+"px"})
                $(".rings div:last-child .ring-set").css({"bottom":-(6*set_offset)+"px"})
                for (k=1; k<=pairs; k++)
                {
                    var className = "ringPairs" + k.toString()
                    $(".ring-hole").append("<div class=" + className + "></div>")
                }
                var ringHoleType =$("#hole_type").val();
                $('.pairs:after').css({"height":"3px"})
                $(".holes").removeClass("circle");
                $(".holes").removeClass("square");
                $(".holes").addClass(ringHoleType);
                var ringsetHgt = (600/numOfRingset)-((6*ring_comp)*2);
                $(".ring-set").css({
                    "height":ringsetHgt+"px",
                    "padding-top":((600/numOfRingset)- (ringsetHgt))/2+"px",
                    "padding-bottom":((600/numOfRingset)- (ringsetHgt))/2+"px"
                })
                console.log(ringsetHgt);
                if(pairs == 1)
                {
                    $(".ringPairs1").css({
                        "top": "0px",
                        "height": (pair_thick * 600)/100 + "px",
                    })
                }
                else if(pairs == 2)
                {
                    $(".ringPairs1").css({
                        "top":(-(600 * pair_separation) / 2)+ "px",
                        "height": (pair_thick * 600)/100 + "px",
                    })

                    $(".ringPairs2").css({
                        "top":((600 * pair_separation) / 2)+ "px",
                        "height": (pair_thick * 600)/100 + "px",
                    })
                }
                else if(pairs == 3)
                {
                    $(".ringPairs1").css({
                        "top":(-(600 * pair_separation) / 2)+ "px",
                        "height": (pair_thick * 600)/100 + "px",
                    })

                    $(".ringPairs2").css({
                        "top":((600 * pair_separation) / 2)+ "px",
                        "height": (pair_thick * 600)/100 + "px",
                    })
                }

                    if($("#ring_pair").val() > 3)
                    {
                        alert("Allowed pairs is 3");
                        $("#ring_pair").val("3")
                    }
                    if(pair_separation == 0)
                    {
                        $(".pairs").addClass("separation");

                    }
                    else{
                        $(".pairs").removeClass("separation");
                    }
                });

                $("select").change(function()
                {
                    var ringHoleType =$("#hole_type").val();

                    $(".holes").removeClass("circle");
                    $(".holes").removeClass("square");
                    $(".holes").addClass(ringHoleType);

                    var paperCornerType =$("#corner_type").val();
                    $('.paper').removeClass("round");
                    $('.paper').removeClass("square");
                    $('.paper').addClass(paperCornerType);
                });
                var paperhgt = $(".paper").height();
                var numOfRings = $("#no_of_rings").val();
                var numOfRingset = $("#no_of_rings_set").val();
                var totalRings = numOfRings*numOfRingset;
                var ringHgt = paperhgt/totalRings;
                var ringHoleType =$("#hole_type").val();
                var paperCornerType =$("#corner_type").val();

                $('.paper').addClass(paperCornerType);
                var ringmgnTop = 5;
                function rings()
                {

                    $(".rings .ring-set"+numOfRingset).append('<div class="ring-hole"></div>');
                    $(".rings .holes").addClass(ringHoleType);
                }
                function tabbs(tabs)
                {

                    //$(".tabs-tags").append('<div class="tab-tag tag'+tabs+'"></div>');

                }


                },500)
            });


             $(document).on("click", '#build-book', function(e){


        var finals = window.localStorage.getItem("new_order");
         finals =JSON.parse(finals)


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
                 var ring_type = $("#ring_type1 option:selected").val();
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
                 "projectID":upload_id,
                 "projectOrder":finals,
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
                 "r4":r4,
                 "tab-width":$("#tab-width").val(),
                 "tab-height":$("#tab-height").val(),
                 "tab-pad":$("#tab-pad").val(),
                 "tab-position":$("#tab-position").val(),
                 "corner1A":$("#tab-c1-type").val(),
                 "corner2A":$("#tab-c2-type").val(),
                 "corner3A":$("#tab-c3-type").val(),
                 "corner4A":$("#tab-c4-type").val(),
                 "corner1B":$("#tab-c1-br").val(),
                 "corner2B":$("#tab-c2-br").val(),
                 "corner3B":$("#tab-c3-br").val(),
                 "corner4B":$("#tab-c4-br").val()
                 }


                 var tab_setting_data={
                 "tab-width":$("#tab-width").val(),
                 "tab-height":$("#tab-height").val(),
                 "tab-pad":$("#tab-pad").val(),
                 "tab-position":$("#tab-position").val(),
                 "corner1A":$("#tab-c1-type").val(),
                 "corner2A":$("#tab-c2-type").val(),
                 "corner3A":$("#tab-c3-type").val(),
                 "corner4A":$("#tab-c4-type").val(),
                 "corner1B":$("#tab-c1-br").val(),
                 "corner2B":$("#tab-c2-br").val(),
                 "corner3B":$("#tab-c3-br").val(),
                 "corner4B":$("#tab-c4-br").val()
                 }


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

    //            var book_attribute={"bookDimenstions":bookDimenstions,
    //                                "monthValues":month_values,
    //                                "tabValues":tab_values,
    //                                "metalCorners":metalCorners,
    //                                "ringSets":ringSets,
    //                                "coverValues":cover_values
    //                   };

                var formdata ={ "book_attribute":final_data,
                                "tab_settings":tab_setting_data,
                                "upload_id":upload_id,
                                "merge_image":window.localStorage.getItem('data')
                }

              // Use `jQuery.ajax` method
              $.ajax('/merge-images/', {
                method: "POST",
                data: JSON.stringify(formdata ),

                processData: false,
                contentType: false,
                success(data) {
                console.log(data);

                    $('#sortable').show()
                },
                error() {
                  console.log('Upload error');
                },
              });

             });


            $(document).on("click", '#back_to_refine', function(e){

               $("#copy").hide();
               $("#build-book").show();
              $("#lbl-step-title ").text("Refine Components");

              $("#lbl-step-title").append(`&nbsp <button name="define_book" class="orange-btn" id="define_book">Define Book Attribute</button>`);
              $("#lbl-step-title").append(`&nbsp <button name="save_btn" class="orange-btn" id="save_btn">Save</button>`);
              $("#sortable").show();
            });


            $(document).on('click','#tab_to_attribute', function(e) {


    //          if($(this).hasClass("tab-to-refine") ) {
              $("#tab-shows").hide();
              $("#lbl-step-title ").text("Set Book Attribute");
              $("#lbl-step-title").append(`&nbsp <button name="back_to_refinement" class="orange-btn" id="back_to_refine">Back</button>`);
             $("#lbl-step-title").append(`&nbsp <button id="tab-settings" class="orange-btn"><i class="fa fa-pencil" class="orange-btn" aria-hidden="true"></i></button>`);
               $("#copy").show();
//               $("#build-book").html("Build Book");
//                $("#build-book").show();

            });

            var tabs_nos;
            var tabs_rows_nos;
            $(document).on("click", '#tab-settings', function(e){

                var tabs = $('#tabs').val();
                  var tab_rows = $('#tab_rows').val();
              $("#lbl-step-title ").text("Set Tab Dimensions");
              $("#tab-shows").show();
              $("#build-book").hide();
              $("#copy").hide();
               $("#lbl-step-title").append(`&nbsp <button name="back_to_attribute" class="orange-btn" id="tab_to_attribute">Back</button>`);
              var data = window.localStorage.getItem('data');
              data = JSON.parse(data)
              var tab_page=data["total_tabs"][0][0];
              var tab_page_src= $("#"+tab_page ).find('img').attr("src");
               tabs_nos = $(".page-items #tabs").val();
               tabs_rows_nos = $(".page-items #tab_rows").val();
                     if(!$("#tab-shows").html()){

                $("#tab-shows").html(`<div class="tab-settings-container">
                <div class="tab-settings">
                                  <h2>Tab Settings</h2>
                                  <div style="white-space:nowrap"><span>W <input type="number" id="tab-width" max-length="3" value="${100/(tabs/tab_rows)}" />%</span>
                                  <span>H <input type="number" id="tab-height" max-length="3"  value="5"/> + <input type="number" id="tab-pad" max-length="3"  value="0"/></span><span> P <input type="number"  id="tab-position" max-length="3" value="0"/>%</span></div>
                                  <div>Corner 1 : <input type="number" id="tab-c1-type" value="1"/> <input type="number" id="tab-c1-br" maxlength="4" value="50"/>%</div>
                                  <div>Corner 2 : <input type="number" id="tab-c2-type" value="1"/> <input type="number" id="tab-c2-br" maxlength="4" value="50"/>%</div>
                                  <div>Corner 3 : <input type="number" id="tab-c3-type" value="0"/> <input type="number" id="tab-c3-br" maxlength="4" value="0"/>%</div>
                                  <div>Corner 4 : <input type="number" id="tab-c4-type" value="0"/> <input type="number" id="tab-c4-br" maxlength="4" value="0"/>%</div>
                                  <div class="zoom-buttons">
                      <button class="orange-btn zoom-in" id="zoomin" type="button"><i class="fa fa-search-plus" aria-hidden="true"></i></button>
                      <button class="orange-btn reset" id="reset" type="button">Reset</button>
                      <button class="orange-btn zoom-out" id="zoomout" type="button"><i class="fa fa-search-minus" aria-hidden="true"></i></button>
                      </div>
                </div>
                <div class="orange-border">
              <div class="tab-image mCustomScrollbar" id= "tab_eg">
                      <div class="zooming">
                          <div class="tabs-attrs">
                              <div class="tab">
                                  <div class="tab-padding"></div>
                                  <div class="corner">
                                      <div class="corner1"></div>
                                      <div class="corner2"></div>
                                      <div class="corner3"></div>
                                      <div class="corner4"></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <img src= "#" class="img-responsive" alt="">
                  </div>
              </div>
          </div>`);
               }

               else{
                $("#tab-shows").show();
               }

               if(status && !$("#tab-shows").html()){

                $("#tab-shows").html(`<div class="tab-settings-container">
                <div class="tab-settings">
                                  <h2>Tab Settings</h2>
                                  <div style="white-space:nowrap"><span>W <input type="number" id="tab-width" max-length="3" value="${100/(json_datas.tabs/json_datas.tab_rows)}" />%</span>
                                  <span>H <input type="number" id="tab-height" max-length="3"  value="${json_datas.tab-height}"/> + <input type="number" id="tab-pad" max-length="3"  value="${json_datas.tab-pad}"/></span><span> P <input type="number"  id="tab-position" max-length="3" value="${json_datas.tab-position}"/>%</span></div>
                                  <div>Corner 1 : <input type="number" id="tab-c1-type" value="${json_datas.corner1}"/> <input type="number" id="tab-c1-br" maxlength="4" value="${json_datas.corner11}"/>%</div>
                                  <div>Corner 2 : <input type="number" id="tab-c2-type" value="${json_datas.corner2}"/> <input type="number" id="tab-c2-br" maxlength="4" value="${json_datas.corner12}"/>%</div>
                                  <div>Corner 3 : <input type="number" id="tab-c3-type" value="${json_datas.corner3}"/> <input type="number" id="tab-c3-br" maxlength="4" value="${json_datas.corner13}"/>%</div>
                                  <div>Corner 4 : <input type="number" id="tab-c4-type" value="${json_datas.corner4}"/> <input type="number" id="tab-c4-br" maxlength="4" value="${json_datas.corner14}"/>%</div>
                                  <div class="zoom-buttons">
                      <button class="orange-btn zoom-in" id="zoomin" type="button"><i class="fa fa-search-plus" aria-hidden="true"></i></button>
                      <button class="orange-btn reset" id="reset" type="button">Reset</button>
                      <button class="orange-btn zoom-out" id="zoomout" type="button"><i class="fa fa-search-minus" aria-hidden="true"></i></button>
                      </div>
                </div>
                <div class="orange-border">
              <div class="tab-image mCustomScrollbar" id= "tab_eg">
                      <div class="zooming">
                          <div class="tabs-attrs">
                              <div class="tab">
                                  <div class="tab-padding"></div>
                                  <div class="corner">
                                      <div class="corner1"></div>
                                      <div class="corner2"></div>
                                      <div class="corner3"></div>
                                      <div class="corner4"></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <img src= "#" class="img-responsive" alt="">
                  </div>
              </div>
          </div>`);


               }
               else{
                $("#tab-shows").show();
               }

                 $("#tab_eg").find('img').attr('src',tab_page_src);

                var imgHeight_tabset = $(".tab-image img").height();
                var tWwidth = $("#tab-width").val();
                    var tWheight = $("#tab-height").val();
                    var tabImgeHt = $(".tab-image img").height();
                    var tabImgeWdt = $(".tab-image img").width();
                $(".tab-image .tabs-attrs").css({
                    "height": (tabImgeHt)
                });
                console.log(tabImgeHt,tab_rows,tabs )
                    $(".tab-image .tab").css({"width": tabImgeWdt/100 * tWheight});
                    setTimeout(function()
                    {
                        $(".zooming").css({
                            "background-image":"url("+tab_page_src+")",
                            "background-size": +tabImgeWdt+"px"+ +tabImgeHt+"px"
                        })
                        $(".tab-image").height(tabImgeHt);
                        $(".orange-border").height(tabImgeHt);
                        var css = ".zooming{background-size:900px "+tabImgeHt+"px}",
                    head = document.head || document.getElementsByTagName("head")[0],
                    style = document.createElement("style");

                style.type = "text/css";
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                }
                else {
                    style.appendChild(document.createTextNode(css));
                }

                head.appendChild(style);


                var ps = new PerfectScrollbar('.tab-image');
                ps.update();

                    },200)

                $(".tab-settings input").bind("keyup",function(){
                    var tWwidth =  parseInt($("#tab-width").val());
                    var tWheight = $("#tab-height").val();
                    var tabImgeHt = $(".tab-image img").height();
                    var tabImgeWdt = $(".tab-image img").width();
                    var tabBR1 = $("#tab-c1-br").val();
                    var tabBR2 = $("#tab-c2-br").val();
                    var tabBR3 = $("#tab-c3-br").val();
                    var tabBR4 = $("#tab-c4-br").val();
                    var tabc1type = $("#tab-c1-type").val()
                    var tabc2type = $("#tab-c2-type").val()
                    var tabc3type = $("#tab-c3-type").val()
                    var tabc4type = $("#tab-c4-type").val();
                    var tabpad = $("#tab-pad").val();
                    var tabPos = $("#tab-position").val();
                    var hgttt = (tabImgeHt/100) * (tWwidth);

                       var tabbshgt = (tabImgeHt/(tabs/tab_rows));
                       var tabPosition = tabbshgt/2

                        var growEl = $(".tab-image .tabs-attrs"),
                        curHeight = hgttt,
                        curTop = growEl.offset().top,
                        newHeight = tabbshgt,
                        newMargin = (newHeight -curHeight)/2;


                    $(".tab-image .tab").css({"margin-top":    ((tabImgeHt/100) * tabPos)        + "px"})



                    $(".tab-image .tab").css({"height":hgttt+"px", "top":(newMargin) + 'px'});

                    $(".tab-image .tab").css({"width": (tabImgeWdt/100 * tWheight)});
                    $(".tab-image .tab .tab-padding").css({"width": (tabImgeWdt/100 * tabpad)});

                    var topOffset = ((tabImgeWdt/100 * tWheight)*tabBR3)/100
                    var bottomOffset = ((tabImgeWdt/100 * tWheight)*tabBR4)/100


                    $(".tab-image .tab .tab-padding").css({"height":(hgttt + 1 - topOffset - bottomOffset)+"px"});

                    $(".tab-image .tab .tab-padding").css({"top":(topOffset) - .5+"px"});


                    if(tabc1type == 1)
                    {
                        $(".corner .corner1").css({
                            "width":((tabImgeWdt/100 * tWheight)*tabBR1)/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*tabBR1)/100+"px",
                            "background-image":"url(../static/img/rounded_corner.png)",
                            "transform": "rotate(90deg) scaleX(1)",
                            "top": 0

                        });

                        if(tabBR1 < 0)
                        {
                            console.log(((tabImgeWdt/100 * tWheight) * tabBR1) / 100),
                            $(".corner .corner1").css({
                            "width":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR1))/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR1))/100+"px",
                            "transform": "rotate(90deg) scaleX(-1)",
                            "top": -((tabImgeWdt/100 * tWheight)*Math.abs(tabBR1))/100+"px"
                            });
                        }
                    }
                    else if(tabc1type == 0 )
                    {
                        //$("#tab-c1-br").val("0");
                        $(".corner .corner1").css({
                            "width":"0px",
                            "height":"0px"
                        });
                    }
                    else if(tabc1type == 2)
                    {
                        console.log("test")
                        $(".corner .corner1").css({
                            "width":((tabImgeWdt/100 * tWheight)*tabBR1)/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*tabBR1)/100+"px",
                            "background-image":"url(../static/img/angle.png)",
                            "transform": "rotate(90deg) scaleX(1)",
                            "top": 0

                        });

                        if(tabBR1 < 0)
                        {
                            console.log(((tabImgeWdt/100 * tWheight) * tabBR1) / 100),
                            $(".corner .corner1").css({
                            "width":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR1))/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR1))/100+"px",
                            "transform": "rotate(90deg) scaleX(-1)",
                            "top": -((tabImgeWdt/100 * tWheight)*Math.abs(tabBR1))/100+"px"
                            });
                        }
                    }
                    else
                    {
                        $(".corner .corner1").css({
                            "width":"0px",
                            "height":"0px"
                        });
                    }


                    if(tabc2type == 1)
                    {
                        $(".corner .corner2").css({
                            "width":((tabImgeWdt/100 * tWheight)*tabBR2)/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*tabBR2)/100+"px",
                            "background-image":"url(../static/img/rounded_corner.png)",
                            "transform": "rotate(180deg) scaleX(1)",
                            "bottom":0+"px",

                        });

                        if(tabBR2 < 0)
                        {
                            $(".corner .corner2").css({
                            "width":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR2))/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR2))/100+"px",
                            "transform": "rotate(0deg) scaleX(-1)",
                            "bottom":-((tabImgeWdt/100 * tWheight)*Math.abs(tabBR2))/100+"px"
                            });
                        }

                    }
                    else if((tabc2type == 0))
                    {
                        //$("#tab-c2-br").val("0");
                        $(".corner .corner2").css({
                            "width":"0px",
                            "height":"0px"
                        });
                    }
                    else if(tabc2type == 2)
                    {
                        $(".corner .corner2").css({
                            "width":((tabImgeWdt/100 * tWheight)*tabBR2)/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*tabBR2)/100+"px",
                            "background-image":"url(../static/img/angle.png)",
                            "transform": "rotate(180deg) scaleX(1)",
                            "bottom":0+"px",

                        });

                        if(tabBR2 < 0)
                        {
                            $(".corner .corner2").css({
                            "width":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR2))/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR2))/100+"px",
                            "transform": "rotate(90deg) scaleX(1)",
                            "bottom":-((tabImgeWdt/100 * tWheight)*Math.abs(tabBR2))/100+"px"
                            });
                        }
                    }
                    else
                    {
                        $(".corner .corner2").css({
                            "width":"0px",
                            "height":"0px"
                        });
                    }

                    if(tabc3type == 1)
                    {

                        $(".corner .corner3").css({
                            "width":((tabImgeWdt/100 * tWheight)*tabBR3)/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*tabBR3)/100+"px",
                            "background-image":"url(../static/img/rounded_corner.png)",
                            "transform": "rotate(0deg) scaleX(1)",
                            "top":0+"px",

                        });

                        if(tabBR3 < 0)
                        {
                            $(".corner .corner3").css({
                            "width":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR3))/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR3))/100+"px",
                            "transform": "rotate(-90deg) scaleX(1)",
                            "top":-((tabImgeWdt/100 * tWheight)*Math.abs(tabBR3))/100+"px"
                            });
                        }
                    }
                    else if((tabc3type == 0))
                    {

                        //$("#tab-c3-br").val("0");
                        $(".corner .corner3").css({
                            "width":"0px",
                            "height":"0px"
                        });
                    }
                    else if(tabc3type == 2)
                    {
                        $(".corner .corner3").css({
                            "width":((tabImgeWdt/100 * tWheight)*tabBR3)/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*tabBR3)/100+"px",
                            "background-image":"url(../static/img/angle.png)",
                            "transform": "rotate(0deg) scaleX(1)",
                            "top":0+"px",

                        });

                        if(tabBR3 < 0)
                        {
                            console.log("tewesetset")
                            $(".corner .corner3").css({
                            "width":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR3))/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR3))/100+"px",
                            "transform": "rotate(-90deg) scaleX(1)",
                            "top":-((tabImgeWdt/100 * tWheight)*Math.abs(tabBR3))/100+"px"
                            });
                        }
                    }
                    else
                    {
                        $(".corner .corner3").css({
                            "width":"0px",
                            "height":"0px"
                        });
                    }





                    if(tabc4type == 1)
                    {

                        $(".corner .corner4").css({
                            "width":((tabImgeWdt/100 * tWheight)*tabBR4)/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*tabBR4)/100+"px",
                            "background-image":"url(../static/img/rounded_corner.png)",
                            "transform": "rotate(-90deg) scaleX(1)",
                            "bottom":0+"px",

                        });

                        if(tabBR4 < 0)
                        {
                            $(".corner .corner4").css({
                            "width":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR4))/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR4))/100+"px",
                            "transform": "rotate(-90deg) scaleX(-1)",
                            "bottom": -((tabImgeWdt/100 * tWheight)*Math.abs(tabBR4))/100+"px"
                            });
                        }
                    }
                    else if((tabc4type == 0))
                    {

                        //$("#tab-c4-br").val("0");
                        $(".corner .corner4").css({
                            "width":"0px",
                            "height":"0px"
                        });
                    }
                    else if(tabc4type == 2)
                    {

                        $(".corner .corner4").css({
                            "width":((tabImgeWdt/100 * tWheight)*tabBR4)/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*tabBR4)/100+"px",
                            "background-image":"url(../static/img/angle.png)",
                            "transform": "rotate(-90deg) scaleX(1)",
                            "bottom":0+"px",

                        });

                        if(tabBR4 < 0)
                        {
                            $(".corner .corner4").css({
                            "width":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR4))/100+"px",
                            "height":((tabImgeWdt/100 * tWheight)*Math.abs(tabBR4))/100+"px",
                            "transform": "rotate(-90deg) scaleX(-1)",
                            "bottom": -((tabImgeWdt/100 * tWheight)*Math.abs(tabBR4))/100+"px"
                            });
                        }
                    }
                    else
                    {
                        $(".corner .corner4").css({
                            "width":"0px",
                            "height":"0px"
                        });
                    }
                });
                $("#reset").click(function()
                    {
                       $(".tab-image").addClass("move-page");
                    });
                $("#zoomin").click(function()
                    {
                       $(".tab-image").removeClass("move-page");
                    });
                    $("#zoomout").click(function()
                    {
                       $(".tab-image").removeClass("move-page");
                    });
                $(".tab-settings").draggable();
                var counter = 1;
                $('.zoom-in').click(function() {
                    counter = counter+.25
                    $(".zooming").css({
                        "transform":"scale("+counter+")",
                        "transform-origin": "900px 0px 0px"
                    });
                    $(".tab-image .tab").css({"box-shadow":"0px 0px 0px 0.5px rgba(255,130,0,.4)"})
                    $(".tab-image").addClass("ps--active-y");


                });

                $('.zoom-out').click(function() {
                    counter = counter-.25
                    $(".zooming").css({
                        "transform":"scale("+counter+")",
                        "transform-origin": "900px 0px 0px"
                    });
                    if(counter == 1)
                    {
                        $(".tab-image .tab").css({"box-shadow":"0px 0px 0px 1px rgba(255,130,0,.4)"})
                    }
                });
                $('.reset').click(function() {
                    counter = 1;
                    $(".zooming").css({
                        "transform":"scale("+counter+")",
                        "transform-origin": "900px 0px 0px"
                    });
                    $(".tab-image").removeClass("ps--active-y");
                    $(".tab-image").addClass("move-page");
                    $(".tab-image .tab").css({"box-shadow":"0px 0px 0px 1px rgba(255,130,0,.4)"})
                });

            });

            $(document).on("click", '#build-book', function(e){

              $("#tab-shows").hide();
              $("#copy").hide();

              $("#lbl-step-title ").text("Refine Components");
              $("#lbl-step-title").append(`&nbsp <button name="define_book" class="orange-btn" id="define_book">Define Book Attribute</button>`);
              $("#lbl-step-title").append(`&nbsp <button name="save_btn" class="orange-btn" id="save_btn">Save</button>`);
              $("#sortable").show();


            });


    });
