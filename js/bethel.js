var vrView1;
var vrView2;
var vrView3;

// All the scenes for the experience
var scenes = {
  down_center: {
    image: 'img/down-center.jpg',
    preview: 'img/down-center-preview.jpg',
    hotspots: {
      top_back_center: {
        pitch: -30,
        yaw: 180,
        radius: 0.05,
        distance: 2
      },
      front_top_center: {
        pitch: 30,
        yaw: 0,
        radius: 0.05,
        distance: 1
      },
      down_back_center: {
        pitch: 0,
        yaw: 180,
        radius: 0.05,
        distance: 1
      },
	  down_left:{
		pitch: 0,
        yaw: 90,
        radius: 0.05,
        distance: 2 
	  },
	  down_right:{
		pitch: 0,
        yaw: -90,
        radius: 0.05,
        distance: 2  
	  }
    }
  },
  front_top_center: {
    image: 'img/front-top-center.jpg',
    preview: 'img/front-top-center-preview.jpg',
    hotspots: {
      top_back_center: {
        pitch: 0,
        yaw: 0,
        radius: 0.05,
        distance: 2
      },
      down_center: {
        pitch: -40,
        yaw: 0,
        radius: 0.05,
        distance: 1
      },
      down_back_center: {
        pitch: -20,
        yaw: 0,
        radius: 0.05,
        distance: 2
      },
	  down_left:{
		pitch: -50,
        yaw: -60,
        radius: 0.05,
        distance: 2 
	  },
	  down_right:{
		pitch: -50,
        yaw: 60,
        radius: 0.05,
        distance: 2  
	  }
    }
  },
  top_back_center: {
    image: 'img/top-back-center.jpg',
    preview: 'img/top-back-center-preview.jpg',
    hotspots: {
      down_center: {
        pitch: 40,
        yaw: 180,
        radius: 0.05,
        distance: 2
      },
      front_top_center: {
        pitch: 0,
        yaw: 180,
        radius: 0.05,
        distance: 1.5
      },
	  down_left:{
		pitch: 40,
        yaw: -135,
        radius: 0.05,
        distance: 2 
	  },
	  down_right:{
		pitch: 40,
        yaw: 135,
        radius: 0.05,
        distance: 2  
	  }
    }
  },
  down_back_center: {
    image: 'img/down-back-center.jpg',
    preview: 'img/down-back-center-preview.jpg',
    hotspots: {
      front_top_center: {
        pitch: 15,
        yaw: 0,
        radius: 0.05,
        distance: 2
      },
      down_center: {
        pitch: 0,
        yaw: 0,
        radius: 0.05,
        distance: 1.5
      },
	  top_back_center: {
        pitch: -50,
        yaw: 180,
        radius: 0.05,
        distance: 0.5
      },
	  down_left:{
		pitch: 0,
        yaw: 60,
        radius: 0.04,
        distance: 2 
	  },
	  down_right:{
		pitch: 0,
        yaw: -60,
        radius: 0.04,
        distance: 2  
	  }
    }
  },
  down_left: {
    image: 'img/down-left.jpg',
    preview: 'img/down-left-preview.jpg',
    hotspots: {
      front_top_center: {
        pitch: 15,
        yaw: 0,
        radius: 0.03,
        distance: 1
      },
      down_center: {
        pitch: 0,
        yaw: -40,
        radius: 0.05,
        distance: 1
      },
	  top_back_center: {
        pitch: 60,
        yaw: -70,
        radius: 0.05,
        distance: 2
      },      
	  down_back_center: {
        pitch: 0,
        yaw: -80,
        radius: 0.05,
        distance: 2
      }
    }
  },
  down_right: {
    image: 'img/down-right.jpg',
    preview: 'img/down-right-preview.jpg',
    hotspots: {
      front_top_center: {
        pitch: 15,
        yaw: 5,
        radius: 0.03,
        distance: 1
      },
      down_center: {
        pitch: 0,
        yaw: 40,
        radius: 0.05,
        distance: 1
      },
	  top_back_center: {
        pitch: 60,
        yaw: 70,
        radius: 0.05,
        distance: 2
      },      
	  down_back_center: {
        pitch: 0,
        yaw: 80,
        radius: 0.05,
        distance: 2
      }
    }
  }
};

function onLoad() {
  vrView1 = new VRView.Player('#vrview1', {
    image: 'img/down-back-center.jpg',
    preview: 'img/down-back-center-preview.jpg',
    is_stereo: true,
    is_autopan_off: true,
	height: '500 px',
	width: '800 px'
  });

  vrView1.on('ready', onVRViewReady1);
  vrView1.on('modechange', onModeChange);
  vrView1.on('click', onHotspotClick1);
  vrView1.on('error', onVRViewError);
  vrView1.on('getposition', onGetPosition);
  
}

function onVRViewReady1(e) {
  console.log('onVRViewReady1');
  loadScene1('down_back_center');
}


function onModeChange(e) {
  console.log('onModeChange', e.mode);
}

function onGetPosition(e) {
  console.log(e);

}

function onHotspotClick1(e) {
  console.log('onHotspotClick1', e.id);
  if (e.id) {
    loadScene1(e.id);
  }
}


function loadScene1(id) {
  console.log('loadScene1', id);

  // Set the image
  vrView1.setContent({
    image: scenes[id].image,
    preview: scenes[id].preview,
    is_stereo: true,
    is_autopan_off: true,
	height: '500 px',
	width: '800 px'
  });

  // Add all the hotspots for the scene
  var newScene = scenes[id];
  var sceneHotspots = Object.keys(newScene.hotspots);
  for (var i = 0; i < sceneHotspots.length; i++) {
    var hotspotKey = sceneHotspots[i];
    var hotspot = newScene.hotspots[hotspotKey];

    vrView1.addHotspot(hotspotKey, {
      pitch: hotspot.pitch,
      yaw: hotspot.yaw,
      radius: hotspot.radius,
      distance: hotspot.distance
    });
  }
}

function onVRViewError(e) {
  console.log('Error! %s', e.message);
}

window.addEventListener('load', onLoad);
  
  
  
  
  
   