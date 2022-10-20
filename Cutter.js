class Cutter {
    constructor(img, marker, mask, posX, posY) {
        this.img = img;
        this.marker = marker;
        this.mask = mask;

        this.selectSound = loadSound('assets/sounds/cutter-select.mp3');
        this.unselectSound = loadSound('assets/sounds/cutter-unselect.mp3');
        this.inUseSound = loadSound('assets/sounds/cutter-use.mp3');

        this.initialX = posX;
        this.initialY = posY;

        this.visible = true;
        this.inUse = false;
    }

    display() {
        if (this.visible) {
            image(this.marker, this.initialX, this.initialY);
            if (this.inUse) {
                image(this.img, mouseX, mouseY);
            }
            else {
                // Return cutter to original position
                image(this.img, this.initialX, this.initialY);
            }
        }
    }

    hide() {
        this.visible = false;
    }

    unhide() {
        this.visible = true;
    }

    _isOverInitialPos() {
        return ((Math.abs(this.initialX - mouseX) < this.marker.width / 2)  && 
                (Math.abs(this.initialY - mouseY) < this.marker.height / 2));
    }

    canGrab() {
        return this.visible && this._isOverInitialPos();
    }
}
