const babelParsers = require("prettier/parser-babel").parsers;
const typescriptParsers = require("prettier/parser-typescript").parsers;

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

// 使用-分隔的key不取消引号
const keyReg = /-+/

function jsonObjectify(code, options) {
  const ast = parser.parse(code, {
    plugins: ["typescript", "jsx"],
    sourceType: "unambiguous"
  });
  traverse(ast, {
    ObjectProperty(path) {
      const { node } = path
      if (node.key.type !== 'StringLiteral') {
        return
      }
      // 取出node的键名
      const { key } = node
      const keyName = key.extra.rawValue

      if (keyReg.test(keyName)) {
        return
      }

      // 更新到patchNode上
      const patchNode = { ...node }

      patchNode.key.type = 'Identifier'
      patchNode.key.name = keyName
      patchNode.key.loc.identifierName = keyName


      // 移除原来node的属性
      delete patchNode.key.extra
      delete patchNode.key.value
      // 完成替换
      path.replaceWith(patchNode)

    }
  })

  return generate(ast, {
    retainLines: true,
  }).code
}

module.exports = {
  parsers: {
    babel: {
      ...babelParsers.babel,
      preprocess: jsonObjectify,
    },
    typescript: {
      ...typescriptParsers.typescript,
      preprocess: jsonObjectify,
    },
  },
};