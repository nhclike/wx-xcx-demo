//小程序向用户推送消息
//引入 koa模块

var Koa = require('koa');

var router = require('koa-router')();  /*引入是实例化路由** 推荐*/

//实例化
var app = new Koa();

router.get('/', async (ctx) => {
  ctx.body = "koa test";

})

// 配置前后端的推送消息
router.get('/checkPushMsg', handle_customer_sevice);

// 接收前台请求
async function handle_customer_sevice (ctx, next)  {
  console.log('接收到了消息');
  console.log(ctx);

}
app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000, () => {
  console.log('[' + new Date() + '] Serveris listening on port 3000')
})