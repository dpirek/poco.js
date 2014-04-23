(function () {
  
    window.$ = function(selector, context){

    var elements = false;

    // When element is passed.
    if(typeof selector === 'object') {
      elements = [selector];
    } else {
    
      // When context is passed.
      if (context) {
        elements = context.querySelectorAll(selector);
      } else {
        elements = document.querySelectorAll(selector);
      }
    }

    var each = function(data, callBack){
    
      var length = data.length;
      if(length) {
        for(var i = 0; i < length; i++) {
          if(data.item) {
            callBack(i, data.item(i)); 
          } else {
            callBack(i, data[i]); 
          }
        }
      } else {
        if (typeof object === 'object') {
          for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
              callBack(prop, object[prop]);
            }
          }
        }
      }
    };
    
    var methods = {
      elements: elements,
      html: function (html) {
        each(elements, function(i, d){
          if(typeof html === 'string') {
            d.innerHTML = html;
          } else {
            d.innerHTML = '';
            d.appendChild(html);
          } 
        });
        
        return this;
      },
      hide: function (html) {
        each(elements, function(i, d){
          d.style.display = 'none';
        });
        
      },
      show: function (html) {
        each(elements, function(i, d){
          d.style.display = 'block';
        });
        
        return this;
      },
      attr: function (attr, value) {
        if(value) {
          each(elements, function(i, d){
            d.setAttribute(attr, value);
          });
        } else {
          return elements[0].getAttribute(attr);
        }
        
        return this;
      },
      on: function (event, callBack) {
        
        each(elements, function(i, d){
          d.addEventListener(event, function () {
            callBack(this);
          }, false);
        });
        
        return this;
      },
      click: function (callBack, prop) {
      
        var NoClickDelay = function (el) {
          this.element = el;
          if (window.Touch) this.element.addEventListener('touchstart', this, false);
        };
        
        NoClickDelay.prototype = {
          handleEvent: function (e) {
            switch (e.type) {
              case 'touchstart':
                this.onTouchStart(e);
                break;
              case 'touchmove':
                this.onTouchMove(e);
                break;
              case 'touchend':
                this.onTouchEnd(e);
                break;
            }
          },
        
          onTouchStart: function (e) {
            e.preventDefault();
            this.moved = false;
            this.element.addEventListener('touchmove', this, false);
            this.element.addEventListener('touchend', this, false);
          },
        
          onTouchMove: function (e) {
            this.moved = true;
          },
        
          onTouchEnd: function (e) {
            this.element.removeEventListener('touchmove', this, false);
            this.element.removeEventListener('touchend', this, false);
        
            if (!this.moved) {
              var theTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
              if (theTarget.nodeType == 3) theTarget = theTarget.parentNode;
              var theEvent = document.createEvent('MouseEvents');
              theEvent.initEvent('click', true, true);
              theTarget.dispatchEvent(theEvent);
            }
          }
        };
      
        if(!prop) {
          var prop = false;
        }
        
        each(elements, function (i, d){
          var e = new NoClickDelay(d);
          d.addEventListener('click', callBack, prop);
        });
        
        return this;
      },
      trim: function (str) {
        return str.replace(/^\s+|\s+$/g, '');
      },
      hasClass: function (cls) {
        
        var hasClass = false;
        
        each(elements, function(i, d) {
          var classes = d.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
          each(classes, function(i, d) {
            if(cls === methods.trim(d)) {
              hasClass = true;
            }
          });
        });
        
        return hasClass;
      },
      addClass: function (cls) {
        
        each(elements, function(i, d) {
          
          var classes = d.className.split(' '),
              hasClassAlready = false;
          
          each(classes, function(i, d) {
            if(d === cls) {
              hasClassAlready = true;
            }
          });
          
          if(!hasClassAlready) {
            classes.push(cls);
          }
          
          d.className = classes.join(' ');
        });
        
        return this;            
      },
      removeClass: function (cls) {
        
        each(elements, function(i, d) {
          
          var classes = d.className.split(' '),
              newClasses = [];
          
          each(classes, function(i, d) {
            if(d !== cls) {
              newClasses.push(d);
            }
          });

          d.className = newClasses.join(' ');
        });
        
        return this;            
      },
      each: function (callBack) {
        each(elements, function(i, d){
          callBack(i, d);
        });
        
        return this;
      }
    };
    
    return methods;
  };
} ());