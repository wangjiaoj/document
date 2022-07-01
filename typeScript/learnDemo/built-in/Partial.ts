interface UserInfo {  
    id: string;  
    name: string;
}
// error：Property 'id' is missing in type '{ name: string; }' but required in type 'UserInfo'
// const xiaoming: UserInfo = {   
//     name: 'xiaoming'
// }

//实现: 将类型的属性变成可选
type MyPartial<T> = {
   [p in keyof T]?:T[p]
} 

const xiaoming: MyPartial<UserInfo> = {   
    name: 'xiaoming'
}
