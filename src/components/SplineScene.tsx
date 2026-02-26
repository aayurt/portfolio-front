"use client";

import React, { Suspense, useRef } from "react";
import { Column } from "@once-ui-system/core";

const Spline = React.lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
    scene: string;
}

export default function SplineScene({ scene }: SplineSceneProps) {
    const objRef = useRef<any>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const currentRotation = useRef({ x: 0, y: 0 });

    function onLoad(splineApp: any) {
        const obj = splineApp.findObjectById('dadc6339-2711-4e27-b0ef-c5c63c472f7f');
        objRef.current = obj;

        window.addEventListener('mousemove', (e) => {
            // Normalize screen position: -1 (left/top) to 1 (right/bottom)
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;

            // Store raw normalized values
            mousePos.current.x = x;
            mousePos.current.y = y;
        });

        const animate = () => {
            if (objRef.current) {
                // HORIZONTAL: Mouse X controls Rotation Y
                // We use a negative sign if the eye moves away from the cursor
                const targetRotY = mousePos.current.x * 0.5;

                // VERTICAL: Mouse Y controls Rotation X
                // We use a negative sign because screen Y increases downwards
                const targetRotX = mousePos.current.y * 0.3;

                // Smooth transition (Lerp)
                currentRotation.current.y += (targetRotY - currentRotation.current.y) * 0.05;
                currentRotation.current.x += (targetRotX - currentRotation.current.x) * 0.05;

                // Apply rotations
                objRef.current.rotation.y = currentRotation.current.y;
                objRef.current.rotation.x = currentRotation.current.x;
            }
            requestAnimationFrame(animate);
        };

        animate();
    }
    return (
        <Column
            style={{
                borderRadius: "var(--radius-l)",
                overflow: "hidden",
                position: "relative",
                width: "300px"
            }}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <Spline scene={scene} onLoad={onLoad} />
            </Suspense>
        </Column>
    );
}
