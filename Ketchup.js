class Ketchup {
    constructor() {
        this.bottle = loadImage('assets/imgs/ketchup/ketchupBottle.png');
        this.bottleMarker = loadImage('assets/imgs/ketchup/ketchupBottleMarker.png');
        this.cursorImg = loadImage('assets/imgs/ketchup/ketchupCursor.png');
        this.dot = loadImage('assets/imgs/ketchup/ketchupDot.png');
        
        this.selectSound = loadSound('assets/sounds/ketchup-select.mp3');
        this.unselectSound = loadSound('assets/sounds/ketchup-unselect.mp3');
        this.drawSound = loadSound('assets/sounds/ketchup-draw.mp3');

        this.x = gameWidth - 110;
        this.y = 100;

        this.enabled = true;
        this.inUse = false;

        // z-index determines depth at which ketchup path is drawn
        // 0: under bread & cheese
        // 1: between bread & cheese
        // 2: above bread & cheese
        this.zIndex = 0;
        this.paths = [[], [], []]; 
    }

    display() {
        if (this.enabled) {
            if (this.inUse) {
                noCursor();
                image(this.bottleMarker, this.x, this.y);
                image(this.cursorImg, mouseX, mouseY);
                this.storePath();
            }
            else {
                image(this.bottle, this.x, this.y);
            }
        }
    }

    reset() {
        this.enabled = true;
        this.zIndex = 0;
        this.paths = [[], [], []]; 
    }

    hide() {
        this.enabled = false;
    }

    storePath() {
        if (mouseIsPressed && this.enabled) {
            // Offset dot from cursorImg's center to align with ketchup bottle's opening.
            let offsetX = - this.cursorImg.width / 2 + 4;
            let offsetY = this.cursorImg.height / 2 - 4;
            if (!this._isOverBottle(mouseX + offsetX, mouseY + offsetY)) {
                let dotInfo = [this.dot, mouseX + offsetX, mouseY + offsetY];
                this.paths[this.zIndex].push(dotInfo);
                if (!this.drawSound.isPlaying()) {
                    this.drawSound.play();
                }
            }
        }
    }

    draw(depthIndex) {
        this.paths[depthIndex].forEach(elt => image.apply(null, elt)); 
    }

    canGrab() {
        return this.enabled && this._isOverBottle(mouseX, mouseY);
    }

    _isOverBottle(x, y) {
        return ((Math.abs(this.x - x) < this.bottle.width / 2)  && 
                (Math.abs(this.y - y) < this.bottle.height / 2));
    }
    
}
