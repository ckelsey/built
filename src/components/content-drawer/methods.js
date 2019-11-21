export const toggle = (host, open) => {
    if (!host.ready) { return }

    const root = host.elements.root

    if (root) {
        root.classList[open ? `add` : `remove`](`open`)
    }

    const header = host.elements.header
    const scaler = host.elements.scaler
    const inner = host.elements.contentInner
    const bounce = host.elements.bounce
    const underline = host.elements.underline
    const ripple = host.elements.ripple
    const fader = host.elements.fader

    scaler.scaled = !open

    if (!!host.bounce && host.bounce !== `false`) {
        let target

        if (host.bounce === `header`) { target = header }
        if (host.bounce === `content`) { target = inner }
        if (host.bounce === `true` || host.bounce === `all`) { target = root }

        bounce.targets = [target]
        bounce.amount = host.bounceamount || -4
        bounce.speed = host.bouncespeed

        if (typeof bounce.trigger === `function`) {
            bounce.trigger()
        }

    } else if (bounce.targets && bounce.targets.length) {
        bounce.targets = []
    }

    if (fader) {
        if (!host.fade && fader.targets.length) {
            fader.targets = []
        }

        if (host.fade && !fader.targets.length && inner) {
            fader.targets = [inner]
        }

        if (host.fade && fader.opacity !== host.fadeamount) {
            fader.opacity = host.fadeamount
        }

        if (host.fade && fader.speed !== host.fadespeed) {
            fader.speed = host.fadespeed
        }
    }

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

        if (host.underline && underline.color !== host.accentcolor && ripple.color !== host.underlinecolor) {
            underline.color = host.underlinecolor || host.accentcolor
        }

        if (!!host.underline && underline.direction !== host.underline) {
            underline.direction = host.underline
        }
    }

    if (ripple) {
        if (!host.ripple && ripple.targets.length) {
            ripple.targets = []
        }

        if (host.ripple && !ripple.targets.length && header) {
            ripple.targets = [header]
        }

        if (host.ripple && ripple.opacity !== host.rippleamount) {
            ripple.opacity = host.rippleamount
        }

        if (host.ripple && ripple.speed !== host.ripplespeed) {
            ripple.speed = host.ripplespeed
        }

        if (host.ripple && ripple.color !== host.accentcolor && ripple.color !== host.ripplecolor) {
            ripple.color = host.ripplecolor || host.accentcolor
        }

        if (!!host.ripple && ripple.direction !== host.ripple) {
            ripple.direction = host.ripple
        }
    }

    let others = []

    if (host.drawergroup) {
        others = Array.from(document.querySelectorAll(`content-drawer[drawergroup="${host.drawergroup}"]`))
    }

    if (open) {

        if (host.canUnderline) {
            underline.open()
        }

        if (host.canFade) {
            fader.open()
        }

        if (host.canRipple) {
            ripple.trigger()
        }

        others.forEach(other => {
            if (other !== host) {
                other.open = false
            }
        })

    } else {

        if (host.canUnderline) {
            underline.close()
        }

        if (host.canFade) {
            fader.close()
        }
    }
}