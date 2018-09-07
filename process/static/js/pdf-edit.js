var cropped_img;
var cropped_base64value;
$(document).ready(function() {

         $(document).on("click", '#crop-btn', function(e){
         $("#slide-crop").show();
         $("#lbl-step-title ").text("Crop Image");
          $("#next-button").text("Back");
         $("#next-button").attr("id","crop_back");
         $("#sortable").hide();
         $("#slide-crop").html(
           `<div class="demo" id="header">
                <ul id="lightSlider">
                   </ul>
             </div>`)


             var crop_element =  $(this).parent().parent().attr('id');
             alert("crop"+crop_element)
             var data = window.localStorage.getItem('data');
             data = JSON.parse(data)
             if(data["front_cover"].includes(crop_element))
             {


              for( let fc=0;fc<data["front_cover"].length;fc++)
                  {
                    cropped_img=data["front_cover"][fc];
                    let crop_src=$("#"+cropped_img).find('img').attr('src');
                    $("#header ul").append(`<li data-thumb=`+crop_src+`><img src=`+crop_src+`/></li>`);
                  }
             }
             else if(data["back_cover"].includes(crop_element))
             {

               for( let bc=0;bc<data["back_cover"].length;bc++)
                  {
                    cropped_img=data["back_cover"][bc];
                    let crop_src=$("#"+cropped_img).find('img').attr('src');
                    $("#header ul").append(`<li data-thumb=`+crop_src+`><img src=`+crop_src+`/></li>`);
                  }
             }
             else if(data["total_stacks"].includes(crop_element))
             {

              for( let sc=0;scc<data["total_stacks"].length;sc++)
                  {
                    cropped_img=data["total_stacks"][sc]
                    let crop_src=$("#"+cropped_img).find('img').attr('src');
                    $("#header ul").append(`<li data-thumb=`+crop_src+`><img src=`+crop_src+`/></li>`);
                  }
             }

             else if(data["total_tabs"].includes(crop_element))
             {

              for( let tc=0;tc<data["total_tabs"].length;tc++)
                  {
                    cropped_img=data["total_tabs"][tc]
                    let crop_src=$("#"+cropped_img).find('img').attr('src');
                    $("#header ul").append(`<li data-thumb=`+crop_src+`><img src=`+crop_src+`/></li>`);
                  }
             }

        $("#lightSlider").lightSlider({
            gallery: true,
            item: 1,
            loop: true,
            slideMargin: 0,
            thumbItem: 9
            });

            $('#lightSlider').imgAreaSelect({ x1: 120, y1: 90, x2: 280, y2: 210 });

});



 $(document).on("click", '#crop_back', function(e){

          $("#lbl-step-title ").text("Refine Components");
          $("#next-button").show();
          $("#lbl-step-title").append(`&nbsp <button name="define_book" class="orange-btn" id="define_book">Define Book Attribute</button>`);
          $("#lbl-step-title").append(`&nbsp <button name="save_btn" class="orange-btn" id="save_btn">Save</button>`);
          $("#sortable").show();
          $("#slide-crop").hide();


        });

});