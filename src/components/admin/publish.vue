<!--admin/manage/publish页面，用于写文章-->
<template>
	<div class="pub">
		<div class="hd-pub">
			<h2 class="hd-title">发布文章</h2>
		</div>
		<div class="md-pub">
			<div class="md-div_input">
				<input type="text" class="md-input boxSizing" placeholder="文章名" v-model="articleTitle">
			</div>
			<div class="md-div_input">
				<div class="md-tags boxSizing" v-for="(tag,index) in filteredTagsArr" :style="{background:'#'+tag.bg}" >
					<span class="md-tag">{{tag['tag']}}</span><span class="md-tag_del" @click="deleteTag(index)">x</span>
				</div>
				<input type="text" class="md-input boxSizing" placeholder="请输入文章标签" v-model="tags" @blur="warn" name="tags" @focus="focusEvent" ref="tag_input">
				<select name="md-categoryName" class="md-categoryName md-input boxSizing" v-model="selected_categoryName">
					<option :value="item" v-for="item in categoryName">{{item}}</option>
				</select>
			</div>
			<div class="md-div_area">
				<!-- <textarea class="md-textarea" cols="30" rows="20" required="required" placeholder="文章内容" v-model="content"></textarea> -->
				<markdown-editor v-model="content" ref="markdownEditor" :configs="configs" class="md-textarea" :custom-theme="true"></markdown-editor>
			</div>
		</div>
		<div class="ft-pub">
			<button class="return-btn ft-pub_btn">返回列表</button>
			<button class="pub-btn ft-pub_btn" @click="publishArticle">发布文章</button>
			<button class="save-btn ft-pub_btn">存为草稿</button>
		</div>
	</div>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex'
import VueSimplemde from 'vue-simplemde'
import Vue from 'vue'
Vue.use(VueSimplemde)
import { markdownEditor } from 'vue-simplemde'
import 'simplemde-theme-base/dist/simplemde-theme-base.min.css'
	export default{
		components: {
		    markdownEditor
		},
		data(){
			return {
				articleTitle:'',
				tags:'',
				categoryName:[
						'篮球',
						'排球',
					],
				content:'',
				method:'',
				article:'',
				tags_arr:[],
				selected_categoryName:'',
				configs:{
					toolbar: ["bold", "italic", "heading", "code","|", "quote",'ordered-list','unordered-list','link','image','preview'],
					renderingConfig: {
			          codeSyntaxHighlighting: true, // 开启代码高亮
			          highlightingTheme: 'atom-one-light' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
			        },
			        insertTexts: {
	                    horizontalRule: ["", "\n\n-----\n\n"],
	                    image: ["![](http://", ")"],
	                    link: ["[", "](http://)"],
	                    table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
                	},
                	indentWithTabs: true,
                	tabSize: 4,
				}
			}
		},
		computed:{
			...mapGetters({
				modifyFlag:'getModifyFlag',
				modifyId:'getModifyId'
			}),
			filteredTagsArr(){
				var arr=[],self=this;
				/*setTimeout(function(){
					self.filteredTagWidth()
				},0)*/
				this.$nextTick(function(){
					self.filteredTagWidth()
				})
				if(this.tags_arr.length){
					this.tags_arr.forEach(function(m,n){
						var data={
							tag:m,
							bg:self.colorArray[n],
						}
						arr.push(data)
					})
					return arr
				}else{
					return
				}	
			},
			colorArray (){
				var self=this;
				return [1,2,3,4,5,6,7,8,9,10].map(function(m,n){
					return self.randomColor()
				})
			}
		},
		methods:{
			publishArticle:function(){
				var self=this;
				//console.log(this.$refs.markdownEditor.simplemde.markdown(this.content))
				if(this.tags_arr.length&&this.categoryName!=''&&this.content!=''&&this.articleTitle!=''){

					var data={
						"articleTitle":this.articleTitle,
						"tags":this.tags_arr,
						"categoryName":this.selected_categoryName,
						"content":this.$refs.markdownEditor.simplemde.markdown(this.content),
						"state":true,
						"method":this.method
					};
					if(this.article){
						//修改
						data.id=this.article.id;
						var stringifyData=JSON.stringify(data)
						this.$http.post('/myBlog/admin/article/publish.do',stringifyData).then(function(res){
							console.log('修改成功'+res.data)
							/*for(var key in self.$data){
								self.$data[key]=''//改变后需要初始化页面
							}*/
							this.$store.dispatch('changeModifyFlag',false)
							//跳转到另一个页面
							this.$router.replace('/admin/manage/home')
							
						},function(res){
							console.log('发布文章失败'+'res.status')
						})
						
					}else{
						var stringifyData=JSON.stringify(data)
						//console.log(stringifyData)
						this.$http.post('/myBlog/admin/article/publish.do',stringifyData).then(function(res){
							//发布
							/*for(var key in self.$data){
								if(key!='configs'&&key!='tags_arr'){
									self.$data[key]=''//改变后需要初始化页面
								}else if(key=='tags_arr'){
									self.$data['tags_arr']=[]
								}
								
							}*/
							console.log('发布成功'+res.data)
							this.$router.replace('/admin/manage/home')
						},function(res){
							console.log('发布文章失败'+res.status)
						})
					}
					
				}
							
			},
			warn(e){
				//用来指示输入为空
				var target=this.$refs.tag_input,self=this;
				if(this.indexOf(this.tags_arr,this.tags)){
					target.value="不能重复标签";
					target.classList.add('warning')
				}else if(this.tags_arr.length>=4){
					target.value="不能再添加了";
					target.classList.add('warning');
				}else if(this.trim(target.value)==''){
					target.classList.add('warning')
					target.value="不能为空 X"
				}else{
					target.classList.remove('warning')
					this.tags_arr.push(this.tags);
					this.tags=''
				}
			},
			//获取随机颜色，以备tags用
			randomColor() {
                var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
                if (rand.length === 6) {
                    return rand;
                } else {
                    return this.randomColor();
                }
            },
            deleteTag (index){
            	this.$refs.tag_input.classList.remove('warning')
            	this.tags_arr.splice(index,1);
            	this.tags='';
            	
            },
			focusEvent (e){
				e.target.value='';
				e.target.classList.remove('warning');
			},
			trim (str){
				return str.replace(/(^\s*)|(\s*$)/gi,'')
			},
			indexOf (arr,str){
				return arr.some(function(m,n){
					return m.tag==str
				})
			},
			filteredTagWidth(){
				var self=this;
				//setTimeout(function(){
					var sum=0,el=document.getElementsByClassName('md-tags'),el_inp=document.getElementsByName('tags')[0]
					for(var i=0,len=el.length;i<el.length;i++){
						el[i].style.left=sum+'px';
						sum+=el[i].offsetWidth+5;
					}
					if(len==0){
						el_inp.style.paddingLeft=0+'px'
					}else{
						el_inp.style.paddingLeft=sum+'px';
					}
				//},0)
            	
			}
            
		},
		created(){
			var self=this
			this.$store.dispatch('changeManageFlag','publish');			
			if(this.modifyFlag){
				//如果添加了修改文章参数就将method改为method
				var url='/myBlog/admin/article/'+this.modifyId+'/modify';
				this.$http.get(url).then(function(res){
					console.log('返回编辑的文章'+res.data)
					var article=res.data;
					self.method='modify';
					self.articleTitle=article.articleTitle;
					self.tags_arr=article.tags;//本来tags是数组
					self.categoryName=article.categoryName;
					self.content=article.content;
				},function(res){
					console.log('返回文章时错误')
				})
				
			}else{
				this.method='publish';
				this.$http.get('/myBlog/admin/article/publish').then(function(res){
					console.log('请求分类成功'+res.status)
					self.categoryName=res.data.categoryName
				},function(res){
					console.log('返回分类错误'+res.status)
				})
			}
			//this.warn(document.getElementsByName('tags')[0])
		},
	}
</script>
