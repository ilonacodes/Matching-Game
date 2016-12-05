function Face(x, y, game) {
    this.x = x;
    this.y = y;
    this.game = game;
}

function Game(ui, random) {
    this.ui = ui;
    this.random = random;
    this.numberOfFaces = 5;
}

Game.prototype.start = function () {
    var faces = [];

    for (var i = 0; i < this.numberOfFaces; i++) {
        var position = this.random.nextPosition();
        var x = position[0], y = position[1];
        var face = new Face(x, y, this);
        faces.push(face);
    }

    this.excessFace = faces[faces.length - 1];

    var facesWithoutLast = faces.slice(0, faces.length - 1);
    this.ui.renderLeftSide(faces);
    this.ui.renderRightSide(facesWithoutLast);
};

Game.prototype.restart = function () {
    this.numberOfFaces += 5;
    this.start();
};

Game.prototype.choose = function (face) {
    console.log(face, this.excessFace);
    if (face === this.excessFace)
        this.restart();
    else this.ui.gameOver();
};
