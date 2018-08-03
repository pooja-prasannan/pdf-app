
    $(function() {
        $.contextMenu({
            selector: '.context-menu-one',
            callback: function(key, options) {

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
                   }, 300);

//                   $(".preview").find("img").hide();
                    $('#preview-btn').on('click', function(e){


                        $(".preview").find("img").show();
                   })

//
                  $('#back-button').on('click', function(e){
                    alert("back-click");
                   })

                  $('#crop-save,#next-button').on('click', function(e){
                    alert("save-click");


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
                      var formData = new FormData();

                      formData.append('croppedImage', blob);

                      // Use `jQuery.ajax` method
                      $.ajax('/images/', {
                        method: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success() {
                          console.log('Upload success');
                        },
                        error() {
                          console.log('Upload error');
                        },
                      });
                    });
        })


// Get the Cropper.js instance after initialized
//var cropper = $image.data('cropper');

                }
            },
            items: {
                "delete": {name: "Delete", icon: "delete"},
                "edit": {name: "Edit", icon: "edit"},
                "add": {name: "Add", icon: "add"},
            }
        });

        $('.images-ids').on('click', function(e){
            console.log('clicked', this);
        })

    });