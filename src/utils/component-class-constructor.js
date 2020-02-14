import { ForEach } from './for-each'

export function ComponentClassConstructor(hostElement) {
    /*
    const component_constructor_typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ?
        function _typeof(obj) { return typeof obj } :
        function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function')
        }
    }

    function _defineProperties(target, props) {
        ForEach(function (prop) {
            prop.enumerable = prop.enumerable || false
            prop.configurable = true

            if ('value' in prop) { prop.writable = true }

            Object.defineProperty(target, prop.key, prop)

        }, props)
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) { _defineProperties(Constructor.prototype, protoProps) }
        if (staticProps) { _defineProperties(Constructor, staticProps) }
        return Constructor
    }

    function _possibleConstructorReturn(self, call) {
        if (call && (component_constructor_typeof(call) === 'object' || typeof call === 'function')) { return call }
        return _assertThisInitialized(self)
    }

    function _assertThisInitialized(self) {
        if (self === void 0) { throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called') }
        return self
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function') }
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } })
        if (superClass) { _setPrototypeOf(subClass, superClass) }
    }

    function _wrapNativeSuper(Class) {
        var _cache = typeof Map === 'function' ? new Map() : undefined

        // eslint-disable-next-line no-func-assign
        _wrapNativeSuper = function _wrapNativeSuper(Class) {
            if (Class === null || !_isNativeFunction(Class)) {
                return Class
            }
            if (typeof Class !== 'function') {
                throw new TypeError('Super expression must either be null or a function')
            }
            if (typeof _cache !== 'undefined') {
                if (_cache.has(Class)) {
                    return _cache.get(Class)
                }

                _cache.set(Class, Wrapper)
            }

            function Wrapper() {
                return _construct(Class, arguments, _getPrototypeOf(this).constructor)
            }

            Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } })

            return _setPrototypeOf(Wrapper, Class)
        }

        return _wrapNativeSuper(Class)
    }

    function isNativeReflectConstruct() {
        if (typeof Reflect === 'undefined' || !Reflect.construct) {
            return false
        }
        if (Reflect.construct.sham) {
            return false
        }

        if (typeof Proxy === 'function') {
            return true
        }

        try {
            Date.prototype.toString.call(Reflect.construct(Date, [], function () { })); return true
        } catch (e) { return false }
    }

    var _construct = isNativeReflectConstruct() ?
        Reflect.construct :
        function _construct(Parent, args, Class) {
            var a = [null]
            a.push.apply(a, args)
            var Constructor = Function.bind.apply(Parent, a)
            var instance = new Constructor()

            if (Class) { _setPrototypeOf(instance, Class.prototype) }

            return instance
        }

    function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf('[native code]') !== -1
    }

    const _setPrototypeOf = Object.setPrototypeOf ?
        Object.setPrototypeOf :
        function _setPrototypeOf(o, p) {
            o.__proto__ = p
            return o
        }

    const _getPrototypeOf = Object.setPrototypeOf ?
        Object.getPrototypeOf :
        function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o)
        }


    // hostElement
    const Component = function (_HTMLElement) {
        _inherits(createHost, _HTMLElement)

        function createHost() {
            _classCallCheck(this, createHost)

            return _possibleConstructorReturn(this, _getPrototypeOf(createHost).call(this))
        }

        _createClass(createHost, [{
            key: 'connectedCallback',
            value: function connectedCallback() { }
        }])

        return createHost
    }(_wrapNativeSuper(HTMLElement))

    return Component
    */
}