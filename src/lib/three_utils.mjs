import * as THREE from "three";

/**
 * 
 * @param {THREE.Scene} scene 
 * @param {THREE.Vector3} position 
 * @param {number} [intensity=2] 
 */
export function addLight(scene, position, intensity = 2) {

    const color = 0xFFFFFF;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(position.x, position.y, position.z);
    scene.add(light);
}

/**
 * 
 * @param {THREE.WebGLRenderer} renderer 
 * @returns 
 */
export function rendererNeedsResize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = Math.floor(canvas.clientWidth * pixelRatio);
    const height = Math.floor(canvas.clientHeight * pixelRatio);
    const needResize = canvas.width !== width || canvas.height !== height;
    return needResize;
}

/**
 * 
 * @param {THREE.WebGLRenderer} renderer 
 * @param {THREE.PerspectiveCamera | THREE.OrthographicCamera} camera 
 */
export function resize(renderer, camera) {

    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);

    if (camera instanceof THREE.PerspectiveCamera) {
        camera.aspect = width / height;
    } else if (camera instanceof THREE.OrthographicCamera) {
        const frustumHeight = camera.top - camera.bottom;
        const aspect = width / height;
        const frustumWidth = frustumHeight * aspect;

        const dx = (camera.left + camera.right) / 2;
        const dy = (camera.top + camera.bottom) / 2;

        camera.left = dx - frustumWidth / 2;
        camera.right = dx + frustumWidth / 2;
        camera.top = dy + frustumHeight / 2;
        camera.bottom = dy - frustumHeight / 2;
    }

    camera.updateProjectionMatrix();
}
/**
 * 
 * @param {THREE.WebGLRenderer} renderer 
 * @param {THREE.PerspectiveCamera | THREE.OrthographicCamera} camera 
 * @returns 
 */
export function resizeIfNeeded(renderer, camera) {
    if (!rendererNeedsResize(renderer)) {
        return false;
    }
    resize(renderer, camera);
    return true;
}
