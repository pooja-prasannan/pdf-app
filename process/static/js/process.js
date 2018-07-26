$(document).ready(function() {
  $("#example-basic").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "slideLeft",
    autoFocus: true
   });
    if($(".images img").length >0)
    {
        $(".upload-box").hide();
         $("#example-basic").show();
         $( "#sortable" ).sortable();
          $(".images img").click(function()
            {
                $(this).toggleClass("selected");
            });

    }

//   $(".upload-box button").click(function(e)
//   {
//   e.preventDefault();
//     $(".upload-box").hide();
//     $("#example-basic").show();
//   })
});
