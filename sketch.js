// Art 173 Midterm Project, Fall 2022
// Monica Tang

let gameWidth = 720;
let gameHeight = 540;

bgCol = [127, 111, 140]
// bgCol = [84, 51, 68]

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

    // ===== CUTTER IMGS ===== //
    circleCutterImg = loadImage('assets/imgs/cutters/cutterCircle.png');
    circleMask = loadImage('assets/imgs/cutters/masks/maskCircle.png');

    squareCutterImg = loadImage('assets/imgs/cutters/cutterSquare.png');
    squareMask = loadImage('assets/imgs/cutters/masks/maskSquare.png');

    triangleCutterImg = loadImage('assets/imgs/cutters/cutterTriangle.png');
    triangleMask = loadImage('assets/imgs/cutters/masks/maskTriangle.png');

    starCutterImg = loadImage('assets/imgs/cutters/cutterStar.png');
    starMask = loadImage('assets/imgs/cutters/masks/maskStar.png');

    heartCutterImg = loadImage('assets/imgs/cutters/cutterHeart.png');
    heartMask = loadImage('assets/imgs/cutters/masks/maskHeart.png');
}

function setup() {
    createCanvas(gameWidth, gameHeight);
    angleMode(DEGREES);
    imageMode(CENTER);

    noSmooth();

    // ===== CREATE BUTTONS ===== //
    redoButton = new Button(100, 300, redoButtonImg, redoButtonHoverImg, redoButtonPressedImg, null, test);
    doneButton = new Button(100, 450, doneButtonImg, doneButtonHoverImg, doneButtonPressedImg, null, test);

    // ===== CREATE CUTTERS ===== //
    circleCutter = new Cutter(circleCutterImg, circleMask, 50, 50);
    squareCutter = new Cutter(squareCutterImg, squareMask, 150, 50);
    triangleCutter = new Cutter(triangleCutterImg, triangleMask, 250, 50);
    starCutter = new Cutter(starCutterImg, starMask, 350, 50);
    heartCutter = new Cutter(heartCutterImg, heartMask, 450, 50);
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
    image(plate, width / 2, height * 0.7);
    
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
     redoButton.display();
     redoButton.checkClicked();
     doneButton.display();
     doneButton.checkClicked();

    // ===== DRAW BREAD & CHEESE BUTTONS ===== //
    bread.displayButton();
    cheese.displayButton();

    // ===== DRAW CUTTERS ===== //
    cutters.forEach(cutter => cutter.checkIfUsing());

    // Want to display ketchup bottle/cursor after buttons and cutters so that cursor shows up on top
    ketchup.display();

    // ===== DRAW CURSOR ===== //
    updateCursor();
}

function mouseClicked() {
    if (redoButton.isOver()) {
        redoButton.clicked = true;
    }
    if (doneButton.isOver()) {
        doneButton.clicked = true;
    }
    if (cheese.button.isOver()) {
        cheese.button.clicked = true;
    }
    if (bread.button.isOver()) {
        bread.button.clicked = true;
    }

    // To pick up and put down cutters
    cutters.forEach(cutter => {
        if (cutter.isOverInitialPos()) {
            cutter.inUse = !(cutter.inUse);
        }
    })

    // To cut foods
    cutters.forEach(cutter => {
        bread.cut(mouseX, mouseY, cutter);
        cheese.cut(mouseX, mouseY, cutter);
    })

    // To use ketchup bottle
    if (ketchup.isOverBottle(mouseX, mouseY)) {
        ketchup.inUse = !(ketchup.inUse);
    }

    return false;
}

function test() {
    console.log("drew ellipse");
    ellipse(100, 100, 100, 100);
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
    if (circleCutter.isOverInitialPos() ||
        squareCutter.isOverInitialPos() ||
        triangleCutter.isOverInitialPos() ||
        starCutter.isOverInitialPos() ||
        heartCutter.isOverInitialPos() ||
        ketchup.isOverBottle(mouseX, mouseY)) 
    {
        cursor('grab');
    }
    else 
    {
        cursor();    // Default cursor
    } 
}

function disableButtonsCutters() {
    
}
