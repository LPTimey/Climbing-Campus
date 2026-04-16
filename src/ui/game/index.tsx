import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement|null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
        return;
    }
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha:true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.setSize(window.innerWidth, window.innerHeight);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}
