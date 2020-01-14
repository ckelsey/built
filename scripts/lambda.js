const fs = require(`fs`)

const html = `<!DOCTYPE html><html dir="ltr" lang="en"><head> <meta charset="utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" /> <style>html {height: 100%;} body { font-family: sans-serif; font-size: 14px; color: #333; margin: 0px 0px 0px 0px; padding: 2rem; box-sizing: border-box; min-height: 100%; background: #ccc; } </style>
<script>{{webcomponents}}</script>
</head><body>
{{components}}
<script>{{builtjs}}</script>
</body></html>`
    .replace(`{{webcomponents}}`, Buffer.from(fs.readFileSync(`node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js`)).toString())
    .replace(`{{builtjs}}`, Buffer.from(fs.readFileSync(`dist/built.js`)).toString())
    .replace(`{{components}}`, `
        <div id="formWrap"></div>

        <script>
            console.log(10)

            var formWrap = document.getElementById('formWrap')
            
            var formthing = document.createElement('form')
            formthing.id = 'formthing'
            formthing.method = 'POST' 
            formthing.name = 'login'
            formthing.action = 'https://api.cklsylabs.com/built'

            var username = document.createElement('input-field')
            username.name = username.label = username.id = 'username'
            username.required = true

            var password = document.createElement('input-field')
            password.name = password.label = password.id = 'password'
            password.required = true
            password.type = 'password'

            var submit = document.createElement('button-element')
            submit.textContent = 'Submit'
            submit.type = 'submit'
            submit.id = 'button1'

            formWrap.appendChild(formthing)
            formthing.appendChild(username)
            formthing.appendChild(password)
            formthing.appendChild(submit)

            formthing.addEventListener('submit', function (e) {
                e.preventDefault()
                var formData = new FormData(formthing)
                var data = {}
                formData.forEach(function(value, key){ data[key] = value })
                var xhr = new XMLHttpRequest()
                xhr.addEventListener("load", function () { location.reload() });
                xhr.open(formthing.method, formthing.action);
                xhr.send(JSON.stringify(data))
                return false
            })

            const bounceAmount = -4
            const bounceSpeed = 300
            const bounce = document.createElement('effect-bounce-z')
            document.body.appendChild(bounce)
            
            bounce.targets = [{
                element:username,
                amount: bounceAmount,
                speed: bounceSpeed
            }, {
                element:password,
                amount: bounceAmount,
                speed: bounceSpeed
            },{
                element: submit,
                amount: bounceAmount,
                speed: bounceSpeed
            }]

            submit.addEventListener('click', function(){formthing.dispatchEvent(new Event('submit'))})

            const fade = document.createElement('effect-fade')
            document.body.appendChild(fade)
            fade.targets = [{
                element:username,
                opacity:[1,0]
            }]

        </script>
    `)

fs.writeFileSync(`lambda.html`, html)