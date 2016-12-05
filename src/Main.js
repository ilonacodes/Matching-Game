function Random() {

}

Random.prototype.nextPosition = function () {
    return [
        Math.floor(Math.random() * 360),
        Math.floor(Math.random() * 400)
    ];
};

function UI() {
    this.leftSide = document.getElementById("leftSide");
    this.rightSide = document.getElementById("rightSide");
}

function renderFaces(side, faces) {
    side.innerHTML = "";

    for (var i = 0; i < faces.length; i++) {
        var face = faces[i];
        var img = document.createElement("img");
        img.src = "http://home.cse.ust.hk/~rossiter/mooc/matching_game/smile.png";
        img.style.left = face.x + "px";
        img.style.top = face.y + "px";
        img.onclick = function (face) {
            return function () {
                face.game.choose(face);
            };
        }(face);
        side.appendChild(img);
    }
}

UI.prototype.renderLeftSide = function (faces) {
    renderFaces(this.leftSide, faces);
};

UI.prototype.renderRightSide = function (faces) {
    renderFaces(this.rightSide, faces);
};

UI.prototype.gameOver = function () {
    alert("Game Over");
    this.leftSide.innerHTML = "";
    this.rightSide.innerHTML = "";
};

var ui = new UI();
var random = new Random();
var game = new Game(ui, random);

game.start();