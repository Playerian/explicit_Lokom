// JavaScript File
/*global io $ navigator Image*/
const debugging = true;
const isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4));

//class
class Camera{
    constructor(){
        this.game = undefined;
        this.locked = false;
        this.x = 0;
        this.y = 0;
        this.shiftTo = function(x, y, callback){
            if (x > this.game.rectSize * 32){
                x = this.game.rectSize * 32;
            }
            if (x < 0){
                x = 0;
            }
            if (y > this.game.rectSize * 32){
                y = this.game.rectSize * 32;
            }
            if (y < 0){
                y = 0;
            }
            this.locked = true;
            const frames = 50;
            //move in 1 second
            let xpixel = (x - this.x) / frames;
            let ypixel = (y - this.y) / frames;
            let times = 0;
            var interval = setInterval(function(){
                camera.x += xpixel;
                camera.y += ypixel;
                times ++;
                //rendering map
                if (rendering){
                    // camera.game.mapping.drawBG(camera.x, camera.y);
                    // camera.game.mapping.drawUnits();
                    // camera.game.mapping.drawFog();
                }
                //exit
                if (times === frames || (camera.x === x && camera.y === y)){
                    camera.locked = false;
                    clearInterval(interval);
                    if (typeof callback === 'function'){
                        callback();
                    }
                }
            }, 25);
        }
    }
}

class Game{
    constructor(){
        this.map = new Map();
    }
}

class Map{
    constructor(){
        //draw map background
        ctx.drawImage($bg[0], 0, 0);
        //stuff
        this.image = new Image();
    	this.image.src = ctx.canvas.toDataURL("image/png");
    	ctx.clearRect(0,0,c.width, c.height)
    	//methods
    	this.drawBG = function(x, y){
            ctx.clearRect(0,0,c.width, c.height)
            var dx = 0, dy = 0;
            var sx = x, sy = y;
            var sWidth =  rectSize * 32;
        	var sHeight = rectSize * 32;
        
        	// if cropped image is smaller than canvas we need to change the source dimensions
        	if(this.image.width - sx < sWidth){
        		sWidth = this.image.width - sx;
        	}
        	if(this.image.height - sy < sHeight){
        		sHeight = this.image.height - sy; 
        	}
        	var dWidth = sWidth;
        	var dHeight = sHeight;	
            ctx.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);			
    	};
        this.renderable = function(x, y){
            var checkPoint = 0;
            if (x - camera.x >= -32){
                checkPoint ++;
            }
            if (x - camera.x <= rectSize * 32){
                checkPoint ++;
            }
            if (y - camera.y >= -32){
                checkPoint ++;
            }
            if (y - camera.y <= rectSize * 32){
                checkPoint ++;
            }
            if (checkPoint === 4){
                return true;
            }
        };
    }
}

//canvas init
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
//jquery
var $canvas = $('#canvasDiv');
//image
var $bg = $("#bgImage");
//init
let camera = new Camera();
let game = new Game();

//timer
setInterval(function(){
    //fix width height
    $canvas.css("height", window.innerHeight);
    $canvas.css("width", window.innerWidth);
}, 100);