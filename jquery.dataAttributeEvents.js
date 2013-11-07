/**
 * Created by aCodeSmith.com
 * Trigger click events through data attribute binding
 * Requirements: jQuery 1.7 or above
 * Boilerplate from: https://github.com/jquery-boilerplate/jquery-boilerplate/blob/master/src/jquery.boilerplate.js
 */
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "dataTriggers",
        defaults = {
            dataAttribute:'event'
        };

    // The actual plugin constructor
    function DataTriggers ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init(options);
    }

        DataTriggers.prototype = {
        size: function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        },
        init: function (options) {
            $('body').on('click','[data-'+options.dataAttribute+']',function(e){
                var $el = $(this);

                if(typeof $el.data(options.dataAttribute) != 'undefined'){
                    e.preventDefault();
                }

                if(typeof options.triggers != 'undefined'
                    && typeof options.triggers[$el.data(options.dataAttribute)]=='function'){
                    options.triggers[$el.data(options.dataAttribute)]($el);
                }else{
                    console.log('No Trigger for data-'+$el.data(options.dataAttribute));
                }
            });

            if(typeof console == 'object' && typeof options.triggers != 'undefined' && this.size(options.triggers) < 1){
                console.log('DataTriggers: No Events! Please add events!');
            }
        }
    };

    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new DataTriggers( this, options ) );
            }
        });
    };

})( jQuery, window, document );