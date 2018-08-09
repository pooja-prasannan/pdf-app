var base64data=[];
var max;
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
//                alert("intial click"+keys);
                 $("#back").empty()
//                if( $("#back").find("input").length){
//                 $('#imgInp').hide();
//                 $("#back").append(` <input type='file' multiple id="imgInp" />`);
//                }
//                else{
                $("#back").append(` <input type='file' multiple id="imgInp" />`);
//                }


                var fileList =[];
                $("#back").on('change','#imgInp',function() {
                    $('#imgInp').hide();
                    if(this.files.length>2){
//                    var abc = $("#imgInp").length();
//                    alert("abc"+abc)
                    alert("only 2 files can be uploaded"+this.files.length)}
                    else{
                    readURL(this,keys);
                    base64data.length=0;
                    }
//                    readURL(this,keys);
//                    base64data.length=0;


                });

                function readURL(input,keys)
                    {
                        if ( input.files.length<=2) {
//                        alert(" readURL"+keys)
                        console.log("imp",input.files)
                        var base64data=[];
                        var filesAmount = input.files.length;
                        for(var i=0;i<filesAmount;i++){

                          console.log("length",input.files[i])
                          getBase64(keys ,input, input.files[i])

                           }
                         }

//                         else{
//                          alert("You can upload only 2 files")
//                         }
                    }

                function getBase64(keys ,input, file){
//                alert("func"+keys)
//                alert("getBase64"+base64data.length);
                   var reader = new FileReader();
                   reader.readAsDataURL(file);
                   reader.onload = function () {
                         base64data.push(reader.result)

                       if(base64data.length == input.files.length){
                           $('.images-ids').each(function()
                            {
                                var value = parseInt($(this).attr('id'));
                                max=0;
                                max = (value > max) ? value : max;
                            });
                            var formData1 ={'front_cover':base64data, 'id_max': max, 'action': 'add_image'}
                            console.log("formdata",formData1)
                            $.ajax('/images/', {
                            method: "POST",
                            data: JSON.stringify(formData1),
                            processData: false,
                            contentType: false,
                            success(data) {
                             console.log('Upload succes',data['img_url'].length);
                             for(var inc=0;inc<data['img_url'].length;inc++)
                                {

                                 var new_max = max+inc+1
                                 alert("new"+new_max)
                                 $("#sortable").append(` <div id = ${new_max} class="images-ids"  class="ui-state-default">
                                  <img src="#"  width="150px" height="250px" class="img-responsive" alt=""> </div>`)
                                 $("#"+new_max).find('img').attr('src', data['img_url'][inc]).width(150) .height(250);

                                 if(inc%2==0)
                                   {
                                     $("#"+new_max).find("img").show();
                                     if(keys == "front"){
                                     alert(keys)
                                     $("#"+new_max).append(`<div><label for="name">Front</label></div>`);
                                     }

                                     if(keys == "back"){
                                     alert(keys)
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

                 if( key== "tab")
                {
                alert("tab")
                     $("#back").empty()
                 $("#back").append(` <input type='file' multiple id="imgInp" />`);
                var fileList =[];
                $("#back").on('change','#imgInp',function() {
                    readURL(this);
                    base64data.length=0;
                    $('#imgInp').show();
                    $('#imgInp').hide();

                });

                function readURL(input)
                    {
                      //alert("fgdg")
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
               // alert("getBase64"+base64data.length);
                   var reader = new FileReader();
                   reader.readAsDataURL(file);
                   reader.onload = function () {
                         base64data.push(reader.result)

                       if(base64data.length == input.files.length){
                       alert(input.files.length)
                           $('.images-ids').each(function()
                            {
                                var value = parseInt($(this).attr('id'));
                                max=0;
                                max = (value > max) ? value : max;
                            });
                            var formData1 ={'front_cover':base64data, 'id_max': max, 'action': 'add_image'}
                            console.log("formdata",formData1)
                            $.ajax('/images/', {
                            method: "POST",
                            data: JSON.stringify(formData1),
                            processData: false,
                            contentType: false,
                            success(data) {
                             console.log('Upload succes',data['img_url'].length);
                             for(var inc=0;inc<data['img_url'].length;inc++)
                                {

                                     var new_max = max+inc+1
                                     alert("new"+new_max)
                                     $("#sortable").append(` <div id = ${new_max} class="images-ids"  class="ui-state-default">
                                      <img src="#"  width="150px" height="250px" class="img-responsive" alt=""> </div>`)
                                     $("#"+new_max).find('img').attr('src', data['img_url'][inc]).width(150) .height(250);
                                     if(inc%2==0)
                                       {
                                      // alert("keysssssss"+key)
                                         $("#"+new_max).find("img").show();

                                         $("#"+new_max).append(`<div><label for="name">tabs</label></div>`);

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
                             }
                           };
                     }
                }

                 if( key== "stack")
                {
                 $("#back").empty()
                keys=key;
              //  alert("initialstack"+keys)
//                if($("#back").find("input").length){
//
//                 $("#back").append(` <input type='file' multiple id="imgInp" />`);
//                }
//                else{
//                $("#back").append(` <input type='file' multiple id="imgInp" />`);
//                }




                $("#back").append(` <input type='file' multiple id="imgInp" />`);
                var fileList =[];
                $("#back").on('change','#imgInp',function() {

                    $('#imgInp').hide();
                    readURL_stack(this,keys);
                    base64data.length=0;


                });

                function readURL_stack(input, keys)
                    {
                        if ( input.files.length==2) {
                     //   alert("stack length"+input.files.length)
                      //  alert("url"+keys)
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
//                alert("getBase64"+base64data.length+"keysfunc"+keys);
                   var reader = new FileReader();
                   reader.readAsDataURL(file);
                   reader.onload = function () {
                         base64data.push(reader.result)

                       if(base64data.length == input.files.length){
                           $('.images-ids').each(function()
                            {
                                var value = parseInt($(this).attr('id'));
                                max=0;
                                max = (value > max) ? value : max;
                            });
                            var formData1 ={'front_cover':base64data, 'id_max': max, 'action': 'add_image'}
                            console.log("formdata644",formData1)
                            $.ajax('/images/', {
                            method: "POST",
                            data: JSON.stringify(formData1),
                            processData: false,
                            contentType: false,
                            success(data) {
                             console.log('Upload succes',data['img_url'].length);
                             for(var inc=0;inc<data['img_url'].length;inc++)
                                {

                                     var new_max = max+inc+1
                                     alert("new"+new_max)
                                     $("#sortable").append(` <div id = ${new_max} class="images-ids"  class="ui-state-default">
                                      <img src="#"  width="150px" height="250px" class="img-responsive" alt=""> </div>`)
                                     $("#"+new_max).find('img').attr('src', data['img_url'][inc]).width(150) .height(250);

                                     if(inc%2==0)
                                       {
                                         $("#"+new_max).find("img").show();
                                         alert("display"+keys)
                                         $("#"+new_max).append(`<div><label for="name">stack</label></div>`);

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
                                    $('#imgInp').hide();
                             }
                           };
                     }
                }



                 if (key== "edit"){
                    alert("clicked edit");
                    $("#next-button ").data("current-step","edit");
                    $("#lbl-step-title ").text("Step 7: Adjust Page");
//       ton name="crop-save" class="orange-btn " data-current-step="drag" id="crop-save"> Save </button>`);
                     $("#lbl-step-title").append(`&nbsp <button name="save" class="orange-btn" id="back-button">Back</button>`);

                     $("#lbl-step-title").append(`&nbsp <button name="save" class="orange-btn" id="crop-save">Save</button>`);

                     $("#lbl-step-title").append(`&nbsp <button name="save" class="orange-btn" id="preview-btn">Preview</button>`);

                    var ids= $('.context-menu-active').attr('id')
                    $(".images-ids").hide();
                    $("#"+ids).show();
                    var image = $("#"+ids).children('img')[0];

                    $("#"+ids).removeClass("context-menu-one");
                    const cropper = new Cropper(image, {
                      aspectRatio: 16 / 9,
                      preview: '.preview',
                      viewMode: 0,
                      getCroppedCanvas:{fillcolor: "#FFFFFF"},
                      highlight: true,
                      background: true,
                      crop(event) {

                      },
                    });

                   $("#back").append(`&nbsp <div name="save" id="preview-section" class="preview"  ></div>`);
                   setTimeout(function(){
                        $(".preview").find("img").hide();
                   }, 100);


                    $('#preview-btn').on('click', function(e){
                        $("#"+ids).show();
                        $(".preview").find("img").show();
                   })

                  $('#crop-save,#next-button').on('click', function(e){

                   $("#"+ids).hide();
                   $(".preview").find("img").show();

                    cropper.getCroppedCanvas();
                    cropper.getCroppedCanvas({
                      width: 160,
                      height: 90,
                      minWidth: 256,
                      minHeight: 256,
                      maxWidth: 4096,
                      maxHeight: 4096,
                      fillColor: '#fff',
                      imageSmoothingEnabled: false,
                      imageSmoothingQuality: 'high',
                    });

                    // Upload cropped image to server if the browser supports `HTMLCanvasElement.toBlob`
                    cropper.getCroppedCanvas().toBlob((blob) => {

                     var reader = new FileReader();
                     reader.readAsDataURL(blob);
                     reader.onload = function() {

                          base64data = reader.result;
//
                     }
                      var formData ={'image_ids': ids, 'croppedImage':base64data, 'action': 'edit_image'}

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
                          console.log("dictttttttttt", crop_dict);
                          cropped_images.push(crop_dict)
                          window.localStorage.setItem('cropped-image',JSON.stringify(cropped_images))

                        },
                        error() {
                          console.log('Upload error');
                        },
                      });
                    });

        })

            $('#back-button').on('click', function(e){
                $("#"+ids).show();
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
                    alert("back-click"+ids);
                var cropped_image = window.localStorage.getItem('cropped-image');

                 var result = JSON.parse(cropped_image);

                for( var r=0;  r<result.length ;r++ ){

                    var cropped_images= result[r];
                    for( var key in cropped_images){
                        alert(key+"   "+cropped_images[key])

                        $("#"+key).find("img").attr('src',cropped_images[key]);
                        $("#"+key).removeClass('cropper-face')
//                        $("#"+key).show();
                        }
                }
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