var cropped_img;
var cropped_base64value;
var cropper;
var slider_img_width;
var slider_img_height;

$(document).ready(function() {
         $(document).on("click", '#crop-btn', function(e){
         $("#slide-crop").show();
         $("#lbl-step-title ").text("Crop Image");
          $("#next-button").text("Back");
         $("#next-button").attr("id","crop_back");
         $("#build-book").text("Back");
         $("#build-book").attr("id","crop_back");
         $("#sortable").hide();
         $("#slide-crop").html(
         `<div class="left-arrow">
           </div>
           <div class="right-arrow">
           </div>

           <div class="tab-settings-container">

         <div class="img-pre"><button class="orange-btn" id="preview" type="button">Preview</button>
              <div class="img-preview"> </div>
        </div>

                <div class="zoom-buttons">
                <button class="zoom-in" id="zoomin" type="button"><i class="fa fa-search-plus" aria-hidden="true"></i></button>
                <button class="reset" id="reset" type="button">Reset</button>
                <button class="zoom-out" id="zoomout" type="button"><i class="fa fa-search-minus" aria-hidden="true"></i></button>

                    <div class="inbxs">
                        <span>Left</span><input id="left" type="number" value="0"  maxlength="3"/>
                        <span>Top</span><input id ="top" type="number" value="0"   maxlength="3"/>
                        <span>Right</span><input id="right" type="number" value="100"    maxlength="3"/>
                        <span>Bottom</span><input id="bottom" type="number"  value="100"  maxlength="3"/>
                    </div>
                </div>

           <div class="demo" id="header" style="height:auto;margin-left:30%">

                <ul id="lightSlider">
                   </ul>
             </div>  </div>`)





             $("#reset").click(function()
             {
                cropper.reset();
             });


            $("#zoomin").click(function()
             {
                cropper.zoom(0.1);
             });


            $("#zoomout").click(function()
            {
               cropper.zoom(-0.1);
            });


             var crop_element =  $(this).parent().parent().attr('id');
             var data = window.localStorage.getItem('data');
             data = JSON.parse(data)
             if(data["front_cover"].includes(crop_element))
             {
              for( let fc=0;fc<data["front_cover"].length;fc++)
                  {
                    cropped_img=data["front_cover"][fc];
                    let crop_src=$("#"+cropped_img).find('img').attr('src');
                    $("#header ul").append(`<li data-thumb=`+crop_src+`><img id =`+cropped_img+`  src=`+crop_src+`/></li>`);
                  }
             }
              if(data["back_cover"].includes(crop_element))
             {

               for( let bc=0;bc<data["back_cover"].length;bc++)
                  {
                    cropped_img=data["back_cover"][bc];
                    let crop_src=$("#"+cropped_img).find('img').attr('src');
                    $("#header ul").append(`<li data-thumb=`+crop_src+`><img src=`+crop_src+`/></li>`);
                  }
             }

              for( let sc=0;sc<data["total_stacks"].length;sc++)
              {
                 if(data["total_stacks"][sc].includes(crop_element))
                    {
                        for(let scc =0;scc<data["total_stacks"][sc].length;scc++){
                        cropped_img=data["total_stacks"][sc][scc];
                        let crop_src=$("#"+cropped_img).find('img').attr('src');
                        $("#header ul").append(`<li data-thumb=`+crop_src+`><img src=`+crop_src+`/></li>`);
                         }
                     }
             }

             for( let tc=0;tc<data["total_tabs"].length;tc++)
             {
                if(data["total_tabs"][tc].includes(crop_element))
             {
                 for(let tcc =0;tcc<data["total_tabs"][tc].length;tcc++)
                 {
                    cropped_img=data["total_tabs"][tc][tcc];
                    let crop_src=$("#"+cropped_img).find('img').attr('src');
                    $("#header ul").append(`<li data-thumb=`+crop_src+`><img src=`+crop_src+`/></li>`);
                 }
             }
             }

        $("#lightSlider").lightSlider({
            gallery: true,
            item: 1,
            loop: true,
            slideMargin: 0,
            thumbItem: 9
            });

           $("#preview").click(function()
                {
                 $('.img-preview').toggle();
                });

           setTimeout(function(){
           var aa = $(".active").find('img').attr('src');
             $('.img-preview').append('<div><img src='+aa+' /><div>')
             .css({
              position:'absolute',
            top:'25px',
            width:'300px',
            height:'300px',
            overflow:'hidden',
            left:'0px',
            display:'block',
              });
              $('.img-preview').hide();

               slider_img_width= $(".lslide.active img").width();
               slider_img_height=$(".lslide.active img").height();
              alert("width"+slider_img_width+"height"+slider_img_height)


            function preview(img, selection) {
               scaleX = 300 / (selection.width || 1);
                scaleY = 300 / (selection.height || 1);
                $('.img-preview div img').css({
                    width: Math.round(scaleX *slider_img_width) + 'px',
                    height: Math.round(scaleY * slider_img_height) + 'px',
                    marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px',
                    marginTop: '-' + Math.round(scaleY * selection.y1) + 'px'
                });
            }
         $(document).on("click", '.left-arrow', function(e){
         alert("crop-left");
//            $(".left-arrow").click(function()
//             {
                $(".lSPrev").click();
                setTimeout(function(){



              var image = $('#header ul li.lslide.active img')[0];

//            var image = document.getElementById('img');
//            var srcList = [];
//            for(var i = 1; i < image.length; i++) {
//            srcList.push(image[i].src);
//            }
//            console.log(srcList,"srcLISTTTTTTTTTTTTTTTTTTTTTT")

            cropper = new Cropper(image, {
                      aspectRatio:0.69,
//                      preview: '.preview',
                      viewMode: 0,
//                      getCroppedCanvas:{fillcolor: "#FFFFFF"},
                      cropBoxMovable: true,
                      cropBoxResizable: true,

                    cropend: function () {

                      var crop_selection = cropper.getCropBoxData();
                     console.log("crop_selection",cropper);
                      var new_left = (crop_selection.left*100)/slider_img_width;
                      var new_top = (crop_selection.top*100)/slider_img_height;
                      var new_right = (crop_selection.width*100)/slider_img_width;
                      var new_bottom = (crop_selection.height*100)/slider_img_height;
//                      console.log("new",new_left,new_right,new_top, new_bottom)
                      $("#left").val(new_left);
                      $("#top").val(new_top);
                      $("#right").val(new_right);
                      $("#bottom").val(new_bottom);
                    },
//                    ready(){
//                    $(".cropper-crop-box").width(745).height(1068);
//                    },

                 built: function () {
                      image.cropper('setCropBoxData', { left: 0, top: 0, width: slider_img_width, height: slider_img_height });
                    }
                    });
                 //  }

             },20);

             });
 $(document).on("click", '.right-arrow', function(e){
//             $(".right-arrow").click(function()
//             {
                $(".lSNext").click();
                setTimeout(function(){

              var image = $('#header ul li.lslide.active img')[0];

//            var image = document.getElementById('img');
//            var srcList = [];
//            for(var i = 1; i < image.length; i++) {
//            srcList.push(image[i].src);
//            }
//            console.log(srcList,"srcLISTTTTTTTTTTTTTTTTTTTTTT")

            cropper = new Cropper(image, {
                      aspectRatio:0.69,
//                      preview: '.preview',
                      viewMode: 0,
//                      getCroppedCanvas:{fillcolor: "#FFFFFF"},
                      cropBoxMovable: true,
                      cropBoxResizable: true,

                    cropend: function () {
                    alert("crop right")

                      var crop_selection = cropper.getCropBoxData();
                     console.log("crop_selection",cropper);
                      var new_left = (crop_selection.left*100)/slider_img_width;
                      var new_top = (crop_selection.top*100)/slider_img_height;
                      var new_right = (crop_selection.width*100)/slider_img_width;
                      var new_bottom = (crop_selection.height*100)/slider_img_height;
//                      console.log("new",new_left,new_right,new_top, new_bottom)
                      $("#left").val(new_left);
                      $("#top").val(new_top);
                      $("#right").val(new_right);
                      $("#bottom").val(new_bottom);
                    },
//                    ready(){
//                    $(".cropper-crop-box").width(745).height(1068);
//                    },

                 built: function () {
                      image.cropper('setCropBoxData', { left: 0, top: 0, width: slider_img_width, height: slider_img_height });
                    }

                    });
                 //  }

             },20);
             });


             var image = $('#header ul li.lslide.active img')[0];
             alert("out")

//            var image = document.getElementById('img');
//            var srcList = [];
//            for(var i = 1; i < image.length; i++) {
//            srcList.push(image[i].src);
//            }
//            console.log(srcList,"srcLISTTTTTTTTTTTTTTTTTTTTTT")

            cropper = new Cropper(image, {
                      aspectRatio:0.69,
//                      preview: '.preview',
                      viewMode: 0,
//                      getCroppedCanvas:{fillcolor: "#FFFFFF"},
                      cropBoxMovable: true,
                      cropBoxResizable: true,

                    cropend: function () {

                      var crop_selection = cropper.getCropBoxData();
                     console.log("crop_selection",cropper);
                      var new_left = (crop_selection.left*100)/slider_img_width;
                      var new_top = (crop_selection.top*100)/slider_img_height;
                      var new_right = (crop_selection.width*100)/slider_img_width;
                      var new_bottom = (crop_selection.height*100)/slider_img_height;
//                      console.log("new",new_left,new_right,new_top, new_bottom)
                      $("#left").val(new_left);
                      $("#top").val(new_top);
                      $("#right").val(new_right);
                      $("#bottom").val(new_bottom);
                    },
//                    ready(){
//                    $(".cropper-crop-box").width(745).height(1068);
//                    },

                 built: function () {
                      image.cropper('setCropBoxData', { left: 0, top: 0, width: slider_img_width, height: slider_img_height });
                    }

                    });



//            cc= $('#header ul li.lslide.active img').imgAreaSelect({
//            handles: true,
//            instance: true,
//            x1: 0,
//            y1: 0,
//            x2:slider_img_width,
//            y2: slider_img_height,
//            show:true,
//            onSelectChange: preview,
//            onSelectEnd: function (img, selection) {
//
//            var new_left = (selection.x1*100)/slider_img_width;
//            var new_top = (selection.y1*100)/slider_img_height;
//            var new_right = (selection.x2*100)/slider_img_width;
//            var new_bottom = (selection.y2*100)/slider_img_height;
//            $("#left").val(new_left);
//            $("#top").val(new_top);
//            $("#right").val(new_right);
//            $("#bottom").val(new_bottom);
//             console.log("boxxxxx",new_left,new_top,new_right,new_bottom);
//
//           var image_src= $(".active").find('img').attr('src');
//            image = document.createElement('img');
//            document.body.appendChild(image);
//
//            image.setAttribute('style','display:none');
//            image.setAttribute('alt','script div');
//            image.setAttribute("src", image_src);
//            image.height=$(".lslide.active img").height();
//            image.width=$(".lslide.active img").width();
//            console.log("image",image);
//
//            var canvas = document.createElement("canvas");
//             canvas.width = $(".lslide.active img").width();
//             canvas.height = $(".lslide.active img").height();
//            var ctx = canvas.getContext("2d");
//            ctx.drawImage(image, 0, 0);
//            var dataURLnew = canvas.toDataURL("image/png");
//            console.log("dataURLnew",dataURLnew)
//            var imageData = ctx.getImageData(selection.x1, selection.y1, selection.x2, selection.y2);
//             console.log("imagedata",imageData);
//
//            var canvas1 = document.createElement("canvas");
//            canvas1.width =  selection.width;
//            canvas1.height =  selection.height;
//            var ctx1 = canvas1.getContext("2d");
//            ctx1.rect(selection.x1, selection.y1, selection.x2, selection.y2);
//            ctx1.fillStyle = 'yellow';
//            ctx1.fill();
//            ctx1.putImageData(imageData, 0, 0);
//            console.log(canvas1.toDataURL("image/png"));
//
//
//          var formData ={'image_ids': crop_element, 'croppedImage':canvas.toDataURL("image/png"), 'action': 'edit_image',"upload_id":upload_id}
//
//          // Use `jQuery.ajax` method
//          $.ajax('/images/', {
//            method: "POST",
//            data: JSON.stringify(formData),
//
//            processData: false,
//            contentType: false,
//            success(data) {
//              console.log('Upload success', data);
////                          var crop_dict ={};
////                          var cropped_images =[];
////                          crop_dict[ids] = data['img_url'];
////
////                          cropped_images.push(crop_dict)
////                          window.localStorage.setItem('cropped-image',JSON.stringify(cropped_images))
//
//            },
//            error() {
//              console.log('Upload error');
//            },
//          });
//            }
//            });
//}
     }, 2000);



    $('#left,#top,#right,#bottom').change(function(){
//             slider_img_width= $(".lslide.active img").width();
//            slider_img_height=$(".lslide.active img").height();

              var left = $("#left").val();
              var top = $("#top").val();
              var right = $("#right").val();
              var bottom = $("#bottom").val();

              var sel_x1 =(slider_img_width*left)/100;
              var sel_x2 =(slider_img_width*right)/100;
              var sel_y1 =(slider_img_height*top)/100;
              var sel_y2 =(slider_img_height*bottom)/100;

               cropper.setCropBoxData({
                left:sel_x1,
                top:sel_y1,
                width: sel_x2,
                height: sel_y2
                });
                console.log("getCropBoxDatalast",cropper.getCropBoxData());



//    cc.setSelection(sel_x1, sel_y1, sel_x2, sel_y2, true);
//    cc.update();

})
 $(document).on("click", '#crop_back', function(e){
          $("#lbl-step-title ").text("Refine Components");
          $("#next-button").show();
          $("#lbl-step-title").append(`&nbsp <button name="define_book" class="orange-btn" id="define_book">Define Book Attribute</button>`);
          $("#lbl-step-title").append(`&nbsp <button name="save_btn" class="orange-btn" id="save_btn">Save</button>`);
          $("#sortable").show();
          $("#slide-crop").hide();
          $("#crop_back").html("Build Book");
          $("#crop_back").attr("id","build-book");
          $(".imgareaselect-outer").click();
          //cc.cancelSelection();
        });
});
});