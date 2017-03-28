<template>
	<div class="links">
		<div class="hd-links">
			<h2 class="hd-title">发布文章</h2>
		</div>
		<div class="md-links">
			<ul class="mdLinks_ul clearfix">
				<li class="mdLinks_li mdLinks_th boxSizing">链接名称</li>
				<li class="mdLinks_li mdLinks_th boxSizing">链接地址</li>
				<li class="mdLinks_li mdLinks_th boxSizing">链接操作</li>
			</ul>
			<ul class="mdLinks_ul clearfix" v-for="(link,index) in links" ref="mdLinks">
				<li class="mdLinks_li boxSizing"><input type="text" disabled="true" v-model="links[index].urlName"></li>
				<li class="mdLinks_li boxSizing"><input type="text" disabled="true" v-model="links[index].urlAddress" class="blue_color"></li>
				<li class="mdLinks_li boxSizing">
					<span class="md-edit md-btn" @click="edit(index,$event)">编辑</span>
					<span class="md-save md-btn" @click="editSave(index)">保存</span>
					<span class="md-delete md-btn" @click="deleteLink(index)">删除</span>
				</li>
			</ul>
		</div>
		<div class="ft-links">
			<h2 class="ft-links_save">保存链接</h2>
			<div class="ft-links_input">
				<input type="text" placeholder="请输入链接名称" v-model='name'>
				<input type="text" placeholder="请输入链接地址" v-model='address'>
				<button @click="save">保存链接</button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data (){
			return {
				links:[
					{
						urlName:'微博',
						urlAddress:'www.baidu.com',
						urlId:23
					},
					{
						urlName:'微博',
						urlAddress:'www.baidu.com',
						urlId:23
					},
					{
						urlName:'微博',
						urlAddress:'www.baidu.com',
						urlId:23
					},
				],
				name:'',
				address:''
			}
		},
		methods:{
			edit (index,e){
				this.getSiblings(e.target,'input',index)
			},
			deleteLink (index){
				var self=this
				this.$http.get('/myBlog/admin/url/'+this.links[index].urlId+'/delete').then(function(res){
					self.links.splice(index,1)
					console.log('删除链接成功')
				},function(res){
					console.log('删除链接失败')
				})
			},
			getSiblings (node,str,index){
				//注意各节点的关系，以及这儿用了的闭包
				var self=this;
				var parent=node.parentNode.parentNode;
				var input=parent.getElementsByTagName(str);
				for(var i=0,len=input.length;i<len;i++){
					input[i].disabled=false
					input[i].parentNode.classList.add('modify')
					input[0].focus()
				}
			},
			save (){
				var name=this.name.trim(),address=this.address.trim(),self=this;
				if(name&&address){
					var data={
						"urlName":name,
						"urlAddress":address
					}
					this.$http.post('/myBlog/admin/url/add',JSON.stringify(data)).then(function(res){
						self.links.push(res.data.url)
					},function(res){
						console.log('保存失败')
					})

				}
			},
			editSave(index){
				var self=this;
				var data=this.links[index];
				this.$http.post('/myBlog/admin/url/'+this.links[index].urlId+'/modify',JSON.stringify(data)).then(function(res){
						var el=self.$refs.mdLinks[index].getElementsByTagName('input');
						for(var i=0,len=el.length;i<len;i++){
							el[i].disabled=true;
							el[i].parentNode.classList.remove('modify')
						}
				},function(res){
					console.log('保存失败')
				})
			}
		},
		created(){
			var self=this;
			this.$store.dispatch('changeManageFlag','links')
			this.$http.get('/myBlog/admin/url/list').then(function(res){
				self.links=res.data.url;
				console.log('获取list成功')
			},function(res){
				console.log('获取list失败')
			})
		}
	
}
</script>
