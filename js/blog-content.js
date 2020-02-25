/*!
 * SanXian Github Blog
 * ( https://github.com/easyjack/randomMark )
 * Copyright 2020 SanXian
 */

 var github_user = "easyjack";
 var github_repository = "randomMark";
 var author = "三线";
 var github_issues_ignore = [];

 get_articles();

 function get_articles(limit, page){
    limit = limit ? limit : 5;
    page = page ? page : 1;
    jQuery.getJSON("https://api.github.com/repos/" + github_user +"/" + github_repository + "/issues?per_page=" + limit, function(data, status, xhr){
        //console.log("get_articles");
        //console.log(data);
    })
    .success(function(data){
        var html_source = "";
        jQuery.each(data, function(index, item){
            html_source += jQuery(build_post_preview(item.title, "comments: " + item.comments, item.body, item.html_url, item.created_at)).prop("outerHTML");
        });
        jQuery(".col-lg-8.col-lg-offset-1.col-md-8.col-md-offset-1.col-sm-12.col-xs-12.post-container").html(html_source);
    })
    .error(function(){
        //TODO
        alert("error");
    });
 }

 function build_post_preview(title, subtitle, content_preview, url, time){
     var html_div_element = jQuery("<div></div>").addClass("post-preview");

     var post_title_ele = jQuery("<h2></h2>").addClass("post-title").text(title);
     var post_subtitle_ele = jQuery("<h3></h3>").addClass("post-subtitle").text(subtitle);
     var post_content_preview_ele = jQuery("<div></div>").addClass("post-content-preview").text(content_preview.trim().replace(/\n|\r/g, "").substr(0,200) + "...");
     console.log(post_content_preview_ele[0]);
     var post_url_ele = jQuery("<a></a>").attr("href", url).attr("target", "_blank");
     jQuery(post_url_ele).append(post_title_ele).append(post_subtitle_ele).append(post_content_preview_ele);

     var post_meta_ele = jQuery("<p></p>").addClass("post-meta").css("margin","10px 0").text("Posted by " + author + " on " + time);

     //todo tag element

     jQuery(html_div_element).append(post_url_ele).append(post_meta_ele).append("<hr>");
     return html_div_element;
 }

 function get_tags(){

 }