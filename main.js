const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let dinoImg = new Image();
let cactusImg = new Image();

dinoImg.src = 'dinosaur.png';
cactusImg.src = 'cactus.png';

const dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.drawImage(dinoImg, this.x, this.y);
    },
};

class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.drawImage(cactusImg, this.x, this.y);
    }
}

let timer = 0;
let multiCactus = [];
let spaceSwitch = false;
let jumpTimer = 0;
let anime;

function animation() {
    anime = requestAnimationFrame(animation);
    timer++;
    
    // 화면 clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 장애물 프레임/120 (초) 마다 생성
    if(timer % 120 === 0) {
        const cactus = new Cactus();
        multiCactus.push(cactus);
    }

    // 여러개 생성
    multiCactus.forEach((monster, i, o) => {
        if (monster.x < 0) {
            o.splice(i, 1);
        }

        monster.x = monster.x - 2;
        monster.draw();

        collisionDetection(dino, monster);
    });

    if(spaceSwitch) {
        dino.y -= 2;
        jumpTimer++;
    }

    if(!spaceSwitch) {
        if (dino.y < 200) { dino.y += 2; }
    }

    if(jumpTimer > 50) {
        spaceSwitch = false;
        jumpTimer = 0;
    }

    dino.draw();
}

animation();

// 출돌 확인
function collisionDetection(dino, cactus) {
    let defX = cactus.x - (dino.x + dino.width);
    let defY = cactus.y - (dino.y + dino.height);
    if(defX < 0 && defY < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(anime);
    }
}

document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        spaceSwitch = true;
    }
});