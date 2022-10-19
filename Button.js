class Button {
    constructor(xPos, yPos, img, hoverImg, pressedImg, disabledImg, event) {
        this.x = xPos;
        this.y = yPos;
        
        this.img = img;
        this.hoverImg = hoverImg;
        this.pressedImg = pressedImg;
        this.disabledImg = disabledImg;
        
        this.onClickEvent = event;

        this.enabled = true;
        this.clicked = false;
    }

    display() {
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
