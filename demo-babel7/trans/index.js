const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

traverse.default(ast, {
    enter(path) {
        if (path.isIdentifier({ name: "n" })) {
            path.node.name = "x";
        }
    },
});

// 生成代码
const newCode = generator.default(ast, {}, code).code;
console.log(newCode)