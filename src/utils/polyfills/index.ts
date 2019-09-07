import Timer from '../../services/timer'

export const ObjectAssignPolyfill = () => {
    if (typeof Object.assign !== 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target) { // .length of function is 2
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
}

export const MutationObserverPolyfill = (w: any) => {
    (function () {
        if (w.MutationObserver !== null && w.MutationObserver !== undefined) {
            return
        }

        w.MutationObserver = function (cb) {
            this.callBack = cb
            return this
        };

        w.MutationObserver.prototype.observe = function (element) {
            const cb = this.callBack
            let oldHtml

            this.interval = Timer(0, () => {
                const html = element.innerHTML

                if (html !== oldHtml) {
                    oldHtml = html
                    return cb.apply(null)
                }
            })
        };

        w.MutationObserver.prototype.disconnect = function () {
            return this.interval.cancel()
        };

    }).call(this)
}

const setBUIltComponents = (w: any) => !!w.bUIltComponents ? undefined : w.bUIltComponents = {}
const setBUIltComponentsListener = (w: any) => {
    if (!w.bUIltComponents.listener) {
        w.bUIltComponents.listener = new w.MutationObserver(function () {
            Object.keys(w.bUIltComponents)
                .forEach(key => {
                    Array.from(document.body.querySelectorAll(key))
                        .forEach((el: any) => {
                            if (!el.ready) {
                                w.bUIltComponents[key](el)
                            }
                        })
                })
        });

        w.bUIltComponents.listener.observe(document.body)
    }
}

export const WebComponentPolyFill = (w, componentName, componentClass) => {
    setBUIltComponents(w)

    if (!!w.bUIltComponents[componentName]) { return }

    setBUIltComponentsListener(w)

    w.bUIltComponents[componentName] = componentClass
}