
    $(function() {


        $.contextMenu({
            selector: '.context-menu-one',
            callback: function(key, options) {

                    var m = "clicked: " + key;
                     window.console && console.log(m) || alert(m);

                if (key== "delete"){
                     var ids= $('.context-menu-active').attr('id')
                     $("#"+ids).hide();
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
                      var formData ={'image_ids': ids, 'croppedImage':base64data}

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
                            "fold2-key1": {"name": "Front"},
                            "fold2-key2": {"name": "Stack"},
                            "fold2-key3": {"name": "Tab"},
                            "fold2-key4": {"name": "Back"}
                        }, icon: "add"},
            }
        });

        $('.images-ids').on('click', function(e){
            console.log('clicked', this);
        })



    });