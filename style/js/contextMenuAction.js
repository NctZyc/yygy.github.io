 window.oncontextmenu=function(){return false;} 
 	  var modecookie =  $.cookie("mode");
	 if(modecookie == "dark"){
		$("html").attr("mode","dark");
	 }else{
		$("html").removeAttr("mode");
	 }
 $(document).ready(function () {
            $.contextMenu({
                selector: "body" ,
                callback: function(key, options) {
					switch(options){
						case "back":				
							window.history.go(-1);
						break;
						case "refresh":				
							window.location.reload()
						break;
						case "forward":				
							window.history.go(1);
						break;
						case "home":				
							window.location.href="https://www.yygy.top";
						break;
						case "theme":				
							alert("主题还没设计好，哪位有艺术细胞的小伙伴给些建议呀~");
						break;
						case "rest":		
							if($(".main-content").css("visibility") == "visible"){
								$(".main-content").css("visibility", "hidden");
								$(".context-menu-icon-rest").addClass("context-menu-icon-rest-try");
								$(".context-menu-icon-rest span")[0].innerText="继续奋斗";
							}else{
								$(".main-content").css("visibility", "visible");
								$(".context-menu-icon-rest").removeClass("context-menu-icon-rest-try");
								$(".context-menu-icon-rest span")[0].innerText="休息一下";
							}
						break;
						case "mode":							
							var mode = $("html").attr("mode");
							 if(mode=="dark"){
								$("html").removeAttr("mode");
								$(".context-menu-icon-mode").removeClass("context-menu-icon-mode-light");
								$(".context-menu-icon-mode span")[0].innerText="暗黑模式";
								$.cookie("mode","light");
							 }else{
								$("html").attr("mode","dark");
								$(".context-menu-icon-mode").addClass("context-menu-icon-mode-light");
								$(".context-menu-icon-mode span")[0].innerText="明亮模式";
								$.cookie("mode","dark");
							 }
						break;
						case "issue":				
							window.location.href="/tutorial/2019/01/01/example-post.html";
						break;
						
					}
				},
                items: {
					"back": { name: "", icon: "back" },
					"refresh": { name: "", icon: "refresh" },
					"forward": { name: "", icon: "forward" },
					"home": { name: "欢迎回家", icon: "home" },
					"theme": {name: "切换主题", icon: "theme"},
					"mode": {name: "暗黑模式", icon: 'mode'},
					"rest": {name: "休息一下", icon: 'rest'},
                    "issue": {name: "常见问题", icon: 'issue'}
                }
            });
        })