(function($) {    
  if ($.fn.cssImportant) {
    return;
  }

  // Escape regex chars with \
  var escape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  // For those who need them (< IE 9), add support for CSS functions
  var isStyleFuncSupported = !!CSSStyleDeclaration.prototype.getPropertyValue;
  if (!isStyleFuncSupported) {
    CSSStyleDeclaration.prototype.getPropertyValue = function(a) {
      return this.getAttribute(a);
    };
    Object.defineProperty(
CSSStyleDeclaration.prototype,
'setProperty',
{
enumerable:false,
writable: true,
value:function(styleName, value, priority) {

      this.setAttribute(styleName, value);
      var priority = typeof priority != 'undefined' ? priority : '';
      if (priority != '') {
        // Add priority manually
        var rule = new RegExp(escape(styleName) + '\\s*:\\s*' + escape(value) +
            '(\\s*;)?', 'gmi');
        this.cssText =
            this.cssText.replace(rule, styleName + ': ' + value + ' !' + priority + ';');

      }
    }
}
);

    
    CSSStyleDeclaration.prototype.removeProperty = function(a) {
      return this.removeAttribute(a);
    };
    CSSStyleDeclaration.prototype.getPropertyPriority = function(styleName) {
      var rule = new RegExp(escape(styleName) + '\\s*:\\s*[^\\s]*\\s*!important(\\s*;)?',
          'gmi');
      return rule.test(this.cssText) ? 'important' : '';
    }
  }

  // The style function
  $.fn.cssImportant = function(a) {
    // DOM node
    var node = this.get(0);
    // Ensure we have a DOM node
    if (typeof node == 'undefined') {
      return this;
    }
    // CSSStyleDeclaration
    var style = this.get(0).style;
    // Getter/Setter
    for (i in a) {
      styleName = i;

      value = a[i];
      priority="";
      if (value.match(/!important/i)) {
        priority = "important";
        value=value.split("!")[0];
      }

    if (typeof styleName != 'undefined') {
      if (typeof value != 'undefined') {
        // Set style property
        priority = typeof priority != 'undefined' ? priority : '';

        style.setProperty(styleName, value, priority);
        return this;
      } else {
        // Get style property
        return style.getPropertyValue(styleName);
      }
    } else {
      // Get CSSStyleDeclaration
      return style;
    }
  }
  };
})(jQuery);
(function($) {
    if (typeof TFillJs !== "undefined") {
    return;
  }
  function getNum(d) {
     var myRegexp = /^([0-9\.]+)([a-zA-Z]+)$/i;
      var p = myRegexp.exec(d);
      return Number(p[1]);
  }
     $.fn.tf = function(options) {
  
        return this.each(function(b,lp){
           
        var elem = lp[0];
        var myRegexp = /^([0-9\.]+)([a-zA-Z]+)$/i;
        if (lp[1].match(myRegexp)) {
        
        var p = myRegexp.exec(lp[1]);
        var maxFontPixels = Number(p[1]);
        var uniti = p[2];
var fontSize = maxFontPixels;
        var ourText = elem;

        var moins = 0;
         elem.parent().children().each(function () {

            if (!$(this).is(ourText)) {


   moins+=$(this)[0].clientHeight+getNum($(this).css("margin-top"))+getNum($(this).css("margin-bottom")); 
}
});
        var maxHeight = elem.parent()[0].clientHeight - moins;
       
        
        var maxWidth = elem.parent()[0].clientWidth;
        var textHeight;
      
        var textWidth;
        var deb = ourText.css("visibility");
        ourText.css("visibility","hidden");
        do {

            ourText.cssImportant({'font-size':fontSize+uniti+" !important;"});
            textHeight = ourText[0].clientHeight;
            textWidth = ourText[0].clientWidth;
            fontSize = fontSize - 0.5;
        } while ((textHeight > maxHeight) && fontSize > 0);
        ourText.css("visibility",deb);
         if (typeof lp[0].x === "undefined") {
   
            lp[0].x = "S";
          $(window).resize(function() {
            
            $([[lp[0],lp[1]]]).tf();
        });
      }
      }
     });   
    }

this.TFillJs = function() {
    this.reload();
  }
TFillJs.prototype.reload = function() {
      reload(this);
  }
  function reload(a) {
      begin();
  }
  var p = /^tfill$/;
   function prep(p) {
            arr = [];
           
            $("*").each(function(i, it) {
                $t = $(this);
                arr2 = null;

                $.each(this.attributes, function() {
                    if (this.name.match(p)) {
                        arr2=this.value;

                    }
                });
                if (arr2!=null) {
                    arr.push([$t, arr2]);
                }
            });
            return $(arr);
        }
        //tfill=
  function begin() {
      prep(p).tf();
  }


}(jQuery));
var MyTFillJs = null; 
$(document).ready(function() {MyTFillJs=new TFillJs();$(window).trigger("TFillJsReady");});
