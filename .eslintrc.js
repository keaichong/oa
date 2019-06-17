module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  
  //0或'off'：关闭规则。
  //1或'warn'：打开规则，并且作为一个警告（并不会导致检查不通过）。
  //2或'error'：打开规则，并且作为一个错误 (退出码为1，检查不通过)。
  rules: {
    // 强制 getter 和 setter 在对象中成对出现
    'accessor-pairs': 2,
    // 强制箭头函数的箭头前后使用一致的空格
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    // 强制在代码块中开括号前和闭括号后有空格
    'block-spacing': [2, 'always'],
    // 强制在代码块中使用一致的大括号风格
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    'comma-dangle': [2, 'never'],
    // 强制在逗号前后使用一致的空格(逗号前不用，逗号后使用)
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    // 要求使用 === 和 !==(不对null使用此规则)
    'eqeqeq': ["error", "always", {"null": "ignore"}],
    // 禁止使用console
    'no-console': 2,
    // 禁止修改 const 声明的变量
    'no-const-assign': 2,
    // 要求使用 let 或 const 而不是 var
    'no-var': 2,
    // 禁止将变量初始化为 undefined
    'no-undef-init': 2,
    // 禁止出现未使用的变量
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    // 强制分号出现前后空格(分号前不写，分号后写)
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    // 要求操作符周围有空格
    'space-infix-ops': 2,
    // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-const': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
}
