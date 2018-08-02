
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
                    var ids= $('.context-menu-active').attr('id')
                    $(".images-ids").hide();
                    $("#"+ids).show();

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