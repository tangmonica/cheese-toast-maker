class Cutter {
    constructor(img, mask, posX, posY) {
        this.img = img;
        this.mask = mask;
        this.originalX = posX;
        this.originalY = posY;

        this.inUse = false;
    }

    isOverOriginalPos() {
        return ((Math.abs(this.originalX - mouseX) < this.img.width / 2)  && 
                (Math.abs(this.originalY - mouseY) < this.img.height / 2));
    }

    updateCursor() {
        // Change cursor to grab glove if hovering over cutter in original position
        if (this.isOverOriginalPos()) {
            cursor('grab');
        }
        else {
            // Default cursor
            cursor();
        }
    }

    checkIfUsing() {
        if (this.inUse) {
            image(this.img, mouseX, mouseY);
        }
        else {
            // Return cutter to original position
            image(this.img, this.originalX, this.originalY);
        }
    }
     
}