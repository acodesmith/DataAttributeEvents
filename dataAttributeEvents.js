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
            attribute: 'data-event',
            triggers: {}
        };

    // The actual plugin constructor
    function DataTriggers ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

        DataTriggers.prototype = {
        size: function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        },
        init: function () {
            $('body').on('click','['+this.settings.attribute+']',function(e){
                var $el = $(this);

                if(typeof $el.data('event') != 'undefined' && $el.data('event').length > 0){
                    e.preventDefault();
                }

                if(typeof this.settings.triggers[$el.data('event')]=='function'){
                    this.settings.triggers[$el.data('event')]($el);
                }
            });

            if(typeof console == 'object' || this.size(this.settings.triggers) < 1){
                console.log('DataTriggers: No Events! Please add events!');
            }
        }
    };

    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };

})( jQuery, window, document );