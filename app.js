// const node = document.getElementById("test1-2");
// node.innerHTML = `
// <pre>
//     <code>
//         &lt;div&gt;
//             &lt;p&gt;keisuke&lt;/p&gt;
//         &lt;/div&gt;
//     </code>
// </pre>
// `
// const pre = document.createElement("pre");
// const code = document.createElement("code");
// code.setAttribute("id", "code");
// const div = document.createElement("div");
// const p   = document.createElement("p");

// p.innerText = "test";
// div.append(p);
// div.innerHTML = div.innerHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;");

// code.append(div);
// code.innerHTML = code.innerHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;");
// pre.append(code);
// node.append(pre);

const parseHtmlString = (html) => {
    const arr = html.split(/\<|\>/).filter(str => str.length > 0);
    const stack = [];
  
    const lessSign = "&lt;"
    const greaterSign = "&gt;\n"
    const space = "\t"
  
    for(let i=0; i<arr.length; i++){
        if(arr[i].charAt(0) != "/"){
            stack.push([i, arr[i]])
            continue;
        }
        const arr1 = stack.pop();
        arr[arr1[0]] = space.repeat(stack.length) + lessSign + arr1[1] + greaterSign;
        arr[i] = space.repeat(stack.length) + lessSign + arr[i] + greaterSign;
    }
  
    return arr.join("");
}

document.getElementById("translate").addEventListener("click", function(){
    const input = document.getElementById("code-input").value;
    const code  = document.getElementById("code");
    code.innerHTML = parseHtmlString(input);
})