<template>
	<div class="list fade-in">
	    	<div class="list-item boxSizing" v-for="(item,index) in articleList">
	    		<div class="list-overflow">
		    		<router-link :to="'/home/article/'+item.article.articleId" tag="div">
		    			<div class="list-item_top" :style="{backgroundImage:'url(./static/img/'+(index+1)+'.jpg)'}" @mouseleave="item.article.shade=false" @mouseenter="changeNowarticle(index)">
		    				<div class="shade" v-if="item.article.shade">
		    					<div class="shade-desc fade-in" v-text="sliceContent(item.article.content)"></div>
		    				</div>
		    			</div>
		    		</router-link>
	    											<!-- ./static/img/1.jpg ../../../static/img/-->
					<div class="list-item_bottom" >
						<div class="list-item_ltrotate"></div>
						<div class="list-item_rtrotate"></div>
						<div class="list-item_label">
							<p>{{item.article.articleTitle}}</p>
							<div>
								<span class="list-item_categoryName">{{item.article.categoryName}}</span>
								<span :style="{backgroundPosition:'0px -'+40*index+'px',backgroundImage:'url(./static/img/bg-ico.png)'}" class="list-item_bg"></span>
							</div>
						</div>
					</div>
	    		</div>
	    	</div>
	    	<div class="clear"></div>
	    	<div class="ft-mg">
				<ul class="ft-pg_ul">
					<span class="ft-pg_li boxSizing" v-if="curPage!=1" @click="subCurPage">←</span>
					<li class="ft-pg_li boxSizing" v-for="n in filteredPage" @click="changeCurPage(n)" :class="{li_active:curPage==n}">{{n}}</li>
					<span class="ft-pg_li boxSizing" v-if="curPage!=pageSum" @click="addCurPage">→</span>
				</ul>
			</div>
	</div>
</template>

<script type="text/javascript">
import '../../../static/css/animate.css'
	export default {
		data(){
			return {
				articleList:[],
				pageSum:10,
				curPage:1,
			}
		},
		computed:{
			filteredPage:function(){
				if(this.pageSum<4){
					var arr=[];
					for(var i=0;i<this.pageSum;i++){
						arr.push(i+1)
					}
					return arr
				}
				if(this.curPage>2&&this.curPage<this.pageSum-1){
					return ['...',this.curPage-1,this.curPage,this.curPage+1,'...']
				}else if(this.curPage==1){
					return [this.curPage,this.curPage+1,this.curPage+2,'...']
					
				}else if(this.curPage==2){
					return [this.curPage-1,this.curPage,this.curPage+1,'...']
				}
				else if(this.curPage==this.pageSum-1){
					return ['...',this.curPage-1,this.curPage,this.curPage+1]
				}else if(this.curPage==this.pageSum){
					return ['...',this.curPage-2,this.curPage-1,this.curPage]
				}
			}
		},
		methods:{
			changeCurPage(n){
				if(typeof n == 'number'){
					this.curPage=n;
				}
				//每次点击page改变curpage
			},
			addCurPage (){
				if(this.curPage<this.pageSum){
					this.curPage++//将curPage自加
				}
			},
			subCurPage (){
				if(this.curPage>1){
					this.curPage--
				}
			},
			changeNowarticle (index){
				this.articleList[index].article.shade=true;
				var data=this.clone(this.articleList[index])
				this.$store.dispatch('changeNowarticle',data)
			},
			clone (obj){
				var buf;
				if(obj instanceof Array){
					buf=obj.slice();
					return buf
				}else if(obj instanceof Object){
					buf={};
					for(var i in obj){
						buf[i]=this.clone(obj[i])
					}
					return buf
				}else{
					return obj
				}
			},
			//将html转化为text
			sliceContent(str){
				var _str,a=document.createElement('div')
				a.innerHTML=str;
				_str=a.innerText;
				a=null;
				return _str
			},
			pageAPI(){
				var self=this,query=this.$route.query;
				this.$http.get('/myBlog/home/article?page='+query.page).then(function(res){
					res.data["data"].forEach(function(m,n){
						m.article.shade=false;
					})
					self.articleList=res.data["data"];
					self.pageSum=parseInt(res.data.inf)
					console.log('返回文章成功'+res.data)
				},function(res){
					console.log('返回文章错误'+res.status)
				})
			}
		},
		watch:{
			curPage(to,from){
				this.$router.push('/home/list?page='+to);
			},
			$route(to,from){
				this.curPage=parseInt(to.query.page)
				this.pageAPI();
			}
		},
		created (){
			var self=this,query=this.$route.query;
			this.$store.dispatch('changeHomeFlag','list')
			if(!query.hasOwnProperty('page')){
				this.$router.replace('/home/list?page=1')
			}else{
				this.pageAPI();
			}
		}	
	}
</script>
