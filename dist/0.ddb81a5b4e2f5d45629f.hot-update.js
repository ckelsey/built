webpackHotUpdatebuiltjs(0,{

/***/ "./src/components/button-element/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

__webpack_require__("./src/components/button-element/style.scss");

__webpack_require__("./src/components/effect-bounce-z/index.ts");

__webpack_require__("./src/components/effect-ripple/index.ts");

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var style = __webpack_require__("./src/components/button-element/style.scss").toString();

var setStyles = function setStyles(el, host, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles || host.styles);
};

var setTheme = function setTheme(value, host) {
  var themeElement = host.elements.theme;

  if (!themeElement || value === undefined) {
    return;
  }

  set_style_rules_1["default"](themeElement, value);
};

var properties = {
  accentcolor: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("#59a2d8"))(val).value;
    },
    onChange: function onChange(val, host) {
      if (host.hasRipple) {
        host.elements.ripple.color = val;
      }

      if (host.hasBounce) {
        host.elements.bounce.color = val;
      }
    }
  },
  "class": component_class_object_1["default"],
  ready: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: function onChange(val, host) {
      if (!val) {
        return;
      }

      setBounce(host);
      setRipple(host);
    }
  },
  ripple: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](true))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setRipple(host);
    }
  },
  bounce: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](true))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setBounce(host);
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return setStyles(host.elements.injectedStyles, host, val);
    }
  },
  theme: {
    format: function format(val, host) {
      return typeof val === "string" ? val : host.theme;
    },
    onChange: setTheme
  }
};
var observedAttributes = Object.keys(properties);
var elements = {
  root: {
    selector: ".button-element",
    onChange: function onChange() {}
  },
  button: {
    selector: "button",
    onChange: function onChange(_el, host) {
      setBounce(host);
      setRipple(host);
    }
  },
  ripple: {
    selector: "effect-ripple",
    onChange: function onChange(_el, host) {
      return setRipple(host);
    }
  },
  bounce: {
    selector: "effect-bounce-z",
    onChange: function onChange(_el, host) {
      return setBounce(host);
    }
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: setStyles
  },
  theme: {
    selector: "style.themeStyles",
    onChange: function onChange(_el, host) {
      return setTheme(host.theme, host);
    }
  }
};

var setRipple = function setRipple(host) {
  var ripple = host.elements.ripple;

  if (!ripple) {
    return;
  }

  ripple.color = host.accentcolor;
  ripple.targets = host.ripple ? [host.elements.button] : [];
};

var setBounce = function setBounce(host) {
  var bounce = host.elements.bounce;
  var button = host.elements.button;

  if (!bounce || !button) {
    return;
  }

  bounce.targets = host.bounce ? [button] : [];
};

var template = __webpack_require__("./src/components/button-element/index.html");

var componentName = "button-element";
var componentRoot = ".button-element";
var ButtonElement = constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: observedAttributes,
  properties: properties,
  elements: elements,
  computed: {
    hasRipple: function hasRipple(host) {
      return {
        get: function get() {
          var el = host.elements.ripple;
          return !!el && el.ready === true;
        }
      };
    },
    hasBounce: function hasBounce(host) {
      return {
        get: function get() {
          var el = host.elements.bounce;
          return !!el && el.ready === true;
        }
      };
    },
    canRipple: function canRipple(host) {
      return {
        get: function get() {
          var can = !!host.ripple;
          return host.hasRipple && can && !!host.elements.button && host.ready === true;
        }
      };
    },
    canBounce: function canBounce(host) {
      return {
        get: function get() {
          var can = !!host.bounce;
          return host.hasBounce && can && !!host.elements.button && host.ready === true;
        }
      };
    }
  },
  onConnected: function onConnected(host) {
    host.elements.button.classList.add("ready");
  }
});
define_1["default"](componentName, ButtonElement);
exports["default"] = ButtonElement;

/***/ }),

/***/ "./src/components/content-drawer/elements.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var properties_1 = __webpack_require__("./src/components/content-drawer/properties.ts");

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

exports.elementSelectors = {
  root: ".content-drawer-container",
  header: ".content-drawer-header",
  content: ".content-drawer-content",
  contentInner: ".content-drawer-content-inner",
  scaler: "effect-scale",
  underline: "effect-underline",
  ripple: "effect-ripple",
  fader: "effect-fade",
  headerIcon: "icon-element",
  bounce: "effect-bounce-z",
  injectedStyles: "style.injectedStyles"
};
var elements = {};

exports.setScaler = function (host) {
  var inner = host.elements.contentInner;
  var scaler = host.elements.scaler;
  scaler.targets = [inner];
  scaler.x = ["left", "right"].indexOf(host.openfrom) > -1;
  scaler.y = ["top", "bottom"].indexOf(host.openfrom) > -1;
  scaler.startfrom = properties_1.toEffectStartFrom(host.openfrom);
  scaler.scaled = !host.open;
};

exports.setFader = function (host) {
  host.elements.fader.targets = [host.elements.contentInner];
};

exports.setUnderline = function (host) {
  var underline = host.elements.underline;

  if (!underline) {
    return;
  }

  underline.color = host.accentcolor;
  underline.direction = host.underline;
  underline.targets = [host.elements.header];

  if (typeof underline.open !== "function") {
    return;
  }

  if (host.open) {
    underline.open();
  } else {
    underline.close();
  }
};

exports.setRipple = function (host) {
  var ripple = host.elements.ripple;
  ripple.targets = [host.elements.header];
  ripple.color = host.accentcolor;
  ripple.direction = host.ripple;
};

exports.setHeaderIcon = function (host) {
  var prop = host.headericon.slice(0, 4) === "<svg" ? "svg" : "type";
  host.elements.headerIcon[prop] = host.headericon;
};

exports.setStyles = function (el, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles);
};

var elementMethods = {
  header: function header(el, host) {
    el.eventSubscriptions = {
      click: observeEvent_1["default"](el, "click").subscribe(function () {
        return host.open = !host.open;
      })
    };
  },
  injectedStyles: function injectedStyles(el, host) {
    return exports.setStyles(el, host.styles);
  }
};
Object.keys(exports.elementSelectors).forEach(function (key) {
  elements[key] = {
    selector: exports.elementSelectors[key],
    onChange: elementMethods[key] ? elementMethods[key] : function () {}
  };
});
exports["default"] = elements;

/***/ }),

/***/ "./src/components/content-drawer/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var properties_1 = __webpack_require__("./src/components/content-drawer/properties.ts");

var elements_1 = __webpack_require__("./src/components/content-drawer/elements.ts");

__webpack_require__("./src/components/effect-scale/index.ts");

__webpack_require__("./src/components/effect-underline/index.ts");

__webpack_require__("./src/components/effect-fade/index.ts");

__webpack_require__("./src/components/effect-ripple/index.ts");

__webpack_require__("./src/components/effect-bounce-z/index.ts");

__webpack_require__("./src/components/content-drawer/style.scss");

var style = __webpack_require__("./src/components/content-drawer/style.scss").toString();

var template = __webpack_require__("./src/components/content-drawer/index.html");

var componentName = "content-drawer";
var componentRoot = ".content-drawer-container";
var ContentDrawer =
/*#__PURE__*/
constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: properties_1.observedAttributes,
  properties: properties_1.properties,
  elements: elements_1["default"],
  computed: {
    hasScaler: properties_1.hasScaler,
    hasUnderline: properties_1.hasUnderline,
    hasRipple: properties_1.hasRipple,
    hasHeaderIcon: properties_1.hasHeaderIcon,
    hasFader: properties_1.hasFader,
    canUnderline: properties_1.canUnderline,
    canScale: properties_1.canScale,
    canRipple: properties_1.canRipple,
    canFade: properties_1.canFade
  },
  onReady: function onReady(host) {
    host.elements.root.classList[!!host.open ? "add" : "remove"]("open");
    elements_1.setScaler(host);
    elements_1.setFader(host);
    elements_1.setUnderline(host);
    elements_1.setRipple(host);
    elements_1.setHeaderIcon(host);
  }
});
define_1["default"](componentName, ContentDrawer);
exports["default"] = ContentDrawer;

/***/ }),

/***/ "./src/components/content-drawer/methods.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.toggle = function (host, open) {
  if (!host.ready) {
    return;
  }

  var root = host.elements.root;

  if (!!root) {
    root.classList[!!open ? "add" : "remove"]("open");
  }

  var header = host.elements.header;
  var scaler = host.elements.scaler;
  var inner = host.elements.contentInner;
  var bounce = host.elements.bounce;
  var underline = host.elements.underline;
  var ripple = host.elements.ripple;
  var fader = host.elements.fader;
  scaler.scaled = !open;

  if (!!host.bounce && host.bounce !== "false") {
    var target = void 0;

    if (host.bounce === "header") {
      target = header;
    }

    if (host.bounce === "content") {
      target = inner;
    }

    if (host.bounce === "true" || host.bounce === "all") {
      target = root;
    }

    bounce.targets = [target];
    bounce.amount = host.bounceamount || -4;
    bounce.speed = host.bouncespeed;

    if (typeof bounce.trigger === "function") {
      bounce.trigger();
    }
  } else if (bounce.targets && bounce.targets.length) {
    bounce.targets = [];
  }

  if (fader) {
    if (!host.fade && fader.targets.length) {
      fader.targets = [];
    }

    if (host.fade && !fader.targets.length && inner) {
      fader.targets = [inner];
    }

    if (host.fade && fader.opacity !== host.fadeamount) {
      fader.opacity = host.fadeamount;
    }

    if (host.fade && fader.speed !== host.fadespeed) {
      fader.speed = host.fadespeed;
    }
  }

  if (underline) {
    if (!host.underline && underline.targets.length) {
      underline.targets = [];
    }

    if (host.underline && !underline.targets.length && header) {
      underline.targets = [header];
    }

    if (host.underline && underline.opacity !== host.underlineamount) {
      underline.opacity = host.underlineamount;
    }

    if (host.underline && underline.speed !== host.underlinespeed) {
      underline.speed = host.underlinespeed;
    }

    if (host.underline && underline.color !== host.accentcolor && ripple.color !== host.underlinecolor) {
      underline.color = host.underlinecolor || host.accentcolor;
    }

    if (!!host.underline && underline.direction !== host.underline) {
      underline.direction = host.underline;
    }
  }

  if (ripple) {
    if (!host.ripple && ripple.targets.length) {
      ripple.targets = [];
    }

    if (host.ripple && !ripple.targets.length && header) {
      ripple.targets = [header];
    }

    if (host.ripple && ripple.opacity !== host.rippleamount) {
      ripple.opacity = host.rippleamount;
    }

    if (host.ripple && ripple.speed !== host.ripplespeed) {
      ripple.speed = host.ripplespeed;
    }

    if (host.ripple && ripple.color !== host.accentcolor && ripple.color !== host.ripplecolor) {
      ripple.color = host.ripplecolor || host.accentcolor;
    }

    if (!!host.ripple && ripple.direction !== host.ripple) {
      ripple.direction = host.ripple;
    }
  }

  var others = [];

  if (!!host.drawergroup) {
    others = Array.from(document.querySelectorAll("content-drawer[drawergroup=\"" + host.drawergroup + "\"]"));
  }

  if (open) {
    if (host.canUnderline) {
      underline.open();
    }

    if (host.canFade) {
      fader.open();
    }

    if (host.canRipple) {
      ripple.trigger();
    }

    others.forEach(function (other) {
      if (other !== host) {
        other.open = false;
      }
    });
  } else {
    if (host.canUnderline) {
      underline.close();
    }

    if (host.canFade) {
      fader.close();
    }
  }
};

/***/ }),

/***/ "./src/components/content-drawer/properties.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var if_empty_1 = __webpack_require__("./src/utils/convert/if_empty.ts");

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

var methods_1 = __webpack_require__("./src/components/content-drawer/methods.ts");

var elements_1 = __webpack_require__("./src/components/content-drawer/elements.ts");

var commas_to_array_1 = __webpack_require__("./src/utils/convert/commas-to-array.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var map_1 = __webpack_require__("./src/utils/convert/map.ts");

var indexof_1 = __webpack_require__("./src/utils/convert/indexof.ts");

var arrowIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/></svg>";
var directions = ["auto", "left", "right", "top", "bottom"];

exports.toEffectStartFrom = function (val) {
  return val === "auto" ? "auto" : val === "top" ? "center top" : val === "bottom" ? "center bottom" : val === "left" ? "left center" : "right center";
};

var setElementParam = function setElementParam(el, key, value) {
  return !el ? undefined : el[key] = value;
};

var attributes = {
  accentcolor: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_empty_1["default"]("#59a2d8"))(val).value;
    },
    onChange: function onChange(val, host) {
      setElementParam(host.elements.ripple, "color", val);
      setElementParam(host.elements.underline, "color", val);
    }
  },
  bounce: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("all"))(val).value;
    }
  },
  bounceamount: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](null))(val).value;
    }
  },
  bouncespeed: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](null))(val).value;
    }
  },
  "class": component_class_object_1["default"],
  drawergroup: {
    format: function format(val) {
      return val;
    }
  },
  fade: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](true))(val).value;
    }
  },
  fadeamount: {
    format: function format(val) {
      return pipe_1["default"](commas_to_array_1["default"], if_invalid_1["default"]([0, 1]), map_1["default"](function (v) {
        return to_number_1["default"](v).value;
      }))(val).value;
    }
  },
  fadespeed: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](null))(val).value;
    }
  },
  headericon: {
    format: function format(val) {
      return val === "true" || val === undefined || val === null ? arrowIcon : val === "false" ? false : val;
    },
    onChange: function onChange(_val, host) {
      return elements_1.setHeaderIcon(host);
    }
  },
  openfrom: {
    format: function format(val) {
      return pipe_1["default"](indexof_1["default"](directions), if_invalid_1["default"]("top"))(val).value;
    },
    onChange: function onChange(val, host) {
      setElementParam(host.elements.scaler, "startfrom", exports.toEffectStartFrom(val));
      setElementParam(host.elements.scaler, "x", ["left", "right"].indexOf(val) > -1);
      setElementParam(host.elements.scaler, "y", ["top", "bottom"].indexOf(val) > -1);
    }
  },
  open: {
    format: function format(val) {
      return bool_1["default"](val).value;
    },
    onChange: function onChange(val, host) {
      return methods_1.toggle(host, val);
    }
  },
  ripple: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("auto"))(val).value;
    }
  },
  rippleamount: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](undefined))(val).value;
    }
  },
  ripplecolor: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](undefined))(val).value;
    }
  },
  ripplespeed: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](undefined))(val).value;
    }
  },
  speed: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](333))(val).value;
    },
    onChange: function onChange(val, host) {
      return setElementParam(host.elements.scaler, "speed", val);
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return elements_1.setStyles(host.elements.injectedStyles, val);
    }
  },
  underline: {
    format: function format(val) {
      return val;
    }
  },
  underlineamount: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](undefined))(val).value;
    }
  },
  underlinecolor: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](undefined))(val).value;
    }
  },
  underlinespeed: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](undefined))(val).value;
    }
  }
};
exports.properties = Object.assign({}, attributes);
exports.observedAttributes = Object.keys(attributes);

exports.hasScaler = function (host) {
  return {
    get: function get() {
      var el = host.elements.scaler;
      return !!el && el.ready === true;
    }
  };
};

exports.hasUnderline = function (host) {
  return {
    get: function get() {
      var el = host.elements.underline;
      return !!el && el.ready === true;
    }
  };
};

exports.hasRipple = function (host) {
  return {
    get: function get() {
      var el = host.elements.ripple;
      return !!el && el.ready === true;
    }
  };
};

exports.hasHeaderIcon = function (host) {
  return {
    get: function get() {
      var el = host.elements.headerIcon;
      return !!el && !!el.ready && host.headericon !== false;
    }
  };
};

exports.canScale = function (host) {
  return {
    get: function get() {
      return host.hasScaler && !!host.elements.header && !!host.elements.contentInner;
    }
  };
};

exports.canUnderline = function (host) {
  return {
    get: function get() {
      var can = !!host.underline && host.underline !== "false";
      return host.hasUnderline && can && !!host.elements.header && host.ready === true;
    }
  };
};

exports.canRipple = function (host) {
  return {
    get: function get() {
      var can = !!host.ripple && host.ripple !== "false";
      return host.hasRipple && can && !!host.elements.header && host.ready === true;
    }
  };
};

exports.hasFader = function (host) {
  return {
    get: function get() {
      var el = host.elements.fader;
      return !!el && el.ready === true;
    }
  };
};

exports.canFade = function (host) {
  return {
    get: function get() {
      var can = !!host.fade && host.fade !== "false";
      return host.hasFader && can && !!host.elements.contentInner && host.ready === true;
    }
  };
};

/***/ }),

/***/ "./src/components/content-transition/elements.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

var _1 = __webpack_require__("./src/components/content-transition/index.ts");

exports.setStyles = function (el, host, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles || host.styles);
};

exports.setKeepChildren = function (host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.classList[host.keepchildren ? "add" : "remove"]("keepchildren");
};

var elements = {
  root: {
    selector: ".content-transition-container",
    onChange: function onChange(el, host) {
      _1.setStyleElement(host);

      el.setAttribute("type", host.type);
    }
  },
  current: {
    selector: "slot[name=\"current\"]"
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: exports.setStyles
  },
  themeStyles: {
    selector: "style.themeStyles",
    onChange: function onChange(el, host) {
      return exports.setStyles(el, host, host.theme);
    }
  },
  next: {
    selector: "slot[name=\"next\"]"
  },
  nextContainer: {
    selector: ".next-slot"
  },
  hidden: {
    selector: "slot[name=\"hidden\"]"
  },
  hiddentContainer: {
    selector: ".hidden-slot"
  },
  currentContainer: {
    selector: ".current-slot"
  }
};
exports["default"] = elements;

/***/ }),

/***/ "./src/components/content-transition/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

__webpack_require__("./src/components/content-transition/style.scss");

var elements_1 = __webpack_require__("./src/components/content-transition/elements.ts");

var properties_1 = __webpack_require__("./src/components/content-transition/properties.ts");

var methods_1 = __webpack_require__("./src/components/content-transition/methods.ts");

var append_style_1 = __webpack_require__("./src/utils/webcomponent/append-style.ts");

var style = __webpack_require__("./src/components/content-transition/style.scss").toString();

var template = __webpack_require__("./src/components/content-transition/index.html");

var componentName = "content-transition";
var componentRoot = ".content-transition-container";

exports.setStyleElement = function (host) {
  var outerStyle = host.querySelector("style[name=\"outer\"]");
  var componentStyle = host.shadowRoot.querySelector("style[name=\"\"]");
  var themeStyles = host.elements.themeStyles;
  var injectedStyles = host.elements.injectedStyles;
  var styleString = [style, themeStyles ? themeStyles.innerHTML : "", injectedStyles ? injectedStyles.innerHTML : ""].join("");

  if (!outerStyle) {
    append_style_1["default"](styleString, host, "outer");
    outerStyle = host.querySelector("style[name=\"outer\"]");
    outerStyle.nonchild = true;
  }

  elements_1.setStyles(componentStyle, host, styleString);
  elements_1.setStyles(outerStyle, host, styleString);
};

var ContentTransition = constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: properties_1.observedAttributes,
  properties: properties_1.properties,
  elements: elements_1["default"],
  methods: {
    transitionChild: methods_1.transitionChild,
    transitionTo: methods_1.transitionTo,
    getComponentStyles: methods_1.getComponentStyles,
    getIndex: methods_1.getIndex,
    getCurrent: methods_1.getCurrent,
    getChildren: methods_1.getChildren,
    start$: methods_1.start$,
    end$: methods_1.end$
  }
});
define_1["default"](componentName, ContentTransition);
exports["default"] = ContentTransition;

/***/ }),

/***/ "./src/components/content-transition/methods.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var timer_1 = __webpack_require__("./src/services/timer.ts");

var curve_1 = __webpack_require__("./src/utils/curve/index.ts");

var style = __webpack_require__("./src/components/content-transition/style.scss").toString();

var dispatchTransition = function dispatchTransition(host, from, to) {
  host.dispatchEvent(new CustomEvent("transitioning", {
    detail: {
      host: host,
      from: from,
      to: to
    }
  }));
};

var dispatchTransitioned = function dispatchTransitioned(host, from, to) {
  host.dispatchEvent(new CustomEvent("transitioned", {
    detail: {
      host: host,
      from: from,
      to: to
    }
  }));
};

var removeElement = function removeElement(el) {
  try {
    el.parentNode.removeChild(el);
  } catch (error) {}
};

var animator = function animator(from, to, speed, stepFn) {
  return new Promise(function (resolve) {
    return timer_1["default"](speed, stepFn, curve_1.EaseInOut([from, to], speed), resolve);
  });
};

var animateHeight = function animateHeight(from, to, el, speed) {
  return animator(from, to, speed, function (heightStep) {
    return el.style.height = heightStep + "px";
  });
};

var animateLeft = function animateLeft(from, to, el, speed) {
  return animator(from, to, speed, function (leftStep) {
    return el.style.transform = "translateZ(0) translateX(" + leftStep + "%)";
  });
};

var animateOpacity = function animateOpacity(from, to, el, speed) {
  return animator(from, to, speed, function (opacityStep) {
    return el.style.opacity = opacityStep;
  });
};

exports.getChildren = function (host) {
  return function () {
    return Array.from(host.querySelectorAll("[slot]"));
  };
};

exports.getCurrent = function (host) {
  return function () {
    return host.querySelector("[slot=\"current\"]");
  };
};

var getTransitionElements = function getTransitionElements(host, indexOrChild) {
  var nextContainer = host.elements.nextContainer;
  var currentContainer = host.elements.currentContainer;
  var root = host.elements.root;
  var child = isNaN(indexOrChild) ? indexOrChild : host.getChildren()[indexOrChild];
  var current = host.current || host.getCurrent();

  if (!root || !nextContainer || !currentContainer || !child) {
    return;
  }

  host.current = child;
  return {
    nextContainer: nextContainer,
    currentContainer: currentContainer,
    root: root,
    child: child,
    current: current
  };
};

var cleanup = function cleanup(host) {
  var children = host.getChildren();
  children.forEach(function (child) {
    return child === host.current ? undefined : child.setAttribute("slot", "hidden");
  });
  var current = host.getCurrent();
  host.end = {
    current: current,
    index: children.indexOf(current)
  };
  return host.current;
};

var transitionSlide = function transitionSlide(host, index, speed, keepchildren) {
  return new Promise(function (resolve) {
    var elements = getTransitionElements(host, index);

    if (!elements) {
      return resolve();
    }

    dispatchTransition(host, elements.current, elements.child);
    host.start = {
      from: elements.current,
      to: elements.child
    };
    var startHeight = elements.root.offsetHeight;
    elements.root.style.height = startHeight + "px";
    elements.root.classList.add("sliding");
    elements.child.setAttribute("slot", "next");
    var endHeight = elements.child.offsetHeight;

    if (startHeight !== endHeight) {
      animateHeight(startHeight, elements.child.offsetHeight, elements.root, speed).then(function () {
        requestAnimationFrame(function () {
          return elements.root.style.removeProperty("height");
        });
      });
    }

    setTimeout(function () {
      requestAnimationFrame(function () {
        animateOpacity(0, 1, elements.nextContainer, speed * 0.25);
      });
    }, speed * 0.1);
    animateOpacity(1, 0, elements.currentContainer, speed * 0.8);
    animateLeft(0, 100, elements.currentContainer, speed * 0.8);
    animateLeft(-100, 0, elements.nextContainer, speed).then(function () {
      if (elements.current) {
        elements.current.setAttribute("slot", "hidden");
      }

      elements.currentContainer.removeAttribute("style");
      elements.child.setAttribute("slot", "current");
      elements.nextContainer.removeAttribute("style");
      elements.root.classList.remove("sliding");
      dispatchTransitioned(host, elements.current, elements.child);

      if (!keepchildren) {
        removeElement(elements.current);
      }

      return resolve(cleanup(host));
    });
  });
};

var transitionFade = function transitionFade(host, child, speed, keepchildren) {
  return new Promise(function (resolve) {
    var elements = getTransitionElements(host, child);

    if (!elements) {
      return resolve();
    }

    dispatchTransition(host, elements.current, elements.child);
    host.start = {
      from: elements.current,
      to: elements.child
    };
    var startHeight = elements.root.offsetHeight;
    elements.root.style.height = startHeight + "px";
    elements.child.setAttribute("slot", "next");
    var endHeight = elements.child.offsetHeight;

    if (!host.contains(elements.child)) {
      host.appendChild(elements.child);
    }

    animateOpacity(1, 0, elements.currentContainer, speed * 0.75);
    animateOpacity(0, 1, elements.nextContainer, speed);

    var afterHeightSet = function afterHeightSet() {
      if (!keepchildren) {
        while (host.getChildren().length > 1) {
          removeElement(host.getChildren()[0]);
        }
      }

      if (elements.current) {
        elements.current.setAttribute("slot", "hidden");
      }

      elements.child.setAttribute("slot", "current");
      elements.currentContainer.style.removeProperty("opacity");
      elements.child.style.removeProperty("opacity");
      requestAnimationFrame(function () {
        elements.root.style.removeProperty("height");
        elements.nextContainer.style.removeProperty("opacity");
        dispatchTransitioned(host, elements.current, elements.child);
        return resolve(cleanup(host));
      });
    };

    if (endHeight === startHeight) {
      return setTimeout(afterHeightSet, speed);
    }

    animateHeight(startHeight, endHeight, elements.root, speed).then(afterHeightSet);
  });
};

exports.transitionTo = function (host) {
  return function (index) {
    return new Promise(function (resolve) {
      switch (host.type) {
        case "slide":
          return transitionSlide(host, index, host.speed, host.keepchildren).then(resolve);

        case "fade":
          return transitionFade(host, index, host.speed, host.keepchildren).then(resolve);
      }
    });
  };
};

exports.transitionChild = function (host) {
  return function (child) {
    return new Promise(function (resolve) {
      switch (host.type) {
        case "slide":
          return transitionSlide(host, child, host.speed, host.keepchildren).then(resolve);

        case "fade":
          return transitionFade(host, child, host.speed, host.keepchildren).then(resolve);
      }
    });
  };
};

exports.getComponentStyles = function (host) {
  return function () {
    return "" + style + host.styles;
  };
};

exports.getIndex = function (host) {
  return function () {
    return host.getChildren().indexOf(host.getCurrent());
  };
};

exports.start$ = function (host) {
  return function (next, error, complete) {
    if (error === void 0) {
      error = function error(_e) {};
    }

    if (complete === void 0) {
      complete = function complete() {};
    }

    return host.state.start.subscribe(next, error, complete);
  };
};

exports.end$ = function (host) {
  return function (next, error, complete) {
    if (error === void 0) {
      error = function error(_e) {};
    }

    if (complete === void 0) {
      complete = function complete() {};
    }

    return host.state.end.subscribe(next, error, complete);
  };
};

/***/ }),

/***/ "./src/components/content-transition/properties.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var elements_1 = __webpack_require__("./src/components/content-transition/elements.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var utils_1 = __webpack_require__("./src/utils/index.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

exports.properties = {
  "class": component_class_object_1["default"],
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return elements_1.setStyles(host.elements.injectedStyles, host, val);
    }
  },
  theme: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return elements_1.setStyles(host.elements.themeStyles, host, val);
    }
  },
  speed: {
    format: function format(val) {
      return isNaN(val) ? 300 : val;
    }
  },
  type: {
    format: function format(val) {
      return ["fade", "slide"].indexOf(val) > -1 ? val : "fade";
    },
    onChange: function onChange(val, host) {
      var root = host.elements.root;

      if (!root) {
        return;
      }

      root.setAttribute("type", val);
    }
  },
  keepchildren: {
    format: function format(val) {
      return pipe_1["default"](utils_1.ToBool, if_invalid_1["default"](false))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_1.setKeepChildren(host);
    }
  },
  current: {
    format: function format(val) {
      return val;
    }
  },
  start: {
    format: function format(val) {
      return val;
    }
  },
  end: {
    format: function format(val) {
      return val;
    }
  }
};
exports.observedAttributes = Object.keys(exports.properties);

/***/ }),

/***/ "./src/components/cookie-message/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

__webpack_require__("./src/components/cookie-message/style.scss");

__webpack_require__("./src/components/button-element/index.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var style = __webpack_require__("./src/components/cookie-message/style.scss").toString();

var template = __webpack_require__("./src/components/cookie-message/index.html");

var componentName = "cookie-message";
var componentRoot = ".cookie-message-container";

var setStyles = function setStyles(el, host, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles || host.styles);
};

var setButton = function setButton(host) {
  var button = host.elements.button;

  if (!button) {
    return;
  }

  button.innerHTML = host.buttontext || "";
  button.accentcolor = host.buttonaccent;
  button.ripple = host.buttonripple;
  button.bounce = host.buttonbounce;

  if (typeof button.clickListener === "function") {
    button.clickListener();
  }

  button.clickListener = observeEvent_1["default"](button, "click").subscribe(function () {
    host.shown = false;
  });
};

var setMessage = function setMessage(host) {
  var message = host.elements.message;

  if (!message) {
    return;
  }

  message.innerHTML = host.message || "";
};

var cookieName = "accepted_cookies";

var setCookie = function setCookie() {
  document.cookie = cookieName + "=true";
};

var getCookie = function getCookie() {
  try {
    return !!document.cookie.split(';').filter(function (c) {
      return c.indexOf(cookieName) > -1;
    }).map(function (c) {
      return JSON.parse(c.split("=")[1]);
    })[0];
  } catch (error) {}
};

var properties = {
  "class": component_class_object_1["default"],
  shown: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](!getCookie()))(val).value;
    },
    onChange: function onChange(val, host) {
      if (val) {
        try {
          localStorage.removeItem(cookieName);
        } catch (error) {}

        host.elements.root.classList.add("shown");
      } else {
        setCookie();
        host.elements.root.classList.remove("shown");
      }
    }
  },
  message: {
    format: function format(val) {
      return typeof val === "string" ? val : "By clicking \"Continue\" or continuing to use our site, you acknowledge that you accept our use of cookies, which are used to provide you with the best possible experience and no personal information is stored.";
    },
    onChange: function onChange(_val, host) {
      return setMessage(host);
    }
  },
  buttontext: {
    format: function format(val) {
      return typeof val === "string" ? val : "Continue";
    },
    onChange: function onChange(_val, host) {
      return setButton(host);
    }
  },
  buttonripple: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](true))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setButton(host);
    }
  },
  buttonbounce: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](true))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setButton(host);
    }
  },
  buttonaccent: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("#59a2d8"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setButton(host);
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return setStyles(host.elements.injectedStyles, host, val);
    }
  }
};
var observedAttributes = Object.keys(properties);
var elements = {
  root: {
    selector: componentRoot,
    onChange: function onChange() {}
  },
  button: {
    selector: "button-element",
    onChange: function onChange(_el, host) {
      return setButton(host);
    }
  },
  message: {
    selector: ".cookie-message-text",
    onChange: function onChange(_el, host) {
      return setMessage(host);
    }
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: setStyles
  }
};
var CookieMessage =
/*#__PURE__*/
constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: observedAttributes,
  properties: properties,
  elements: elements,
  onConnected: function onConnected(host) {
    host.shown = !getCookie();
  }
});
define_1["default"](componentName, CookieMessage);
exports["default"] = CookieMessage;

/***/ }),

/***/ "./src/components/drop-down/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var append_style_1 = __webpack_require__("./src/utils/webcomponent/append-style.ts");

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

__webpack_require__("./src/components/overlay-content/index.ts");

__webpack_require__("./src/components/drop-down/style.scss");

var style = __webpack_require__("./src/components/drop-down/style.scss").toString();

var setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles);
};

var toggleOptions = function toggleOptions(show, host) {
  var overlay = host.elements.overlay;
  var root = host.elements.root;

  if (!root || !overlay) {
    return;
  }

  if (show && overlay.showing) {
    return;
  }

  try {
    overlay[show ? "show" : "hide"]();
  } catch (error) {}

  if (!show) {
    root.classList.remove("opened");
  } else {
    root.classList.add("opened");
  }

  host.dispatchEvent(new CustomEvent(show ? "selectopen" : "selectclose", {
    detail: host
  }));
};

var properties = {
  "class": component_class_object_1["default"],
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(_el, host) {
      return exports.setStyleElement(host);
    }
  },
  theme: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(_el, host) {
      return exports.setStyleElement(host);
    }
  },
  open: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: toggleOptions
  }
};

var template = __webpack_require__("./src/components/drop-down/index.html");

var componentName = "drop-down";
var componentRoot = "." + componentName + "-container";

var openClose = function openClose(open, host) {
  var change = function change() {
    var needsFocusBlur = host.open !== open;
    host.open = open;

    if (needsFocusBlur) {
      if (open) {
        host.focus();
      } else {
        host.blur();
      }
    }

    Array.from(host.children).forEach(function (c) {
      return c.blur();
    });
  };

  if (open) {
    return change();
  }

  setTimeout(change, 333);
};

var elements = {
  root: {
    selector: componentRoot
  },
  heading: {
    selector: ".drop-down-heading",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        mousedown: observeEvent_1["default"](el, "mousedown").subscribe(function () {
          if (!host.open) {
            return openClose(true, host);
          }

          requestAnimationFrame(function () {
            openClose(false, host);
          });
        })
      };
    }
  },
  overlay: {
    selector: ".drop-down-overlay"
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: function onChange(_el, host) {
      return exports.setStyleElement(host);
    }
  },
  themedStyles: {
    selector: "style.themedStyles",
    onChange: function onChange(_el, host) {
      return exports.setStyleElement(host);
    }
  }
};

exports.setStyleElement = function (host) {
  var outerStyle = host.querySelector("style[name=\"outer\"]");
  var componentStyle = host.shadowRoot.querySelector("style[name=\"\"]");
  var styleString = [style, host.theme, host.styles].join("");

  if (!outerStyle) {
    append_style_1["default"](styleString, host, "outer");
    outerStyle = host.querySelector("style[name=\"outer\"]");
    outerStyle.nonchild = true;
  }

  setStyles(host.elements.injectedStyles, styleString);
  setStyles(host.elements.themedStyles, styleString);
  setStyles(componentStyle, styleString);
  setStyles(outerStyle, styleString);
};

var DropDown = constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  properties: properties,
  elements: elements,
  observedAttributes: Object.keys(properties),
  onConnected: function onConnected(host) {
    host.tabIndex = "-1";

    var addClasses = function addClasses() {
      Array.from(host.children).forEach(function (child) {
        if (child.getAttribute("slot") === "option") {
          child.tabIndex = "-1";
          child.classList.add("drop-down-option");
        }
      });
    };

    var slotObserver = new MutationObserver(function (mutationsList) {
      var list = Array.from(mutationsList);

      while (list.length) {
        var mutation = list.shift();

        if (mutation.type === "childList" && mutation.addedNodes.length) {
          return addClasses();
        }
      }
    });
    addClasses();
    slotObserver.observe(host, {
      childList: true
    });
    host.eventSubscriptions = {
      blur: observeEvent_1["default"](host, "focusout").subscribe(function () {
        openClose(false, host);
      }),
      focus: observeEvent_1["default"](host, "focus").subscribe(function () {
        return openClose(true, host);
      }),
      slotObserver: slotObserver.disconnect
    };
    var overlay = host.elements.overlay;
    overlay.target = host;
  },
  onDisconnected: function onDisconnected(host) {
    Object.keys(host.eventSubscriptions).forEach(function (key) {
      if (typeof host.eventSubscriptions[key] !== "function") {
        return;
      }

      try {
        host.eventSubscriptions[key]();
      } catch (error) {}
    });
  }
});
define_1["default"](componentName, DropDown);
exports["default"] = DropDown;

/***/ }),

/***/ "./src/components/dropdown-select/elements.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var methods_1 = __webpack_require__("./src/components/dropdown-select/methods.ts");

var query_1 = __webpack_require__("./src/utils/html/query.ts");

var get_1 = __webpack_require__("./src/utils/get/index.ts");

var html_1 = __webpack_require__("./src/utils/validate/html.ts");

var replace_element_contents_1 = __webpack_require__("./src/utils/html/replace-element-contents.ts");

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

exports.elements = {
  root: {
    selector: ".dropdown-select-container",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        blur: observeEvent_1["default"](el, "blur").subscribe(function () {
          return requestAnimationFrame(host.elements.overlay.hide);
        })
      };
    }
  },
  input: {
    selector: "select.dropdown-select-input"
  },
  filter: {
    selector: "input.dropdown-select-filter",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        focus: observeEvent_1["default"](el, "focus").subscribe(function () {
          if (host["native"]) {
            return;
          }

          el.value = "";
          methods_1.toggleOptions(host, true);
        }),
        blur: observeEvent_1["default"](el, "blur").subscribe(function () {
          if (host["native"]) {
            return;
          }

          var overlay = host.elements.overlay;
          var selectedOption = query_1.findIn(overlay, ".select-option.selected");
          host.value = selectedOption ? selectedOption.value : "";
          exports.setLabel(host);
          requestAnimationFrame(overlay.hide);
        }),
        keydown: observeEvent_1["default"](el, "keydown").subscribe(function (e) {
          if (host["native"]) {
            return;
          }

          var overlay = host.elements.overlay;
          var key = get_1["default"](e, "key", "").toLowerCase();

          var newSelection = function newSelection(option) {
            methods_1.setSelectedOption(host, option);
          };

          if (["arrowup", "arrowdown"].indexOf(key) > -1) {
            e.preventDefault();
            var $options = query_1.findIn(overlay, ".select-option:not(.filtered-out)", true);
            var $previous = void 0;
            var $next = void 0;
            var $newSelected = void 0;

            for (var i = 0; i < $options.length; i++) {
              var $option = $options[i];
              var isSelected = $option.classList.contains("selected");
              methods_1.setUnselectedOption($option);

              if (isSelected) {
                $previous = $options[i - 1] ? $options[i - 1] : $options[i];
                $next = $options[i + 1] ? $options[i + 1] : $options[i];
                break;
              }
            }

            if (!$previous && !$next) {
              $previous = $next = $options[0];
            }

            if (key === "arrowup") {
              $newSelected = $previous;
            } else if (key === "arrowdown") {
              $newSelected = $next;
            }

            if ($newSelected && !$newSelected.classList.contains("selected")) {
              newSelection($newSelected);
            }
          }

          if (key === "enter") {
            var visibleOptions = query_1.findIn(overlay, ".select-option:not(.filtered-out)", true);

            if (visibleOptions.length === 1) {
              newSelection(visibleOptions[0]);
            }

            el.blur();
          }

          if (key === "escape") {
            Array.from(query_1.findIn(overlay, ".select-option.selected", true)).forEach(function (o) {
              return o.classList.remove("selected");
            });
            var selected = host.selectedOptionElement;

            if (selected) {
              selected.classList.add("selected");
            }

            el.blur();
          }
        }),
        input: observeEvent_1["default"](el, "input").subscribe(function () {
          host["native"] ? undefined : methods_1.filter(host, el.value);
        })
      };
    }
  },
  overlay: {
    selector: "overlay-content",
    onChange: function onChange(el, host) {
      var filter = host.elements.filter;

      if (filter) {
        el.target = host.elements.filter;
      }

      var loop = function loop() {
        if (!el || !el.parentNode) {
          return;
        }

        if (el.state && el.state.showing) {
          return el.state.showing.subscribe(function (e) {
            methods_1.toggleOptions(host, e);
          });
        }

        requestAnimationFrame(loop);
      };

      loop();
    }
  },
  label: {
    selector: ".dropdown-select-label",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = el.eventSubscriptions ? el.eventSubscriptions : {};
      el.eventSubscriptions.click = observeEvent_1["default"](el, "click").subscribe(function () {
        return methods_1.toggleOptions(host, true);
      });
    }
  },
  arrow: {
    selector: ".dropdown-select-arrow",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        click: observeEvent_1["default"](el, "click").subscribe(function () {
          return methods_1.toggleOptions(host, true);
        })
      };
    }
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: function onChange(_el, host) {
      return exports.setStyles(host);
    }
  }
};

exports.setInput = function (host) {
  var filter = host.elements.filter;
  var overlay = host.elements.overlay;

  if (filter && overlay) {
    overlay.target = host.elements.root;
  }
};

exports.setLabel = function (host) {
  if (!!host.statictext) {
    return replace_element_contents_1["default"](host.elements.label, html_1["default"](host.statictext, [], ["script"]).sanitized || "");
  }

  var formatFunction = host.formatvaluelabel && typeof host.formatvaluelabel === "function" ? host.formatvaluelabel : function (o) {
    return o.label;
  };
  var emptyOption = host.emptyoption ? host.emptyoption : "";
  var option = !host.options ? {
    value: "",
    label: emptyOption
  } : host.options[host.selectedIndex];
  var label = option ? formatFunction(option) : host.showempty ? emptyOption : "";
  replace_element_contents_1["default"](host.elements.label, html_1["default"](label, [], ["script"]).sanitized || "");
};

exports.setStyles = function (host) {
  var el = host.elements.injectedStyles;

  if (!el) {
    return;
  }

  var labelSize = ".dropdown-select-container .dropdown-select-label{font-size:" + host.labelsize + ";}";
  var optionColors = ".dropdown-select-container overlay-content .select-option{font-size:" + host.optionsize + ";color:" + host.optioncolor + ";background-color:" + host.optionbackground + ";}";
  var optionSelectedColors = ".dropdown-select-container overlay-content .select-option.selected,.dropdown-select-container overlay-content .select-option:hover{color:" + host.optionselectedcolor + ";background-color:" + host.optionselectedbackground + ";}";
  var styles = "" + host.styles + optionColors + optionSelectedColors + labelSize;
  set_style_rules_1["default"](el, styles);
};

exports["default"] = exports.elements;

/***/ }),

/***/ "./src/components/dropdown-select/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var properties_1 = __webpack_require__("./src/components/dropdown-select/properties.ts");

var elements_1 = __webpack_require__("./src/components/dropdown-select/elements.ts");

var methods_1 = __webpack_require__("./src/components/dropdown-select/methods.ts");

__webpack_require__("./src/components/overlay-content/index.ts");

__webpack_require__("./src/components/dropdown-select/style.scss");

var style = __webpack_require__("./src/components/dropdown-select/style.scss").toString();

var formatter = function formatter(host, value, key) {
  if (value === undefined && typeof host.state[key].value === "function") {
    return;
  }

  var formatted = host.properties[key].format(value);

  if (formatted !== host.state[key].value) {
    host.state[key].next(formatted);
  }
};

var template = __webpack_require__("./src/components/dropdown-select/index.html");

var componentName = "dropdown-select";
var componentRoot = "." + componentName + "-container";
var DropdownSelect =
/*#__PURE__*/
constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: properties_1.observedAttributes,
  properties: properties_1.properties,
  elements: elements_1["default"],
  methods: {
    focus: methods_1.focus,
    blur: methods_1.blur
  },
  computed: {
    selectedIndex: properties_1.selectedIndex,
    selectedOptionElement: properties_1.selectedOptionElement,
    optionElements: properties_1.optionElements
  },
  setters: {
    formatlabel: function formatlabel(host) {
      return function (value) {
        return formatter(host, value, "formatlabel");
      };
    },
    formatvalue: function formatvalue(host) {
      return function (value) {
        return formatter(host, value, "formatvalue");
      };
    },
    formatvaluelabel: function formatvaluelabel(host) {
      return function (value) {
        return formatter(host, value, "formatvaluelabel");
      };
    }
  },
  onReady: function onReady(host) {
    return methods_1.initInput(host);
  }
});
define_1["default"](componentName, DropdownSelect);
exports["default"] = DropdownSelect;

/***/ }),

/***/ "./src/components/dropdown-select/methods.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var query_1 = __webpack_require__("./src/utils/html/query.ts");

var elements_1 = __webpack_require__("./src/components/dropdown-select/elements.ts");

var replace_element_contents_1 = __webpack_require__("./src/utils/html/replace-element-contents.ts");

var html_1 = __webpack_require__("./src/utils/validate/html.ts");

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

exports.dispatch = function (host, type) {
  return host.dispatchEvent(new CustomEvent(type, {
    detail: host
  }));
};

exports.initInput = function (host) {
  exports.setSelectOptions(host);
  elements_1.setInput(host);
  elements_1.setLabel(host);
};

var setOptions = function setOptions(input, options, emptySelect, optionTag) {
  if (optionTag === void 0) {
    optionTag = "option";
  }

  if (!input || !options) {
    return;
  }

  var optionElements = [];

  var createOption = function createOption(option) {
    var optionElement = document.createElement(optionTag);
    optionElement.className = "select-option" + (!!option["class"] ? " " + option["class"] : "");
    optionElement["value"] = option.value;
    optionElement.innerHTML = html_1["default"](option.label, [], ["script"]).sanitized || "";
    optionElements.push(optionElement);
  };

  if (emptySelect !== false) {
    createOption({
      value: "",
      label: emptySelect,
      "class": 'blank'
    });
  }

  options.forEach(function (option) {
    return createOption(option);
  });
  replace_element_contents_1["default"](input, optionElements);

  if (optionTag !== "option") {
    optionElements.forEach(function (optionElement) {
      var link = !!optionElement.href ? optionElement : optionElement.querySelector("a");
      optionElement.eventSubscriptions = {
        mousedown: observeEvent_1["default"](optionElement, "mousedown").subscribe(function () {
          optionElements.forEach(function (o) {
            return o.classList.remove("selected");
          });
          optionElement.classList.add("selected");
          input.value = optionElement.value;
          input.dispatchEvent(new Event("input"));
          optionElement.dispatchEvent(new Event("click"));

          if (link) {
            link.click();
          }
        })
      };
    });
  }

  return {
    input: input,
    options: options,
    optionElements: optionElements
  };
};

exports.scrollToSelectedOption = function (overlay, option) {
  if (!overlay || !option) {
    return;
  }

  var optionBox = option.getBoundingClientRect();
  var containerPosition = overlay.position;
  var optionTop = optionBox.top - containerPosition.top;
  var optionBottom = optionBox.height + optionTop;

  if (optionBottom > containerPosition.height) {
    overlay.scrollContent(0, containerPosition.scrollTop + (optionBottom - containerPosition.height));
  }

  if (optionTop < 0) {
    overlay.scrollContent(0, containerPosition.scrollTop + optionTop);
  }
};

exports.setSelectedOption = function (host, option) {
  option.classList.add("selected");
  exports.scrollToSelectedOption(host.elements.overlay, option);
};

exports.setUnselectedOption = function (option) {
  option.classList.remove("selected");
};

exports.toggleOptions = function (host, show) {
  var overlay = host.elements.overlay;
  var root = host.elements.root;

  if (!root || !overlay) {
    return;
  }

  if (show && overlay.showing) {
    return;
  }

  var options = Array.from(query_1.findIn(overlay, ".select-option", true));
  var selectedOption;
  options.forEach(function (option) {
    option.classList.remove("filtered-out");

    if (host.value === option.value) {
      selectedOption = option;
      exports.setSelectedOption(host, option);
    } else {
      exports.setUnselectedOption(option);
    }
  });
  root.classList[show ? "add" : "remove"]("hidden-label");
  overlay[show ? "show" : "hide"]().then(function () {
    exports.scrollToSelectedOption(overlay, selectedOption);
  });

  if (!show) {
    root.classList.remove("opened");
    host.elements.filter.blur();
  } else {
    root.classList.add("opened");
    host.elements.filter.focus();
  }

  host.dispatchEvent(new CustomEvent(show ? "selectopen" : "selectclose", {
    detail: host
  }));
};

exports.filter = function (host, value) {
  var filterValue = (value || "").toLowerCase();
  var options = Array.from(query_1.findIn(host.elements.overlay, ".select-option", true));
  var emptyFilter = filterValue === "";
  options.forEach(function (o) {
    var label = o.textContent.toLowerCase();

    if (!emptyFilter) {
      if (label === filterValue || label.indexOf(filterValue) > -1) {
        o.classList.remove('filtered-out');
      } else {
        o.classList.add('filtered-out');
      }
    } else {
      o.classList.remove('filtered-out');
    }
  });
};

exports.setSelectOptions = function (host) {
  if (!host.ready) {
    return;
  }

  var overlay = host.elements.overlay;
  var options = host.options.map(function (o) {
    return {
      value: host.formatvalue(o),
      label: host.formatlabel(o)
    };
  });
  setOptions(host.elements.input, options, host.emptyoption);
  setOptions(overlay, options, host.emptyoption, "div");
};

exports.focus = function (host) {
  return function () {
    return host["native"] ? host.elements.input.focus() : host.elements.filter.focus();
  };
};

exports.blur = function (host) {
  return function () {
    return host["native"] ? host.elements.input.blur() : host.elements.filter.blur();
  };
};

/***/ }),

/***/ "./src/components/dropdown-select/properties.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var if_not_1 = __webpack_require__("./src/utils/convert/if_not.ts");

var if_is_1 = __webpack_require__("./src/utils/convert/if_is.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var methods_1 = __webpack_require__("./src/components/dropdown-select/methods.ts");

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var attr_1 = __webpack_require__("./src/utils/html/attr.ts");

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

var options_1 = __webpack_require__("./src/utils/convert/options.ts");

var platform_1 = __webpack_require__("./src/utils/platform/index.ts");

var methods_2 = __webpack_require__("./src/components/dropdown-select/methods.ts");

var elements_1 = __webpack_require__("./src/components/dropdown-select/elements.ts");

var query_1 = __webpack_require__("./src/utils/html/query.ts");

var indexof_1 = __webpack_require__("./src/utils/convert/indexof.ts");

var function_1 = __webpack_require__("./src/utils/convert/function.ts");

var utils_1 = __webpack_require__("./src/utils/index.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var attributes = {
  arrow: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], indexof_1["default"](["right", "left", "true", "false"]), if_invalid_1["default"]("true"), if_is_1["default"]("true", "right"))(val).value;
    },
    onChange: function onChange(val, host) {
      return host.elements.root.setAttribute("arrow", val);
    }
  },
  "class": component_class_object_1["default"],
  disabled: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_not_1["default"](true, null))(val).value;
    },
    onChange: function onChange(val, host) {
      host.elements.root.classList[val ? "add" : "remove"]("disabled");
      attr_1.addRemoveAttr(host.elements.input, "disabled", val);
    }
  },
  disablefilter: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: function onChange(val, host) {
      return host.elements.root.classList[val ? "add" : "remove"]("disablefilter");
    }
  },
  statictext: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](""))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_1.setLabel(host);
    }
  },
  showempty: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](true))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_1.setLabel(host);
    }
  },
  emptyoption: {
    format: function format(val) {
      return val === false || val === "false" ? false : val === undefined ? "Select..." : val;
    },
    onChange: function onChange(_val, host) {
      return methods_1.setSelectOptions(host);
    }
  },
  hideonfilter: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](true))(val).value;
    },
    onChange: function onChange(val, host) {
      return host.elements.root.classList[val ? "add" : "remove"]("hidefilteredout");
    }
  },
  multiple: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: function onChange(val, host) {
      attr_1.addRemoveAttr(host.elements.input, "multiple", val);
    }
  },
  name: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(val, host) {
      attr_1.addRemoveAttr(host.elements.input, "name", val);
    }
  },
  "native": {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"]( false || platform_1.isMobile))(val).value;
    },
    onChange: function onChange(val, host) {
      host.elements.root.classList[val ? "add" : "remove"]("native-select");
    }
  },
  options: {
    format: function format(val) {
      return pipe_1["default"](options_1.Options, if_invalid_1["default"]([]))(val).value;
    },
    onChange: function onChange(_val, host) {
      return methods_1.setSelectOptions(host);
    }
  },
  formatlabel: {
    format: function format(val) {
      return pipe_1["default"](function_1.ToFunction, if_invalid_1["default"](function (v) {
        return v.label;
      }))(val).value;
    },
    onChange: function onChange(_val, host) {
      return methods_1.setSelectOptions(host);
    }
  },
  formatvaluelabel: {
    format: function format(val) {
      return typeof val === "function" ? val : function (v) {
        return v.label;
      };
    },
    onChange: function onChange(_val, host) {
      return methods_1.setSelectOptions(host);
    }
  },
  formatvalue: {
    format: function format(val) {
      return pipe_1["default"](function_1.ToFunction, if_invalid_1["default"](function (v) {
        return v.value;
      }))(val).value;
    },
    onChange: function onChange(_val, host) {
      return methods_1.setSelectOptions(host);
    }
  },
  readonly: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_not_1["default"](true, null))(val).value;
    },
    onChange: function onChange(val, host) {
      host.elements.root.classList[val ? "add" : "remove"]("readonly");
      attr_1.addRemoveAttr(host.elements.input, "readonly", val);
    }
  },
  required: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_not_1["default"](true, null))(val).value;
    },
    onChange: function onChange(val, host) {
      attr_1.addRemoveAttr(host.elements.input, "required", val);
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(_val, host) {
      return elements_1.setStyles(host);
    }
  },
  tabindex: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](-1))(val).value;
    },
    onChange: function onChange(val, host) {
      attr_1.addRemoveAttr(host.elements.input, "tabindex", val);
    }
  },
  value: {
    format: function format(val) {
      return val;
    },
    onChange: function onChange(_val, host) {
      var overlay = host.elements.overlay;

      if (overlay && typeof overlay.hide === "function") {
        overlay.hide();
      }

      elements_1.setLabel(host);
      methods_2.dispatch(host, "input");
    }
  },
  optioncolor: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("inherit"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_1.setStyles(host);
    }
  },
  optionbackground: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("#fafafa"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_1.setStyles(host);
    }
  },
  optionselectedcolor: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("#fff"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_1.setStyles(host);
    }
  },
  optionselectedbackground: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("#59a2d8"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_1.setStyles(host);
    }
  },
  labelsize: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("inherit"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_1.setStyles(host);
    }
  },
  optionsize: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("inherit"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_1.setStyles(host);
    }
  }
};
exports.properties = Object.assign({}, attributes);
exports.observedAttributes = Object.keys(attributes);

exports.selectedIndex = function (host) {
  return {
    get: function get() {
      if (!host.options || !host.options.length) {
        return undefined;
      }

      var parsed = pipe_1["default"](utils_1.ToJSON, to_string_1["default"])(host.value);

      if (parsed.type === "undefined" || parsed.value === "" || parsed.value === "\"\"") {
        if (host.emptyoption === false) {
          host.value = host.formatvalue(host.options[0]);
          return 0;
        }

        return undefined;
      }

      var i = 0;

      while (i < host.options.length) {
        var formatted = host.formatvalue(host.options[i]);
        var val = pipe_1["default"](utils_1.ToJSON, to_string_1["default"])(formatted).value;

        if (val === parsed.value) {
          return i;
        }

        i = i + 1;
      }

      return;
    }
  };
};

exports.selectedOptionElement = function (host) {
  return {
    get: function get() {
      var overlay = host.elements.overlay;

      if (!overlay) {
        return;
      }

      return Array.from(query_1.findIn(overlay, ".select-option", true))[host.selectedIndex + (host.emptyoption !== false ? 1 : 0)];
    }
  };
};

exports.optionElements = function (host) {
  return {
    get: function get() {
      var overlay = host.elements.overlay;

      if (!overlay) {
        return [];
      }

      return Array.from(query_1.findIn(overlay, ".select-option", true));
    }
  };
};

/***/ }),

/***/ "./src/components/effect-bounce-z/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var properties_1 = __webpack_require__("./src/components/effect-bounce-z/properties.ts");

var methods_1 = __webpack_require__("./src/components/effect-bounce-z/methods.ts");

var template = __webpack_require__("./src/components/effect-bounce-z/index.html");

var componentName = "effect-bounce-z";
var componentRoot = ".effect-push-container";
var EffectBounceZ =
/*#__PURE__*/
constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  observedAttributes: properties_1.observedAttributes,
  properties: properties_1.properties,
  methods: {
    trigger: methods_1.trigger
  },
  onDisconnected: function onDisconnected(host) {
    return methods_1.unloadTargets(host);
  }
});
define_1["default"](componentName, EffectBounceZ);
exports["default"] = EffectBounceZ;

/***/ }),

/***/ "./src/components/effect-bounce-z/methods.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var curve_1 = __webpack_require__("./src/utils/curve/index.ts");

var timer_1 = __webpack_require__("./src/services/timer.ts");

var getDimension = function getDimension(target) {
  var max = Math.max(target.offsetWidth, target.offsetHeight);
  var min = Math.min(target.offsetWidth, target.offsetHeight);
  return (max - min) / 2 + min;
};

var runStart = function runStart(host) {
  return function () {
    if (host.on || !host.targets || !host.ready) {
      return;
    }

    host.on = true;
    timer_1["default"](host.speed, function (scale) {
      var set = function set(el) {
        var dimension = getDimension(el);
        var scaleFactor = (dimension - scale) / dimension;
        el.style.transform = "perspective(1px) translateZ(0) scaleX(" + scaleFactor + ") scaleY(" + scaleFactor + ")";
      };

      host.targets.forEach(function (target) {
        return Array.isArray(target) ? target.forEach(set) : set(target);
      });
    }, curve_1.GetCurve([1, -host.amount, -host.amount * 1.125, 1], 0.5, false, host.speed), function () {
      var set = function set(el) {
        return el.style.removeProperty("transform");
      };

      host.targets.forEach(function (target) {
        return Array.isArray(target) ? target.forEach(set) : set(target);
      });
      host.on = false;
    });
  };
};

exports.trigger = function (host) {
  return runStart(host);
};

exports.unloadTargets = function (host) {
  if (!host.targets$ || !host.ready) {
    return;
  }

  host.targets$.forEach(function (ob$) {
    return ob$();
  });
  host.targets$ = [];
};

exports.loadTargets = function (host) {
  if (!host.targets || !host.start) {
    return;
  }

  var set = function set(el) {
    el.style.transformStyle = 'preserve-3d';
    el.style.backfaceVisibility = "hidden";
    host.targets$.push(observeEvent_1["default"](el, host.start).subscribe(runStart(host)));
  };

  host.targets.forEach(function (target) {
    if (Array.isArray(target)) {
      return target.forEach(set);
    }

    set(target);
  });
};

/***/ }),

/***/ "./src/components/effect-bounce-z/properties.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

var methods_1 = __webpack_require__("./src/components/effect-bounce-z/methods.ts");

var dom_1 = __webpack_require__("./src/utils/convert/dom.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var resetTargets = function resetTargets(host) {
  methods_1.unloadTargets(host);
  methods_1.loadTargets(host);
};

var onChange = function onChange() {};

var selectorsToDom = function selectorsToDom(val) {
  return dom_1.SelectorArrayToElements(null, val).value;
};

var attributes = {
  amount: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](0))(val).value;
    },
    onChange: onChange
  },
  "class": component_class_object_1["default"],
  speed: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](300))(val).value;
    },
    onChange: onChange
  },
  start: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("mousedown"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return resetTargets(host);
    }
  },
  targets: {
    format: selectorsToDom,
    onChange: function onChange(_val, host) {
      return resetTargets(host);
    }
  }
};
exports.properties = Object.assign({
  targets$: {
    format: function format(_val) {
      return [];
    },
    onChange: onChange
  }
}, attributes);
exports.observedAttributes = Object.keys(attributes);

/***/ }),

/***/ "./src/components/effect-fade/elements.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elementSelectors = {
  root: ".effect-fade-container"
};
var elements = {};
Object.keys(exports.elementSelectors).forEach(function (key) {
  elements[key] = {
    selector: exports.elementSelectors[key],
    onChange: function onChange() {}
  };
});
exports["default"] = elements;

/***/ }),

/***/ "./src/components/effect-fade/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var properties_1 = __webpack_require__("./src/components/effect-fade/properties.ts");

var methods_1 = __webpack_require__("./src/components/effect-fade/methods.ts");

var elements_1 = __webpack_require__("./src/components/effect-fade/elements.ts");

__webpack_require__("./src/components/effect-fade/style.scss");

var style = __webpack_require__("./src/components/effect-fade/style.scss").toString();

var template = __webpack_require__("./src/components/effect-fade/index.html");

var componentName = "effect-fade";
var componentRoot = ".effect-fade-container";
var EffectFade =
/*#__PURE__*/
constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: properties_1.observedAttributes,
  properties: properties_1.properties,
  elements: elements_1["default"],
  methods: {
    toggle: methods_1.toggle,
    open: methods_1.open,
    close: methods_1.close
  },
  computed: {
    hasTargets: properties_1.hasTargets,
    hasTriggers: properties_1.hasTriggers,
    hasTriggers$: properties_1.hasTriggers$,
    hasStart: properties_1.hasStart,
    canLoadTriggers: properties_1.canLoadTriggers,
    canStart: properties_1.canStart,
    canEnd: properties_1.canEnd,
    canRunStart: properties_1.canRunStart,
    canRunEnd: properties_1.canRunEnd
  },
  onReady: function onReady(host) {
    methods_1.unloadTriggers(host);
    methods_1.loadTriggers(host);
  },
  onDisconnected: methods_1.unloadTriggers
});
define_1["default"](componentName, EffectFade);
exports["default"] = EffectFade;

/***/ }),

/***/ "./src/components/effect-fade/methods.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var curve_1 = __webpack_require__("./src/utils/curve/index.ts");

var timer_1 = __webpack_require__("./src/services/timer.ts");

var runAnimation = function runAnimation(host, isOn) {
  timer_1["default"](host.speed, function (opacity) {
    var set = function set(el) {
      return el.style.opacity = opacity;
    };

    host.targets.forEach(function (target) {
      return Array.isArray(target) ? target.forEach(set) : set(target);
    });
  }, curve_1.GetCurve(isOn ? host.opacity.slice() : host.opacity.slice().reverse(), isOn ? host.spring : 0.5, false, host.speed), function () {
    var set = function set(el) {
      return el.style.opacity = isOn ? 1 : 0;
    };

    host.targets.forEach(function (target) {
      return Array.isArray(target) ? target.forEach(set) : set(target);
    });
  });
};

var runEnd = function runEnd(host) {
  return function () {
    if (!host.canRunEnd) {
      return;
    }

    host.on = false;
    runAnimation(host, false);
  };
};

var runStart = function runStart(host) {
  return function () {
    if (!host.canRunStart) {
      return;
    }

    host.on = true;
    runAnimation(host, true);
  };
};

exports.toggle = function (host) {
  return host.on ? runEnd(host) : runStart(host);
};

exports.open = function (host) {
  return runStart(host);
};

exports.close = function (host) {
  return runEnd(host);
};

exports.unloadTriggers = function (host) {
  if (!host.hasTriggers$) {
    return;
  }

  host.triggers$.forEach(function (ob$) {
    return ob$();
  });
  host.triggers$ = [];
};

exports.loadTriggers = function (host) {
  if (!host.canLoadTriggers) {
    return;
  }

  var set = function set(el) {
    host.triggers$.push(observeEvent_1["default"](el, host.start, {
      useCapture: true
    }).subscribe(runStart(host)));

    if (host.canEnd) {
      host.triggers$.push(observeEvent_1["default"](el, host.end).subscribe(runEnd(host)));
    }
  };

  host.triggers.forEach(function (trigger) {
    if (Array.isArray(trigger)) {
      return trigger.forEach(set);
    }

    set(trigger);
  });
};

/***/ }),

/***/ "./src/components/effect-fade/properties.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var map_1 = __webpack_require__("./src/utils/convert/map.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

var methods_1 = __webpack_require__("./src/components/effect-fade/methods.ts");

var dom_1 = __webpack_require__("./src/utils/convert/dom.ts");

var commas_to_array_1 = __webpack_require__("./src/utils/convert/commas-to-array.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var resetTriggers = function resetTriggers(host) {
  methods_1.unloadTriggers(host);
  methods_1.loadTriggers(host);
};

var onChange = function onChange() {};

var selectorsToDom = function selectorsToDom(val) {
  return dom_1.SelectorArrayToElements(null, commas_to_array_1["default"](val).value).value;
};

var attributes = {
  end: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(_val, host) {
      return resetTriggers(host);
    }
  },
  opacity: {
    format: function format(val) {
      return pipe_1["default"](commas_to_array_1["default"], if_invalid_1["default"]([0, 1]), map_1["default"](function (v) {
        return to_number_1["default"](v).value;
      }))(val).value;
    },
    onChange: onChange
  },
  speed: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](600))(val).value;
    },
    onChange: onChange
  },
  start: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("mousedown"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return resetTriggers(host);
    }
  },
  targets: {
    format: selectorsToDom,
    onChange: function onChange(_val, host) {
      return resetTriggers(host);
    }
  },
  triggers: {
    format: selectorsToDom,
    onChange: function onChange(_val, host) {
      return resetTriggers(host);
    }
  },
  "class": component_class_object_1["default"]
};
exports.properties = Object.assign({
  on: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: onChange
  },
  triggers$: {
    format: function format(_val) {
      return [];
    },
    onChange: onChange
  }
}, attributes);
exports.observedAttributes = Object.keys(attributes);

exports.hasTargets = function (host) {
  return {
    get: function get() {
      return !!host.ready && !!host.targets && Array.isArray(host.targets) && !!host.targets.length;
    }
  };
};

exports.hasTriggers = function (host) {
  return {
    get: function get() {
      return !!host.ready && !!host.triggers && Array.isArray(host.triggers) && !!host.triggers.length;
    }
  };
};

exports.hasTriggers$ = function (host) {
  return {
    get: function get() {
      return !!host.triggers$ && Array.isArray(host.triggers$);
    }
  };
};

exports.hasStart = function (host) {
  return {
    get: function get() {
      return !!host.start;
    }
  };
};

exports.canStart = function (host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasStart && host.start !== "none";
    }
  };
};

exports.canEnd = function (host) {
  return {
    get: function get() {
      return host.hasTargets && !!host.end && host.end !== "none";
    }
  };
};

exports.canRunStart = function (host) {
  return {
    get: function get() {
      return host.hasTargets;
    }
  };
};

exports.canRunEnd = function (host) {
  return {
    get: function get() {
      return host.hasTargets;
    }
  };
};

exports.canLoadTriggers = function (host) {
  return {
    get: function get() {
      return host.hasTriggers && host.hasTriggers$ && host.hasStart;
    }
  };
};

/***/ }),

/***/ "./src/components/effect-ripple/elements.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

exports.elementSelectors = {
  root: ".effect-ripple-container",
  ripple: ".ripple",
  injectedStyles: "style.injectedStyles"
};

exports.setStyles = function (el, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles);
};

var elements = {};
Object.keys(exports.elementSelectors).forEach(function (key) {
  elements[key] = {
    selector: exports.elementSelectors[key],
    onChange: key === "injectedStyles" ? function (el, host) {
      return exports.setStyles(el, host.styles);
    } : function () {}
  };
});
exports["default"] = elements;

/***/ }),

/***/ "./src/components/effect-ripple/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var properties_1 = __webpack_require__("./src/components/effect-ripple/properties.ts");

var methods_1 = __webpack_require__("./src/components/effect-ripple/methods.ts");

var elements_1 = __webpack_require__("./src/components/effect-ripple/elements.ts");

__webpack_require__("./src/components/effect-ripple/style.scss");

var style = __webpack_require__("./src/components/effect-ripple/style.scss").toString();

var template = __webpack_require__("./src/components/effect-ripple/index.html");

var componentName = "effect-ripple";
var componentRoot = ".effect-ripple-container";
var EffectRipple =
/*#__PURE__*/
constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: properties_1.observedAttributes,
  properties: properties_1.properties,
  elements: elements_1["default"],
  methods: {
    trigger: methods_1.trigger
  },
  computed: {
    hasTargets: properties_1.hasTargets,
    hasTargets$: properties_1.hasTargets$,
    hasStart: properties_1.hasStart,
    canLoadTargets: properties_1.canLoadTargets,
    canStart: properties_1.canStart,
    nonAutoOrigin: properties_1.nonAutoOrigin
  },
  onDisconnected: function onDisconnected(host) {
    return methods_1.unloadTargets(host);
  }
});
define_1["default"](componentName, EffectRipple);
exports["default"] = EffectRipple;

/***/ }),

/***/ "./src/components/effect-ripple/methods.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var curve_1 = __webpack_require__("./src/utils/curve/index.ts");

var timer_1 = __webpack_require__("./src/services/timer.ts");

var maxScale = 1.3;

var runStart = function runStart(host) {
  if (!host.ready || host.isRunning) {
    return;
  }

  host.isRunning = true;
  var rippleInner = document.createElement("span");
  var style = rippleInner.style;
  rippleInner.className = "ripple-inner";
  rippleInner.style.backgroundColor = host.color;
  host.elements.ripple.appendChild(rippleInner);
  setOrigin(host, rippleInner);
  timer_1["default"](host.speed, function (scale) {
    var scaleAmount = Math.max(Math.min(maxScale, scale), 0);
    style.transform = "perspective(1px) translateZ(0) scaleX(" + scaleAmount + ") scaley(" + scaleAmount + ")";
  }, curve_1.GetCurve([0, maxScale], 0, false, host.speed));
  timer_1["default"](host.speed, function (opacity) {
    return style.opacity = "" + Math.max(Math.min(1, opacity), 0);
  }, curve_1.GetCurve([host.opacity * 0.5, host.opacity, host.opacity * 0.5, host.opacity * 0.125, host.opacity * 0.03, 0], 0, false, host.speed), function () {
    requestAnimationFrame(function () {
      host.elements.ripple.removeChild(rippleInner);
      host.isRunning = false;
    });
  });
};

var setOrigin = function setOrigin(host, rippleInner) {
  if (!host.ready) {
    return;
  }

  var nonAutoOrigin = host.nonAutoOrigin;
  var rippleInnerStyle = rippleInner.style;

  if (nonAutoOrigin) {
    return rippleInnerStyle.transformOrigin = nonAutoOrigin;
  }

  if (!host.downEvent || !host.downEvent.target) {
    return rippleInnerStyle.transformOrigin = "50% 50%";
  }

  var eventX = host.downEvent.x;
  var eventY = host.downEvent.y;
  var targetBox = host.downEvent.target.getBoundingClientRect();
  var left = Math.round((eventX - targetBox.left) / targetBox.width * 100);
  var top = Math.round((eventY - targetBox.top) / targetBox.height * 100);
  rippleInnerStyle.transformOrigin = left + "% " + top + "%";
};

exports.trigger = function (host) {
  return function () {
    return runStart(host);
  };
};

exports.unloadTargets = function (host) {
  if (!host.hasTargets$) {
    return;
  }

  host.targets$.forEach(function (ob$) {
    return ob$();
  });
  host.targets$ = [];
};

exports.loadTargets = function (host) {
  if (!host.targets || !host.start) {
    return;
  }

  host.targets.forEach(function (target) {
    host.targets$.push(observeEvent_1["default"](target, "mousedown").subscribe(function (e) {
      return host.downEvent = e;
    }));
    host.targets$.push(observeEvent_1["default"](target, host.start).subscribe(function () {
      return runStart(host);
    }));
  });
};

/***/ }),

/***/ "./src/components/effect-ripple/properties.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

var methods_1 = __webpack_require__("./src/components/effect-ripple/methods.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var dom_1 = __webpack_require__("./src/utils/convert/dom.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var elements_1 = __webpack_require__("./src/components/effect-ripple/elements.ts");

var resetTargets = function resetTargets(host) {
  methods_1.unloadTargets(host);
  methods_1.loadTargets(host);
};

var onChange = function onChange() {};

var selectorsToDom = function selectorsToDom(val) {
  return dom_1.SelectorArrayToElements(null, val).value;
};

var attributes = {
  "class": component_class_object_1["default"],
  color: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("#59a2d8"))(val).value;
    },
    onChange: onChange
  },
  opacity: {
    format: function format(val) {
      return Math.min(1, Math.max(0, pipe_1["default"](to_number_1["default"], if_invalid_1["default"](0.2))(val).value));
    },
    onChange: onChange
  },
  speed: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](600))(val).value;
    },
    onChange: onChange
  },
  start: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("mousedown"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return resetTargets(host);
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return elements_1.setStyles(host.elements.injectedStyles, val);
    }
  },
  direction: {
    format: function format(val) {
      return typeof val === "string" ? val : "auto";
    },
    onChange: function onChange() {}
  },
  targets: {
    format: selectorsToDom,
    onChange: function onChange(_val, host) {
      return resetTargets(host);
    }
  }
};
exports.properties = Object.assign({
  downEvent: {
    format: function format(val) {
      return val;
    },
    onChange: onChange
  },
  targets$: {
    format: function format(_val) {
      return [];
    },
    onChange: onChange
  }
}, attributes);
exports.observedAttributes = Object.keys(attributes);

exports.hasTargets = function (host) {
  return {
    get: function get() {
      return host.ready && !!host.targets && Array.isArray(host.targets) && !!host.targets.length;
    }
  };
};

exports.hasTargets$ = function (host) {
  return {
    get: function get() {
      return host.hasTargets && host.targets$ && Array.isArray(host.targets$);
    }
  };
};

exports.hasStart = function (host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && !!host.start;
    }
  };
};

exports.canStart = function (host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.start && host.start !== "none";
    }
  };
};

exports.nonAutoOrigin = function (host) {
  return {
    get: function get() {
      return host.downEvent === undefined || host.downEvent && !host.downEvent.target || host.direction !== undefined && host.direction !== "auto" ? host.direction === "to left" ? "100% center" : ["center", "auto"].indexOf(host.direction) > -1 ? "center center" : "0% center" : false;
    }
  };
};

exports.canLoadTargets = function (host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.hasStart;
    }
  };
};

/***/ }),

/***/ "./src/components/effect-scale/elements.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elementSelectors = {
  root: ".effect-scale-container"
};
var elements = {};
Object.keys(exports.elementSelectors).forEach(function (key) {
  elements[key] = {
    selector: exports.elementSelectors[key],
    onChange: function onChange() {}
  };
});
exports["default"] = elements;

/***/ }),

/***/ "./src/components/effect-scale/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var properties_1 = __webpack_require__("./src/components/effect-scale/properties.ts");

var methods_1 = __webpack_require__("./src/components/effect-scale/methods.ts");

var elements_1 = __webpack_require__("./src/components/effect-scale/elements.ts");

__webpack_require__("./src/components/effect-scale/style.scss");

var style = __webpack_require__("./src/components/effect-scale/style.scss").toString();

var template = __webpack_require__("./src/components/effect-scale/index.html");

var componentName = "effect-scale";
var componentRoot = ".effect-scale-container";
var EffectScale =
/*#__PURE__*/
constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: properties_1.observedAttributes,
  properties: properties_1.properties,
  elements: elements_1["default"],
  computed: {
    hasTargets: function hasTargets(host) {
      return {
        get: function get() {
          return !!host.targets && host.targets.length && typeof host.targets.forEach === "function";
        }
      };
    },
    hasTriggers: function hasTriggers(host) {
      return {
        get: function get() {
          return !!host.triggers && host.triggers.length && typeof host.triggers.forEach === "function";
        }
      };
    },
    hasScale: function hasScale(host) {
      return {
        get: function get() {
          return host.isScaling || host.isScaled;
        }
      };
    }
  },
  onReady: function onReady(host) {
    methods_1.run(host.scaled, host, true);
  },
  onDisconnected: function onDisconnected(host) {
    return methods_1.dispose(host);
  }
});
define_1["default"](componentName, EffectScale);
exports["default"] = EffectScale;

/***/ }),

/***/ "./src/components/effect-scale/methods.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var curve_1 = __webpack_require__("./src/utils/curve/index.ts");

var idealFPS = 60;

var frames = function frames(speed) {
  return Math.round(idealFPS * (speed / 1000));
};

var setTransform = function setTransform(element, X, Y, doX, doY, lastFrame, toScaledState) {
  element.style.transform = "perspective(1px) translateZ(0) scaleX(" + X + ") scaleY(" + Y + ")";

  if (doX === true) {
    element.style.width = "unset";
  }

  if (doY === true) {
    element.style.height = "unset";
  }

  if (lastFrame && !toScaledState) {
    return;
  }

  var box = element.getBoundingClientRect();

  if (doX === true) {
    element.style.width = lastFrame && !toScaledState ? "unset" : box.width + "px";
  }

  if (doY === true) {
    element.style.height = lastFrame && !toScaledState ? "unset" : box.height + "px";
  }
  /*
  if (doX === true) {
      const calculatedWidth = element.scrollWidth * X
      element.style.width = lastFrame && !toScaledState ? `unset` : `${calculatedWidth}px`
  }
   if (doY === true) {
      const calculatedHeight = element.scrollHeight * Y
      element.style.height = lastFrame && !toScaledState ? `unset` : `${calculatedHeight}px`
  }
  */

};

var transformElements = function transformElements(targets, X, Y, doX, doY, lastFrame, toScaledState) {
  targets.forEach(function (element) {
    if (Array.isArray(element)) {
      return element.forEach(function (el) {
        return setTransform(el, X, Y, doX, doY, lastFrame, toScaledState);
      });
    }

    setTransform(element, X, Y, doX, doY, lastFrame, toScaledState);
  });
};

var setStaticTransform = function setStaticTransform(targets) {
  var set = function set(el) {
    el.style.transformStyle = 'preserve-3d';
    el.style.backfaceVisibility = "hidden";
  };

  targets.forEach(function (element) {
    if (Array.isArray(element)) {
      return element.forEach(set);
    }

    set(element);
  });
};

var canNotRun = function canNotRun(host) {
  return host.ready !== true || !host.hasTargets || typeof host.x !== "boolean" || typeof host.y !== "boolean" || typeof host.scaled !== "boolean";
};

exports.run = function (scaled, host, quickSet) {
  if (quickSet === void 0) {
    quickSet = false;
  }

  if (canNotRun(host)) {
    return;
  }

  scaled = host.scaled;
  setStaticTransform(host.targets);
  var initial = 1;
  var amount = initial + host.amount;
  var startAmount = !scaled ? amount : initial;
  var endAmount = !scaled ? initial : amount;
  var scalePoints = curve_1.GetCurve([startAmount, endAmount], !scaled ? host.spring : 0.5, false, quickSet || host.isInitialized !== true ? 1 : frames(scaled ? host.speed * 0.618 : host.speed));
  host.isInitialized = true;

  var loop = function loop() {
    if (scaled !== host.scaled) {
      return;
    }

    var scale = scalePoints.shift();
    var lastFrame = !scalePoints.length;

    var getXY = function getXY(key) {
      return !!host[key] && lastFrame ? endAmount : !!host[key] ? scale : 1;
    };

    host.isScaling = lastFrame ? false : true;
    host.isScaled = scaled && lastFrame ? true : false;
    transformElements(host.targets, getXY("x"), getXY("y"), host.x, host.y, lastFrame, scaled);

    if (!lastFrame) {
      return requestAnimationFrame(loop);
    }
  };

  loop();
};

exports.setOrigin = function (val, host) {
  if (!host.hasTargets) {
    return;
  }

  var parts = val.split(" ");
  var x = parts[0];
  var y = parts.length > 1 ? parts[1] : parts[0];
  var origin = x + " " + y;
  host.targets.forEach(function (target) {
    if (Array.isArray(target)) {
      return target.forEach(function (element) {
        return element.style.transformOrigin = origin;
      });
    }

    target.style.transformOrigin = origin;
  });
};

exports.dispose = function (host) {
  unloadElements(host, "targets");
  unloadElements(host, "triggers");
};

var unloadElements = function unloadElements(host, key) {
  if (!host[key + "$"]) {
    return;
  }

  host[key + "$"].forEach(function (ob$) {
    return ob$();
  });
  host[key + "$"] = [];
};

var loadElements = function loadElements(host, key) {
  if (key === "targets") {
    return exports.run(host.scaled, host);
  }

  if (!host.hasTriggers || !host.start || !host.triggers$) {
    return;
  }

  var toggle = !host.end;

  var setEvents = function setEvents(trigger) {
    if (toggle) {
      return host.triggers$.push(observeEvent_1["default"](trigger, host.start).subscribe(function () {
        return host.scaled = !host.scaled;
      }));
    }

    host.triggers$.push(observeEvent_1["default"](trigger, host.start).subscribe(function () {
      return host.scaled = true;
    }));
    host.triggers$.push(observeEvent_1["default"](trigger, host.end).subscribe(function () {
      return host.scaled = false;
    }));
  };

  host.triggers.forEach(function (trigger) {
    if (Array.isArray(trigger)) {
      return trigger.forEach(setEvents);
    }

    setEvents(trigger);
  });
};

exports.unloadTargets = function (host) {
  return unloadElements(host, "targets");
};

exports.unloadTriggers = function (host) {
  return unloadElements(host, "triggers");
};

exports.loadTargets = function (host) {
  return loadElements(host, "targets");
};

exports.loadTriggers = function (host) {
  return loadElements(host, "triggers");
};

/***/ }),

/***/ "./src/components/effect-scale/properties.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var indexof_1 = __webpack_require__("./src/utils/convert/indexof.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

var methods_1 = __webpack_require__("./src/components/effect-scale/methods.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var dom_1 = __webpack_require__("./src/utils/convert/dom.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var reset = function reset(host) {
  methods_1.unloadTargets(host);
  methods_1.unloadTriggers(host);
  methods_1.loadTargets(host);
  methods_1.loadTriggers(host);
  methods_1.setOrigin(host.startfrom, host);
};

var directions = ["center", "center top", "center bottom", "left top", "left center", "left bottom", "right top", "right center", "right bottom"];

var onChange = function onChange() {};

var selectorsToDom = function selectorsToDom(val) {
  return dom_1.SelectorArrayToAllElements(null, val).value;
};

var attributes = {
  amount: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](-1))(val).value;
    },
    onChange: onChange
  },
  "class": component_class_object_1["default"],
  end: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(_val, host) {
      return reset(host);
    }
  },
  scaled: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(val, host) {
      return host.ready ? methods_1.run(val, host) : undefined;
    }
  },
  speed: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](333))(val).value;
    },
    onChange: onChange
  },
  spring: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](4))(val).value;
    },
    onChange: onChange
  },
  start: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("mousedown"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return reset(host);
    }
  },
  startfrom: {
    format: function format(val) {
      return pipe_1["default"](indexof_1["default"](directions), if_invalid_1["default"]("center"))(val).value;
    },
    onChange: methods_1.setOrigin
  },
  targets: {
    format: selectorsToDom,
    onChange: function onChange(_val, host) {
      return reset(host);
    }
  },
  triggers: {
    format: selectorsToDom,
    onChange: function onChange(_val, host) {
      return reset(host);
    }
  },
  x: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: onChange
  },
  y: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: onChange
  }
};
exports.properties = Object.assign({
  targets$: {
    format: function format() {
      return [];
    },
    onChange: onChange
  },
  triggers$: {
    format: function format() {
      return [];
    },
    onChange: onChange
  },
  isScaling: {
    format: function format(val) {
      return val;
    },
    onChange: onChange
  },
  isScaled: {
    format: function format(val) {
      return val;
    },
    onChange: onChange
  }
}, attributes);
exports.observedAttributes = Object.keys(attributes);

/***/ }),

/***/ "./src/components/effect-underline/elements.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

exports.elementSelectors = {
  root: ".effect-underline-container",
  underline: ".underline",
  injectedStyles: "style.injectedStyles"
};

exports.setStyles = function (el, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles);
};

var elements = {};
Object.keys(exports.elementSelectors).forEach(function (key) {
  elements[key] = {
    selector: exports.elementSelectors[key],
    onChange: key === "injectedStyles" ? function (el, host) {
      return exports.setStyles(el, host.styles);
    } : function () {}
  };
});
exports["default"] = elements;

/***/ }),

/***/ "./src/components/effect-underline/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var properties_1 = __webpack_require__("./src/components/effect-underline/properties.ts");

var methods_1 = __webpack_require__("./src/components/effect-underline/methods.ts");

var elements_1 = __webpack_require__("./src/components/effect-underline/elements.ts");

__webpack_require__("./src/components/effect-underline/style.scss");

var style = __webpack_require__("./src/components/effect-underline/style.scss").toString();

var template = __webpack_require__("./src/components/effect-underline/index.html");

var componentName = "effect-underline";
var componentRoot = ".effect-underline-container";
var EffectUnderline =
/*#__PURE__*/
constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: properties_1.observedAttributes,
  properties: properties_1.properties,
  elements: elements_1["default"],
  methods: {
    toggle: methods_1.toggle,
    open: methods_1.open,
    close: methods_1.close
  },
  computed: {
    hasTargets: properties_1.hasTargets,
    hasTargets$: properties_1.hasTargets$,
    hasStart: properties_1.hasStart,
    canLoadTargets: properties_1.canLoadTargets,
    canStart: properties_1.canStart,
    canEnd: properties_1.canEnd,
    canRunStart: properties_1.canRunStart,
    canRunEnd: properties_1.canRunEnd,
    nonAutoOrigin: properties_1.nonAutoOrigin
  },
  onDisconnected: function onDisconnected(host) {
    return methods_1.unloadTargets(host);
  }
});
define_1["default"](componentName, EffectUnderline);
exports["default"] = EffectUnderline;

/***/ }),

/***/ "./src/components/effect-underline/methods.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var curve_1 = __webpack_require__("./src/utils/curve/index.ts");

var timer_1 = __webpack_require__("./src/services/timer.ts");

var signalEnd = function signalEnd(host) {
  return runEnd(host);
};

var runAnimation = function runAnimation(host, isOn) {
  var underlineStyle = host.elements.underline.style;

  if (isOn) {
    underlineStyle.opacity = host.opacity;
    setOrigin(host);
  }

  timer_1["default"](host.speed, function (scale) {
    return underlineStyle.transform = "perspective(1px) translateZ(0) scaleX(" + scale + ")";
  }, curve_1.GetCurve(isOn ? [0, 1] : [1, 0], isOn ? host.spring : 0.5, false, host.speed), function () {
    return underlineStyle.transform = "perspective(1px) translateZ(0) scaleX(" + (isOn ? 1 : 0) + ")";
  });
};

var runEnd = function runEnd(host) {
  return function () {
    if (!host.canRunEnd) {
      return;
    }

    host.on = false;
    runAnimation(host, false);
  };
};

var runStart = function runStart(host) {
  return function () {
    if (!host.canRunStart) {
      return;
    }

    host.on = true;
    runAnimation(host, true);
    host.downEvent = undefined;
  };
};

var setOrigin = function setOrigin(host) {
  if (!host.ready) {
    return;
  }

  var nonAutoOrigin = host.nonAutoOrigin;
  var underlineStyle = host.elements.underline.style;

  if (nonAutoOrigin) {
    return underlineStyle.transformOrigin = nonAutoOrigin;
  }

  var eventX = host.downEvent.x;
  var targetBox = host.downEvent.target.getBoundingClientRect();
  var left = Math.round((eventX - targetBox.left) / targetBox.width * 100);
  underlineStyle.transformOrigin = left + "% center";
};

exports.toggle = function (host) {
  return host.on ? runEnd(host) : runStart(host);
};

exports.open = function (host) {
  return runStart(host);
};

exports.close = function (host) {
  return runEnd(host);
};

exports.unloadTargets = function (host) {
  if (!host.hasTargets$) {
    return;
  }

  host.targets$.forEach(function (ob$) {
    return ob$();
  });
  host.targets$ = [];
};

exports.loadTargets = function (host) {
  if (!host.canLoadTargets) {
    return;
  }

  exports.unloadTargets(host);
  host.targets.forEach(function (target) {
    if (host.canStart) {
      host.targets$.push(observeEvent_1["default"](target, "mousedown").subscribe(function (e) {
        return host.downEvent = e;
      }));
      host.targets$.push(observeEvent_1["default"](target, host.start).subscribe(runStart(host)));
    }

    if (host.canEnd) {
      host.targets$.push(observeEvent_1["default"](target, host.end).subscribe(signalEnd(host)));
    }
  });
};

/***/ }),

/***/ "./src/components/effect-underline/properties.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

var methods_1 = __webpack_require__("./src/components/effect-underline/methods.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var dom_1 = __webpack_require__("./src/utils/convert/dom.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var elements_1 = __webpack_require__("./src/components/effect-underline/elements.ts");

var resetTargets = function resetTargets(host) {
  methods_1.unloadTargets(host);
  methods_1.loadTargets(host);
};

var onChange = function onChange() {};

var selectorsToDom = function selectorsToDom(val) {
  return dom_1.SelectorArrayToElements(null, val).value;
};

var attributes = {
  color: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("#59a2d8"))(val).value;
    },
    onChange: function onChange(val, host) {
      return !val || !host.elements.underline ? undefined : host.elements.underline.style.backgroundColor = "" + val;
    }
  },
  direction: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("auto"))(val).value;
    },
    onChange: onChange
  },
  end: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(_val, host) {
      return resetTargets(host);
    }
  },
  opacity: {
    format: function format(val) {
      return Math.min(1, Math.max(0, pipe_1["default"](to_number_1["default"], if_invalid_1["default"](0.2))(val).value));
    },
    onChange: onChange
  },
  speed: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](700))(val).value;
    },
    onChange: onChange
  },
  start: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("mousedown"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return resetTargets(host);
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return elements_1.setStyles(host.elements.injectedStyles, val);
    }
  },
  spring: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](4))(val).value;
    },
    onChange: onChange
  },
  targets: {
    format: selectorsToDom,
    onChange: function onChange(_val, host) {
      return resetTargets(host);
    }
  },
  "class": component_class_object_1["default"]
};
exports.properties = Object.assign({
  downEvent: {
    format: function format(val) {
      return val;
    },
    onChange: onChange
  },
  on: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: onChange
  },
  targets$: {
    format: function format(_val) {
      return [];
    },
    onChange: onChange
  }
}, attributes);
exports.observedAttributes = Object.keys(attributes);

exports.hasTargets = function (host) {
  return {
    get: function get() {
      return host.ready && !!host.targets && Array.isArray(host.targets) && !!host.targets.length;
    }
  };
};

exports.hasTargets$ = function (host) {
  return {
    get: function get() {
      return host.hasTargets && host.targets$ && Array.isArray(host.targets$);
    }
  };
};

exports.hasStart = function (host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.start;
    }
  };
};

exports.canStart = function (host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.start && host.start !== "none";
    }
  };
};

exports.canEnd = function (host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.end && host.end !== "none";
    }
  };
};

exports.canRunStart = function (host) {
  return {
    get: function get() {
      return host.hasTargets && !host.on;
    }
  };
};

exports.canRunEnd = function (host) {
  return {
    get: function get() {
      return host.hasTargets && host.on;
    }
  };
};

exports.nonAutoOrigin = function (host) {
  return {
    get: function get() {
      return host.downEvent === undefined || host.downEvent && !host.downEvent.target || host.direction !== undefined && host.direction !== "auto" ? host.direction === "to left" ? "100% center" : ["center", "auto"].indexOf(host.direction) > -1 ? "center center" : "0% center" : false;
    }
  };
};

exports.canLoadTargets = function (host) {
  return {
    get: function get() {
      return host.hasTargets && host.hasTargets$ && host.hasStart;
    }
  };
};

/***/ }),

/***/ "./src/components/grid-layout/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

__webpack_require__("./src/components/grid-layout/style.scss");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var append_style_1 = __webpack_require__("./src/utils/webcomponent/append-style.ts");

var set_1 = __webpack_require__("./src/utils/set/index.ts");

var get_1 = __webpack_require__("./src/utils/get/index.ts");

var id_1 = __webpack_require__("./src/utils/id/index.ts");

var has_non_digits_1 = __webpack_require__("./src/utils/convert/has_non_digits.ts");

var style = __webpack_require__("./src/components/grid-layout/style.scss").toString();

var template = __webpack_require__("./src/components/grid-layout/index.html");

var componentName = "grid-layout";
var componentRoot = "." + componentName + "-container";
var defaultWidth = "15em";
var defaultGap = "1em";

var setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles);
};

var setDimensions = function setDimensions(host) {
  var canDoGrid = typeof host.style.grid === "string";
  var gap = host.gap || defaultGap;
  var columnwidth = host.columnwidth || defaultWidth;
  var componentStyle = host.shadowRoot.querySelector("style[name=\"\"]");
  var themeStyles = host.elements.themeStyles;
  var injectedStyles = host.elements.injectedStyles;
  var outerStyle = host.querySelector("style[name=\"outer\"]");
  var unsupportedCSS = canDoGrid ? "" : ".grid-layout-items{margin-left:-" + gap + ";margin-right:-" + gap + ";}.grid-layout-items .grid-layout-item{max-width:" + columnwidth + ";margin:" + gap + ";}";
  var styleString = [style, themeStyles ? themeStyles.innerHTML : "", injectedStyles ? injectedStyles.innerHTML : "", ".grid-layout-items{grid-gap:" + gap + "; grid-template-columns:repeat(auto-fit, minmax(" + columnwidth + ", 0fr));}" + unsupportedCSS].join("");

  if (!outerStyle) {
    append_style_1["default"](styleString, host, "outer");
    outerStyle = host.querySelector("style[name=\"outer\"]");
    outerStyle.nongrid = true;
  }

  setStyles(componentStyle, styleString);
  setStyles(outerStyle, styleString);
};

var elements = {
  root: {
    selector: componentRoot
  },
  itemsContainer: {
    selector: "." + componentName + "-items"
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: function onChange(el, host) {
      return setStyles(el, host.styles);
    }
  },
  themeStyles: {
    selector: "style.themeStyles",
    onChange: function onChange(el, host) {
      return setStyles(el, host.theme);
    }
  }
};
var properties = {
  columnwidth: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](defaultWidth))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setDimensions(host);
    }
  },
  gap: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](defaultGap))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setDimensions(host);
    }
  },
  styles: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](""))(val).value;
    },
    onChange: function onChange(val, host) {
      return setStyles(host.elements.injectedStyles, val);
    }
  },
  theme: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](""))(val).value;
    },
    onChange: function onChange(val, host) {
      return setStyles(host.elements.themeStyles, val);
    }
  }
};

var getComponentStyles = function getComponentStyles(host) {
  return function () {
    return "" + __webpack_require__("./src/components/grid-layout/style.scss").toString() + (host.theme || "") + host.styles;
  };
};

var GridLayout = constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: Object.keys(properties),
  properties: properties,
  elements: elements,
  computed: {
    items: function items(host) {
      return {
        get: function get() {
          Array.from(host.children).filter(function (el) {
            return el.tagName.toLowerCase() !== "style";
          });
        }
      };
    }
  },
  methods: {
    getComponentStyles: getComponentStyles
  },
  onConnected: function onConnected(host) {
    var itemsContainer = host.elements.itemsContainer;

    var spanValue = function spanValue(span) {
      return !has_non_digits_1["default"](span).valid ? "span " + span : span === "full" ? "1 / -1" : span;
    };

    var setSpan = function setSpan(el, span) {
      return set_1["default"](el, "container.style.gridColumn", spanValue(span));
    };

    var wrapItem = function wrapItem(el) {
      var id = id_1["default"]();
      var slotWrapper = document.createElement("div");
      slotWrapper.className = "grid-layout-item";
      slotWrapper.id = id;
      setSpan(el, get_1["default"](el, "span", host.subsections));
      itemsContainer.appendChild(slotWrapper);
      var slot = document.createElement("slot");
      slot.name = id;
      slotWrapper.appendChild(slot);
      el.slot = id;
      el.container = slotWrapper;
      return el;
    };

    var observeEl = function observeEl(el) {
      if (el.nongrid) {
        return;
      }

      var element = wrapItem(el);
      set_1["default"](element, "eventSubscriptions.span", new MutationObserver(function (mutationsList) {
        var list = Array.from(mutationsList);

        while (list.length) {
          var mutation = list.shift();

          if (mutation.type === "attributes" && mutation.attributeName === "span") {
            var span = element.getAttribute('span') || host.subsections;
            setSpan(element, span);
          }
        }
      }));
      element.eventSubscriptions.span.observe(element, {
        attributes: true
      });
    };

    var disconnectEl = function disconnectEl(el) {
      return get_1["default"](el, "eventSubscriptions.span.disconnect()");
    };

    Array.from(host.children).forEach(observeEl);
    host.slotObserver = new MutationObserver(function (mutationsList) {
      var list = Array.from(mutationsList);

      while (list.length) {
        var mutation = list.shift();

        if (mutation.type === "childList") {
          Array.from(mutation.addedNodes).forEach(observeEl);
          Array.from(mutation.removedNodes).forEach(disconnectEl);
        }
      }
    });
    host.slotObserver.observe(host, {
      childList: true
    });
  }
});
define_1["default"](componentName, GridLayout);
exports["default"] = GridLayout;

/***/ }),

/***/ "./src/components/horizontal-slider/elements.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var get_1 = __webpack_require__("./src/utils/get/index.ts");

var methods_1 = __webpack_require__("./src/components/horizontal-slider/methods.ts");

var sliderItemSelectedClass = "active-horizontal-slider-item";
var sliderItemClass = "horizontal-slider-item";

var handleItemEnter = function handleItemEnter(item) {
  return item.hovering = true;
};

var handleItemLeave = function handleItemLeave(item) {
  return item.hovering = false;
};

var handleItemUp = function handleItemUp(item) {
  return item.touching = false;
};

var handleItemDown = function handleItemDown(item, host) {
  item.touching = true;
  host.currentindex = item.itemIndex;
  host.dispatchEvent(new CustomEvent("itemclick", {
    detail: {
      index: host.currentindex,
      item: item,
      host: host
    }
  }));
};

exports.unsetItemEvents = function (items) {
  if (!items || !Array.isArray(items)) {
    return;
  }

  items.forEach(function (item) {
    Object.keys(get_1["default"](item, "eventSubscriptions", {})).forEach(function (key) {
      if (item.eventSubscriptions[key] && typeof item.eventSubscriptions[key] === "function") {
        item.eventSubscriptions[key]();
      }
    });
    item.classList.remove(sliderItemClass);
  });
};

exports.setItemEvents = function (items, host) {
  if (!items || !Array.isArray(items)) {
    return;
  }

  items.forEach(function (item) {
    item.classList.add(sliderItemClass);
    item.eventSubscriptions = {
      mouseenter: observeEvent_1["default"](item, "mouseenter").subscribe(function () {
        return handleItemEnter(item);
      }),
      mouseleave: observeEvent_1["default"](item, "mouseleave").subscribe(function () {
        return handleItemLeave(item);
      }),
      mousedown: observeEvent_1["default"](item, "mousedown").subscribe(function () {
        return handleItemDown(item, host);
      }),
      mouseup: observeEvent_1["default"](item, "mouseup").subscribe(function () {
        return handleItemUp(item);
      })
    };
  });
};

exports.setStyles = function (el, host, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles || host.styles);
};

exports.setSlot = function (el, host) {
  if (!el) {
    return;
  }

  el.eventSubscriptions = {
    slot: observeEvent_1["default"](el, "slotchange").subscribe(function () {
      var images = [];
      var items = Array.from(host.children).map(function (item, index) {
        item.itemIndex = index;
        item.style.order = index + 1;
        images = images.concat(Array.from(item.querySelectorAll("img")));
        return item;
      });
      Promise.all(images.map(function (image) {
        return new Promise(function (resolve) {
          if (image.complete) {
            return resolve(image);
          }

          function onComplete() {
            image.removeEventListener("load", onComplete, true);
            image.removeEventListener("error", onComplete, true);
            return resolve(image);
          }

          image.addEventListener("load", onComplete, true);
          image.addEventListener("error", onComplete, true);
        });
      })).then(function () {
        return host.items = items;
      });
    })
  };
};

exports.setActiveItem = function (host) {
  if (!Array.isArray(host.items)) {
    return;
  }

  var index = host.currentindex;
  host.items.forEach(function (item) {
    return item.classList[item.itemIndex === index ? "add" : "remove"](sliderItemSelectedClass);
  });
};

var chickletSelector = "horizontal-slider-chicklet";

exports.setActiveChicklet = function (host, selectedIndex) {
  var chickletContainer = host.elements.chicklets;
  Array.from(chickletContainer.querySelectorAll("." + chickletSelector)).forEach(function (chicklet, index) {
    chicklet.classList[index === selectedIndex ? "add" : "remove"]("active");
  });
};

exports.setChicklets = function (host) {
  var chicklets = host.elements.chicklets;
  var root = host.elements.root;

  if (!chicklets || !Array.isArray(host.items)) {
    return;
  }

  if (!host.chicklets) {
    var currentChicklets = Array.from(chicklets.querySelectorAll("." + chickletSelector));
    currentChicklets.forEach(function (chicklet) {
      return host.unsubscribeEvents(chicklet);
    });
    chicklets.innerHTML = "";
  }

  root.classList[host.chicklets ? "add" : "remove"]("has-chicklets");
  host.items.forEach(function (_item, index) {
    var chicklet = document.createElement("div");
    chicklet.className = chickletSelector;
    chicklet.itemIndex = index;
    chicklets.appendChild(chicklet);
    chicklet.eventSubscriptions = {
      click: observeEvent_1["default"](chicklet, "click").subscribe(function () {
        return host.currentindex = index;
      })
    };
  });
  exports.setActiveChicklet(host, host.currentindex);
};

var arrowClass = "show-horizontal-slider-arrows";

exports.setPrevious = function (el, host) {
  if (!el) {
    return;
  }

  el.classList[host.arrows ? "add" : "remove"](arrowClass);
  host.unsubscribeEvents(el);
  el.eventSubscriptions = {
    click: observeEvent_1["default"](el, "click").subscribe(function () {
      return methods_1.goToPreviousPage(host, host.currentindex);
    })
  };
};

exports.setNext = function (el, host) {
  if (!el) {
    return;
  }

  el.classList[host.arrows ? "add" : "remove"](arrowClass);
  host.unsubscribeEvents(el);
  el.eventSubscriptions = {
    click: observeEvent_1["default"](el, "click").subscribe(function () {
      return methods_1.goToNextPage(host, host.currentindex);
    })
  };
};

var elements = {
  root: {
    selector: ".horizontal-slider-container",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        mouseenter: observeEvent_1["default"](el, "mouseenter").subscribe(function () {
          host.paused = true;
        }),
        mouseleave: observeEvent_1["default"](el, "mouseleave").subscribe(function () {
          host.paused = false;
          methods_1.autoplay(host);
        })
      };
    }
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: exports.setStyles
  },
  slot: {
    selector: "slot:not([name])",
    onChange: exports.setSlot
  },
  inner: {
    selector: ".horizontal-slider-inner"
  },
  itemContainer: {
    selector: ".horizontal-slider-items"
  },
  previous: {
    selector: ".horizontal-slider-previous",
    onChange: exports.setPrevious
  },
  next: {
    selector: ".horizontal-slider-next",
    onChange: exports.setNext
  },
  chicklets: {
    selector: ".horizontal-slider-chicklets",
    onChange: function onChange(_el, host) {
      return exports.setChicklets(host);
    }
  }
};
exports["default"] = elements;

/***/ }),

/***/ "./src/components/horizontal-slider/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * on load, images seem stretched then go to normal
 * cover flow
 * single item
 * onslidestart
 * onslideend
 * odd flicker when scrolling back
 * page scroll when center is messed up
 */

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var append_style_1 = __webpack_require__("./src/utils/webcomponent/append-style.ts");

__webpack_require__("./src/components/horizontal-slider/style.scss");

var elements_1 = __webpack_require__("./src/components/horizontal-slider/elements.ts");

var properties_1 = __webpack_require__("./src/components/horizontal-slider/properties.ts");

var methods_1 = __webpack_require__("./src/components/horizontal-slider/methods.ts");

var style = __webpack_require__("./src/components/horizontal-slider/style.scss").toString();

var template = __webpack_require__("./src/components/horizontal-slider/index.html");

var componentName = "horizontal-slider";
var componentRoot = ".horizontal-slider-container";
var HorizontalSlider =
/*#__PURE__*/
constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: properties_1.observedAttributes,
  properties: properties_1.properties,
  elements: elements_1["default"],
  methods: {
    scrollToIndex: methods_1.scrollToIndex
  },
  onConnected: function onConnected(host) {
    window.addEventListener("resize", function () {
      return host.scrollToIndex(host.currentindex);
    });

    if (!document.head.querySelector("style[name=\"horizontal-slider-styles\"]")) {
      append_style_1["default"](style, document.head, "horizontal-slider-styles");
    }
  }
});
define_1["default"](componentName, HorizontalSlider);
exports["default"] = HorizontalSlider;

/***/ }),

/***/ "./src/components/horizontal-slider/methods.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var elements_1 = __webpack_require__("./src/components/horizontal-slider/elements.ts");

function whichTransitionEvent() {
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

exports.setLoop = function (host) {
  var itemContainer = host.elements.itemContainer;
  var inner = host.elements.inner;

  if (!host.items || !itemContainer || !inner) {
    return;
  }

  var transitionEvent = whichTransitionEvent();

  if (!transitionEvent) {
    setTimeout(function () {
      finish();
    }, 300);
  } else {
    itemContainer.addEventListener(transitionEvent, function endHandler() {
      finish();
      window.removeEventListener(transitionEvent, endHandler, false);
    }, false);
  }

  var items = host.items;
  var currentItem = items[host.currentindex];

  var getLeft = function getLeft() {
    return currentItem.offsetLeft + currentItem.offsetWidth / 2 - inner.offsetWidth / 2;
  };

  itemContainer.style.transform = "translateZ(0) translateX(" + -getLeft() + "px)";

  var finish = function finish() {
    itemContainer.style.transition = "none";
    var indexShift = Math.ceil(host.items.length / 2) - host.currentindex;
    var beforeCurrent = host.currentindex - 1;
    var afterCurrent = host.currentindex + 1;
    currentItem.style.order = Math.ceil(host.items.length / 2);

    var getShift = function getShift(index) {
      if (index + indexShift > items.length) {
        return -items.length + index + indexShift;
      }

      if (index + indexShift < 1) {
        return index + indexShift + items.length;
      }

      return index + indexShift;
    };

    while (items[beforeCurrent]) {
      items[beforeCurrent].style.order = getShift(beforeCurrent);
      itemContainer.style.transform = "translateZ(0) translateX(" + -getLeft() + "px)";
      beforeCurrent = beforeCurrent - 1;
    }

    while (items[afterCurrent]) {
      items[afterCurrent].style.order = getShift(afterCurrent);
      itemContainer.style.transform = "translateZ(0) translateX(" + -getLeft() + "px)";
      afterCurrent = afterCurrent + 1;
    }

    itemContainer.style.removeProperty("transition");
  };
};

exports.autoplay = function (host) {
  if (!Array.isArray(host.items)) {
    return;
  }

  var canPlay = function canPlay() {
    return !!host.intervalplay && host.intervalplay > 0 && host.paused !== true;
  };

  if (host.playing && canPlay()) {
    return;
  }

  var time = new Date().getTime();

  var run = function run() {
    if (!canPlay()) {
      host.playing = false;
      return;
    }

    var newTime = new Date().getTime();

    if (newTime - time > host.intervalplay) {
      host.playing = true;
      host.currentindex = host.currentindex + 1 > host.items.length - 1 ? 0 : host.currentindex + 1;
      time = new Date().getTime();
    }

    requestAnimationFrame(run);
  };

  if (canPlay()) {
    run();
  }
};

exports.scrollToIndex = function (host) {
  return function (index) {
    var itemContainer = host.elements.itemContainer;

    if (!host.items || !itemContainer) {
      return;
    }

    var finish = function finish() {
      elements_1.setActiveItem(host);
      elements_1.setActiveChicklet(host, index);
    };

    if (host.loop) {
      exports.setLoop(host);
      return finish();
    }

    var item = host.items[index];
    host.currentindex = index;

    if (!item) {
      return;
    }

    var left = -(item.offsetLeft - (host.center ? host.elements.inner.offsetWidth / 2 - item.offsetWidth / 2 : 0));
    itemContainer.style.transform = "translateZ(0) translateX(" + left + "px)";
    finish();
  };
};

exports.goToNextPage = function (host, currentIndex) {
  var inner = host.elements.inner;
  var itemContainer = host.elements.itemContainer;

  if (!inner || !itemContainer) {
    return;
  }

  var targeWidth = inner.offsetWidth;
  var currentWidth = 0;
  var i = currentIndex;

  while (host.items[i]) {
    var itemWidth = host.items[i].offsetWidth;
    currentWidth = currentWidth + itemWidth;

    if (currentWidth > targeWidth) {
      break;
    }

    i = i + 1;
  }

  host.currentindex = i;
};

exports.goToPreviousPage = function (host, currentIndex) {
  var inner = host.elements.inner;
  var itemContainer = host.elements.itemContainer;

  if (!inner || !itemContainer) {
    return;
  }

  var currentWidth = inner.offsetWidth;
  var i = currentIndex;

  while (host.items[i]) {
    var itemWidth = host.items[i].offsetWidth;
    currentWidth = currentWidth - itemWidth;

    if (currentWidth < 0) {
      break;
    }

    i = i - 1;
  }

  host.currentindex = i;
};

/***/ }),

/***/ "./src/components/horizontal-slider/properties.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var elements_1 = __webpack_require__("./src/components/horizontal-slider/elements.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var to_array_1 = __webpack_require__("./src/utils/convert/to_array.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var get_1 = __webpack_require__("./src/utils/get/index.ts");

var methods_1 = __webpack_require__("./src/components/horizontal-slider/methods.ts");

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

exports.attributes = {
  "class": component_class_object_1["default"],
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return elements_1.setStyles(host.elements.injectedStyles, host, val);
    }
  },
  chicklets: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](true))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_1.setChicklets(host);
    }
  },
  arrows: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](true))(val).value;
    },
    onChange: function onChange(_val, host) {
      elements_1.setPrevious(host.elements.previous, host);
      elements_1.setNext(host.elements.next, host);
    }
  },
  intervalplay: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](0))(val).value;
    },
    onChange: function onChange(_val, host) {
      return methods_1.autoplay(host);
    }
  },
  currentindex: {
    format: function format(val, host) {
      var num = pipe_1["default"](to_number_1["default"], if_invalid_1["default"](0))(val).value;

      if (Array.isArray(host.items) && num >= host.items.length) {
        num = host.items.length - 1;
      }

      if (num < 0) {
        num = 0;
      }

      return num;
    },
    onChange: function onChange(val, host) {
      return host.scrollToIndex(val);
    }
  },
  loop: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](true))(val).value;
    },
    onChange: function onChange(_val, host) {
      methods_1.setLoop(host);
    }
  },
  center: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](true))(val).value;
    },
    onChange: function onChange(_val, host) {
      host.scrollToIndex(host.currentindex);
    }
  }
};
exports.properties = Object.assign({}, exports.attributes, {
  items: {
    format: function format(val, host) {
      return pipe_1["default"](to_array_1["default"], if_invalid_1["default"](get_1["default"](host, "state.items.value", [])))(val).value;
    },
    onChange: function onChange(val, host) {
      elements_1.unsetItemEvents(host.state.items.previous);
      elements_1.setItemEvents(val, host);
      host.scrollToIndex(host.currentindex);
      elements_1.setChicklets(host);
      methods_1.setLoop(host);
      methods_1.autoplay(host);
      host.classList.add("isready");
    }
  }
});
exports.observedAttributes = Object.keys(exports.attributes);

/***/ }),

/***/ "./src/components/icon-element/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var observe_1 = __webpack_require__("./src/utils/observe/index.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

__webpack_require__("./src/components/icon-element/style.scss");

var observeWorker_1 = __webpack_require__("./src/utils/observeWorker/index.ts");

var style = __webpack_require__("./src/components/icon-element/style.scss").toString();

var elementSelectors = {
  root: ".icon-element-container",
  svgContainer: ".svg-container",
  injectedStyles: "style.injectedStyles"
};

var setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles);
};

var elements = {};
Object.keys(elementSelectors).forEach(function (key) {
  elements[key] = {
    selector: elementSelectors[key],
    onChange: key === "injectedStyles" ? function (el, host) {
      return setStyles(el, host.styles);
    } : function () {}
  };
});
var AvailableIcons = {};

var getIcon = function getIcon(path) {
  if (!path) {
    if (!AvailableIcons[path]) {
      AvailableIcons[path] = observe_1["default"]("");
    }

    AvailableIcons[path].next("");
    return Promise.resolve(AvailableIcons[path]);
  }

  return new Promise(function (resolve) {
    if (path.slice(0, 5) === "<svg") {
      return resolve(observe_1["default"](path));
    }

    if (path.indexOf("https://") === -1 && path.indexOf("http://") === -1) {
      path = location.protocol + "//" + location.host + (path[0] === "/" ? path : "/" + path);
    }

    if (AvailableIcons[path]) {
      return resolve(AvailableIcons[path]);
    }

    AvailableIcons[path] = observe_1["default"]("");
    resolve(AvailableIcons[path]);
    var worker$ = observeWorker_1["default"](function () {
      self.onmessage = function (e) {
        var xhr = new XMLHttpRequest();
        var data = JSON.parse(e.data);
        xhr.open(data.method, data.path, false);

        xhr.onload = function () {
          return postMessage({
            status: xhr.status,
            svg: xhr.responseText
          });
        };

        xhr.send();
      };
    });
    var workerSubscription = worker$.subscribe(function (e) {
      workerSubscription();
      AvailableIcons[path].next(e.svg);
    }, function (e) {
      workerSubscription();
      AvailableIcons[path].error(e.status);
    });
    worker$.post({
      path: path,
      method: "GET"
    });
  });
};

var attributes = {
  type: {
    format: function format(val) {
      return typeof val === "string" ? val : null;
    },
    onChange: function onChange(value, host) {
      if (!value) {
        return;
      }

      if (host.subscription) {
        host.subscription();
      }

      return getIcon(value).then(function (subject) {
        host.subscription = subject.subscribe(function (icon) {
          host.elements.svgContainer.innerHTML = icon;
          host.dispatchEvent(new CustomEvent("iconloaded", {
            detail: host
          }));
        });
      });
    }
  },
  svg: {
    format: function format(val) {
      return typeof val === "string" ? val : null;
    },
    onChange: function onChange(value, host) {
      if (!value) {
        return;
      }

      if (host.subscription) {
        host.subscription();
      }

      host.elements.svgContainer.innerHTML = value;
      host.dispatchEvent(new CustomEvent("iconloaded", {
        detail: host
      }));
    }
  },
  color: {
    format: function format(val) {
      return typeof val === "string" ? val : null;
    },
    onChange: function onChange(value, host) {
      return host.elements.svgContainer.style.color = value;
    }
  },
  size: {
    format: function format(val) {
      return typeof val === "string" ? val : "1.5em";
    },
    onChange: function onChange(value, host) {
      return host.elements.svgContainer.style.height = host.elements.svgContainer.style.width = value;
    }
  },
  "class": component_class_object_1["default"],
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return setStyles(host.elements.injectedStyles, val);
    }
  }
};
var properties = Object.assign({
  subscription: {
    format: function format(val) {
      return val;
    }
  }
}, attributes);

var template = __webpack_require__("./src/components/icon-element/index.html");

var componentName = "icon-element";
var componentRoot = ".icon-element-container";
var IconElement =
/*#__PURE__*/
constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: Object.keys(attributes),
  properties: properties,
  elements: elements
});
define_1["default"](componentName, IconElement);
exports["default"] = IconElement;

/***/ }),

/***/ "./src/components/image-loader/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__("./src/components/image-loader/style.scss");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

var append_style_1 = __webpack_require__("./src/utils/webcomponent/append-style.ts");

var html_1 = __webpack_require__("./src/utils/validate/html.ts");

var style = __webpack_require__("./src/components/image-loader/style.scss").toString();

var template = __webpack_require__("./src/components/image-loader/index.html");

var componentName = "image-loader";
var componentRoot = ".image-loader-container";

var setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles);
};

var setStyleElement = function setStyleElement(host) {
  var outerStyle = host.querySelector("style[name=\"outer\"]");
  var componentStyle = host.shadowRoot.querySelector("style[name=\"\"]");
  var styleString = [style, host.theme, host.styles].join("");

  if (!outerStyle) {
    append_style_1["default"](styleString, host, "outer");
    outerStyle = host.querySelector("style[name=\"outer\"]");
  }

  setStyles(host.elements.themedStyles, styleString);
  setStyles(componentStyle, styleString);
  setStyles(outerStyle, styleString);
};

var setInternalStyle = function setInternalStyle(host) {
  var internalStyle = !host.fit ? "" : ".image-loader-container>img.image-loader-image{\n            object-position:" + (!!host.position ? host.position : "50% 50%") + ";\n            object-fit:" + (!!host.fit ? host.fit : "contain") + ";\n        }";
  setStyles(host.elements.internalStyles, internalStyle);
  waitForEl(host, "root").then(function (root) {
    if (!!host.fit) {
      root.classList.add("fill");
      root.setAttribute("fit", host.fit);
    } else {
      root.classList.remove("fill");
      root.removeAttribute("fit");
    }
  });
};

var waitForEl = function waitForEl(host, key) {
  return new Promise(function (resolve) {
    var el = host.elements[key];

    var checkIfReady = function checkIfReady() {
      cancelAnimationFrame(host["timerFor" + key]);
      el = host.elements[key];
      return !el ? host["timerFor" + key] = requestAnimationFrame(checkIfReady) : resolve(el);
    };

    checkIfReady();
  });
};

var waitForEls = function waitForEls(host, keys) {
  return Promise.all(keys.map(function (key) {
    return waitForEl(host, key);
  }));
};

var toggleLoad = function toggleLoad(host) {
  return waitForEls(host, ["root", "spinner"]).then(function (elements) {
    clearTimeout(host.spinnerTimer);
    var root = elements[0];
    var spinner = elements[1];
    var loaded = !host.loading && !!host.src;
    host.setAttribute("loaded", loaded);
    host.setAttribute("errored", host.error);
    root.setAttribute("loaded", loaded);
    root.classList[host.loading ? "add" : "remove"]("loading");
    root.classList[host.error ? "add" : "remove"]("errored");
    host.dispatchEvent(new CustomEvent(host.error ? "imageerror" : host.loading ? "imageloading" : "imageloaded", {
      detail: host
    }));

    if (!host.loading) {
      host.complete = true;
      host.dispatchEvent(new CustomEvent("imagecomplete", {
        detail: host
      }));
    }

    toggleText(host);

    if (!host.loading) {
      spinner.setAttribute("visible", false);
      return;
    }

    host.spinnerTimer = setTimeout(function () {
      return spinner.setAttribute("visible", host.loading && host.spinner ? true : false);
    }, 333);
  });
};

var toggleText = function toggleText(host) {
  return waitForEl(host, "root").then(function (root) {
    var showingtext = host.error && !host.loading || !host.src;
    root.classList[showingtext ? "add" : "remove"]("show-text");
    host.setAttribute("showingtext", showingtext);
  });
};

var properties = {
  src: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(val, host) {
      return loadSrc(host, val);
    }
  },
  altsrc: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    }
  },
  alttext: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(val, host) {
      if (!val) {
        return;
      }

      waitForEl(host, "text").then(function (textEl) {
        textEl.innerHTML = html_1["default"](val, [], ["script"]).sanitized;
        toggleText(host);
      });
    }
  },
  loading: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: function onChange(_val, host) {
      toggleLoad(host);
    }
  },
  error: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    }
  },
  complete: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    }
  },
  theme: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(_val, host) {
      return setStyleElement(host);
    }
  },
  fit: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(_val, host) {
      setInternalStyle(host);
    }
  },
  position: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(_val, host) {
      setInternalStyle(host);
    }
  },
  spinner: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    }
  }
};
var observedAttributes = Object.keys(properties);
var elements = {
  root: {
    selector: componentRoot,
    onChange: function onChange(el) {
      requestAnimationFrame(function () {
        el.classList.remove("notready");
        el.style.removeProperty("opacity");
      });
    }
  },
  spinner: {
    selector: componentRoot + " spinner-element",
    onChange: function onChange(el) {
      var remove = function remove() {
        return el.style.removeProperty("opacity");
      };

      setTimeout(function () {
        return requestAnimationFrame(remove);
      }, 66);
    }
  },
  img: {
    selector: "img",
    onChange: function onChange(el, host) {
      el.eventSubscriptions = {
        load: observeEvent_1["default"](el, "load").subscribe(function () {
          host.error = false;
          host.loading = false;
        }),
        error: observeEvent_1["default"](el, "error").subscribe(function () {
          host.error = true;
          host.loading = false;
        })
      };
    }
  },
  text: {
    selector: ".image-loader-text"
  },
  themedStyles: {
    selector: "style.themeStyles",
    onChange: function onChange(_el, host) {
      return setStyleElement(host);
    }
  },
  internalStyles: {
    selector: "style.internalStyles",
    onChange: function onChange(_el, host) {
      return setInternalStyle(host);
    }
  }
};

var loadSrc = function loadSrc(host, src) {
  return new Promise(function (resolve) {
    if (!src) {
      return resolve();
    }

    waitForEl(host, "img").then(function (img) {
      if (img.src === src) {
        return resolve(img);
      }

      host.error = false;
      host.loading = true;
      img.src = src;
    });
  });
};

var methods = {
  toCanvas: function toCanvas(host) {
    return function () {
      try {
        var dpr = window.devicePixelRatio || 1;
        var ctx = document.createElement('canvas').getContext('2d');
        ctx.canvas.width = host.image.width * dpr;
        ctx.canvas.height = host.image.height * dpr;
        ctx.scale(dpr, dpr);
        ctx.drawImage(host.image, 0, 0);
        return ctx.canvas;
      } catch (error) {
        throw Error(error);
      }
    };
  },
  toDataUrl: function toDataUrl(host) {
    return function (mime, quality) {
      if (mime === void 0) {
        mime = "image/jpeg";
      }

      if (quality === void 0) {
        quality = 1;
      }

      return host.toCanvas().then(function (canvas) {
        return canvas.toDataURL(mime, quality);
      });
    };
  },
  toObjectUrl: function toObjectUrl(host) {
    return function (mime, quality) {
      if (mime === void 0) {
        mime = "image/jpeg";
      }

      if (quality === void 0) {
        quality = 1;
      }

      return host.toBlob(mime, quality).then(function (blob) {
        return URL.createObjectURL(blob);
      });
    };
  },
  toBlob: function toBlob(host) {
    return function (mime, quality) {
      if (mime === void 0) {
        mime = "image/jpeg";
      }

      if (quality === void 0) {
        quality = 1;
      }

      return host.toCanvas().then(function (canvas) {
        return new Promise(function (resolve) {
          return canvas.toBlob(resolve, mime, quality);
        });
      });
    };
  },
  toData: function toData(host) {
    return function (x, y, w, h) {
      if (x === void 0) {
        x = 0;
      }

      if (y === void 0) {
        y = 0;
      }

      return host.toCanvas().then(function (canvas) {
        return canvas.getContext("2d").getImageData(x, y, w ? w : canvas.width, h ? h : canvas.height);
      });
    };
  }
};
var ImageLoader = constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: observedAttributes,
  properties: properties,
  elements: elements,
  methods: methods,
  onConnected: function onConnected(host) {
    setStyleElement(host);
    setInternalStyle(host);
  }
});
define_1["default"](componentName, ImageLoader);
exports["default"] = ImageLoader;

/***/ }),

/***/ "./src/components/input-field/computed.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var get_1 = __webpack_require__("./src/utils/get/index.ts");

var definitions_1 = __webpack_require__("./src/components/input-field/definitions.ts");

var methods_value_1 = __webpack_require__("./src/components/input-field/methods-value.ts");

var processedErrorText = function processedErrorText(sanitized) {
  return sanitized && sanitized.reason ? sanitized.reason.join(", ") : "";
};

exports.multiProcessedValue = function (host, value) {
  var sanitized = host.type.map(function (t, i) {
    return methods_value_1.sanitizeValue(value[i], t.type, host.allowhtml, host.disallowhtml);
  });
  host.processedError = sanitized.map(processedErrorText).filter(function (s) {
    return !!s;
  }).join(", ");
  return sanitized;
};

var getVal = function getVal(host, value) {
  var sanitized = methods_value_1.sanitizeValue(value, host.type, host.allowhtml, host.disallowhtml);
  var maxMined = methods_value_1.maxMin(host, methods_value_1.pattern(host, sanitized.sanitized));
  var mustHaveValid = true;
  var matchInputValid = true;

  if (host.musthave) {
    mustHaveValid = new RegExp(host.musthave, "g").test(maxMined.value);
  }

  if (host.matchinput) {
    matchInputValid = maxMined.value === get_1["default"](host, "matchinput.value");
  }

  sanitized.valid = sanitized.valid && maxMined.valid && mustHaveValid && matchInputValid;

  if (!!maxMined.errorText) {
    sanitized.reason.push(maxMined.errorText);
  }

  if (!mustHaveValid) {
    sanitized.reason.push("Invalid value.");
  }

  if (!matchInputValid) {
    var toMatch = host.matchinput;
    var label = toMatch.label || toMatch.getAttribute("label");
    var placeholder = toMatch.placeholder || toMatch.getAttribute("placeholder");
    var name_1 = toMatch.name || toMatch.getAttribute("name");
    var toMatchName = label || placeholder || name_1;
    sanitized.reason.push("Value does not match" + (toMatchName ? " '" + toMatchName + "'" : "") + ".");
  }

  host.processedError = processedErrorText(sanitized);
  sanitized.sanitized = maxMined.value;
  return sanitized;
};

exports.processedValue = function (host) {
  return {
    get: function get() {
      var value = get_1["default"](host.state, "value.value");

      if (methods_value_1.isEmpty(value)) {
        return definitions_1.processedNullValue();
      }

      return getVal(host, value);
    }
  };
};

exports.multiFormattedValue = function (host, value) {
  var sanitized = host.type.map(function (t, i) {
    return methods_value_1.sanitizeValue(methods_value_1.InputFieldFormatValue(value[i], host.format || t.type).value, t.type, host.allowhtml, host.disallowhtml);
  });
  var values = [];
  var errors = [];
  sanitized.forEach(function (s) {
    values.push(s.sanitized);
    errors.push(processedErrorText(s));
  });
  host.processedError = errors.filter(function (s) {
    return !!s;
  }).join(", ");
  return values;
};

exports.formattedValue = function (host) {
  return {
    get: function get() {
      var value = get_1["default"](host.state, "value.value");

      if (methods_value_1.isEmpty(value)) {
        return definitions_1.processedNullValue().sanitized;
      }

      var formatted = methods_value_1.InputFieldFormatValue(value, host.format || host.type);
      return getVal(host, formatted.value).sanitized;
    }
  };
};

exports.labelContainer = function (host) {
  return {
    get: function get() {
      if (!host.shadowRoot) {
        return;
      }

      return host.shadowRoot.querySelector(".input-field-label-" + host.labelposition);
    }
  };
};

exports.valid = function (host) {
  return {
    get: function get() {
      return (!host.processedError || host.processedError === "") && get_1["default"](host, "elements.input.validity.valid");
    }
  };
};

exports.validationMessage = function (host) {
  return {
    get: function get() {
      return [host.processedError, get_1["default"](host, "elements.input.validationMessage")].filter(function (m) {
        return !!m;
      });
    }
  };
};

/***/ }),

/***/ "./src/components/input-field/definitions.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.labelPositions = ["top", "bottom", "left", "right", "inside"];
exports.resizeOptions = ["true", "false", "horizontal", "vertical", "auto"];
exports.InputFieldInputAttributes = {
  all: ["accept", "aria-describedby", "aria-labelledby", "autocomplete", "autofocus", "disabled", "id", "maxlength", "name", "placeholder", "readonly", "required", "tabindex", "value"],
  bool: ["aria-describedby", "aria-labelledby", "disabled", "id", "name", "readonly", "required", "tabindex", "value"]
};
exports.supportedInputTypes = ["file", "email", "password", "url", "text", "textarea", "number", "radio", "checkbox", "tel", "usphone", "intlphone", "uszip"];

exports.processedNullValue = function () {
  return {
    original: "",
    sanitized: "",
    valid: true,
    reason: []
  };
};

exports.processedFileValue = function (file) {
  return {
    original: file,
    sanitized: file,
    valid: true,
    reason: []
  };
};

/***/ }),

/***/ "./src/components/input-field/elements.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var set_1 = __webpack_require__("./src/utils/set/index.ts");

var methods_elements_1 = __webpack_require__("./src/components/input-field/methods-elements.ts");

var methods_value_1 = __webpack_require__("./src/components/input-field/methods-value.ts");

var methods_events_1 = __webpack_require__("./src/components/input-field/methods-events.ts");

var attr_1 = __webpack_require__("./src/utils/html/attr.ts");

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

exports.setStyles = function (el, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles);
};

exports.elementSelectors = Object.freeze({
  bounceZ: ".input-field-input-container effect-bounce-z",
  checkIcon: ".input-field-checkbox-icon",
  clearButton: ".input-field-clear",
  container: ".input-field-container-inner",
  count: ".input-field-character-count",
  error: ".input-field-message-error",
  help: ".input-field-message-help",
  icon: ".input-field-icon",
  inputContainer: ".input-field-input-container-inner",
  inputContainerOuter: ".input-field-input-container",
  input: ".input-field-input",
  label: ".input-field-container-inner label",
  max: ".input-field-character-count-max",
  ripple: ".input-field-input-container effect-ripple",
  root: ".input-field-container",
  underline: ".input-field-input-container effect-underline",
  injectedStyles: "style.injectedStyles",
  themeStyles: "style.themeStyles"
});

var setInputEvents = function setInputEvents(input, host) {
  if (host.inputContainerClick$) {
    host.inputContainerClick$();
  }

  input.eventSubscriptions = {
    onFocus: observeEvent_1["default"](input, "focus").subscribe(function () {
      return methods_events_1.onFocus(host);
    }),
    onBlur: observeEvent_1["default"](input, "blur").subscribe(function () {
      return methods_events_1.onBlur(host);
    }),
    onKeyDown: observeEvent_1["default"](input, "keydown").subscribe(function (e) {
      return methods_events_1.onKeyDown(e, host);
    })
  };

  if (["checkbox", "radio"].indexOf(host.type) > -1) {
    host.inputContainerClick$ = observeEvent_1["default"](host.elements.inputContainer, "click", {
      stopPropagation: true,
      preventDefault: true
    }).subscribe(function () {
      host.value = !host.value;
      methods_events_1.dispatch(host, "input", host.value);
    });
  } else if (host.type === "intlphone") {
    input.eventSubscriptions.onInput = observeEvent_1["default"](input, "inputchange").subscribe(function (e) {
      host.value = e.detail;
    });
  } else {
    input.eventSubscriptions.onInput = observeEvent_1["default"](input, "input").subscribe(function () {
      methods_events_1.onInput(host);
    });
  }
};

var setElementColor = function setElementColor(element, property, color) {
  return !!element ? set_1["default"](element, property, color) : undefined;
};

exports.setColors = function (host, invalid) {
  var color = invalid ? host.warningcolor : host.accentcolor;
  setElementColor(host.elements.ripple, "color", color);
  setElementColor(host.elements.underline, "color", color);

  if (["checkbox", "radio"].indexOf(host.type) > -1) {
    setElementColor(host.elements.inputContainer, "style.color", color);
  }
};

var elementMethods = {
  input: function input(_input, host) {
    methods_elements_1.inputAttributeList(host).forEach(function (attr) {
      return attr === "value" ? methods_elements_1.setInputValue(_input, host) : attr_1.addRemoveAttr(_input, attr, host[attr]);
    });
    setInputEvents(_input, host);
    methods_elements_1.setInputID(host, host.inputID);
    methods_elements_1.setEffects(host);
    methods_events_1.setDroppable(host);
  },
  clearButton: function clearButton(el, host) {
    el.eventSubscriptions = {
      click: observeEvent_1["default"](el, "click").subscribe(function () {
        return methods_value_1.clearInput(host);
      })
    };
  },
  label: function label(el, host) {
    el.eventSubscriptions = {
      click: observeEvent_1["default"](el, "click").subscribe(function (e) {
        return methods_events_1.onLabelClick(e, host);
      })
    };
  },
  ripple: function ripple(_el, host) {
    return exports.setColors(host, host.invalid);
  },
  underline: function underline(_el, host) {
    return exports.setColors(host, host.invalid);
  },
  injectedStyles: function injectedStyles(el, host) {
    return exports.setStyles(el, host.styles);
  },
  themeStyles: function themeStyles(el, host) {
    return exports.setStyles(el, host.theme);
  },
  icon: function icon(el, host) {
    el.eventSubscriptions = {
      click: observeEvent_1["default"](el, "click").subscribe(function () {
        // const input = host.elements.input
        // if (input) {
        //     input.focus()
        // }
        host.dispatchEvent(new CustomEvent("iconclick", {
          detail: host
        }));
      })
    };
  }
};
var elements = {};
Object.keys(exports.elementSelectors).forEach(function (key) {
  elements[key] = {
    selector: exports.elementSelectors[key],
    onChange: elementMethods[key] ? elementMethods[key] : function () {}
  };
});
exports["default"] = elements;

/***/ }),

/***/ "./src/components/input-field/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var properties_1 = __webpack_require__("./src/components/input-field/properties.ts");

var methods_elements_1 = __webpack_require__("./src/components/input-field/methods-elements.ts");

var computed_1 = __webpack_require__("./src/components/input-field/computed.ts");

var elements_1 = __webpack_require__("./src/components/input-field/elements.ts");

var id_1 = __webpack_require__("./src/utils/id/index.ts");

__webpack_require__("./src/components/effect-bounce-z/index.ts");

__webpack_require__("./src/components/effect-ripple/index.ts");

__webpack_require__("./src/components/effect-underline/index.ts");

__webpack_require__("./src/components/icon-element/index.ts");

__webpack_require__("./src/components/input-field/style.scss");

var methods_value_1 = __webpack_require__("./src/components/input-field/methods-value.ts");

var style = __webpack_require__("./src/components/input-field/style.scss").toString();

var template = __webpack_require__("./src/components/input-field/index.html");

var componentName = "input-field";
var componentRoot = ".input-field-container";
var InputField =
/*#__PURE__*/
constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: properties_1.observedAttributes,
  properties: properties_1.properties,
  elements: elements_1["default"],
  methods: {
    setError: methods_value_1.setError
  },
  computed: {
    processedValue: computed_1.processedValue,
    formattedValue: computed_1.formattedValue,
    labelContainer: computed_1.labelContainer,
    valid: computed_1.valid,
    validationMessage: computed_1.validationMessage
  },
  getters: {
    value: function value(host) {
      return host.formattedValue;
    },
    invalid: function invalid(host) {
      return !host.valid;
    }
  },
  setters: {
    value: function value(host) {
      return function (value) {
        return host.state.value.next(value);
      };
    }
  },
  onConnected: function onConnected(host) {
    host.inputID = id_1["default"]();
    methods_elements_1.setEffects(host);
    requestAnimationFrame(function () {
      host.elements.checkIcon.svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"stroke:currentColor;stroke-width:2px;\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"/></svg>";
    });
  }
});
define_1["default"](componentName, InputField);
exports["default"] = InputField;

/***/ }),

/***/ "./src/components/input-field/methods-elements.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var elements_1 = __webpack_require__("./src/components/input-field/elements.ts");

var definitions_1 = __webpack_require__("./src/components/input-field/definitions.ts");

var validate_1 = __webpack_require__("./src/utils/validate/index.ts");

var attr_1 = __webpack_require__("./src/utils/html/attr.ts");

var replace_element_contents_1 = __webpack_require__("./src/utils/html/replace-element-contents.ts");

var query_1 = __webpack_require__("./src/utils/html/query.ts");

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var tagType = function tagType(type) {
  return type === "textarea" ? "textarea" : "input";
};

var getInputType = function getInputType(tag, type) {
  if (tag === "input") {
    switch (type) {
      case "checkbox":
      case "date":
      case "email":
      case "file":
      case "number":
      case "password":
      case "radio":
      case "tel":
      case "url":
        return type;
    }

    return "text";
  }

  return false;
};

exports.setInputValue = function (input, host) {
  attr_1.setAttribute(input, "value", host.processedValue.original);
  return input;
};

exports.setInput = function (host) {
  var inputContainer = host.elements.inputContainer;

  if (!inputContainer) {
    return;
  }

  var currentInput = host.elements.input;

  if (currentInput && typeof currentInput.dispose === "function") {
    currentInput.dispose();
  }

  if (host.type && Array.isArray(host.type) && host.type.length) {
    var container_1 = document.createElement("div");
    container_1.className = elements_1.elementSelectors.input.split(".").join("") + " multi-input";
    container_1.inputElements = [];
    container_1.focusedElement = null;
    container_1.tabIndex = -1;
    host.type.forEach(function (type) {
      var input = type.type === "span" ? document.createElement("span") : exports.createInput(type.type);
      input.className = "input-field-input-input";
      container_1.appendChild(input);

      if (type.type !== "span") {
        Object.keys(type).forEach(function (key) {
          if (key !== "type") {
            input[key] = type[key];
          }
        });
        container_1.inputElements.push(input);
        input.eventSubscriptions = {
          input: observeEvent_1["default"](input, "input").subscribe(function () {
            return container_1.dispatchEvent(new Event("input"));
          }),
          focus: observeEvent_1["default"](input, "focus").subscribe(function () {
            if (!container_1.focusedElement) {
              container_1.dispatchEvent(new Event("focus"));
            }

            container_1.focusedElement = input;
          }),
          blur: observeEvent_1["default"](input, "blur").subscribe(function () {
            if (container_1.focusedElement === input) {
              container_1.focusedElement = null;
              container_1.dispatchEvent(new Event("blur"));
            }
          })
        };
      }
    });

    if (!!host.value && Array.isArray(host.value)) {
      container_1.inputElements.forEach(function (input, index) {
        input.value = !!host.value[index] ? host.value[index] : "";
      });
    }

    Object.defineProperty(container_1, "value", {
      get: function get() {
        return this.inputElements.map(function (i) {
          return !!i.value ? i.value : "";
        });
      },
      set: function set(values) {
        this.inputElements.forEach(function (inp, i) {
          return inp.value = !!values[i] ? values[i] : "";
        });
      }
    });
    host.elements.input = container_1;

    container_1.dispose = function () {
      container_1.inputElements.forEach(function (innerInput) {
        return Object.keys(innerInput.eventSubscriptions).forEach(function (key) {
          return innerInput.eventSubscriptions[key]();
        });
      });
    };

    inputContainer.appendChild(container_1);
    return;
  }

  host.elements.input = replace_element_contents_1["default"](query_1.findIn(attr_1.setAttribute(host.elements.container, "input-kind", host.type), elements_1.elementSelectors.inputContainer), [exports.createInput(host.type)]).contents[0];
};

exports.createInput = function (type) {
  var tag = tagType(type);
  var input = document.createElement(tag);
  var typeAttribute = getInputType(tag, type);
  input.className = elements_1.elementSelectors.input.split(".").join("");

  if (typeAttribute) {
    input.setAttribute("type", typeAttribute);
  }

  return input;
};

exports.setEffects = function (host) {
  if (["checkbox", "radio"].indexOf(host.type) > -1) {
    host.elements.bounceZ["targets"] = [host.elements.inputContainerOuter];
  } else {
    host.elements.bounceZ["targets"] = [host.elements.inputContainerOuter];
    host.elements.ripple["targets"] = host.elements.underline["targets"] = [host.elements.input];
  }
};

exports.setInputID = function (host, value) {
  attr_1.setAttribute(host.elements.label, ["id", "for"], [value, value + "-input"]);
  attr_1.setAttribute(host.elements.help, "id", value + "-help");
  exports.setInputAttribute(host, ["id", "aria-labelledby", "aria-describedby"], [value + "-input", value, value + "-help"]);
};

exports.inputAttributeList = function (host) {
  return ["radio", "checkbox"].indexOf(host.inputType) > -1 ? definitions_1.InputFieldInputAttributes.bool : definitions_1.InputFieldInputAttributes.all;
};

exports.setInputAttribute = function (host, name, value) {
  var input = host.elements.input;
  var attrs = exports.inputAttributeList(host);

  var updateAttr = function updateAttr(n, v) {
    return attrs.indexOf(n) === -1 ? undefined : name === "value" ? exports.setInputValue(input, host) : attr_1.addRemoveAttr(input, n, v);
  };

  if (Array.isArray(name)) {
    name.forEach(function (n, i) {
      return updateAttr(n, value[i]);
    });
  } else {
    updateAttr(name, value);
  }
};

exports.setLabel = function (value, labelposition, host) {
  var labs = replace_element_contents_1["default"](host.labelContainer, [attr_1.setAttribute(replace_element_contents_1["default"](document.createElement("label"), validate_1.ValidateHtml(value, [], ["script"]).sanitized || "").element, ["id", "tabIndex", "for", "class"], [host.inputID, -1, host.inputID + "-input", "input-field-" + labelposition + "-label"])]).contents[0];
  host.elements.label = labs;
};

exports.textareaHeight = function (resize, input) {
  if (input.tagName.toLowerCase() !== "textarea" || resize !== "auto") {
    return;
  }

  input.style.overflow = "hidden";
  input.style.height = "inherit";
  input.style.height = input.scrollHeight + "px";
};

/***/ }),

/***/ "./src/components/input-field/methods-events.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var html_1 = __webpack_require__("./src/utils/html/index.ts");

var methods_value_1 = __webpack_require__("./src/components/input-field/methods-value.ts");

var dragDrop_1 = __webpack_require__("./src/services/dragDrop.ts");

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var use_if_1 = __webpack_require__("./src/utils/convert/use_if.ts");

exports.dispatch = function (host, type, data) {
  return host.dispatchEvent(new CustomEvent(type, {
    detail: data || host.state
  }));
};

exports.onInput = function (host) {
  var input = host.elements.input;
  var value = html_1.getValue(input);

  if (host.type === "file") {
    value = use_if_1["default"](function (v) {
      return v.length;
    }, function () {
      return "";
    }, methods_value_1.getFileValue(input)).value;
  }

  host.value = value;
  exports.dispatch(host, "input", host.value);
};

exports.onFocus = function (host) {
  if (host.focused) {
    return;
  }

  host.focused = true;
  host.setAttribute("focused", "true");
  methods_value_1.processValue(host);
  exports.dispatch(host, "focus", host);
};

exports.onBlur = function (host) {
  if (!host.focused) {
    return;
  }

  host.focused = false;
  host.setAttribute("focused", "false");
  exports.dispatch(host, "blur", host);
  host.elements.input.blur();
  methods_value_1.processValue(host);
};

exports.onKeyDown = function (e, host) {
  if (!e) {
    return;
  }

  if (e.key && e.key.toLowerCase() === "enter" && host.type !== "textarea") {
    return exports.onDone(host);
  }
};

exports.onLabelClick = function (e, host) {
  var input = host.elements.input;

  if (!input) {
    return;
  }

  exports.dispatch(host, "labelClick", host);

  if (["checkbox", "radio"].indexOf(host.type) === -1) {
    var bounceZ = host.elements.bounceZ;
    var ripple = host.elements.ripple;

    if (bounceZ) {
      bounceZ.trigger();
    }

    if (ripple) {
      ripple.trigger(e);
    }
  } else {
    input.focus();
  }
};

exports.onDone = function (host) {
  var input = host.elements.input;

  if (!input) {
    return;
  }

  input.blur();
  var valid = host.valid;
  var error = host.validationMessage.join(", ");

  if (!valid && error) {
    return host.setError(error);
  }

  exports.dispatch(host, "done", {
    processedValue: host.processedValue,
    value: host.value,
    valid: valid,
    error: error
  });
};

exports.onInvalid = function (host) {
  return exports.dispatch(host, "invalid", {
    processedValue: host.processedValue,
    value: host.value,
    error: host.validationMessage.join(", ")
  });
};

exports.setDroppable = function (host) {
  var input = host.elements.input;
  var container = host.elements.container;

  function drop(e) {
    host.value = use_if_1["default"](function (v) {
      return v.length > 0;
    }, function () {
      return "";
    }, !host.accept ? Array.from(e.detail.files) : Array.from(e.detail.files).filter(function (file) {
      return host.accept.indexOf(file.type) > -1;
    })).value;
    methods_value_1.processValue(host);
    exports.dispatch(host, "input", host.value);
  }

  if (!input || !container) {
    return;
  }

  if (container.dragDrop && typeof container.dragDrop.destroy === "function") {
    container.dragDrop.destroy();
  }

  if (container.drop$ && typeof container.drop$ === "function") {
    container.drop$();
  }

  if (container.dragended$ && typeof container.dragended$ === "function") {
    container.dragended$();
  }

  if (container.dragstarted$ && typeof container.dragstarted$ === "function") {
    container.dragstarted$();
  }

  if (!host.droppable) {
    return;
  }

  container.dragDrop = dragDrop_1["default"](container);
  container.drop$ = observeEvent_1["default"](container, "dropped").subscribe(drop);
  container.dragended$ = observeEvent_1["default"](container, "dragended").subscribe(function () {
    return document.body.classList.remove("dragging-elements");
  });
  container.dragstarted$ = observeEvent_1["default"](container, "dragstarted").subscribe(function () {
    return document.body.classList.add("dragging-elements");
  });
};

/***/ }),

/***/ "./src/components/input-field/methods-value.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var validate_1 = __webpack_require__("./src/utils/validate/index.ts");

var html_1 = __webpack_require__("./src/utils/html/index.ts");

var phone_1 = __webpack_require__("./src/utils/convert/phone.ts");

var postal_1 = __webpack_require__("./src/utils/convert/postal.ts");

var methods_elements_1 = __webpack_require__("./src/components/input-field/methods-elements.ts");

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var join_1 = __webpack_require__("./src/utils/convert/join.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var definitions_1 = __webpack_require__("./src/components/input-field/definitions.ts");

var attr_1 = __webpack_require__("./src/utils/html/attr.ts");

var meta_1 = __webpack_require__("./src/utils/convert/meta.ts");

var slice_1 = __webpack_require__("./src/utils/convert/slice.ts");

var split_1 = __webpack_require__("./src/utils/convert/split.ts");

var match_all_1 = __webpack_require__("./src/utils/convert/match_all.ts");

var match_1 = __webpack_require__("./src/utils/convert/match.ts");

var replace_1 = __webpack_require__("./src/utils/convert/replace.ts");

var after_every_nth_1 = __webpack_require__("./src/utils/convert/after_every_nth.ts");

var before_every_nth_1 = __webpack_require__("./src/utils/convert/before_every_nth.ts");

var uppercase_1 = __webpack_require__("./src/utils/convert/uppercase.ts");

var capitalize_1 = __webpack_require__("./src/utils/convert/capitalize.ts");

var lowercase_1 = __webpack_require__("./src/utils/convert/lowercase.ts");

exports.setMaskPositions = function (input, positions) {
  if (!input) {
    return;
  }

  if (input.setSelectionRange) {
    input.setSelectionRange(positions[0], positions[1]);
  } else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', positions[1]);
    range.moveStart('character', positions[0]);
    range.select();
  }
};

exports.valueToMask = function (value, masks, positions) {
  var initial = "+_ (___) ___-____";
  var newPositions = positions.slice(0);

  if (!value) {
    return {
      value: initial,
      positions: [1, 1]
    };
  }

  var incrementPositions = function incrementPositions(index) {
    if (positions[0] > index) {
      newPositions[0] = newPositions[0] + 1;
    }

    if (positions[1] > index) {
      newPositions[1] = newPositions[1] + 1;
    }
  };

  var getAreaCode = function getAreaCode(v) {
    var parts = v.split(/\D/g);
    var i = 0;

    while (i < parts.length) {
      if (parts[i] !== "") {
        return parts[i];
      }

      i = i + 1;
    }

    return "";
  };

  var valueAreaCode = getAreaCode(value);
  var possibles = [];
  var mask;
  var i = masks.length;

  while (!mask && i--) {
    var maskAreaCode = getAreaCode(masks[i].mask);

    if (valueAreaCode === maskAreaCode) {
      mask = masks[i].mask;
      break;
    }

    if (maskAreaCode.indexOf(valueAreaCode) === 0 || valueAreaCode.indexOf(maskAreaCode) === 0) {
      possibles.push(masks[i].mask);
    }
  }

  if (!mask && possibles[0]) {
    mask = possibles[0];
  }

  if (!mask) {
    return {
      value: "",
      positions: positions
    };
  }

  var valueParts = value.split("");
  var newValue = mask.split("").map(function (_char, index) {
    if (_char === valueParts[0]) {
      valueParts.shift();
      return _char;
    }

    if (_char === "#") {
      if (!valueParts.length) {
        // incrementPositions(index)
        return "_";
      }

      var v = valueParts.shift();

      while (v && /\D/.test(v)) {
        v = valueParts.shift();
      }

      return v;
    }

    if (/\d/.test(_char)) {
      valueParts.shift();
    } else {
      incrementPositions(index);
    }

    return _char;
  });
  return {
    value: newValue.join(""),
    positions: newPositions
  };
};

exports.valueFromMask = function (value, masks) {
  if (!value) {
    return value;
  }

  var split = function split(v) {
    return v.split(/\D/g).filter(function (v) {
      return !!v;
    });
  };

  var valueParts = split(value);
  var mask;
  var i = masks.length;

  while (i--) {
    var maskCode = split(masks[i].mask)[0];

    if (valueParts[0] === maskCode || maskCode.indexOf(valueParts[0]) > -1) {
      mask = masks[i].mask;
    }
  }

  if (!mask) {
    return value;
  }
};

exports.masker = function (input, value, positions, masks, unmask) {
  if (unmask === void 0) {
    unmask = false;
  }

  if (!masks || masks.length === 0) {
    return {
      input: input,
      value: value,
      newValue: value,
      masks: masks,
      positions: positions
    };
  }

  var newValue;

  if (unmask) {
    newValue = exports.valueFromMask(value, masks);
  } else {
    newValue = exports.valueToMask(value, masks, positions);
  }

  input.value = newValue.value || "";
  exports.setMaskPositions(input, newValue.positions);
  return {
    input: input,
    value: value,
    newValue: newValue.value,
    masks: masks,
    positions: newValue.positions
  };
};

exports.inputCaretPositions = function (input) {
  return !input ? [0, 0] : [input.selectionStart || 0, input.selectionEnd || 0];
};

exports.clearInput = function (host) {
  return host.value = "";
};

exports.setError = function (host) {
  return function (error) {
    host.processedError = error;
    host.invalid = !error ? false : true;
  };
};

exports.isEmpty = function (val) {
  return val === "" || val === null || val === undefined;
};

exports.sanitizeValue = function (val, type, allowhtml, disallowhtml) {
  if (Array.isArray(type)) {
    return type.map(function (t, i) {
      return exports.sanitizeValue(val[i], t.type, allowhtml, disallowhtml);
    });
  }

  var validation;

  switch (type) {
    case "number":
    case "month":
      validation = validate_1.ValidateNumber(val);

    case "radio":
    case "checkbox":
      validation = validate_1.ValidateBool(val);

    case "email":
      validation = validate_1.ValidateEmail(val);

    case "tel":
    case "usphone":
      validation = validate_1.ValidateUsPhone(val);

    case "intlphone":
      validation = validate_1.ValidateIntlPhone(val);

    case "uszip":
      validation = validate_1.ValidateUsZip(val);

    case "url":
      validation = validate_1.ValidateUrl(val);

    case "file":
      validation = definitions_1.processedFileValue(val);

    default:
      if (allowhtml || disallowhtml) {
        validation = validate_1.ValidateHtml(val, allowhtml, disallowhtml);
      } else {
        validation = validate_1.ValidateText(val);
      }

  }

  if (validation && !validation.valid && validation.reason[0] === "no value") {
    validation.reason.shift();
    validation.valid = true;
  }

  return validation;
};

var getFunction = function getFunction(functionString, args) {
  if (args === void 0) {
    args = [];
  }

  switch (functionString) {
    case "Slice":
    case "slice":
      return slice_1["default"].apply(null, args || []);

    case "Split":
    case "split":
      return split_1["default"](args[0]);

    case "Join":
    case "join":
      return join_1["default"](args[0]);

    case "Match":
    case "match":
      return match_1["default"].call(null, args[0]);

    case "MatchAll":
      return match_all_1["default"].call(null, args[0]);

    case "Replace":
    case "replace":
      return replace_1["default"].apply(null, args || []);

    case "UpperCase":
    case "toUpperCase":
      return uppercase_1["default"];

    case "LowerCase":
    case "toLowerCase":
      return lowercase_1["default"];

    case "Capitalize":
      return capitalize_1["default"];

    case "AfterEveryNth":
      return after_every_nth_1["default"].apply(null, args || []);

    case "BeforeEveryNth":
      return before_every_nth_1["default"].apply(null, args || []);
  }

  return t_monad_1.Tmonad;
};

exports.InputFieldFormatValue = function (value, format) {
  if (!format) {
    return t_monad_1.Tmonad(value);
  }

  var Format;

  if (typeof format === "string") {
    try {
      Format = JSON.parse(format).slice();
    } catch (error) {
      switch (format) {
        case "tel":
        case "telephone":
        case "phone":
        case "usphone":
          return phone_1.ToPhone(value);

        case "intlphone":
          return phone_1.ToIntlPhone(value);

        case "uszip":
          return postal_1.ToUsZip(value);
      }

      return t_monad_1.Tmonad(value);
    }
  } else if (!Array.isArray(format)) {
    return t_monad_1.Tmonad(value);
  }

  var functions = Format.map(function (f) {
    if (!f) {
      return false;
    }

    if (!Array.isArray(f)) {
      return getFunction(f);
    }

    return getFunction(f.slice(0, 1)[0], f.slice(1));
  }).filter(function (f) {
    return !!f;
  });
  return pipe_1["default"].apply(null, functions)(value);
};

exports.maxMin = function (host, value) {
  var nonStringTypes = ["number", "checkbox", "radio", "file"];
  var valid = true;
  var errorText = "";

  if (value === undefined || value === null) {
    return {
      value: value,
      valid: valid,
      errorText: errorText
    };
  }

  if (host.type === "number") {
    if (!!host.max && host.max < value) {
      value = host.max;
    }

    if (!!host.min && host.min > value) {
      value = host.min;
    }
  }

  if (nonStringTypes.indexOf(host.type) === -1) {
    if (!!host.max && host.max < value.length) {
      value = value.slice(0, host.max);
    }

    if (!!host.min && !!value && host.min > value.length && !host.focused) {
      errorText = "Must be at least " + host.min + " characters";
      valid = false;
    }
  }

  return {
    value: value,
    valid: valid,
    errorText: errorText
  };
};

exports.pattern = function (host, value) {
  if (!host.pattern) {
    return value;
  }

  return meta_1.RemoveMeta(value, host.pattern).value;
};

exports.getFileValue = function (input) {
  return !input || !input.files || input.files.length === 0 ? null : Array.from(input.files);
};

var getDroppedFiles = function getDroppedFiles(value) {
  return Array.isArray(value) && value.filter(function (f) {
    return f instanceof File;
  }).length ? value : null;
};

exports.processValue = function (host) {
  var input = host.elements.input;

  if (!input) {
    return;
  }

  var processed = host.processedValue;
  var sanitized = processed.sanitized;
  host.processedError = processed.reason.join(", ");
  var errors = host.validationMessage;
  var valid = (errors.length ? false : processed.valid) || !host.focused && host.valid;
  var autofilled = html_1.isAutoFilled(input);
  var stringEmpty = (isNaN(sanitized) || typeof sanitized === "string") && !sanitized.length;
  var empty = stringEmpty && !autofilled;
  host.count = host.type === "number" ? sanitized : sanitized ? sanitized.length : 0;
  host.elements.container.classList[!!sanitized ? "add" : "remove"]("checked");

  if (host.type === "file") {
    var files = getDroppedFiles(sanitized) || exports.getFileValue(input);
    var filenames = !files ? [] : files.map(function (f) {
      return f.name;
    });
    attr_1.setAttribute(host.elements.inputContainer, "title", filenames.join(", "));

    try {
      input.files = (new ClipboardEvent("").clipboardData || new DataTransfer()).files;
    } catch (error) {}
  } else {
    try {
      var selectionEnd = input.selectionEnd;
      var cursorPosition_1 = selectionEnd; // masker(input, sanitized, [input.selectionStart, input.selectionEnd], countries)

      var formatted = exports.InputFieldFormatValue(sanitized, host.format || host.type);
      var newValue = formatted.value || "";
      var current = input.value;

      if (formatted.stringChanges && formatted.stringChanges.length) {
        formatted.stringChanges.forEach(function (change) {
          if (!!change.added && !!change.removed && change.start < cursorPosition_1) {
            return cursorPosition_1 = cursorPosition_1 + (change.added.length - change.removed.length);
          }

          if (!!change.removed && change.start < cursorPosition_1) {
            return cursorPosition_1 = cursorPosition_1 - change.removed.length;
          }

          if (!!change.added && change.start < cursorPosition_1) {
            return cursorPosition_1 = cursorPosition_1 + change.added.length;
          }
        });
      }

      input.cursorPosition = cursorPosition_1;

      if (current !== newValue || host.type === "intlphone") {
        input.value = newValue;

        if (formatted.stringChanges && formatted.stringChanges.length) {
          html_1.setInputCaret(input, cursorPosition_1, host.shadowRoot);
        }
      }
    } catch (error) {}
  }

  methods_elements_1.textareaHeight(host.resize, input);
  host.notempty = !empty;

  if (valid) {
    return host.invalid = false;
  }

  if (empty) {
    return host.invalid = false;
  }

  if (!host.focused) {
    return host.invalid = true;
  }
};

/***/ }),

/***/ "./src/components/input-field/properties.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var if_not_1 = __webpack_require__("./src/utils/convert/if_not.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var commas_to_array_1 = __webpack_require__("./src/utils/convert/commas-to-array.ts");

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var object_1 = __webpack_require__("./src/utils/convert/object.ts");

var indexof_1 = __webpack_require__("./src/utils/convert/indexof.ts");

var to_array_1 = __webpack_require__("./src/utils/convert/to_array.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var methods_elements_1 = __webpack_require__("./src/components/input-field/methods-elements.ts");

var validate_1 = __webpack_require__("./src/utils/validate/index.ts");

var elements_1 = __webpack_require__("./src/components/input-field/elements.ts");

var methods_value_1 = __webpack_require__("./src/components/input-field/methods-value.ts");

var methods_events_1 = __webpack_require__("./src/components/input-field/methods-events.ts");

var attr_1 = __webpack_require__("./src/utils/html/attr.ts");

var replace_element_contents_1 = __webpack_require__("./src/utils/html/replace-element-contents.ts");

var definitions_1 = __webpack_require__("./src/components/input-field/definitions.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var trueOrNull = function trueOrNull(val) {
  return pipe_1["default"](bool_1["default"], if_not_1["default"](true, null))(val).value;
};

var addRemoveContainerClass = function addRemoveContainerClass(val, host, clss) {
  return host.elements.container.classList[!!val ? "add" : "remove"](clss);
};

var onChange = function onChange() {};

var inputStates = {
  focused: {
    format: trueOrNull,
    onChange: function onChange(val, host) {
      return addRemoveContainerClass(val, host, "focused");
    }
  },
  notempty: {
    format: trueOrNull,
    onChange: function onChange(val, host) {
      return addRemoveContainerClass(val, attr_1.setAttribute(host, "has-value", "" + val), "notempty");
    }
  },
  invalid: {
    format: function format(val) {
      return bool_1["default"](val).value;
    },
    onChange: function onChange(val, host) {
      elements_1.setColors(host, val);
      attr_1.setAttribute(host.elements.container, "valid", val);
      addRemoveContainerClass(val, host, "invalid");
    }
  },
  ready: {
    format: trueOrNull,
    onChange: function onChange(val, host) {
      return addRemoveContainerClass(val, host, "ready");
    }
  },
  count: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](0))(val).value;
    },
    onChange: function onChange(val, host) {
      return replace_element_contents_1["default"](host.elements.count, val);
    }
  }
};
var inputAttributes = {
  accept: {
    format: function format(val) {
      return pipe_1["default"](commas_to_array_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_1.setInputAttribute(host, "accept", val);
    }
  },
  autocomplete: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_1.setInputAttribute(host, "autocomplete", val);
    }
  },
  autofocus: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_not_1["default"](true, null))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_1.setInputAttribute(host, "autofocus", val);
    }
  },
  disabled: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_not_1["default"](true, null))(val).value;
    },
    onChange: function onChange(val, host) {
      methods_elements_1.setInputAttribute(host, "disabled", val);
      addRemoveContainerClass(val, host, "disabled");
    }
  },
  maxlength: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(val, host) {
      replace_element_contents_1["default"](host.elements.max, val || "");
      addRemoveContainerClass(val, host, "maxlength");
      methods_value_1.processValue(host);
    }
  },
  max: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(val, host) {
      replace_element_contents_1["default"](host.elements.max, val || "");
      addRemoveContainerClass(val, host, "max");
      methods_value_1.processValue(host);
    }
  },
  min: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(val, host) {
      addRemoveContainerClass(val, host, "min");
      methods_value_1.processValue(host);
    }
  },
  name: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_1.setInputAttribute(host, "name", val);
    }
  },
  pattern: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(_val, host) {
      return methods_value_1.processValue(host);
    }
  },
  placeholder: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_1.setInputAttribute(host, "placeholder", val);
    }
  },
  readonly: {
    format: trueOrNull,
    onChange: function onChange(val, host) {
      return methods_elements_1.setInputAttribute(host, "readonly", val);
    }
  },
  required: {
    format: trueOrNull,
    onChange: function onChange(val, host) {
      return methods_elements_1.setInputAttribute(host, "required", val);
    }
  },
  step: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_1.setInputAttribute(host, "step", val);
    }
  },
  tabindex: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](1))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_1.setInputAttribute(host, "tabIndex", val);
    }
  },
  type: {
    format: function format(val) {
      return pipe_1["default"](to_array_1["default"], if_invalid_1["default"](val))(val).value || "text";
    },
    onChange: function onChange(_val, host) {
      return methods_elements_1.setInput(host);
    }
  },
  value: {
    format: function format(val) {
      return val;
    },
    onChange: function onChange(_val, host) {
      return methods_value_1.processValue(host);
    }
  }
};
var inputFieldProperties = {
  accentcolor: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("#59a2d8"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_1.setColors(host, host.invalid);
    }
  },
  allowhtml: {
    format: function format(val) {
      return pipe_1["default"](commas_to_array_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: onChange
  },
  "class": component_class_object_1["default"],
  clearbutton: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(val, host) {
      attr_1.setAttribute(host.elements.clearButton, "type", val);
      addRemoveContainerClass(!!val, host, "clearbutton");
    }
  },
  disablefilter: {
    format: function format(val) {
      return bool_1["default"](val).value;
    },
    onChange: function onChange(val, host) {
      return addRemoveContainerClass(val, host, "disablefilter");
    }
  },
  disallowhtml: {
    format: function format(val) {
      return pipe_1["default"](commas_to_array_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: onChange
  },
  droppable: {
    format: function format(val) {
      return bool_1["default"](val).value;
    },
    onChange: function onChange(_val, host) {
      return methods_events_1.setDroppable(host);
    }
  },
  format: {
    format: function format(val) {
      return pipe_1["default"](object_1.ToObject, if_invalid_1["default"](pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value))(val).value;
    },
    onChange: function onChange(_val, host) {
      return methods_value_1.processValue(host);
    }
  },
  helptext: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](""))(val).value;
    },
    onChange: function onChange(val, host) {
      return replace_element_contents_1["default"](host.elements.help, validate_1.ValidateHtml(val, [], ["script"]).sanitized || "");
    }
  },
  icon: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    },
    onChange: function onChange(val, host) {
      attr_1.setAttribute(host.elements.icon, "type", val);
      addRemoveContainerClass(val, host, "icon");
    }
  },
  iconalign: {
    format: function format(val) {
      return typeof val === "string" && (val === "left" || val === "right") ? val : "left";
    },
    onChange: function onChange(val, host) {
      return attr_1.setAttribute(host.elements.container, "icon-align", val);
    }
  },
  inputID: {
    format: function format(val) {
      return !!val ? val : "";
    },
    onChange: function onChange(val, host) {
      return methods_elements_1.setInputID(host, val);
    }
  },
  // Needs to be before the label property otherwise won't be able to find labelContainer in computed
  labelposition: {
    format: function format(val) {
      return pipe_1["default"](indexof_1["default"](definitions_1.labelPositions), if_invalid_1["default"]("inside"))(val).value;
    },
    onChange: function onChange(val, host) {
      attr_1.setAttribute(host.elements.container, "label-position", val);
      methods_elements_1.setLabel(host.label, val, host);
    }
  },
  label: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](""))(val).value;
    },
    onChange: function onChange(val, host) {
      return methods_elements_1.setLabel(val, host.labelposition, host);
    }
  },
  musthave: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](null))(val).value;
    }
  },
  matchinput: {
    format: function format(val) {
      return val;
    }
  },
  processedError: {
    format: function format(val) {
      return validate_1.ValidateHtml(pipe_1["default"](to_string_1["default"], if_invalid_1["default"](""))(val).value, [], ["script"]).sanitized || "";
    },
    onChange: function onChange(val, host) {
      return !!val ? replace_element_contents_1["default"](host.elements.error, val) : undefined;
    }
  },
  resize: {
    format: function format(val) {
      return pipe_1["default"](indexof_1["default"](definitions_1.resizeOptions), if_invalid_1["default"]("auto"))(val).value;
    },
    onChange: function onChange(val, host) {
      return attr_1.setAttribute(host.elements.container, "resize", val);
    }
  },
  showcount: {
    format: trueOrNull,
    onChange: function onChange(val, host) {
      return addRemoveContainerClass(val, host, "showcount");
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return elements_1.setStyles(host.elements.injectedStyles, val);
    }
  },
  theme: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return elements_1.setStyles(host.elements.themeStyles, val);
    }
  },
  warningcolor: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("#a10005"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return elements_1.setColors(host, host.invalid);
    }
  }
};
exports.observedAttributes = Object.keys(inputAttributes).concat(Object.keys(inputFieldProperties), Object.keys(inputStates));
exports.properties = Object.assign({}, inputAttributes, inputFieldProperties, inputStates);

/***/ }),

/***/ "./src/components/overlay-content/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var curve_1 = __webpack_require__("./src/utils/curve/index.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

__webpack_require__("./src/components/overlay-content/style.scss");

var indexof_1 = __webpack_require__("./src/utils/convert/indexof.ts");

var style = __webpack_require__("./src/components/overlay-content/style.scss").toString();

exports.setStyles = function (el, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles);
};

var alignments = ["center", "left", "right", "top", "bottom", "center center", "center top", "center bottom", "left center", "left top", "left bottom", "right center", "right top", "right bottom"];

var template = __webpack_require__("./src/components/overlay-content/index.html");

var componentName = "overlay-content";
var componentRoot = ".overlay-content-container";
var positionPadding = 40;
var elements = {};
var elementSelectors = {
  root: componentRoot,
  contentContainer: ".overlay-content-content-container",
  contentInner: ".overlay-content-content-inner",
  inner: ".overlay-content-container-inner",
  injectedStyles: "style.injectedStyles"
};
Object.keys(elementSelectors).forEach(function (key) {
  elements[key] = {
    selector: elementSelectors[key],
    onChange: key === "injectedStyles" ? function (el, host) {
      return exports.setStyles(el, host.styles);
    } : function () {}
  };
});
var widths = ["content", "target"];
var attributes = {
  target: {
    format: function format(val) {
      return val instanceof HTMLElement ? val : null;
    }
  },
  align: {
    format: function format(val) {
      return pipe_1["default"](indexof_1["default"](alignments), if_invalid_1["default"]("center"))(val).value;
    }
  },
  from: {
    format: function format(val) {
      return pipe_1["default"](indexof_1["default"](alignments), if_invalid_1["default"]("center"))(val).value;
    }
  },
  speed: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](333))(val).value;
    }
  },
  "class": component_class_object_1["default"],
  widthbasis: {
    format: function format(val) {
      return pipe_1["default"](indexof_1["default"](widths), if_invalid_1["default"]("content"))(val).value;
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return exports.setStyles(host.elements.injectedStyles, val);
    }
  }
};

var getWidth = function getWidth(host) {
  var targetWidth = !!host.target ? host.target.getBoundingClientRect().width + "px" : "auto";
  return {
    width: !host.widthbasis || host.widthbasis === "content" ? "auto" : targetWidth,
    minWidth: targetWidth
  };
};

var setPositions = function setPositions(host) {
  return function () {
    cancelAnimationFrame(host.positionTimer);
    var target = host.target;

    if (!host.showing || !target) {
      return;
    }

    var container = host.elements.contentContainer;
    var inner = host.elements.inner;
    var rootBox = host.elements.root.getBoundingClientRect();

    if (rootBox.y !== 0) {
      inner.style.top = "-" + rootBox.y + "px";
    }

    if (rootBox.x !== 0) {
      inner.style.left = "-" + rootBox.x + "px";
    }

    if (rootBox.width !== document.documentElement.clientWidth) {
      inner.style.width = document.documentElement.clientWidth + "px";
    }

    if (rootBox.height !== document.documentElement.clientHeight) {
      inner.style.height = document.documentElement.clientHeight + "px";
    }

    var targetBox = target.getBoundingClientRect();
    var isOnTop = host.isOnTop;

    if (targetBox.top - 10 > document.documentElement.clientHeight || targetBox.bottom + 10 < 0) {
      return host.hide();
    }

    var widths = getWidth(host);
    container.style.width = widths.width;
    container.style.minWidth = widths.minWidth;
    container.style.height = "auto";
    container.style.maxHeight = host.height + "px";
    var left = targetBox.left + container.offsetWidth >= window.innerWidth - 10 ? targetBox.right - container.offsetWidth : targetBox.left;
    container.style.left = left + "px";
    container.style.top = (isOnTop ? targetBox.top - container.offsetHeight : host.spaceAbove + targetBox.height) + "px";
    var origin = "center " + (isOnTop ? "bottom" : "top");
    host.width = container.offsetWidth;
    container.style.transformOrigin = "" + origin;

    if (inner.classList.contains("bottom") && isOnTop) {
      inner.classList.remove("bottom");
    }

    if (!inner.classList.contains("bottom") && !isOnTop) {
      inner.classList.add("bottom");
    }

    host.positionTimer = requestAnimationFrame(function () {
      setPositions(host)();
    });
  };
};

var OverlayContent = constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: Object.keys(attributes),
  properties: Object.assign({
    positionTimer: {
      format: function format(val) {
        return val;
      }
    },
    showing: {
      format: function format(val) {
        return bool_1["default"](val).value;
      }
    },
    width: {
      format: function format(val) {
        return val;
      },
      onChange: function onChange(_val, host) {
        host.dispatchEvent(new CustomEvent("widthchange", {
          detail: host
        }));
      }
    }
  }, attributes),
  computed: {
    height: function height(host) {
      return {
        get: function get() {
          return (host.isOnTop ? host.spaceAbove : host.spaceBelow) - positionPadding;
        }
      };
    },
    isOnTop: function isOnTop(host) {
      return {
        get: function get() {
          return host.spaceAbove > host.spaceBelow;
        }
      };
    },
    spaceAbove: function spaceAbove(host) {
      return {
        get: function get() {
          return host.target ? host.target.getBoundingClientRect().top : 0;
        }
      };
    },
    spaceBelow: function spaceBelow(host) {
      return {
        get: function get() {
          return document.documentElement.clientHeight - (host.spaceAbove + (host.target ? host.target.getBoundingClientRect().height : 0));
        }
      };
    },
    position: function position(host) {
      return {
        get: function get() {
          var container = host.elements.contentContainer;

          if (!container) {
            return {
              top: 0,
              y: 0,
              bottom: 0,
              left: 0,
              x: 0,
              right: 0,
              width: 0,
              height: 0,
              scrollTop: 0,
              scrollLeft: 0
            };
          }

          var box = container.getBoundingClientRect();
          return {
            top: box.top,
            y: box.y,
            bottom: box.bottom,
            left: box.left,
            x: box.x,
            right: box.right,
            width: box.width,
            height: box.height,
            scrollTop: container.scrollTop,
            scrollLeft: container.scrollLeft
          };
        }
      };
    }
  },
  methods: {
    scrollContent: function scrollContent(host) {
      return function (x, y) {
        var container = host.elements.contentContainer;
        container.scrollTop = y;
        container.scrollLeft = x;
      };
    },
    show: function show(host) {
      return function () {
        if (host.showing) {
          return Promise.resolve();
        }

        return new Promise(function (resolve) {
          host.elements.root.classList.add("activating");
          host.showing = true;
          setPositions(host)();
          var scalePoints = curve_1.GetCurve([0, 1.02, 0.99, 1]);
          var timeout = curve_1.GetCurve([0, host.speed / scalePoints.length]);
          var widths = getWidth(host);
          var container = host.elements.contentContainer;
          container.style.width = widths.width;
          container.style.minWidth = widths.minWidth;

          var loop = function loop() {
            if (!host.showing) {
              return Promise.resolve();
            }

            var scalePoint = scalePoints.shift();
            var time = timeout[scalePoints.length];
            container.style.transform = "scale(1, " + scalePoint + ")";

            if (scalePoints.length) {
              setTimeout(function () {
                return loop();
              }, time);
            } else {
              host.elements.root.classList.add("active");
              host.elements.root.classList.remove("activating");
              resolve();
              host.dispatchEvent(new CustomEvent("shown"));
            }
          };

          loop();
        });
      };
    },
    hide: function hide(host) {
      return function () {
        if (!host.showing) {
          return Promise.resolve();
        }

        return new Promise(function (resolve) {
          host.elements.root.classList.remove("activating");
          host.showing = false;
          var scalePoints = curve_1.GetCurve([1, 0]);
          var timeout = curve_1.GetCurve([0, host.speed / scalePoints.length]);
          var container = host.elements.contentContainer;

          var loop = function loop() {
            if (host.showing) {
              return resolve();
            }

            var scalePoint = scalePoints.shift();
            var time = timeout[scalePoint.length];
            container.style.transform = "scale(1, " + scalePoint + ")";

            if (scalePoints.length) {
              setTimeout(function () {
                return loop();
              }, time);
            } else {
              host.elements.root.classList.remove("active");
              resolve();
              host.dispatchEvent(new CustomEvent("hidden"));
            }
          };

          loop();
        });
      };
    }
  },
  elements: elements
});
define_1["default"](componentName, OverlayContent);
exports["default"] = OverlayContent;

/***/ }),

/***/ "./src/components/overlay-message/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

__webpack_require__("./src/components/overlay-message/style.scss");

__webpack_require__("./src/components/button-element/index.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var indexof_1 = __webpack_require__("./src/utils/convert/indexof.ts");

var get_1 = __webpack_require__("./src/utils/get/index.ts");

var set_1 = __webpack_require__("./src/utils/set/index.ts");

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var events_1 = __webpack_require__("./src/utils/html/events.ts");

var style = __webpack_require__("./src/components/overlay-message/style.scss").toString();

var template = __webpack_require__("./src/components/overlay-message/index.html");

var componentName = "overlay-message";
var componentRoot = "." + componentName + "-container";

var setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles);
};

var setShown = function setShown(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  var endEventName = events_1["default"]("transitionend");

  var dispatch = function dispatch() {
    return host.dispatchEvent(new CustomEvent(host.shown ? "opened" : "closed", {
      detail: host
    }));
  };

  if (!!endEventName) {
    root.addEventListener(endEventName, function startEvent() {
      root.removeEventListener(endEventName, startEvent);
      requestAnimationFrame(dispatch);
    });
  } else {
    requestAnimationFrame(dispatch);
  }

  root.classList[host.shown ? "add" : "remove"]("shown");
};

var setColorTheme = function setColorTheme(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute("colortheme", host.colortheme);
};

var setCloseButton = function setCloseButton(host) {
  Array.from(host.querySelectorAll("*")).forEach(function (el) {
    try {
      get_1["default"](el, "eventSubscriptions.closeOverlay", function () {})();
    } catch (error) {}
  });

  if (!host.closeselector) {
    return;
  }

  Array.from(host.querySelectorAll(host.closeselector)).forEach(function (el) {
    return set_1["default"](el, "eventSubscriptions.closeOverlay", observeEvent_1["default"](el, "click").subscribe(function () {
      return host.shown = false;
    }));
  });
};

var properties = {
  "class": component_class_object_1["default"],
  shown: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setShown(host);
    }
  },
  colortheme: {
    format: function format(val) {
      return pipe_1["default"](indexof_1["default"](["dark", "light", "transparent"]), if_invalid_1["default"]("light"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setColorTheme(host);
    }
  },
  closeselector: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"]("[overlay-message-close]"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setCloseButton(host);
    }
  },
  styles: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](""))(val).value;
    },
    onChange: function onChange(val, host) {
      return setStyles(host.elements.injectedStyles, val);
    }
  },
  theme: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](""))(val).value;
    },
    onChange: function onChange(val, host) {
      return setStyles(host.elements.themeStyles, val);
    }
  }
};
var observedAttributes = Object.keys(properties);
var elements = {
  root: {
    selector: componentRoot,
    onChange: function onChange(_el, host) {
      setColorTheme(host);
      setShown(host);
    }
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: function onChange(el, host) {
      return setStyles(el, host.styles);
    }
  },
  themeStyles: {
    selector: "style.themeStyles",
    onChange: function onChange(el, host) {
      return setStyles(el, host.theme);
    }
  }
};
var OverlayMessage = constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: observedAttributes,
  properties: properties,
  elements: elements,
  onConnected: function onConnected(host) {
    host.slotObserver = new MutationObserver(function (mutationsList) {
      var i = 0;

      while (i < mutationsList.length) {
        if (mutationsList[i].type === "childList") {
          return setCloseButton(host);
        }

        i = i++;
      }
    });
    host.slotObserver.observe(host, {
      childList: true
    });
  }
});
define_1["default"](componentName, OverlayMessage);
exports["default"] = OverlayMessage;

/***/ }),

/***/ "./src/components/snack-bar/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

__webpack_require__("./src/components/snack-bar/style.scss");

__webpack_require__("./src/components/button-element/index.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

var indexof_1 = __webpack_require__("./src/utils/convert/indexof.ts");

var events_1 = __webpack_require__("./src/utils/html/events.ts");

var if_empty_1 = __webpack_require__("./src/utils/convert/if_empty.ts");

var style = __webpack_require__("./src/components/snack-bar/style.scss").toString();

var template = __webpack_require__("./src/components/snack-bar/index.html");

var componentName = "snack-bar";
var componentRoot = "." + componentName + "-container";
var infoiconSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z\"/></svg>";
var successiconSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\"/></svg>";
var erroriconSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"/></svg>";
var warningiconSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\"/></svg>";

var setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles);
};

var setShown = function setShown(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  var endEventName = events_1["default"]("transitionend");

  var dispatch = function dispatch() {
    return host.dispatchEvent(new CustomEvent(host.shown ? "opened" : "closed", {
      detail: host
    }));
  };

  if (!!endEventName) {
    root.addEventListener(endEventName, function startEvent() {
      root.removeEventListener(endEventName, startEvent);
      requestAnimationFrame(dispatch);
    });
  } else {
    requestAnimationFrame(dispatch);
  }

  root.classList[host.shown ? "add" : "remove"]("shown");
};

var setAlign = function setAlign(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute("align", host.align);
};

var setType = function setType(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute("type", host.type);
};

var setIcon = function setIcon(host, key) {
  var icon = host.elements[key];

  if (!icon) {
    return;
  }

  icon[host[key][0] === "<" ? "svg" : "type"] = host[key];
};

var showHideClose = function showHideClose(el, show) {
  if (!el) {
    return;
  }

  el.classList[show ? "remove" : "add"]("hide-close-btn");
};

var properties = {
  "class": component_class_object_1["default"],
  shown: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setShown(host);
    }
  },
  align: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], indexof_1["default"](["top", "bottom", "none"]), if_invalid_1["default"]("bottom"))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setAlign(host);
    }
  },
  type: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](""))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setType(host);
    }
  },
  infoicon: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](infoiconSvg), if_empty_1["default"](infoiconSvg))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setIcon(host, "infoicon");
    }
  },
  successicon: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](successiconSvg), if_empty_1["default"](successiconSvg))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setIcon(host, "successicon");
    }
  },
  erroricon: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](erroriconSvg), if_empty_1["default"](erroriconSvg))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setIcon(host, "erroricon");
    }
  },
  warningicon: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](warningiconSvg), if_empty_1["default"](warningiconSvg))(val).value;
    },
    onChange: function onChange(_val, host) {
      return setIcon(host, "warningicon");
    }
  },
  hideclose: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: function onChange(val, host) {
      return showHideClose(host.elements.root, !val);
    }
  },
  styles: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](""))(val).value;
    },
    onChange: function onChange(val, host) {
      return setStyles(host.elements.injectedStyles, val);
    }
  },
  theme: {
    format: function format(val) {
      return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](""))(val).value;
    },
    onChange: function onChange(val, host) {
      return setStyles(host.elements.themeStyles, val);
    }
  }
};
var observedAttributes = Object.keys(properties);
var elements = {
  root: {
    selector: componentRoot,
    onChange: function onChange(_el, host) {
      setAlign(host);
      setShown(host);
    }
  },
  button: {
    selector: ".snack-bar-close",
    onChange: function onChange(el, host) {
      el.eventListeners = {
        click: observeEvent_1["default"](el, "click").subscribe(function () {
          return host.shown = false;
        })
      };
      showHideClose(host.elements.root, !host.hideclose);
    }
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: function onChange(el, host) {
      return setStyles(el, host.styles);
    }
  },
  themeStyles: {
    selector: "style.themeStyles",
    onChange: function onChange(el, host) {
      return setStyles(el, host.theme);
    }
  },
  infoicon: {
    selector: ".infoicon",
    onChange: function onChange(_el, host) {
      return setIcon(host, "infoicon");
    }
  },
  successicon: {
    selector: ".successicon",
    onChange: function onChange(_el, host) {
      return setIcon(host, "successicon");
    }
  },
  erroricon: {
    selector: ".erroricon",
    onChange: function onChange(_el, host) {
      return setIcon(host, "erroricon");
    }
  },
  warningicon: {
    selector: ".warningicon",
    onChange: function onChange(_el, host) {
      return setIcon(host, "warningicon");
    }
  }
};
var SnackBar = constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: observedAttributes,
  properties: properties,
  elements: elements
});
define_1["default"](componentName, SnackBar);
exports["default"] = SnackBar;

/***/ }),

/***/ "./src/components/spinner-element/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

__webpack_require__("./src/components/spinner-element/style.scss");

var style = __webpack_require__("./src/components/spinner-element/style.scss").toString();

var setStyles = function setStyles(el, styles) {
  if (!el) {
    return;
  }

  set_style_rules_1["default"](el, styles);
};

var setTheme = function setTheme(value, host) {
  var themeElement = host.elements.theme;

  if (!themeElement || value === undefined) {
    return;
  }

  set_style_rules_1["default"](themeElement, value);
};

var template = __webpack_require__("./src/components/spinner-element/index.html");

var componentName = "spinner-element";
var componentRoot = "." + componentName + "-container";

var doAllTheThings = function doAllTheThings(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute("type", host.type);
  setRootClass(host, host.page, "fullpage");
  setRootClass(host, host.scrim, "showscrim");
  setType(host);
  setScrimColor(host);
  setScrimOpacity(host);
  setBlur(host);
};

var setRootClass = function setRootClass(host, condition, clss) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.classList[condition ? "add" : "remove"](clss);
};

var setType = function setType(host) {
  var root = host.elements.root;

  if (!root) {
    return;
  }

  root.setAttribute("type", host.type);
};

var setBlur = function setBlur(host) {
  var scrim = host.elements.scrim;

  if (!scrim) {
    return;
  }

  scrim.style.backdropFilter = "blur(" + host.blur + "px)";
};

var setScrimColor = function setScrimColor(host) {
  var scrim = host.elements.scrim;

  if (!scrim) {
    return;
  }

  scrim.style.background = host.scrimcolor;
};

var setScrimOpacity = function setScrimOpacity(host) {
  var scrim = host.elements.scrim;

  if (!scrim) {
    return;
  }

  if (host.scrim) {
    return scrim.style.opacity = host.scrimopacity;
  }

  scrim.style.opacity = 0;
};

var toggleVisibility = function toggleVisibility(host) {
  host.elements.root.classList[host.visible ? "add" : "remove"]("shown");
};

var elements = {
  root: {
    selector: componentRoot,
    onChange: function onChange(_el, host) {
      return doAllTheThings(host);
    }
  },
  scrim: {
    selector: ".spinner-element-scrim",
    onChange: function onChange(_el, host) {
      return doAllTheThings(host);
    }
  },
  inner: {
    selector: ".spinner-element-inner"
  },
  slot: {
    selector: "slot"
  },
  injectedStyles: {
    selector: "style.injectedStyles",
    onChange: function onChange(el, host) {
      return setStyles(el, host.styles);
    }
  },
  theme: {
    selector: "style.themeStyles",
    onChange: function onChange(_el, host) {
      return setTheme(host.theme, host);
    }
  }
};
var properties = {
  "class": component_class_object_1["default"],
  visible: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: function onChange(_val, host) {
      return toggleVisibility(host);
    }
  },
  page: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: function onChange(_val, host) {
      return doAllTheThings(host);
    }
  },
  scrim: {
    format: function format(val) {
      return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
    },
    onChange: function onChange(_val, host) {
      return doAllTheThings(host);
    }
  },
  blur: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](0))(val).value;
    },
    onChange: function onChange(_val, host) {
      return doAllTheThings(host);
    }
  },
  scrimopacity: {
    format: function format(val) {
      return pipe_1["default"](to_number_1["default"], if_invalid_1["default"](1))(val).value;
    },
    onChange: function onChange(_val, host) {
      return doAllTheThings(host);
    }
  },
  styles: {
    format: function format(val) {
      return typeof val === "string" ? val : "";
    },
    onChange: function onChange(val, host) {
      return setStyles(host.elements.injectedStyles, val);
    }
  },
  type: {
    format: function format(val) {
      return typeof val === "string" ? val : "column";
    },
    onChange: function onChange(_val, host) {
      return doAllTheThings(host);
    }
  },
  theme: {
    format: function format(val, host) {
      return typeof val === "string" ? val : host.theme;
    },
    onChange: setTheme
  }
};
var SpinnerElement = constructor_1["default"]({
  componentName: componentName,
  componentRoot: componentRoot,
  template: template,
  style: style,
  observedAttributes: Object.keys(properties),
  properties: properties,
  elements: elements
});
define_1["default"](componentName, SpinnerElement);
exports["default"] = SpinnerElement;

/***/ }),

/***/ "./src/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var button_element_1 = __webpack_require__("./src/components/button-element/index.ts");

exports.ButtonElement = button_element_1["default"];

var content_drawer_1 = __webpack_require__("./src/components/content-drawer/index.ts");

exports.ContentDrawer = content_drawer_1["default"];

var content_transition_1 = __webpack_require__("./src/components/content-transition/index.ts");

exports.ContentTransition = content_transition_1["default"];

var cookie_message_1 = __webpack_require__("./src/components/cookie-message/index.ts");

exports.CookieMessage = cookie_message_1["default"];

var drop_down_1 = __webpack_require__("./src/components/drop-down/index.ts");

exports.DropDown = drop_down_1["default"];

var dropdown_select_1 = __webpack_require__("./src/components/dropdown-select/index.ts");

exports.DropdownSelect = dropdown_select_1["default"];

var effect_bounce_z_1 = __webpack_require__("./src/components/effect-bounce-z/index.ts");

exports.EffectBounceZ = effect_bounce_z_1["default"];

var effect_fade_1 = __webpack_require__("./src/components/effect-fade/index.ts");

exports.EffectFade = effect_fade_1["default"];

var effect_ripple_1 = __webpack_require__("./src/components/effect-ripple/index.ts");

exports.EffectRipple = effect_ripple_1["default"];

var effect_scale_1 = __webpack_require__("./src/components/effect-scale/index.ts");

exports.EffectScale = effect_scale_1["default"];

var effect_underline_1 = __webpack_require__("./src/components/effect-underline/index.ts");

exports.EffectUnderline = effect_underline_1["default"];

var grid_layout_1 = __webpack_require__("./src/components/grid-layout/index.ts");

exports.GridLayout = grid_layout_1["default"];

var horizontal_slider_1 = __webpack_require__("./src/components/horizontal-slider/index.ts");

exports.HorizontalSlider = horizontal_slider_1["default"];

var icon_element_1 = __webpack_require__("./src/components/icon-element/index.ts");

exports.IconElement = icon_element_1["default"];

var image_loader_1 = __webpack_require__("./src/components/image-loader/index.ts");

exports.ImageLoader = image_loader_1["default"];

var input_field_1 = __webpack_require__("./src/components/input-field/index.ts");

exports.InputField = input_field_1["default"];

var overlay_content_1 = __webpack_require__("./src/components/overlay-content/index.ts");

exports.OverlayContent = overlay_content_1["default"];

var overlay_message_1 = __webpack_require__("./src/components/overlay-message/index.ts");

exports.OverlayMessage = overlay_message_1["default"];

var snack_bar_1 = __webpack_require__("./src/components/snack-bar/index.ts");

exports.SnackBar = snack_bar_1["default"];

var spinner_element_1 = __webpack_require__("./src/components/spinner-element/index.ts");

exports.SpinnerElement = spinner_element_1["default"];

var dragDrop_1 = __webpack_require__("./src/services/dragDrop.ts");

exports.DragDropService = dragDrop_1["default"];

var request_1 = __webpack_require__("./src/services/request.ts");

exports.Request = request_1["default"];

var router_1 = __webpack_require__("./src/services/router.ts");

exports.Router = router_1["default"];

var timer_1 = __webpack_require__("./src/services/timer.ts");

exports.Timer = timer_1["default"];

var unsupported_1 = __webpack_require__("./src/services/unsupported.ts");

exports.WCSupportClass = unsupported_1["default"];

var uploader_1 = __webpack_require__("./src/services/uploader.ts");

exports.Uploader = uploader_1["default"];

var componentStore_1 = __webpack_require__("./src/services/componentStore.ts");

exports.ComponentStore = componentStore_1["default"];

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

exports.Constructor = constructor_1["default"];

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

exports.Define = define_1["default"];

var css_rules_1 = __webpack_require__("./src/utils/webcomponent/css-rules.ts");

exports.CSSRulesFromSelector = css_rules_1["default"];

var append_style_1 = __webpack_require__("./src/utils/webcomponent/append-style.ts");

exports.AppendStyle = append_style_1["default"];

var template_1 = __webpack_require__("./src/utils/webcomponent/template.ts");

exports.Template = template_1["default"];

var elements_1 = __webpack_require__("./src/utils/webcomponent/elements.ts");

exports.Elements = elements_1["default"];

var render_markup_1 = __webpack_require__("./src/utils/webcomponent/render-markup.ts");

exports.RenderMarkup = render_markup_1["default"];

var bool_1 = __webpack_require__("./src/utils/validate/bool.ts");

exports.ValidateBool = bool_1["default"];

var date_1 = __webpack_require__("./src/utils/validate/date.ts");

exports.ValidateDate = date_1["default"];

var dateafter_1 = __webpack_require__("./src/utils/validate/dateafter.ts");

exports.ValidateDateAfter = dateafter_1["default"];

var datebefore_1 = __webpack_require__("./src/utils/validate/datebefore.ts");

exports.ValidateDateBefore = datebefore_1["default"];

var email_1 = __webpack_require__("./src/utils/validate/email.ts");

exports.ValidateEmail = email_1["default"];

var html_1 = __webpack_require__("./src/utils/validate/html.ts");

exports.ValidateHtml = html_1["default"];

var number_1 = __webpack_require__("./src/utils/validate/number.ts");

exports.ValidateNumber = number_1["default"];

var one_of_1 = __webpack_require__("./src/utils/validate/one-of.ts");

exports.ValidateOneOf = one_of_1["default"];

var phone_1 = __webpack_require__("./src/utils/validate/phone.ts");

exports.ValidatePhone = phone_1["default"];

var phone_intl_1 = __webpack_require__("./src/utils/validate/phone-intl.ts");

exports.ValidateIntlPhone = phone_intl_1["default"];

var phone_us_1 = __webpack_require__("./src/utils/validate/phone-us.ts");

exports.ValidateUsPhone = phone_us_1["default"];

var text_1 = __webpack_require__("./src/utils/validate/text.ts");

exports.ValidateText = text_1["default"];

var url_1 = __webpack_require__("./src/utils/validate/url.ts");

exports.ValidateUrl = url_1["default"];

var year_1 = __webpack_require__("./src/utils/validate/year.ts");

exports.ValidateYear = year_1["default"];

var zip_us_1 = __webpack_require__("./src/utils/validate/zip-us.ts");

exports.ValidateUsZip = zip_us_1["default"];

var any_empty_1 = __webpack_require__("./src/utils/type/any-empty.ts");

exports.isAnyEmpty = any_empty_1["default"];

var date_2 = __webpack_require__("./src/utils/type/date.ts");

exports.isDate = date_2["default"];

var dom_1 = __webpack_require__("./src/utils/type/dom.ts");

exports.isDom = dom_1["default"];

var empty_1 = __webpack_require__("./src/utils/type/empty.ts");

exports.isEmpty = empty_1["default"];

var get_1 = __webpack_require__("./src/utils/type/get.ts");

exports.Type = get_1["default"];

var object_1 = __webpack_require__("./src/utils/type/object.ts");

exports.isObject = object_1["default"];

var primitives_1 = __webpack_require__("./src/utils/type/primitives.ts");

exports.isPrimitive = primitives_1["default"];

var set_1 = __webpack_require__("./src/utils/set/index.ts");

exports.Set = set_1["default"];

var assign_1 = __webpack_require__("./src/utils/polyfills/assign.ts");

exports.ObjectAssignPolyfill = assign_1["default"];

var mutation_1 = __webpack_require__("./src/utils/polyfills/mutation.ts");

exports.MutationObserverPolyfill = mutation_1["default"];

var wc_1 = __webpack_require__("./src/utils/polyfills/wc.ts");

exports.WebComponentPolyFill = wc_1["default"];

var mobile_1 = __webpack_require__("./src/utils/platform/mobile.ts");

exports.isMobile = mobile_1["default"];

var equals_1 = __webpack_require__("./src/utils/equals/index.ts");

exports.Equals = equals_1["default"];

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

exports.Pipe = pipe_1["default"];

var partial_1 = __webpack_require__("./src/utils/partial/index.ts");

exports.Partial = partial_1["default"];

var observeWorker_1 = __webpack_require__("./src/utils/observeWorker/index.ts");

exports.ObserveWorker = observeWorker_1["default"];

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

exports.ObserveEvent = observeEvent_1["default"];

var observe_1 = __webpack_require__("./src/utils/observe/index.ts");

exports.Observe = observe_1["default"];

var id_1 = __webpack_require__("./src/utils/id/index.ts");

exports.ID = id_1["default"];

var get_2 = __webpack_require__("./src/utils/get/index.ts");

exports.Get = get_2["default"];

var extension_1 = __webpack_require__("./src/utils/extension/index.ts");

exports.Extension = extension_1["default"];

var ease_bounce_1 = __webpack_require__("./src/utils/curve/ease-bounce.ts");

exports.EaseBounce = ease_bounce_1["default"];

var ease_in_out_1 = __webpack_require__("./src/utils/curve/ease-in-out.ts");

exports.EaseInOut = ease_in_out_1["default"];

var ease_in_1 = __webpack_require__("./src/utils/curve/ease-in.ts");

exports.EaseIn = ease_in_1["default"];

var ease_out_1 = __webpack_require__("./src/utils/curve/ease-out.ts");

exports.EaseOut = ease_out_1["default"];

var ease_power_1 = __webpack_require__("./src/utils/curve/ease-power.ts");

exports.EasePower = ease_power_1["default"];

var get_ease_1 = __webpack_require__("./src/utils/curve/get-ease.ts");

exports.GetEase = get_ease_1["default"];

var get_3 = __webpack_require__("./src/utils/curve/get.ts");

exports.GetCurve = get_3["default"];

var curry_1 = __webpack_require__("./src/utils/curry/index.ts");

exports.Curry = curry_1["default"];

var scroll_1 = __webpack_require__("./src/utils/scroll/index.ts");

exports.ScrollTo = scroll_1["default"];

var throttle_1 = __webpack_require__("./src/utils/throttle/index.ts");

exports.Throttle = throttle_1["default"];

var bool_2 = __webpack_require__("./src/utils/convert/bool.ts");

exports.ToBool = bool_2["default"];

var commas_to_array_1 = __webpack_require__("./src/utils/convert/commas-to-array.ts");

exports.CommasToArray = commas_to_array_1["default"];

var date_3 = __webpack_require__("./src/utils/convert/date.ts");

exports.FirstOfMonth = date_3.FirstOfMonth;
exports.LastOfMonth = date_3.LastOfMonth;
exports.MonthData = date_3.MonthData;

var dom_2 = __webpack_require__("./src/utils/convert/dom.ts");

exports.IsElement = dom_2.IsElement;
exports.IsElementType = dom_2.IsElementType;
exports.SelectorToElement = dom_2.SelectorToElement;
exports.SelectorArrayToElements = dom_2.SelectorArrayToElements;
exports.SelectorArrayToAllElements = dom_2.SelectorArrayToAllElements;
exports.SelectorToElements = dom_2.SelectorToElements;

var entities_1 = __webpack_require__("./src/utils/convert/entities.ts");

exports.ToEntities = entities_1.ToEntities;
exports.FromEntities = entities_1.FromEntities;

var function_1 = __webpack_require__("./src/utils/convert/function.ts");

exports.ToFunction = function_1.ToFunction;
exports.PartialFunction = function_1.PartialFunction;

var from_json_1 = __webpack_require__("./src/utils/convert/from_json.ts");

exports.FromJson = from_json_1["default"];

var to_json_1 = __webpack_require__("./src/utils/convert/to_json.ts");

exports.ToJson = to_json_1["default"];

var meta_1 = __webpack_require__("./src/utils/convert/meta.ts");

exports.MatchMeta = meta_1.MatchMeta;
exports.JoinMeta = meta_1.JoinMeta;
exports.RemoveMeta = meta_1.RemoveMeta;
exports.ReplaceMeta = meta_1.ReplaceMeta;
exports.SplitMeta = meta_1.SplitMeta;

var object_2 = __webpack_require__("./src/utils/convert/object.ts");

exports.ToObject = object_2.ToObject;
exports.KeysAre = object_2.KeysAre;
exports.HasKeys = object_2.HasKeys;

var options_1 = __webpack_require__("./src/utils/convert/options.ts");

exports.Options = options_1.Options;

var phone_2 = __webpack_require__("./src/utils/convert/phone.ts");

exports.ToIntlPhone = phone_2.ToIntlPhone;
exports.ToPhone = phone_2.ToPhone;

var postal_1 = __webpack_require__("./src/utils/convert/postal.ts");

exports.ToUsZip = postal_1.ToUsZip;

var regex_1 = __webpack_require__("./src/utils/convert/regex.ts");

exports.ReplacementPattern = regex_1.ReplacementPattern;
exports.ToRegex = regex_1.ToRegex;

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

exports.isTMonad = t_monad_1.isTMonad;
exports.Tmonad = t_monad_1.Tmonad;
exports.finishTMonad = t_monad_1.finishTMonad;

var tap_1 = __webpack_require__("./src/utils/convert/tap.ts");

exports.Tap = tap_1.Tap;

var uri_1 = __webpack_require__("./src/utils/convert/uri.ts");

exports.EncodeUri = uri_1.EncodeUri;
exports.EncodeUriComponent = uri_1.EncodeUriComponent;
exports.DecodeUri = uri_1.DecodeUri;
exports.DecodeUriComponent = uri_1.DecodeUriComponent;
exports.doURI = uri_1.doURI;

var to_digits_1 = __webpack_require__("./src/utils/convert/to_digits.ts");

exports.ToDigits = to_digits_1["default"];

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

exports.ToNumber = to_number_1["default"];

var to_date_1 = __webpack_require__("./src/utils/convert/to_date.ts");

exports.ToDate = to_date_1["default"];

var date_to_object_1 = __webpack_require__("./src/utils/convert/date_to_object.ts");

exports.DateToObject = date_to_object_1["default"];

var has_non_digits_1 = __webpack_require__("./src/utils/convert/has_non_digits.ts");

exports.HasNonDigits = has_non_digits_1["default"];

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

exports.IfInvalid = if_invalid_1["default"];

var if_empty_1 = __webpack_require__("./src/utils/convert/if_empty.ts");

exports.IfEmpty = if_empty_1["default"];

var if_is_1 = __webpack_require__("./src/utils/convert/if_is.ts");

exports.IfIs = if_is_1["default"];

var if_not_1 = __webpack_require__("./src/utils/convert/if_not.ts");

exports.IfNot = if_not_1["default"];

var if_not_empty_1 = __webpack_require__("./src/utils/convert/if_not_empty.ts");

exports.IfNotEmpty = if_not_empty_1["default"];

var if_valid_1 = __webpack_require__("./src/utils/convert/if_valid.ts");

exports.IfValid = if_valid_1["default"];

var use_if_1 = __webpack_require__("./src/utils/convert/use_if.ts");

exports.UseIf = use_if_1["default"];

var stop_if_empty_1 = __webpack_require__("./src/utils/convert/stop_if_empty.ts");

exports.StopIfEmpty = stop_if_empty_1["default"];

var stop_if_invalid_1 = __webpack_require__("./src/utils/convert/stop_if_invalid.ts");

exports.StopIfInvalid = stop_if_invalid_1["default"];

var stop_if_valid_1 = __webpack_require__("./src/utils/convert/stop_if_valid.ts");

exports.StopIfValid = stop_if_valid_1["default"];

var to_array_1 = __webpack_require__("./src/utils/convert/to_array.ts");

exports.ToArray = to_array_1["default"];

var force_to_array_1 = __webpack_require__("./src/utils/convert/force_to_array.ts");

exports.ForceToArray = force_to_array_1["default"];

var join_1 = __webpack_require__("./src/utils/convert/join.ts");

exports.Join = join_1["default"];

var map_1 = __webpack_require__("./src/utils/convert/map.ts");

exports.Map = map_1["default"];

var filter_1 = __webpack_require__("./src/utils/convert/filter.ts");

exports.Filter = filter_1["default"];

var indexof_1 = __webpack_require__("./src/utils/convert/indexof.ts");

exports.IndexOf = indexof_1["default"];

var slice_1 = __webpack_require__("./src/utils/convert/slice.ts");

exports.Slice = slice_1["default"];

var trim_1 = __webpack_require__("./src/utils/convert/trim.ts");

exports.Trim = trim_1["default"];

var to_plain_text_1 = __webpack_require__("./src/utils/convert/to_plain_text.ts");

exports.ToPlainText = to_plain_text_1["default"];

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

exports.ToString = to_string_1["default"];

var split_1 = __webpack_require__("./src/utils/convert/split.ts");

exports.Split = split_1["default"];

var replace_1 = __webpack_require__("./src/utils/convert/replace.ts");

exports.Replace = replace_1["default"];

var after_every_nth_1 = __webpack_require__("./src/utils/convert/after_every_nth.ts");

exports.AfterEveryNth = after_every_nth_1["default"];

var before_every_nth_1 = __webpack_require__("./src/utils/convert/before_every_nth.ts");

exports.BeforeEveryNth = before_every_nth_1["default"];

var match_1 = __webpack_require__("./src/utils/convert/match.ts");

exports.Match = match_1["default"];

var match_all_1 = __webpack_require__("./src/utils/convert/match_all.ts");

exports.MatchAll = match_all_1["default"];

var uppercase_1 = __webpack_require__("./src/utils/convert/uppercase.ts");

exports.UpperCase = uppercase_1["default"];

var uppercase_2 = __webpack_require__("./src/utils/convert/uppercase.ts");

exports.LowerCase = uppercase_2["default"];

var capitalize_1 = __webpack_require__("./src/utils/convert/capitalize.ts");

exports.Capitalize = capitalize_1["default"];

var to_color_1 = __webpack_require__("./src/utils/convert/to_color.ts");

exports.ToColor = to_color_1["default"];

var attr_1 = __webpack_require__("./src/utils/html/attr.ts");

exports.setAttribute = attr_1.setAttribute;
exports.addRemoveAttr = attr_1.addRemoveAttr;

var events_1 = __webpack_require__("./src/utils/html/events.ts");

exports.EventName = events_1["default"];

var inputs_1 = __webpack_require__("./src/utils/html/inputs.ts");

exports.setInputCaret = inputs_1.setInputCaret;
exports.isAutoFilled = inputs_1.isAutoFilled;
exports.isFocused = inputs_1.isFocused;
exports.getInvalidMessage = inputs_1.getInvalidMessage;
exports.getValue = inputs_1.getValue;

var replace_element_contents_1 = __webpack_require__("./src/utils/html/replace-element-contents.ts");

exports.replaceElementContents = replace_element_contents_1["default"];

var query_1 = __webpack_require__("./src/utils/html/query.ts");

exports.findIn = query_1.findIn;

var tags_1 = __webpack_require__("./src/utils/html/tags.ts");

exports.svgTags = tags_1.svgTags;
exports.htmlTags = tags_1.htmlTags;

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

exports.ComponentClassObject = component_class_object_1["default"];

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

exports.SetStyleRules = set_style_rules_1["default"];

var merge_1 = __webpack_require__("./src/utils/merge/index.ts");

exports.Merge = merge_1["default"];

/***/ }),

/***/ "./src/services/componentStore.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var get_1 = __webpack_require__("./src/utils/get/index.ts");

var ComponentStoreKey = Symbol["for"]("builtjs.ComponentStore");
var globalSymbols = Object.getOwnPropertySymbols(global);
var hasComponentStore = globalSymbols.indexOf(ComponentStoreKey) > -1;

var getTag = function getTag(element) {
  return get_1["default"](element, "tagName", "").toLowerCase();
};

if (!hasComponentStore) {
  global[ComponentStoreKey] = {
    components: {},
    themes: {},
    theme: function theme(_theme, element) {
      return Object.keys(_theme).forEach(function (property) {
        return element[property] = _theme[property];
      });
    },
    addComponent: function addComponent(element) {
      var tag = getTag(element);

      if (tag === "") {
        return;
      }

      if (!global[ComponentStoreKey].components[tag]) {
        global[ComponentStoreKey].components[tag] = [];
      }

      global[ComponentStoreKey].components[tag].push(element);

      if (global[ComponentStoreKey].themes[tag]) {
        Object.keys(global[ComponentStoreKey].themes[tag]).forEach(function (property) {
          return element[property] = global[ComponentStoreKey].themes[tag][property];
        });
      }
    },
    removeComponent: function removeComponent(element) {
      var tag = getTag(element);

      if (tag === "") {
        return;
      }

      if (!global[ComponentStoreKey].components[tag]) {
        return;
      }

      var index = global[ComponentStoreKey].components[tag].indexOf(element);

      if (index === -1) {
        return;
      }

      global[ComponentStoreKey].components[tag].splice(index, 1);
    },
    addTheme: function addTheme(tag, theme) {
      global[ComponentStoreKey].themes[tag] = theme;

      if (!global[ComponentStoreKey].components[tag]) {
        return;
      }

      global[ComponentStoreKey].components[tag].forEach(function (element) {
        return global[ComponentStoreKey].theme(global[ComponentStoreKey].themes[tag], element);
      });
    }
  };
}

var ComponentStore = global[ComponentStoreKey]; // Object.defineProperty(ComponentStore, "instance", {
//     get: function () {
//         return global[ComponentStoreKey];
//     }
// })

Object.freeze(ComponentStore);
exports["default"] = ComponentStore;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/services/dragDrop.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var DragDropService =
/*#__PURE__*/
function DragDropService(
/*#__PURE__*/
element) {
  var draggables = [];
  var htmlElement = document.firstElementChild;

  var filterElements = function filterElements(elements) {
    return elements.filter(function (el) {
      return el.parentNode;
    });
  };

  var handleDataTransfer = function handleDataTransfer(dataTransfer) {
    return element.dispatchEvent(new CustomEvent("dropped", {
      detail: dataTransfer
    }));
  };

  var setUserSelect = function setUserSelect(remove) {
    if (remove === void 0) {
      remove = false;
    }

    if (!remove) {
      htmlElement.style.userSelect = "none";
    } else {
      htmlElement.style.removeProperty("user-select");
    }
  };

  var startDrag = function startDrag(e) {
    var target = e.target;

    if (target && target.getAttribute("draggable") === "false") {
      return;
    }

    e.preventDefault();
    setUserSelect();
    element.dispatchEvent(new CustomEvent("dragstarted"));
  };

  var drop = function drop(e) {
    e.preventDefault();
    element.classList.remove("dragging");
    element.classList.remove("dragover");
    setUserSelect(true);
    handleDataTransfer(e.dataTransfer || e.originalEvent.dataTransfer);
  };

  var dragover = function dragover(e) {
    e.preventDefault();
    element.classList.add("dragover");
  };

  var dragleave = function dragleave(e) {
    e.preventDefault();
    element.classList.remove("dragover");
  };

  var dragend = function dragend(e) {
    e.preventDefault();
    element.classList.remove("dragging");
    element.classList.remove("dragover");
    setUserSelect(true);
    element.dispatchEvent(new CustomEvent("dragended"));
  };

  element.addEventListener("dragstart", startDrag);
  element.addEventListener("dragover", dragover);
  element.addEventListener("drop", drop);
  element.addEventListener("dragleave", dragleave);
  element.addEventListener("dragend", dragend);
  var methods = {
    get draggables() {
      return filterElements(draggables);
    },

    set draggables(elements) {
      draggables = [];
      filterElements(Array.from(elements)).forEach(function (d) {
        draggables.push(d);
      });
    },

    get dropZone() {
      return element;
    },

    destroy: function destroy() {
      element.removeEventListener("dragstart", startDrag);
      element.removeEventListener("dragover", dragover);
      element.removeEventListener("drop", drop);
      element.removeEventListener("dragleave", dragleave);
      element.removeEventListener("dragend", dragleave);
      var isDragging = element.classList.contains("dragging");

      if (isDragging) {
        element.classList.remove("dragging");
        document.body.classList.remove("dragging-elements");
      }
    }
  };
  return methods;
};

exports["default"] = DragDropService;

/***/ }),

/***/ "./src/services/request.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var observeWorker_1 = __webpack_require__("./src/utils/observeWorker/index.ts");

var Request =
/*#__PURE__*/
function Request(
/*#__PURE__*/
apiBase) {
  return function (reqData) {
    var base = apiBase;
    var path = "" + base + ("/" + (reqData.path || "")).split("//").join("/");
    var REQ = Object.assign({}, {
      data: undefined,
      headers: {},
      method: "POST"
    }, reqData, {
      path: path
    });
    var isFormData = REQ.data instanceof FormData;

    if (!isFormData && REQ.data && typeof REQ.data !== "string") {
      REQ.data = JSON.stringify(REQ.data);
    }

    if (isFormData) {
      REQ.toForm = true;
      var jsonData_1 = {};
      REQ.data.forEach(function (value, key) {
        jsonData_1[key] = value;
      });
      REQ.data = JSON.stringify(REQ.data);
    }

    return new Promise(function (resolve, reject) {
      var worker$ = observeWorker_1["default"](function () {
        self.onmessage = function (e) {
          var xhr = new XMLHttpRequest();
          var data = JSON.parse(e.data);
          var formData = data.data;

          if (data.toForm) {
            var form_1 = new FormData();
            Object.keys(formData).forEach(function (key) {
              return form_1.append(key, formData[key]);
            });
            formData = form_1;
          }

          xhr.open(data.method, data.path, false);
          Object.keys(data.headers).forEach(function (key) {
            return xhr.setRequestHeader(key, data.headers[key]);
          });

          xhr.onload = function () {
            return postMessage({
              status: xhr.status,
              response: xhr.responseText || xhr.statusText
            });
          };

          xhr.onerror = function () {
            return postMessage({
              status: xhr.status,
              response: xhr.statusText
            });
          };

          xhr.send(data.data);
        };
      });
      var workerSubscription = worker$.subscribe(function (e) {
        workerSubscription();
        var res = e.response;

        try {
          res = JSON.parse(res);
        } catch (error) {}

        if (e.status === 200) {
          return resolve(res);
        } else {
          return reject(e);
        }
      }, function (e) {
        workerSubscription();
        reject(e);
      });
      worker$.post(REQ);
    });
  };
};

exports["default"] = Request;

/***/ }),

/***/ "./src/services/router.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var observe_1 = __webpack_require__("./src/utils/observe/index.ts");

var get_1 = __webpack_require__("./src/utils/get/index.ts");

var __1 = __webpack_require__("./src/index.ts");

var Router = function Router(routes) {
  var current = {};
  var lastState = {};

  var _routes = Object.assign({}, routes);

  var invalidQuery = function invalidQuery(searchString) {
    return !searchString || typeof searchString.split !== "function" || searchString === "";
  };

  var getQuery = function getQuery(search) {
    var result = {};

    if (!!search && !!search.search) {
      search = search.search;
    }

    var searchString = search;

    if (invalidQuery(searchString)) {
      searchString = location.search;

      if (invalidQuery(searchString)) {
        return result;
      }
    }

    var queryString = searchString.split("?")[1];

    if (invalidQuery(queryString)) {
      return result;
    }

    queryString.split("&").forEach(function (v) {
      if (!v || typeof v.split !== "function") {
        return;
      }

      result[v.split("=")[0]] = v.split("=")[1];
    });
    return result;
  };

  var queryObjectToString = function queryObjectToString(query) {
    if (query === void 0) {
      query = {};
    }

    if (!Object.keys(query).length) {
      return "";
    }

    var queries = Object.keys(query).map(function (q) {
      return __1.isEmpty(query[q]) ? false : q + "=" + query[q];
    }).filter(function (v) {
      return !!v;
    }).join("&");

    if (!!queries) {
      return "?" + queries;
    }

    return "";
  };

  var addLeadingSlash = function addLeadingSlash(pathname) {
    return !pathname ? "" : pathname[0] === "/" ? pathname : "/" + pathname;
  };

  var joinUrl = function joinUrl(pathname, query) {
    return location.protocol + "//" + location.host + addLeadingSlash(pathname) + queryObjectToString(query);
  };

  var updateState = function updateState(route, replace, force) {
    if (replace === void 0) {
      replace = false;
    }

    if (force === void 0) {
      force = false;
    }

    if (!route) {
      return;
    }

    var lastQuery = queryObjectToString(getQuery("?" + lastState.query));
    var currentQuery = queryObjectToString(route.query);
    var full = joinUrl(route.pathname, route.query);
    var state = {
      title: route.title || document.title,
      pathname: route.pathname,
      full: full,
      query: route.query || {}
    };

    if (route.pathname === lastState.pathname && lastQuery === currentQuery && !force) {
      return;
    }

    if ((replace || force) && history.replaceState) {
      history.replaceState(state, document.title, full);
    }

    if (!replace && !force && history.pushState) {
      history.pushState(state, document.title, full);
    }

    if (lastQuery !== currentQuery || force) {
      methods.query$.next(route.query);
    }

    lastState = Object.assign({}, state);
  };

  var getRouteByPath = function getRouteByPath(path) {
    var r;
    var i = 0;
    var keys = Object.keys(_routes);
    var urlParts = typeof path === "string" ? path.split("/") : [];

    while (i < keys.length && !r) {
      if (_routes[keys[i]].pathname === path) {
        return _routes[keys[i]];
      }

      if (_routes[keys[i]].pathname.indexOf("/*") > -1) {
        var pathParts = _routes[keys[i]].pathname.split("/");

        if (pathParts.length > urlParts.length) {
          if (pathParts[urlParts.length - 1] !== "**") {
            i = i + 1;
            continue;
          }
        }

        if (pathParts.length < urlParts.length) {
          if (pathParts[pathParts.length - 1] !== "**") {
            i = i + 1;
            continue;
          }
        }

        var match = false;
        var partsIndex = 0;

        while (partsIndex < pathParts.length) {
          if (urlParts[partsIndex] !== pathParts[partsIndex] && pathParts[partsIndex].indexOf("*") === -1) {
            match = false;
            break;
          }

          match = true;
          partsIndex = partsIndex + 1;
        }

        if (match) {
          return _routes[keys[i]];
        }
      }

      i = i + 1;
    }

    return {};
  };

  var getRoute = function getRoute(url) {
    return getRouteByPath(parseUrl(url));
  };

  var parseUrl = function parseUrl(url) {
    return typeof url === "string" ? __1.ValidateHtml(url.split("?")[0]).sanitized // prevent XSS
    : !!url.pathname ? __1.ValidateHtml(url.pathname).sanitized // prevent XSS
    : "";
  };

  var handleRoute = function handleRoute(url, replace, force) {
    if (replace === void 0) {
      replace = false;
    }

    if (force === void 0) {
      force = false;
    }

    var parsedUrl = parseUrl(url);
    var route = getRoute(url);
    methods.logs.push({
      data: {
        parsedUrl: parsedUrl,
        route: route,
        current: Object.assign({}, current)
      },
      arg: url,
      log: "route" + (replace ? "replace" : "")
    });

    if (!route) {
      return replace ? false : methods.route("/");
    }

    if (!!route.title) {
      document.title = route.title;
    }

    var currentPath = get_1["default"](current, "pathname");
    var routePath = get_1["default"](route, "pathname");
    var currentQuery = queryObjectToString(get_1["default"](current, "query", {}));
    var query = getQuery(url);

    if (route.allowedQueries && Array.isArray(route.allowedQueries)) {
      if (route.allowedQueries.length === 0) {
        query = {};
      }

      var allowed_1 = {};
      Object.keys(query).forEach(function (queryKey) {
        return route.allowedQueries.indexOf(queryKey) > -1 ? allowed_1[queryKey] = query[queryKey] : undefined;
      });
      query = allowed_1;
    }

    var routeQuery = queryObjectToString(query);

    if (routePath === currentPath && currentQuery === routeQuery && !force) {
      return true;
    }

    current = Object.assign({}, route, {
      query: query,
      pathname: parsedUrl
    });

    if (replace) {
      updateState(current, true, force);
    } else {
      updateState(current, false, force);
    }

    methods.route$.next(current);
    return true;
  };

  current = Object.assign({}, {
    path: location.pathname,
    query: getQuery(location.search),
    base: location.protocol + "//" + location.host + (!!location.port ? ":" + location.port : "")
  }, getRouteByPath(location.pathname));
  var methods = {
    get current() {
      return Object.assign({}, current || {}, {
        path: location.pathname,
        base: location.protocol + "//" + location.host + (!!location.port ? ":" + location.port : "")
      });
    },

    getRouteByPath: getRouteByPath,
    getQuery: getQuery,
    queryObjectToString: queryObjectToString,
    routes: _routes,
    logs: [],
    has: function has(url) {
      return !!getRoute(url);
    },
    updateQuery: function updateQuery(query) {
      if (!current) {
        return;
      }

      current = Object.assign({}, current, {
        query: query
      });
      methods.logs.push({
        data: Object.assign({}, current),
        arg: Object.assign({}, query),
        log: "updateQuery"
      });
      updateState(current);
    },
    addQuery: function addQuery(query) {
      if (!current) {
        return;
      }

      current = Object.assign({}, current);
      current.query = Object.assign({}, current.query, query);
      methods.logs.push({
        data: Object.assign({}, current),
        arg: Object.assign({}, query),
        log: "addQuery"
      });
      updateState(current);
    },
    replaceQuery: function replaceQuery(query) {
      if (!current) {
        return;
      }

      current = Object.assign({}, current);
      current.query = query;
      methods.logs.push({
        data: Object.assign({}, current),
        arg: Object.assign({}, query),
        log: "replaceQuery"
      });
      updateState(current, true);
    },
    route: function route(url, force) {
      if (force === void 0) {
        force = false;
      }

      return handleRoute(url, false, force);
    },
    replaceRoute: function replaceRoute(url, force) {
      if (force === void 0) {
        force = false;
      }

      return handleRoute(url, true, force);
    },
    route$: observe_1["default"](undefined),
    query$: observe_1["default"](undefined)
  };
  methods.route("" + location.pathname + location.search);

  var findParentLink = function findParentLink(parent) {
    var link;

    try {
      while (!link && parent && parent !== document.body) {
        if (get_1["default"](parent, "tagName").toLowerCase() === "a") {
          link = parent;
        }

        parent = parent.parentElement;
      }
    } catch (error) {}

    return link;
  };

  document.documentElement.addEventListener("click", function (e) {
    var target = e.target;
    var tag = target.tagName.toLowerCase();
    var link;

    if (tag === "a") {
      link = target;
    }

    if (!link && Array.isArray(e.path)) {
      var pathIndex = 0;

      while (!link && pathIndex < e.path.length) {
        if (get_1["default"](e, "path." + pathIndex + ".tagName", "").toLowerCase() === "a" && !!get_1["default"](e, "path." + pathIndex + ".href")) {
          link = get_1["default"](e, "path." + pathIndex);
        }

        pathIndex = pathIndex + 1;
      }
    } // Safari


    if (!link && e.composedPath && typeof e.composedPath === "function") {
      var ePath = e.composedPath();
      var pathIndex = 0;

      while (!link && pathIndex < ePath.length) {
        if (get_1["default"](ePath, pathIndex + ".tagName", "").toLowerCase() === "a" && !!get_1["default"](ePath, pathIndex + ".href")) {
          link = ePath[pathIndex];
        }

        pathIndex = pathIndex + 1;
      }
    } // FF and IE


    if (!link && e.originalTarget) {
      link = findParentLink(e.originalTarget);
    }

    if (!link && e.explicitOriginalTarget) {
      link = findParentLink(e.explicitOriginalTarget);
    }

    if (!link) {
      link = findParentLink(e.parentElement);
    }

    if (!link) {
      return;
    }

    try {
      var url = new URL(link.href);

      if (url.host !== location.host) {
        return;
      }

      if (methods.route(url)) {
        e.preventDefault();
      }
    } catch (error) {}
  }, true);
  window.addEventListener('popstate', function () {
    return methods.route("" + location.pathname + location.search, true);
  }, false);
  return methods;
};

exports["default"] = Router;

/***/ }),

/***/ "./src/services/timer.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var id_1 = __webpack_require__("./src/utils/id/index.ts");

var subscriptions = {};
var isRunning = false;

var loop = function loop() {
  isRunning = true;
  var subscriptionKeys = Object.keys(subscriptions);

  if (!subscriptionKeys.length) {
    isRunning = false;
    return;
  }

  subscriptionKeys.forEach(function (key) {
    var subscription = subscriptions[key];
    var currentFrame = new Date().getTime() - subscription.started;

    if (!!subscription.duration && typeof subscription.frames[currentFrame] === 'undefined') {
      return subscriptions[key].cancel();
    }

    subscription.fn(subscription.frames[currentFrame]);
  });
  requestAnimationFrame(loop);
};

var Timer =
/*#__PURE__*/
function Timer(duration, stepFn, frameValues, completeFn) {
  if (frameValues === void 0) {
    frameValues = undefined;
  }

  if (completeFn === void 0) {
    completeFn = function completeFn() {};
  }

  if (!duration && duration !== 0) {
    return;
  }

  var id = id_1["default"]();
  subscriptions[id] = {
    id: id,
    duration: duration,
    complete: typeof completeFn !== "function" ? function () {} : completeFn,
    fn: typeof stepFn !== "function" ? function () {} : stepFn,
    frames: !!frameValues ? frameValues.slice() : !!duration ? Array(duration).fill(0) : [],
    cancel: function cancel() {
      subscriptions[id].complete();
      subscriptions[id] = null;
      delete subscriptions[id];
    },
    started: new Date().getTime()
  };

  if (!isRunning) {
    loop();
  }

  return subscriptions[id];
};

exports["default"] = Timer;

/***/ }),

/***/ "./src/services/unsupported.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var WCSupportClass =
/*#__PURE__*/
function WCSupportClass() {
  var setUnsupportedClass = function setUnsupportedClass() {
    return document.body.className = 'wc-unsupported';
  };

  var wc = window.WebComponents;
  var safariVersions = ["Version/9", "Version/8", "Version/7"];

  var tryCustomElements = function tryCustomElements() {
    requestAnimationFrame(function () {
      try {
        var t = _typeof(window.customElements.define);

        if (t !== 'function') {
          setUnsupportedClass();
        }
      } catch (error) {
        setUnsupportedClass();
      }
    });
  };

  if (navigator.userAgent.indexOf('Safari') > -1 && safariVersions.reduce(function (prev, cur) {
    return prev ? true : navigator.userAgent.indexOf(cur) > -1;
  }, false)) {
    setUnsupportedClass();
  }

  if (wc && wc.ready) {
    tryCustomElements();
  } else {
    window.addEventListener('WebComponentsReady', tryCustomElements);
  }
};

exports["default"] = WCSupportClass;

/***/ }),

/***/ "./src/services/uploader.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var observeWorker_1 = __webpack_require__("./src/utils/observeWorker/index.ts");

var object_1 = __webpack_require__("./src/utils/convert/object.ts");

var use_if_1 = __webpack_require__("./src/utils/convert/use_if.ts"); // TODO pako is not so great, minimal size savings. Is there anything else?
// const pako = require('../lib/pako/dist/pako.min.js')
// var reader = new FileReader();
// reader.onload = function () {
//     var compressed_file = pako.deflate(this.result, { level: 5 });
//     var myBlob = new Blob([compressed_file], { type: `application/x-gzip` })
//     // Pass it back to the main thread
// }
// reader.readAsArrayBuffer(fileObject)
// TODO API get urls
// TODO API save to disc
// TODO API stitch
// TODO check is there has been progress already, resume
// TODO pre upload chunk function?
// TODO pre upload function?


var UploadService =
/*#__PURE__*/
function UploadService(options, file) {
  if (!file) {
    return {
      upload: function upload() {},
      cancel: function cancel() {}
    };
  }

  var Options = Object.assign({}, {
    progressCB: function progressCB() {},
    completeCB: function completeCB() {},
    errorCB: function errorCB() {},
    url: location.href,
    bytesPerChunk: 647212,
    withCredentials: false,
    uploadMethod: "POST",
    headers: {},
    parallel: false
  }, options);

  var getFile = function getFile() {
    return file[0] ? file[0] : file;
  };

  var getTotal = function getTotal(file, bytesPerChunk) {
    return !!bytesPerChunk && bytesPerChunk > 0 ? Math.ceil(file.size / bytesPerChunk) : 1;
  };

  var uploadMessages = [];
  var completedChunks = [];
  var fileObject = getFile();
  var size = fileObject.size;
  var total = getTotal(fileObject, Options.bytesPerChunk);
  var uploadData = Object.assign({}, Options, {
    size: size,
    total: total,
    fileObject: fileObject
  });
  var stop = false;
  var chunkIndex = 0;
  var worker$ = observeWorker_1["default"](function workerFunction() {
    self.onmessage = function (e) {
      var data = JSON.parse(e.data);
      var x = new XMLHttpRequest();
      x.open(data.method, data.url, true);
      x.withCredentials = data.withCredentials;
      Object.keys(data.headers).forEach(function (key) {
        return x.setRequestHeader(key, data.headers[key]);
      });

      x.onloadend = function () {
        self.postMessage(JSON.stringify({
          response: x.response,
          statusText: x.statusText,
          status: x.status
        }));
      };

      x.send(data.data);
    };
  });

  var setProgress = function setProgress() {
    return Options.progressCB(use_if_1["default"](function (p) {
      return p <= 1;
    }, function () {
      return 1;
    }, uploadData.total === 1 ? 1 : !completedChunks.length ? 0 : Math.ceil(completedChunks.length / uploadData.total * 100) / 100).value);
  };

  var getHeaders = function getHeaders(index, chunkSize, fileSize) {
    return Object.assign({}, {
      'Content-Type': "application/octet-stream",
      'X-Chunk-Id': index,
      'X-Chunk-Length': chunkSize,
      'X-File-Length': fileSize
    }, uploadData.headers);
  };

  var uploadUrl = function uploadUrl(index, url) {
    return !Array.isArray(url) ? url : url[index];
  };

  var getChunk = function getChunk(index) {
    return uploadData.total === 1 ? uploadData.fileObject : uploadData.fileObject.slice(index * uploadData.bytesPerChunk, (index + 1) * uploadData.bytesPerChunk);
  };

  var populateData = function populateData(index) {
    var data = getChunk(index);
    return {
      data: data,
      url: uploadUrl(index, uploadData.url),
      method: uploadData.uploadMethod,
      withCredentials: uploadData.withCredentials,
      headers: getHeaders(index, data.size, uploadData.fileObject.size)
    };
  };

  var onChunkUploaded = function onChunkUploaded(e) {
    // If no event, reject
    if (!e) {
      return Promise.reject();
    }

    var data = object_1.ToObject(e).value;

    if (data.status !== 200) {
      return Promise.reject(data.statusText);
    }

    completedChunks.push(chunkIndex);
    uploadMessages.push({
      chunk: chunkIndex,
      data: data
    }); // increment current chunk index

    chunkIndex = chunkIndex + 1; // update progress

    setProgress(); // if more chunks to upload

    if (chunkIndex < uploadData.total) {
      return uploadChunk(chunkIndex);
    } else {
      worker$.dispose();
      return Promise.resolve();
    }
  };

  var onChunkUploadedAsync = function onChunkUploadedAsync(index, e) {
    if (!e) {
      return Promise.reject();
    }

    var data = object_1.ToObject(e).value;

    if (data.status !== 200) {
      return Promise.reject(data.statusText);
    }

    completedChunks.push(index);
    uploadMessages.push({
      chunk: index,
      data: data
    }); // update progress

    setProgress();
    return Promise.resolve();
  };

  var uploadChunk = function uploadChunk(index) {
    return new Promise(function (resolve, reject) {
      if (stop) {
        return reject("upload was canceled");
      }

      return worker$.post(populateData(index)).then(onChunkUploaded).then(resolve)["catch"](reject);
    });
  };

  var uploadChunkAsync = function uploadChunkAsync(index) {
    return new Promise(function (resolve, reject) {
      if (stop) {
        return reject("upload was canceled");
      }

      return worker$.post(populateData(index)).then(function (res) {
        return onChunkUploadedAsync(index, res);
      }).then(resolve)["catch"](reject);
    });
  };

  var methods = {
    get currentChunk() {
      return chunkIndex;
    },

    cancel: function cancel() {
      stop = true;
    },
    upload: function upload() {
      if (!uploadData.size || !uploadData.total) {
        worker$.dispose();
        return Options.errorCB("invalid file");
      }

      if (!uploadData.url) {
        worker$.dispose();
        return Options.errorCB("invalid upload url");
      }

      if (stop) {
        worker$.dispose();
        return Options.errorCB("upload stopped");
      }

      if (!uploadData.parallel) {
        return uploadChunk(chunkIndex).then(Options.completeCB)["catch"](Options.errorCB);
      }

      var chunkArray = [];
      var index = 0;

      while (index < uploadData.total) {
        chunkArray.push(index);
        index = index + 1;
      }

      return Promise.all(chunkArray.map(function (c) {
        return uploadChunkAsync(c);
      })).then(function () {
        return Options.completeCB(uploadMessages);
      })["catch"](Options.errorCB);
    }
  };
  return methods;
};

window.UploadService = UploadService;
exports["default"] = UploadService;

/***/ }),

/***/ "./src/utils/convert/after_every_nth.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var map_1 = __webpack_require__("./src/utils/convert/map.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var split_1 = __webpack_require__("./src/utils/convert/split.ts");

var _1 = __webpack_require__("./src/utils/convert/index.ts");

exports.AfterEveryNth = function (nth, insert) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);
    var pointer = 0;
    var changes = [];

    if (result.stop) {
      return result;
    }

    if (result.type !== "string") {
      result = to_string_1["default"](result);
    }

    var mapper = map_1["default"](function (val, index) {
      var mapped = "";

      if ((index + 1) % nth === 0 && index !== 0) {
        mapped = "" + val + insert;
        changes.push({
          start: pointer,
          end: pointer + (1 + insert.length),
          input: val,
          length: 1 + insert.length,
          result: mapped,
          added: insert
        });
        pointer = pointer + insert.length;
      } else {
        mapped = val;
        pointer = pointer + 1;
      }

      return mapped;
    });
    var r = pipe_1["default"](split_1["default"](""), mapper, _1.Join(""))(result);
    r.stringChanges = r.stringChanges.concat(changes);
    r.valid = typeof r.value === "string" && r.value.length === 14;
    r["instanceof"].push("AfterEveryNth");
    return r;
  };
};

exports["default"] = exports.AfterEveryNth;

/***/ }),

/***/ "./src/utils/convert/before_every_nth.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var map_1 = __webpack_require__("./src/utils/convert/map.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var split_1 = __webpack_require__("./src/utils/convert/split.ts");

var _1 = __webpack_require__("./src/utils/convert/index.ts");

var BeforeEveryNth = function BeforeEveryNth(nth, insert) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);
    var pointer = 0;
    var changes = [];

    if (result.stop) {
      return result;
    }

    if (result.type !== "string") {
      result = to_string_1["default"](result);
    }

    var mapper = map_1["default"](function (val, index) {
      var mapped = "";

      if ((index + 1) % nth === 0 && index !== 0) {
        mapped = "" + insert + val;
        changes.push({
          start: pointer,
          end: pointer + (1 + insert.length),
          input: val,
          length: 1 + insert.length,
          result: mapped,
          added: insert
        });
        pointer = pointer + insert.length;
      } else {
        mapped = val;
        pointer = pointer + 1;
      }

      return mapped;
    });
    var r = pipe_1["default"](split_1["default"](""), mapper, _1.Join(""))(result);
    r.stringChanges = r.stringChanges.concat(changes);
    r.valid = typeof r.value === "string" && r.value.length === 14;
    r["instanceof"].push("BeforeEveryNth");
    return r;
  };
};

exports["default"] = BeforeEveryNth;

/***/ }),

/***/ "./src/utils/convert/bool.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var type_1 = __webpack_require__("./src/utils/type/index.ts");

var ToBool = function ToBool(value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  switch (result.value) {
    case "0":
    case 0:
    case "off":
    case "false":
    case false:
      result.value = false;
      result.valid = true;
      break;

    case "1":
    case 1:
    case "on":
    case "true":
    case true:
      result.value = true;
      result.valid = true;
      break;

    default:
      result.value = false;
      result.valid = false;
      break;
  }

  result.type = type_1.Type(result.value);
  result["instanceof"].push("ToBool");
  return result;
};

exports["default"] = ToBool;

/***/ }),

/***/ "./src/utils/convert/capitalize.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var Capitalize = function Capitalize(string) {
  var result = t_monad_1.Tmonad(string);

  try {
    result.value = "" + result.value.slice(0, 1).toUpperCase() + (result.value.slice(1) || "");
  } catch (error) {
    result.valid = false;
  }

  result["instanceof"].push("Capitalize");
  return result;
};

exports["default"] = Capitalize;

/***/ }),

/***/ "./src/utils/convert/commas-to-array.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var split_1 = __webpack_require__("./src/utils/convert/split.ts");

var map_1 = __webpack_require__("./src/utils/convert/map.ts");

var to_plain_text_1 = __webpack_require__("./src/utils/convert/to_plain_text.ts");

var trim_1 = __webpack_require__("./src/utils/convert/trim.ts");

var CommasToArray = function CommasToArray(value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type === "array") {
    result["instanceof"].push("CommasToArray");
    return result;
  }

  if (result.type === "undefined") {
    result.valid = false;
    result["instanceof"].push("CommasToArray");
    return result;
  }

  return pipe_1["default"](to_plain_text_1["default"], split_1["default"](","), map_1["default"](function (v) {
    return trim_1["default"](v).value;
  }))(result);
};

exports["default"] = CommasToArray;

/***/ }),

/***/ "./src/utils/convert/date.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var to_date_1 = __webpack_require__("./src/utils/convert/to_date.ts");

var date_to_object_1 = __webpack_require__("./src/utils/convert/date_to_object.ts");

exports.FirstOfMonth = function (value) {
  var result = to_date_1["default"](value);

  if (result.stop || !result.valid) {
    return result;
  }

  result.value = date_to_object_1["default"](new Date(result.value.getFullYear(), result.value.getMonth(), 1)).value;
  result["instanceof"].push("FirstOfMonth");
  return result;
};

exports.LastOfMonth = function (value) {
  var result = to_date_1["default"](value);

  if (result.stop || !result.valid) {
    return result;
  }

  result.value = date_to_object_1["default"](new Date(result.value.getFullYear(), result.value.getMonth() + 1, 0)).value;
  result["instanceof"].push("LastOfMonth");
  return result;
};

exports.MonthData = function (value) {
  var result = to_date_1["default"](value);

  if (result.stop || !result.valid) {
    return result;
  }

  var first = exports.FirstOfMonth(result.value).value;
  var last = exports.LastOfMonth(result.value).value;
  var startIndex = first.dayIndex;
  var bufferStart = [];

  while (startIndex) {
    var d = date_to_object_1["default"](new Date(first.year, first.monthIndex, 1 - startIndex)).value;
    d.outOfRange = true;
    bufferStart.push(d);
    startIndex = startIndex - 1;
  }

  var endIndex = 6 - last.dayIndex;
  var bufferEnd = [];

  while (endIndex) {
    var d = date_to_object_1["default"](new Date(last.year, last.monthIndex, last.day + (7 - (endIndex + last.dayIndex)))).value;
    d.outOfRange = true;
    bufferEnd.push(d);
    endIndex = endIndex - 1;
  }

  var daysArray = [].concat(bufferStart.slice());
  var dayIndex = 0;

  while (dayIndex < last.day) {
    var d = date_to_object_1["default"](new Date(first.year, first.monthIndex, first.day + dayIndex)).value;
    daysArray.push(d);
    dayIndex = dayIndex + 1;
  }

  result.value = daysArray.concat(bufferEnd.slice());
  result["instanceof"].push("MonthData");
  return result;
};

/***/ }),

/***/ "./src/utils/convert/date_to_object.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var to_date_1 = __webpack_require__("./src/utils/convert/to_date.ts");

var DateToObject = function DateToObject(value) {
  var result = to_date_1["default"](value);

  if (result.stop || !result.valid) {
    return result;
  }

  var hour = parseInt(result.value.toLocaleTimeString(navigator.language, {
    hour: "numeric",
    hour12: true
  }));
  result.value = {
    year: result.value.getFullYear(),
    yearShort: result.value.toLocaleDateString(navigator.language, {
      year: "2-digit"
    }),
    monthIndex: result.value.getMonth(),
    month: result.value.getMonth() + 1,
    monthDouble: result.value.toLocaleDateString(navigator.language, {
      month: "2-digit"
    }),
    monthName: result.value.toLocaleString(navigator.language, {
      month: 'long'
    }),
    monthNameShort: result.value.toLocaleString(navigator.language, {
      month: 'short'
    }),
    day: result.value.getDate(),
    dayDouble: result.value.toLocaleDateString(navigator.language, {
      day: "2-digit"
    }),
    dayOfWeek: result.value.toLocaleString(navigator.language, {
      weekday: 'long'
    }),
    dayOfWeekShort: result.value.toLocaleString(navigator.language, {
      weekday: 'short'
    }),
    dayIndex: result.value.getDay(),
    hour24: parseInt(result.value.toLocaleTimeString(navigator.language, {
      hour: "numeric",
      hour12: false
    })),
    hour: hour,
    hourDouble: result.value.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      hour12: true
    }).replace(/[^0-9\.]+/g, ""),
    hourDouble24: result.value.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      hour12: false
    }).replace(/[^0-9\.]+/g, ""),
    minutes: parseInt(result.value.toLocaleTimeString(navigator.language, {
      minute: "numeric"
    })),
    minutesDouble: ("0" + result.value.getMinutes()).slice(-2),
    seconds: parseInt(result.value.toLocaleTimeString(navigator.language, {
      second: "numeric"
    })),
    secondsDouble: ("0" + result.value.getSeconds()).slice(-2),
    milliseconds: result.value.getMilliseconds(),
    ampm: result.value.toLocaleTimeString(navigator.language, {
      hour12: true,
      hour: "numeric"
    }).replace(/[:\d]/g, "").trim(),
    date: result.value
  };
  result["instanceof"].push("DateToObject");
  return result;
};

exports["default"] = DateToObject;

/***/ }),

/***/ "./src/utils/convert/dom.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var get_1 = __webpack_require__("./src/utils/get/index.ts");

var to_array_1 = __webpack_require__("./src/utils/convert/to_array.ts");

var use_if_1 = __webpack_require__("./src/utils/convert/use_if.ts");

exports.IsElement = function (value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  result.valid = get_1["default"](result, "value.nodeType") === 1;
  result["instanceof"].push("IsElement");
  return result;
};

exports.IsElementType = function (tag) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);

    if (result.stop) {
      return result;
    }

    result.valid = get_1["default"](result, "value.tagName", "").toLowerCase() === tag.toLowerCase();
    result["instanceof"].push("IsElementType");
    return result;
  };
};

exports.SelectorToElement = function (parent, value) {
  var Value = t_monad_1.Tmonad(value);

  if (Value.stop) {
    return Value;
  }

  if (!parent) {
    parent = document.firstElementChild;
  }

  if (Value.type === "string") {
    Value.value = parent.querySelector(Value.value);
  }

  var result = exports.IsElement(Value);
  result["instanceof"].push("SelectorToElement");
  return result;
};

exports.SelectorArrayToElements = function (parent, value) {
  var Value = to_array_1["default"](value);

  if (Value.stop) {
    return Value;
  }

  if (!Value.valid || Value.type !== "array") {
    Value["instanceof"].push("SelectorArrayToElements");
    return Value;
  }

  if (!parent) {
    parent = document.firstElementChild;
  }

  Value.value = Value.value.map(function (el) {
    return use_if_1["default"](function (v) {
      return v.valid;
    }, function () {
      return {
        value: null
      };
    }, exports.SelectorToElement(null, el)).value;
  }).filter(function (v) {
    return !!v;
  });
  Value.valid = Value.value.length;
  Value["instanceof"].push("SelectorArrayToElements");
  return Value;
};

exports.SelectorArrayToAllElements = function (parent, value) {
  var Value = to_array_1["default"](value);

  if (Value.stop) {
    return Value;
  }

  if (!Value.valid || Value.type !== "array") {
    Value["instanceof"].push("SelectorArrayToAllElements");
    return Value;
  }

  if (!parent) {
    parent = document.firstElementChild;
  }

  Value.value = Value.value.map(function (el) {
    var values = use_if_1["default"](function (v) {
      return v.valid;
    }, function () {
      return {
        value: null
      };
    }, exports.SelectorToElements(null, el)).value;
    return values.value;
  }).filter(function (v) {
    return !!v;
  });
  Value.valid = Value.value.length;
  Value["instanceof"].push("SelectorArrayToAllElements");
  return Value;
};

exports.SelectorToElements = function (parent, value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  if (!parent) {
    parent = document.firstElementChild || document.documentElement;
  }

  var isEl = exports.IsElement(result);

  if (result.type === "string") {
    result.value = Array.from(parent.querySelectorAll(result.value));
  } else if (isEl.valid) {
    result.value = [result.value];
  }

  result.valid = result.value.length && result.value.filter(function (e) {
    return exports.IsElement(e).valid;
  }).length;
  result["instanceof"].push("SelectorToElements");
  return result;
};

/***/ }),

/***/ "./src/utils/convert/entities.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

exports.ToEntities = function (value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type === "string" && !!result.value) {
    result.value = result.value.replace(/\&/g, "&amp;").replace(/\>/g, "&gt;").replace(/\</g, "&lt;").replace(/"/g, "&quot;").replace(/`/g, "&apos;");
    result.valid = true;
  } else {
    result.valid = false;
  }

  result["instanceof"].push("ToEntities");
  return result;
};

exports.FromEntities = function (value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type === "string" && !!result.value) {
    result.value = result.value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g, "\"").replace(/&apos;|&lsquo;|&rsquo;|&#8216;/g, "'");
    result.valid = true;
  } else {
    result.valid = false;
  }

  result["instanceof"].push("FromEntities");
  return result;
};

/***/ }),

/***/ "./src/utils/convert/filter.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var to_array_1 = __webpack_require__("./src/utils/convert/to_array.ts");

var stop_if_invalid_1 = __webpack_require__("./src/utils/convert/stop_if_invalid.ts");

var Filter = function Filter(predicate) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);

    if (result.stop) {
      return result;
    }

    var filter = function filter(v) {
      v.value = v.value.filter(predicate);
      return v;
    };

    return t_monad_1.finishTMonad(pipe_1["default"](to_array_1["default"], stop_if_invalid_1["default"], filter)(result), "array", "Filter");
  };
};

exports["default"] = Filter;

/***/ }),

/***/ "./src/utils/convert/force_to_array.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var use_if_1 = __webpack_require__("./src/utils/convert/use_if.ts");

var to_array_1 = __webpack_require__("./src/utils/convert/to_array.ts");

var ForceToArray = function ForceToArray(value) {
  var res = to_array_1["default"](value);

  if (res.stop) {
    return res;
  }

  var newValue = use_if_1["default"](function (v) {
    return !(Array.isArray(v) && v.length);
  }, function (v) {
    return v === undefined ? undefined : [v];
  }, res.value).value;
  res.value = newValue;
  res["instanceof"].push("ForceToArray");
  res.valid = Array.isArray(res.value);
  return res;
};

exports["default"] = ForceToArray;

/***/ }),

/***/ "./src/utils/convert/from_json.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var type_1 = __webpack_require__("./src/utils/type/index.ts");

var uri_1 = __webpack_require__("./src/utils/convert/uri.ts");

var FromJSON = function FromJSON(value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  try {
    result.value = JSON.parse(uri_1.DecodeUriComponent(result.value).value);
    result.valid = true;
  } catch (error) {
    result.valid = false;
  }

  result.type = type_1.Type(result.value);
  result["instanceof"].push("FromJSON");

  if (["object", "array"].indexOf(result.type) > -1) {
    result.valid = true;
  }

  return result;
};

exports["default"] = FromJSON;

/***/ }),

/***/ "./src/utils/convert/function.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

exports.ToFunction = function (value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type !== "function") {
    result.valid = false;
  }

  result["instanceof"].push("ToFunction");
  return result;
};

exports.PartialFunction = function () {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  return !args.slice()[0] ? undefined : args.slice()[0].length === args.slice().length - 1 ? args.slice()[0].apply(null, args.slice().slice(1)) : function () {
    var newArgs = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }

    return exports.PartialFunction.apply(void 0, args.concat(newArgs));
  };
};

/***/ }),

/***/ "./src/utils/convert/has_non_digits.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var to_digits_1 = __webpack_require__("./src/utils/convert/to_digits.ts");

var HasNonDigits = function HasNonDigits(value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  var digits = to_digits_1["default"](result);
  result["instanceof"].push("HasNonDigits");
  result.valid = !!result.value && !!digits.value && result.value.length !== digits.value.length;
  return result;
};

exports["default"] = HasNonDigits;

/***/ }),

/***/ "./src/utils/convert/if_empty.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var type_1 = __webpack_require__("./src/utils/type/index.ts");

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var IfEmpty = function IfEmpty(newValue) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);
    result["instanceof"].push("IfEmpty");

    if (result.stop || type_1.isEmpty(result.value)) {
      return result;
    }

    return Object.assign({}, t_monad_1.Tmonad(newValue), {
      "instanceof": result["instanceof"].concat(["T"])
    });
  };
};

exports["default"] = IfEmpty;

/***/ }),

/***/ "./src/utils/convert/if_invalid.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var IfInvalid = function IfInvalid(newValue) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);

    if (result.stop || !!result.valid) {
      return result;
    }

    result["instanceof"].push("IfInvalid");
    return Object.assign({}, t_monad_1.Tmonad(newValue), {
      "instanceof": result["instanceof"].concat(["IfInvalid"])
    });
  };
};

exports["default"] = IfInvalid;

/***/ }),

/***/ "./src/utils/convert/if_is.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var IfIs = function IfIs(compare, replace) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);
    compare = t_monad_1.Tmonad(compare);
    result.valid = result.value === compare.value;

    if (result.value === compare.value) {
      result.value = t_monad_1.Tmonad(replace).value;
      result = t_monad_1.Tmonad(result.value);
    }

    result["instanceof"].push("IfIs");
    return result;
  };
};

exports["default"] = IfIs;

/***/ }),

/***/ "./src/utils/convert/if_not.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var IfNot = function IfNot(compare, replace) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);
    compare = t_monad_1.Tmonad(compare);
    result.valid = result.value === compare.value;

    if (!result.valid) {
      var res = t_monad_1.Tmonad(replace);
      res["instanceof"].push("IfNot");
      return res;
    }

    result["instanceof"].push("IfNot");
    return result;
  };
};

exports["default"] = IfNot;

/***/ }),

/***/ "./src/utils/convert/if_not_empty.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var type_1 = __webpack_require__("./src/utils/type/index.ts");

var IfNotEmpty = function IfNotEmpty(newValue) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);
    result["instanceof"].push("IfNotEmpty");

    if (result.stop || !type_1.isEmpty(result.value)) {
      return result;
    }

    return Object.assign({}, t_monad_1.Tmonad(newValue), {
      "instanceof": result["instanceof"].concat(["T"])
    });
  };
};

exports["default"] = IfNotEmpty;

/***/ }),

/***/ "./src/utils/convert/if_valid.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var IfValid = function IfValid(newValue) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);
    result["instanceof"].push("IfValid");

    if (result.stop || !result.valid) {
      return result;
    }

    return Object.assign({}, t_monad_1.Tmonad(newValue), {
      "instanceof": result["instanceof"].concat(["T"])
    });
  };
};

exports["default"] = IfValid;

/***/ }),

/***/ "./src/utils/convert/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

exports.ToBool = bool_1["default"];

var commas_to_array_1 = __webpack_require__("./src/utils/convert/commas-to-array.ts");

exports.CommasToArray = commas_to_array_1["default"];

var date_1 = __webpack_require__("./src/utils/convert/date.ts");

exports.FirstOfMonth = date_1.FirstOfMonth;
exports.LastOfMonth = date_1.LastOfMonth;
exports.MonthData = date_1.MonthData;

var dom_1 = __webpack_require__("./src/utils/convert/dom.ts");

exports.IsElement = dom_1.IsElement;
exports.IsElementType = dom_1.IsElementType;
exports.SelectorToElement = dom_1.SelectorToElement;
exports.SelectorArrayToElements = dom_1.SelectorArrayToElements;
exports.SelectorArrayToAllElements = dom_1.SelectorArrayToAllElements;
exports.SelectorToElements = dom_1.SelectorToElements;

var entities_1 = __webpack_require__("./src/utils/convert/entities.ts");

exports.ToEntities = entities_1.ToEntities;
exports.FromEntities = entities_1.FromEntities;

var function_1 = __webpack_require__("./src/utils/convert/function.ts");

exports.ToFunction = function_1.ToFunction;
exports.PartialFunction = function_1.PartialFunction;

var from_json_1 = __webpack_require__("./src/utils/convert/from_json.ts");

exports.FromJSON = from_json_1["default"];

var to_json_1 = __webpack_require__("./src/utils/convert/to_json.ts");

exports.ToJSON = to_json_1["default"];

var meta_1 = __webpack_require__("./src/utils/convert/meta.ts");

exports.MatchMeta = meta_1.MatchMeta;
exports.JoinMeta = meta_1.JoinMeta;
exports.RemoveMeta = meta_1.RemoveMeta;
exports.ReplaceMeta = meta_1.ReplaceMeta;
exports.SplitMeta = meta_1.SplitMeta;

var object_1 = __webpack_require__("./src/utils/convert/object.ts");

exports.ToObject = object_1.ToObject;
exports.KeysAre = object_1.KeysAre;
exports.HasKeys = object_1.HasKeys;

var options_1 = __webpack_require__("./src/utils/convert/options.ts");

exports.Options = options_1.Options;

var phone_1 = __webpack_require__("./src/utils/convert/phone.ts");

exports.ToIntlPhone = phone_1.ToIntlPhone;
exports.ToPhone = phone_1.ToPhone;

var postal_1 = __webpack_require__("./src/utils/convert/postal.ts");

exports.ToUsZip = postal_1.ToUsZip;

var regex_1 = __webpack_require__("./src/utils/convert/regex.ts");

exports.ReplacementPattern = regex_1.ReplacementPattern;
exports.ToRegex = regex_1.ToRegex;

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

exports.isTMonad = t_monad_1.isTMonad;
exports.Tmonad = t_monad_1.Tmonad;
exports.finishTMonad = t_monad_1.finishTMonad;

var tap_1 = __webpack_require__("./src/utils/convert/tap.ts");

exports.Tap = tap_1.Tap;

var uri_1 = __webpack_require__("./src/utils/convert/uri.ts");

exports.EncodeUri = uri_1.EncodeUri;
exports.EncodeUriComponent = uri_1.EncodeUriComponent;
exports.DecodeUri = uri_1.DecodeUri;
exports.DecodeUriComponent = uri_1.DecodeUriComponent;
exports.doURI = uri_1.doURI;

var to_digits_1 = __webpack_require__("./src/utils/convert/to_digits.ts");

exports.ToDigits = to_digits_1["default"];

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

exports.ToNumber = to_number_1["default"];

var to_date_1 = __webpack_require__("./src/utils/convert/to_date.ts");

exports.ToDate = to_date_1["default"];

var date_to_object_1 = __webpack_require__("./src/utils/convert/date_to_object.ts");

exports.DateToObject = date_to_object_1["default"];

var has_non_digits_1 = __webpack_require__("./src/utils/convert/has_non_digits.ts");

exports.HasNonDigits = has_non_digits_1["default"];

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

exports.IfInvalid = if_invalid_1["default"];

var if_empty_1 = __webpack_require__("./src/utils/convert/if_empty.ts");

exports.IfEmpty = if_empty_1["default"];

var if_is_1 = __webpack_require__("./src/utils/convert/if_is.ts");

exports.IfIs = if_is_1["default"];

var if_not_1 = __webpack_require__("./src/utils/convert/if_not.ts");

exports.IfNot = if_not_1["default"];

var if_not_empty_1 = __webpack_require__("./src/utils/convert/if_not_empty.ts");

exports.IfNotEmpty = if_not_empty_1["default"];

var if_valid_1 = __webpack_require__("./src/utils/convert/if_valid.ts");

exports.IfValid = if_valid_1["default"];

var use_if_1 = __webpack_require__("./src/utils/convert/use_if.ts");

exports.UseIf = use_if_1["default"];

var stop_if_empty_1 = __webpack_require__("./src/utils/convert/stop_if_empty.ts");

exports.StopIfEmpty = stop_if_empty_1["default"];

var stop_if_invalid_1 = __webpack_require__("./src/utils/convert/stop_if_invalid.ts");

exports.StopIfInvalid = stop_if_invalid_1["default"];

var stop_if_valid_1 = __webpack_require__("./src/utils/convert/stop_if_valid.ts");

exports.StopIfValid = stop_if_valid_1["default"];

var to_array_1 = __webpack_require__("./src/utils/convert/to_array.ts");

exports.ToArray = to_array_1["default"];

var force_to_array_1 = __webpack_require__("./src/utils/convert/force_to_array.ts");

exports.ForceToArray = force_to_array_1["default"];

var join_1 = __webpack_require__("./src/utils/convert/join.ts");

exports.Join = join_1["default"];

var map_1 = __webpack_require__("./src/utils/convert/map.ts");

exports.Map = map_1["default"];

var filter_1 = __webpack_require__("./src/utils/convert/filter.ts");

exports.Filter = filter_1["default"];

var indexof_1 = __webpack_require__("./src/utils/convert/indexof.ts");

exports.IndexOf = indexof_1["default"];

var slice_1 = __webpack_require__("./src/utils/convert/slice.ts");

exports.Slice = slice_1["default"];

var trim_1 = __webpack_require__("./src/utils/convert/trim.ts");

exports.Trim = trim_1["default"];

var to_plain_text_1 = __webpack_require__("./src/utils/convert/to_plain_text.ts");

exports.ToPlainText = to_plain_text_1["default"];

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

exports.ToString = to_string_1["default"];

var split_1 = __webpack_require__("./src/utils/convert/split.ts");

exports.Split = split_1["default"];

var replace_1 = __webpack_require__("./src/utils/convert/replace.ts");

exports.Replace = replace_1["default"];

var after_every_nth_1 = __webpack_require__("./src/utils/convert/after_every_nth.ts");

exports.AfterEveryNth = after_every_nth_1["default"];

var before_every_nth_1 = __webpack_require__("./src/utils/convert/before_every_nth.ts");

exports.BeforeEveryNth = before_every_nth_1["default"];

var match_1 = __webpack_require__("./src/utils/convert/match.ts");

exports.Match = match_1["default"];

var match_all_1 = __webpack_require__("./src/utils/convert/match_all.ts");

exports.MatchAll = match_all_1["default"];

var uppercase_1 = __webpack_require__("./src/utils/convert/uppercase.ts");

exports.UpperCase = uppercase_1["default"];

var uppercase_2 = __webpack_require__("./src/utils/convert/uppercase.ts");

exports.LowerCase = uppercase_2["default"];

var capitalize_1 = __webpack_require__("./src/utils/convert/capitalize.ts");

exports.Capitalize = capitalize_1["default"];

var to_color_1 = __webpack_require__("./src/utils/convert/to_color.ts");

exports.ToColor = to_color_1["default"];

/***/ }),

/***/ "./src/utils/convert/indexof.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var to_array_1 = __webpack_require__("./src/utils/convert/to_array.ts");

var IndexOf = function IndexOf(array) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);

    if (result.stop) {
      return result;
    }

    var arr = to_array_1["default"](array);

    if (!arr.valid) {
      result.valid = false;
      return result;
    }

    result.valid = arr.value.indexOf(result.value) > -1;
    result["instanceof"].push("IndexOf");
    return result;
  };
};

exports["default"] = IndexOf;

/***/ }),

/***/ "./src/utils/convert/join.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var meta_1 = __webpack_require__("./src/utils/convert/meta.ts");

var Join = function Join(delimeter) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);

    if (result.stop) {
      return result;
    }

    var resultingMeta = meta_1.JoinMeta(result.value, delimeter);
    result.value = resultingMeta.value;
    result.stringChanges = result.stringChanges.concat(resultingMeta.stringChanges);
    result.valid = typeof result.value === "string";
    return t_monad_1.finishTMonad(result, "string", "Join");
  };
};

exports["default"] = Join;

/***/ }),

/***/ "./src/utils/convert/lowercase.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var LowerCase = function LowerCase(string) {
  var result = string;

  try {
    result.value = result.value.toLowerCase();
  } catch (error) {
    result.valid = false;
  }

  result["instanceof"].push("LowerCase");
  return result;
};

exports["default"] = LowerCase;

/***/ }),

/***/ "./src/utils/convert/map.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var stop_if_invalid_1 = __webpack_require__("./src/utils/convert/stop_if_invalid.ts");

var type_1 = __webpack_require__("./src/utils/type/index.ts");

var to_array_1 = __webpack_require__("./src/utils/convert/to_array.ts");

var Map = function Map(fn) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);

    if (result.stop) {
      return result;
    }

    var map = function map(v) {
      if (type_1.Type(v.value) !== "array") {
        v.valid = false;
        return v;
      }

      v.value = v.value.map(fn);
      return v;
    };

    return t_monad_1.finishTMonad(pipe_1["default"](to_array_1["default"], stop_if_invalid_1["default"], map)(result), "array", "Map");
  };
};

exports["default"] = Map;

/***/ }),

/***/ "./src/utils/convert/match.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var meta_1 = __webpack_require__("./src/utils/convert/meta.ts");

var Match = function Match(search) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);

    if (result.stop) {
      return result;
    }

    if (result.type !== "string") {
      result = to_string_1["default"](result);
    }

    var matches = meta_1.MatchMeta(result.value, search, true);
    result.value = matches.value;
    result.valid = result.value.length === 1;
    result.stringChanges = result.stringChanges.concat(matches.stringChanges);
    result["instanceof"].push("Match");
    return result;
  };
};

exports["default"] = Match;

/***/ }),

/***/ "./src/utils/convert/match_all.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var meta_1 = __webpack_require__("./src/utils/convert/meta.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var MatchAll = function MatchAll(search) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);

    if (result.stop) {
      return result;
    }

    if (result.type !== "string") {
      result = to_string_1["default"](result);
    }

    var matches = meta_1.MatchMeta(result.value, search);
    result.value = matches.value;
    result.valid = result.value.length > 0;
    result.stringChanges = result.stringChanges.concat(matches.stringChanges);
    result["instanceof"].push("MatchAll");
    return result;
  };
};

exports["default"] = MatchAll;

/***/ }),

/***/ "./src/utils/convert/meta.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var regex_1 = __webpack_require__("./src/utils/convert/regex.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

exports.MatchMeta = function (string, search, justOne) {
  if (justOne === void 0) {
    justOne = false;
  }

  var matches = [];
  var changes = [];
  var value = typeof string === "string" ? string : to_string_1["default"](string).value;

  var lastMatch = function lastMatch() {
    return changes[changes.length - 1];
  };

  var hasMatched = false;
  value.replace(regex_1.ToRegex(search).value, function () {
    if (justOne && hasMatched) {
      return;
    }

    hasMatched = true;
    var arr = [].slice.call(arguments, 0);

    if (arr[0] === "") {
      return;
    }

    var extras = arr.splice(-2);
    arr.index = extras[0];
    arr.input = extras[1];
    var last = lastMatch();
    var length = arr[0].length;
    var match = {
      start: arr.index,
      end: arr.index + length,
      input: arr.input,
      length: length,
      result: arr[0],
      removed: undefined
    };

    if (match.start && last && last.end !== match.start) {
      match.removed = match.input.slice(last.end, match.start);
    } else {
      delete match.removed;
    }

    matches.push(match.result);
    changes.push(match);
  });
  var last = lastMatch();

  if (last.end < value.length) {
    var removed = value.slice(last.end);
    changes.push({
      start: last.end,
      end: value.length,
      input: value,
      length: value.length - last.end,
      result: removed,
      removed: removed
    });
  }

  return {
    value: matches,
    stringChanges: changes
  };
};

exports.ReplaceMeta = function (string, search, insert) {
  var replacements = regex_1.ReplacementPattern(insert);
  var result = {
    value: string.toString(),
    stringChanges: []
  };
  var testString = result.value;
  var match;
  var index = 0;

  while ((match = regex_1.ToRegex(search).value.exec(testString)) !== null) {
    var end = match.index + match[0].length;
    var matched = {
      start: match.index,
      end: end,
      input: match.input,
      length: match[0].length,
      result: "",
      removed: match[0],
      pre: "",
      post: "",
      index: index
    };
    matched.pre = matched.start !== 0 ? testString.slice(0, matched.start) : "";
    matched.post = testString.slice(end);
    matched.result = "" + matched.pre + matched.post;

    if (match.length > 1 && replacements.length) {
      matched.added = replacements.reduce(function (previous, current) {
        if (typeof current === "string") {
          return "" + previous + current;
        }

        return "" + previous + (match[current.index] || "");
      }, "");
      matched.length = matched.added.length;
      matched.end = match.index + matched.length;
      matched.result = "" + matched.pre + (matched.added || "") + matched.post;
    }

    result.stringChanges.push(matched);
    testString = matched.post;
    index = index + 1;
  }

  if (result.stringChanges.length) {
    result.value = result.stringChanges.reduce(function (previous, current, i) {
      var added = current.added || "";
      var post = i !== result.stringChanges.length - 1 ? "" : current.post;
      return "" + previous + current.pre + added + post;
    }, "");
  }

  return result;
};

exports.RemoveMeta = function (string, search) {
  var match;
  var result = {
    value: string.toString(),
    stringChanges: []
  };

  while ((match = regex_1.ToRegex(search).value.exec(result.value)) !== null) {
    var matched = {
      start: match.index,
      end: match.index + match[0].length,
      input: match.input,
      length: match[0].length,
      result: "",
      removed: match[0]
    };
    var first = matched.start !== 0 ? result.value.slice(0, matched.start) : "";
    var second = result.value.slice(matched.end);
    matched.result = "" + first + second;
    result.stringChanges.push(matched);
    result.value = matched.result;
  }

  return result;
};

exports.SplitMeta = function (string, delimeter) {
  if (delimeter === void 0) {
    delimeter = "";
  }

  var match;
  var arr = [];
  var result = {
    value: string,
    stringChanges: []
  };

  try {
    if (!string || !delimeter && delimeter !== "") {
      return result;
    }

    delimeter = regex_1.ToRegex(delimeter).value;
    var str = !!result.value ? result.value.toString() : "";

    if (delimeter.toString() === "/(?:)/") {
      return {
        value: str.split(""),
        stringChanges: []
      };
    }

    while ((match = regex_1.ToRegex(delimeter).value.exec(str)) !== null) {
      var length_1 = match.toString().length;
      var matched = {
        start: match.index,
        end: match.index + length_1,
        input: match.input,
        length: length_1,
        result: [],
        removed: match[0]
      };
      var first = matched.start !== 0 ? str.slice(0, matched.start) : "";
      var second = str.slice(matched.end);
      matched.result = [first, second];
      result.stringChanges.push(matched);
      arr.push(first);
      str = second;
    }

    arr.push(str);
    result.value = arr.filter(function (v) {
      return !!v;
    });
  } catch (error) {}

  return result;
};

exports.JoinMeta = function (array, delimeter) {
  var result = {
    value: array,
    stringChanges: []
  };

  if (!delimeter) {
    result.value = result.value.join(delimeter);
    return result;
  }

  try {
    var index = 1;
    var joinedValue = result.value[index] || "";

    while (index < result.value.length) {
      result.stringChanges.push({
        start: joinedValue.length,
        end: joinedValue.length + delimeter.length,
        input: result.value[index],
        length: delimeter.length,
        result: "",
        added: delimeter
      });
      joinedValue = "" + joinedValue + delimeter + result.value[index];
      index = index + 1;
    }

    result.value = joinedValue;
  } catch (error) {}

  return result;
};

/***/ }),

/***/ "./src/utils/convert/object.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var uri_1 = __webpack_require__("./src/utils/convert/uri.ts");

var entities_1 = __webpack_require__("./src/utils/convert/entities.ts");

var type_1 = __webpack_require__("./src/utils/type/index.ts");

var from_json_1 = __webpack_require__("./src/utils/convert/from_json.ts");

exports.ToObject = function (value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type === "string") {
    result = pipe_1["default"](uri_1.DecodeUriComponent, entities_1.FromEntities, from_json_1["default"])(result);
  }

  result.valid = type_1.Type(result.value) === "object";
  result["instanceof"].push("ToObject");
  return result;
};

exports.KeysAre = function (compare) {
  return function (value) {
    var result = exports.ToObject(value);

    if (result.stop) {
      return result;
    }

    result["instanceof"].push("KeysAre");

    if (!result.valid) {
      return result;
    }

    var keys = Object.keys(result.value);
    result.valid = keys.length === 0 ? true : keys.filter(function (v) {
      return type_1.Type(v) === compare;
    }).length > 0;
    return result;
  };
};

exports.HasKeys = function (compare) {
  return function (value) {
    var result = exports.ToObject(value);

    if (result.stop) {
      return result;
    }

    result["instanceof"].push("HasKeys");

    if (!result.valid) {
      return result;
    }

    var keys = Object.keys(result.value);
    result.valid = !keys.length && !compare.length ? true : keys.length && !compare.length ? false : keys.filter(function (v) {
      return compare.indexOf(v) > -1;
    }).length > 0;
    return result;
  };
};

/***/ }),

/***/ "./src/utils/convert/options.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var map_1 = __webpack_require__("./src/utils/convert/map.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var commas_to_array_1 = __webpack_require__("./src/utils/convert/commas-to-array.ts");

exports.Options = function (value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  var mapper = map_1["default"](function (value) {
    if (_typeof(value) === "object" && value.hasOwnProperty("value")) {
      if (!value.hasOwnProperty("label")) {
        value.label = value.value;
      }

      return value;
    }

    return {
      value: value,
      label: value
    };
  });
  return t_monad_1.finishTMonad(pipe_1["default"](commas_to_array_1["default"], if_invalid_1["default"]([]), mapper)(result), "array", "Options");
};

/***/ }),

/***/ "./src/utils/convert/phone.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var to_digits_1 = __webpack_require__("./src/utils/convert/to_digits.ts");

var split_1 = __webpack_require__("./src/utils/convert/split.ts");

var map_1 = __webpack_require__("./src/utils/convert/map.ts");

var join_1 = __webpack_require__("./src/utils/convert/join.ts");

exports.ToPhone = function (value) {
  var result = t_monad_1.Tmonad(value);
  var pointer = 0;
  var changes = [];

  if (result.stop) {
    return result;
  }

  var mapper = map_1["default"](function (val, index) {
    var length = ("" + (result.value || "")).length;
    var mapped = "";

    if (index === 0) {
      mapped = !!length ? "(" + val : val;
      changes.push({
        start: pointer,
        end: pointer + 1,
        input: val,
        length: 1,
        result: mapped,
        added: "("
      });
      pointer = pointer + 2;
    }

    if (index === 3) {
      mapped = length > 4 ? ") " + val : val;
      changes.push({
        start: pointer,
        end: pointer + 2,
        input: val,
        length: 2,
        result: mapped,
        added: ") "
      });
      pointer = pointer + 3;
    }

    if (index === 6) {
      mapped = length > 9 ? "-" + val : val;
      changes.push({
        start: pointer,
        end: pointer + 1,
        input: val,
        length: 1,
        result: mapped,
        added: "-"
      });
      pointer = pointer + 2;
    }

    if ([9, 8, 7, 5, 4, 2, 1].indexOf(index) > -1) {
      mapped = val;
      pointer = pointer + 1;
    }

    if (index > 9) {
      mapped = "";
      changes.push({
        start: pointer,
        end: pointer + 1,
        input: val,
        length: 1,
        result: mapped,
        removed: val
      });
      pointer = pointer + 1;
    }

    return mapped;
  });
  var r = pipe_1["default"](to_digits_1["default"], split_1["default"](""), mapper, join_1["default"](""))(result);
  r.stringChanges = r.stringChanges.concat(changes);
  r.valid = typeof r.value === "string" && r.value.length === 14;
  r["instanceof"].push("ToPhone");
  return r;
};

exports.ToIntlPhone = function (value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  var parts = result.value.split(" ");
  var countryCode = parts[0].indexOf("+") > -1 ? parts.shift() + " " : "";
  var countryCodeMonad = to_digits_1["default"](countryCode);
  var r = exports.ToPhone(parts.join(" "));
  result.value = ("+" + countryCodeMonad.value + " " + r.value).trim();
  result.stringChanges = r.stringChanges;
  result["instanceof"].push("ToIntlPhone");
  return result;
};

/***/ }),

/***/ "./src/utils/convert/postal.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var to_digits_1 = __webpack_require__("./src/utils/convert/to_digits.ts");

var split_1 = __webpack_require__("./src/utils/convert/split.ts");

var map_1 = __webpack_require__("./src/utils/convert/map.ts");

var join_1 = __webpack_require__("./src/utils/convert/join.ts");

exports.ToUsZip = function (value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  var mapper = map_1["default"](function (val, index) {
    if (index < 5 || index > 5 && index < 9) {
      return val;
    }

    if (index === 5) {
      return "-" + val;
    }

    return "";
  });
  result = pipe_1["default"](to_digits_1["default"], split_1["default"](""), mapper, join_1["default"](""))(result);
  result.valid = typeof result.value === "string" && (result.value.length === 5 || result.value.length === 10);
  result["instanceof"].push("ToUsZip");
  return result;
};

/***/ }),

/***/ "./src/utils/convert/regex.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var to_digits_1 = __webpack_require__("./src/utils/convert/to_digits.ts");

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

exports.ReplacementPattern = function (string) {
  if (!string) {
    return [];
  }

  var str = to_string_1["default"](string).value;
  var matches = str.match(/(\$\d+)+/g) || [];
  var extras = str.split(new RegExp("[" + matches.join("|") + "]"));
  var parsedMatches = !!matches ? matches.map(function (match) {
    return pipe_1["default"](to_digits_1["default"], to_number_1["default"])(match).value;
  }) : [];
  var result = [];
  extras.forEach(function (extra, index) {
    if (extra === "") {
      if (index === 0 || index === extras.length - 1) {
        var replacement = parsedMatches.shift();
        return result.push({
          index: replacement,
          original: "$" + replacement
        });
      }

      return;
    }

    result.push(extra);
  });
  return result;
};

exports.ToRegex = function (string) {
  var result = t_monad_1.Tmonad(string);

  if (!result.value) {
    result.value = new RegExp("");
  } else if (typeof result.value.split !== "function" && _typeof(result.value) === "object") {
    // already regex, clone
    result.value = new RegExp(result.value);
  } else if (typeof result.value === "string") {
    if (result.value.indexOf("/") === 0) {
      // regex that has been converted to string and needs to be prepared
      // split and make sure to remove empties(usually begining/end or if json escaped) for the join later
      var parts = result.value.split("/").filter(function (p) {
        return !!p;
      });
      var options = parts.pop();

      if (options.match(/[^gmisuy]/)) {
        // if anything other than standard flag, send back to regex
        parts.push(options);
        options = undefined;
      }

      result.value = new RegExp(parts.join("/"), options);
    } else {
      // proper first argument
      result.value = new RegExp(result.value);
    }
  }

  result.valid = true;
  result["instanceof"].push("ToRegex");
  result.type = "object";
  return result;
};

/***/ }),

/***/ "./src/utils/convert/replace.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var meta_1 = __webpack_require__("./src/utils/convert/meta.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var Replace = function Replace(search, replace) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);

    if (result.stop) {
      return result;
    }

    if (result.type !== "string") {
      result = to_string_1["default"](result);
    }

    try {
      var replaced = meta_1.ReplaceMeta(result.value, search, replace);
      result.value = replaced.value;
      result.valid = true;
      result.stringChanges = result.stringChanges.concat(replaced.stringChanges);
    } catch (error) {
      result.valid = false;
    }

    return t_monad_1.finishTMonad(result, "string", "Replace");
  };
};

exports["default"] = Replace;

/***/ }),

/***/ "./src/utils/convert/slice.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var Slice = function Slice(start, end) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);

    if (result.stop) {
      return result;
    }

    try {
      var v = result.value.slice();
      result.value = v.slice(start, end);

      if (typeof v === "string") {
        if (start !== 0) {
          result.stringChanges.push({
            start: 0,
            end: start,
            input: v,
            length: start,
            result: v.slice(0, start),
            removed: v.slice(0, start)
          });
        }

        if (end < v.length) {
          result.stringChanges.push({
            start: end,
            end: v.length,
            input: v,
            length: v.length - end,
            result: v.slice(end),
            removed: v.slice(end)
          });
        }
      }
    } catch (error) {
      result.valid = false;
    }

    result["instanceof"].push("Slice");
    return result;
  };
};

exports["default"] = Slice;

/***/ }),

/***/ "./src/utils/convert/split.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var meta_1 = __webpack_require__("./src/utils/convert/meta.ts");

var Split = function Split(delimeter) {
  return function (value) {
    var result = t_monad_1.Tmonad(value);

    if (result.stop) {
      return result;
    }

    if (result.type !== "string") {
      result = to_string_1["default"](result);
    }

    var splat = meta_1.SplitMeta(result.value, delimeter);

    if (typeof splat.value === "string") {
      result.valid = false;
      return t_monad_1.finishTMonad(result, "array", "Split");
    }

    result.stringChanges = result.stringChanges.concat(splat.stringChanges);
    result.value = splat.value;
    return t_monad_1.finishTMonad(result, "array", "Split");
  };
};

exports["default"] = Split;

/***/ }),

/***/ "./src/utils/convert/stop_if_empty.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var type_1 = __webpack_require__("./src/utils/type/index.ts");

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var StopIfEmpty = function StopIfEmpty(value) {
  var result = t_monad_1.Tmonad(value);

  if (type_1.isEmpty(result.value)) {
    result.stop = true;
  }

  result["instanceof"].push("StopIfEmpty");
  return result;
};

exports["default"] = StopIfEmpty;

/***/ }),

/***/ "./src/utils/convert/stop_if_invalid.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var StopIfInvalid = function StopIfInvalid(value) {
  var result = t_monad_1.Tmonad(value);

  if (!result.valid) {
    result.stop = true;
  }

  result["instanceof"].push("StopIfInvalid");
  return result;
};

exports["default"] = StopIfInvalid;

/***/ }),

/***/ "./src/utils/convert/stop_if_valid.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var StopIfValid = function StopIfValid(value) {
  var result = t_monad_1.Tmonad(value);

  if (result.valid) {
    result.stop = true;
  }

  result["instanceof"].push("StopIfValid");
  return result;
};

exports["default"] = StopIfValid;

/***/ }),

/***/ "./src/utils/convert/t-monad.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var type_1 = __webpack_require__("./src/utils/type/index.ts");

exports.isTMonad = function (value) {
  return !!value && value.hasOwnProperty("valid") && type_1.Type(value.valid) === "boolean" && value.hasOwnProperty("instanceof") && type_1.Type(value["instanceof"]) === "array" && value.hasOwnProperty("type") && type_1.Type(value.type) === "string" && value.hasOwnProperty("value");
};

exports.Tmonad = function (value) {
  if (exports.isTMonad(value)) {
    return {
      valid: value.valid,
      value: value.value,
      type: type_1.Type(value.value),
      stringChanges: value.stringChanges,
      "instanceof": value["instanceof"],
      stop: value.stop
    };
  } else {
    return {
      valid: true,
      value: value,
      type: type_1.Type(value),
      stringChanges: [],
      "instanceof": [],
      stop: false
    };
  }
};

exports.finishTMonad = function (result, expectedType, instanceName) {
  result.type = type_1.Type(result.value);
  result.valid = expectedType === "?" ? true : result.type === expectedType;
  result["instanceof"].push(instanceName);
  return result;
};

/***/ }),

/***/ "./src/utils/convert/tap.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.Tap = function (value) {
  console.log("TAP value: " + value.value + ", LAST instanceof:" + value["instanceof"][value["instanceof"].length - 1] + ", TYPE:" + value.type + ", VALID:" + value.valid + ", CHANGES:" + value.stringChanges.length);
  return value;
};

/***/ }),

/***/ "./src/utils/convert/to_array.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var to_plain_text_1 = __webpack_require__("./src/utils/convert/to_plain_text.ts");

var type_1 = __webpack_require__("./src/utils/type/index.ts");

var from_json_1 = __webpack_require__("./src/utils/convert/from_json.ts");

var ToArray = function ToArray(value) {
  var temp = t_monad_1.Tmonad(value);

  if (temp.stop) {
    return value;
  }

  var result = Array.isArray(temp.value) ? temp : typeof temp.value === "string" ? pipe_1["default"](to_plain_text_1["default"], from_json_1["default"])(temp) : temp;
  result.type = type_1.Type(result.value);
  result.valid = result.type === "array";
  result["instanceof"].push("ToArray");
  return result;
};

exports["default"] = ToArray;

/***/ }),

/***/ "./src/utils/convert/to_color.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var ToColor = function ToColor(value) {
  var result = to_string_1["default"](value);

  if (result.stop) {
    return result;
  }

  if (result.valid) {
    var el = document.createElement("option");
    el.style.color = result.value;
    result.valid = el.style.color === result.value;
  }

  result["instanceof"].push("ToColor");
  return result;
};

exports["default"] = ToColor;

/***/ }),

/***/ "./src/utils/convert/to_date.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var type_1 = __webpack_require__("./src/utils/type/index.ts");

var ToDate = function ToDate(value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  if (result["instanceof"][result["instanceof"].length] === "DateToObject") {
    result.value = result.value.date;
  }

  try {
    result.value = new Date(Date.parse(result.value));
  } catch (error) {}

  var isDate = result.value !== "Invalid Date" && !isNaN(result.value) && result.value instanceof Date;
  result.type = isDate ? "date" : type_1.Type(result.value);
  result.valid = result.type === "date";
  result["instanceof"].push("ToDate");
  return result;
};

exports["default"] = ToDate;

/***/ }),

/***/ "./src/utils/convert/to_digits.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var type_1 = __webpack_require__("./src/utils/type/index.ts");

var meta_1 = __webpack_require__("./src/utils/convert/meta.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var ToDigits = function ToDigits(value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type !== "string") {
    result = to_string_1["default"](result);
  }

  try {
    var cleaned = meta_1.RemoveMeta(result.value, /[^\d]+/g);
    result.stringChanges = result.stringChanges.concat(cleaned.stringChanges);
    result.value = cleaned.value.toString();
    result.valid = !!result.value;
  } catch (error) {
    result.valid = false;
  }

  result.type = type_1.Type(result.value);
  result["instanceof"].push("ToDigits");
  return result;
};

exports["default"] = ToDigits;

/***/ }),

/***/ "./src/utils/convert/to_json.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var type_1 = __webpack_require__("./src/utils/type/index.ts");

var from_json_1 = __webpack_require__("./src/utils/convert/from_json.ts");

var ToJSON = function ToJSON(value) {
  var result = from_json_1["default"](value);

  if (result.stop) {
    return result;
  }

  try {
    result.value = JSON.stringify(result.value);
    result.valid = true;
  } catch (error) {
    result.valid = false;
  }

  result.type = type_1.Type(result.value);
  result["instanceof"].push("ToJSON");
  return result;
};

exports["default"] = ToJSON;

/***/ }),

/***/ "./src/utils/convert/to_number.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var type_1 = __webpack_require__("./src/utils/type/index.ts");

var ToNumber = function ToNumber(value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type === "string" && !type_1.isEmpty(result.value)) {
    result.value = parseFloat(result.value);
  }

  result.type = type_1.Type(result.value);
  result["instanceof"].push("ToNumber");
  result.valid = !isNaN(result.value);
  return result;
};

exports["default"] = ToNumber;

/***/ }),

/***/ "./src/utils/convert/to_plain_text.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var entities_1 = __webpack_require__("./src/utils/convert/entities.ts");

var uri_1 = __webpack_require__("./src/utils/convert/uri.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var stop_if_invalid_1 = __webpack_require__("./src/utils/convert/stop_if_invalid.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var ToPlainText = function ToPlainText(value) {
  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  if (result.type !== "string") {
    result = pipe_1["default"](to_string_1["default"], stop_if_invalid_1["default"], uri_1.DecodeUriComponent, entities_1.FromEntities)(result);
  } else {
    result = pipe_1["default"](uri_1.DecodeUriComponent, entities_1.FromEntities)(result);
  }

  return t_monad_1.finishTMonad(result, "string", "ToPlainText");
};

exports["default"] = ToPlainText;

/***/ }),

/***/ "./src/utils/convert/to_string.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var __1 = __webpack_require__("./src/utils/index.ts");

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var type_1 = __webpack_require__("./src/utils/type/index.ts");

var ToString = function ToString(value) {
  var stop = __1.Get(value, "stop", false);

  if (stop) {
    return t_monad_1.Tmonad(value);
  }

  var result = t_monad_1.Tmonad(value);

  try {
    if (!!result.value || result.value === "") {
      result.value = result.value.toString();
      result.valid = typeof result.value === "string";
    } else {
      result.value = "";
      result.valid = false;
    }
  } catch (error) {
    result.valid = false;
  }

  result.type = type_1.Type(result.value);
  result["instanceof"].push("ToString");
  return result;
};

exports["default"] = ToString;

/***/ }),

/***/ "./src/utils/convert/trim.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var __1 = __webpack_require__("./src/utils/index.ts");

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var Trim = function Trim(value) {
  var stop = __1.Get(value, "stop", false);

  if (stop) {
    return t_monad_1.Tmonad(value);
  }

  var result = t_monad_1.Tmonad(value);

  try {
    result.value = result.value.trim();
  } catch (error) {}

  result["instanceof"].push("Trim");
  return result;
};

exports["default"] = Trim;

/***/ }),

/***/ "./src/utils/convert/uppercase.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var UpperCase = function UpperCase(string) {
  var result = string;

  try {
    result.value = result.value.toUpperCase();
  } catch (error) {
    result.valid = false;
  }

  result["instanceof"].push("UpperCase");
  return result;
};

exports["default"] = UpperCase;

/***/ }),

/***/ "./src/utils/convert/uri.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var type_1 = __webpack_require__("./src/utils/type/index.ts");

exports.doURI = function (value, encode, component) {
  if (encode === void 0) {
    encode = false;
  }

  if (component === void 0) {
    component = false;
  }

  var result = t_monad_1.Tmonad(value);

  if (result.stop) {
    return result;
  }

  try {
    if (encode) {
      if (component) {
        result.value = encodeURIComponent(result.value);
      } else {
        result.value = encodeURI(result.value);
      }
    } else {
      if (component) {
        result.value = decodeURIComponent(result.value);
      } else {
        result.value = decodeURI(result.value);
      }
    }
  } catch (error) {
    result.valid = false;
  }

  result.type = type_1.Type(result.value);
  result["instanceof"].push(encode ? "encodeUri" : "decodeUri");
  return result;
};

exports.EncodeUri = function (value) {
  return exports.doURI(value, true);
};

exports.DecodeUri = function (value) {
  return exports.doURI(value);
};

exports.EncodeUriComponent = function (value) {
  return exports.doURI(value, true, true);
};

exports.DecodeUriComponent = function (value) {
  return exports.doURI(value, false, true);
};

/***/ }),

/***/ "./src/utils/convert/use_if.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var t_monad_1 = __webpack_require__("./src/utils/convert/t-monad.ts");

var UseIf = function UseIf(condition, ifNot, value) {
  return t_monad_1.Tmonad(condition(value) ? value : ifNot(value));
};

exports["default"] = UseIf;

/***/ }),

/***/ "./src/utils/curry/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function Curry(func, cachedArgs) {
  var _this = this;

  if (cachedArgs === void 0) {
    cachedArgs = [];
  }

  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    cachedArgs = cachedArgs.concat.apply(cachedArgs, args);

    if (cachedArgs.length >= func.length) {
      return func.apply(_this, cachedArgs);
    } else {
      return Curry(func, cachedArgs);
    }
  };
}

exports["default"] = Curry;

/***/ }),

/***/ "./src/utils/curve/ease-bounce.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var get_ease_1 = __webpack_require__("./src/utils/curve/get-ease.ts");

var ease_power_1 = __webpack_require__("./src/utils/curve/ease-power.ts");

var EaseBounce = function EaseBounce(values, duration, pow) {
  if (pow === void 0) {
    pow = 4;
  }

  return get_ease_1["default"](values, duration, pow, function (index, frames, pow) {
    return ease_power_1["default"](1 - index / frames, pow);
  });
};

exports["default"] = EaseBounce;

/***/ }),

/***/ "./src/utils/curve/ease-in-out.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var get_ease_1 = __webpack_require__("./src/utils/curve/get-ease.ts");

var ease_power_1 = __webpack_require__("./src/utils/curve/ease-power.ts");

var EaseInOut = function EaseInOut(values, duration, pow) {
  if (pow === void 0) {
    pow = 4;
  }

  return get_ease_1["default"](values, duration, pow, function (index, frames, pow) {
    return ease_power_1["default"](index / frames * (index / frames), pow);
  });
};

exports["default"] = EaseInOut;

/***/ }),

/***/ "./src/utils/curve/ease-in.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var get_ease_1 = __webpack_require__("./src/utils/curve/get-ease.ts");

var EaseIn = function EaseIn(values, duration, pow) {
  if (pow === void 0) {
    pow = 4;
  }

  return get_ease_1["default"](values, duration, pow, function (index, frames) {
    var t = index / frames;
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  });
};

exports["default"] = EaseIn;

/***/ }),

/***/ "./src/utils/curve/ease-out.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var get_ease_1 = __webpack_require__("./src/utils/curve/get-ease.ts");

var ease_power_1 = __webpack_require__("./src/utils/curve/ease-power.ts");

var EaseOut = function EaseOut(values, duration, pow) {
  if (pow === void 0) {
    pow = 4;
  }

  return get_ease_1["default"](values, duration, pow, function (index, frames, pow) {
    return ease_power_1["default"](index / frames, pow);
  });
};

exports["default"] = EaseOut;

/***/ }),

/***/ "./src/utils/curve/ease-power.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var EasePower = function EasePower(stepDecimal, pow) {
  if (pow === void 0) {
    pow = 4;
  }

  return 1 - Math.pow(1 - stepDecimal, pow);
};

exports["default"] = EasePower;

/***/ }),

/***/ "./src/utils/curve/get-ease.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var distance = function distance(v) {
  return v[1] - v[0];
};

var GetEase = function GetEase(values, duration, pow, powerFn) {
  var results = [];
  var index = 0;

  while (index < duration - 1) {
    var current = Math.round(distance(values) * powerFn(index, duration, pow) * 1000) / 1000;
    results.push(values[0] + current);
    index = index + 1;
  }

  results.push(values[1]);
  return results;
};

exports["default"] = GetEase;

/***/ }),

/***/ "./src/utils/curve/get.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** BORROWED HEAVILY FROM: https://stackoverflow.com/a/15528789 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GetCurve = function GetCurve(points, tension, closedPath, frames) {
  if (tension === void 0) {
    tension = 0.5;
  }

  if (closedPath === void 0) {
    closedPath = false;
  }

  if (frames === void 0) {
    frames = 16;
  }

  var numOfSegments = Math.round(frames * .3295);
  var isPairs = Array.isArray(points[0]);
  var res = [];
  var pts = points.slice(0);
  var pts2 = pts.slice(0);
  var x;
  var y;
  var t1x;
  var t2x;
  var t1y;
  var t2y;
  var c1;
  var c2;
  var c3;
  var c4;
  var st;
  var t;
  var i;

  if (isPairs) {
    pts = pts.concat.apply([], pts);
  } else {
    pts = pts.concat.apply([], pts.map(function (p) {
      return [p, p];
    }));
  }

  pts2 = pts.slice(0);

  if (closedPath) {
    pts.unshift(pts2[pts2.length - 1]);
    pts.unshift(pts2[pts2.length - 2]);
    pts.unshift(pts2[pts2.length - 1]);
    pts.unshift(pts2[pts2.length - 2]);
    pts.push(pts2[0]);
    pts.push(pts2[1]);
  } else {
    pts.unshift(pts2[1]);
    pts.unshift(pts2[0]);
    pts.push(pts[pts2.length - 2]);
    pts.push(pts[pts2.length - 1]);
  }

  for (i = 2; i < pts.length - 4; i += 2) {
    for (t = 0; t <= numOfSegments; t++) {
      // calc tension vectors
      t1x = (pts[i + 2] - pts[i - 2]) * tension;
      t2x = (pts[i + 4] - pts[i]) * tension;
      t1y = (pts[i + 3] - pts[i - 1]) * tension;
      t2y = (pts[i + 5] - pts[i + 1]) * tension; // calc step

      st = t / numOfSegments; // calc cardinals

      c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
      c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
      c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
      c4 = Math.pow(st, 3) - Math.pow(st, 2); // calc x and y cords with common control vectors

      x = c1 * pts[i] + c2 * pts[i + 2] + c3 * t1x + c4 * t2x;
      y = c1 * pts[i + 1] + c2 * pts[i + 3] + c3 * t1y + c4 * t2y;
      res.push([x, y]);
    }
  }

  return isPairs ? res : res.map(function (p) {
    return p[0];
  });
};

exports["default"] = GetCurve;

/***/ }),

/***/ "./src/utils/curve/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ease_bounce_1 = __webpack_require__("./src/utils/curve/ease-bounce.ts");

exports.EaseBounce = ease_bounce_1["default"];

var ease_in_out_1 = __webpack_require__("./src/utils/curve/ease-in-out.ts");

exports.EaseInOut = ease_in_out_1["default"];

var ease_in_1 = __webpack_require__("./src/utils/curve/ease-in.ts");

exports.EaseIn = ease_in_1["default"];

var ease_out_1 = __webpack_require__("./src/utils/curve/ease-out.ts");

exports.EaseOut = ease_out_1["default"];

var ease_power_1 = __webpack_require__("./src/utils/curve/ease-power.ts");

exports.EasePower = ease_power_1["default"];

var get_ease_1 = __webpack_require__("./src/utils/curve/get-ease.ts");

exports.GetEase = get_ease_1["default"];

var get_1 = __webpack_require__("./src/utils/curve/get.ts");

exports.GetCurve = get_1["default"];

/***/ }),

/***/ "./src/utils/equals/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var get_1 = __webpack_require__("./src/utils/type/get.ts");

var primitives_1 = __webpack_require__("./src/utils/type/primitives.ts");

var Equals = function Equals(value1, value2) {
  var type = get_1["default"](value1);

  if (get_1["default"](value2) !== type) {
    return false;
  }

  if (primitives_1["default"](value1)) {
    return value2 === value1;
  }

  if (type === "boolean" && value1 !== value2) {
    return false;
  }

  if (type === "array" && value1.length !== value2.length) {
    return false;
  }

  if (type === "object" && Object.keys(value1).length !== Object.keys(value2).length) {
    return false;
  }

  if (type === "date") {
    var d = value1 === value2;

    try {
      d = new Date(value1).getTime() === new Date(value2).getTime();
    } catch (error) {}

    return d;
  }

  if (type === "dom") {
    return value1.isEqualNode(value2);
  }

  if (type === "array") {
    var len = value1.length;

    while (len--) {
      if (!Equals(value1[len], value2[len])) {
        return false;
      }
    }
  }

  if (type === "object") {
    var keys = Object.keys(value1);
    var len = keys.length;

    while (len--) {
      if (!Equals(value1[keys[len]], value2[keys[len]])) {
        return false;
      }
    }
  }

  return true;
};

exports["default"] = Equals;

/***/ }),

/***/ "./src/utils/extension/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Ext = function Ext(string) {
  return string.match(new RegExp('[^.]+$')).toString();
};

exports["default"] = Ext;

/***/ }),

/***/ "./src/utils/get/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Get = function Get(el, path, emptyVal, conditionFn) {
  if (el === void 0) {
    el = {};
  }

  if (path === void 0) {
    path = "";
  }

  if (emptyVal === void 0) {
    emptyVal = undefined;
  }

  if (conditionFn === void 0) {
    conditionFn = function conditionFn(v) {
      return v;
    };
  }

  if (!el) {
    return emptyVal;
  }

  var Path = [el];

  if (path && path.toString().split) {
    Path = [el].concat(path.toString().split("."));
  }

  var result = Path.reduce(function (accumulator, currentValue) {
    if (accumulator === undefined || accumulator === null) {
      return emptyVal;
    }

    if (currentValue.indexOf(".") === -1 && currentValue.indexOf("(") > -1) {
      var reg = /\((.*?)\)/g.exec(currentValue);
      var argsString = reg ? reg[1] : "";
      var args = argsString.split(",").map(function (arg) {
        return arg.trim();
      });
      var functionName = currentValue.split("(")[0];

      if (typeof accumulator[functionName] === "function") {
        return accumulator[functionName].apply(accumulator, args);
      }
    }

    if (accumulator !== null && accumulator !== undefined && currentValue) {
      return accumulator[currentValue];
    } else {
      return accumulator;
    }
  });

  if (result === undefined || result === null) {
    return emptyVal;
  }

  return conditionFn(result);
};

exports["default"] = Get;

/***/ }),

/***/ "./src/utils/html/attr.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.setAttribute = function (element, name, value, asProperty) {
  if (asProperty === void 0) {
    asProperty = false;
  }

  if (!element || !name) {
    return element;
  }

  var set = function set(n, v) {
    if (!asProperty) {
      return !!v ? element.setAttribute(n, v) : element.removeAttribute(n);
    }

    return !!v ? element[n] = v : element[n] = undefined;
  };

  if (Array.isArray(name)) {
    name.forEach(function (n, i) {
      return set(n, value[i]);
    });
  } else {
    set(name, value);
  }

  return element;
};

exports.addRemoveAttr = function (el, attr, value) {
  if (!el) {
    return;
  }

  if (attr === "accept") {
    return exports.setAttribute(el, "accept", !!value ? value.join(", ") : undefined);
  }

  var arias = ["disabled", "required"];

  if (arias.indexOf(attr) > -1) {
    exports.setAttribute(el, "aria-" + attr, value);
  }

  exports.setAttribute(el, attr, value);
  return el;
};

/***/ }),

/***/ "./src/utils/html/component-class-object.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var split_1 = __webpack_require__("./src/utils/convert/split.ts");

var map_1 = __webpack_require__("./src/utils/convert/map.ts");

var filter_1 = __webpack_require__("./src/utils/convert/filter.ts");

var commas_to_array_1 = __webpack_require__("./src/utils/convert/commas-to-array.ts");

var wcClass = function wcClass(el, newClasses, previousClasses) {
  var _a, _b;

  if (!el) {
    return;
  }

  if (Array.isArray(el)) {
    el = el[0];
  }

  var oldBrowser = !window.DOMTokenList.prototype.replace;
  var newClassArray = pipe_1["default"](commas_to_array_1["default"], if_invalid_1["default"]([]))(newClasses).value;
  var previousClassArray = pipe_1["default"](commas_to_array_1["default"], if_invalid_1["default"]([]))(previousClasses).value;

  if (oldBrowser) {
    if (previousClassArray.length && !!el.className) {
      previousClassArray.forEach(function (c) {
        return el.className = el.className.split(c).map(function (cl) {
          return cl.trim();
        }).join("");
      });
    }

    if (newClassArray.length) {
      newClassArray.forEach(function (c) {
        return el.className = (!!el.className ? el.className : "") + " " + c;
      });
    }

    return;
  }

  if (previousClassArray.length) {
    (_a = el.classList).remove.apply(_a, previousClassArray);
  }

  if (newClassArray.length) {
    (_b = el.classList).add.apply(_b, newClassArray);
  }
};

var ComponentClassObject = {
  format: function format(val) {
    return pipe_1["default"](to_string_1["default"], if_invalid_1["default"](""), split_1["default"](" "), map_1["default"](function (v) {
      return v.trim();
    }), filter_1["default"](function (v) {
      return !!v;
    }))(val).value;
  },
  onChange: function onChange(val, host) {
    return wcClass(host.elements.root, val, host.state["class"].previous);
  }
};
exports["default"] = ComponentClassObject;

/***/ }),

/***/ "./src/utils/html/events.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var events = {
  transitionend: {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd",
    msTransition: "msTransitionEnd"
  },
  transitionstart: {
    transition: "transitionstart",
    OTransition: "oTransitionStart",
    MozTransition: "transitionstart",
    WebkitTransition: "webkitTransitionStart",
    msTransition: "msTransitionStart"
  }
};
var el = document.createElement("fake-element");

var EventName = function EventName(key) {
  if (!events[key]) {
    return "";
  }

  var e;

  for (e in events[key]) {
    if (el.style[e] !== undefined) {
      return events[key][e];
    }
  }

  return "";
};

exports["default"] = EventName;

/***/ }),

/***/ "./src/utils/html/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var attr_1 = __webpack_require__("./src/utils/html/attr.ts");

exports.setAttribute = attr_1.setAttribute;
exports.addRemoveAttr = attr_1.addRemoveAttr;

var events_1 = __webpack_require__("./src/utils/html/events.ts");

exports.EventName = events_1["default"];

var inputs_1 = __webpack_require__("./src/utils/html/inputs.ts");

exports.setInputCaret = inputs_1.setInputCaret;
exports.isAutoFilled = inputs_1.isAutoFilled;
exports.isFocused = inputs_1.isFocused;
exports.getInvalidMessage = inputs_1.getInvalidMessage;
exports.getValue = inputs_1.getValue;

var replace_element_contents_1 = __webpack_require__("./src/utils/html/replace-element-contents.ts");

exports.replaceElementContents = replace_element_contents_1["default"];

var query_1 = __webpack_require__("./src/utils/html/query.ts");

exports.findIn = query_1.findIn;

var tags_1 = __webpack_require__("./src/utils/html/tags.ts");

exports.svgTags = tags_1.svgTags;
exports.htmlTags = tags_1.htmlTags;

var component_class_object_1 = __webpack_require__("./src/utils/html/component-class-object.ts");

exports.ComponentClassObject = component_class_object_1["default"];

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

exports.SetStyleRules = set_style_rules_1["default"];

/***/ }),

/***/ "./src/utils/html/inputs.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getValue(input) {
  var type = input.type;

  if (type === "checkbox" || type === "radio") {
    return input["checked"];
  }

  if (type === "select" && input["selectedOptions"]) {
    var value = Array.from(input["selectedOptions"]).map(function (o) {
      return o.value;
    });

    if (value.length < 2) {
      return value[0];
    }

    return value;
  }

  return input.value;
}

exports.getValue = getValue;

function getInvalidMessage(input) {
  var message;

  try {
    message = input.validationMessage === "" ? undefined : input.validationMessage;
  } catch (error) {}

  if (message && message[message.length - 1] === ".") {
    message = message.substring(0, message.length - 1);
  }

  return message;
}

exports.getInvalidMessage = getInvalidMessage;

function isAutoFilled(input) {
  var nativeMatches = input.matches || input["msMatchesSelector"];

  try {
    return nativeMatches.call(input, ":-webkit-autofill");
  } catch (error) {
    try {
      return nativeMatches.call(input, ":-moz-autofill");
    } catch (error) {
      try {
        return nativeMatches.call(input, ":-ms-autofill");
      } catch (error) {
        try {
          return nativeMatches.call(input, ":-o-autofill");
        } catch (error) {
          try {
            return nativeMatches.call(input, ":autofill");
          } catch (error) {
            return false;
          }
        }
      }
    }
  }
}

exports.isAutoFilled = isAutoFilled;

function isFocused(input) {
  if (input["focused"]) {
    return true;
  }

  var nativeMatches = input.matches || input["msMatchesSelector"];

  try {
    return nativeMatches.call(input, ":focus");
  } catch (error) {
    return false;
  }
}

exports.isFocused = isFocused;

exports.setInputCaret = function (input, position, doc) {
  if (!input || !doc || doc.activeElement !== input) {
    return;
  }

  if (input.createTextRange) {
    var range = input.createTextRange();
    range.move('character', position);
    range.select();
  } else if (input.selectionStart) {
    input.setSelectionRange(position, position);
  }

  return input;
};

/***/ }),

/***/ "./src/utils/html/query.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.findIn = function (parent, selector, all) {
  if (all === void 0) {
    all = false;
  }

  return !parent ? undefined : parent[all ? "querySelectorAll" : "querySelector"](selector);
};

/***/ }),

/***/ "./src/utils/html/replace-element-contents.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var replaceElementContents = function replaceElementContents(element, contents) {
  var respond = function respond() {
    return {
      element: element,
      contents: contents
    };
  };

  if (!element) {
    return respond();
  }

  element.innerHTML = "";

  if (typeof contents === "string") {
    element.innerHTML = contents;
    return respond();
  }

  if (!Array.isArray(contents)) {
    return respond();
  }

  contents.forEach(function (content) {
    return element.appendChild(content);
  });
  return respond();
};

exports["default"] = replaceElementContents;

/***/ }),

/***/ "./src/utils/html/set-style-rules.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var SetStyleRules = function SetStyleRules(styleElement, ruleString) {
  if (!styleElement || !ruleString || ruleString === "undefined" || ruleString === "null") {
    return;
  }

  if (styleElement.styleSheet) {
    // IE
    styleElement.styleSheet.cssText = "" + (!!styleElement.styleSheet.cssText ? styleElement.styleSheet.cssText : "") + ruleString;
  } else {
    // the world
    styleElement.innerHTML = "";
    var tt1 = document.createTextNode(ruleString);
    styleElement.appendChild(tt1);
  }
};

exports["default"] = SetStyleRules;

/***/ }),

/***/ "./src/utils/html/tags.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svgTags = ['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'audio', 'canvas', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'video', 'view', 'vkern'];
exports.htmlTags = ['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr'];

/***/ }),

/***/ "./src/utils/id/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

function idGenerator() {
  var index, objectIds, doId, objectId;
  return __generator(this, function (_a) {
    switch (_a.label) {
      case 0:
        index = 0;
        objectIds = [];

        doId = function doId(i) {
          return ("" + i + (new Date().getTime() / 1000 | 0).toString(16) + "xxxxxxxxxxxxxxxx").replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
          }).toLowerCase();
        };

        _a.label = 1;

      case 1:
        if (false) {}
        index = index + 1;
        objectId = doId(index);

        while (objectIds.indexOf(doId(index)) > -1) {
          objectId = doId(index);
        }

        return [4
        /*yield*/
        , objectId];

      case 2:
        _a.sent();

        return [3
        /*break*/
        , 1];

      case 3:
        return [2
        /*return*/
        ];
    }
  });
}

var idIterator = idGenerator();

var ID = function ID() {
  return idIterator.next().value;
};

exports["default"] = ID;

/***/ }),

/***/ "./src/utils/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(__webpack_require__("./src/utils/webcomponent/index.ts"));

__export(__webpack_require__("./src/utils/validate/index.ts"));

__export(__webpack_require__("./src/utils/type/index.ts"));

var set_1 = __webpack_require__("./src/utils/set/index.ts");

exports.Set = set_1["default"];

__export(__webpack_require__("./src/utils/polyfills/index.ts"));

__export(__webpack_require__("./src/utils/platform/index.ts"));

var equals_1 = __webpack_require__("./src/utils/equals/index.ts");

exports.Equals = equals_1["default"];

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

exports.Pipe = pipe_1["default"];

var partial_1 = __webpack_require__("./src/utils/partial/index.ts");

exports.Partial = partial_1["default"];

var observeWorker_1 = __webpack_require__("./src/utils/observeWorker/index.ts");

exports.ObserveWorker = observeWorker_1["default"];

var observeEvent_1 = __webpack_require__("./src/utils/observeEvent/index.ts");

exports.ObserveEvent = observeEvent_1["default"];

var observe_1 = __webpack_require__("./src/utils/observe/index.ts");

exports.Observe = observe_1["default"];

var id_1 = __webpack_require__("./src/utils/id/index.ts");

exports.ID = id_1["default"];

var get_1 = __webpack_require__("./src/utils/get/index.ts");

exports.Get = get_1["default"];

__export(__webpack_require__("./src/utils/extension/index.ts"));

__export(__webpack_require__("./src/utils/curve/index.ts"));

var curry_1 = __webpack_require__("./src/utils/curry/index.ts");

exports.Curry = curry_1["default"];

var scroll_1 = __webpack_require__("./src/utils/scroll/index.ts");

exports.ScrollTo = scroll_1["default"];

var throttle_1 = __webpack_require__("./src/utils/throttle/index.ts");

exports.throttle = throttle_1["default"];

__export(__webpack_require__("./src/utils/convert/index.ts"));

__export(__webpack_require__("./src/utils/html/index.ts"));

/***/ }),

/***/ "./src/utils/merge/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var get_1 = __webpack_require__("./src/utils/type/get.ts");

var mergeArray = function mergeArray(arr1, arr2) {
  var result = arr1.slice(0);
  arr2.forEach(function (value, index) {
    return result[index] = value;
  });
  return result;
};

var merge = function merge(obj1, obj2) {
  if (!obj1) {
    return Object.assign({}, obj2);
  }

  if (!obj2) {
    return Object.assign({}, obj1);
  }

  var type1 = get_1["default"](obj1);
  var type2 = get_1["default"](obj2);

  if (type1 !== type2 || ["array", "object"].indexOf(type1) === -1) {
    return obj2;
  }

  if (type1 === "array") {
    return mergeArray(obj1, obj2);
  }

  var result = Object.assign({}, obj1);

  for (var key in obj2) {
    if (!obj2[key]) {
      continue;
    }

    result[key] = merge(obj1[key], obj2[key]);
  }

  return result;
};

var mutateMergeArray = function mutateMergeArray(arr1, arr2) {
  arr2.forEach(function (value, index) {
    return arr1[index] = value;
  });
  return arr1;
};

var mutateMerge = function mutateMerge(obj1, obj2) {
  if (!obj1) {
    return obj2;
  }

  if (!obj2) {
    return obj1;
  }

  var type1 = get_1["default"](obj1);
  var type2 = get_1["default"](obj2);

  if (type1 !== type2 || ["array", "object"].indexOf(type1) === -1) {
    return obj2;
  }

  if (type1 === "array") {
    return mutateMergeArray(obj1, obj2);
  }

  for (var key in obj2) {
    if (!obj2[key]) {
      continue;
    }

    obj1[key] = mutateMerge(obj1[key], obj2[key]);
  }

  return obj1;
};

var Merge = function Merge(obj1, obj2, mutate) {
  if (mutate === void 0) {
    mutate = false;
  }

  return !mutate ? merge(obj1, obj2) : mutateMerge(obj1, obj2);
};

exports["default"] = Merge;

/***/ }),

/***/ "./src/utils/observe/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var id_1 = __webpack_require__("./src/utils/id/index.ts");

var Observe = function Observe(initialValue, noInit) {
  if (noInit === void 0) {
    noInit = false;
  }

  var values = Object.assign({}, {
    value: initialValue,
    previousValue: undefined,
    updated: new Date().getTime(),
    subscriptions: {}
  });

  var loop = function loop(key, val, valuesObj) {
    if (valuesObj === void 0) {
      valuesObj = {};
    }

    Object.keys(values.subscriptions).forEach(function (subscriptionId) {
      var subscriptionFn = values.subscriptions[subscriptionId][key];

      if (!subscriptionFn || typeof subscriptionFn !== "function") {
        return;
      }

      subscriptionFn(val, valuesObj, subscriptionId);
    });
  };

  var _unsubscribe = function unsubscribe(subscription) {
    return function () {
      values.subscriptions[subscription.id] = null;
      delete values.subscriptions[subscription.id];
    };
  };

  return {
    get value() {
      return values.value;
    },

    get previous() {
      return values.previousValue;
    },

    next: function next(v) {
      values = Object.assign({}, {
        value: v,
        previousValue: values.value,
        updated: new Date().getTime(),
        subscriptions: values.subscriptions
      });
      loop("next", values.value, values);
    },
    error: function error(err) {
      loop("error", err, values);
    },
    complete: function complete() {
      loop("complete", values);
    },
    subscribe: function subscribe(next, error, complete) {
      if (error === void 0) {
        error = function error(_e) {};
      }

      if (complete === void 0) {
        complete = function complete() {};
      }

      var subscription = Object.assign({}, {
        next: next,
        error: error,
        complete: complete,
        id: id_1["default"]()
      });
      subscription.unsubscribe = _unsubscribe(subscription);
      values.subscriptions[subscription.id] = subscription;

      if (!noInit && values.value !== undefined && typeof subscription.next === "function") {
        subscription.next(values.value, values, subscription.id);
      }

      return _unsubscribe(subscription);
    },
    unsubscribe: function unsubscribe(subscription) {
      if (!subscription || !subscription.id || !values.subscriptions[subscription.id]) {
        return;
      }

      return _unsubscribe(subscription);
    }
  };
};

exports["default"] = Observe;

/***/ }),

/***/ "./src/utils/observeEvent/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ObserveEvent = function ObserveEvent(element, eventName, options) {
  if (options === void 0) {
    options = {};
  }

  options = Object.assign({}, {
    preventDefault: false,
    stopPropagation: false,
    useCapture: true
  }, options);

  if (!element || !eventName) {
    return;
  }

  var subscriptions = {};

  var loop = function loop(method, data) {
    Object.keys(subscriptions).forEach(function (key) {
      return subscriptions[key][method](data);
    });
  };

  var eventHandler = function eventHandler(event) {
    if (Object.keys(subscriptions).length === 0) {
      return shutDown();
    }

    if (options.preventDefault) {
      event.preventDefault();
    }

    if (options.stopPropagation) {
      event.stopPropagation();
    }

    previous = value;
    value = event;
    loop("next", event);
  };

  var startUp = function startUp() {
    element.removeEventListener(eventName, eventHandler, options.useCapture);
    element.addEventListener(eventName, eventHandler, options.useCapture);
  };

  var shutDown = function shutDown() {
    element.removeEventListener(eventName, eventHandler, options.useCapture);
  };

  var unSubscribe = function unSubscribe(subscriberId) {
    return function () {
      subscriptions[subscriberId] = null;
      delete subscriptions[subscriberId];

      if (Object.keys(subscriptions).length === 0) {
        shutDown();
      }
    };
  };

  var value;
  var previous;
  var methods = {
    get value() {
      return value;
    },

    get previous() {
      return previous;
    },

    dispose: function dispose() {
      shutDown();
      Object.keys(subscriptions).forEach(function (key) {
        subscriptions[key].complete();
        unSubscribe(key);
      });
    },
    subscribe: function subscribe(next, error, complete) {
      if (typeof next !== "function" && typeof error !== "function" && typeof complete !== "function") {
        return;
      }

      var subscriber = Object.assign({}, {
        next: next,
        error: error,
        complete: complete
      }, {
        id: new Date().getTime() + "_" + Object.keys(subscriptions).length + "_" + Math.round(Math.random() * 10000)
      });
      subscriptions[subscriber.id] = subscriber;

      if (typeof subscriptions[subscriber.id].error !== "function") {
        subscriptions[subscriber.id].error = unSubscribe(subscriber.id);
      }

      if (typeof subscriptions[subscriber.id].complete !== "function") {
        subscriptions[subscriber.id].complete = unSubscribe(subscriber.id);
      }

      startUp();
      return unSubscribe(subscriber.id);
    }
  };
  var mObserver = new MutationObserver(function (e) {
    if (!e || typeof e.forEach !== "function") {
      return;
    }

    e.forEach(function (_e) {
      Array.from(_e.removedNodes).forEach(function (r) {
        if (r !== element) {
          return;
        }

        methods.dispose();
      });
    });
  });
  var waiting = 1000;

  var waitForParent = function waitForParent() {
    if (element === window) {
      return;
    }

    if (!!element.offsetParent) {
      try {
        mObserver.observe(element.offsetParent, {
          childList: true
        });
        return true;
      } catch (error) {}
    }

    waiting = waiting - 1;

    if (!waiting) {
      return;
    }

    requestAnimationFrame(waitForParent);
  };

  waitForParent();
  return methods;
};

exports["default"] = ObserveEvent;

/***/ }),

/***/ "./src/utils/observeWorker/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var get_1 = __webpack_require__("./src/utils/get/index.ts");

var id_1 = __webpack_require__("./src/utils/id/index.ts");

var to_json_1 = __webpack_require__("./src/utils/convert/to_json.ts");

var ObserveWorker = function ObserveWorker(func) {
  var value;
  var previous;
  var worker;
  var functionString = to_string_1["default"](func).value;
  var subscriptions = {};
  var firstBracket = functionString.indexOf("{");
  var beginingSlice = functionString.slice(firstBracket);
  var pendingSubscriptions = [];
  functionString = "function webworker()" + beginingSlice + "webworker()";

  var loop = function loop(method, data, subs) {
    return Object.keys(subs).forEach(function (key) {
      return get_1["default"](subs, key + "." + method, function () {})(data);
    });
  };

  var shutDown = function shutDown() {
    if (worker) {
      worker.terminate();
    }

    worker = undefined;
    return false;
  };

  var startUp = function startUp() {
    if (worker) {
      return;
    }

    var blob;

    try {
      blob = window.URL.createObjectURL(new Blob([functionString], {
        type: 'application/javascript'
      }));
    } catch (error) {}

    if (!blob) {
      return;
    }

    worker = new Worker(blob);

    worker.onmessage = function (e) {
      previous = value;
      value = e.data;
      return loop("next", value, subscriptions);
    };

    worker.onerror = function (e) {
      return loop("error", e.message, subscriptions);
    };

    return worker;
  };

  var noShutdown = function noShutdown(subs) {
    return Object.keys(subs).length === 0 ? shutDown() : true;
  };

  var unSubscribe = function unSubscribe(subscriberId) {
    return function () {
      subscriptions[subscriberId] = null;
      delete subscriptions[subscriberId];
      noShutdown(subscriptions);
    };
  };

  var completeAll = function completeAll(subs) {
    return Object.keys(subs).forEach(function (key) {
      subs[key].complete();
      unSubscribe(key);
    });
  };

  var methods = {
    get value() {
      return value;
    },

    get previous() {
      return previous;
    },

    get functionString() {
      return functionString;
    },

    get subscriptions() {
      return subscriptions;
    },

    get pending() {
      return pendingSubscriptions;
    },

    dispose: function dispose() {
      completeAll(subscriptions);
    },
    post: function post(msg) {
      var index = pendingSubscriptions.length;
      return new Promise(function (resolve, reject) {
        var res = function res(e) {
          pendingSubscriptions[index]();
          return resolve(e);
        };

        var rej = function rej(e) {
          pendingSubscriptions[index]();
          return reject(e);
        };

        pendingSubscriptions.push(methods.subscribe(res, rej, rej));
        worker.postMessage(to_json_1["default"](msg).value);
      });
    },
    subscribe: function subscribe(next, error, complete) {
      if (typeof next !== "function" && typeof error !== "function" && typeof complete !== "function") {
        return;
      }

      var subscriber = {
        next: next,
        error: error,
        complete: complete,
        id: id_1["default"]()
      };
      subscriptions[subscriber.id] = subscriber;

      if (typeof subscriptions[subscriber.id].error !== "function") {
        subscriptions[subscriber.id].error = unSubscribe(subscriber.id);
      }

      if (typeof subscriptions[subscriber.id].complete !== "function") {
        subscriptions[subscriber.id].complete = unSubscribe(subscriber.id);
      }

      startUp();
      return unSubscribe(subscriber.id);
    }
  };
  return methods;
};

window.ObserveWorker = ObserveWorker;
exports["default"] = ObserveWorker;

/***/ }),

/***/ "./src/utils/partial/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var Partial = function Partial(func, args) {
  if (args === void 0) {
    args = [];
  }

  var formatArgs = function formatArgs(Args) {
    var formattedArgs = [];
    var index = 0;

    while (index < Args.length) {
      formattedArgs.push(Args[index]);
      index = index + 1;
    }

    return formattedArgs;
  };

  var returned = {
    set: function set(arg, index) {
      var proxy;

      if (index === undefined) {
        proxy = formatArgs(args).concat(arg);
      } else {
        proxy = formatArgs(args).slice(0);
        proxy[index] = arg;
      }

      return Partial(func, proxy);
    },
    tap: function tap(fn) {
      return Partial(fn(pipe_1["default"].apply(this, formatArgs(args))));
    },
    pipe: function pipe(x) {
      var result = pipe_1["default"].apply(this, formatArgs(args));
      return typeof result === "function" ? result(x) : result;
    },
    curry: function curry(x) {
      var proxy = formatArgs(args).slice(0);
      var len = proxy.length;
      var index = 0;
      var result;

      while (index < len) {
        var arg = proxy[index];
        result = result === undefined ? func(arg) : result(arg);

        if (typeof result !== "function") {
          return result;
        }

        index = index + 1;
      }

      if (typeof result !== "function") {
        return result;
      }

      return result(x);
    },
    bind: function bind(This) {
      return Partial(func.bind(This), args);
    },
    apply: function apply(x) {
      console.log(x);
      return func.apply(null, formatArgs(args).concat(Array.isArray(x) ? x : [x]));
    },
    call: function call() {
      var x = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }

      console.log.apply(console, ["call"].concat(x));
      return func.call.apply(func, [null].concat(formatArgs(args), x));
    }
  };
  return Object.defineProperties(returned, {
    func: {
      get: function get() {
        return func;
      }
    },
    args: {
      get: function get() {
        return formatArgs(args);
      }
    },
    length: {
      get: function get() {
        return formatArgs(args).length;
      }
    }
  });
};

exports["default"] = Partial;

/***/ }),

/***/ "./src/utils/pipe/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var pipe = function pipe() {
  var functions = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    functions[_i] = arguments[_i];
  }

  return function (data) {
    return functions.reduce(function (value, func) {
      return typeof func !== "function" ? value : func(value);
    }, data);
  };
};

exports["default"] = pipe;

/***/ }),

/***/ "./src/utils/platform/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var mobile_1 = __webpack_require__("./src/utils/platform/mobile.ts");

exports.isMobile = mobile_1["default"];

/***/ }),

/***/ "./src/utils/platform/mobile.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isMobile = typeof window.orientation !== "undefined" || window.navigator.userAgent.indexOf('IEMobile') !== -1;
exports["default"] = isMobile;

/***/ }),

/***/ "./src/utils/polyfills/assign.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ObjectAssignPolyfill = function ObjectAssignPolyfill() {
  if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target) {
        'use strict';

        if (target === null || target === undefined) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource !== null && nextSource !== undefined) {
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }

        return to;
      },
      writable: true,
      configurable: true
    });
  }
};

exports["default"] = ObjectAssignPolyfill;

/***/ }),

/***/ "./src/utils/polyfills/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var assign_1 = __webpack_require__("./src/utils/polyfills/assign.ts");

exports.ObjectAssignPolyfill = assign_1["default"];

var mutation_1 = __webpack_require__("./src/utils/polyfills/mutation.ts");

exports.MutationObserverPolyfill = mutation_1["default"];

var wc_1 = __webpack_require__("./src/utils/polyfills/wc.ts");

exports.WebComponentPolyFill = wc_1["default"];

/***/ }),

/***/ "./src/utils/polyfills/mutation.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _this = this;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var timer_1 = __webpack_require__("./src/services/timer.ts");

var MutationObserverPolyfill = function MutationObserverPolyfill(w) {
  (function () {
    if (w.MutationObserver !== null && w.MutationObserver !== undefined) {
      return;
    }

    w.MutationObserver = function (cb) {
      this.callBack = cb;
      return this;
    };

    w.MutationObserver.prototype.observe = function (element) {
      var cb = this.callBack;
      var oldHtml;
      this.interval = timer_1["default"](0, function () {
        var html = element.innerHTML;

        if (html !== oldHtml) {
          oldHtml = html;
          return cb.apply(null);
        }
      });
    };

    w.MutationObserver.prototype.disconnect = function () {
      return this.interval.cancel();
    };
  }).call(_this);
};

exports["default"] = MutationObserverPolyfill;

/***/ }),

/***/ "./src/utils/polyfills/wc.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var setBUIltComponents = function setBUIltComponents(w) {
  return !!w.bUIltComponents ? undefined : w.bUIltComponents = {};
};

var setBUIltComponentsListener = function setBUIltComponentsListener(w) {
  if (!w.bUIltComponents.listener) {
    w.bUIltComponents.listener = new w.MutationObserver(function () {
      Object.keys(w.bUIltComponents).forEach(function (key) {
        Array.from(document.body.querySelectorAll(key)).forEach(function (el) {
          if (!el.ready) {
            w.bUIltComponents[key](el);
          }
        });
      });
    });
    w.bUIltComponents.listener.observe(document.body);
  }
};

var WebComponentPolyFill = function WebComponentPolyFill(w, componentName, componentClass) {
  setBUIltComponents(w);

  if (!!w.bUIltComponents[componentName]) {
    return;
  }

  setBUIltComponentsListener(w);
  w.bUIltComponents[componentName] = componentClass;
};

exports["default"] = WebComponentPolyFill;

/***/ }),

/***/ "./src/utils/scroll/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var timer_1 = __webpack_require__("./src/services/timer.ts");

var ease_in_out_1 = __webpack_require__("./src/utils/curve/ease-in-out.ts");

var get_1 = __webpack_require__("./src/utils/get/index.ts");

var animator = function animator(from, to, speed, stepFn) {
  return new Promise(function (resolve) {
    return timer_1["default"](speed, stepFn, ease_in_out_1["default"]([from, to], speed), resolve);
  });
};

var ScrollTo = function ScrollTo(options) {
  if (!options) {
    return;
  }

  if (options.element) {
    var box = options.element.getBoundingClientRect();
    options.x = box.left;
    options.y = box.top;
  }

  options = Object.assign({}, {
    speed: 300,
    x: 0,
    y: 0,
    target: window
  }, options);
  var target = get_1["default"](options, "target");

  if (!target) {
    return;
  }
  /** TODO - handle x */


  var fromY = target.scrollY || target.scrollTop;
  var toY = get_1["default"](options, "y");
  var toX = get_1["default"](options, "x");
  var speed = get_1["default"](options, "speed");
  animator(fromY || 0, toY || 0, speed, function (y) {
    return target.scrollTo(toX, y);
  });
};

exports["default"] = ScrollTo;

/***/ }),

/***/ "./src/utils/set/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.Set = function (source, path, value) {
  if (!!path) {
    path = [source].concat(path.split("."));
  } else {
    path = [source];
  }

  path.reduce(function (accumulator, currentValue) {
    if (!accumulator) {
      accumulator = {};
    }

    if (!accumulator[currentValue]) {
      accumulator[currentValue] = {};
    }

    if (currentValue) {
      if (currentValue === path[path.length - 1]) {
        accumulator[currentValue] = value;
      }

      return accumulator[currentValue];
    } else {
      accumulator[currentValue] = null;
      return accumulator;
    }
  });
  return source;
};

exports["default"] = exports.Set;

/***/ }),

/***/ "./src/utils/throttle/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var throttle = function throttle(fn, wait) {
  if (wait === void 0) {
    wait = 33;
  }

  var timer = null;
  return function () {
    var _this = this;

    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (timer === null) {
      timer = setTimeout(function () {
        fn.apply(_this, args);
        timer = null;
      }, wait);
    }
  };
};

exports["default"] = throttle;

/***/ }),

/***/ "./src/utils/type/any-empty.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var empty_1 = __webpack_require__("./src/utils/type/empty.ts");

exports["default"] = function (val) {
  return empty_1["default"](val) || val === "false" || val === "undefined" || val === "null";
};

/***/ }),

/***/ "./src/utils/type/date.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (s) {
  var v = s;

  try {
    v = new Date(Date.parse(s));
  } catch (error) {
    return false;
  }

  return v !== "Invalid Date" && !isNaN(v) && v instanceof Date;
};

/***/ }),

/***/ "./src/utils/type/dom.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (s) {
  return s instanceof Element || s instanceof Node;
};

/***/ }),

/***/ "./src/utils/type/empty.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var get_1 = __webpack_require__("./src/utils/type/get.ts");

exports["default"] = function (val) {
  var type = get_1["default"](val);
  return val === "" || type === "undefined" || type === undefined || type === null || type === "array" && val.length === 0 || type === "object" && Object.keys(val).length === 0;
};

/***/ }),

/***/ "./src/utils/type/get.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var dom_1 = __webpack_require__("./src/utils/type/dom.ts");

var date_1 = __webpack_require__("./src/utils/type/date.ts");

var object_1 = __webpack_require__("./src/utils/type/object.ts");

var primitives_1 = __webpack_require__("./src/utils/type/primitives.ts");

exports["default"] = function (thing) {
  return thing === null ? null : primitives_1["default"](thing) ? _typeof(thing) : dom_1["default"](thing) ? "dom" : Array.isArray(thing) ? "array" : date_1["default"](thing) ? "date" : object_1["default"](thing) ? "object" : _typeof(thing);
};

/***/ }),

/***/ "./src/utils/type/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var any_empty_1 = __webpack_require__("./src/utils/type/any-empty.ts");

exports.isAnyEmpty = any_empty_1["default"];

var date_1 = __webpack_require__("./src/utils/type/date.ts");

exports.isDate = date_1["default"];

var dom_1 = __webpack_require__("./src/utils/type/dom.ts");

exports.isDom = dom_1["default"];

var empty_1 = __webpack_require__("./src/utils/type/empty.ts");

exports.isEmpty = empty_1["default"];

var get_1 = __webpack_require__("./src/utils/type/get.ts");

exports.Type = get_1["default"];

var object_1 = __webpack_require__("./src/utils/type/object.ts");

exports.isObject = object_1["default"];

var primitives_1 = __webpack_require__("./src/utils/type/primitives.ts");

exports.isPrimitive = primitives_1["default"];

/***/ }),

/***/ "./src/utils/type/object.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (s) {
  return _typeof(s).indexOf("object") > -1;
};

/***/ }),

/***/ "./src/utils/type/primitives.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var primitives = ["string", "number", "null", "undefined", "function"];

var isPrimitive = function isPrimitive(s) {
  return primitives.indexOf(_typeof(s)) > -1;
};

exports["default"] = isPrimitive;

/***/ }),

/***/ "./src/utils/validate/bool.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ValidateBool =
/*#__PURE__*/
function ValidateBool(
/*#__PURE__*/
val) {
  var original = val;
  var reasons = [];
  var result;

  if (val === true || val === "on" || val === "true") {
    result = true;
  }

  if (val === false || val === "off" || val === "false") {
    result = false;
  }

  if (result === undefined) {
    result = false;
    reasons.push("not valid");
  }

  return {
    original: original,
    valid: reasons.length === 0,
    sanitized: !!result,
    reason: reasons
  };
};

exports["default"] = ValidateBool;

/***/ }),

/***/ "./src/utils/validate/date.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ValidateDate =
/*#__PURE__*/
function ValidateDate(
/*#__PURE__*/
val) {
  var original = val;
  var reasons = [];
  var result = val;

  if (isNaN(Date.parse(!!val ? val.toString() : ""))) {
    result = null;
    reasons.push("invalid date");
  }

  return {
    original: original,
    valid: reasons.length === 0,
    sanitized: result,
    reason: reasons
  };
};

exports["default"] = ValidateDate;

/***/ }),

/***/ "./src/utils/validate/dateafter.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ValidateDateAfter =
/*#__PURE__*/
function ValidateDateAfter(after, val) {
  var original = val;
  var reasons = [];
  var parsedAfter = Date.parse(!!after ? after.toString() : "");
  var parsedVal = Date.parse(!!val ? val.toString() : "");
  var result = val;

  if (isNaN(parsedAfter)) {
    result = null;
    reasons.push("invalid after date");
  }

  if (isNaN(parsedVal)) {
    result = null;
    reasons.push("invalid date");
  }

  if (parsedAfter >= parsedVal) {
    result = null;
    reasons.push("date is out of range");
  }

  return {
    original: original,
    valid: reasons.length === 0,
    sanitized: result,
    reason: reasons
  };
};

exports["default"] = ValidateDateAfter;

/***/ }),

/***/ "./src/utils/validate/datebefore.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ValidateDateBefore =
/*#__PURE__*/
function ValidateDateBefore(before, val) {
  var original = val;
  var reasons = [];
  var parsedBefore = Date.parse(!!before ? before.toString() : "");
  var parsedVal = Date.parse(!!val ? val.toString() : "");
  var result = val;

  if (isNaN(parsedBefore)) {
    result = null;
    reasons.push("invalid before date");
  }

  if (isNaN(parsedVal)) {
    result = null;
    reasons.push("invalid date");
  }

  if (parsedBefore <= parsedVal) {
    result = null;
    reasons.push("date is out of range");
  }

  return {
    original: original,
    valid: reasons.length === 0,
    sanitized: result,
    reason: reasons
  };
};

exports["default"] = ValidateDateBefore;

/***/ }),

/***/ "./src/utils/validate/email.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var entities_1 = __webpack_require__("./src/utils/convert/entities.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var html_1 = __webpack_require__("./src/utils/validate/html.ts");

var ValidateEmail =
/*#__PURE__*/
function ValidateEmail(
/*#__PURE__*/
str) {
  var original = str;
  var converted = pipe_1["default"](to_string_1["default"], entities_1.FromEntities)(str);
  var val = converted.value;

  if (!val || !val.length || converted.type !== "string") {
    return {
      original: original,
      valid: false,
      sanitized: val,
      reason: ["no value"]
    };
  }

  var reasons = [];
  var split = val.split("@");

  if (!split[0] || !split[0].length) {
    reasons.push("missing username");
  }

  if (split.length < 2) {
    reasons.push("missing @ symbol");
    reasons.push("missing domain, i.e. \"mail.com\"");
  }

  if (split.length > 1) {
    var domain = split[1].split(".");

    if (!domain[0] || !domain[0].length || !domain[1] || !domain[1].length) {
      reasons.push("missing domain, i.e. \"mail.com\"");
    }
  }

  if (reasons.length) {
    return {
      original: original,
      valid: false,
      sanitized: val,
      reason: reasons
    };
  }

  return html_1["default"](val);
};

exports["default"] = ValidateEmail;

/***/ }),

/***/ "./src/utils/validate/html.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var entities_1 = __webpack_require__("./src/utils/convert/entities.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var html_1 = __webpack_require__("./src/utils/html/index.ts");

var ValidateHtml =
/*#__PURE__*/
function ValidateHtml(str, allowedHtmlTags, disallowedHtmlTags) {
  var original = str;
  var converted = pipe_1["default"](to_string_1["default"], entities_1.FromEntities)(str);
  var val = converted.value;

  var getElements = function getElements(Doc, selector) {
    return Array.from(Doc.body.querySelectorAll(selector));
  };

  if (!str || !str.length || converted.type !== "string") {
    return {
      original: original,
      valid: false,
      sanitized: val,
      reason: ["no value"]
    };
  }

  var doc;

  try {
    doc = new DOMParser().parseFromString(val, "text/html");
  } catch (error) {
    return {
      original: original,
      valid: true,
      sanitized: val,
      reason: ["no html present"]
    };
  }

  var totalElements = getElements(doc, "*");
  var tagsToDestroy = [];
  var elementsToDestroy = [];

  if (disallowedHtmlTags && disallowedHtmlTags.length) {
    tagsToDestroy = disallowedHtmlTags.slice(0);
  } else {
    tagsToDestroy = [].concat(html_1.svgTags, html_1.htmlTags);
  }

  if (allowedHtmlTags && allowedHtmlTags.length) {
    allowedHtmlTags.forEach(function (tag) {
      var index = tagsToDestroy.indexOf(tag);

      if (index > -1) {
        tagsToDestroy.splice(index, 1);
      }
    });
  }

  tagsToDestroy.forEach(function (tag) {
    elementsToDestroy = [].concat(getElements(doc, tag), elementsToDestroy);
  });
  elementsToDestroy.forEach(function (el) {
    if (el && el.parentNode) {
      var childrenLength = el.children.length;
      var index = 0;

      while (index < childrenLength) {
        try {
          el.parentNode.insertBefore(el.children[index], el);
        } catch (error) {}

        index = index + 1;
      }

      el.parentNode.removeChild(el);
    }
  });
  var leftOverElements = getElements(doc, "*");
  var diff = totalElements.length - leftOverElements.length;
  var valid = diff === 0;
  return {
    original: original,
    valid: valid,
    sanitized: valid ? val : !doc.body.innerHTML || !doc.body.innerHTML.length ? "" : doc.body.innerHTML,
    reason: valid ? [] : [diff + " element" + (diff > 1 ? "s were" : " was") + " removed"]
  };
};

exports["default"] = ValidateHtml;

/***/ }),

/***/ "./src/utils/validate/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var bool_1 = __webpack_require__("./src/utils/validate/bool.ts");

exports.ValidateBool = bool_1["default"];

var date_1 = __webpack_require__("./src/utils/validate/date.ts");

exports.ValidateDate = date_1["default"];

var dateafter_1 = __webpack_require__("./src/utils/validate/dateafter.ts");

exports.ValidateDateAfter = dateafter_1["default"];

var datebefore_1 = __webpack_require__("./src/utils/validate/datebefore.ts");

exports.ValidateDateBefore = datebefore_1["default"];

var email_1 = __webpack_require__("./src/utils/validate/email.ts");

exports.ValidateEmail = email_1["default"];

var html_1 = __webpack_require__("./src/utils/validate/html.ts");

exports.ValidateHtml = html_1["default"];

var number_1 = __webpack_require__("./src/utils/validate/number.ts");

exports.ValidateNumber = number_1["default"];

var one_of_1 = __webpack_require__("./src/utils/validate/one-of.ts");

exports.ValidateOneOf = one_of_1["default"];

var phone_1 = __webpack_require__("./src/utils/validate/phone.ts");

exports.ValidatePhone = phone_1["default"];

var phone_intl_1 = __webpack_require__("./src/utils/validate/phone-intl.ts");

exports.ValidateIntlPhone = phone_intl_1["default"];

var phone_us_1 = __webpack_require__("./src/utils/validate/phone-us.ts");

exports.ValidateUsPhone = phone_us_1["default"];

var text_1 = __webpack_require__("./src/utils/validate/text.ts");

exports.ValidateText = text_1["default"];

var url_1 = __webpack_require__("./src/utils/validate/url.ts");

exports.ValidateUrl = url_1["default"];

var year_1 = __webpack_require__("./src/utils/validate/year.ts");

exports.ValidateYear = year_1["default"];

var zip_us_1 = __webpack_require__("./src/utils/validate/zip-us.ts");

exports.ValidateUsZip = zip_us_1["default"];

/***/ }),

/***/ "./src/utils/validate/number.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var to_number_1 = __webpack_require__("./src/utils/convert/to_number.ts");

var ValidateNumber =
/*#__PURE__*/
function ValidateNumber(
/*#__PURE__*/
num) {
  var original = num;
  var reasons = [];
  var formatted = to_number_1["default"](num);

  if (!formatted.valid) {
    reasons.push("not a number");
  }

  return {
    original: original,
    valid: reasons.length === 0,
    sanitized: formatted.value,
    reason: reasons
  };
};

exports["default"] = ValidateNumber;

/***/ }),

/***/ "./src/utils/validate/one-of.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ValidateOneOf =
/*#__PURE__*/
function ValidateOneOf(options, val) {
  var original = val;
  var reasons = [];
  var result = val;

  if (options.indexOf(val) === -1) {
    result = undefined;
    reasons.push("invalid");
  }

  return {
    original: original,
    valid: reasons.length === 0,
    sanitized: result,
    reason: reasons
  };
};

exports["default"] = ValidateOneOf;

/***/ }),

/***/ "./src/utils/validate/phone-intl.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var entities_1 = __webpack_require__("./src/utils/convert/entities.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var ValidateIntlPhone =
/*#__PURE__*/
function ValidateIntlPhone(
/*#__PURE__*/
val) {
  var original = val;
  var reason = [];
  var converted = pipe_1["default"](to_string_1["default"], entities_1.FromEntities, if_invalid_1["default"](""))(val);
  var value = converted.value.replace(/[^\d]+/g, "");

  if (value.length < 11) {
    reason.push("needs at least 11 digits");
  }

  return {
    original: original,
    valid: reason.length === 0,
    sanitized: original,
    reason: reason
  };
};

exports["default"] = ValidateIntlPhone;

/***/ }),

/***/ "./src/utils/validate/phone-us.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var entities_1 = __webpack_require__("./src/utils/convert/entities.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var ValidateUsPhone =
/*#__PURE__*/
function ValidateUsPhone(
/*#__PURE__*/
val) {
  var original = val;
  var reason = [];
  var converted = pipe_1["default"](to_string_1["default"], entities_1.FromEntities, if_invalid_1["default"](""))(val);
  var value = converted.value.replace(/[^\d]+/g, "");

  if (value.length < 10) {
    reason.push("needs at least 10 digits");
  }

  return {
    original: original,
    valid: reason.length === 0,
    sanitized: original,
    reason: reason
  };
};

exports["default"] = ValidateUsPhone;

/***/ }),

/***/ "./src/utils/validate/phone.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ValidatePhone =
/*#__PURE__*/
function ValidatePhone(
/*#__PURE__*/
val) {
  var original = val;
  var reasons = [];
  var result = null;

  if (val && typeof val === "number") {
    val = "" + val;
  }

  if (val && typeof val === "string") {
    var numberREGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    result = val.replace(/\D/g, '');
    var length_1 = result.length;

    if (!numberREGEX.test(result)) {
      reasons.push("invalid characters");
    }

    if (length_1 < 10) {
      reasons.push("not enough digits");
    }
  }

  return {
    original: original,
    valid: reasons.length === 0,
    sanitized: result,
    reason: reasons
  };
};

exports["default"] = ValidatePhone;

/***/ }),

/***/ "./src/utils/validate/text.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var entities_1 = __webpack_require__("./src/utils/convert/entities.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var html_1 = __webpack_require__("./src/utils/validate/html.ts");

var ValidateText =
/*#__PURE__*/
function ValidateText(
/*#__PURE__*/
str) {
  var original = str;
  var reasons = [];
  var converted = pipe_1["default"](to_string_1["default"], entities_1.FromEntities)(str);
  var val = converted.value;

  if (!val || !val.length || converted.type !== "string") {
    return {
      original: original,
      valid: false,
      sanitized: val,
      reason: reasons.concat(["no value"])
    };
  }

  var htmlResults = html_1["default"](val);
  htmlResults.reason = htmlResults.reason.concat(reasons);
  return htmlResults;
};

exports["default"] = ValidateText;

/***/ }),

/***/ "./src/utils/validate/url.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var to_string_1 = __webpack_require__("./src/utils/convert/to_string.ts");

var entities_1 = __webpack_require__("./src/utils/convert/entities.ts");

var ValidateUrl =
/*#__PURE__*/
function ValidateUrl(
/*#__PURE__*/
str) {
  var original = str;
  var converted = pipe_1["default"](to_string_1["default"], entities_1.FromEntities)(str);
  var val = converted.value;

  if (!str || str.length === 0 || converted.type !== "string") {
    return {
      original: str,
      valid: false,
      sanitized: null,
      reason: ["no value"]
    };
  }

  var reasons = [];
  var link = document.createElement('a');
  link.href = val;

  if (!link.protocol) {
    reasons.push("Missing url protocol");
  }

  if (!link.host) {
    reasons.push("Missing url host");
  }

  return {
    original: original,
    valid: reasons.length === 0,
    sanitized: val,
    reason: reasons
  };
};

exports["default"] = ValidateUrl;

/***/ }),

/***/ "./src/utils/validate/year.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ValidateYear =
/*#__PURE__*/
function ValidateYear(
/*#__PURE__*/
val) {
  var original = val;
  var reasons = [];
  var parsedVal = new Date(val).getUTCFullYear();
  var valString = !!val ? val.toString() : "";
  var result = val;

  if (!!parsedVal && parsedVal.toString() !== valString) {
    result = undefined;
    reasons.push("invalid year");
  }

  return {
    original: original,
    valid: reasons.length === 0,
    sanitized: result,
    reason: reasons
  };
};

exports["default"] = ValidateYear;

/***/ }),

/***/ "./src/utils/validate/zip-us.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var postal_1 = __webpack_require__("./src/utils/convert/postal.ts");

var ValidateUsZip =
/*#__PURE__*/
function ValidateUsZip(
/*#__PURE__*/
val) {
  var original = val;
  var reason = [];
  var result = postal_1.ToUsZip(val);

  if (!result.valid) {
    if (result.value.length < 5) {
      reason.push("minimum of 5 digits");
    }

    if (result.value.length > 5 && result.value.length < 10) {
      reason.push("needs to be 5 or 9 digits");
    }
  }

  return {
    original: original,
    valid: result.valid,
    sanitized: original,
    reason: reason
  };
};

exports["default"] = ValidateUsZip;

/***/ }),

/***/ "./src/utils/webcomponent/append-style.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var set_style_rules_1 = __webpack_require__("./src/utils/html/set-style-rules.ts");

var AppendStyle =
/*#__PURE__*/
function AppendStyle(rulesString, parent, name) {
  if (name === void 0) {
    name = "";
  }

  var style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.setAttribute("name", name);
  style.style.display = "none";
  parent.appendChild(style);
  set_style_rules_1["default"](style, rulesString);
};

exports["default"] = AppendStyle;

/***/ }),

/***/ "./src/utils/webcomponent/constructor.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var template_1 = __webpack_require__("./src/utils/webcomponent/template.ts");

var elements_1 = __webpack_require__("./src/utils/webcomponent/elements.ts");

var observe_1 = __webpack_require__("./src/utils/observe/index.ts");

var bool_1 = __webpack_require__("./src/utils/convert/bool.ts");

var id_1 = __webpack_require__("./src/utils/id/index.ts");

var if_invalid_1 = __webpack_require__("./src/utils/convert/if_invalid.ts");

var pipe_1 = __webpack_require__("./src/utils/pipe/index.ts");

var get_1 = __webpack_require__("./src/utils/get/index.ts");

var function_1 = __webpack_require__("./src/utils/convert/function.ts");

var append_style_1 = __webpack_require__("./src/utils/webcomponent/append-style.ts");

var componentStore_1 = __webpack_require__("./src/services/componentStore.ts");

var unsub = function unsub(el, elementProperty, eventKey) {
  return pipe_1["default"](function_1.ToFunction, if_invalid_1["default"](function () {}))(get_1["default"](el, elementProperty + "." + eventKey)).value();
};

var unsubscribeEvents = function unsubscribeEvents(el, elementProperty) {
  if (elementProperty === void 0) {
    elementProperty = "eventSubscriptions";
  }

  if (!el || !el[elementProperty]) {
    return;
  }

  Object.keys(el[elementProperty]).forEach(function (eventKey) {
    return unsub(el, elementProperty, eventKey);
  });
};

var unsubscribeEvent = function unsubscribeEvent(el, eventKey, elementProperty) {
  if (elementProperty === void 0) {
    elementProperty = "eventSubscriptions";
  }

  if (!el || !el[elementProperty]) {
    return;
  }

  unsub(el, elementProperty, eventKey);
};

var setProperty = function setProperty(host, key, formatter, getter, setter) {
  try {
    Object.defineProperty(host, key, {
      get: function get() {
        if (typeof getter === "function") {
          return getter(host);
        }

        return host.state[key].value;
      },
      set: function set(value) {
        if (!host.state[key]) {
          return;
        }

        if (typeof setter === "function") {
          return setter(host)(value);
        }

        var formattedValue = formatter(value, host);
        var previous = host.state[key].value;

        if (typeof previous === "function" && typeof formattedValue === "function" && formattedValue.toString() !== previous.toString()) {
          return host.state[key].next(formattedValue);
        }

        if (host.state[key].value !== formattedValue) {
          host.state[key].next(formattedValue);
        }
      }
    });
  } catch (error) {}
};

var setStateProperty = function setStateProperty(host, key, formatter, onChange, getter, setter) {
  if (typeof formatter !== "function") {
    return;
  }

  host.state[key] = observe_1["default"](formatter(host[key], host));
  setProperty(host, key, formatter, getter, setter);

  if (typeof onChange !== "function") {
    return;
  }

  host.state[key].subscribe(function (val) {
    return onChange(val, host);
  });
};

var Constructor = function Constructor(options) {
  var componentName = options.componentName;
  var observedAttributes = options.observedAttributes || [];
  var template = options.template || "<slot></slot>";
  var style = options.style || "";
  var properties = options.properties || {};
  var elements = options.elements || {};
  var methods = options.methods;
  var computed = options.computed;
  var getters = options.getters || {};
  var setters = options.setters || {};
  var onConnected = options.onConnected;
  var onDisconnected = options.onDisconnected;
  var onReady = options.onReady;

  if (!componentName) {
    return;
  }

  var ConnectedFn = function ConnectedFn(element) {
    if (options.appendStylesToParent) {
      append_style_1["default"](style, element.parentElement, componentName);
    }

    element.wcID = id_1["default"]();
    element.unsubscribeEvent = unsubscribeEvent;
    element.unsubscribeEvents = unsubscribeEvents;

    if (computed) {
      Object.keys(computed).forEach(function (key) {
        try {
          Object.defineProperty(element, key, computed[key](element));
        } catch (error) {}
      });
    }

    if (methods) {
      Object.keys(methods).forEach(function (key) {
        return element[key] = methods[key](element);
      });
    }

    if (elements) {
      var ElementData = elements_1["default"](element, elements);
      element.elements = ElementData.state;
      element.disconnectElements = ElementData.disconnect;
    }

    if (properties && !properties.ready) {
      setStateProperty(element, "ready", function (val) {
        return pipe_1["default"](bool_1["default"], if_invalid_1["default"](false))(val).value;
      }, function () {}, getters.ready, setters.ready);
    }

    if (properties) {
      Object.keys(properties).forEach(function (key) {
        return setStateProperty(element, key, properties[key].format, properties[key].onChange, getters[key], setters[key]);
      });
    }

    if (onConnected) {
      onConnected(element);
    }

    if (element.state["ready"]) {
      element.state["ready"].subscribe(function () {
        return element.dispatchEvent(new CustomEvent("ready", {
          detail: element
        }));
      });
    }

    element["ready"] = true;

    if (onReady) {
      onReady(element);
    }

    element.dispatchEvent(new CustomEvent("ready", {
      detail: element
    }));
  };

  var componentClass =
  /** @class */
  function (_super) {
    __extends(componentClass, _super);

    function componentClass() {
      var _this = _super.call(this) || this;

      _this.state = {};
      _this.elements = {};

      _this.disconnectElements = function () {};

      template_1["default"](componentName, _this, template, style, false, options.appendStylesToHead);
      return _this;
    }

    Object.defineProperty(componentClass, "observedAttributes", {
      get: function get() {
        return observedAttributes;
      },
      enumerable: true,
      configurable: true
    });

    componentClass.prototype.attributeChangedCallback = function (attrName, oldValue, newValue) {
      if (newValue !== oldValue) {
        this[attrName] = newValue;
      }
    };

    componentClass.prototype.connectedCallback = function () {
      componentStore_1["default"].addComponent(this);
      ConnectedFn(this);
    };

    componentClass.prototype.disconnectedCallback = function () {
      var _this = this;

      componentStore_1["default"].removeComponent(this);

      if (this.state) {
        Object.keys(this.state).forEach(function (key) {
          _this.state[key].complete();
        });
      }

      this.disconnectElements();

      if (onDisconnected) {
        onDisconnected(this);
      }
    };

    return componentClass;
  }(HTMLElement);

  function newComponentObject() {
    return function (element) {
      element.observedAttributes = observedAttributes.slice();
      element.state = {};
      element.elements = {};

      element.disconnectElements = function () {};

      element.attributeChangedCallback = function () {};

      element.disconnectedCallback = function () {};

      template_1["default"](componentName, element, template, style, true, options.appendStylesToHead);
      ConnectedFn(element);
      return element;
    };
  }

  return {
    object: newComponentObject(),
    component: componentClass
  };
};

exports["default"] = Constructor;

/***/ }),

/***/ "./src/utils/webcomponent/css-rules.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var CSSRulesFromSelector =
/*#__PURE__*/
function CSSRulesFromSelector(
/*#__PURE__*/
selector) {
  var sheets = Array.from(document.body.ownerDocument.styleSheets);
  var rules = [];
  sheets.forEach(function (sheet) {
    return Array.from(sheet.rules).forEach(function (rule) {
      return rule.cssText.split("{")[0].trim().indexOf(selector) > -1 ? rules.push(rule.cssText) : undefined;
    });
  });
  return rules;
};

exports["default"] = CSSRulesFromSelector;

/***/ }),

/***/ "./src/utils/webcomponent/define.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var polyfills_1 = __webpack_require__("./src/utils/polyfills/index.ts");

var Define = function Define(componentName, componentClass) {
  var wc = window.WebComponents;
  var ce = window.customElements;

  var defineComponent = function defineComponent() {
    if (!ce) {
      polyfills_1.ObjectAssignPolyfill();
      polyfills_1.MutationObserverPolyfill(window);
      return polyfills_1.WebComponentPolyFill(window, componentName, componentClass.object);
    }

    if (!ce.get(componentName)) {
      ce.define(componentName, componentClass.component);
    }
  };

  if (wc && wc.ready) {
    defineComponent();
  } else {
    window.addEventListener('WebComponentsReady', function () {
      defineComponent();
    });
  }
};

exports["default"] = Define;

/***/ }),

/***/ "./src/utils/webcomponent/elements.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var observe_1 = __webpack_require__("./src/utils/observe/index.ts");

var removeOld = function removeOld(el) {
  if (!el || !el.parentNode) {
    return;
  }

  el.parentNode.removeChild(el);
};

var Elements =
/*#__PURE__*/
function Elements(host, elements) {
  var elStates = {};
  var state = {};

  var getEl = function getEl(key) {
    var els = host.shadowRoot.querySelectorAll(elements[key].selector);

    if (els.length > 1) {
      return Array.from(els);
    }

    return els[0];
  };

  Object.keys(elements).sort().forEach(function (key) {
    elStates[key] = observe_1["default"](getEl(key));
    Object.defineProperty(state, key, {
      get: function get() {
        return elStates[key].value;
      },
      set: function set(value) {
        if (value !== elStates[key].value) {
          elStates[key].next(value);
        }
      }
    });
    elStates[key].subscribe(function (newElement) {
      host.unsubscribeEvents(elStates[key].previous);
      removeOld(elStates[key].previous);

      if (typeof elements[key].onChange === "function") {
        elements[key].onChange(newElement, host);
      }
    });
  });
  return {
    state: state,
    disconnect: function disconnect() {
      return Object.keys(elStates).forEach(function (key) {
        elStates[key].complete();
      });
    }
  };
};

exports["default"] = Elements;

/***/ }),

/***/ "./src/utils/webcomponent/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var constructor_1 = __webpack_require__("./src/utils/webcomponent/constructor.ts");

exports.Constructor = constructor_1["default"];

var define_1 = __webpack_require__("./src/utils/webcomponent/define.ts");

exports.Define = define_1["default"];

var css_rules_1 = __webpack_require__("./src/utils/webcomponent/css-rules.ts");

exports.CSSRulesFromSelector = css_rules_1["default"];

var append_style_1 = __webpack_require__("./src/utils/webcomponent/append-style.ts");

exports.AppendStyle = append_style_1["default"];

var template_1 = __webpack_require__("./src/utils/webcomponent/template.ts");

exports.Template = template_1["default"];

var elements_1 = __webpack_require__("./src/utils/webcomponent/elements.ts");

exports.Elements = elements_1["default"];

var render_markup_1 = __webpack_require__("./src/utils/webcomponent/render-markup.ts");

exports.RenderMarkup = render_markup_1["default"];

/***/ }),

/***/ "./src/utils/webcomponent/render-markup.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var html_1 = __webpack_require__("./src/utils/validate/html.ts");

var getRegex = function getRegex(r) {
  return new RegExp(r, 'igm');
};

var getBegining = function getBegining(m, t) {
  return m.index !== 0 ? t.slice(0, m.index) : "";
};

var getEnd = function getEnd(m, t) {
  return t.slice(m.index + m[0].length);
};

var RenderMarkup = function RenderMarkup(templateStr, values, regex) {
  if (regex === void 0) {
    regex = /\$(.*?)\$/;
  }

  var template = document.createElement("template");
  var match;

  while ((match = getRegex(regex).exec(templateStr)) !== null) {
    templateStr = "" + getBegining(match, templateStr) + values[match[1]] + getEnd(match, templateStr);
  }

  template.innerHTML = html_1["default"](templateStr, [], ["script"]).sanitized;
  return document.importNode(template.content, true);
};

exports["default"] = RenderMarkup;

/***/ }),

/***/ "./src/utils/webcomponent/template.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var append_style_1 = __webpack_require__("./src/utils/webcomponent/append-style.ts");

var Template =
/*#__PURE__*/
function Template(tagname, element, templateString, styleString, notWebComponent, appendStylesToHead) {
  if (notWebComponent === void 0) {
    notWebComponent = false;
  }

  if (appendStylesToHead === void 0) {
    appendStylesToHead = false;
  }

  if (notWebComponent) {
    element.shadowRoot = element;
    return element.innerHTML = templateString + "<style type=\"text/css\">" + styleString + "</style>";
  }

  var Template = document.createElement("template");
  Template.innerHTML = templateString;
  append_style_1["default"](styleString, Template.content);
  var clone = document.importNode(Template.content, true);
  element.attachShadow({
    mode: 'open'
  }).appendChild(clone);

  if ((!('registerElement' in document) || appendStylesToHead) && !document.head.querySelector("style[name=\"" + tagname + "\"]")) {
    append_style_1["default"](styleString, document.head, tagname);
  }
};

exports["default"] = Template;

/***/ })

})