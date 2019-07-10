const iframe = document.querySelector('#iframe').contentWindow.document;
iframe.designMode = "on";
iframe.open();
iframe.writeln(
    `<style>
        ::-webkit-scrollbar {
            display: none;
        }
        *{
            margin:0;
            padding:0
        }
        body,html
            {font-size:4vw;width:100%;height:100%;box-sizing: border-box;color: #333;font-family:PingFangSC-Regular, sans-serif;}
        body
            {padding:4vw 3.33vw;line-height: 1.5;word-break:break-all;}
    </style>`
);
iframe.close();
iframe.body.innerHTML = `<p style="color:#b2b2b2;line-height:1;">其实我不是一个PlaceHolder~</p>`;

iframe.addEventListener("paste", function (e) {
    let text = null;
    text = (e.originalEvent || e).clipboardData.getData('text/plain');
    iframe.execCommand("insertText", false, text);
    e.preventDefault();
}, false);

const form = document.querySelector('#form');

form.addEventListener('change', function (e) {
    const staticContent = iframe.body.innerHTML; // 获取到富文本编辑器中的内容

    const imgQty = staticContent.match( // 通过img标签判断当前富文本编辑器中存在的图片数量
            /<img(.*?)>/
        ) ?
        staticContent.match(
            /<img(.*?)>/g
        ).length :
        0;

    const files = e.target.files; // 获取待上传图片

    this.prototype = {
        readAndDoSth: file => {
            // 确保 `file.name` 符合我们要求的扩展名
            if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
                alert("非法文件");
                return;
            }
            //判断图片大小
            const maxSize = 200 * 1024; //200K 这里可以自由发挥，可以根据文件大小决定是否压缩、读取图片后旋转等操作，我这里就不演示Canvas的相关操作了
            let reader = new FileReader();
            reader.readAsDataURL(file);
            const self = this;
            reader.onload = function () {
                // self.prototype.img2formdata(this.result, file.type, file.name); // 这里可以进行图片上传后再插入图片，逻辑与本地插入大概一致，这里我演示一下如何生成form表单
                self.prototype.insertImg(this.result) // 本地插入
            };
        },
        img2formdata: (basestr, type, name) => { // 把图片转成FormData
            let text = window.atob(basestr.split(",")[1]);
            let buffer = new ArrayBuffer(text.length);
            let ubuffer = new Uint8Array(buffer);

            for (let i = 0; i < text.length; i++) {
                ubuffer[i] = text.charCodeAt(i);
            }

            let Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
            let blob;

            if (Builder) {
                let builder = new Builder();
                builder.append(buffer);
                blob = builder.getBlob(type);
            } else {
                blob = new window.Blob([buffer], {
                    type: type
                });
            }
            let formdata = new FormData();
            formdata.append("img", blob, name);
            this.prototype.upload(formdata); // 上传Formdata
        },
        upload: formdata => {
            // 在这里可以把图片上传给服务端，换取服务端缓存地址，然后再插入具体路径的img标签，具体就不继续演示了。
        },
        insertImg: url => {
            const image = new Image();
            image.src = url;
            const outerDiv = document.createElement("div");
            outerDiv.appendChild(image);
            try {
                iframe.getSelection().getRangeAt(0);
                iframe.body.focus();
                iframe.execCommand("insertHTML", false, outerDiv.innerHTML);
            } catch (err) {
                iframe.body.innerHTML += outerDiv.innerHTML
            }
        }
    }


    if (files.length < 10 - imgQty && files.length > 0) { // 控制可上传图片数量
        [].forEach.call(files, this.prototype.readAndDoSth);
        e.target.value = ""; // 清空form表单
    } else {
        alert("只能上传9张图片");
    }
})