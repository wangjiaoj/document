//Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉。
//实现: 将类型的属性变成可选
type myExclude<T, U> = T extends U ? never : T;
type T0 = myExclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = myExclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = myExclude<string | number | (() => void), Function>; // string | n