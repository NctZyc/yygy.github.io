var themeChecked = $.cookie("themeChecked"); 
var LeafScene = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves = [];

    this.options = {
        numLeaves: 15,
        wind: {
            magnitude: 1.2,
            maxSpeed: 5,
            duration: 300,
            start: 0,
            speed: 0
        },
    };
    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetLeaf = function(leaf) {

        // place leaf towards the top left
       // leaf.x = this.width * 2 - Math.random() * this.width * 1.75;
		leaf.x = Random(0,this.width);
		leaf.y = -10;
        leaf.z = Math.random() * 200;

        // Choose axis of rotation.
        // If axis is not X, chose a random static x-rotation for greater variability
        leaf.rotation.speed = Math.random() * 5;
        var randomAxis = Math.random();
        if (randomAxis > 0.5) {
            leaf.rotation.axis = 'X';
        } else if (randomAxis > 0.25) {
            leaf.rotation.axis = 'Y';
            leaf.rotation.x = Math.random() * 180 + 90;
        } else {
            leaf.rotation.axis = 'Z';
            leaf.rotation.x = Math.random() * 360 - 180;
            // looks weird if the rotation is too fast around this axis
            leaf.rotation.speed = Math.random() * 3;
        }

        // random speed
        leaf.xSpeedVariation = Math.random() * 0.7 - 0.4;
        leaf.ySpeed = Math.random() + 1;

        return leaf;
    }

    this._updateLeaf = function(leaf) {
        var leafWindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf.y);
        var xSpeed = leafWindSpeed + leaf.xSpeedVariation;
        leaf.x -= xSpeed;
        leaf.y += leaf.ySpeed;
        leaf.rotation.value += leaf.rotation.speed;

        var t = 'translateX( ' + leaf.x + 'px ) translateY( ' + leaf.y + 'px ) translateZ( ' + leaf.z + 'px )  rotate' + leaf.rotation.axis + '( ' + leaf.rotation.value + 'deg )';
        if (leaf.rotation.axis !== 'X') {
            t += ' rotateX(' + leaf.rotation.x + 'deg)';
        }
        leaf.el.style.webkitTransform = t;
        leaf.el.style.MozTransform = t;
        leaf.el.style.oTransform = t;
        leaf.el.style.transform = t;
        // 飞出视图重置
        if (leaf.x < 0 || leaf.y +20 > this.height) {
            this._resetLeaf(leaf);
        }
    }

    this._updateWind = function() {
		//由maxSpeed控制风持续时间，越小时间越短，看起来就平静
        if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

            this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
            this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
            this.options.wind.start = this.timer;

            var screenHeight = this.height;

            this.options.wind.speed = function(t, y) {
                var a = this.magnitude / 2 * (screenHeight - 2 * y / 3) / screenHeight;
                return a * Math.sin(2 * Math.PI / this.duration * t + (3 * Math.PI / 2)) + a;
            }
        }
    }
}

LeafScene.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
        var leaf = {
            el: document.createElement('div'),
            x: 0,
            y: 0,
            z: 0,
            rotation: {
                axis: 'X',
                value: 0,
                speed: 0,
                x: 0
            },
            xSpeedVariation: 0,
            ySpeed: 0,
            path: {
                type: 1,
                start: 0,

            },
            image: 1
        };
        this._resetLeaf(leaf);
        this.leaves.push(leaf);
        this.world.appendChild(leaf.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";

    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
        self.width = self.viewport.offsetWidth;
        self.height = self.viewport.offsetHeight;
    };
}

LeafScene.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves.length; i++) {
        this._updateLeaf(this.leaves[i]);
    }

    this.timer++;
    requestAnimationFrame(this.render.bind(this));
}
function Random(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}
// start up leaf scene
	var leafContainer = document.querySelector('.falling-leaves'),
    leaves = new LeafScene(leafContainer);
function ThemeInit(){
	var currentDate = new Date();
	var currentMonth = currentDate.getMonth()+1;
	var headObj = $("head");
	var imgNum = Random(1,3);
	if(themeChecked != undefined){
		switch(themeChecked){
			case "spring":
				headObj.append("<style>.leaf-scene div {background: url(/style/themeImg/Lucky_Clover"+imgNum+".png) no-repeat;background-size:100%;}</style>"); break;
			case "summer":
				headObj.append("<style>.leaf-scene div {background: url(/style/themeImg/Summer"+imgNum+".png) no-repeat;background-size:100%;}</style>"); break;
			case "fall":
				headObj.append("<style>.leaf-scene div {background: url(/style/themeImg/Maple_Leaf"+imgNum+".png) no-repeat;background-size:100%;}</style>"); break;
			case "winter":
				headObj.append("<style>.leaf-scene div {background: url(/style/themeImg/SnowFlake"+imgNum+".png) no-repeat;background-size:100%;}</style>"); break;
		}
	}else{
		headObj.append("<style>.leaf-scene div {background: url(/style/themeImg/Maple_Leaf"+imgNum+".png) 100% no-repeat;background-size:100%;}</style>");	
		/*if(currentMonth>=2&&currentMonth<=4){
			headObj.append("<style>.leaf-scene div {background: url(/style/themeImg/Lucky_Clover"+imgNum+".png) no-repeat;background-size:100%;}</style>");
		}else if(currentMonth>=5&&currentMonth<=7){
			headObj.append("<style>.leaf-scene div {background: url(/style/themeImg/Summer"+imgNum+".png) 100% no-repeat;background-size:100%;}</style>");	
		}else if(currentMonth>=8&&currentMonth<=10){
			headObj.append("<style>.leaf-scene div {background: url(/style/themeImg/Maple_Leaf"+imgNum+".png) 100% no-repeat;background-size:100%;}</style>");	
		}else{
			headObj.append("<style>.leaf-scene div {background: url(/style/themeImg/SnowFlake"+imgNum+".png) 100% no-repeat;background-size:100%;}</style>");	
		}*/
	}
}
ThemeInit();
leaves.init();
leaves.render();