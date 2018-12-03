var cropped_img;
var cropped_base64value;
var cropper;
var slider_img_width;
var slider_img_height;
var base64data=[];
var ids;

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
     `<div class="left-arrow"> </div>
      <div class="right-arrow"> </div>
      <div class="tab-settings-container">
     <div class="img-pre"><button class="orange-btn" id="preview" type="button">Preview</button>
          <div class="img-preview"> </div>
     </div>

    <div class="czoom-buttons">
        <button class="zoom-in orange-btn" id="zoomin" type="button"><i class="fa fa-search-plus" aria-hidden="true"></i></button>
        <button class="reset orange-btn" id="reset" type="button">Reset</button>
        <button class="zoom-out orange-btn" id="zoomout" type="button"><i class="fa fa-search-minus" aria-hidden="true"></i></button>

        <div class="inbxs">
            <span>Left</span><input id="left" type="number" value="0"  maxlength="3"/>
            <span>Top</span><input id ="top" type="number" value="0"   maxlength="3"/>
            <span>Right</span><input id="right" type="number" value="100"    maxlength="3"/>
            <span>Bottom</span><input id="bottom" type="number"  value="100"  maxlength="3"/>
        </div>
    </div>

    <div class="crop-zoom" style="height:760px">
    <div class="red-boarder">
    <div class="scroller">
       <div class="demo" id="header" style="height:auto; transform-origin: 0px 0px">
            <ul id="lightSlider"></ul>
    </div> </div></div></div></div>`)


     setTimeout(function(){
       var ps = new PerfectScrollbar('.scroller');
       ps.update();
     },200);

     var counter = 1;
     var borderVal = 1;
     var borderWidth = 6;
     $("#reset").click(function(){
       // cropper.reset();
        counter = 1;
        borderVal = 2;
        borderWidth = 6;
        $(".demo").css({
            "transform":"scale("+counter+")",
            "transform-origin": "0px 0px"
        });
         if(counter == 1){
            //$(".cropper-line.line-n").css({"height":"1px"})
             //$(".cropper-line.line-s").css({"height":"1px"})
             //$(".cropper-line.line-e").css({"width":"1px"})
             //$(".cropper-line.line-w").css({"width":"1px"})
             //$(".cropper-point").css({"width":"6px", "height":"6px",})
         }
     });


     $("#zoomin").click(function()
     {
         counter = counter+.25;
         borderVal = borderVal - .25
         borderWidth = borderWidth - .75
            $(".demo").css({
                "transform":"scale("+counter+")",
                "transform-origin": "0px 0px"
            });

            $('.demo').draggable();
     });


    $("#zoomout").click(function()
    {
       //cropper.zoom(-0.1);
       counter = counter-.25;
       borderVal = borderVal - .25;
       borderWidth = borderWidth + .5
        $(".demo").css({
            "transform":"scale("+counter+")",
            "transform-origin": "0px 0px"
        });
    $('li.active img').draggable();
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
            $("#header ul").find('img').width(600).height(600*(height/width));``
          }
     }

      if(data["back_cover"].includes(crop_element))
     {
       for( let bc=0;bc<data["back_cover"].length;bc++)
          {
            cropped_img=data["back_cover"][bc];
            let crop_src=$("#"+cropped_img).find('img').attr('src');
            $("#header ul").append(`<li data-thumb=`+crop_src+`><img id =`+cropped_img+` src=`+crop_src+`/></li>`);
            $("#header ul").find('img').width(600).height(600*(height/width));
          }
     }

      for( let sc=0;sc<data["total_stacks"].length;sc++)
      {
         if(data["total_stacks"][sc].includes(crop_element))
            {
                for(let scc =0;scc<data["total_stacks"][sc].length;scc++){
                cropped_img=data["total_stacks"][sc][scc];
                let crop_src=$("#"+cropped_img).find('img').attr('src');
                 $("#header ul").append(`<li data-thumb=`+crop_src+`><img id =`+cropped_img+` src=`+crop_src+`/></li>`);
                 $("#header ul").find('img').width(600).height(600*(height/width));
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
                $("#header ul").append(`<li data-thumb=`+crop_src+`><img id =`+cropped_img+` src=`+crop_src+`/></li>`);
                $("#header ul").find('img').width(600).height(600*(height/width));
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

    $("#preview").click(function() {

        cropperElements = document.getElementsByClassName("cropper-point");
        cropperLines = document.getElementsByClassName("cropper-line");
        redBoarder = document.getElementsByClassName("red-boarder");
        var i;
          for (i = 0; i < cropperElements.length; i++) {
            var x = document.getElementsByClassName('cropper-point')[i]
            if (x.style.opacity == 0) {
                x.style.opacity = 1;
            } else {
                x.style.opacity = 0
            }
          }

          for (i = 0; i < cropperLines.length; i++) {
            var x2 = document.getElementsByClassName('cropper-line')[i]
            if (x.style.opacity == 0) {
                x.style.opacity = 1;
            } else {
                x.style.opacity = 0
            }
          }
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


    $(document).on('click', '.left-arrow', function(e){
        $(".lSPrev").click();
        if(('#header ul li .cropper-container').length>0){
        cropImage();
        }
     });

    $(document).on("click", '.right-arrow', function(e){
        $(".lSNext").click();
        if(('#header ul li .cropper-container').length>0){
        cropImage();
        }
    });

    cropImage();
    }, 100);

    $('#left,#top,#right,#bottom').change(function(){
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
        editDatas();
    });

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
    });

    function cropImage(){
          setTimeout(function(){
          var image = document.querySelector('#header ul li.active img');
          //image.classList.remove("cropper-hidden");
          ids = $('li.active').find('img').attr('id');
          cropper = new Cropper(image, {
          aspectRatio:"ignore",
          viewMode: 3,
          autoCropArea: 1,
          zoom: false,
          dragMode: 'move',
          cropBoxMovable: true,
          cropBoxResizable: true,
          cropend: function () {
          console.log("cropend",cropper);
            var crop_selection = cropper.getCropBoxData();
            console.log("crop_selection right",crop_selection);
            var new_left = (crop_selection.left*100)/slider_img_width;
            var new_top = (crop_selection.top*100)/slider_img_height;
            var new_right = (crop_selection.width*100)/slider_img_width;
            var new_bottom = (crop_selection.height*100)/slider_img_height;
            $("#left").val(new_left);
            $("#top").val(new_top);
            $("#right").val(new_right);
            $("#bottom").val(new_bottom);
            editDatas();
          },
           built: function () {
            cropper.setCropBoxData({
              left:0,
              top:0,
              width: slider_img_width,
              height: slider_img_height
              });
            }
           });
           },200);
    }

    function editDatas(){
      cropper.getCroppedCanvas();
      cropper.getCroppedCanvas({
      width: width,
      height: height,
      minWidth: width,
      minHeight: height,
      maxWidth: width,
      maxHeight: height,
      fillColor: '#fff',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high',
      });

      cropper.getCroppedCanvas().toBlob((blob) => {
      console.log("blob",cropper,cropper.getCroppedCanvas());
         var reader = new FileReader();
         reader.readAsDataURL(blob);
         reader.onload = function() {
              base64data = reader.result;
         }
         // console.log("base64data",base64data)
         var formData ={'image_ids': ids, "upload_id":upload_id, 'croppedImage':base64data, 'action': 'edit_image'}

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
      });

  }
});
});