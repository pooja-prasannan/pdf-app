var base64data=[];
var temp_total_tabs =[];
var temp_total_stacks =[];
var max;
var max1;
var keys;
    $(function() {
        $.contextMenu({
            selector: '.context-menu-one',
            callback: function(key, options) {
                if (key== "delete"){
                     var ids= $('.context-menu-active').attr('id')
                     $("#"+ids).hide();
                }

                if( key== "front" || key == "back" )
                {
                keys = key;
                 base64data=[];

                 $("#back").empty()

                $("#back").append(` <input type='file' multiple id="imgInp" />`);



                var fileList =[];
                $("#back").off().on('change','#imgInp',function() {
                    $('#imgInp').hide();
                    if(this.files.length>2){

                    alert("only 2 files can be uploaded"+this.files.length)}
                    else{
                    readURL(this,keys);
                    base64data.length=0;
                    }



                });

                function readURL(input,keys)
                    {
                        if ( input.files.length<=2) {

                        console.log("imp",input.files)
                        var base64data=[];
                        var filesAmount = input.files.length;
                        for(var i=0;i<filesAmount;i++){

                          console.log("length",input.files[i])
                          getBase64(keys ,input, input.files[i])

                           }
                         }

                         else{
                          alert("You can upload only 2 files")
                         }
                    }

                function getBase64(keys ,input, file){

                   var reader = new FileReader();
                   reader.readAsDataURL(file);
                   reader.onload = function () {
                         base64data.push(reader.result)

                       if(base64data.length == input.files.length){

                            max1=0;
                             $('.images-ids').each(function()
                                {
                                    var value = parseInt($(this).attr('id'));

                                    max1 = (value > max1) ? value : max1;
                                });




                            var formData1 ={'front_cover':base64data, 'id_max': max1, 'action': 'add_image'}
                            console.log("formdata",formData1)
                            $.ajax('/images/', {
                            method: "POST",
                            data: JSON.stringify(formData1),
                            processData: false,
                            contentType: false,
                            contentType: false,
                            success(datas) {
                             console.log('Upload succes',datas['img_url'].length);
                             for(var inc=0;inc<datas['img_url'].length;inc++)
                                {
                                 max=0;
                                $('.images-ids').each(function()
                                 {
                                var value = parseInt($(this).attr('id'));

                                max = (value > max) ? value : max;
                                 });

                                 var n_max = max+1
                                 var new_max =n_max.toString()
                                  data =window.localStorage.getItem('data')
                                  data = JSON.parse(data)

                                 if(key == "front"){


                                  var len = data['front_cover'].length;
                                  var parent_id = data['front_cover'][len-1];

                                 $("#"+parent_id).after(`<div id = ${new_max} class="images-ids"  class="ui-state-default">
                                  <img src="#"  width="150px" height="250px" class="img-responsive" alt=""> </div>`);
//                                 $("#sortable").append(` <div id = ${new_max} class="images-ids"  class="ui-state-default">
//                                  <img src="#"  width="150px" height="250px" class="img-responsive" alt=""> </div>`)
                                 $("#"+new_max).find('img').attr('src', datas['img_url'][inc]).width(150) .height(250);
                                 $("#sortable").sortable({
                                        disabled: false,
                                        revert: true,
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

                                     var image_ids = $("#sortable").sortable("toArray");
                                     var data = window.localStorage.getItem('data');
                                     data = JSON.parse(data)
                                     data["new_order"] = image_ids
                                     data = JSON.stringify(data)
                                     window.localStorage.setItem('data', data);
                                     console.log(window.localStorage.getItem('data'))

                                    data['front_cover'].push(new_max.toString())
                                    data = JSON.stringify(data)
                                    window.localStorage.setItem('data', data);

                                 }
                                  if(key == "back"){

                                    var len = data['back_cover'].length;
                                  var parent_id = data['back_cover'][len-1];
                                 $("#"+parent_id).after(`<div id = ${new_max} class="images-ids"  class="ui-state-default">
                                  <img src="#"  width="150px" height="250px" class="img-responsive" alt=""> </div>`);
//                                 $("#sortable").append(` <div id = ${new_max} class="images-ids"  class="ui-state-default">
//                                  <img src="#"  width="150px" height="250px" class="img-responsive" alt=""> </div>`)
                                 $("#"+new_max).find('img').attr('src', datas['img_url'][inc]).width(150) .height(250);
                                 $("#sortable").sortable({
                                        disabled: false,
                                        revert: true,
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

                                     var image_ids = $("#sortable").sortable("toArray");
                                     var data = window.localStorage.getItem('data');
                                     data = JSON.parse(data)
                                     data["new_order"] = image_ids
                                     data = JSON.stringify(data)
                                     window.localStorage.setItem('data', data);
                                     console.log(window.localStorage.getItem('data'))

                                    data['back_cover'].push(new_max)
                                    data = JSON.stringify(data)
                                    window.localStorage.setItem('data', data);

                                 }
                                 if(inc%2==0)
                                   {
                                     $("#"+new_max).find("img").show();
                                     if(keys == "front"){


                                    $("#"+new_max).append(`<div><label for="name">Front</label></div>`);
                                     }

                                     if(keys == "back"){

                                     $("#"+new_max).append(`<div><label for="name">Back</label></div>`);
                                     }
                                   }
                                 else
                                 {
                                 $("#"+new_max).find("img").hide();
                                 }
                                 }
                                    },
                            error()
                                   {
                                      console.log('Upload error');
                                    },
                              });
//                                  $('#imgInp').hide();
                             }
                           };
                     }
                }

                 if( key== "stack")
                {
                temp_total_stacks=[];
                $("#back").empty()
                $("#back").append(` <input type='file' multiple id="imgInp" />`);
                var fileList =[];
                $("#back").off().on('change','#imgInp',function() {
                    readURL(this);
                    base64data.length=0;
                    $('#imgInp').show();
                    $('#imgInp').hide();

                });

                function readURL(input)
                    {

                        if ( input.files) {
                        console.log("imp",input.files)
                        var base64data=[];
                        var filesAmount = input.files.length;
                        for(var i=0;i<filesAmount;i++){

                          console.log("length",input.files[i])
                          getBase64(input, input.files[i])

                           }
                         }

                    }

                function getBase64(input, file){

                   var reader = new FileReader();
                   reader.readAsDataURL(file);
                   reader.onload = function () {
                         base64data.push(reader.result)

                       if(base64data.length == input.files.length){

                          max1=0;
                             $('.images-ids').each(function()
                                {
                                    var value = parseInt($(this).attr('id'));
                                    max1 = (value > max1) ? value : max1;
                                });

                            var formData1 ={'front_cover':base64data, 'id_max': max1, 'action': 'add_image'}
                            console.log("formdata",formData1)
                            $.ajax('/images/', {
                            method: "POST",
                            data: JSON.stringify(formData1),
                            processData: false,
                            contentType: false,
                            success(datas) {
                             console.log('Upload succes',datas['img_url'].length);
                             for(var inc=0;inc<datas['img_url'].length;inc++)
                                {

                                     //var new_max = max+inc+1
                                     max=0;
                                    $('.images-ids').each(function()
                                     {
                                    var value = parseInt($(this).attr('id'));

                                    max = (value > max) ? value : max;
                                     });
                                     var n_max = max+1
                                 var new_max =n_max.toString()
//                                  data =window.localStorage.getItem('data')
//                                  data = JSON.parse(data)

                                     $("#sortable").append(` <div id = ${new_max} class="images-ids"  class="ui-state-default">
                                      <img src="#"  width="150px" height="250px" class="img-responsive" alt=""> </div>`)
                                     $("#"+new_max).find('img').attr('src', datas['img_url'][inc]).width(150) .height(250);
                                    temp_total_stacks.push(new_max)
                                     $("#sortable").sortable({
                                        disabled: false,
                                        revert: true,
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

                                         var image_ids = $("#sortable").sortable("toArray");
                                         var data = window.localStorage.getItem('data');
                                         data = JSON.parse(data)
                                         data["new_order"] = image_ids
                                         data = JSON.stringify(data)
                                         window.localStorage.setItem('data', data);
                                         console.log(window.localStorage.getItem('data'))
//



                                     if(inc==0)
                                       {
                                         $("#"+new_max).find("img").show();
                                         $("#"+new_max).append(`<div><label for="name">stack</label></div>`);
                                       }
                                     else
                                     {
                                     $("#"+new_max).find("img").hide();
                                     }
                                 }

                                 data =window.localStorage.getItem('data')
                                 data = JSON.parse(data)
                                 data['total_stacks'].push(temp_total_stacks)
                                 data = JSON.stringify(data)
                                 window.localStorage.setItem('data', data);

                                    },
                            error()
                                   {
                                      console.log('Upload error');
                                    },
                              });
                             }
                           };
                     }

                }

                 if( key== "tab")
                {
                  temp_total_tabs =[];
                 $("#back").empty()
                keys=key;
                $("#back").append(` <input type='file' multiple id="imgInp" />`);
                var fileList =[];
                $("#back").off().on('change','#imgInp',function() {


//                    $('#imgInp').hide();
                    readURL_stack(this,keys);
//                    alert("imp length"+this.length)
                    base64data.length=0;
                    base64data=[]


                });

                function readURL_stack(input, keys)
                    {

                        if ( input.files.length==2) {
                        console.log("imp",input.files)
                        var base64data=[];
                        var filesAmount = input.files.length;
                        for(var i=0;i<filesAmount;i++){
                          console.log("length",input.files[i])
                          getBase64_stack(keys,input, input.files[i])

                           }
                         }
                         else{
                          alert("You must upload  2 files")
                         }
                    }

                function getBase64_stack(keys, input, file){

                   var reader = new FileReader();
                   reader.readAsDataURL(file);
                   reader.onload = function () {
                         base64data.push(reader.result)

                       if(base64data.length == input.files.length){
                            max1=0;
                             $('.images-ids').each(function()
                                {
                                    var value = parseInt($(this).attr('id'));

                                    max1 = (value > max1) ? value : max1;
                                });

                            var formData1 ={'front_cover':base64data, 'id_max': max1, 'action': 'add_image'}
                            console.log("formdata644",formData1)
                            $.ajax('/images/', {
                            method: "POST",
                            data: JSON.stringify(formData1),
                            processData: false,
                            contentType: false,
                            success(datas) {
                             console.log('Upload succes',datas['img_url'].length);

                             for(var inc=0;inc<datas['img_url'].length;inc++)
                                {
//
                                 max=0;
                                $('.images-ids').each(function()
                                 {
                                var value = parseInt($(this).attr('id'));

                                max = (value > max) ? value : max;
                                 });

                                 var n_max = max+1
                                 var new_max =n_max.toString()
//

                                     $("#sortable").append(` <div id = ${new_max} class="images-ids"  class="ui-state-default">
                                      <img src="#"  width="150px" height="250px" class="img-responsive" alt=""> </div>`)
                                     $("#"+new_max).find('img').attr('src', datas['img_url'][inc]).width(150) .height(250);
//
//                                       $("#sortable").sortable({  });

                                         $("#sortable").sortable({
                                            disabled: false,
                                            revert: true,
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

                                         var image_ids = $("#sortable").sortable("toArray");
                                         var data = window.localStorage.getItem('data');
                                         data = JSON.parse(data)
                                         data["new_order"] = image_ids
                                         data = JSON.stringify(data)
                                         window.localStorage.setItem('data', data);
                                         console.log(window.localStorage.getItem('data'))
//
                                       temp_total_tabs.push(new_max)

//
                                     if(inc%2==0)
                                       {
                                         $("#"+new_max).find("img").show();

                                         $("#"+new_max).append(`<div><label for="name">tab</label></div>`);

                                       }
                                     else
                                     {
                                     $("#"+new_max).find("img").hide();
                                     }
                                 }
                                 data =window.localStorage.getItem('data')
                                 data = JSON.parse(data)
                                 data['total_tabs'].push(temp_total_tabs)
                                 data = JSON.stringify(data)
                                 window.localStorage.setItem('data', data);
                                    },
                            error()
                                   {
                                      console.log('Upload error');
                                    },
                              });
//                                    $('#imgInp').hide();
                             }
                           };
                     }
                }

                 if (key== "edit"){

                    $(".wrapper").show();
                    $("#next-button ").data("current-step","edit");
                    $("#lbl-step-title ").text("Step 7: Adjust Page");

                    $("#lbl-step-title").append(`&nbsp  <button name="define_book" class="orange-btn" id="define_book">Define Book Attribute</button>`);

                     $("#lbl-step-title").append(`&nbsp <button name="save" class="orange-btn" id="back-button">Back</button>`);

                     $("#lbl-step-title").append(`&nbsp <button name="save" class="orange-btn" id="crop-save">Save</button>`);

                     $("#lbl-step-title").append(`&nbsp <button name="save" class="orange-btn" id="preview-btn">Preview</button>`);

                    var ids= $('.context-menu-active').attr('id')
                    $(".images-ids").hide();
                    // $("#"+ids).show();
                    // var image = $("#"+ids).children('img')[0];

                    $("#"+ids).removeClass("context-menu-one");
                    

                    var proportion = 1; // you may change the proportion for the cropped image.
                    var theImage =   $("#"+ids).find('img').attr('src');
                    alert("theImage"+theImage);
                    
                    
                    
                    var output = document.getElementById("output");
                    var c1 = document.getElementById("c1");
                    var ctx1 = c1.getContext("2d");
                    var c2 = document.getElementById("c2");
                    var ctx2 = c2.getContext("2d");
                    
                    var cw = c1.width = c2.width = 400,
                      cx = cw / 2;
                    var ch = c1.height = c2.height = 400,
                      cy = ch / 2;
                    
                    var isDragging1 = false;
                    var isDragging2 = false;
                    
                    var sy = 20;
                    var sx = 130;
                    var sw = 200;
                    var sh = 200;
                    
                    var r = 4;
                    
                    var mousePos1 = {
                      x: 0,
                      y: 0
                    };
                    var mousePos2 = {
                      x: 0,
                      y: 0
                    };
                    
                    var o = { // cropping bars
                      "sx": {
                        color: "gray",
                        x: 0,
                        y: sy,
                        w: cw,
                        h: r,
                        bool: false,
                      },
                      "sy": {
                        color: "yellow",
                        x: sx,
                        y: 0,
                        w: r,
                        h: ch,
                        bool: false,
                      },
                      "sw": {
                        color: "orange",
                        x: 0,
                        y: sy + sh,
                        w: cw,
                        h: r,
                        bool: false,
                      },
                      "sh": {
                        color: "red",
                        x: sx + sw,
                        y: 0,
                        w: r,
                        h: ch,
                        bool: false,
                      }
                    }
                    
                    function drawGuides(o) {
                      for (k in o) {
                        ctx1.fillStyle = o[k].color;
                        ctx1.beginPath();
                        ctx1.fillRect(o[k].x, o[k].y, o[k].w, o[k].h);
                      }
                    }
                    
                    function Imgo(o, d) { // an object defining the cropped image
                      var imgo = {
                        sx: o.sy.x,
                        sy: o.sx.y,
                        sw: o.sh.x - o.sy.x,
                        sh: o.sw.y - o.sx.y,
                        w: ~~((o.sh.x - o.sy.x) * proportion),
                        h: ~~((o.sw.y - o.sx.y) * proportion),
                        x: d.x,
                        y: d.y
                      }
                      return imgo;
                    }
                    
                    var d = {
                      x: ~~(cx - sw * proportion / 2),
                      y: ~~(cy - sh * proportion / 2)
                    }
                    
                    function Output(Imgo, output) {
                      output.innerHTML = "ctx.drawImage(img," + imgo.sx + "," + imgo.sy + "," + imgo.sw + "," + imgo.sh + "," + imgo.x + "," + imgo.y + "," + imgo.w + "," + imgo.h + ")";
                    }
                    
                    function drawCroppedImage(imgo) {
                      ctx2.drawImage(img, imgo.sx, imgo.sy, imgo.sw, imgo.sh, imgo.x, imgo.y, imgo.w, imgo.h);
                    }
                    
                    function outlineImage(imgo) {
                      ctx2.beginPath();
                      ctx2.rect(imgo.x, imgo.y, imgo.w, imgo.h);
                    }
                    
                    function cursorStyleC1() {
                      c1.style.cursor = "default";
                      for (k in o) { //o[k].bool = false;
                        ctx1.beginPath();
                        ctx1.rect(o[k].x - 10, o[k].y - 10, o[k].w + 20, o[k].h + 20);
                        if (ctx1.isPointInPath(mousePos1.x, mousePos1.y)) {
                          if (k == "sx" || k == "sw") {
                            c1.style.cursor = "row-resize";
                          } else {
                            c1.style.cursor = "col-resize";
                          }
                          break;
                        } else {
                          c1.style.cursor = "default";
                        }
                      }
                    }
                    
                    function cursorStyleC2() {
                      c2.style.cursor = "default";
                      outlineImage(imgo);
                      if (ctx2.isPointInPath(mousePos2.x, mousePos2.y)) {
                        c2.style.cursor = "move";
                      } else {
                        c2.style.cursor = "default";
                      }
                    }
                    
                    drawGuides(o);
                    var imgo = Imgo(o, d); // an object defining the cropped image
                    Output(Imgo, output); // text: "drawImage(img,130,10,200,220,150,145,100,110)";
                    console.log("imgottt",imgo);
                    console.log("outputtt",output);
                    
                    var img = new Image();
                    img.src = theImage;
                    img.onload = function() {
                      c1.style.backgroundImage = "url("+theImage+")";
                      drawCroppedImage(imgo);
                    }
                    
                    // mousedown ***************************
                    
                    c1.addEventListener('mousedown', function(evt) {
                      isDragging1 = true;
                    
                      mousePos1 = oMousePos(c1, evt);
                      for (k in o) {
                        ctx1.beginPath();
                        ctx1.rect(o[k].x - 10, o[k].y - 10, o[k].w + 20, o[k].h + 20);
                        if (ctx1.isPointInPath(mousePos1.x, mousePos1.y)) {
                          o[k].bool = true;
                          if (k == "sx" || k == "sw") {
                            o[k].y = mousePos1.y;
                          } else {
                            o[k].x = mousePos1.x;
                          }
                          break;
                        } else {
                          o[k].bool = false;
                        }
                      }
                    
                      Output(Imgo, output);
                    
                    }, false);
                    
                    c2.addEventListener('mousedown', function(evt) {
                      mousePos2 = oMousePos(c2, evt);
                      outlineImage(imgo)
                      if (ctx2.isPointInPath(mousePos2.x, mousePos2.y)) {
                        isDragging2 = true;
                    
                        deltaX = mousePos2.x - imgo.x;
                        deltaY = mousePos2.y - imgo.y;
                    
                        Output(Imgo, output);
                      }
                    }, false);
                    
                    // mousemove ***************************
                    c1.addEventListener('mousemove', function(evt) {
                      mousePos1 = oMousePos(c1, evt); //console.log(mousePos)	
                      cursorStyleC1();
                    
                      if (isDragging1 == true) {
                        ctx1.clearRect(0, 0, cw, ch);
                    
                        for (k in o) {
                          if (o[k].bool) {
                            if (k == "sx" || k == "sw") {
                              o[k].y = mousePos1.y;
                            } else {
                              o[k].x = mousePos1.x;
                            }
                            break;
                          }
                        }
                    
                        drawGuides(o);
                        ctx2.clearRect(0, 0, cw, ch);
                        imgo = Imgo(o, d);
                        drawCroppedImage(imgo);
                        Output(Imgo, output);
                      }
                    }, false);
                    
                    c2.addEventListener('mousemove', function(evt) {
                      mousePos2 = oMousePos(c2, evt);
                    
                      if (isDragging2 == true) {
                        ctx2.clearRect(0, 0, cw, ch);
                        d.x = mousePos2.x - deltaX;
                        d.y = mousePos2.y - deltaY;
                        imgo = Imgo(o, d);
                        drawCroppedImage(imgo);
                        Output(Imgo, output);
                      }
                      cursorStyleC2();
                    }, false);
                    
                    // mouseup ***************************
                    c1.addEventListener('mouseup', function(evt) {
                      isDragging1 = false;
                      for (k in o) {
                        o[k].bool = false;
                      }
                    }, false);
                    
                    c2.addEventListener('mouseup', function(evt) {
                      isDragging2 = false;
                    
                    }, false);
                    
                    // mouseout ***************************
                    c1.addEventListener('mouseout', function(evt) {
                      isDragging1 = false;
                      for (k in o) {
                        o[k].bool = false;
                      }
                    }, false);
                    
                    c2.addEventListener('mouseout', function(evt) {
                      isDragging2 = false;
                    
                    }, false);
                    
                    function oMousePos(canvas, evt) {
                      var rect = canvas.getBoundingClientRect();
                      return {
                        x: Math.round(evt.clientX - rect.left),
                        y: Math.round(evt.clientY - rect.top)
                      }
                    }
                    $("#"+ids).append(`<div class ="tab-leaf"></div>`)
                   $("#back").append(`&nbsp <div name="save" id="preview-section" class="preview"  ></div>`);
                   setTimeout(function(){
                        $(".preview").find("img").hide();


                   }, 100);

                   $(".tab-leaf").resizable();
                   $(".tab-leaf").draggable();



//                   $("#"+ids).resizable({
//    autoHide: true,
//    stop: function(e, ui) {
//        var parent = ui.element.parent();
//        ui.element.css({
//            width: ui.element.width()/parent.width()*100+"%",
//            height: ui.element.height()/parent.height()*100+"%"
//        });
//    }
//});


                    $('#preview-btn').on('click', function(e){
                        $("#"+ids).show();
                        $(".preview").find("img").show();
                   })

                  $('#crop-save,#next-button').on('click', function(e){

                   $("#"+ids).hide();
                   $(".preview").find("img").show();

                    var canvas = document.getElementById('c2');
                    imgData = canvas.toDataURL();
                      var formData ={'image_ids': ids, 'croppedImage':imgData, 'action': 'edit_image'}

                      // Use `jQuery.ajax` method
                      $.ajax('/images/', {
                        method: "POST",
                        data: JSON.stringify(formData),

                        processData: false,
                        contentType: false,
                        success(data) {
                          console.log('Upload success', data);
                          var crop_dict ={};
                          var cropped_images =[];
                          crop_dict[ids] = data['img_url'];

                          cropped_images.push(crop_dict)
                          window.localStorage.setItem('cropped-image',JSON.stringify(cropped_images))

                        },
                        error() {
                          console.log('Upload error');
                        },
                      });
                    //});

        })

            $('#back-button').on('click', function(e){
                $(".wrapper").hide();
             $(".tab-leaf").hide();
//                $("#"+ids).show();
                    $(".preview").find("img").hide();
                       if($(".cropper-crop-box").length = 1)
                        {
                        $(".cropper-crop-box").remove();
                        }
                        $(".cropper-canvas").css({"transform":"translateX(1.59883px) translateY(21.913px)!important"})
                        console.log($(".cropper-crop-box").length)
               var data= window.localStorage.getItem('data');
               data = JSON.parse(data)
               $("#"+data["front_cover"][0]).show();


            // show and hide tabsss

                        var a= data["total_tabs"]
                        for(var i=0,j=0;i<a.length;i++)
            {



                 $("#"+a[i][0]).show();
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

	                 $("#"+a[i][0]).show();
	                j++
            }
            for(var i=0;i<a.length;i++)
            {

                for(var j=1;j<a[i].length;j++){
                  $("#"+a[i][j]).hide();
                }
            }
                $("#"+data["back_cover"][0]).show();
//                var cropped_image = window.localStorage.getItem('cropped-image');
//
//
//                 var result = JSON.parse(cropped_image);
//
//                for( var r=0;  r<result.length ;r++ ){
//
//                    var cropped_images= result[r];
//                    for( var key in cropped_images){
//
//                        console.log(">>>>>>>>>>>>>>>>>>>>",key,cropped_images[key])
//
//                        $("#"+key).find("img").attr('src',cropped_images[key]);
//                        $("#"+key).removeClass('cropper-face')
////                        $("#"+key).show();
//                        }
//                }
                $('#back-button').hide();
                $("#crop-save").hide();
                $("#preview-btn").hide();
                   })


                }
            },
            items: {
                "delete": {name: "Delete", icon: "delete"},
                "edit": {name: "Edit", icon: "edit"},
                "add": {name: "Add",items: {
                            "front": {"name": "Front"},
                            "stack": {"name": "Stack"},
                            "tab": {"name": "Tab"},
                            "back": {"name": "Back"}
                        }, icon: "add"},
            }
        });

        $('.images-ids').on('click', function(e){
            console.log('clicked', this);
        })
    });
