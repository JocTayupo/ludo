class Ficha {
     constructor(group, box_id, position, goal , id, door, next_position = 0, final_route = false, in_game = 0 ){
          this.group = group;
          this.box = document.getElementById(box_id);
          this.position = position;
          this.goal = goal;
          this.id = id;/*id de laficha*/
          this.door = door;
          this.next_position = next_position;
          this.final_route = final_route;
          this.in_game = in_game;
          this.animation;
          this.ficha;
          this.incremento = 1;
          this.status;
     }

     createFicha(){
          this.ficha = document.createElement("div");
          this.ficha.classList.add('ficha');
          this.ficha.classList.add(this.group);
          this.ficha.id = this.id;
          this.box.appendChild(this.ficha);
     }
}

function animate(player){
     animacion = setInterval(function(){
     let hijos;
     let name;
           player.box.removeChild(player.ficha);
           if(player.position == player.door){
                player.final_route = true;
           }
           if(player.position == 52 && player.goal<52){
                player.position = 0;
           }
           player.position += player.incremento;
           player.box = player.final_route?  document.getElementById(`C-${player.position}-${player.group}`) : document.getElementById(`C-${player.position}`);

           hijos = player.box.childNodes;
           for (var i = 0; i < hijos.length; i++) {
           if(hijos[i].nodeName !="#text") //-- colision
              console.log(hijos[i].nodeName);
           };
           player.createFicha();
           if(player.box.id == player.goal|| player.position == player.next_position )
           {
                clearInterval(animacion);
           }
      },200);
 }



var animacion ;
var red_player = new Ficha('RO','C-1',1,56,'FC-1',51);
var green_player = new Ficha('VE','C-14',14,17,'FC-5',12);
var yellow_player = new Ficha('AM','C-27',27,30,'FC-9',25);
var blue_player = new Ficha('AZ','C-40',40,43,'FC-13',38);
var turno = 1;
var players = { 1:red_player,
               2:green_player,
               3:yellow_player,
               4:blue_player
          };




function main(){
     red_player.createFicha();
     green_player.createFicha();
     yellow_player.createFicha();
     blue_player.createFicha()

     /// dado
     document.getElementById('dado').addEventListener("click",function(){
          let dado = document.getElementById('dado');
          dado.classList.remove('dado-1');
          dado.classList.remove('dado-2');
          dado.classList.remove('dado-3');
          dado.classList.remove('dado-4');
          dado.classList.remove('dado-5');
          dado.classList.remove('dado-6');
          dado.classList.add('dado_animado');
          setTimeout(function(){
            let sorteo = parseInt(Math.random() * (7 - 1) + 1);
            console.log(sorteo);
            dado.classList.remove('dado_animado');
            dado.classList.add(`dado-${sorteo}`);
            if(players[turno].position + sorteo > 52 && turno > 1){
               players[turno].next_position = (players[turno].position+sorteo) - parseInt(52);
            }else{
                 players[turno].next_position = parseInt(players[turno].position) + sorteo;
            }
            animate(players[turno]);
            turno = turno < 4? turno += 1 : turno = 1;
          },400);

     });



}