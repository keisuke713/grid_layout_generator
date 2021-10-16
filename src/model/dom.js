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
            console.log(ele);
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
    updateNode(parentId, dimensionList){
        if(this.exist(parentId) == null) return;
        const node = this.findById(parentId);
        if(!node.hasChildren() && dimensionList.length > 0){
            node.addStyle(new Style("display", "grid", ""));
            node.addStyle(new Style())
        }
    }
    print(){
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
}