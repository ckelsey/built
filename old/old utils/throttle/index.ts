const throttle = (fn, wait = 33) => {
    let timer = null
    return function (...args) {
        if (timer === null) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                timer = null;
            }, wait)
        }
    }
}

export default throttle