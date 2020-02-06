export function SetCaret(input, position, doc) {
    if (!input || !doc || doc.activeElement !== input) { return }

    if (input.createTextRange) {
        var range = input.createTextRange()
        range.move('character', position)
        range.select()
    } else if (input.selectionStart) {
        input.setSelectionRange(position, position)
    }

    return input
}