/**
 * Created by guminji on 2019/9/22.
 */
export default function(url,params){
    return new Promise(function(resolve,reject){
        fetch(url,params).then(
            function(res){
                //状态码需要是200
                if(res.status != 200){
                    reject(res);
                    return;
                }
                res.json().then(function(data){
                    //服务器定义的正确返回的code码为20000
                    if(data.code != 20000){
                        reject(data);
                        return;
                    }
                    resolve(data);
                });
            },function(res){
                reject(res);
            })


    })
}