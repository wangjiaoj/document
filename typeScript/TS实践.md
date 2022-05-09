TS报错

1. vue + typescript：Property 'xxx' does not exist on type 'Vue'
> this.$parent.paymentType();
修改为
>(this as any).$parent.paymentType();
类似像是inject之类的注入函数也可能报错类似问题,也可以用该方案解决
 