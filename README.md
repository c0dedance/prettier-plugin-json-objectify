## 📖 Introduction

remove quote on Json object keys

~~~js
const o = {
  'name': 'prettier',
  'pkg-name': 'prettier-plugin-json-objectify'
}
const o = {
- 'name': 'prettier',
+ name: 'prettier',
  'pkg-name': 'prettier-plugin-json-objectify'
}
~~~

## 📦 Installation

```bash
# You may need to pre install prettier
pnpm i prettier -D

# pnpm 
pnpm i prettier-plugin-json-objectify -D
```

## 🦄 Usage

~~~json
/* package.json */
"scripts": {
    "format": "prettier --write ./src/**/*"
},
~~~

~~~bash
# run
pnpm format
~~~

## 📄 License

[MIT](./LICENSE) License © 2022 [c0dedance](https://github.com/c0dedance/)