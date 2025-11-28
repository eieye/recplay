console.log("NEWWEBAUDIO JS // 01-MAR-25");
      console.clear();

      // instigate our audio context
      /* let audioCtx; */ // ##TEMP## RE-COMMENT
      				// HAS (RE)DECLARATION IN RECPLAY.JS @LINE ##46##

      // load some sound
      const audioElement = document.querySelector("audio");
      //let track; // UN-USED

      const btnaudiostart = document.getElementById("btnaudiostart");

      // play pause audio
      btnaudiostart.addEventListener("pointerup", (e) => {
      		e.preventDefault();
          if (!audioCtx) {
           // NOT (NEVER) CALLED AS IT IS ALREADY INSTANTIATED IN "RECPLAY" @LINE ##46##
            init();
          }
          // check if context is in suspended state (autoplay policy)
          if (audioCtx.state === "suspended") {
            audioCtx.resume();
          }
          if (btnaudiostart.dataset.playing === "false") {
            audioElement.play();
            btnaudiostart.dataset.playing = "true";
            // see MDN "HTMLElement.dataset" property (is a DOMStringMap)
            // if track is playing pause it
          } else if (btnaudiostart.dataset.playing === "true") {
            audioElement.pause();
            btnaudiostart.dataset.playing = "false";
          }
          // Toggle the state between play and not playing
          let state =
            btnaudiostart.getAttribute("aria-checked") === "true" ? true : false;
          btnaudiostart.setAttribute("aria-checked", state ? "false" : "true");
        }, false );

      // If track ends
      audioElement.addEventListener(
        "ended",
        () => {
          btnaudiostart.dataset.playing = "false";
          btnaudiostart.setAttribute("aria-checked", "false");
        },
        false
      );

// THIS IS (BOTH) NOT CALLED *AND* GETS OVERWRITTEN BY 2ND "INIT" IN "SCRUB" @LINE ##58##
      function init() {
        audioCtx = new AudioContext();
      	console.log("FUNCTION INIT (WEBAUDIO)", init);
      }

