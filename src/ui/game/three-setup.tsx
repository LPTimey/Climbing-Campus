import { useEffect, useRef } from "react";
import * as THREE from "three";
import { resizeIfNeeded } from "@/lib/threejs-utils";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(
    () => {
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
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshPhysicalMaterial({ color: 0x00ff00, });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Light
      const light = new THREE.PointLight();
      light.position.set(1, 2, 1);
      scene.add(light);

      // Animation loop
      let lastTime = 0;
      const animate: XRFrameRequestCallback = (
        time: number,
        _frame: XRFrame,
      ) => {
        const deltaTime = time - lastTime;
        resizeIfNeeded(renderer, camera);

        cube.rotation.x += 0.001 * deltaTime;
        cube.rotation.y += 0.001 * deltaTime;

        lastTime = time;
        renderer.render(scene, camera);
      };

      renderer.setAnimationLoop(animate);

      // Cleanup
      return () => {
        renderer.dispose();
      };
    },
    // ,[] // TODO: reenable for prod
  );

  return <canvas ref={canvasRef}></canvas>;
}
