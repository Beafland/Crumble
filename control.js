/*global $*/
/*jshint browser:true, esnext:true*/
//AI mode
var beforeColi = [];
function collisionCheak(obj1, obj2, coliNumber) {
        
        //up || down coli
        //obj1 is the 'center' of collision
        var obj1_wid = obj1.width(),
            obj1_hei = obj1.height(),
            obj2_wid = obj2.width(),
            obj2_hei = obj2.height(),
            xDis = parseInt(obj2.css("left"), 10) - parseInt(obj1.css("left"), 10),
            yDis = parseInt(obj2.css("top"), 10) - parseInt(obj1.css("top"), 10),
            result = "";
        
        if (xDis >= -obj2_wid && xDis <= obj1_wid) {
            if (yDis >= -obj2_hei && yDis <= obj1_hei) {
                let store = beforeColi[coliNumber];
                beforeColi[coliNumber] = "";
                return store + "coli";
            } else if (yDis <= -obj2_hei) {
                result = "w";
            } else if (yDis >= obj1_hei) {
                result = "s";
            }
        }
        if (yDis >= -obj2_hei && yDis <= obj1_hei) {
            if (xDis <= -obj2_wid) {
                result = "a";
            }
            if (xDis >= obj1_wid) {
                result = "d";
            }
        }
        beforeColi[coliNumber] = result;
}

function randomNumberAtoB(a) {
    var result;
    a += 1;
    result = Math.floor(Math.random() * a);
    return result;
}
//AI mode

function game(){
    var world,trun = 1,st = false;
    function Control1() {
        this.x = 300;
        this.y = 100;
        this.health = 3800;
        this.healthMax = 3800;
        this.dir = "right";
        this.xspeed = 0;
        this.yspeed = 0;
        this.xacce = 0;
        this.yacce = 0;
        this.press = [false, false];//right left
        this.timer = [];
        this.walkSpeed = 4;
        this.jumpSpeed = 19;
        this.fallSpeed = 0;
        this.jumpChance = 2;
        this.fallTrue = false;
        this.cD = [true,true,true,true,true,true];//H J K L move
        this.damage = 183;
        this.shield = 0;
        this.fireDamage = 25;
        this.drone = 0;//how many drones you distroy by fire
        this.fireSize = 1;
        this.energy = 100;
        this.final = false;
        this.servant = false;
        this.name = "mage";
        this.prisoner = false;
        this.win = 0;
        this.man = $(".one");
        this.line = $(".oo");
        this.meteor = $(".meteor");
        this.shielding = $(".shielding");
        this.health0 = $(".h10");
        this.health1 = $(".h11");
        this.shield0 = $(".shield");
        this.cD1 = $(".q");
        this.cD2 = $(".v");
        this.cD3 = $(".e");
        this.cD4 = $(".r");
        this.enLine = $(".En1");
        var self = this;

        function control() {
        $(document).keydown(function (e) {
             //a,w,d,s      65,87,68,83
             //q,c,v,e,r      81,67,68,69,82
            //console.log(e.keyCode);
        if(self.cD[5] && st){
            if (e.keyCode === 65) {//move left
                if(!self.press[0]){
                    self.dir = "left";
                    self.press[0] = true;
                    clearInterval(self.timer[1]);
                    self.timer[0] = setInterval(function(){self.x -= self.walkSpeed;},20);
                }
            } else if(e.keyCode === 87){//jump
                jumping(mage);
            } else if(e.keyCode === 68){//move right
                if(!self.press[1]){
                    self.dir = "right";
                    self.press[1] = true;
                    clearInterval(self.timer[0]);
                    self.timer[1] = setInterval(function(){self.x += self.walkSpeed;},20);
                }
            } else if(e.keyCode === 66){//attack C
                if(self.cD[1]){
                    self.cD[1] = false;
                    self.man.css("background-image","url(img/mageAttack.png)");
                    self.shoot();
                    setTimeout(function(){self.cD[1] = true;},850);
                }
            } else if(e.keyCode === 67){//shield V
                if(self.cD[2]){
                    self.cD[2] = false;
                    self.shield += 400;
                    new Cd(8.00,self.cD2,"C");
                    setTimeout(function(){self.cD[2] = true;},8000);
                }
            } else if(e.keyCode === 88){//prisoner X
                if(self.cD[0]){
                    self.cD[0] = false;
                    self.man.css("background-image","url(img/magePrisoner.gif)");
                    MageAudio[11].play();
                    self.prisoner = true;
                    new Cd(8,self.cD1,"X");
                    setTimeout(function(){
                        self.prisoner = false;
                        mechanician.cD[5] = true;
                        },1200);
                    setTimeout(function(){self.cD[0] = true;},8000);
                    setTimeout(function(){
                        self.man.css("background-image","url(img/mage.png)");
                        },500);
                }
            } else if(e.keyCode === 86){//Meteor b
                if(self.cD[3]){
                    self.cD[3] = false;
                    self.cD[0] = false;
                    self.walkSpeed /= 2;
                    self.jumpChance = 0;
                    self.timer[3] = setInterval(function(){
                        if(self.fireDamage < 1750){
                            self.fireDamage += 75;
                            self.fireSize += 0.05;
                        } else {
                            self.fireDamage = 1775;
                        }
                        console.log(self.fireDamage);
                    },200);
                }
            } else if(e.keyCode === 81 && self.final) {//Servant
                MageAudio[8].play();
                setTimeout(function(){
                    MageAudio[9].play();
                },1700);
                self.final = false;
                self.servant = true;
                self.energy = 0;
                en = new Enemy();
                en.createEle();
                enymyMonster();
            }
        }
        });
        $(document).keyup(function(e){
            if(self.cD[5] && st){
                if(e.keyCode === 65){
                    self.press[0] = false;
                    clearInterval(self.timer[0]);
                } else if(e.keyCode === 68){
                   self.press[1] = false;
                    clearInterval(self.timer[1]);
                } else if(e.keyCode === 86){
                    if(self.cD[4]){
                        self.cD[4] = false;
                        self.cD[0] = true;
                        self.walkSpeed *= 2;
                        self.jumpChance = 2;
                        MageAudio[0].play();
                        meteor(self.dir,self.fireDamage,self.fireSize);
                        clearInterval(self.timer[3]);
                        new Cd(7,self.cD3,"V");
                        setTimeout(function(){
                            self.cD[3] = true;
                            self.cD[4] = true;
                        },7000);
                        self.man.css("background-image","url(img/mage.png)");
                    }
                } else if(e.keyCode === 66){
                    self.man.css("background-image","url(img/mage.png)");

                }
            }
        });
    }
    
    this.play = function(){
        if(self.dir === "left"){
            self.man.css("transform","scaleX(-1)");
        } else {
            self.man.css("transform","");
        }
        
        if(!self.cD[3] && self.cD[4]){
             self.man.css("background-image","url(img/mageFire.gif)");
        }
        
        if(self.fallTrue){
            gravity(mage);
        }
        
        if(self.shield > 0){
            self.shielding.css("left", self.x + "px");
            self.shielding.css("bottom", self.y + "px");
        } else {
            self.shielding.css("bottom", "-500px");
        }
        

        if(self.energy >= 100){
            self.final = true;
            self.cD4.css("background-color", "yellow");
        } else {
            self.cD4.css("background-color", "silver");
        }

        self.man.css("left", self.x + "px");
        self.man.css("bottom", self.y + "px");
        self.health0.css("width",(self.health /10) + "px");
        self.health1.css("width",(self.health /10) - (self.shield /10) + "px");
        self.shield0.css("width",(self.health /10)+ "px");
        self.enLine.css("width",self.energy * 4  + "px");
        mapChecker(mage);
    };
        
    this.shoot = function() {
        $("#bulletBox").append("<div id='mageBullet'></div>");
        let bullet = $("#mageBullet"),
            loopTime = 0,
            dir = 1,
            speed = 20;
        if (self.dir === "left") {
            speed *= -1;
            dir = -1;
        }
        bullet.css("bottom", self.y + 40 + "px");
        function draw() {
            bullet.css("left", self.x + 25 + loopTime * speed);
            if (collisionCheak(mechanician.man, bullet, 202) === "coli") {//202 is the collision check number. the next shoot function can use 203
                bullet.remove();
                mechanician.health -= self.damage;
                self.energy += 4;
                let x = randomNumberAtoB(3);
                if(x === 1){
                    MechAudio[7].play();
                } else if(x === 2){
                    MechAudio[8].play();
                } else {
                    MechAudio[9].play();
                }
                if(mage.dir === mechanician.dir){
                    blood(mechanician, 1, 4, 5, -4);
                } else {
                    blood(mechanician, 1, 4, 5, 4);
                }
                return;
            }

            loopTime += 1;
            
            if (loopTime >= 30) {
                bullet.remove();
                return;
            }
            setTimeout(function() {
                draw();
            }, 10);//we can change this number as 1, to make it fastest. after that we can change the element color to be 透明 so that it will not effect. add another element if you want effect;
        }
        draw();
    };
    
    function meteor(dir,damage,size){
        var fire = this;
        this.drone = 0;
        this.y = self.y;
        if(dir === "left"){
            this.x = self.x - 100;
            self.meteor.css("transform","scaleX(-1)");
            setTimeout(function(){self.meteor.css("transform","");},3000);
        } else{
            this.x = self.x + 40;
        }
        this.loop = function(){
            if(dir === "left"){
                fire.x -= 6;
            } else {
                fire.x += 6;
            }
            console.log(fire.x,fire.y);
            if(collisionCheak(mechanician.man,self.meteor,203) === "coli"){
                mechanician.health -= Math.floor(damage + 25);
                clearInterval(self.timer[2]);
                self.energy += Math.ceil(damage / 50);
                if(mage.dir === mechanician.dir){
                    blood(mechanician, 1, Math.ceil(damage / 40), Math.ceil(damage / 200), -Math.ceil(damage / 200));
                } else {
                    blood(mechanician, 1, Math.ceil(damage / 40), Math.ceil(damage / 200), Math.ceil(damage / 200));
                }
                let x = randomNumberAtoB(3);
                if(x === 1){
                    MechAudio[7].play();
                } else if(x === 2){
                    MechAudio[8].play();
                } else {
                    MechAudio[9].play();
                }
                MageAudio[1].play();
                setTimeout(function(){
                self.meteor.css("bottom",-1000 + "px");
                self.meteor.css("bottom",-1000 + "px");},100);
            }
            
            if(self.drone === 2){
                clearInterval(self.timer[2]);
                setTimeout(function(){
                self.meteor.css("bottom",-1000 + "px");
                self.meteor.css("bottom",-1000 + "px");},100);
                self.drone = 0;
            }
            
            self.meteor.css("left",fire.x + "px");
            if((-200 - 135 * size) >= fire.x || (1700 + 135 * size)<= fire.x){
                clearInterval(self.timer[2]);
                self.meteor.css("bottom",-1000 + "px");
            }
        };
        self.timer[2] = setInterval(fire.loop,3);
        self.fireDamage = 25;
        self.meteor.css("bottom",fire.y + 67.5 - 67.5 * size + "px");
        self.meteor.css("width",(135 * size) + "px");
        self.meteor.css("height",(110 * size) + "px");
        self.fireSize = 1;
    }
    control();
    }

    function Control2() {
        this.x = 1200;
        this.y = 100;
        this.health = 4000;
        this.healthMax = 4000;
        this.dir = "left";
        this.xspeed = 0;
        this.yspeed = 0;
        this.xacce = 0;
        this.yacce = 0;
        this.press = [false, false];
        this.timer = [];
        this.walkSpeed = 5;
        this.jumpSpeed = 20;
        this.fallSpeed = 0;
        this.jumpChance = 2;
        this.fallTrue = false;
        this.cD = [true,true,true,true,true,true];//crazy attack flash grenade1 grenade2 move
        this.damage = 200;
        this.grenadeSpeed = 0;
        this.aS = 450;
        this.crazy = false;
        this.energy = 100;
        this.final = false;
        this.win = 0;
        this.name = "mechanician";
        this.man = $(".two");
        this.line = $(".tt");
        this.health0 = $(".h20");
        this.health1 = $(".h21");
        this.cD1 = $(".u");
        this.cD2 = $(".o");
        this.cD3 = $(".p");
        this.cD4 = $(".l");
        this.enLine = $(".En2");
        var you = this;

        function control() {
        $(document).keydown(function (e) {
             //left up right down   37,38,39,40
            //u,i,o,p,l   85,73,79,80,76
        if(you.cD[5] && st){
            if (e.keyCode === 37) {//move left
                if(!you.press[0]) {
                    you.dir = "left";
                    you.press[0] = true;
                    clearInterval(you.timer[1]);
                    you.timer[0] = setInterval(function(){you.x -= you.walkSpeed;},20);
                }
            } else if(e.keyCode === 38){//jump
                jumping(mechanician);
            } else if(e.keyCode === 39){//move right
                if(!you.press[1]){
                    you.dir = "right";
                    you.press[1] = true;
                    clearInterval(you.timer[0]);
                    you.timer[1] = setInterval(function(){you.x += you.walkSpeed;},20);
                }
            } else if(e.keyCode === 191){//attack ,
                if(you.cD[1]){
                    you.cD[1] = false;
                    you.line.css("bottom",you.y + 15 + "px");  
                    if(you.dir === "right"){
                        you.line.css("left",you.x + 60 +"px");    
                        you.line.css("transform","scaleX(-1)");
                    }  else {
                        you.line.css("left",(you.x - 200) +"px");   
                        you.line.css("transform","scaleX(1)");
                    }
                    if(you.crazy){
                        MechAudio[12].play();
                    } else {
                        MechAudio[11].play();
                    }
                    setTimeout(function(){you.line.css("bottom", "0px");},10);
                    hit();
                    setTimeout(function(){you.cD[1] = true;},you.aS);
                }
            } else if(e.keyCode === 188){//flash .
                if(you.cD[2]){
                    MechAudio[4].play();
                    you.cD[2] = false;
                    flash();
                    new Cd(1.2,you.cD2,",");
                    setTimeout(function(){you.cD[2] = true;},1200);
                }
            } else if(e.keyCode === 77){//crazy
                if(you.cD[0]){
                    you.cD[0] = false;
                    MechAudio[1].play();
                    crazy();
                    new Cd(6,you.cD1,"M");
                    setTimeout(function(){you.cD[0] = true;},6000);
                }
            } else if(e.keyCode === 76 && you.final) {//machineKiller
                MechAudio[2].play();
                you.final = false;
                you.energy = 0;
                killerMachineArr[killerMachineArr[killerMachineArr.length]] = new KillerMachine(you.x, 500 - you.y);
                setTimeout(function() {
                    killerMachineArr[killerMachineArr[killerMachineArr.length]] = new KillerMachine(you.x, 500 - you.y);
                }, 500);setTimeout(function() {
                    killerMachineArr[killerMachineArr[killerMachineArr.length]] = new KillerMachine(you.x, 500 - you.y);
                }, 1000);setTimeout(function() {
                    killerMachineArr[killerMachineArr[killerMachineArr.length]] = new KillerMachine(you.x, 500 - you.y);
                }, 1500);
                setTimeout(function() {
                    killerMachineArr[killerMachineArr[killerMachineArr.length]] = new KillerMachine(you.x, 500 - you.y);
                }, 2000);
            } else if(e.keyCode === 190){//Grenade
                if(you.cD[3]){
                    you.cD[3] = false;
                    you.timer[2] = setInterval(function(){
                        let x = you.grenadeSpeed;
                        if(you.dir === "left" && x > 0){
                            x *= -1;
                        }
                        x *= 9;
                        x += you.man.offset().left -70;
                        you.grenadeSpeed += 1;
                        if (you.grenadeSpeed >= 120) {
                            you.grenadeSpeed = 120;
                        }//finalchange
                        $("#speedTip").css("left", x);
                    },20);
                }
            }
        }
        });
        $(document).keyup(function(e){
            if(you.cD[5] && st){
                if(e.keyCode === 37){
                    you.press[0] = false;
                    clearInterval(you.timer[0]);
                } else if(e.keyCode === 39){
                    you.press[1] = false;
                    clearInterval(you.timer[1]);
                } else if(e.keyCode === 190){
                    if(you.cD[4]){
                        MechAudio[5].play();
                        you.cD[4] = false;
                        comboShoot = new ComboShoot(you.grenadeSpeed);
                        you.grenadeSpeed = 0;
                        new Cd(8,you.cD3,".");
                        clearInterval(you.timer[2]);
                        setTimeout(function(){
                            $("#speedTip").css("left", "-500px");
                        },200);
                        setTimeout(function(){
                            you.cD[4] = true;
                            you.cD[3] = true;
                        },8000);
                    }
                }
            }
        });
    }
         
    function hit(){
        var dam = you.damage;
        if(collisionCheak(mage.man,you.line,400) === "coli"){
            if(you.dir === "left"){
                dam -= Math.ceil(you.x - mage.x);
            } else {
                dam -= Math.ceil(mage.x - you.x - 50);
            }

            you.energy += Math.ceil(dam / 20);
            if(mage.dir === mechanician.dir){
                blood(mage, 1, Math.ceil(dam / 40), Math.ceil(dam / 35), -Math.ceil(dam / 35));
            } else {
                blood(mage, 1, Math.ceil(dam / 40), Math.ceil(dam / 35), Math.ceil(dam / 35));
            }
            if(dam > 150){
                let x = randomNumberAtoB(3);
                if(x === 1){
                    MageAudio[2].play();
                } else if(x === 2){
                    MageAudio[3].play();
                } else {
                    MageAudio[4].play();
                }
            }
            mage.shield -= dam;
            if(mage.shield < 0){
                console.log(dam);
                mage.health += mage.shield;
                mage.shield = 0;
            }
        }
        if(mage.servant && collisionCheak(en.man,you.line,401) === "coli"){
            en.beDamaged(you.damage - Math.ceil(you.x - en.x));
            blood(en, 1, 5, 5, 5);
        }
    }
        
        this.play = function(){
            if(you.dir === "right"){
                you.man.css("transform","scaleX(-1)");
            } else {
                you.man.css("transform","");
            }
            
            if((you.press[0] || you.press[1]) && !you.fallTrue && !you.crazy){
                you.man.css("background-image","url(img/mechanicianMove.gif)");
            } else if(you.fallTrue && !you.crazy){
                you.man.css("background-image","url(img/mechanicianJump.gif)");
            } else if(!you.press[0] && !you.press[1] && !you.fallTrue && !you.crazy){
                you.man.css("background-image","url(img/mechanician.png)");
            }else if((you.press[0] || you.press[1]) && !you.fallTrue && you.crazy){
                you.man.css("background-image","url(img/crazy/mechanicianMove.gif)");
            } else if(you.fallTrue && you.crazy){
                you.man.css("background-image","url(img/crazy/mechanicianJump.gif)");
            } else if(!you.press[0] && !you.press[1] && !you.fallTrue && you.crazy){
                you.man.css("background-image","url(img/crazy/mechanician.png)");
            }
            
            if(mage.prisoner && !you.crazy){
                you.man.css("background-image","url(img/mechanicianPrisoner.png)");
                you.cD[5] = false;
                clearInterval(you.timer[0]);
                clearInterval(you.timer[1]);
            } else if(mage.prisoner && you.crazy){
                you.man.css("background-image","url(img/crazy/mechanicianPrisoner.png)");
                you.cD[5] = false;
                clearInterval(you.timer[0]);
                clearInterval(you.timer[1]);
            }
            
            if(you.fallTrue){
                gravity(mechanician);
            }
            
            if(you.energy >= 100){
                you.final = true;
                you.cD4.css("background-color", "yellow");
            } else {
                you.cD4.css("background-color", "silver");
            }
            
            you.man.css("left",you.x + "px");
            you.man.css("bottom",you.y + "px");
            you.health0.css("width",you.health /10 + "px");
            you.health1.css("width",you.health /10 + "px");
            you.enLine.css("width",you.energy * 4  + "px");
            mapChecker(mechanician);
        };
        
        function flash(){
            if(you.dir === "right"){
                you.x += 180;
            } else {
                you.x -= 180;
            }
        }
    
    function crazy(){
        blood(mechanician, 2, 7, 6, 6);
        you.crazy = true;
        you.damage *= 1.5;
        you.jumpSpeed *= 1.5;
        you.walkSpeed *= 1.5;
        you.aS /= 2;
        you.health -= you.health * 0.2;
        setTimeout(function(){
            you.crazy = false;
            you.damage = 200;
            you.jumpSpeed = 20;
            you.walkSpeed = 10;
            you.aS =300;
        },3000);
    }
        control();
    }

    function Cd(time,target,press){
        var timer;
        target.css("background-color","silver");
        target.html(time);
        if(time > 10){
            timer = setInterval(function(){
            if(time > 10){
                time -= 1;
                target.html(time);
            } else {
                clearInterval(timer);
                clock();
            }},1000);
        } else {
            clock();
        }
        function clock(){
            timer = setInterval(function(){
                if(time != 0.1){
                    time = (time -= 0.1).toFixed(1);
                    target.html(time);
                } else {
                    target.html(press);
                    target.css("background-color","aqua");
                    clearInterval(timer);
                }
            },100);
        }
    }

    function jumping(check){
        if(check.jumpChance === 2){
            check.jumpChance -= 1;
            check.fallTrue = true;
            check.fallSpeed = check.jumpSpeed;
        } else if(check.jumpChance === 1){
            check.jumpChance -= 1;
            check.fallSpeed = check.jumpSpeed;
        }
    }

    function mapChecker(check){
        if(check.y == 350 && check.x >= 360 && check.fallSpeed === 0){
            check.fallTrue = true;
            check.jumpChance = 1;
        } else if(check.y == 450 && check.x <= 1020 && check.fallSpeed === 0 ){
            check.fallTrue = true;
            check.jumpChance = 1;
        } else if(check.y == 450 && check.x >= 1430 && check.fallSpeed === 0 ){
            check.fallTrue = true;
            check.jumpChance = 1;
        } else if(check.x <= -25){
            check.x = -25;
        } else if(check.x >= 1450){
            check.x = 1450;
        } else if(check.y >= 680){
            check.fallSpeed = -1;
        } else if(check.x >= 1260 && check.x <= 1320 && check.y >= 450 && check.y <= 600){
            medical(check,2);
        } else if(check.x >= 155 && check.x <= 210 && check.y >= 100 && check.y <= 150){
            medical(check,1);
        }
    }

    function gravity(jump){
            jump.fallSpeed -= 1;
            jump.y += jump.fallSpeed;
            if(jump.fallSpeed < 0){
                if(jump.y <= 100){
                    jump.fallTrue = false;
                    jump.jumpChance = 2;
                    jump.fallSpeed = 0;
                    jump.y = 100;
                } else if(jump.y >= 320 && jump.y <= 350 && jump.x <= 360){
                    jump.fallTrue = false;
                    jump.jumpChance = 2;
                    jump.fallSpeed = 0;
                    jump.y = 350;
                } else if(jump.y >= 420 && jump.y <= 450 && jump.x > 1020 && jump.x < 1430){
                    jump.fallTrue = false;
                    jump.jumpChance = 2;
                    jump.fallSpeed = 0;
                    jump.y = 450;
                }
            }
    }
    
    function energy(){
        if(!mage.final && mage.energy !== 100 && !mage.servant && st){
            mage.energy += 1;
        }
        
        if(!mechanician.final && mechanician.energy !== 100 && st){
            mechanician.energy += 1;
        }
        setTimeout(function(){energy();},1500);
    }
    
    function medical(check,num){
        if(check.health !== check.healthMax){
            if(num === 1 && healing[0]){
                healAudio[0].play();
                healing[0] = false;
                $bottle.css("opacity","0");
                if(check.health + 400 > check.healthMax){
                    check.health = check.healthMax;
                } else {
                    check.health += 400;
                }
                setTimeout(function(){
                    healing[0] = true;
                    $bottle.css("opacity","1");
                },6000);
            } else if(num === 2 && healing[1]){
                healAudio[0].play();
                healing[1] = false;
                $kit.css("opacity","0");
                if(check.health + 800 > check.healthMax){
                    check.health = check.healthMax;
                } else {
                    check.health += 800;
                }
                setTimeout(function(){
                    healing[1] = true;
                    $kit.css("opacity","1");
                },15000);
            }
        }
    }

    function draw(){
        mage.play();
        mechanician.play();
        if(mage.servant){
            enymyMonster();
        }
        if(mage.health <= 0){
            setTimeout(function(){
            MageAudio[5].play();},2500);
            MechAudio[10].play();
            death(mechanician);
        } else if(mechanician.health <= 0){
            MageAudio[6].play();
            setTimeout(function(){
            MechAudio[6].play();},2500);
            death(mage);
        }
    }

    function death(who){
        bgm[0].pause();
        st = false;
        trun += 1;
        who.win += 1;
        mage.energy = 0;
        mechanician.energy = 0;
        if(who.name === "mage"){
            $(".Ma").css("display","inline-block");
        } else {
            $(".Me").css("display","inline-block");
        }
        clearInterval(world);
        if(mage.servant){
            en.alive = false;
        }
        $winner.html("<p>"+ who.name + " win!</p>");
        $gg.show();
        
        if(who.win !== 2){
             setTimeout(function(){
                $gg.hide();
                round();
            },5500);
        } else {
            $winner.css("color","red");
            $replay.show();
        }
    }
     
    function round(){
        bgm[0].play();
        comboShoot = new ComboShoot(0);
        comboShoot.boom();
        $start.show();
        roundAudio[trun - 1].play();
        $start.html("<p>Round " + trun + " </p>");
        setTimeout(function(){
            roundAudio[3].play();
            $start.html("<p>Fight!</p>");
        },2000);
        setTimeout(function(){
            $start.hide();
            mage.energy = 0;
            mechanician.energy = 0;
            st = true;
            world = setInterval(draw,15);
        },3000);
        if(trun === 3){
            mage.x = 300;
            mage.dir = "right";
            mechanician.x = 1200;
            mechanician.dir = "left";
        } else if(trun === 2){
            mage.x = 1200;
            mage.dir = "left";
            mechanician.x = 300;
            mechanician.dir = "right";
        }
        mage.health = mage.healthMax;
        mechanician.health = mechanician.healthMax;
        mage.shield = 0;
        mage.final = false;
        mechanician.final = false;
        mechanician.y = 100;
        mechanician.walkSpeed = 5;
        mage.y = 100;
    }
    
    var mage = new Control1(),
        mechanician = new Control2(),
        $gg = $(".gg"),
        $start = $(".start"),
        $replay = $(".replay"),
        $kit = $(".kit"),
        $bottle = $(".bottle"),
        $winner = $(".winner"),
        healing = [true,true],
        healAudio = $(".healAudio"),
        MageAudio = $(".MageAudio"),
        MechAudio = $(".MechAudio"),
        bgm = $(".BGM"),
        roundAudio = $(".roundAudio");
   
    energy();
    $gg.hide();
    $start.hide();
    $replay.hide();
    $replay.click(function(){
        location.reload();
    });
    round();
    
    $("#aiBox").append("<div id='iceShoot'></div>");
    $("#aiBox").append("<div id='boomShoot'></div>");
    var comboShoot;
    function ComboShoot(getSpeed) {//back3
        this.have = $("#iceShoot");
        this.x = mechanician.man.offset().left - 90;
        this.y = mechanician.man.offset().top + 30;
        this.coliCheakNumber = 300;//use 300 to check ice, use 301 to check boom
        this.xspeed = getSpeed * 0.2;
        this.yspeed = -20;
        this.xacce = 0;
        this.yacce = 1;
        this.effectNumber = randomNumberAtoB(3);//effectNumber is a random number from 0 to 3;

        this.alive = true;
        this.degree = 0;
        var self = this;
        self.have.show();
        if (mechanician.dir === "left") {
            self.xspeed *= -1;
        }
        self.have.css("background-image", "url(img/steve.art/grenade" + self.effectNumber + ".png)");

        this.attack0 = function() {//bleeding 300 dmg
            blood(mage, 12, 5, 5, 5);
            let n = 0;
            let timer = setInterval(function() {
                //changed
                if (mage.shield > 0) {
                    mage.shield -= 2;
                } else {
                    mage.health -= 2;
                }
                //!
                n += 1;
                if (n === 300) {
                    clearInterval(timer);
                }
            }, 20);

        };

        this.boom = function() {
            if(st){
                MechAudio[0].play();
            }
            self.have.css("transition", "0.1s");
            self.have.css("filter", "opacity(0.5)");
            self.have.css("width", "200px");
            self.have.css("height", "200px");
            self.xspeed = 0;
            self.xacce = 0;
            self.x -= 100;
            self.y -= 100;
            self.have.css("left", self.x + "px");
            self.have.css("top", self.y + "px");
            setTimeout(function() {
                self.alive = false;
                self.x = 0;
                self.y = 0;
                self.have.hide();
                self.have.css("transition", "none");
                self.have.css("filter", "opacity(1)");
                //changed: 30px to 60px, 60 to 30, 30 to 45
                self.have.css("width", "45px");
                self.have.css("height", "45px");
            }, 100);
        };
        this.attack1 = function() {//ban jump 100 dmg
            blood(mage, 3, 10, 3, 3);
            if (mage.shield > 0) {
                mage.shield -= 500;
            } else {
                mage.health -= 500;
            }
            if (mage.shield < 0) {
                mage.health += mage.shield;
                mage.shield = 0;
            }
            let no = mage.walkSpeed,
                yes = mechanician.walkSpeed;
            mage.walkSpeed *= 0.5;
            mechanician.walkSpeed *= 1.8;
            mage.jumpChance = 0;
            setTimeout(function() {
                mage.walkSpeed = no;
                mechanician.walkSpeed = yes;
                mage.jumpChance = 2;
            }, 3000);
        };

        this.attack2 = function() {//-700 + 500
            blood(mage, 3, 10, 3, 3);
            if (mage.shield > 0) {
                mage.shield -= 1400;
            } else {
                mage.health -= 1400;
            }
            if (mage.shield < 0) {
                mage.health += mage.shield;
                mage.shield = 0;
            }

            setTimeout(function() {
                mage.health += 500;
                if (mage.health >= 3800) {
                    mage.health = 3800;
                }
            }, 6000);

        };

        this.attack3 = function() {//give out healing
            var atk3loopTime = 0;
            blood(mage, 5, 5, 5, 3);
            function atk3loop() {

                if (mage.shield > 0) {
                    mage.shield -= 60;
                } else {
                    mage.health -= 60;
                }
                if (mage.shield < 0) {
                    mage.health += mage.shield;
                    mage.shield = 0;
                }
                for (let n = 0; n <= randomNumberAtoB(3); n +=1) {
                    fireContainer[fireContainer.length] = new TinyFire(mage.x, 600 - mage.y, fireContainer.length, "B");
                }
                atk3loopTime += 1;
                if (atk3loopTime >= 10) {
                    return;
                }
                setTimeout(function() {
                    atk3loop();
                }, 100);
            }
            atk3loop();
        };
        
        this.hit = function(situation) {
            if (situation === "ground" && st) {
                for (let n = 0; n <= randomNumberAtoB(50); n +=1) {
                    fireContainer[fireContainer.length] = new TinyFire(self.x + 100, self.y + 70, fireContainer.length, "B");
                }
            }
            if (situation === "mage" && st) {
                if (self.effectNumber === 0) {
                    self.attack0();
                } else if (self.effectNumber === 1) {
                    self.attack1();
                } else if (self.effectNumber === 2) {
                    self.attack2();
                } else {
                    self.attack3();
                }
                if (st) {
                    MechAudio[0].play();
                }
                mechanician.energy += 23;
                self.x = 0;
                self.y = 0;
                self.have.hide();
                self.alive = false;
            }
            if (situation === "servant" && st) {
                mechanician.energy += 15;
                en.beDamaged(500);
                blood(en, 1, 10, 10, 9);
                self.x = 0;
                self.y = 0;
                self.have.hide();
                self.alive = false;
            }
            
        };
        
        this.draw = function() {
            if (self.xspeed > 0) {
                self.degree += 5;
            } else {
                self.degree -= 5;
            }
            
            self.have.css("transform", "rotate(" + self.degree + "deg)");
            if (collisionCheak(mage.man, self.have, 303) === "coli") {
                self.hit("mage");
            }
            if (collisionCheak($(".ground"), self.have, 304) === "wcoli") {
                self.xspeed *= 0.6;
                if (self.yspeed <= 5) {
                    self.yspeed = 0;
                    self.yacce = 0;
                    setTimeout(function() {
                        self.xacce = 0;
                        self.xspeed = 0;
                    }, 700);
                } else {
                    self.yspeed *= - 0.6;
                }
            }
            if (en !== undefined) {
                if (en.alive) {
                    if (collisionCheak(en.man, self.have, 305) === "coli") {
                        self.hit("servant");
                    }   
                }
            }
            self.x += self.xspeed;
            self.xspeed += self.xacce;
            self.y += self.yspeed;
            self.yspeed += self.yacce;
            self.have.css("left", self.x + "px");
            self.have.css("top", self.y + "px");
            
            if (self.x <= 10 || self.x >= 1450) {
                
                self.xspeed *= -1;
            }
        };
        function loop() {
            
            if (!self.alive) {
                return;
            }
            self.draw();
            setTimeout(function() {
                loop();
            }, 15);
        }
        loop();
        setTimeout(function() {
            if (!self.alive) {
                return;
            }
            self.boom();
            self.hit("ground");
        }, 2000);
    }
    
    //Mechanician L skill///////////////////////////////////////////////////////////////////////////
    var machinePopulation = 0;
    function KillerMachine(setx, sety) {
        var self = this;
        this.x = setx;
        this.y = sety;
        this.xspeed = 0;
        this.yspeed = 0;
        this.xacce = 0;
        this.yacce = 1;
        this.xMaxSpeed = 10;
        this.tarPlayer = mage;
        this.number = machinePopulation + 10000;
        this.air = true;
        this.jumpChance = 0;
        this.isStop = false;
        this.alive = true;
        this.health = 360;
        
        
        setTimeout(function() {
            self.disapare();
        }, 8000);
        
        this.createEle = function() {
            $("#aiBox").append("<div class = 'killerM killerM" + machinePopulation + "'></div>");//the class 'killerM' is used to mark every machines.
            $("#aiBox").append("<div class = 'machineHealth' id='machineHealth" +  machinePopulation + "'></div>");
            $("#aiBox").append("<div class = 'machHealContainer' id = 'machHealContainer" + machinePopulation + "'></div>");
            self.man = $($(".killerM" + machinePopulation));
            self.healthEle = $("#machineHealth" + machinePopulation);
            self.healthContainEle = $("#machHealContainer" + machinePopulation);
            machinePopulation += 1;
        };
        this.createEle();
        
        this.damage = function() {
            if (collisionCheak(self.tarPlayer.man, self.man, 50000 + self.number) === "coli") {
                mage.shield -= 800;
                if(mage.shield < 0){
                    self.tarPlayer.health += mage.shield;
                    mage.shield = 0;
                }
                self.disapare();
            }
        };
        
        this.beDamaged = function(getDamage) {
            self.health -= getDamage;
            self.healthEle.css("width", self.health / 3.6 + "px");
            if (self.health <= 0) {
                self.disapare();
            }
        };
        
        
        this.jump = function() {
            if (self.jumpChance === 0) {
                return "";
            }
            if (mage.y > 300) {
                self.yspeed = -35;
            } else {
                self.yspeed = -30;    
            }
            if (mage.y > 400) {
                self.yspeed = -40;
            }
            self.yacce = 2;
            self.jumpChance = 0;
        };
        
        this.disapare = function() {
            if(st){
                let x = randomNumberAtoB(3);
                if(x === 1){
                    MageAudio[2].play();
                } else if(x === 2){
                    MageAudio[3].play();
                } else {
                    MageAudio[4].play();
                }
                MechAudio[3].play();
                MechAudio[13].pause();
            }
            self.healthEle.remove();
            self.man.remove();  
            self.healthContainEle.remove();
            self.alive = false;
        };
        
        this.stop = function() {
            if (self.jumpChance === 0) {
                return "";
            }
            self.jumpChance = 0;
            self.xMaxSpeed = 0;
            self.man.css("width", "40px");
            self.man.css("border-radius", "100px");
            self.man.css("transition", "0.5s");
            self.isStop = true;
            setTimeout(function() {
                self.jumpChance = 1;
                self.xMaxSpeed = 10;
                self.man.css("width", "80px");
                self.man.css("border-radius", "0px");
                self.man.css("transition", "none");
                self.isStop = true;
            }, 800);
        };
        
        
        this.fall = function() {
            if (collisionCheak($($(".ground")[0]), self.man, 201) === "wcoli") {
                self.yspeed = 0;
                self.yacce = 0;
                self.jumpChance = 1;
                self.y = parseInt($($(".ground")[0]).css("top"), 10) - self.man.height() - 1;
            }  
        };
        
        this.draw = function() {
            self.damage();
            self.fall();
            self.chase();
            self.x += self.xspeed;
            self.xspeed += self.xacce;
            self.y += self.yspeed;
            self.yspeed += self.yacce;
            if (self.x <= 10 || self.x >= 1450) {
                self.xspeed *= -1;
            }
            self.man.css("left", self.x + "px");
            self.man.css("top", self.y + "px");
            self.healthEle.css("left", self.x - 10 + "px");
            self.healthEle.css("top", self.y - 15 + "px");
            self.healthContainEle.css("left", self.x - 11 + "px");
            self.healthContainEle.css("top", self.y - 16 + "px");
        };
        this.chase = function() {
            if (self.x < self.tarPlayer.x) {
                self.xacce = 0.2;
            } else {
                self.xacce = -0.2;
            }
            if (self.xspeed > self.xMaxSpeed) {
                self.xspeed = self.xMaxSpeed;
            } else if (self.xspeed < -self.xMaxSpeed) {
                self.xspeed = -self.xMaxSpeed;
            }
        };
        
        this.beHitten = function() {
            if (collisionCheak(self.man, $("#mageBullet"), self.number + 10000)) {
                $("#mageBullet").remove();
                self.beDamaged(mage.damage);
            } else if(collisionCheak(self.man, mage.meteor, self.number + 700)){
                self.disapare();
                mage.drone += 1;
            }
        };
        
        function loop() {
            MechAudio[13].play();
            if (!self.alive) {
                return;
            }
            self.beHitten();
            if (randomNumberAtoB(50) === 1) {
                self.jump();
            }
            if (randomNumberAtoB(100) === 1) {
                self.stop();
            }
            
            self.draw();
            setTimeout(function() {
                loop();
            }, 15);
        }
        loop();
    }
    var killerMachineArr = [];
    
    //killerLoop();    
    
    //Mechanician L skill///////////////////////////////////////////////////////////////////////////
    
    
    
    
    //Mage R skill//////////////////////////////////////////////////////////////////////////////////
    var enymyPopulation = 0;//this variable is used to count the number of enymies
    var fireContainer = [];
    function TinyFire(getx, gety, fireNum, type) {
        if (type === "B") {
            this.x = getx;
            this.y = gety;
        } else {
            this.x = getx + en.man.width()/2;
            this.y = gety + en.man.height()/2;
        }
        
        this.tarx = mechanician.x;
        this.tary = mechanician.y;
        this.xdis = this.tarx - this.x;
        this.ydis = this.tary - this.y;
        this.xspeed = this.xdis/40;
        this.yspeed = -randomNumberAtoB(40);
        this.yacce = 1;
        this.damage = 200;
        var self = this,
            number = fireNum;
        
        $("#fireBox").append("<div class='fireBlock fire" + number + "'></div>");
        this.man = $($(".fire" + fireNum)[0]); 
        
        
        if (type === "B") {
            self.damage = -100;
            self.man.css("background-color", "green");
        }
        
        
        this.draw = function() {
            if (self.x <= 10 || self.x >= 1450) {
                self.man.css("transform","scaleX(-1)");
                self.man.css("transform","rotate(110deg)");
                self.xspeed *= -1;
            }
            self.yspeed += self.yacce;
            self.x += self.xspeed;
            self.y += self.yspeed;
            self.man.css("left", self.x + "px");
            self.man.css("top", self.y + "px");
        };
        
        this.boom = function() {
            MageAudio[10].play();
            self.man.css("transition", "0.3s");
            self.man.css("filter", "opacity(0.5)");
            self.man.css("background-image","none");
            self.man.css("background-color", "rgb(109, 103, 136)");
            self.man.css("width", "200px");
            self.man.css("height", "200px");
            self.x -= 100;
            self.y -= 100;
            self.draw();
            setTimeout(function() {
                self.man.remove();
            }, 300);
        };
        
        this.loop = function() {
            self.draw();
            if (collisionCheak(mechanician.man, self.man, 300000 + number) === "coli") {
                mechanician.health -= self.damage;
                if (mechanician.health >= 4000) {
                    mechanician.health = 4000;
                }
                self.boom();
                return;
                
            }
            if (self.y > 570) {
                self.boom();
                    return;
                }
            setTimeout(function() {self.loop();}, 15);
        };
        this.loop();
        
    }
    //Mage R skill//////////////////////////////////////////////////////////////////////////////////
    function Enemy() {
        var self = this;
        this.trun = trun;
        this.x = mage.man.offset().left - 100;
        this.y = mage.man.offset().top - 50;
        this.xspeed = 0;
        this.yspeed = 0;
        this.xacce = 0;
        this.yacce = 0;
        this.xMaxSpeed = 1;
        this.master = mage;
        this.chasePoint = self.master.x - 100;
        this.tarPlayer = mechanician;
        this.shootTime = 10;
        this.reloadTime = 150;
        this.loopCount = 0;
        this.health = 1000;
        this.alive = true;
        this.dir = "left";
        
        mage.shield += 1000;
        $("#aiBox").append("<div id='servantHealth' class='servantData'></div>");
        $("#aiBox").append("<div id='servantHealthBox' class='servantData'></div>");
        this.containEle = $("#servantHealthBox");
        this.healthEle = $("#servantHealth");
        
        function heal() {
            if (!self.alive) {
                return;
            }
            mage.health += 180;
            if (mage.health > 3800) {
                mage.health = 3800;
            }
            setTimeout(function() {
                heal();
            }, 2000);
        }
        heal();
        
        this.beDamaged = function(getDamage) {
            self.health -= getDamage;
            self.healthEle.css("width", self.health / 10 + "px");
            if (self.health <= 0) {
                self.alive = false;
            }
        };
        
        this.chase = function() {
            if(self.master.dir === "left"){
                self.chasePoint = self.master.x + 150;
            } else {
                self.chasePoint = self.master.x - 100;
            }
            
            if(self.x <= self.chasePoint + 1 && self.x >= self.chasePoint - 1){
                self.xspeed = 0;
                if(self.x < self.tarPlayer.x){
                    self.man.css("transform","scaleX(1)");
                } else {
                    self.man.css("transform","scaleX(-1)");
                }
            } else if(self.x < self.chasePoint - 1){
                self.xspeed = 1;
                self.man.css("transform","scaleX(1)");
            } else if(self.x > self.chasePoint + 1){
                self.xspeed = -1;
                self.man.css("transform","scaleX(-1)");
            }
            if (self.xspeed > 0) {
                self.dir = "right";
            } else {
                self.dir = "left";
            }
        };
        
        
        
        this.damage = function() {
            if (collisionCheak(self.tarPlayer.man, self.man, 100) === "coli") {
                self.tarPlayer.health -= 5;
            }
        };
        
        this.fall = function() {
            if (collisionCheak($($(".ground")[0]), self.man, 200) === "wcoli") {
                self.yspeed = 0;
                self.yacce = 0;
                self.y = parseInt($($(".ground")[0]).css("top"), 10) - self.man.height() - 1;
            }
        };
        
        this.jump = function() {
            this.yspeed = -15;
            this.yacce = 1;
        };
        
        
        this.createEle = function() {
            $("#aiBox").append("<div class = 'enemy ene" + enymyPopulation + "'></div>");//the class 'ene' is used to mark every enymies.
            self.man = $($(".ene" + enymyPopulation));
        };
        this.draw = function() {
            self.healthEle.css("left", self.x - 10 + "px");
            self.healthEle.css("top", self.y - 30 + "px");
            self.containEle.css("left", self.x - 10 + "px");
            self.containEle.css("top", self.y - 30 + "px");
            self.damage();
            self.chase();
            self.x += self.xspeed;
            self.y += self.yspeed;
            self.yspeed += self.yacce;
            self.man.css("left", self.x + "px");
            self.man.css("top", self.y + "px");
        };
        
        this.larch = function() {
            self.loopCount += 1;
            if (self.loopCount < self.shootTime) {
                fireContainer[fireContainer.length] = new TinyFire(self.x, self.y, fireContainer.length);    
            }
            if (self.loopCount === self.reloadTime) {
                this.loopCount = 0;
            }
        };
        this.jump();
    }
    //Mage R skill//////////////////////////////////////////////////////////////////////////////////
    
    var en;
    function enymyMonster() {
        if (!en.alive) {
            if(en.trun === trun){
                MageAudio[7].play();
            }
            en.man.remove();
            en.healthEle.remove();
            en.containEle.remove();
            mage.servant = false;
            return;
        }
        if (randomNumberAtoB(80) === 1) {
            en.jump();
        }
        
        
        en.larch();
        en.fall();
        en.draw();
    }
    //mage R skill//////////////////////////////////////////////////////////////////////////////////
    
    var bloodArr = [],
        bloodNumber = 0;
    function Blood(getx, gety, getheight, getdistance) {
        this.x = getx;
        this.y = gety;
        this.xacce = 0;
        this.yacce = -1;
        this.xspeed = getdistance + randomNumberAtoB(getdistance);
        this.yspeed = getheight + randomNumberAtoB(getheight);
        this.number = bloodNumber;
        bloodNumber += 1;
        var self = this;
        $("#bloodBox").append("<div class='blood" + self.number + "'></div>");
        this.man = $(".blood" + self.number);
        
        this.draw = function() {
            self.x += self.xspeed;
            self.y += self.yspeed;
            self.yspeed += self.yacce;
            self.xspeed += self.xacce;
            self.man.css("left", self.x);
            self.man.css("bottom", self.y);
        };
        
        function loop() {
            self.draw();
            if (self.y <= 50) {
                setTimeout(function() {
                    self.man.remove();
                }, 8000 + randomNumberAtoB(2000));
                return;
            }
            setTimeout(function() {
                loop();
            }, 15);
        }
        loop();
    }
    function blood(chara, time, value, ygo, xgo) {
        var count = 0;
        function loop() {
            for (let n = 0; n < value; n += 1) {
                let inputx = -xgo;
                if (chara.dir === "left") {
                    inputx *= -1;
                }
                let yn = chara.y;
                if (chara === en) {
                    console.log("enemy");
                    yn = 600 - yn;
                }
                bloodArr[bloodArr.length] = new Blood(chara.x + 25, yn, ygo, inputx);
            }
            
            count += 1;
            if (count >= time) {
                
                return;
            }
            setTimeout(function() {
                loop();
            }, 500);
        }
        loop();
    }
    comboShoot = new ComboShoot(0);
    comboShoot.boom();
    comboShoot.boom();
}
$(window).ready(game());