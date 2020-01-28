const fs = require(`fs`)

const getScript = name => `${Buffer.from(fs.readFileSync(`lambda_scripts/${name}.html`)).toString()}`

const html = `<!DOCTYPE html><html dir="ltr" lang="en"><head><meta charset="utf-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" /> <style>html {height: 100%;} body { font-family: sans-serif; font-size: 14px; color: #333; margin: 0px 0px 0px 0px; padding: 2rem; box-sizing: border-box; min-height: 100%; background: #ccc; } </style>
<script>{{webcomponents}}</script>
<script>{{builtjs}}</script>
</head><body>
{{components}}
</body></html>`
    .replace(`{{webcomponents}}`, Buffer.from(fs.readFileSync(`node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js`)).toString())
    .replace(`{{components}}`, `
        
        <content-transition id="transition"><div id="formWrap" slot="current"></div></content-transition>
        ${getScript(`form`)}
        ${ getScript(`transition`)}
        ${getScript(`button-element`)}
        ${getScript(`collapse-menu`)}
        ${getScript(`grid-layout`)}
    `)
    .replace(`{{builtjs}}`, Buffer.from(fs.readFileSync(`dist/built.js`)).toString())

fs.writeFileSync(`lambda.html`, html)