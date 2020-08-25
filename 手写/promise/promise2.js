class MyPromise{
    constructor(executor){
        this.value = undefined;
        this.status = 'pending';
        this.resolveArr = [];
        this.rejectArr = [];
        let change = (status,value)=>{
            if(this.status !== 'pending') return;
            this.status = status;
            this.value =value;
            let fnArr = this.status === 'resolved' ? this.resolveArr : this.rejectArr;
            fnArr.forEach(element => {
                if(typeof element !== 'function') return;
                element(this.value);
            });
        };
        let resolve = result =>{
            if (this.resolveArr.length > 0) {
                change('resolved',result)
            }
            let delayTimer = setTimeout(() => {
                clearTimeout(delayTimer);
                change('resolved',result)
            }, 0);
        };
        let reject = reason =>{
            if (this.rejectArr.length > 0) {
                change('rejected',reason)
            }
            let delayTimer = setTimeout(() => {
                clearTimeout(delayTimer);
                change('rejected',reason)
            }, 0);
        };
        try {
            executor(resolve,reject)    
        } catch (error) {
            reject(error)
        } 
    }
    then(resolveFn,rejectFn){
        if (typeof resolveFn !== 'function') {
            resolveFn = result => result;
        };
        if (typeof rejectFn !== 'function') {
            rejectFn = reason=>{
                return new MyPromise((resolve,reject)=>{
                    reject(reason)
                })
            }
        };
        return new MyPromise((resolve,reject)=>{
            this.resolveArr.push(()=>{
                try {
                    let x = resolveFn(this.value);
                    x instanceof MyPromise ? x.then(resolve,reject) : resolve(x)    
                } catch (error) {
                    reject(error)
                }
            });
            this.rejectArr.push(()=>{

            });
        })
    }
    catch(rejectFn){
        return this.then(null,rejectFn)
    }
    static resolve(result){
        return new MyPromise(resolve=>{
            resolve(result)
        })
    }
    static reject(reason){
        return new MyPromise(reject=>{
               reject(reason)     
        })
    }
    static all(arr){
        let index = 0;
        let results = [];
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if(!(element instanceof MyPromise)) continue;
            element.then(result=>{
                index++;
                results[i] = result;
                if (index === results.length) {
                    resolve(results)
                }
            }).catch(reason=>{
                reject(reason)
            })
        }
    }

}