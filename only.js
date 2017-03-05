// Create an immediately invoked functional expression to wrap our code


(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

(function($) {    
  if ($.fn.style) {
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
    console.log(a);
    console.log(this);
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
//MULTI ONLY SIZE -> LESS IN FIRST
(function() {


    // body...
  

//   Array.prototype.subarray_only=function(start,end){
//      if(!end){ end=-1;} 
//      if (end<0) {
//     return this.slice(start, this.length+1-(end*-1));
//   }else{
//     return this.slice(start, end);
//   }
// }

Object.defineProperty(
Array.prototype,
'subarray_only',
{
enumerable:false,
writable: true,
value:function(start,end){
     if(!end){ end=-1;} 
     if (end<0) {
    return this.slice(start, this.length+1-(end*-1));
  }else{
    return this.slice(start, end);
  }
}
}
);
 function to_String_only(u) {
            return "'" + u + "'";
        }
// Array.prototype.clone_only = function() {
//   return this.slice(0);
// };
// Object.prototype.clone_only = function() {
//   return jQuery.extend(true, {}, this);
// };
// Object.prototype.join_only = function (sep) {
// var out = []; 
//   for (i in this) {
//     if (this.hasOwnProperty(i) && typeof this[i] != "function") {
//       //console.log(this[i]+ (typeof this[i]));
//       if (typeof this[i] == "string") {
//               out.push(to_String_only(i)+":"+to_String_only(this[i]));

//       }else{
//       out.push(to_String_only(i)+":"+this[i]);
//     }
//     }
//   }
//   return out.join(sep);
// }
Object.defineProperty(
Array.prototype,
'clone_only',
{
enumerable:false,
writable: true,
value:function() {
  return this.slice(0);
}
}
);
Object.defineProperty(
Object.prototype,
'clone_only',
{
enumerable:false,
value:function() {
  return jQuery.extend(true, {}, this);
}
}
);
Object.defineProperty(
Object.prototype,
'join_only',
{
enumerable:false,
value:function (sep) {
var out = []; 
  for (i in this) {
    if (this.hasOwnProperty(i) && typeof this[i] != "function") {
      //console.log(this[i]+ (typeof this[i]));
      if (typeof this[i] == "string") {
              out.push(to_String_only(i)+":"+to_String_only(this[i]));

      }else{
      out.push(to_String_only(i)+":"+this[i]);
    }
    }
  }
  return out.join(sep);
}
}
);

var tab_n = [];
        var tab_n_obj = [];
        var lg_size = 1200;
        var md_size = 992;
        var sm_size = 768;
        var tab_is = {
            mob: function() {
                return jQuery.browser.mobile;
            },
            lg: function() {
                return in_ge(w_width, lg_size);
            },
            md: function() {
                return in_lt_ge(w_width, lg_size, md_size);
            },
            sm: function() {
                return in_lt_ge(w_width, md_size, sm_size);
            },
            xs: function() {
                return in_lt(w_width, sm_size);
            }
        }

        var tab_second_aut = ["lg", "md", "sm", "xs", "mob"];
        var tab_second_aut_custom = ["lg", "md", "sm"];
        var tab_third_aut_aut = ["css", "class","js"];
        var tab_first = ["only", "nonly"];


        var regex_second_pre = function() {  return tab_second_aut.join("|");};
        var regex_first_pre = tab_first.join("|");
        var regex_third_pre = tab_third_aut_aut.join("|");

        var regex_first = "(" + regex_first_pre + ")";
        var regex_second = function() {  return  "(" + regex_second_pre() + ")|(((" + regex_second_pre() + ")_)+(" + regex_second_pre() + "))";};
      
        var regex_third = "(" + regex_third_pre + ")";

        var regex = function() { return "^" + regex_first + "-" + regex_second() + "-" + regex_third + "$";}
        var regex2 = "^only-custom(-[^-]+)?$";
        var regex3 = function() { return "^only-" + "(" + tab_second_aut_custom.join("|") + ")" + "$";}
        var m = function() { return new RegExp(regex(), "i");}
        var m2 = function() { return new RegExp(regex2, "i");}
        var m3 =  function() { return new RegExp(regex3(), "i");}

        var prefixe_tl = "tab_loop";

        var prefixe_tlt_v = prefixe_tl + "_third";
        var prefixe_tlf_v = prefixe_tl + "_first";
        var tab_third_aut = {
            lg: tab_third_aut_aut,
            md: tab_third_aut_aut,
            sm: tab_third_aut_aut,
            xs: tab_third_aut_aut,
            mob: tab_third_aut_aut
        };
        var tab_second = function(){ return {
            only: tab_second_aut,
            nonly: tab_second_aut
          };
        };
        var tab_third = function(){ return {
            only: tab_third_aut,
            nonly: tab_third_aut
          };
        };



        function prefixe_tlt(t) {
            return prefixe_tlt_v + "_" + t.join("_");
        }

        function prefixe_tlf(t) {
            return prefixe_tlf_v + "_" + t.join("_");
        }

        var tab_name = {
            only: prefixe_tlf(["only"]),
            nonly: prefixe_tlf(["nonly"]),
            css: prefixe_tlt(["css"]),
            class: prefixe_tlt(["class"]),
            js: prefixe_tlt(["js"])
        }
        
        var w_width =  function(){ return $(window).width()};
  // Define our constructor
  this.OnlyJs = function() {
    this.reload();

  }
  // Public Methods
OnlyJs.prototype.is = function(name){
  return to_is(name);
};
OnlyJs.prototype.iam = function(){
  f = [];
  for (var i = 0; i < tab_second_aut.length; i++) {
    if(to_is(tab_second_aut[i])) f.push(tab_second_aut[i]);
  }
  return f;
};
  OnlyJs.prototype.reload = function() {
      reload(this);
  }

  // Private Methods
function reload() {

           tab_n = [];
         tab_n_obj = [];
         lg_size = 1200;
         md_size = 992;
         sm_size = 768;
             tab_second_aut = ["lg", "md", "sm", "xs", "mob"];
         tab_second_aut_custom = ["lg", "md", "sm"];
         tab_third_aut_aut = ["css", "class","js"];
         tab_first = ["only", "nonly"];
         tab_is = {
            mob: function() {
                return jQuery.browser.mobile;
            },
            lg: function() {
                return in_ge(w_width(), lg_size);
            },
            md: function() {
                return in_lt_ge(w_width(), lg_size, md_size);
            },
            sm: function() {
                return in_lt_ge(w_width(), md_size, sm_size);
            },
            xs: function() {
                return in_lt(w_width(), sm_size);
            }
        }
        begin();
        }

        function inArray(a,b){
          return $.inArray(a,b) != -1;
        }
function prep_custom(p) {
  jQuery("*").each(function(i, it) {
                $t = $(this);
                arr2 = [];
                arr3 = [];
                jQuery.each(this.attributes, function() {
                    if (this.name.match(p())) {
d2 = this.name.split("-");
                      if (d2[1]=="custom") {
                        if (d2.length==2) {
                          custom_arr(this.value);
                        }else if (d2.length==3) {
                          custom(d2[2],this.value);
                        } 
                      }
                    }
                  })
              });
          m = function() { return new RegExp(regex(), "i");}
         m3 =  function() { return new RegExp(regex3(), "i");}
}
function prep_custom_second(p) {
  jQuery("*").each(function(i, it) {
                $t = $(this);
                arr2 = [];
                arr3 = [];
                jQuery.each(this.attributes, function() {
                    if (this.name.match(p())) {
                      d2 = this.name.split("-");
                        if (d2.length==2) {
                      if (inArray(d2[1],tab_second_aut_custom)) {
                        custom_second(ds[1],this.value);
                      }
                      }
                    }
                  })
              });
  m = function() { return new RegExp(regex(), "i");}
         m3 =  function() { return new RegExp(regex3(), "i");}
}
 function prep(p,p2,p3) {
            arr = [];
            prep_custom(p2);
            prep_custom_second(p3);
           // console.log(p());
            jQuery("*").each(function(i, it) {
                $t = $(this);
                arr2 = [];
                arr3 = [];

                jQuery.each(this.attributes, function() {
                    if (this.name.match(p())) {
sd = this.name.split("-");

                        sd2 = sd[1].split("_");
                        

                        if (false) {
                         
                            for (var j = 0; j < sd2.length; j++) {
                                dm = sd[0] + "-" + sd2[j] + "-" + sd[2];
                                if (!(inArray(dm, arr3))) {


                                    arr2.push({
                                        name: dm,
                                        value: this.value
                                    });

                                    arr3.push(dm);
                                }
                            }

                        } else {
                            arr2.push({
                                name: this.name,
                                value: this.value
                            });
                        }
                    }
                });
                if (arr2.length > 0) {
                    arr.push([$t, arr2]);
                }
            });
            return $(arr);
        }

        

        function in_ge(ino, g) {
            return ino >= g;
        }

        function in_lt(ino, l) {
            return ino < l;
        }

        function and(a, b) {
            return a && b;
        }

        function in_lt_ge(ino, l, g) {
            return and(in_lt(ino, l), in_ge(ino, g));
        }

       

       

        function func(name) {
            return eval(name + "()");
        }

        function func_p(name, p) {
            return eval(name + "(" + p.join(',') + ")");
        }

        function clone(d) {
            return $.extend(true, {}, d);
        }

        function only_keys(l) {
            f = {};
            for (i in l) {
                f[i] = "";
            }
            return f;
        }

        function to_is(x) {
          sd=x.split("_");
          for (var i = 0; i < sd.length; i++) {
            if (tab_is[sd[i]]()==true) {
              return true;
            }
          }
            return false;
        }


        //TAB LOOP
        function tab_loop_third_css(d, obj, k) {
           obj = $(tab_n_obj[obj]);
            if (k) {
                obj.cssImportant(d);
            } else {
                obj.cssImportant(only_keys(d));
            }
        }

        function tab_loop_third_class(d, obj, k) {
            obj = $(tab_n_obj[obj]);
            for (var i = 0; i < d.length; i++) {
                if (k) {
                    if (!obj.hasClass(d[i])) {
                        obj.addClass(d[i]);
                    }
                } else {
                    obj.removeClass(d[i]);
                }
            }
        }
            function tab_loop_third_js(d, obj, k) {
            obj = $(tab_n_obj[obj]);
            for (var i = 0; i < d.length; i++) {
                if (k) {
                    eval(d[i]);
                }
            }
        }

        function tab_loop_third(j, u, x, k) {
            for (y in tab_n[j][u][x]) { // PARCOURS THIRD
                if (!(test_third(u,x,y))) { // CHECK THIRD
                    d = tab_n[j][u][x][y];
                    d2 = d.clone_only();
                    for (var i = 0; i < d.length; i++) {
                      d2[i] = "'"+String(d[i]).trim()+"'";
                    }
                    prefi = tab_name[y]; // FUNCTION NAME TO SEND
                    if (third_type[y]=="array") {
                    vars = ["[" + d2.join_only(",") + "]", j, k];
                    }else{
                    vars = ["{" + d2.join_only(",") + "}", j, k];
                    }
                    func_p(prefi, vars);
                }
            }
        }

        function tab_loop_first_only(j, u, x, dd) {
            k = dd;
            tab_loop_third(j, u, x, k);

        }

        function tab_loop_first_nonly(j, u, x, dd) {
            k = !dd;
            tab_loop_third(j, u, x, k);
        }
        //MAIN
        function re() {
    
            for (var j = 0; j < tab_n.length; j++) { // PARCOURS ARRAYS (elems)
                for (u in tab_n[j]) { // PARCOURS FIRST 
                    if (inArray(u, tab_first)) { // CHECK  FIRST
                        for (x in tab_n[j][u]) { // PARCOURS SECONDS
                            if (!(test_second(u,x))) { // CHECK SECOND
                                dd = to_is(x); // FUNCTION TO CALL IS
                                prefi = tab_name[u]; // FUNCTION NAME TO SEND
                                vars = [j, to_String_only(u), to_String_only(x), dd]; // PARAMS
                                func_p(prefi, vars); // CALL
                            }
                        }
                    }
                }
            }
        }
        $(window).resize(function() {
            re();
        });
        var inter_tab = {
            css: ";",
            class: " ",
            cssi: ";",
            js: ";"
        }
        var third_type = {
            css: "obj",
            cssi: "obj",
            class: "array",
            js: "array"
        };
        function custom(third,val) {
          ino="";
          min = false;
          min_val = 0;
          max = false;
          max_val = 0;
          f="";
          df = val.split(",");
          for (var i = 0; i < df.length; i++) {
            du = df[i].split(":");
            if (du[0]=="min") {
              min = true;
              min_val = du[1];
            }else if (du[0]=="max") {
              max = true;
              max_val=du[1];
            }
          }

          if (min && !max) {
              f= "function(){ return in_ge(w_width(),"+min_val+");}";
          }else if (min && max) {
              f= "function(){ return in_lt_ge(w_width(),"+max_val+","+min_val+");}";

          }else if (max && !min) {
              f= "function(){ return in_lt(w_width(),"+max_val+");}";
          }
          eval("var func = "+f);
          tab_is[third] = func;
          tab_second_aut_custom.push(third);
          tab_second_aut.push(third);
          tab_third_aut[third] = tab_third_aut_aut;

        }
        function custom_arr(arr) { // name:,min:,max:;
          a = arr.split(";");
          for (var i = 0; i < a.length; i++) {
              b = a[i].split(",");
              v=false;
              for (var j = 0; j < b.length; j++) {
                c = b[j].split(":");

                if (c[0]=="name") {
                  n = b
                  custom(c[1],b.subarray_only(1).join(","));
                  v=true;
                  break;
                }
              }
              //if (v) {break;}
          }
        }
        function custom_second(n,v) {
            eval(n+"="+v+";");
        }
        function test_second(first,second) {
          second_multi = second.split("_");
               if (second_multi.length > 1) {
                        for (var pam = 0; pam < second_multi.length; pam++) {
                          
                          if (!(inArray(second_multi[pam], tab_second()[first]))) { // CHECK SECOND
                               return true;
                            }
                        }
                      
                   }else{
                    if (!(inArray(second, tab_second()[first]))) { // CHECK SECOND
                        return true;
                    }
                  }
                  return false;
        }
        function test_third(first,second,third) {
                    second_multi = second.split("_");

           if (second_multi.length > 1) {
                        for (var pam = 0; pam < second_multi.length; pam++) {
                          
                          if (!(inArray(second_multi[pam], tab_second()[first]))) { // CHECK SECOND
                                return true;
                            }
                        }
                      
                   }else{
                    for (var kpt = 0; kpt < second_multi.length; kpt++) {
                      
                      if (!(inArray(third, tab_third()[first][second_multi[kpt]]))) { // CHECK THIRD
                        return true;
                    }
                    }
                    
                  }
                  return false;
        }
        function begin() {
            // body...
            prep(m,m2,m3).each(function(b, lp) {

             
                tab_n_obj.push(lp[0].get(0));
                tab_n.push({}); //NEW ARRAY
                cssi=false;
                for (var oo = 0; oo < lp[1].length; oo++) {
                    l = lp[1][oo]; // NAME ATTRIBUTE

                    ds = l.name.split("-");

                    dd = l.value; // VAL ATTR
                    first = ds[0];
                    second = ds[1];
                    second_multi = second.split("_");
                    third = ds[2];
                    if (!(inArray(first, tab_first))) { // CHECK  FIRST
                        break;
                    }
                   // console.log(tab_second());
              if (test_second(first,second)) {
                break;
              }
              if (test_third(first,second,third)) {
                break;
              }
                   
                    if (!(first in tab_n[tab_n.length - 1])) {
                        tab_n[tab_n.length - 1][first] = {};

                    }

                    if (!(second in tab_n[tab_n.length - 1][first])) {
                        tab_n[tab_n.length - 1][first][second] = {};

                    }
                    if (!(third in tab_n[tab_n.length - 1][first][second])) {
                        if (third_type[third] == "array") {
                            tab_n[tab_n.length - 1][first][second][third] = [];
                        } else if (third_type[third] == "obj") {
                            tab_n[tab_n.length - 1][first][second][third] = {};
                        }
                    }
                    inter = inter_tab[third];
                    sd = dd.split(inter);
                    for (var j = 0; j < sd.length; j++) {
                        i = sd[j];

                        if (ds[2] == "css") {
                            ddz = i.split(":");
                            ss = ddz[0];
                            sss = ddz[1];
                            if (ss.length > 0) {
                                tab_n[b][ds[0]][ds[1]][ds[2]][ss] = sss;
                            }
                        } else if (ds[2] == "class") {

                            sss = i;if (sss.length > 0) {
                            tab_n[b][ds[0]][ds[1]][ds[2]].push(sss);
                          }

                        }else if (ds[2] == "js") {
                          sss = i;
                           if (sss.length > 0) {
                            tab_n[b][ds[0]][ds[1]][ds[2]].push(sss);
                          }
                        }
                    }

                }
            });
            re();
        }
}());
var MyOnlyJs = new OnlyJs();
$(window).trigger("OnlyJsReady");