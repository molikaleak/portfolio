const viewer = document.getElementById('viewer');

// Mouse move → tilt model
document.addEventListener("mousemove", (event) => {
  if (!viewer) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 30; 
  const y = (event.clientY / window.innerHeight - 0.5) * 30; 
  viewer.cameraOrbit = `${x}deg ${90 - y}deg auto`;
});

// Scroll → change exposure + tint background
window.addEventListener("scroll", () => {
  if (!viewer) return;
  const scrollY = window.scrollY / window.innerHeight;
  viewer.exposure = 1 + scrollY; 
  viewer.style.background = `radial-gradient(circle, rgba(120,0,0,${scrollY}), #000)`;
});
