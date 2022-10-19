class Cutter {
    constructor(img, mask, posX, posY) {
        this.img = img;
        this.mask = mask;
        this.initialX = posX;
        this.initialY = posY;

        this.inUse = false;
    }

    isOverInitialPos() {
        return ((Math.abs(this.initialX - mouseX) < this.img.width / 2)  && 
                (Math.abs(this.initialY - mouseY) < this.img.height / 2));
    }

    checkIfUsing() {
        if (this.inUse) {
            image(this.img, mouseX, mouseY);
        }
        else {
            // Return cutter to original position
            image(this.img, this.initialX, this.initialY);
        }
    }
     
}