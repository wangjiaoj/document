
[git使用指南](http://www.cnblogs.com/ifishing/archive/2010/12/08/1900594.html) 



> git config --global user.name "John Doe"
> git config --global user.email johndoe@example.com

```javascript
ls -al ~/.ssh  //查看ssh
ssh-keygen -t ed25519 -C  "your_email@example.com"    //生成新的ssh
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa   yes //添加ssh
ssh -T git@github.com  //检查SSH key是否成功设置
````

> git config --list//查看配置信息
> git clone git@github.com:billyanyteen/github-services.git//获取源码
>git init//仓库初始化
 
> git rm test.txt//删除文件
 
> git add <filename> 将文件提交到缓存区，应该是“计划改动”，然后实际提交改动：
> git commit -m "message" 这时候改动已经提交到head，但是还没有到达远程仓库 
　　　 
> git push

> git pull origin masterr//更新远程更新到本地
 

Git鼓励大量使用分支：

> git branch -a //查看分支

>git branch <name>  //创建分支

>git checkout <name> //切换分支

>git checkout -b <name> <origin/name>//创建+切换分支

>git merge <name> //合并某分支到当前分支

>git branch -d <name> //删除分支

>git push origin --delete <name> //删除远程分支
 

 git 还原到某一次提交 
 > git reflog
 > git reset --hard f449906
 > git push -f