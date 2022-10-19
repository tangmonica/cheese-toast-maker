class Food {
    constructor(name, onClickEvent) {
        switch (name) {
            case "cheese":
                this.img = loadImage('assets/imgs/cheese.png');
                this.button = new Button(
                    600, 
                    450, 
                    loadImage('assets/imgs/buttons/cheeseButton.png'),
                    null,
                    loadImage('assets/imgs/buttons/cheeseButtonPressed.png'),
                    loadImage('assets/imgs/buttons/cheeseButtonDisabled.png'),
                    onClickEvent
                    );
                break;
            case "bread":
                this.img = loadImage('assets/imgs/bread.png');
                this.button = new Button(
                    600, 
                    350, 
                    loadImage('assets/imgs/buttons/breadButton.png'),
                    null,
                    loadImage('assets/imgs/buttons/breadButtonPressed.png'),
                    loadImage('assets/imgs/buttons/breadButtonDisabled.png'),
                    onClickEvent
                    );
                break;
        }
        this.x = 360;
        this.y = 360;

        this.visible = false;
        this.canCut = false;
    }

    display() {
        if (this.visible) {
            image(this.img, this.x, this.y);
        }
    }

    displayButton() {
        this.button.display();
        this.button.checkClicked();
    }

    cut(canvasX, canvasY, cutterObj) {
        if (this.canCut && cutterObj.inUse && this.inBoundsForCutting(canvasX, canvasY)) {
            console.log("can cut")
            // Redefine (x, y) relative to upper left corner of food image
            let upperLeftX = this.x - this.img.width / 2;
            let upperLeftY = this.y - this.img.height / 2;
            
            let x = canvasX - upperLeftX;
            let y = canvasY - upperLeftY;

            let maskImg = cutterObj.mask;
            
            // (x, y) also corresponds to the center of the cutter's mask image
            let w = maskImg.width, h = maskImg.height;
            let maskUpperLeftX = x - w / 2;
            let maskUpperLeftY = y - h / 2;

            // Edit pixels of food image
            this.img.loadPixels();
            // Iterate row-wise over maskImg x,y values
            for (let j = 0; j < h; j++) {
                for (let i = 0; i < w; i++) {
                    // Cut away where mask is opaque
                    const pixelAlpha = alpha(maskImg.get(i, j));   // Get alpha value of mask pixel
                    if (pixelAlpha > 0) {
                        // Set food image pixel to transparent
                        if (this._inBoundsFoodCoord(maskUpperLeftX + i, maskUpperLeftY + j)) {
                            this.img.set(maskUpperLeftX + i, maskUpperLeftY + j, color(0, 0, 0, 0));
                        }
                    }
                }
            }
            this.img.updatePixels();
        }
    }

    // Checks if (x, y) defined relative to the upper left corner of the food image is within the image bounds
    _inBoundsFoodCoord(x, y) {
        return (x >= 0 && x < this.img.width && y >= 0 && y < this.img.height);
    }

    // Checks if (x, y) defined relative to canvas upper left corner is near or within the image bounds
    inBoundsForCutting(x, y) {
        let offset = 32;
        return ((Math.abs(this.x - x) < this.img.width / 2 + offset)  && 
                (Math.abs(this.y - y) < this.img.height / 2 + offset));
    }
    
}
