var base64data=[];
var temp_total_tabs =[];
var temp_total_stacks =[];
var max;
var max1;
var keys;
    $(function() {
        $.contextMenu({
            selector: '.context-menu-one',
             determinePosition: function($menu){
        // Position using jQuery.ui.position
        // http://api.jqueryui.com/position/
        $menu.css('display', 'block')
            .position({ my: "center top", at: "center bottom", of: this, offset: "0 5"})
            .css('display', 'none');
    },
            callback: function(key, options) {
                if (key== "delete"){
                     var ids= $('.context-menu-active').attr('id')
                     $("#"+ids).hide();
                }

            },
            items: {
                "delete": {name: "Delete"},
            }
        });

        $('.images-ids').on('click', function(e){
            console.log('clicked', this);
        })
    });
