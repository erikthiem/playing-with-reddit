function GetTopCommentChain(comments, data) {

    var commentObject = {
        "author": data.author,
        "text": data.body
    }

    comments.push(commentObject);


    if (data.replies)
    {
        var childComments = data.replies.data.children;

        if (childComments.length > 0)
        {
            comments.concat(GetTopCommentChain(comments, childComments[0].data));
        }
    }

    return comments;
}


function getJsonURL(path) {
    var suffix = ".json";
    return path + suffix;
}

var redditApp = new Vue({

    el: "#redditApp",

    data: {
        path: "",
        lines: [],
        errorMessage: ""
    },
    methods: {
        loadCommentChain: function(path){
            var self = this;
            $.ajax({
                url: getJsonURL(path),
                dataType: "json",
                method: "GET",
                success: function(data) {
                    self.errorMessage = "";

                    self.lines = GetTopCommentChain(self.lines, data[1].data.children[0].data);

                },
                error: function(error) {
                    console.log(JSON.stringify(error));
                    self.errorMessage = "Please enter a valid link.";
                }
            });

        }
    }
});

