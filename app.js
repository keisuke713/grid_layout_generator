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

// これどうしようかー
// ======================== copyは今後弄るから保留 ========================
document.getElementById("copy").addEventListener("click", function(){
    const code  = document.getElementById("code");

    const copyTextarea = document.getElementById("test")
    copyTextarea.value = code.innerHTML;

    copyTextarea.focus();
    copyTextarea.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }
})