function handleOrientation(event) {
    const x = event.gamma;  // left-right tilt (-90 to 90)
    const y = event.beta;   // front-back tilt (-180 to 180)
  
    // Limit values to avoid excessive movement
    const limitedX = Math.max(-30, Math.min(30, x));
    const limitedY = Math.max(-30, Math.min(30, y));
  
    // Map tilt to transform values
    const moveX = (limitedX / 30) * 20; // max 20px
    const moveY = (limitedY / 30) * 20; // max 20px
  
    // Apply to all parallax elements
    document.querySelectorAll('.parallax').forEach(el => {
      const depth = el.getAttribute('data-depth') || 1;
      el.style.transform = `translate3d(${moveX * depth}px, ${moveY * depth}px, 0)`;
    });
  }

  if (isMobile && typeof DeviceOrientationEvent.requestPermission === 'function') {
    document.querySelector('#enableMotionButton').addEventListener('click', () => {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    window.addEventListener("deviceorientation", (event) => {
                        const x = event.gamma / 45;
                        const y = event.beta / 45;
                        applyParallax(x, y);
                    }, true);
                }
            })
            .catch(console.error);
    });
} else if (isMobile && window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (event) => {
        const x = event.gamma / 45;
        const y = event.beta / 45;
        applyParallax(x, y);
    }, true);
}

  
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", handleOrientation, true);
  } else {
    console.log("DeviceOrientation is not supported.");
  }