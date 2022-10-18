class Cheese {
    constructor() {
        this.img = loadImage('assets/imgs/cheese.png');
        this.x = 400;
        this.y = 400;
    }

    display() {
        image(this.img, this.x, this.y);
    }

    cut(x, y, shapeImg) {
        let w = shapeImg.width, h = shapeImg.height;
        // x, y is relative to the upper left corner of cheese image
        // x, y also correponds to center of shapeImg
        let shapeUpperLeftX = x - w / 2;
        let shapeUpperLeftY = y - h / 2;

        this.img.loadPixels();
        // Iterate row-wise over shapeImg x,y values
        for (let j = 0; j < h; j++) {
            for (let i = 0; i < w; i++) {
                // Cut away where mask is opaque
                const pixelAlpha = alpha(shapeImg.get(i, j));   // Get alpha value of mask pixel
                if (pixelAlpha > 0) {
                    // Set cheese image pixel to transparent
                    if (this.inBoundsCheeseCoord(shapeUpperLeftX + i, shapeUpperLeftY + j)) {
                        this.img.set(shapeUpperLeftX + i, shapeUpperLeftY + j, color(0, 0, 0, 0));
                    }
                }
            }
        }
        this.img.updatePixels();
        console.log("cut cheese")
    }

    // Checks if (x, y) defined relative to the upper left corner of the cheese image is within the image bounds
    inBoundsCheeseCoord(x, y) {
        return (x >= 0 && x < this.img.width && y >= 0 && y < this.img.height);
    }

    // Checks if (x, y) defined relative to canvas is within the image bounds
    inBoundsCanvasCoord(x, y) {
        return ((Math.abs(this.x - x) < this.img.width / 2)  && 
                (Math.abs(this.y - y) < this.img.height / 2));
    }
    
}