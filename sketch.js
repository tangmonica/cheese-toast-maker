// Art 173 Midterm Project, Fall 2022
// Monica Tang

let gameWidth = 720;
let gameHeight = 540;

bgCol = [129, 116, 136]

let bigButtons = [];
let cutters = [];

function preload() {
    // ===== PLATE IMG ===== //
    plate = loadImage('assets/imgs/plate.png');

    // ===== REDO & DONE BUTTON IMGS ===== //
    redoButtonImg = loadImage('assets/imgs/buttons/redoButton.png');
    redoButtonHoverImg = loadImage('assets/imgs/buttons/redoButtonHover.png');
    redoButtonPressedImg = loadImage('assets/imgs/buttons/redoButtonPressed.png');

    doneButtonImg = loadImage('assets/imgs/buttons/doneButton.png');
    doneButtonHoverImg = loadImage('assets/imgs/buttons/doneButtonHover.png');
    doneButtonPressedImg = loadImage('assets/imgs/buttons/doneButtonPressed.png');

    saveButtonImg = loadImage('assets/imgs/buttons/saveButton.png');
    saveButtonHoverImg = loadImage('assets/imgs/buttons/saveButtonHover.png');
    saveButtonPressedImg = loadImage('assets/imgs/buttons/saveButtonPressed.png');

    // ===== CUTTER IMGS ===== //
    circleCutterImg = loadImage('assets/imgs/cutters/cutterCircle.png');
    circleMarker = loadImage('assets/imgs/cutters/markers/cutterCircleMarker.png');
    circleMask = loadImage('assets/imgs/cutters/masks/maskCircle.png');

    squareCutterImg = loadImage('assets/imgs/cutters/cutterSquare.png');
    squareMarker = loadImage('assets/imgs/cutters/markers/cutterSquareMarker.png');
    squareMask = loadImage('assets/imgs/cutters/masks/maskSquare.png');

    triangleCutterImg = loadImage('assets/imgs/cutters/cutterTriangle.png');
    triangleMarker = loadImage('assets/imgs/cutters/markers/cutterTriangleMarker.png');
    triangleMask = loadImage('assets/imgs/cutters/masks/maskTriangle.png');

    starCutterImg = loadImage('assets/imgs/cutters/cutterStar.png');
    starMarker = loadImage('assets/imgs/cutters/markers/cutterStarMarker.png');
    starMask = loadImage('assets/imgs/cutters/masks/maskStar.png');

    heartCutterImg = loadImage('assets/imgs/cutters/cutterHeart.png');
    heartMarker = loadImage('assets/imgs/cutters/markers/cutterHeartMarker.png');
    heartMask = loadImage('assets/imgs/cutters/masks/maskHeart.png');
}

function setup() {
    createCanvas(gameWidth, gameHeight);
    angleMode(DEGREES);
    imageMode(CENTER);

    noSmooth();

    // ===== CREATE BUTTONS ===== //
    redoButton = new Button(100, 300, redoButtonImg, redoButtonHoverImg, redoButtonPressedImg, null, resetGame);
    doneButton = new Button(100, 450, doneButtonImg, doneButtonHoverImg, doneButtonPressedImg, null, finishGame);
    saveButton = new Button(100, 450, saveButtonImg, saveButtonHoverImg, saveButtonPressedImg, null, saveGameImg);
    saveButton.hide();
    bigButtons.push(redoButton);
    bigButtons.push(doneButton);
    bigButtons.push(saveButton);

    // ===== CREATE CUTTERS ===== //
    circleCutter = new Cutter(circleCutterImg, circleMarker, circleMask, 230, 100);
    squareCutter = new Cutter(squareCutterImg, squareMarker, squareMask, 140, 75);
    triangleCutter = new Cutter(triangleCutterImg, triangleMarker, triangleMask, 65 , 85);
    starCutter = new Cutter(starCutterImg, starMarker, starMask, 165, 150);
    heartCutter = new Cutter(heartCutterImg, heartMarker, heartMask, 90, 170);

    // ===== ADD CUTTERS TO cutters ARRAY ===== //
    cutters.push(circleCutter);
    cutters.push(squareCutter);
    cutters.push(triangleCutter);
    cutters.push(starCutter);
    cutters.push(heartCutter);

    // ===== CREATE BREAD & CHEESE OBJS ===== //
    bread = new Food("bread", spawnBread);
    cheese = new Food("cheese", spawnCheese);

    // ===== CREATE KETCHUP OBJ =====
    ketchup = new Ketchup();
}

function draw() {
    background(bgCol);
    // ===== DRAW PLATE ===== //
    image(plate, width / 2 + 15, height / 2 + 120);
    
    // ===== DRAW KETCHUP PATH, CHEESE, BREAD ===== //
    ketchup.draw(0);
    // Clicked the cheese button first -> display cheese first
    // After bread button is clicked, can no longer cut cheese, and bread displayed over cheese
    if ((cheese.visible && !bread.visible) || // Only clicked cheese button
        (cheese.visible && bread.visible && !cheese.canCut && bread.canCut)) { // Clicked both (cheese clicked first)
        cheese.display();
        ketchup.draw(1);
        bread.display();
    }
    // vice versa
    else {
        bread.display();
        ketchup.draw(1);
        cheese.display();
    }
    ketchup.draw(2);
    
    // ===== DRAW REDO & DONE BUTTONS ===== //
    bigButtons.forEach(bttn => bttn.display());
    bigButtons.forEach(bttn => bttn.checkClicked());

    // ===== DRAW BREAD & CHEESE BUTTONS ===== //
    bread.displayButton();
    cheese.displayButton();

    // ===== DRAW CUTTERS ===== //
    cutters.forEach(cutter => cutter.display());

    // Want to display ketchup bottle/cursor after buttons and cutters so that cursor shows up on top
    ketchup.display();

    // ===== DRAW CURSOR ===== //
    updateCursor();
}

function mouseClicked() {
    // Only allow clicking buttons and using cutters when ketchup is not in use
    if (!ketchup.inUse) {
        bigButtons.forEach(bttn => {
            if (bttn.isOver()) {
                bttn.clicked = true;
            }
        })
        if (cheese.button.isOver()) {
            cheese.button.clicked = true;
        }
        if (bread.button.isOver()) {
            bread.button.clicked = true;
        }

        // To pick up and put down cutters
        cutters.forEach(cutter => {
            if (cutter.canGrab()) {
                cutter.inUse = !(cutter.inUse);
            }
        })

        // To cut foods
        cutters.forEach(cutter => {
            bread.cut(mouseX, mouseY, cutter);
            cheese.cut(mouseX, mouseY, cutter);
        })
    }

    // To use ketchup bottle
    if (ketchup.isOverBottle(mouseX, mouseY)) {
        ketchup.inUse = !(ketchup.inUse);
    }

    return false;
}

// When cheese button clicked, display cheese and disable bread cutting
function spawnCheese() {
    cheese.visible = true;
    cheese.canCut = true;
    bread.canCut = false;

    // Change zIndex so that ketchup path shows up on cheese
    ketchup.zIndex = (cheese.visible && bread.visible) ? 2 : 1;
}

// When bread button clicked, display bread and disable cheese cutting
function spawnBread() {
    bread.visible = true;
    bread.canCut = true;
    cheese.canCut = false;

    // Change zIndex so that ketchup path shows up on bread
    ketchup.zIndex = (cheese.visible && bread.visible) ? 2 : 1;

}

function updateCursor() {  
    // Change curser to glove if hovering over cutter or ketchup  
    if (circleCutter.canGrab() ||
        squareCutter.canGrab() ||
        triangleCutter.canGrab() ||
        starCutter.canGrab() ||
        heartCutter.canGrab() ||
        ketchup.isOverBottle(mouseX, mouseY)) 
    {
        cursor('grab');
    }
    else 
    {
        cursor();    // Default cursor
    } 
}

function resetGame() {
    bread.reset();
    cheese.reset();
    ketchup.reset();
    cutters.forEach(cutter => cutter.unhide());
    redoButton.reset();
    doneButton.reset();
    saveButton.hide();
 }

 function finishGame() {
    cutters.forEach(cutter => cutter.hide());
    bread.button.hide();
    cheese.button.hide();
    ketchup.hide();
    doneButton.hide();
    saveButton.reset();
    console.log("finished")
 }

 function saveGameImg() {
    console.log("save clicked")
    redoButton.hide();
    saveButton.hide();
    draw(); // Call draw() to not display buttons in saved image
    saveCanvas('myCheeseToast.png');
    redoButton.reset();
    saveButton.reset();
 }
