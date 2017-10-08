/*
 MIT License

Copyright (c) 2017 Davide Trisolini

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory); //AMD
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery')); //CommonJS
  } else {
    factory(jQuery, window);
  }
}(function ($, window) {
  'use strict';
  var pluginName = 'badge', // the name of the plugin
    a = {
      aLi: 'aria-live',
      aAt: 'aria-atomic',
      aRe: 'aria-relevant',
      aLab: 'aria-label',
      tit: 'title',
      aHi: 'aria-hidden',
      t: 'true',
      f: 'false'
    },
    win = $(window);


  //-----------------------------------------
  // The actual plugin constructor
  function Badge(element, userSettings) {
    var self = this;

    self.settings = $.extend({}, $.fn[pluginName].defaultSettings, userSettings);
    self.element = $(element);
    self.elementStatus = false; //true when visible and value is positive, false when value is 0, null, undefined or false

    //init form
    self.init();
    self.update(self.settings.initialValue);
  };


  // Avoid Plugin.prototype conflicts
  $.extend(Badge.prototype, {
    init: function () {
      //add attributes
      this.element
        .attr('role', 'status')
        .attr(a.aLi, 'polite')
        .attr(a.aAt, a.t);


      //trigger custom event on window for authors to listen for
      win.trigger(pluginName + '.initialised', [self]);
    },
    setValue: function (value) {
      var self = this,
        settings = self.settings,
        element = self.element,
        label = settings.aLabel.replace('{X}', value); //replace {X} with real value to generate accessible label.

      //update value
      element
        .text(value)
        .attr(a.aLab, label);

      //update title attribute if useTitle option is enabled
      if (settings.useTitle) {
        element.attr(a.tit, label);
      }

      //add updated class and remove after time passed from author
      element.addClass(settings.updatedClass);

      setTimeout(function () {
        element.removeClass(settings.updatedClass);
      }, settings.updatedClassRemoveAfter);
    },
    show: function () {
      var self = this;

      self.element
        .removeClass(self.settings.hiddenClass)
        .attr(a.aHi, a.f);
    },
    hide: function () {
      var self = this;

      self.element
        .addClass(self.settings.hiddenClass)
        .attr(a.aHi, a.t);
    },
    update: function (value) {
      var self = this;

      if (value !== null && value !== false && value !== undefined && value != 0) {
        if (!self.elementStatus) {

          self.elementStatus = true;

          if (self.settings.hideWhenZero) {
            self.show();
          }
        }

        self.setValue(value);
      } else {


        if (self.elementStatus) {
          self.elementStatus = false;
        }

        if (self.settings.hideWhenZero) {
          self.hide();
        }

        self.setValue(value);
      }

      //trigger custom event on window for authors to listen for
      win.trigger(pluginName + '.updated', [self]);
    },
    //-------------------------------------------------------------
    //Method caller
    //-------------------------------------------------------------
    methodCaller: function (methodName, methodArg) {
      var self = this;

      switch (methodName) {
      case 'update':
        self.update(methodArg);
        break;
      }
    }
  });




  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (userSettings, methodArg) {
    return this.each(function () {
      var self = this;
      /*
       * If following conditions matches, then the plugin must be initialsied:
       * Check if the plugin is instantiated for the first time
       * Check if the argument passed is an object or undefined (no arguments)
       */
      if (!$.data(self, 'plugin_' + pluginName) && (typeof userSettings === 'object' || typeof userSettings === 'undefined')) {
        $.data(self, 'plugin_' + pluginName, new Badge(self, userSettings));
      } else if (typeof userSettings === 'string') {
        $.data(self, 'plugin_' + pluginName).methodCaller(userSettings, methodArg);
      }
    });
  };


  $.fn[pluginName].defaultSettings = {
    updatedClass: 'badge_updated',
    updatedClassRemoveAfter: 3000, //
    hiddenClass: 'badge_hidden',
    aLabel: 'You have {X} notifications',
    useTitle: true,
    initialValue: 0,
    hideWhenZero: false
  };
}));
