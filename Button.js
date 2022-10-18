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
        if (this.disabledImg && this.isDisabled()) {
            // console.log("Display disabled image.")
            image(this.disabledImg, this.x, this.y);
        }
        else if (this.pressedImg && this.isPressed()) {
            // console.log("Display pressed image.")
            image(this.pressedImg, this.x, this.y);
        }
        else if (this.hoverImg && this.isOver()) {
            // console.log("Display hover image.")
            image(this.hoverImg, this.x, this.y);
        }
        else {
            // console.log("Display default image.")
            image(this.img, this.x, this.y);
        }
    }
    
    isOver() {
        let ret = ((Math.abs(mouseX - this.x) < this.img.width / 2) && (Math.abs(mouseY - this.y) < this.img.height / 2));
        // console.log("isOver:", ret);
        return ret;
    }

    isPressed() {
        let ret = mouseIsPressed && this.isOver();
        // console.log("isPressed:", ret);
        return ret;
    }

    isDisabled() {
        let ret = !this.enabled;
        // console.log("isDisabled:", ret);
        return ret;
    }

    checkClicked() {
        if (this.clicked) {
            this.onClickEvent();
        }
        // this.clicked = false;
    }

}

