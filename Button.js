class Button {
    constructor(xPos, yPos, img, hoverImg, pressedImg, disabledImg, sound, event) {
        this.x = xPos;
        this.y = yPos;
        
        this.img = img;
        this.hoverImg = hoverImg;
        this.pressedImg = pressedImg;
        this.disabledImg = disabledImg;

        this.sound = sound;
        
        this.onClickEvent = event;

        this.visible = true;
        this.enabled = true;
        this.clicked = false;
    }

    display() {
        if (this.visible) {
            if (this.disabledImg && !this.enabled) {
                image(this.disabledImg, this.x, this.y);
            }
            else if (this.pressedImg && this.isPressed()) {
                image(this.pressedImg, this.x, this.y);
            }
            else if (this.hoverImg && this.isOver()) {
                image(this.hoverImg, this.x, this.y);
            }
            else {
                image(this.img, this.x, this.y);
            }
        }
    }

    reset() {
        this.visible = true;
        this.enabled = true;
        this.clicked = false;
    }

    hide() {
        this.visible = false;
        this.enabled = false;
    }
    
    isOver() {
        return ((Math.abs(mouseX - this.x) < this.img.width / 2) && 
                (Math.abs(mouseY - this.y) < this.img.height / 2));
    }

    isPressed() {
        return mouseIsPressed && this.isOver();
    }

    checkClicked() {
        if (this.clicked && this.enabled) {
            this.onClickEvent();
            if (this.disabledImg) {
                this.enabled = false;
            }
        }
    }

}
