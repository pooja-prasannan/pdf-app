var base64data1=[];
var max;
    $(function() {
        $.contextMenu({
            selector: '.context-menu-one',
            callback: function(key, options) {


                if (key== "delete"){
                     var ids= $('.context-menu-active').attr('id')
                     $("#"+ids).hide();
                }
                if( key== "front")
                {
                $("#back").append(` <input type='file' multiple id="imgInp" />`);
                var fileList =[];
                $("#back").on('change','#imgInp',function() {
                    readURL(this);
                    $('#imgInp').hide();

                });

                        function readURL(input)
                        {
//                            var max = 0;

//                         var reader = new FileReader();
//                           reader.readAsDataURL(input.files);
//                           reader.onload = function () {
//                             console.log(reader.result);
//                           };



                            if (input.files) {
                             console.log("imp",input.files)
                            var base64data=[];
                            var filesAmount = input.files.length;
                            for(var i=0;i<filesAmount;i++){

                            console.log("length",input.files[i])
                        getBase64(input.files[i])

                            }

//
                            }

                            }



                            function getBase64(file){
                               var reader = new FileReader();
                               reader.readAsDataURL(file);
                               reader.onload = function () {
//                                 console.log("INSIDE",reader.result);
                                 base64data1.push(reader.result)
//                                     console.log("lkdchjslj",base64data1)
                               if(base64data1.length == 2){
                                 $('.images-ids').each(function()
                                    {
                                    var value = parseInt($(this).attr('id'));
                                    max=0;
                                    max = (value > max) ? value : max;
                                    });
                                    console.log("poo",base64data1)
                                    var formData1 ={'front_cover':base64data1, 'id_max': max, 'action': 'add_image'}
                                    console.log("formdata",formData1)
                                    $.ajax('/images/', {
                                    method: "POST",
                                    data: JSON.stringify(formData1),
                                    processData: false,
                                    contentType: false,
                                    success(data) {
                                     console.log('Upload succes',data['img_url'].length);
//                                     for(var inc=1;data['img_url'].length;i++)
//
//                                    },
                                    error() {
                                      console.log('Upload error');
                                    },
                                  });
                                  }
                               };
                               }


//                            alert("i"+i)
//                             var new_max = max+i
//                            var data =window.localStorage.getItem('data');
//                            data = JSON.parse(data);
//                            data["front_cover"].push(new_max)
//                            data = JSON.stringify(data)
//                            window.localStorage.setItem('data',data);
//
                           // var reader = new FileReader();

                                //reader.onload = function(e) {
//                                for(var j=1;j<=filesAmount;j++){
//                                var n_max = max+j
//                                alert("before"+n_max)
//                                 $("#"+n_max).find('img').attr('src', e.target.result).width(150) .height(250);
//                                 alert("after")
//                                }
                    // }
                        //alert("readAsDataURL"+i)
                       // reader.readAsDataURL(input.files[i]);

//                      var url  = 'http://server.com/upload';
//                        var image_file = $('#imgInp').get(0).files[0];
//
//                        var formData = new FormData();
//                        formData.append("image_file", image_file);
//
                       // Use `jQuery.ajax` method

                }

                if( key== "back")
                {
                    alert("back");
                }

                 if( key== "tab")
                {
                    alert("tab");
                }

                 if( key== "stack")
                {
                    alert("stack");
                }



                 if (key== "edit"){
                    alert("clicked edit");
                    $("#next-button ").data("current-step","edit");
                    $("#lbl-step-title ").text("Step 7: Adjust Page");
//                  $("#next-button").html(`<button name="crop-save" class="orange-btn " data-current-step="drag" id="crop-save"> Save </button>`);
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
//                        console.log(event.detail.x);
//                        console.log(event.detail.y);
//                        console.log(event.detail.width);
//                        console.log(event.detail.height);
//                        console.log(event.detail.rotate);
//                        console.log(event.detail.scaleX);
//                        console.log(event.detail.scaleY);
                      },
                    });

                   $("#back").append(`&nbsp <div name="save" id="preview-section" class="preview"  ></div>`);
                   setTimeout(function(){
                        $(".preview").find("img").hide();
                   }, 100);

//                   $(".preview").find("img").hide();
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
//               $("#"+data["front_cover"][0]).append(`<div><label for="name">Front</label></div>`);

            // show and hide tabsss

                        var a= data["total_tabs"]
                        for(var i=0,j=0;i<a.length;i++)
            {
//                     var first = a[i].shift();


                 $("#"+a[i][0]).show();
//                 $("#"+a[i][0]).append(`<div><label for="name">tab ${j+1} </label></div>`);
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
//	                $("#"+a[i][0]).append(`<div><label for="name">stack ${j+1} </label></div>`);
	                j++
            }
            for(var i=0;i<a.length;i++)
            {

                for(var j=1;j<a[i].length;j++){
                  $("#"+a[i][j]).hide();
                }
            }


                $("#"+data["back_cover"][0]).show();
//                $("#"+data["back_cover"][0]).append(`<div><label for="name">Back</label></div>`);

                    alert("back-click"+ids);
//                 $("#"+ids).show();
//                 var a = $(".preview").find("img").attr('src');
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


//

                   })

// Get the Cropper.js instance after initialized
//var cropper = $image.data('cropper');

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