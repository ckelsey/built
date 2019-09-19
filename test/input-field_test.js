const assert = require('assert')

Feature(`InputField`)

Scenario(`test input-field component`, (I) => {
    I.amOnPage(`/`)
    I.seeElement({ css: `body > input-field` })
    I.executeScript(() => document.body.querySelector('input-field').shadowRoot.querySelector(`label`).textContent)
        .then(labelText => assert.equal(labelText, `Hi`))
})
