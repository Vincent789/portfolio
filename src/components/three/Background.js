import * as THREE from "three";
import React, { useEffect, useState } from "react";
import { SepiaShader } from 'three/examples/jsm/shaders/SepiaShader.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
//ajoute un halo de lumière
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
//ajoute des stats de rendu (en fps par exemple)
//import Stats from 'https://unpkg.com/three@0.119.1/examples/jsm/libs/stats.module.js';
//module ciel
import { Sky } from 'three/examples/jsm/objects/Sky.js';
//module eau
import { Water } from 'three/examples/jsm/objects/Water.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import SimplexNoise from 'simplex-noise'
//tween
import * as TWEEN from '@tweenjs/tween.js'
import { Camera } from "three";
import {Howl, Howler} from 'howler';
import { useStore } from '../../State'

var compteur, gains;
var scene, camera, renderer, composer
var terrain, geometry, sun, road, water, model

var soundacc = new Howl({
  src: ['accel.mp3'],
  volume: 0.2
});

var vitesse = 0.5

var stars=[]
// trees
var arbre;

var offsetModifier = 0.001

var arbres = [];           
var echellearbres = 0.4;
// roadlines
var roadline;
var roadlines = [];

//immeubles
var immeublesA = [];
var immeublesB = [];     
/*  var seafront;
var seafront = []; */
// Il faut en gros que nombrearbres * distancearbres = départarbres sinon il y a des trous ou des arbres doublés.
var nombre = 15;
var distance = 12;
var depart = 100; 


var inGame = false;

var positionDepart;

var zrank = 100;

// coins
var coin;
var coins = [];

//phares
var phare1;
var phare2;
var phare3;
var phare4;
var phare5;
var phare6;
var phare1form;
var phare1material;
var phare2material;
var colorPhareAvant
var phareavantgauche;
var phareavantdroit;
var pharearrieregauche;
var pharearrieredroit;
var colorPhareArriere

//wheels
var cylinderwheel1;
var cylinderwheel2;
var cylinderwheel3;
var cylinderwheel4;

//bloom
const params = {
    exposure: 1,
    bloomStrength: 10,
    bloomThreshold: 10,
    bloomRadius: 1
};

/*Immeubles*/
class immeuble {
  constructor(color,positionDepart) {
    /* let W = getRandomInt(5)+1; let H = getRandomInt(10)+1; let D = getRandomInt(5)+1; */
    let W = IntegerBetween(4,6); let H = IntegerBetween(2,40); let D = IntegerBetween(4,6);
    this.boxGeometry = new THREE.BoxGeometry(W,H,D);
    this.boxMaterial = new THREE.MeshLambertMaterial({
      emissive: color,
      emissiveIntensity: 1
    });
    this.box = new THREE.Mesh(this.boxGeometry, this.boxMaterial);
    let HauteurBox = this.box.geometry.parameters.height;
    this.box.position.y = HauteurBox/2;
    this.box.position.z = positionDepart; //paramètre passé dans le constructeur
    this.box.rotation.y = (Math.PI * 45 / 180)*getRandomInt(3);
    this.box.position.x = (1+1)*(6+getRandomInt(3));
    return this.box;                          
    /* } */
  }
}

  function arrondi2d(nb)
  {
    return Math.round(nb*100)/100;
    /* return nb; */
  }

function IntegerBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function echelleArbres(){   
    /* return Math.max(getRandomInt(7)/10,0.4);  */
    return IntegerBetween(4,6)/10;
    //renvoie 0.4, 0.5 ou 0.6
  }

  function tweenSetX(model, value){
    var tween = new TWEEN.Tween(model.position)
    tween.to({x: value}, 1500)
    tween.easing(TWEEN.Easing.Exponential.Out);
    tween.start()
  }

  function tweenSetY(model, value){
    var tween = new TWEEN.Tween(model.position)
    tween.to({y: value}, 1500)
    tween.easing(TWEEN.Easing.Exponential.Out);
    tween.start()
  }

  function tweenSetZ(model, value){
    var tween = new TWEEN.Tween(model.position)
    tween.to({z: value}, 1500)
    tween.easing(TWEEN.Easing.Exponential.Out);
    tween.start()
  }
    
  function tweenSetRotY(model, value){
    var tween = new TWEEN.Tween(model.rotation)
    tween.to({y: value}, 1500)
    tween.easing(TWEEN.Easing.Exponential.Out);
    tween.start()
  }

  function tweenSetRotX(model, value){
    var tween = new TWEEN.Tween(model.rotation)
    tween.to({x: value}, 1500)
    tween.easing(TWEEN.Easing.Exponential.Out);
    tween.start()
  }
/*  function couleurImmeuble(){
    let base = 0, aleatoire = 255;
    let R = base + Math.floor(Math.random()*aleatoire);
    let G = base + Math.floor(Math.random()*aleatoire);
    let B = base + Math.floor(Math.random()*aleatoire);
    return  "rgb("+R+","+G+","+B+")";
    } */   
    
  function couleurImmeuble(){
    let R, G, B;
    do {
      R = Math.floor(Math.random()*255);
      G = Math.floor(Math.random()*255);
      B = Math.floor(Math.random()*255);
      }
    /* while (R + G + B < 0+0+255) */
    /* while ( R < 239 && G < 239 && B < 239 ) */
    while ( R < 247 && G < 247 && B < 247)
    return  "rgb("+R+","+G+","+B+")";
  }



var speed = 0.0008;


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const Perlin = require('./perlin.js').Perlin;
var perlin = new Perlin();
var peak = 7;
var smoothing = 40;

function randomIntervalNumber (interval, quantity) {
   let array = []
   for (let i = 0; i <= quantity-3; i ++) {       
    let number = interval*(0.5*i) / quantity
    array.push(number)
   }
   array.push(0, 0, 0)
   return array.reverse()
}
//console.log(randomIntervalNumber(2, 107))

function adjustVertices(terrain, offset, panela, panelb, modificator) {
    // WITH PERLIN
    var vertices = terrain.geometry.attributes.position.array;
    let scaler = randomIntervalNumber(1.4, Number(vertices.length))
    for (var i = 0; i <= vertices.length; i += 3) {
        vertices[i+2] = (peak*scaler[i]) * perlin.noise(
            ((terrain.position.x)*-offset + vertices[i])/smoothing, 
            ((terrain.position.z) + vertices[i+1])/smoothing
        );
    }
    terrain.geometry.attributes.position.needsUpdate = true;
    terrain.geometry.computeVertexNormals();
}

function Background(props) {

  //React states
  const [coinsVisible, setCoinsVisible] = useState(false);
  const [milliseconds, setMilliseconds] = useState(0);
  const [missedCounter, setMissedCounter] = useState(0);
  const [gobedCounter, setCobedCounter] = useState(0);

  //console.log("PROPSHERREE !!!! "+props.keyPressed)
  var key = props.keyPressed
  //var keyDrop = props.keyDrop
  console.log("ROTATION "+ props.cameraRotation)

  
  //console.log("PROPSHERREE !!!! "+props.secondKey)

  useEffect(() => {
        //console.log("KEY "+key)

        // Scene
        scene = new THREE.Scene();
        //scene.fog = new THREE.Fog(0x000000, 0, 100);

        // Camera
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera.position.set( -6, 0.9, 32.7 );
        
        camera.rotation.y = props.cameraRotation
        

        // Renderer
        const canvas = document.querySelector("#c");
        renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(
          window.innerWidth,
          window.innerHeight
        );
        renderer.setPixelRatio( window.devicePixelRatio/2 );
        //document.body.appendChild( renderer.domElement );

        const renderScene = new RenderPass( scene, camera );

        /*Sepia shaders & other needless effects*/
        const shaderSepia = SepiaShader;
        const effectSepia = new ShaderPass( shaderSepia );
        effectSepia.uniforms[ "amount" ].value = 0.5;
        const effectFilm = new FilmPass( 0.35, 0.025, 648, false );

        const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
        bloomPass.threshold = params.bloomThreshold;
        bloomPass.strength = params.bloomStrength;
        bloomPass.radius = params.bloomRadius;

        composer = new EffectComposer( renderer );
		    composer.addPass( renderScene );
        //composer.addPass( bloomPass );
        //composer.addPass( effectSepia );
        composer.addPass( effectFilm );

        //une vitesse pièce vitessepiece = vitesse

        /*
        const geometrytoto = new THREE.CylinderGeometry( 1, 1, 100, 40 );
        const materialtoto = new THREE.MeshPhysicalMaterial({roughness: 0.5, color: 0xe0d08d});
        const cylinder = new THREE.Mesh( geometrytoto, materialtoto );
        cylinder.rotation.x = Math.PI / 2;
        cylinder.position.x = -7.1;
        cylinder.position.y = -1;
        scene.add( cylinder );*/

        // road
        var roadGeometry = new THREE.PlaneGeometry( 3.4, 100, 32 );
        var roadMaterial = new THREE.MeshPhysicalMaterial( {roughness: 1, color: 0x000000, side: THREE.DoubleSide} );
        road = new THREE.Mesh( roadGeometry, roadMaterial );
        road.rotation.x = - Math.PI / 2;
        road.position.set(-5.8,-0.2,0);
        scene.add( road );

        // light helper
        var geometryhelper = new THREE.BoxGeometry( 1, 1, 1 );
        var materialhelper = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        var cubehelper = new THREE.Mesh( geometryhelper, materialhelper );
        cubehelper.position.z = 55
        cubehelper.position.x = -5.7
        scene.add( cubehelper );

        const muretgeo = new THREE.BoxGeometry( 5.5, 0.3, 100, 40);
        const muretmat = new THREE.MeshPhysicalMaterial({roughness: 0.5, color: 0x0d4226, reflectivity: 0.5, metalness:0.5});
        const muret = new THREE.Mesh( muretgeo, muretmat );
        scene.add( muret );
        muret.position.x = -1.5;

        
        const trottoirgeo = new THREE.BoxGeometry( 0.5, 0.2, 100, 40);
        const trottoirmat = new THREE.MeshPhysicalMaterial({roughness: 0.5, color: 0xc27502, reflectivity: 0.5, metalness:0.5});
        const trottoir = new THREE.Mesh( trottoirgeo, trottoirmat );
        scene.add( trottoir );
        trottoir.position.x = -7.4;
        trottoir.position.y = -0.1;

        // Sun
        sun = new THREE.Vector3()

        // Car lights
        colorPhareAvant = 0xf5b245
        phareavantdroit = new THREE.SpotLight( colorPhareAvant, 10, 30, -0.2 );
        phareavantdroit.position.set( -4.614, 0.3, 28.7);
        phareavantdroit.castShadow = true;
        scene.add( phareavantdroit );

        phareavantgauche = new THREE.SpotLight( colorPhareAvant, 20, 10, 1);
        phareavantgauche.position.set( -5.39, 0.3, 28.7);
        phareavantdroit.rotation.y = Math.PI/2
        phareavantgauche.castShadow = true;
        scene.add( phareavantgauche );
       
        colorPhareArriere = 0xff0000
         /*
        pharearrieredroit = new THREE.SpotLight( colorPhareArriere, 10, 30, -0.2 );
        pharearrieredroit.position.set( -4.614, 0.3, 30.7);
        pharearrieredroit.target = cubehelper;
        pharearrieredroit.castShadow = true;
        scene.add( pharearrieredroit );*/
        
        pharearrieregauche = new THREE.SpotLight( colorPhareArriere, 10, 10, 1);
        pharearrieregauche.position.set( -5, 0.3, 30.4);
        pharearrieregauche.power = 7*Math.PI
        pharearrieregauche.target = cubehelper;
        pharearrieregauche.castShadow = true;
        scene.add( pharearrieregauche );

        //light form
        phare1form = new THREE.PlaneGeometry ( 0.03, 0.15, 1, 1  );
        phare1material = new THREE.MeshLambertMaterial({
          emissive: 0xff003c,
          emissiveIntensity: 1.2,
          opacity: 1,
          transparent: true
        })
        phare2material = new THREE.MeshLambertMaterial({
          emissive: 0xff003c,
          emissiveIntensity: 1,
          opacity: 1,
          transparent: true
        })

        phare1 = new THREE.Mesh(phare1form, phare1material);
        phare1.position.z = 31.28;
        phare1.position.x = -5.39;
        phare1.position.y = 0.21;
        scene.add(phare1);

        phare2 = new THREE.Mesh(phare1form, phare2material);
        phare2.position.z = 31.28;
        phare2.position.x = -5.34;
        phare2.position.y = 0.21;
        phare2.visible = false;
        scene.add(phare2);
        
        phare3 = new THREE.Mesh(phare1form, phare2material);
        phare3.position.z = 31.28;
        phare3.position.x = -5.285;
        phare3.position.y = 0.21;
        phare3.visible = false;
        scene.add(phare3);

        phare4 = new THREE.Mesh(phare1form, phare2material);
        phare4.position.z = 31.28;
        phare4.position.x = -4.71;
        phare4.position.y = 0.21;
        phare4.visible = false;
        scene.add(phare4);

        phare5 = new THREE.Mesh(phare1form, phare2material);
        phare5.position.z = 31.28;
        phare5.position.x = -4.663;
        phare5.position.y = 0.21;
        phare5.visible = false;
        //console.log(phare5);
        scene.add(phare5);

        phare6 = new THREE.Mesh(phare1form, phare1material);
        phare6.position.z = 31.28;
        phare6.position.x = -4.614;
        phare6.position.y = 0.21;
        scene.add(phare6);


        //wheels
        //Wheels texture
        var texture = THREE.ImageUtils.loadTexture( "car/texture.jpg" );
        
        //texture repeat and wrap properties http://threejs.org/docs/#Reference/Textures/Texture
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 3, 3 );
        
        let geometrywheel = new THREE.CylinderGeometry( 5, 5, 40, 32 );
        let materialwheel = new THREE.MeshBasicMaterial( {map: texture, color: 0x8a5808, reflectivity:-1, lightMapIntensity:0.4} );        

        cylinderwheel1 = new THREE.Mesh( geometrywheel, materialwheel );
        cylinderwheel1.scale.set(0.025,0.0025,0.025);
        cylinderwheel1.position.z = 30.74;
        cylinderwheel1.position.y = -0.01;
        cylinderwheel1.position.x = -5.45;
        cylinderwheel1.rotation.z = Math.PI/2;

        scene.add( cylinderwheel1 );
        
        cylinderwheel2 = new THREE.Mesh( geometrywheel, materialwheel );
        cylinderwheel2.scale.set(0.025,0.0025,0.025);
        cylinderwheel2.position.z = 29.1;
        cylinderwheel2.position.y = -0.01;
        cylinderwheel2.position.x = -5.45;
        cylinderwheel2.rotation.z = Math.PI/2;

        scene.add( cylinderwheel2 );

        // Sky
        var sky = new Sky()
        sky.scale.setScalar( 10000 )
        scene.add( sky )

        var sky = new Sky()
        sky.scale.setScalar( 10000 )
        scene.add( sky )

        var uniforms = sky.material.uniforms

        uniforms[ 'turbidity' ].value = -16
        uniforms[ 'rayleigh' ].value = 10
        uniforms[ 'mieCoefficient' ].value = 0.005
        uniforms[ 'mieDirectionalG' ].value = 0.8

        //car
       var loader = new GLTFLoader();

       //Load a glTF resource
       loader.load(
         // resource URL
         'car/scene.gltf',
         // called when the resource is loaded
         function ( gltf ) {
           
           gltf.scene.scale.set(0.004,0.004,0.004) // initial scale here
           gltf.scene.position.set(-5,-0.2,30) // initial position here
           gltf.scene.rotation.y=Math.PI*1.5;// initial rotation here
           model = gltf.scene;
           scene.add( model );

           props.propsOn()

         },
         // called while loading is progressing
         function ( xhr ) {

           console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

         },
         // called when loading has errors
         function ( error ) {

           console.log( 'An error happened' );

         }
       );

        var parameters = {
          inclination: 0.49,
          azimuth: 0,
        };

        var pmremGenerator = new THREE.PMREMGenerator( renderer )

        function updateSun() {

            var theta = Math.PI * ( parameters.inclination - 0.5 )
            var phi = 2 * Math.PI * ( parameters.azimuth - 0.5 )
    
            sun.x = Math.cos( phi )
            sun.y = Math.sin( phi ) * Math.sin( theta )
            sun.z = Math.sin( phi ) * Math.cos( theta )
  
            sky.material.uniforms[ 'sunPosition' ].value.copy( sun )
            //water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();
  
            scene.environment = pmremGenerator.fromScene( sky ).texture
  
        }
  
        updateSun()  

        // Water

        var waterGeometry = new THREE.PlaneBufferGeometry( 90, 100 );

        water = new Water(
          waterGeometry,
          {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg', function ( texture ) {

              texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            } ),
            alpha: 1.0,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
          }
        );
        water.position.set(-50,-1.49,0);
        water.rotation.x = - Math.PI / 2;
        scene.add( water );

        const geometry3 = new THREE.PlaneGeometry( 20, 100, 10 );
        const material3 = new THREE.MeshPhysicalMaterial({roughness: 0.5, color: 0x8a4117});
        const plane3 = new THREE.Mesh( geometry3, material3 );
        plane3.rotation.x = - Math.PI / 2;
        plane3.position.x = 10.3;
        scene.add( plane3 );

        // OrbitControls

        controls = new OrbitControls( camera, renderer.domElement )
        controls.enableKeys = false
        controls.update()

        let side = 30;
        geometry = new THREE.PlaneGeometry(100, 10, side, side);
        //console.log(geometry2);
        let terrainMaterial = new THREE.MeshPhysicalMaterial({roughness: 0.5, color: 0xe0d08d});
        terrain = new THREE.Mesh(geometry, terrainMaterial);
        terrain.rotation.x = - Math.PI / 2;
        terrain.rotation.z = Math.PI/2;
        terrain.rotation.y = -0.5;
        terrain.position.x = -12;
        terrain.position.y = -2.53;
        //console.log("terrain geometry vertices"+JSON.stringify(terrain.geometry.attributes.position.array))
        scene.add(terrain);

 
        function Arbres(i)
        {  
          if (i<nombre)
            {
                if (i == 0)
                {
                    var loader = new GLTFLoader();
                    loader.load( 'tree/scene.gltf', function ( arbre )
                    {   
                        echellearbres = echelleArbres();
                        arbre.scene.scale.set(echellearbres,echellearbres,echellearbres); 
                        arbre.scene.position.set(-2.5, echellearbres*1.5,-depart);
                        arbres.push(arbre.scene); 
                        scene.add( arbre.scene );
                        Arbres(i + 1);  
                    });   
                }
             else
                {           
                    arbre = arbres[0].clone(); 
                    /* let dif = (getRandomInt(10)); */ // pour des espaces différents entre les arbres
                    arbre.rotation.y+= Math.PI*i/4;     
                    echellearbres = echelleArbres();
                    arbre.scale.set(echellearbres,echellearbres,echellearbres);
                    arbre.position.set(-2.5,echellearbres*1.5,-depart + i * distance); 
                    arbres.push(arbre);          
                    scene.add( arbre );
                    Arbres(i + 1); 
                }
            }
            else     
            {
                    Roadlines(0);
            }
      }  

      //trees
      function Roadlines(i)
        {     
          if (i<nombre)
            {
                if (i == 0)
                {
                    //roadline = rectangle des traits de la route
                    var roadlinesGeometry = new THREE.PlaneGeometry( 0.1, 3, 32 );
                    var roadlinesMaterial = new THREE.MeshPhysicalMaterial( {roughness: 0.5, color: 0xffcd29, side: THREE.DoubleSide} );
                    roadline = new THREE.Mesh( roadlinesGeometry, roadlinesMaterial );
                    roadline.rotation.x = - Math.PI / 2;
                    roadline.position.set(-5.8,-0.18,-depart);
                    roadlines.push(roadline); 
                    scene.add( roadline );
                    Roadlines( i + 1 );
                }
             else
                {           
                    roadline = roadlines[0].clone(); 
                    roadline.position.set(-5.8,-0.18,-depart + i * distance); 
                    roadlines.push(roadline);          
                    scene.add( roadline );
                    Roadlines(i + 1);
                }
            }
            else     
            {
                Immeubles(0);
            }
    }  

    // town
    
      //town
      function Immeubles(i)
        {     
          if (i<nombre)
            {  
              positionDepart = -depart + i * distance
              let otherbuilding = new immeuble(couleurImmeuble(),positionDepart); 
              immeublesA.push(otherbuilding); 
              scene.add(otherbuilding);
              
              positionDepart = -(depart + distance/2) + i * distance
              otherbuilding = new immeuble(couleurImmeuble(),positionDepart); 
              otherbuilding.position.x += 16;
              immeublesB.push(otherbuilding); 
              scene.add(otherbuilding);
              
              Immeubles(i + 1);
            }
          else     
            {
              Coins(0);
            }
      } 

      function Coins(i) {
          if (i < nombre) {
            if (i == 0) {
              var geometrycoin = new THREE.CylinderGeometry(5, 5, 20, 32);
              var materialcoin = new THREE.MeshBasicMaterial({ color: 0xffff00 });
              coin = new THREE.Mesh(geometrycoin, materialcoin);
              coin.rotation.x = Math.PI / 2;
              coin.scale.set(0.03, 0.003, 0.03);
              coin.visible = coinsVisible
            } else {
              coin = coins[0].clone();
            }
            var chosenValue = Math.random() < 0.5 ? -6.5 : -5.2;
            coin.position.set(chosenValue, 0.5, -depart + i * distance);
            coins.push(coin);
            scene.add(coin);
            Coins(i + 1);
          } else {
            animate();
          }
      }
  

      Arbres(0); 

    function addSphere(){

        // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
        for ( var z= -1000; z < 1000; z+=10 ) {

            // Make a sphere (exactly the same as before). 
            var geometry   = new THREE.BoxGeometry(3, 3, 3)
            var material = new THREE.MeshBasicMaterial({
              color: 0xffffff,
            });
            var sphere = new THREE.Mesh(geometry, material)

            // This time we give the sphere random x and y positions between -500 and 500
            sphere.position.x = Math.random() * 1000 - 500;
            sphere.position.y = (Math.random() * 1000) + 20;

            // Then set the z position to where it is in the loop (distance of camera)
            sphere.position.z = z;

            // scale it up a bit
            //sphere.scale.x = sphere.scale.y = 2;

            //add the sphere to the scene
            scene.add( sphere );

            //finally push it to the stars array 
            stars.push(sphere); 
        }
    }
    
    addSphere()
        /*
        var peak = 5
        var vertices = terrain.geometry.attributes.position.array;
        for (var i = 0; i <= vertices.length; i += 3) {
            vertices[i+2] = peak * Math.random();
        }
        terrain.geometry.attributes.position.needsUpdate = true;
        terrain.geometry.computeVertexNormals();*/
     
  
       
      }, [])


      function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.antialias = true;

      }

      window.addEventListener( 'resize', onWindowResize, false );

      function render() {
        /*var time = performance.now() * 0.001;*/
        /*
        mesh.position.y = Math.sin( time ) * 20 + 5;
        mesh.rotation.x = time * 0.5;
        mesh.rotation.z = time * 0.51;*/
        water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
        //composer.render();
      }

     
      
      //gltf.scene.position.set(-5,-0.1,30)



      function controls() {
        if (key == "ArrowLeft" || props.mobileDirection == "left"){
          //console.log('update')
          tweenSetX(model, -6.5)
          tweenSetX(phareavantdroit, -6.014)
          tweenSetX(phareavantgauche, -6.79)
          tweenSetX(pharearrieregauche, -6.2)
          tweenSetX(camera, -7)
          tweenSetX(phare1, -6.88)
          tweenSetX(phare2, -6.836)
          tweenSetX(phare3, -6.79)
          tweenSetX(phare4, -6.22)
          tweenSetX(phare5, -6.17)
          tweenSetX(phare6, -6.12)
          tweenSetX(cylinderwheel1, -6.95)
          tweenSetX(cylinderwheel2, -6.95)
        }
        else if (key == "ArrowRight" || props.mobileDirection == "right"){
          //console.log('update')
          tweenSetX(model, -5)
          tweenSetX(camera, -6)
          tweenSetX(phareavantdroit, -4.614)
          tweenSetX(phareavantgauche, -5.39)
          tweenSetX(pharearrieregauche, -5)
          tweenSetX(phare1, -5.39)
          tweenSetX(phare2, -5.34)
          tweenSetX(phare3, -5.285)
          tweenSetX(phare4, -4.71)
          tweenSetX(phare5, -4.663)
          tweenSetX(phare6, -4.614)
          tweenSetX(cylinderwheel1, -5.45)
          tweenSetX(cylinderwheel2, -5.45)
        }
        else if (key == "ArrowUp" || props.mobileDirection == "up"){
          tweenSetZ(model, 25)
          tweenSetZ(phareavantdroit, 23.7)
          tweenSetZ(phareavantgauche, 23.7)
          //tweenSetZ(pharearrieredroit, 26.7)
          tweenSetZ(pharearrieregauche, 25.7)
          tweenSetZ(camera, 26.5)
          tweenSetZ(phare1, 26.28)
          tweenSetZ(phare2, 26.28)
          tweenSetZ(phare3, 26.28)
          tweenSetZ(phare4, 26.28)
          tweenSetZ(phare5, 26.28)
          tweenSetZ(phare6, 26.28)
          tweenSetZ(cylinderwheel1, 25.75)
          tweenSetZ(cylinderwheel2, 24.1)
          zrank = 50;
          vitesse = 0.8;
          offsetModifier = 0.001
          console.log("HEYYYYYYY")
          
          //props.carSound(0.4, true)
          /*
          setTimeout(function(){
            vitesse = 0.3
            var tween = new TWEEN.Tween(model.position)
            tween.to({z: 30}, 1500)
            tween.easing(TWEEN.Easing.Exponential.Out);
            tween.start()

            var tweencamera = new TWEEN.Tween(camera.position)
            tweencamera.to({z: 33}, 1500)
            tweencamera.easing(TWEEN.Easing.Exponential.Out);
            tweencamera.start()
          }, 4000);*/          
        }
        else if (key == "ArrowDown" || props.mobileDirection == "down"){
          //console.log('update')
          tweenSetZ(phareavantdroit, 28.7)
          tweenSetZ(phareavantgauche, 28.7)
          tweenSetZ(pharearrieregauche, 30.4)
          tweenSetZ(phare1, 31.28)
          tweenSetZ(phare2, 31.28)
          tweenSetZ(phare3, 31.28)
          tweenSetZ(phare4, 31.28)
          tweenSetZ(phare5, 31.28)
          tweenSetZ(phare6, 31.28)
          tweenSetZ(cylinderwheel1, 30.74)
          tweenSetZ(cylinderwheel2, 29.1)
          offsetModifier = 0.001
          zrank = 100;      
          get_break()
        }
      }
      function get_break() {
        vitesse = 0.2
        phare2.visible = true;
        phare3.visible = true;
        phare4.visible = true;
        phare5.visible = true;
        tweenSetZ(model, 30)
        tweenSetZ(camera, 32.5)
        pharearrieregauche.power = 15*Math.PI
        setTimeout(function () {
          tweenSetZ(camera, 33)
          phare2.visible = false;
          phare3.visible = false;
          phare4.visible = false;
          phare5.visible = false;
          pharearrieregauche.power = 7*Math.PI
          vitesse = 0.5
        }, 1000);
      }
      controls()
      
      function cameraCheck(){
        if 
        ( props.cameraRotation == 45 ){
          tweenSetRotY(camera, -1)
          //tweenSetRotX(camera, -0.005)
          tweenSetZ(camera, 40)
          tweenSetX(camera, -9)
          //console.log("hey i'm here")
        }
        else if ( props.cameraRotation == 65 ){
          //console.log("backtohome")
          //tweenSetX(camera, -6)
          //tweenSetY(camera, 0.9)
          //tweenSetZ(camera, 40)
          //tweenSetZ(model, 30)
          //tweenSetY(model, -0.2)
          //tweenSetX(model, -5)
        }
        else if 
        ( props.cameraRotation == 55 ){
          //tweenSetRotY(camera, +1.6)
          //tweenSetRotX(camera, +0.005)
          //camera.rotation.x =  4;
          //tweenSetRotY(camera, 0)
          //tweenSetRotX(camera, -0.005)
          //tweenSetX(camera, -6)
          //tweenSetY(camera, 0.9)
          tweenSetZ(camera, 33)
          tweenSetRotY(camera, 0)
          tweenSetX(camera, -6)
          //*****************************************************************
          //Partie ajoutée pour début du jeu. coins[i].position.z < -10 : il faudra mettre la valeur - 10 dans une variable et en ajuster la valeur en fonction de la rapidité du jeu : inférieure pour un jeu plus rapide, supérieure pour un jeu plus lent... à tester.

                if (inGame == false) {  //Retarder l'arrivée des pièces en début de jeu
                  for (let i = 0; i < nombre; i++) {
                    if (coins[i].position.z < -10) {
                      coins[i].visible = true;
                    }
                    inGame = true
                  }
                }
          //*****************************************************************
          //setCoinsVisible(true)
          //console.log("hey i'm here")

          //camera.position.set( -6, 0.9, 32.7 );
        }
      }
      cameraCheck()

      var animate = function () {
        compteur = document.getElementById("compteur");
        gains = document.getElementById("gains");
        requestAnimationFrame( animate )
        /*if (props.keyPressed == "ArrowLeft"){
          console.log("hey i've been here")
          tween.update()
        }*/

        setMilliseconds(milliseconds+1)

        TWEEN.update()

        cylinderwheel1.rotation.x += -0.5;
        cylinderwheel2.rotation.x += -0.5;

        function animateStars() { 
      
          // loop through each star
          for(var i=0; i<stars.length; i++) {
              
              let star = stars[i]; 
                  
              // and move it forward dependent on the mouseY position. 
              star.position.z +=  i/zrank;
              star.rotation.z +=  0.01;
                  
              // if the particle is too close move it to the back
              if(star.position.z>1000) star.position.z-=2000; 
              if(star.position.y<100) star.position.y-=100; 
              
          }
      
          }
        
          animateStars()
          for (let i = 0; i < nombre; i++) {
            positionDepart = arrondi2d(roadlines[i].position.z + vitesse)
            if (inGame == true) {
              if (coins[i].position.z > phareavantgauche.position.z
                && coins[i].position.z < phareavantgauche.position.z + 1) {   // collision possible si... (2° conditiion, sinon la voiture peut faire disparaître des coins déjà passés.)
                if (coins[i].position.x < -6 && phareavantgauche.position.x < -6) {// pièce et voiture à gauche ou...
                  if (coins[i].visible == true) {  // sinon les coins, même invisibles, sont comptés jusqu'à ce qu'ils reviennent au début
                    gains.innerHTML = parseInt(gains.innerHTML) + 1
                    props.coinsCounterEaten(parseInt(gains.innerHTML))
                  }
                  coins[i].visible = false
                } else if (coins[i].position.x > -6 && phareavantgauche.position.x > -6) {// ...pièce et voiture à droite
                  if (coins[i].visible == true) {
                    gains.innerHTML = parseInt(gains.innerHTML) + 1
                    props.coinsCounterEaten(parseInt(gains.innerHTML))
                  }
                  coins[i].visible = false
                } else if (coins[i].position.z <= phareavantgauche.position.z + vitesse) { // compteur incrémenté s'il n'y a pas eu collision, mais une seule fois au moment où la pièce passe          
                  if (coins[i].visible == true) { //sinon les coins invisibles en début de jeu sont comptés
                    compteur.innerHTML = parseInt(compteur.innerHTML) + 1
                    props.coinsCounter(parseInt(compteur.innerHTML), props.level)
                  }
                  // compteur.innerHTML = "Coin N° " + i + "  " + coins[i].visible
                  if (compteur.innerHTML == 10) {
                    compteur.innerHTML = "GAME OVER !";
                    //vitesse = 0;
                  }
                }
              }
            }
            if (roadlines[i].position.z > 80) {
              if (i == (nombre - 1)) {
                positionDepart = arrondi2d((roadlines[0].position.z) - distance + vitesse);
              }
              else {
                positionDepart = arrondi2d((roadlines[i + 1].position.z) - distance + vitesse);
              }
              if (inGame == true) {
                coins[i].visible = true; // la pièce redevient visible quand on la ramène à la positiond'origine
              }
              echellearbres = echelleArbres();
              arbres[i].position.y = echellearbres * 1.5; //essai de valeur : tatonnement
              arbres[i].scale.set(echellearbres, echellearbres, echellearbres);
              immeublesA[i].material.emissive.set(couleurImmeuble());
              immeublesB[i].material.emissive.set(couleurImmeuble());
            }
            arbres[i].position.z = positionDepart;
            roadlines[i].position.z = positionDepart;
            coins[i].position.z = positionDepart;
            immeublesA[i].position.z = positionDepart;
            immeublesB[i].position.z = positionDepart - distance / 2;
        }
          render()
        
        let offset = Date.now() * offsetModifier;
        
        adjustVertices(terrain, offset);


        renderer.render( scene, camera )
      }
        //animate()
        return (
          /*
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            border: 20px solid white;
          */
          <div>
            <canvas 
              id="c"
              style={{
                boxSizing: "border-box",
                MozBoxSizing: "border-box",
                WebkitBoxSizing: "border-box",
                border: props.displayBorder
              }}
            />
          </div>
        )
    }


export default Background