module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
        'describe': 'readonly',
        'it': 'readonly',
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'backtick'
        ],
        'semi': [
            'error',
            'never'
        ],
        "tree-shaking/no-side-effects-in-initialization": 0,
        "no-empty": 0
    },
    "plugins": [
        "tree-shaking"
    ]
}
