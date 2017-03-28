<template>
	<div class="archives fade-in">
		<div class="item_archive" v-for="item in archives" v-if="archives.length">
			<p class="item_time"><span class="blue_color">#&nbsp;</span><span>{{item.createTime}}</span></p>
			<div class="item_container clearfix">
				<div class="item_block boxSizing" v-for="single in item.titles">
					<div class="item_block-div">
						<router-link :to="'/home/article/'+single.articleId" class="item_block-md boxSizing" tag='div'>
							<p>{{single.articleTitle}}</p>
							<p>发布于：{{single.createTime.split(' ')[0]}}</p>
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="ft-mg">
			<ul class="ft-pg_ul">
				<span class="ft-pg_li" v-if="curPage!=1" @click="subCurPage">←</span>
				<li class="ft-pg_li" v-for="n in filteredPage" @click="changeCurPage(n)" :class="{li_active:curPage==n}">{{n}}</li>
				<span class="ft-pg_li" v-if="curPage!=pageSum" @click="addCurPage">→</span>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
import '../../../static/css/animate.css'
	export default {
		data (){
			return {
				archives:[],
				pageSum:10,
				curPage:1,
			}
		},
		computed:{
			filteredPage(){
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
			pageAPI(){
				var self=this,query=this.$route.query;
				this.$http.get('/myBlog/archives/article?page='+query.page).then(function(res){
					var archive=res.data['archive'],len_first=parseInt(res.data['length1']),len_second=parseInt(res.data['length2']),tempA,tempB,data_1,data_2,dataArr_1,dataArr_2;
					if(len_first){
						tempA=archive[len_first-1]['createTime'].split(' ')[0];
						tempA=tempA.split('-').slice(0,2).join('-');
						dataArr_1=archive.slice(0,len_first);
						data_1={
							"createTime":tempA,
							"titles":dataArr_1
						}
					}
					if(len_second){
						tempB=archive[len_first]['createTime'].split(' ')[0];
						timeB=tempB.split('-').slice(0,2).join('-');
						dataArr_2=archive.slice(len_first);
						data_2={
							"createTime":tempB,
							"titles":dataArr_2
						}
					}
					self.archives=[]
					if(len_second){
						self.archives.push(data_2);//按最新的在前面
					}
					if(len_first){
						self.archives.push(data_1);
					}
					self.pageSum=parseInt(res.data['totalPage']);
				},function(res){
					console.log('fail')
				})
			},
			changeCurPage(n){
				if(typeof n == 'number'){
					this.curPage=n;
					//console.log(n)
				}
				//每次点击page改变curpage
			},
			addCurPage (){
				if(this.curPage<this.pageSum){
					this.curPage++//将curPage自加
					console.log(this.curPage)
				}
			},
			subCurPage (){
				if(this.curPage>1){
					this.curPage--
				}
			},
		},
		watch:{
			curPage(to,from){
				this.$router.push('/home/archives?page='+to)
			},
			$route(to,from){
				this.curPage=parseInt(to.query.page)
				this.pageAPI()
			}
		},
		created (){
			var query=this.$route.query,self=this;
			this.$store.dispatch('changeHomeFlag','archives');
			if(!query.hasOwnProperty('page')){
				this.$router.replace('/error');
			}else{
				this.pageAPI();
			}
		}
	}	
	
</script>