import { Suspense } from 'react';
import { Text, PresentationControls, OrbitControls, useGLTF, Environment, Float, Html } from '@react-three/drei';
import GitHubModel from './models/GitHubModel';
import Hologram from './components/Hologram';

export default function Experience(){

    const macbookModel = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');
    const gitHubModel = useGLTF('/model/github.glb');

    return <>

        <color args={['#2C2F33']} attach='background'/>
        <Suspense fallback={null}>

            <OrbitControls 
                enableZoom={true} 
                enableRotate={false} 
                enablePan={false} 
                minDistance={2}
                maxDistance={8}
            />

            <Environment preset='apartment' />

    
        <PresentationControls
        global
       rotation={[0.13, 0.1, 0]}
       polar={[-0.4, 0.2]}
       azimuth={[-2, 0.75]}
       config={{ mass: 2, tension: 400 }}
        // snap={{ mass: 4, tension: 400 }}
        >
        <Hologram  position={[-3.75, 0.75, 1]}
             scale={[0.35, 0.35, 0.35]} rotation={[0,1.25,0]}/>

        <Float rotationIntensity={0.4}>
            {/* screen light  model*/}
            <rectAreaLight 
                width={2.5}
                height={1.65}
                intensity={65}
                color={'#ffffff'}
                rotation={[0.1, Math.PI, 0]}
                position={[0, 0.55, -1.03]}
                occlude
            />
     
            {/* macbook model */}
            <primitive 
                object={macbookModel.scene}  
                position-y={-1.2} 
                rotation-y={0.13}  
                // onUpdate={(self) => {
                //     self.traverse((child) => {
                //       child.layers.enable(1); // habilita layer 1
                //     });
                //   }}
            >
                {/* html screen iframe */}
                <Html
                transform
                wrapperClass='htmlScreen'
                distanceFactor={1.17}
                position={[0, 1.56, -1.4]}
                rotation-x={-0.256}
                occlude
                >    
                    <iframe 
                    src='https://3d-projects-beta.vercel.app/'
                    />
                </Html>
            </primitive>

            {/* github model */}
            <GitHubModel model={gitHubModel} />
            {/* text */}
            <Text
            font='./fonts/CabinSketch-Bold.woff'
            fontSize={1}
            position={[0.6, 2, -1.7]}
            textAlign='center'
            color='#00897B'
           
            >delafuentej</Text>

            <Text
            font='./fonts/bangers-v20-latin-regular.woff'
            fontSize={1}
            position={[3.75, 0.75, 0]}
            rotation-y={-1.25}
            maxWidth={2}
            color='#e1d8d0'
            textAlign='center'
           
            >3d creative developer
        </Text>

        </Float>
        {/* <ContactShadows 
            position-y={-1.4}
            opacity={0.2}
            scale={5}
            blur={2.4}
            frames={1}
            onUpdate={(self) => self.layers.set(1)} // escucha solo layer 1
            /> */}
        </PresentationControls>

        </Suspense>

    </>
}