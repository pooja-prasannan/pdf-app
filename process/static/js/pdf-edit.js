
    $(function() {

        $.contextMenu({
            selector: '.abc',
            callback: function(key, options) {
                    var a= this.id
                    alert("id"+a);
                var m = "clicked: " + key;
                //window.console && console.log(m) || alert(m);
                if (key== "delete"){
                    alert("clicked delete");
                    $("#"+a).hide();
                }
                       if (key== "edit"){
                    alert("clicked edit");
                }
            },
            items: {

                "delete": {name: "Delete", icon: "delete"},
                "edit": {name: "Edit", icon: "edit"},
                "add": {name: "Add", icon: "add"},
               // "quit": {name: "Quit", icon: function(){
               //  return 'context-menu-icon context-menu-icon-quit';
               // }}

            }
            //alert("asadsadsa"+this.id)
        });

//        $('.context-menu-one').on('click', function(e){
//          alert(event.target);
//          var a= event.target.id;
//                    alert("idsssssssssss"+a);
//
//        })

    });