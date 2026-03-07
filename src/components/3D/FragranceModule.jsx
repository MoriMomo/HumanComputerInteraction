import PropTypes from 'prop-types'
import { useEffect, useMemo, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { MODEL_URL } from '../../constants'

function FragranceModule({ mode, gsap, materialColor }) {
    const { scene } = useGLTF(MODEL_URL)
    const materialsRef = useRef([])
    const oldMaterialsRef = useRef([])
    const { camera, controls, gl } = useThree()

    const initialColor = useRef(materialColor)

    useMemo(() => {
        if (!scene) return

        const box = new THREE.Box3().setFromObject(scene)
        const center = new THREE.Vector3()
        const size = new THREE.Vector3()
        box.getCenter(center)
        box.getSize(size)
        scene.position.set(0, 0, 0)
        scene.position.sub(center)
        const maxDim = Math.max(size.x, size.y, size.z)
        scene.scale.setScalar(3.5 / (maxDim || 1))

        const materials = []
        scene.traverse((child) => {
            if (!child.isMesh) return
            if (child.geometry) {
                child.geometry.computeVertexNormals()
                child.frustumCulled = true
            }
            const oldMats = Array.isArray(child.material) ? child.material : [child.material]
            oldMaterialsRef.current.push(...oldMats)

            const sourceMaterials = Array.isArray(child.material) ? child.material : [child.material]
            const nextMaterials = sourceMaterials.map((sourceMaterial) => {
                const map = sourceMaterial?.map
                if (map) {
                    map.colorSpace = THREE.SRGBColorSpace
                    map.anisotropy = Math.min(gl.capabilities.getMaxAnisotropy(), 4)
                    map.generateMipmaps = true
                    map.minFilter = THREE.LinearMipmapLinearFilter
                    map.magFilter = THREE.LinearFilter
                }
                const material = new THREE.MeshPhysicalMaterial({
                    color: new THREE.Color(initialColor.current),
                    roughness: 0.2,
                    metalness: 0.8,
                    envMapIntensity: 1.5,
                    transparent: true,
                    opacity: 1,
                    transmission: 0,
                    thickness: 0,
                    ior: 1.5,
                    wireframe: false,
                    map: map || null,
                })
                materials.push(material)
                return material
            })
            child.material = Array.isArray(child.material) ? nextMaterials : nextMaterials[0]
        })
        materialsRef.current = materials

        return () => {
            oldMaterialsRef.current.forEach((mat) => {
                if (mat?.dispose) mat.dispose()
            })
            materialsRef.current.forEach((mat) => {
                if (mat?.dispose) mat.dispose()
            })
            oldMaterialsRef.current = []
            materialsRef.current = []
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scene, gl])

    useEffect(() => {
        materialsRef.current.forEach((mat) => {
            mat.color.set(materialColor)
        })
    }, [materialColor])

    useEffect(() => {
        if (!gsap || materialsRef.current.length === 0) return
        const targets = materialsRef.current
        gsap.killTweensOf(targets)

        if (mode === 'glass') {
            targets.forEach((mat) => { mat.wireframe = false })
            gsap.to(targets, { transmission: 1, thickness: 2, roughness: 0.05, metalness: 0, opacity: 1, duration: 1, ease: 'expo.out' })
        } else if (mode === 'wireframe') {
            gsap.to(targets, {
                transmission: 0, opacity: 0.2, duration: 0.4, ease: 'power2.inOut',
                onComplete: () => { targets.forEach((mat) => { mat.wireframe = true }) }
            })
        } else {
            targets.forEach((mat) => { mat.wireframe = false })
            gsap.to(targets, { transmission: 0, thickness: 0, roughness: 0.2, metalness: 0.8, opacity: 1, duration: 1, ease: 'expo.out' })
        }
    }, [mode, gsap])

    useEffect(() => {
        if (!scene || !camera) return
        const box = new THREE.Box3().setFromObject(scene)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = (camera.fov * Math.PI) / 180
        const fitDistance = (maxDim / 2) / Math.tan(fov / 2)
        const distance = fitDistance * 1.4
        camera.position.set(center.x, center.y, center.z + distance)
        camera.near = Math.max(0.1, distance / 100)
        camera.far = Math.max(1000, distance * 10)
        camera.updateProjectionMatrix()
        if (controls?.target) {
            controls.target.copy(center)
            controls.update()
        }
    }, [scene, camera, controls])

    return <primitive object={scene} />
}

FragranceModule.propTypes = {
    /** Render mode controlling material appearance */
    mode: PropTypes.oneOf(['normal', 'glass', 'wireframe']).isRequired,
    /** GSAP instance for material transition animations */
    gsap: PropTypes.object,
    /** Hex color string applied to the 3D model surface */
    materialColor: PropTypes.string.isRequired,
}

useGLTF.preload(MODEL_URL)

export default FragranceModule
