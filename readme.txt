
// bird drawings
    /*
        context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)

        img	Source image object	Sprite sheet
        sx	Source x	Frame index times frame width
        sy	Source y	0
        sw	Source width	Frame width
        sh	Source height	Frame height
        dx	Destination x	0
        dy	Destination y	0
        dw	Destination width	Frame width
        dh	Destination height	Frame height
*/


/////// Remember /////////
splice on splice off!


let shellImg = new Image();
shellImg.src = './assets/images/shell.png';
gameCtx.drawImage(shellImg, 30, 680, 50, 100);
gameCtx.font = '67px Arial';
gameCtx.fillStyle = '#000';
gameCtx.fillStyle = 'bolder';
gameCtx.fillText('\u221E', 80, 780);