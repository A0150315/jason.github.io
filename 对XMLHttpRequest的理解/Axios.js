class Axios {
    get(url, data = {}) {
        return this.XMLHttpRequestObject('GET', url, data);
    }
    post(url, data = {}) {
        return this.XMLHttpRequestObject('POST', url, data);
    }
    XMLHttpRequestObject(method, url, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    console.log('请求成功')
                    resolve(this.response)
                } else if (this.readyState === 1) {
                    console.warn('请求中')
                } else if (this.readyState === 4) {
                    console.error('请求失败')
                    reject('请求失败')
                }
            }
            if (method === 'GET') {
                // 此处对url进行参数拼接
            }
            xhr.open(method, url, true);
            xhr.send(data);
            return xhr;
        })
    }
}

const axios = new Axios(); // 新建Axios实例
console.log(await axios.get('https://www.baidu.com'))
console.log('全部完成')