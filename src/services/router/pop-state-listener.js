const popStateListener = methods => {
    window.addEventListener(`popstate`, () => methods.route(`${location.pathname}${location.search}`, true), false)
}

export default popStateListener