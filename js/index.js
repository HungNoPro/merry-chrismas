	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;

	var container;

	var particle;

	var camera;
	var scene;
	var renderer;

	var mouseX = 0;
	var mouseY = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	
	var particles = []; 
	var particleImage = new Image();//THREE.ImageUtils.loadTexture( "img/ParticleSmoke.png" );
	particleImage.src = 'img/ParticleSmoke.png'; 



	function init() {

		var unix = Math.round(+new Date()/1000);  //unix timestamp for todays date
        // alert(unix);

		container = document.createElement('div');
		document.body.appendChild(container);

		camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
		camera.position.z = 1000;

		scene = new THREE.Scene();
		scene.add(camera);
			
		renderer = new THREE.CanvasRenderer();
		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
			
		for (var i = 0; i < 700; i++) {

			particle = new Particle3D( material);
			particle.position.x = Math.random() * 2000 - 1000;
			particle.position.y = Math.random() * 2000 - 1000;
			particle.position.z = Math.random() * 2000 - 1000;
			particle.scale.x = particle.scale.y =  1;
			scene.add( particle );
			
			particles.push(particle); 
		}

		container.appendChild( renderer.domElement );


		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		
		setInterval( loop, 1000 / 60 );

		
		
		$(document).ready(function(){
                JBCountDown({
                    secondsColor : "#ffdc50",
                    secondsGlow  : "#ff6565",
                    
                    minutesColor : "#9cdb7d",
                    minutesGlow  : "#378cff",
                    
                    hoursColor   : "#378cff",
                    hoursGlow    : "#9cdb7d",
                    
                    daysColor    : "#ff6565",
                    daysGlow     : "#ffdc50",
                    
                    startDate   : "1384214400",
                    endDate     : "1387897200",
                    now         : unix,
	                seconds     : unix % 60 //unix timestamp for seconds in realtime
                });
            
			nextTrack();
			
        });

		
	}

	function nextTrack(){
		var audio = document.getElementById("player");
		audio.addEventListener("ended", function() {
		    audio.src = "audio/mayday_freedom.mp3";
		    audio.play();
		});
	}
	
	function onDocumentMouseMove( event ) {

		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}

	function onDocumentTouchStart( event ) {

		if ( event.touches.length == 1 ) {

			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}

	function onDocumentTouchMove( event ) {

		if ( event.touches.length == 1 ) {

			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}

	//

	function loop() {

	for(var i = 0; i<particles.length; i++)
		{

			var particle = particles[i]; 
			particle.updatePhysics(); 

			with(particle.position)
			{
				if(y<-1000) y+=2000; 
				if(x>1000) x-=2000; 
				else if(x<-1000) x+=2000; 
				if(z>1000) z-=2000; 
				else if(z<-1000) z+=2000; 
			}				
		}
	
		camera.position.x += ( mouseX - camera.position.x ) * 0.05;
		camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
		camera.lookAt(scene.position); 

		renderer.render( scene, camera );

		
	}

