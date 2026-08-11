"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight full-screen WebGL background: a single fragment-shader quad that
 * renders a slow, domain-warped dark gradient with a faint electric-blue glow
 * and a soft pointer light. No external 3D library — one shader, GPU-friendly.
 *
 * - Only shown in dark theme (see wrapper class in the layout).
 * - Renders a single static frame under prefers-reduced-motion.
 * - Pauses when the tab is hidden. DPR is capped for performance.
 */
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uReduce;

float hash(vec2 p){ p = fract(p * vec2(123.34, 345.45)); p += dot(p, p + 34.345); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0,0.0)), c = hash(i + vec2(0.0,1.0)), d = hash(i + vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5*uRes.xy) / uRes.y;
  float t = uReduce > 0.5 ? 2.0 : uTime * 0.025;
  vec2 q = vec2(fbm(p*1.4 + t), fbm(p*1.4 - t + 5.2));
  float n = fbm(p*2.0 + q*1.4 + t*0.6);
  vec3 base = vec3(0.039, 0.039, 0.045);
  vec3 accent = vec3(0.29, 0.42, 1.0);
  float glow = smoothstep(0.52, 0.95, n);
  vec2 m = (uMouse - 0.5*uRes.xy) / uRes.y;
  float md = exp(-dot(p - m, p - m) * 2.6);
  vec3 col = base + accent * glow * 0.13 + accent * md * 0.10;
  col *= smoothstep(1.25, 0.15, length(p));
  float g = hash(uv * uRes.xy + fract(uTime)) * 0.05;
  col += (g - 0.025);
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // full-screen triangle
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uReduce = gl.getUniformLocation(program, "uReduce");
    gl.uniform1f(uReduce, reduce ? 1 : 0);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const mouse = { x: 0, y: 0 };

    const resize = () => {
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      mouse.x = w / 2;
      mouse.y = h / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX * dpr;
      mouse.y = canvas.height - e.clientY * dpr;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let running = true;
    const start = performance.now();
    const render = (now: number) => {
      if (!running) return;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce) raf = requestAnimationFrame(render);
    };
    render(start);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        running = true;
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 hidden dark:block"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* Fade the shader into the page background at the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_40%,var(--background))]" />
    </div>
  );
}
