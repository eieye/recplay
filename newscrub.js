console.log("NEWSCRUB JS // 02-MAR-25");
console.log("##MEMO## #TBD# CHANGE POINTER TO TOUCHEVENTS TO ENABLE SCRUBBING IN CHROME");


// BUTTONS
const btnplayrecording = document.getElementById('btnplayrecording'); // (=PLAY RECORDING)
// SCRUBBER
const recscrubberbar = document.getElementById('recscrubberbar'); // ACTUAL POSITION/LENGTH
const recscrubbercontainer = document.getElementById('recscrubbercontainer'); // SCRUBBER ELEMENT WIDTH
// INFO-DISPLAY
const logtime = document.getElementById('logtime');
const logdur = document.getElementById('logdur');
const logamp = document.getElementById('logamp');

// POINTER-STATE
var isdown = false;







																	// AUDIO_OBJECT (RECORDED)

// ## PLAY BUTTON ##
	btnplayrecording.addEventListener('pointerup', function() {
		if(audioRecObj) {
			audioRecObj.play();
															/* =========== TBD SET PROGRESS-BAR TO PLAYBACK-TIME =========== */
															/* ============== TBD RESET TO ZERO AFTER PLAYTHRU ============= */
		} else {
			console.log("NO RECORDING YET");
		}
// 		btnplayrecording.style.display = "none";
// 		btnplayrecording.style.display = "block";
	});




																				// INIT (WINDOW)
// LINE ##58##
function init() {
// MOUSEUP
	window.addEventListener('pointerup', e => {
		e.preventDefault();
		isdown = false; // (!) DOWN SET BY SCRUBBER ONLY
		console.log("POINTERUP"); // (LOGS SINGLE EVENT)
	}, {passive: false});
	

// WIRE-UP OTHER FUNCTIONS
	addPointerEvents();
	//console.log("END INIT");
  //console.log("FUNCTION INIT (SCRUB)", init);
} // END INIT






let clickPosition;
let clickTime;
let lengthbar;

// NAMED FUNCTIONS
let handlepointerdown;
let handlepointermove;

																				// EVENT HANDLERS
function addPointerEvents() {

// POINTERDOWN
	handlepointerdown = function(e) {
		e.preventDefault();
		isdown = true;
										// CAPTURE IS UX-WISE OPTIONAL (TOUCHPOINT CAN MOVE OFF BAR)
										// BUT DOES NOT EFFECT SCRUBBING FUNCTIONALLY (OR CHROME ERR)
		this.setPointerCapture(e.pointerId); // ##WATCH ITEM## (CHROME)

// SET LENGTH SEEKBAR TO CURRENT POSITION
		clickPosition = (e.pageX  - this.offsetLeft) / this.offsetWidth;
		lengthbar = clickPosition * 100 + "%";
		recscrubberbar.style.width = lengthbar;

// MOVE PLAYHEAD TO CURRENT POSITION ##ON POINTERDOWN##
// (DISPENSIBLE) NO AUDIBLE NO VISIBLE DIFFENCE
// AUDIO-PLAY ONLY ON MOVE ANYWAY
		if (audioRecObj) {
// 			clickTime = clickPosition * audioRecObj.duration;
// 			audioRecObj.currentTime = clickTime;
		} else {
			console.log("NO RECORDING YET");
		}
	}, { passive: false } ;


// POINTERMOVE
	handlepointermove = function(e) {
		e.preventDefault();
// (OPTIONAL UX FEATURE // TRACK MOVE IF OFF BAR-ELEM)
		//this.setPointerCapture(e.pointerId);

	// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
												// CHROME IS OK WITH "POINTERCAPTURE"
												// CHROME WILL ONLY ACCEPT "TOUCHMOVE" FOR SCRUBBING 
												// IN "RESPONSIVE" DESKTOP-BROWSER SIM
	// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
		if (isdown) {
			//console.log("pointermove"); // (CHECKED)

// CALCULATE NORMALIZED POSITION 0...1 FOR CSS-PERCENT BAR LENGTH
			clickPosition = (e.pageX  - this.offsetLeft) / this.offsetWidth;
			lengthbar = clickPosition * 100 + "%";
			recscrubberbar.style.width = lengthbar;

			if (audioRecObj) {
// MOVE PLAYHEAD TO CURRENT POSITION ##ON POINTERMOVE## 
// (THIS WILL ALSO IMMEDIATELY SET BAR TO TOUCHPOINT AND TIME)
				clickTime = clickPosition * audioRecObj.duration;
				audioRecObj.currentTime = clickTime;

			} else {
				//console.log("NO RECORDING YET"); // (CHECK)
			}

		} // DOWN
	}, { passive: false } ;


// ADD LISTENERS
	recscrubbercontainer.addEventListener('pointerdown', handlepointerdown);
	recscrubbercontainer.addEventListener('pointermove', handlepointermove);
	console.log("    ###POINTER### EVENTS ADDED ON " + recscrubbercontainer.id);


} // END ADD_POINTER_EVENTS


		
