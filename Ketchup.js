class Ketchup {
    constructor() {
        this.bottle = loadImage('assets/imgs/ketchup/ketchupBottle.png')
        this.cursorImg = loadImage('assets/imgs/ketchup/ketchupCursor.png')
        this.dot = loadImage('assets/imgs/ketchup/ketchupDot.png')
        
        this.x = 600;
        this.y = 100;

        this.inUse = false;

        // z-index determines depth at which ketchup path is drawn
        // 0: under bread & cheese
        // 1: between bread & cheese
        // 2: above bread & cheese
        this.zIndex = 0;
        this.paths = [[], [], []]; 
    }

    display() {
        if (this.inUse) {
            noCursor();
            image(this.cursorImg, mouseX, mouseY);
            this.storePath();
        }
        else {
            image(this.bottle, this.x, this.y);
        }
    }

    storePath() {
        if (mouseIsPressed) {
            // Offset dot from cursorImg's center to align with ketchup bottle's opening.
            let offsetX = - this.cursorImg.width / 2 + 4;
            let offsetY = this.cursorImg.height / 2 - 4;
            if (!this.isOverBottle(mouseX + offsetX, mouseY + offsetY)) {
                let dotInfo = [this.dot, mouseX + offsetX, mouseY + offsetY];
                this.paths[this.zIndex].push(dotInfo);
            }
        }
    }

    draw(depthIndex) {
        this.paths[depthIndex].forEach(elt => image.apply(null, elt)); 
    }

    isOverBottle(x, y) {
        return ((Math.abs(this.x - x) < this.bottle.width / 2)  && 
                (Math.abs(this.y - y) < this.bottle.height / 2));
    }
    
}
