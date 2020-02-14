export function LoadOnReady(Class) {
    if (window.builtready) {
        window.BuiltCreateComponent(Class)
    } else {
        window.document.addEventListener('builtready', function () {
            window.BuiltCreateComponent(Class)
        })
    }
}