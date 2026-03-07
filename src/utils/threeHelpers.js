import * as THREE from 'three'

/**
 * Center and scale a 3D model to fit within a specific size
 * @param {THREE.Object3D} scene - The 3D scene/model to transform
 * @param {number} targetSize - Target size to scale to (default: 3.5)
 */
export function centerAndScaleModel(scene, targetSize = 3.5) {
    if (!scene) return

    // Calculate bounding box
    const box = new THREE.Box3().setFromObject(scene)
    const center = new THREE.Vector3()
    const size = new THREE.Vector3()

    box.getCenter(center)
    box.getSize(size)

    // Center the model
    scene.position.set(0, 0, 0)
    scene.position.sub(center)

    // Scale to fit target size
    const maxDim = Math.max(size.x, size.y, size.z)
    scene.scale.setScalar(targetSize / (maxDim || 1))
}

/**
 * Optimize texture for better performance
 * @param {THREE.Texture} texture - Texture to optimize
 * @param {number} maxAnisotropy - Maximum anisotropy value
 */
export function optimizeTexture(texture, maxAnisotropy = 4) {
    if (!texture) return

    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = Math.min(maxAnisotropy, texture.anisotropy)
    texture.generateMipmaps = true
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter
}

/**
 * Setup geometry for better performance
 * @param {THREE.BufferGeometry} geometry - Geometry to optimize
 */
export function optimizeGeometry(geometry) {
    if (!geometry) return

    geometry.computeVertexNormals()
}
