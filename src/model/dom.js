class DOM{
    constructor(head, htmlParentNode, styleParentNode){
        this.head           = head;
        this.htmlParentNode = htmlParentNode;
        this.styleParentNode  = styleParentNode;
    }
    findById(id){
        const queue = [];
        queue.push(this.head);

        while(queue.length > 0){
            const ele = queue.shift();
            if(ele.id == id) return ele;

            for(const child of ele.children){
                queue.push(child);
            }
        }
        return null;
    }
    exist(id){
        const queue = [];
        queue.push(this.head);

        while(queue.length > 0){
            const ele = queue.shift();
            if(ele.id == id) return true;

            for(const child of ele.children){
                queue.push(child);
            }
        }
        return false;
    }
    appnedNode(parentId, childNode){
        const queue = [];
        queue.push(this.head);

        while(queue.length > 0){
            const ele = queue.shift();
            if(ele.id == parentId){
                ele.addChild(childNode);
                return;
            }

            for(const child of ele.children){
                queue.push(child);
            }
        }
        return;
    }
    // addStyle(nodeId, style){
    //     if(!this.exist(nodeId)) return;
    //     this.findById(nodeId).addStyle(style);
    // }
    // お蔵入り
    // updateNode(parentId, array2d){
    //     if(this.exist(parentId)) return;

    //     const parent = this.findById(parentId);
    //     if(!parent.hasChildren() && array2d.length > 0){
    //         parent.addStyle(new Display("grid", ""));
    //         parent.addStyle(new GridTemplateColumns(array2d[0].length, ""));
    //         parent.addStyle(new GridTemplateRows(array2d.length, ""));
    //     }

    //     for(let i=0; i<array2d.length; i++){
    //         const columns = array2d[i];
    //         let prevIndex = -1;

    //         for(let j=0; j<columns.length; j++){
    //             const index = columns[j];

    //             if(parent.existChildById(index)){
    //                 const node = parent.findChildById(index);

    //                 if(!node.hasStyle("grid-column")){
    //                     const value = new HashMap();
    //                     value.set("start", null);
    //                     value.set("end", null);
    //                     node.addStyle(new GridColumn(value, "")); 
    //                 }
    //                 const gridColumn = node.findStyle("grid-column");
    //                 if(prevIndex == index) gridColumn.updateEndColumnTo(j+2);
    //                 else{
    //                     gridColumn.updateStartColumnTo(j+1);
    //                     gridColumn.updateEndColumnTo(j+2);
    //                 }
    //             }else{
    //                 const node = new Node(index, "div", "", null);

    //                 const value = new HashMap();
    //                 value.set("start", j+1);
    //                 value.set("end", j+2);

    //                 node.addStyle(new GridColumn(value, ""));
    //                 parent.addChild(node);
    //             }
    //             prevIndex = index;
    //         }
    //     }
    // }
    print(){
        this.htmlParentNode.innerText = "";
        this.styleParentNode.innerText = "";
        this.printHelper(this.head);
    }
    printHelper(currNode){
        this.htmlParentNode.append(currNode.createFirstHtmlTag());

        this.styleParentNode.append(currNode.createFirstStyleTag());
        for(const style of currNode.createStyleBodies()){
            this.styleParentNode.append(style);
        }
        this.styleParentNode.append(currNode.createLastStyleTag());
    
        currNode.children.forEach(node => {
            this.printHelper(node);
        });

        this.htmlParentNode.append(currNode.createLastHtmlTag());
    }
    test(){
        for(const node of this.head.children){
            console.log("=============");
            console.log(`girdColumn:${node.findStyle("grid-column").toS()}`);
            console.log(`girdRow:${node.findStyle("grid-row").toS()}`);
        }
    }
}

class BinaryTree{
    constructor(head){
        this.head = head;
    }
    inOrder(){
        this.inOrderHelper(this.head);
    }
    inOrderHelper(node){
    }
}

class Node2{
    constructor(val){
        this.val = val;
        this.children = [];
    }
    addChild(node){
        this.children.push(node);
    }
}

const node1  = new Node2(1);
const node2  = new Node2(2);
const node3  = new Node2(3);
const node4  = new Node2(4);
const node5  = new Node2(5);
const node6  = new Node2(6);
const node7  = new Node2(7);
const node8  = new Node2(8);
const node9  = new Node2(9);
const node10 = new Node2(10);
const node11 = new Node2(11);
const node12 = new Node2(12);
const node13 = new Node2(13);

node1.addChild(node2);
node1.addChild(node3);
node2.addChild(node4);
node2.addChild(node5);
node2.addChild(node6);
node3.addChild(node7);
node3.addChild(node8);
node4.addChild(node9);
node4.addChild(node10);
node6.addChild(node11);
node8.addChild(node12);
node8.addChild(node13);

const tree = new BinaryTree(node1);
tree.inOrder();