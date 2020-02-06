import { ArrayFrom } from '../../utils/array-from.js'

export function toggle(host, open) {
    if (!host.ready) { return }

    const root = host.elements.root

    if (root) {
        root.classList[open ? 'add' : 'remove']('open')
    }

    const header = host.elements.header
    const scaler = host.elements.scaler
    const underline = host.elements.underline

    scaler.scaled = !open


    if (underline) {
        if (!host.underline && underline.targets.length) {
            underline.targets = []
        }

        if (host.underline && !underline.targets.length && header) {
            underline.targets = [header]
        }

        if (host.underline && underline.opacity !== host.underlineamount) {
            underline.opacity = host.underlineamount
        }

        if (host.underline && underline.speed !== host.underlinespeed) {
            underline.speed = host.underlinespeed
        }

        if (host.underline && underline.color !== host.accentcolor) {
            underline.color = host.underlinecolor || host.accentcolor
        }

        if (!!host.underline && underline.direction !== host.underline) {
            underline.direction = host.underline
        }
    }

    let others = []

    if (host.drawergroup) {
        others = ArrayFrom(
            document.querySelectorAll(
                'content-drawer[drawergroup="'.concat(host.drawergroup, '"]')
            )
        )
    }

    if (open) {

        underline.open()

        others.forEach(function (other) {
            if (other !== host) {
                other.open = false
            }
        })

    } else {

        underline.close()
    }
}