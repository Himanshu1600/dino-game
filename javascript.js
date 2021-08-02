score = 0;
cross = true;

audio = new Audio('mario.mp3');
audiogo = new Audio('supermario_eihnf7yq.mp3');
jumpAudio = new Audio('maro-jump-sound.mp3')
setTimeout(() => {
    audio.play();
}, 1000);
setInterval(() => {
    audio.play();
}, 200);
document.onkeydown = function(e) {
    console.log("Key code is: ", e.keyCode);
    if (e.keyCode == 38) {
        let dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            jumpAudio.play();
        }, 0);
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 1000);
    }
    if (e.keyCode == 39) {
        let dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 115 + "px";
    }
    if (e.keyCode == 37) {
        let dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 110) + "px";
    }
}
setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));

    Ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    Oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));

    offsetX = Math.abs(dx - Ox);
    offsetY = Math.abs(dy - Oy);
    if (offsetX < 75 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Start Again";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        // setTimeout(() => {
        //     audio.pause();
        // }, 0);
        setInterval(() => {
            audio.pause();
        }, Infinity);
        setTimeout(() => {
            audiogo.pause();
        }, 2500);
        dino.classList.add('downDino');
        dino.style.bottom = dy - 1000 + "px";
    } else if (offsetX < 93 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-Duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score : " + score;
}