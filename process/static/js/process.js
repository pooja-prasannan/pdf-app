$(document).ready(function() {
 var images = {};
 if(data.length>0){
    $.each(data, function (i, img) {
        images[i+1] = img;
    });
 }
 var data_img = {"images" : images}
  console.log("images" , JSON.stringify(data_img));
  var selected = new Array();
  data = JSON.stringify(data_img)
  window.localStorage.setItem('data', data_img);
  $("#steps").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "slideLeft",
    autoFocus: true,
    onStepChanged: function (event, currentIndex, priorIndex)
    {
        var titleTxt = $(".title.current").text();
        $("#lbl-step-1").text(titleTxt);
    },
  });
    if($(".images img").length >0)
    {
        $(".upload-box").hide();
//        $("#lbl-step-1").hide();
         $("#steps").show();
         $( ".sortable" ).sortable({
            revert: true,
            update: function( event, ui ) {
                var image_ids = $(".sortable").sortable("toArray");
                var data = window.localStorage.getItem('data');
//                data = JSON.parse(data);
                data["order"] = image_ids
//                data = JSON.stringify(data)
                window.localStorage.setItem('data', data);
            }
         });
          $(".images img").click(function()
            {
                $(this).toggleClass("selected");
            });
            setTimeout(function()
            {
                var titleTxt = $(".title.current").text();
                $("#lbl-step-1").text(titleTxt);
            },500)


    }
});
