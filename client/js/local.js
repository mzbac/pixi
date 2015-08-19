var renderer = new PIXI.WebGLRenderer($(document.body).width(), $(document.body).height());

// The renderer will create a canvas element for you that you can then insert into the DOM.
document.body.appendChild(renderer.view);

// You need to create a root container that will hold the scene you want to draw.
var stage = new PIXI.Container();

// This creates a texture from a 'bunny.png' image.
var map =new Map($(document.body).width(),$(document.body).height(),$(document.body).width(),$(document.body).height(),'/img/floorMap.jpg');
var texture = PIXI.Texture.fromImage('/img/bunny.png');
var bunny= new PIXI.Sprite( texture);
bunny.position.x=100;
bunny.position.y=100;
map.addChild(bunny);
// Add the bunny to the scene we are building.
stage.addChild(map);

// kick off the animation loop (defined below)
animate();

function animate() {
  // start the timer for the next animation loop
  requestAnimationFrame(animate);

  // each frame we spin the bunny around a bit


  // this is the main render call that makes pixi draw your container and its children.
  renderer.render(stage);
}
