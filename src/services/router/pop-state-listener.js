function popStateListener(methods) {
    window.addEventListener('popstate', function popstateHandler() {
        methods.route(''.concat(location.pathname, location.search), true)
    }, false)
}

export default popStateListener