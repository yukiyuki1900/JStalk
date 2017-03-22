var CookieUtil = {

    /**
     * @function get
     * @description 读取cookie值
     * @param {String} name  cookie名    
     *
     */
    get: function(name) {
        var cookieName = encodeURIComponent(name) + "=";
        var cookieStart = document.cookie.indexOf(cookieName);
        var cookieValue;

        if(cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if(cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }

            cookieValue = encodeURIComponent(document.cookie.substring(cookieStart+cookieName.length, cookieEnd));
        }     

        return cookieValue;   
    },


    /**
     * @function set
     * @description 设置cookie值
     * @param {String} name  cookie名   
     * @param {String} value  cookie值    
     * @param {Date} expires  失效时间 
     * @param {String} path  路径，就是对于指定域的路径
     * @param {String} domain  cookie生效的域，如果为空，则为设定cookie的域名 
     * @param {Boolean} secure  安全标志，指定之后，cookie只有在使用SSL连接的时候才发送到服务器 
     *
     * @example
     *  CookieUtil.set("test", "lala", new Date("July 5, 2017"), "/test/", "www.test.com", true);
     *
     */
    set: function(name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        if(expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }

        if(!!path) {
            cookieText += "; path=" + path;
        }

        if(!!domain) {
            cookieText += "; domain=" + domain;
        }

        if(!!secure) {
            cookieText += "; secure";
        }

        //除非cooki值同名才会覆盖，否则为新增
        document.cookie = cookieText;
    },

    /**
     * @function unset
     * @description 删除cookie
     * @param {String} name  cookie名   
     * @param {String} path  路径，就是对于指定域的路径
     * @param {String} domain  cookie生效的域，如果为空，则为设定cookie的域名 
     * @param {Boolean} secure  安全标志，指定之后，cookie只有在使用SSL连接的时候才发送到服务器 
     *
     */
    unset: function(name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }
}