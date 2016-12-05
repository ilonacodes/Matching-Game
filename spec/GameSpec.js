
function FakeUI() {
    this.leftSideFaces = null;
    this.rightSideFaces = null;
    this.lost = false;
}

FakeUI.prototype.renderLeftSide = function (faces) {
    this.leftSideFaces = faces;
};

FakeUI.prototype.renderRightSide = function (faces) {
    this.rightSideFaces = faces;
};

FakeUI.prototype.gameOver = function () {
    this.lost = true;
};

function FakeRandom() {
    this.nextPositions = [];
}

FakeRandom.prototype.nextPosition = function () {
    return this.nextPositions.shift() || [1, 2];
};

describe("Matching Game", function () {
    var ui;
    var game;
    var random;

    beforeEach(function () {
        ui = new FakeUI();
        random = new FakeRandom();
        game = new Game(ui, random);
    });

    it("starts Game with 5 faces", function () {
        game.start();

        expect(ui.leftSideFaces.length).toEqual(5);
    });

    it("references Game from face", function () {
        game.start();

        expect(ui.leftSideFaces[0].game).toEqual(game);
    });

    it("starts Game with 4 faces on the right side", function () {
        game.start();

        expect(ui.rightSideFaces.length).toEqual(4);
    });

    it("generates correct faces", function () {
        random.nextPositions = [[1, 2],[3, 4], [5, 6], [7, 8], [9, 10]];

        game.start();

        expect(ui.leftSideFaces[0].x).toEqual(1);
        expect(ui.leftSideFaces[0].y).toEqual(2);
        expect(ui.leftSideFaces[1].x).toEqual(3);
        expect(ui.leftSideFaces[1].y).toEqual(4);
        expect(ui.leftSideFaces[2].x).toEqual(5);
        expect(ui.leftSideFaces[2].y).toEqual(6);
        expect(ui.leftSideFaces[3].x).toEqual(7);
        expect(ui.leftSideFaces[3].y).toEqual(8);
        expect(ui.leftSideFaces[4].x).toEqual(9);
        expect(ui.leftSideFaces[4].y).toEqual(10);

    });

    it("restarts Game with 10 faces", function () {
        game.restart();

        expect(ui.leftSideFaces.length).toEqual(10);
    });

    it("restarts Game the second time with 15 faces", function () {
        game.restart();
        game.restart();

        expect(ui.leftSideFaces.length).toEqual(15);
    });

    it("is Game Over when the wrong face is chosen ", function () {
        game.start();

        game.choose(new Face(0, 0));

        expect(ui.lost).toEqual(true);
    });

    it("restarts Game when excess face is chosen", function () {
        game.start();

        var excess = ui.leftSideFaces[4];
        game.choose(excess);

        expect(ui.leftSideFaces.length).toEqual(10);
        expect(ui.lost).toEqual(false);

    });
    
});