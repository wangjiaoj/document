module.exports = ({ types: t, template }) => {
    // api可以做一些版本兼容性判断，或者缓存相关的。
    // options就是我们配置插件时，传入的参数，这里插件内部就可以使用了
    return {
        visitor: {
            // 遍历声明表达式
            VariableDeclaration(path) {
                if (path.node.type === 'VariableDeclaration') {
                    // 替换
                    if (path.node.kind === 'var') {
                        path.node.kind = 'let';
                    }
                }
            }
        }
    }
}