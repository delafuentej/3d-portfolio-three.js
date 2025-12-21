import * as THREE from "three";

/* ───────────── SOFT ───────────── */

export function soft(tl, { camera, toPos, target, toTarget }) {
  tl.to(camera.position, {
    ...toPos,
    duration: 1.6,
    ease: "power3.inOut",
  }).to(
    target,
    {
      ...toTarget,
      duration: 1.6,
      onUpdate: () => camera.lookAt(target),
    },
    0
  );
}

/* ───────────── ARC ───────────── */

export function arc(tl, { camera, fromPos, toPos, target, toTarget }) {
  const mid = fromPos.clone().lerp(toPos, 0.5);
  mid.y += 5;

  tl.to(camera.position, {
    x: mid.x,
    y: mid.y,
    z: mid.z,
    duration: 0.9,
    ease: "power2.out",
  }).to(camera.position, {
    x: toPos.x,
    y: toPos.y,
    z: toPos.z,
    duration: 1.1,
    ease: "power3.inOut",
  });

  tl.to(
    target,
    {
      ...toTarget,
      duration: 2,
      onUpdate: () => camera.lookAt(target),
    },
    0
  );
}

/* ───────────── ORBIT ───────────── */

export function orbit(tl, { camera, fromPos, toPos, toTarget }) {
  const radius = fromPos.distanceTo(toPos);
  const center = toTarget.clone();
  const state = { angle: 0 };

  tl.to(state, {
    angle: Math.PI * 0.5,
    duration: 1.8,
    ease: "power2.inOut",
    onUpdate: () => {
      camera.position.set(
        center.x + Math.cos(state.angle) * radius,
        toPos.y,
        center.z + Math.sin(state.angle) * radius
      );
      camera.lookAt(center);
    },
  });
}

/* ───────────── PUSH ───────────── */

export function push(tl, { camera, toPos, target, toTarget }) {
  tl.to(camera.position, {
    x: toPos.x,
    y: toPos.y,
    z: toPos.z - 2,
    duration: 0.9,
    ease: "power4.out",
  }).to(camera.position, {
    ...toPos,
    duration: 0.6,
    ease: "power2.inOut",
  });

  tl.to(
    target,
    {
      ...toTarget,
      duration: 1.4,
      onUpdate: () => camera.lookAt(target),
    },
    0
  );
}

/* ───────────── SLIDE ───────────── */

export function slide(tl, { camera, fromPos, toPos, target, toTarget }) {
  tl.fromTo(
    camera.position,
    { x: fromPos.x - 6 },
    {
      x: toPos.x,
      y: toPos.y,
      z: toPos.z,
      duration: 1.4,
      ease: "expo.inOut",
    }
  );

  tl.to(
    target,
    {
      ...toTarget,
      duration: 1.4,
      onUpdate: () => camera.lookAt(target),
    },
    0
  );
}

/* ───────────── RISE ───────────── */

export function rise(tl, { camera, fromPos, toPos, target, toTarget }) {
  tl.fromTo(
    camera.position,
    { y: fromPos.y - 6 },
    {
      ...toPos,
      duration: 1.8,
      ease: "power3.out",
    }
  );

  tl.to(
    target,
    {
      ...toTarget,
      duration: 1.8,
      onUpdate: () => camera.lookAt(target),
    },
    0
  );
}
