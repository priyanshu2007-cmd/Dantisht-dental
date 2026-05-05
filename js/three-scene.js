document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("three-canvas-container");
  if (!container || window.innerWidth < 768) {
    if (container) container.style.display = "none";
    return;
  }
  if (typeof THREE === "undefined") return;

  const scene = new THREE.Scene();
  // No background — let hero-bg.png show through
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 15;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(10, 20, 10);
  scene.add(dir);
  const fill = new THREE.DirectionalLight(0x2a9d8f, 0.3);
  fill.position.set(-10, 0, -10);
  scene.add(fill);

  const geos = [
    new THREE.DodecahedronGeometry(1.5, 0),
    new THREE.IcosahedronGeometry(1.2, 0),
    new THREE.OctahedronGeometry(1.5, 1),
  ];
  const mats = [
    new THREE.MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    }),
    new THREE.MeshLambertMaterial({
      color: 0x2a9d8f,
      transparent: true,
      opacity: 0.4,
    }),
    new THREE.MeshLambertMaterial({
      color: 0xb59363,
      transparent: true,
      opacity: 0.3,
    }),
  ];
  const shapes = [];
  for (let i = 0; i < 15; i++) {
    const m = new THREE.Mesh(
      geos[Math.floor(Math.random() * 3)],
      mats[Math.floor(Math.random() * 3)],
    );
    m.position.set(
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20 - 5,
    );
    m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    m.userData = {
      rx: (Math.random() - 0.5) * 0.01,
      ry: (Math.random() - 0.5) * 0.01,
      fs: Math.random() * 0.02 + 0.01,
      fo: Math.random() * Math.PI * 2,
      sy: m.position.y,
    };
    shapes.push(m);
    scene.add(m);
  }
  const pGeo = new THREE.BufferGeometry(),
    pCount = 300,
    pos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount * 3; i++) pos[i] = (Math.random() - 0.5) * 50;
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const particles = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({
      size: 0.05,
      color: 0x0b2a3d,
      transparent: true,
      opacity: 0.3,
    }),
  );
  scene.add(particles);

  let mx = 0,
    my = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX - window.innerWidth / 2;
    my = e.clientY - window.innerHeight / 2;
  });
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    camera.position.x += (mx * 0.001 - camera.position.x) * 0.05;
    camera.position.y += (-my * 0.001 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    shapes.forEach((s) => {
      s.rotation.x += s.userData.rx;
      s.rotation.y += s.userData.ry;
      s.position.y =
        s.userData.sy + Math.sin(t * s.userData.fs + s.userData.fo) * 1.5;
    });
    particles.rotation.y = t * 0.05;
    renderer.render(scene, camera);
  }
  animate();
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      container.style.display = "none";
      return;
    }
    container.style.display = "block";
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
