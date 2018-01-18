/**
 *  操作cookie
 */
const setCookie = (c_name,value,expiredays) =>{
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)
    //((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) //后端设置过期值
}

const getCookie = (c_name) =>{
    if (document.cookie.length>0){
        let c_start= document.cookie.indexOf(c_name + "=");
        if (c_start!=-1){
            c_start=c_start + c_name.length+1;
            let c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1){
                c_end=document.cookie.length;
            }

            return unescape(document.cookie.substring(c_start,c_end));
        }
     }
    return "";
}

export {
    setCookie,
    getCookie
}
//setCookie('name','zzyn',1); // cookie过期时间为1天。
//var uname= getCookie('name');//名称为name的cookie值：zzyn

