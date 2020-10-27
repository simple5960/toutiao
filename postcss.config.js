module.exports = {
    plugins: {
      // vue-cli默认配置了autoprefixer
      //写道.browserslistrc中
      // 'autoprefixer': {
      //   browsers: ['Android >= 4.0', 'iOS >= 8']
      // },
      'postcss-pxtorem': {
        //转换的根元素基准值
        //正常情况下按照设计稿来    设计稿宽/10
        //vant设计稿是按照375来写的
        rootValue: 37.5,
        //需要转换的CSS属性，*就是代表所有都需要转换
        propList: ['*']
      }
    }
  }