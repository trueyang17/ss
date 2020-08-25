class MyPromise {
    constructor(executor){
        //每一个Promise实例都有一个状态和结果属性
        this.status = 'pending';
        this.value = undefined;
        //用来存储基于then指定的成功或者失败的方法
        this.resolveArr = [];
        this.rejectArr = [];
        //定义resolve和reject改变状态和结果属性
        let change = (status,value)=> { 
            if(this.status !== 'pending') return;//promise只执行一次
            this.status = status;
            this.value = value;
            //改变状态后，把基于then的方法执行
            let fnArr = status === 'resolved' ? this.resolveArr : this.rejectArr;
            fnArr.forEach(element => {//遍历数组并执行数组每一项的函数
                if (typeof element !== 'function') return;
                element(this.value)//把执行的结果传入到then方法中
            });
        };

        let resolve = result=> { 
            if(this.resolveArr.length > 0){//then方法中传入了函数才执行change方法
                change('resolved',result);//把执行的结果传入到change中
                return
            }
            let delayTimer = setTimeout(() => {//如果传入的是异步方法就等方法执行完了在执行then中的方法
                change('resolved',result);
                clearTimeout(delayTimer)
            }, 0);
        };
        let reject = reason=> { 
            if(this.rejectArr.length > 0){
                change('rejected',reason);
                return
            }
            let delayTimer = setTimeout(() => {
                change('rejected',reason);
                clearTimeout(delayTimer)
            }, 0);
        };       
        //new一次promise就执行一次executor
        try {
            executor(resolve,reject)//resolve和reject只是一个参数    
        } catch (error) {
            reject(error.message)
        }
        
    }

    then(resolveFn,rejectFn){//then方法是向数组中添加函数
        if (typeof resolveFn !== 'function') {
            resolveFn = result =>{
                return result
            }
        }
        //如果then链中传的不是函数那么在resolve上返回
        if (typeof rejectFn !== 'function') {
            rejectFn = reason =>{
                return MyPromise.reject(reason);
            }
        }

        return new MyPromise((resolve,reject) =>{
            this.resolveArr.push( result=>{
                try {
                    let x = resolveFn(result);
                    if (x instanceof MyPromise) {
                        x.then(resolve,reject);
                        return;
                    }
                    resolve(x);
                } catch (error) {
                    reject(error.message)
                }              
            });
            this.rejectArr.push( reason=>{
                try {
                    let x = rejectFn(reason);
                    if (x instanceof MyPromise) {
                        x.then(resolve,reject);
                        return;
                    }
                    resolve(x);
                } catch (error) {
                    reject(error.message)
                }
            });
        })
    }

    catch(rejectFn){
        return this.then(null,rejectFn)
    }

    //static是ES6静态方法，不能被实例调用但能被类自身调用而且可以被继承
    static resolve(result){
        return new MyPromise(resolve =>{
            resolve(result)
        })
    }

    static reject(reason){
        return new MyPromise(reason =>{
            reject(reason)
        })
    }

    static all(arr){()
        return new MyPromise((resolve,reject)=>{
            let index = 0;
            let results = [];
            for (let i = 0; i < arr.length; i++) {
                let item = arr[i];
                if(!(item instanceof Promise)) continue;
                item.then(result =>{
                    index++;
                    results[i] = result;
                    if (index === arr.length) {
                        resolve(results);
                    }
                }).catch(reason =>{
                    reject(reason);
                })   
            }
        })
    }

}