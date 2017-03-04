
[git使用指南](http://www.cnblogs.com/ifishing/archive/2010/12/08/1900594.html "Title") 

$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com

ls -al ~/.ssh  //查看ssh
ssh-keygen -t rsa -C "2386467485@qqcom"  //生成新的ssh
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa    //添加ssh
ssh -T git@github.com  //检查SSH key是否成功设置

　git config --list//查看配置信息
　git clone git@github.com:billyanyteen/github-services.git//获取源码
　git init//仓库初始化
 
　git rm test.txt//删除文件
 
　git add <filename> 将文件提交到缓存区，应该是“计划改动”，然后实际提交改动：
　git commit -m "message" 这时候改动已经提交到head，但是还没有到达远程仓库 
　　　 
git push

git pull origin masterr//更新远程更新到本地


Git鼓励大量使用分支：

查看分支：git branch

创建分支：git branch <name>

切换分支：git checkout <name>

创建+切换分支：git checkout -b <name>

合并某分支到当前分支：git merge <name>

删除分支：git branch -d <name>