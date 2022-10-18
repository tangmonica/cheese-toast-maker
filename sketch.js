// Art 173 Midterm Project, Fall 2022
// Monica Tang

let gameWidth = 720;
let gameHeight = 540;

bgCol = [127, 111, 140]
// gameBgCol = [84, 51, 68]

// let doneButton, doneButtonHover, doneButtonPressed;
// let redoButton, redoButtonHover, redoButtonPressed;
// let cheese, bread;
// let circle;
let buttons;

function preload() {
    doneButtonImg = loadImage('assets/imgs/buttons/doneButton.png');
    doneButtonHoverImg = loadImage('assets/imgs/buttons/doneButtonHover.png');
    doneButtonPressedImg = loadImage('assets/imgs/buttons/doneButtonPressed.png');


    test2 = loadImage('assets/imgs/buttons/redoButton.png');
    // cheese = loadImage('assets/imgs/cheese.png');
    bread = loadImage('assets/imgs/bread.png');
    plate = loadImage('assets/imgs/plate.png');
    circle = loadImage('assets/imgs/cutters/cutterCircle.png');
    circleMask = loadImage('assets/imgs/cutters/masks/maskCircle.png');

    square = loadImage('assets/imgs/cutters/cutterSquare.png');
    triangle = loadImage('assets/imgs/cutters/cutterTriangle.png');
    starCutterImg = loadImage('assets/imgs/cutters/cutterStar.png');
    starMask = loadImage('assets/imgs/cutters/masks/maskStar.png');

    heart = loadImage('assets/imgs/cutters/cutterHeart.png');
    
    toastButton = loadImage('assets/imgs/buttons/toastButton.png');
    cheeseButton = loadImage('assets/imgs/buttons/cheeseButton.png');

    ketchup = loadImage('assets/imgs/ketchup/ketchupBottle.png');
    ketchupCursor = loadImage('assets/imgs/ketchup/ketchupCursor.png');
    ketchupDot = loadImage('assets/imgs/ketchup/ketchupDot.png');

}

function setup() {
    createCanvas(gameWidth, gameHeight);
    angleMode(DEGREES);
    imageMode(CENTER);

    noSmooth();

    // Create Buttons
    doneButton = new Button(100, 450, doneButtonImg, doneButtonHoverImg, doneButtonPressedImg, null, test);
    // Add Button objects to buttons array

    circleCutter = new Cutter(circle, circleMask, 50, 50);
    starCutter = new Cutter(starCutterImg, starMask, 150, 50);

    cheese = new Cheese();
}

function draw() {
    background(bgCol);
    doneButton.display();
    doneButton.checkClicked();
    // image(plate, width / 2, height * 0.7);

    // image(test, width * 0.15, height * .8);
    // image(test2, width * 0.15, height * .8 - 150);

    // image(bread, width / 2, height / 2);
    // let c = cheese.img.get(50, 50, circleMask.width, circleMask.height);
    // c.mask(circleMask);
    
    cheese.display();
    // cheese.mask(circleMask);
    // cheese.subtract(16, 16, circleMask);
    // console.log("subtract")
    // image(cheese.img, width / 2 + 100, height / 2 + 100);

    circleCutter.updateCursor();
    circleCutter.checkIfUsing();

    starCutter.updateCursor();
    starCutter.checkIfUsing();

    // image(circle, width / 2, height / 2);
    // image(square, width / 2, height / 2 + 75);
    // image(triangle, width / 2 + 75, height / 2);
    // image(star, width / 2 + 75, height / 2 + 75);
    // image(heart, width / 2 + 150, height / 2 + 75);

    // image(toastButton, width * 0.9, height * 0.7);
    // image(cheeseButton, width * 0.9, height * 0.7 - 150);

    // image(ketchup, width * 0.87, height * 0.15);
    // image(ketchupCursor, width * 0.5, height * 0.85);
    // image(ketchupDot, width * 0.45, height * 0.9);

}

function mouseClicked() {
    if (doneButton.isOver()) {
        console.log("done button clicked");
        doneButton.clicked = true;
    }

    if (circleCutter.isOverOriginalPos()) {
        console.log("circle cutter clicked");
        // Toggle boolean
        circleCutter.inUse = !(circleCutter.inUse);
    }

    if (circleCutter.inUse && isOverCheese(mouseX, mouseY)) {
        // Redefine (x,y) relative to upper left corner of cheese
        let upperLeftX = cheese.x - cheese.img.width / 2;
        let upperLeftY = cheese.y - cheese.img.height / 2;

        cheese.cut(mouseX - upperLeftX, mouseY - upperLeftY, circleCutter.mask)
    }

    if (starCutter.isOverOriginalPos()) {
        // Toggle boolean
        starCutter.inUse = !(starCutter.inUse);
    }

    if (starCutter.inUse && isOverCheese(mouseX, mouseY)) {
        // Redefine (x,y) relative to upper left corner of cheese
        let upperLeftX = cheese.x - cheese.img.width / 2;
        let upperLeftY = cheese.y - cheese.img.height / 2;

        cheese.cut(mouseX - upperLeftX, mouseY - upperLeftY, starCutter.mask)
    }

    return false;
}

function isOverCheese(x, y) {
    return cheese.inBoundsCanvasCoord(x, y);
}

function test() {
    console.log("drew ellipse");
    ellipse(100, 100, 100, 100);
}