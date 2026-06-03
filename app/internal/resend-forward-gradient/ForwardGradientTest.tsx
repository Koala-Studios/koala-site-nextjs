"use client";

import { type ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

import styles from "./page.module.css";

type Rgb = readonly [number, number, number];

type ShaderParams = {
  displacement: number;
  grain: number;
  noiseScale: number;
  offsetX: number;
  offsetY: number;
  rotation: number;
  scale: number;
  spacing: number;
  speed: number;
  spread: number;
};

type Palette = {
  colors: readonly Rgb[];
  name: string;
};

type ColorState = {
  b1: number;
  b2: number;
  b3: number;
  b4: number;
  b5: number;
  g1: number;
  g2: number;
  g3: number;
  g4: number;
  g5: number;
  mix5: number;
  r1: number;
  r2: number;
  r3: number;
  r4: number;
  r5: number;
};

function hexToRgb(hex: string): Rgb {
  const normalized = hex.replace("#", "").trim();
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((character) => character + character)
          .join("")
      : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) {
    throw new Error(`Invalid shader hex color: ${hex}`);
  }

  return [
    parseInt(expanded.slice(0, 2), 16) / 255,
    parseInt(expanded.slice(2, 4), 16) / 255,
    parseInt(expanded.slice(4, 6), 16) / 255,
  ];
}

function hexPalette(colors: readonly string[]): readonly Rgb[] {
  return colors.map(hexToRgb);
}

const shaderParams: ShaderParams = {
  scale: 0.7,
  spacing: 1,
  spread: 2,
  rotation: -0.38,
  displacement: 2.8,
  noiseScale: 1.2,
  grain: 0.04,
  speed: 0.0005,
  offsetX: -0.1,
  offsetY: 0.1,
};

const palettes: readonly Palette[] = [
  {
    name: "Moss Turbulence",
    colors: hexPalette(["#033704", "#122e0a", "#a95e08", "#361660"]),
  },
  {
    name: "Deep Fern Violet",
    colors: hexPalette(["#04393f", "#16370c", "#3a6be8", "#481f7b", "#417579"]),
  },
  {
    name: "Canopy Plum",
    colors: hexPalette(["#020703", "#1d4c0c", "#3a6b16", "#2f1548", "#579721"]),
  },
  {
    name: "Night Thicket",
    colors: hexPalette(["#020603", "#0f2408", "#3a6b16", "#260f44", "#b88a18"]),
  },
];

const vertexShaderSource = `#version 300 es
layout(location = 0) in vec3 position;
out vec2 vPosition;

void main() {
  gl_Position = vec4(position, 1.0);
  vPosition = position.xy;
}`;

const fragmentShaderSource = `#version 300 es
precision highp float;

uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;
uniform vec3 u_color5;
uniform float u_colorSize;
uniform float u_colorSpacing;
uniform float u_colorSpread;
uniform float u_colorRotation;
uniform float u_displacement;
uniform float u_noiseSize;
uniform float u_noiseIntensity;
uniform float u_seed;
uniform float u_color5Mix;
uniform vec2 u_colorOffset;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

in vec2 vPosition;
out vec4 fragColor;

float hash(vec2 point) {
  vec2 wrapped = 50.0 * fract(point * 0.3183099 + vec2(0.71, 0.113));
  return -1.0 + 2.0 * fract(wrapped.x * wrapped.y * (wrapped.x + wrapped.y));
}

float valueNoise(vec2 point) {
  vec2 grid = floor(point);
  vec2 local = fract(point);
  vec2 blend = local * local * (3.0 - 2.0 * local);

  return mix(
    mix(hash(grid + vec2(0.0, 0.0)), hash(grid + vec2(1.0, 0.0)), blend.x),
    mix(hash(grid + vec2(0.0, 1.0)), hash(grid + vec2(1.0, 1.0)), blend.x),
    blend.y
  );
}

vec4 gradientNoise(vec3 point) {
  vec3 grid = floor(point);
  vec3 local = fract(point);
  vec3 blend = local * local * local * (local * (local * 6.0 - 15.0) + 10.0);
  vec3 derivative = 30.0 * local * local * (local * (local - 2.0) + 1.0);

  float a = hash(grid.xy + vec2(0.0, 0.0) + grid.z);
  float b = hash(grid.xy + vec2(1.0, 0.0) + grid.z);
  float c = hash(grid.xy + vec2(0.0, 1.0) + grid.z);
  float d = hash(grid.xy + vec2(1.0, 1.0) + grid.z);
  float e = hash(grid.xy + vec2(0.0, 0.0) + grid.z + 1.0);
  float f = hash(grid.xy + vec2(1.0, 0.0) + grid.z + 1.0);
  float g = hash(grid.xy + vec2(0.0, 1.0) + grid.z + 1.0);
  float h = hash(grid.xy + vec2(1.0, 1.0) + grid.z + 1.0);

  float k0 = a;
  float k1 = b - a;
  float k2 = c - a;
  float k3 = e - a;
  float k4 = a - b - c + d;
  float k5 = a - b - e + f;
  float k6 = a - c - e + g;
  float k7 = -a + b + c - d + e - f - g + h;

  return vec4(
    k0 + k1 * blend.x + k2 * blend.y + k3 * blend.z + k4 * blend.x * blend.y + k5 * blend.x * blend.z + k6 * blend.y * blend.z + k7 * blend.x * blend.y * blend.z,
    derivative * vec3(
      k1 + k4 * blend.y + k5 * blend.z + k7 * blend.y * blend.z,
      k2 + k4 * blend.x + k6 * blend.z + k7 * blend.x * blend.z,
      k3 + k5 * blend.x + k6 * blend.y + k7 * blend.x * blend.y
    )
  );
}

vec2 rotate2d(vec2 value, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c) * value;
}

void main() {
  vec2 uv = vPosition;
  uv.x *= min(1.0, u_resolution.x / u_resolution.y);
  uv /= max(u_colorSize, 0.001);

  vec2 cursor = u_mouse;
  cursor.x *= min(1.0, u_resolution.x / u_resolution.y);
  cursor /= max(u_colorSize, 0.001);

  vec2 cursorDelta = cursor - uv;
  float cursorDistance = length(cursorDelta);
  float cursorPull = smoothstep(2.5, 0.0, cursorDistance) * 0.35;
  vec2 warpedUv = uv + cursorDelta * cursorPull;

  vec3 noiseInput = vec3(warpedUv * u_noiseSize, u_seed);
  vec3 displacementNoise = gradientNoise(noiseInput).yzw;
  vec2 position = warpedUv + displacementNoise.xz * u_displacement + u_colorOffset;
  vec2 rotatedPosition = rotate2d(position, -u_colorRotation);

  vec3 color = vec3(0.0);
  color = mix(u_color1, color, smoothstep(0.0, u_colorSpread, distance(rotatedPosition, vec2(0.0, u_colorSpacing * 1.5))));
  color = mix(u_color2, color, smoothstep(0.0, u_colorSpread, distance(rotatedPosition, vec2(0.0, u_colorSpacing * 0.5))));
  color = mix(u_color3, color, smoothstep(0.0, u_colorSpread, distance(rotatedPosition, vec2(0.0, -u_colorSpacing * 0.5))));
  color = mix(u_color4, color, smoothstep(0.0, u_colorSpread, distance(rotatedPosition, vec2(0.0, -u_colorSpacing * 1.5))));

  if (u_color5Mix > 0.0) {
    color = mix(
      color,
      u_color5,
      u_color5Mix * (1.0 - smoothstep(0.0, u_colorSpread * 0.8, distance(rotatedPosition, vec2(0.0, 0.0))))
    );
  }

  float glow = smoothstep(1.8, 0.0, cursorDistance) * 0.12;
  float grain = valueNoise(vPosition.xy * 600.0 + u_seed);
  color += glow + grain * u_noiseIntensity;

  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`;

function createShader(
  gl: WebGL2RenderingContext,
  type: GLenum,
  source: string,
) {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error("Unable to create shader.");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader) ?? "Unknown shader error";
    gl.deleteShader(shader);
    throw new Error(info);
  }

  return shader;
}

function getUniform(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  name: string,
) {
  const uniform = gl.getUniformLocation(program, name);

  if (!uniform) {
    throw new Error(`Missing shader uniform: ${name}`);
  }

  return uniform;
}

function getColorState(palette: Palette): ColorState {
  const fifth = palette.colors[4] ?? [0, 0, 0];

  return {
    r1: palette.colors[0][0],
    g1: palette.colors[0][1],
    b1: palette.colors[0][2],
    r2: palette.colors[1][0],
    g2: palette.colors[1][1],
    b2: palette.colors[1][2],
    r3: palette.colors[2][0],
    g3: palette.colors[2][1],
    b3: palette.colors[2][2],
    r4: palette.colors[3][0],
    g4: palette.colors[3][1],
    b4: palette.colors[3][2],
    r5: fifth[0],
    g5: fifth[1],
    b5: fifth[2],
    mix5: palette.colors.length > 4 ? 1 : 0,
  };
}

export function ForwardGradientHeader({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("koala-forward-gradient-test-root");
    document.body.classList.add("koala-forward-gradient-test");

    return () => {
      document.documentElement.classList.remove(
        "koala-forward-gradient-test-root",
      );
      document.body.classList.remove("koala-forward-gradient-test");
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const activeCanvas = canvas;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const glContext = activeCanvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      preserveDrawingBuffer: true,
    });

    if (!glContext) {
      console.error("WebGL2 is not supported in this browser.");
      return;
    }

    const gl = glContext;
    let vertexShader: WebGLShader | null = null;
    let fragmentShader: WebGLShader | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let vertexArray: WebGLVertexArrayObject | null = null;

    try {
      vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
      fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource,
      );
      program = gl.createProgram();

      if (!program) {
        throw new Error("Unable to create shader program.");
      }

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.bindAttribLocation(program, 0, "position");
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(
          gl.getProgramInfoLog(program) ?? "Unknown shader program error",
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }

    vertexArray = gl.createVertexArray();
    gl.bindVertexArray(vertexArray);

    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);

    const uniforms = {
      color1: getUniform(gl, program, "u_color1"),
      color2: getUniform(gl, program, "u_color2"),
      color3: getUniform(gl, program, "u_color3"),
      color4: getUniform(gl, program, "u_color4"),
      color5: getUniform(gl, program, "u_color5"),
      color5Mix: getUniform(gl, program, "u_color5Mix"),
      colorOffset: getUniform(gl, program, "u_colorOffset"),
      colorRotation: getUniform(gl, program, "u_colorRotation"),
      colorSize: getUniform(gl, program, "u_colorSize"),
      colorSpacing: getUniform(gl, program, "u_colorSpacing"),
      colorSpread: getUniform(gl, program, "u_colorSpread"),
      displacement: getUniform(gl, program, "u_displacement"),
      mouse: getUniform(gl, program, "u_mouse"),
      noiseIntensity: getUniform(gl, program, "u_noiseIntensity"),
      noiseSize: getUniform(gl, program, "u_noiseSize"),
      resolution: getUniform(gl, program, "u_resolution"),
      seed: getUniform(gl, program, "u_seed"),
    };

    let seed = 0.18;
    let resizeTimeout = 0;
    let animationFrame = 0;
    let mouseFrame = 0;
    let visible = true;
    let activePalette = 0;
    const targetMouse = { x: 0, y: 0 };
    const renderedMouse = { x: 0, y: 0 };
    const colorState = getColorState(palettes[activePalette]);

    function resize() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const bounds = activeCanvas.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);

      activeCanvas.width = Math.round(width * pixelRatio);
      activeCanvas.height = Math.round(height * pixelRatio);
      gl.viewport(0, 0, activeCanvas.width, activeCanvas.height);
      render(false);
    }

    function scheduleResize() {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resize, 100);
    }

    function setMouse(event: MouseEvent) {
      if (mouseFrame) {
        return;
      }

      const { clientX, clientY } = event;

      mouseFrame = window.requestAnimationFrame(() => {
        mouseFrame = 0;

        const bounds = activeCanvas.getBoundingClientRect();
        const width = Math.max(1, bounds.width);
        const height = Math.max(1, bounds.height);
        const localX = clientX - bounds.left;
        const localY = clientY - bounds.top;

        targetMouse.x = (localX / width) * 2 - 1;
        targetMouse.y = -((localY / height) * 2 - 1);
      });
    }

    function cyclePalette(event: MouseEvent) {
      const target = event.target;

      if (
        !visible ||
        reducedMotion ||
        (target instanceof Element &&
          target.closest(
            'a, button, input, select, textarea, [role="button"], [contenteditable="true"]',
          ))
      ) {
        return;
      }

      activePalette = (activePalette + 1) % palettes.length;
      const nextState = getColorState(palettes[activePalette]);

      gsap.to(colorState, {
        ...nextState,
        duration: 1.4,
        ease: "power2.inOut",
      });
    }

    function render(advanceSeed: boolean) {
      if (advanceSeed) {
        seed += shaderParams.speed;
      }

      if (!reducedMotion) {
        renderedMouse.x += (targetMouse.x - renderedMouse.x) * 0.12;
        renderedMouse.y += (targetMouse.y - renderedMouse.y) * 0.12;
      }

      gl.uniform1f(uniforms.seed, seed);
      gl.uniform2f(
        uniforms.resolution,
        activeCanvas.width,
        activeCanvas.height,
      );
      gl.uniform1f(uniforms.colorSize, shaderParams.scale);
      gl.uniform1f(uniforms.colorSpacing, shaderParams.spacing);
      gl.uniform1f(uniforms.colorSpread, shaderParams.spread);
      gl.uniform1f(uniforms.colorRotation, shaderParams.rotation);
      gl.uniform1f(uniforms.displacement, shaderParams.displacement);
      gl.uniform1f(uniforms.noiseSize, shaderParams.noiseScale);
      gl.uniform1f(uniforms.noiseIntensity, shaderParams.grain);
      gl.uniform2f(
        uniforms.colorOffset,
        shaderParams.offsetX,
        shaderParams.offsetY,
      );
      gl.uniform2f(uniforms.mouse, renderedMouse.x, renderedMouse.y);
      gl.uniform3f(
        uniforms.color1,
        colorState.r1,
        colorState.g1,
        colorState.b1,
      );
      gl.uniform3f(
        uniforms.color2,
        colorState.r2,
        colorState.g2,
        colorState.b2,
      );
      gl.uniform3f(
        uniforms.color3,
        colorState.r3,
        colorState.g3,
        colorState.b3,
      );
      gl.uniform3f(
        uniforms.color4,
        colorState.r4,
        colorState.g4,
        colorState.b4,
      );
      gl.uniform3f(
        uniforms.color5,
        colorState.r5,
        colorState.g5,
        colorState.b5,
      );
      gl.uniform1f(uniforms.color5Mix, colorState.mix5);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function animate() {
      if (!visible || reducedMotion) {
        return;
      }

      render(true);
      animationFrame = window.requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;

      if (visible && !reducedMotion && !animationFrame) {
        animate();
      }

      if (!visible && animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    });
    const sizeObserver = new ResizeObserver(scheduleResize);
    const canvasHost = activeCanvas.parentElement;

    window.addEventListener("resize", scheduleResize);
    window.addEventListener("click", cyclePalette);

    if (!reducedMotion) {
      window.addEventListener("mousemove", setMouse, { passive: true });
    }

    observer.observe(activeCanvas);
    sizeObserver.observe(canvasHost ?? activeCanvas);
    resize();

    if (!reducedMotion) {
      animate();
    }

    return () => {
      observer.disconnect();
      sizeObserver.disconnect();
      window.clearTimeout(resizeTimeout);
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(mouseFrame);
      window.removeEventListener("resize", scheduleResize);
      window.removeEventListener("click", cyclePalette);
      window.removeEventListener("mousemove", setMouse);
      gsap.killTweensOf(colorState);

      if (program) {
        gl.deleteProgram(program);
      }

      if (buffer) {
        gl.deleteBuffer(buffer);
      }

      if (vertexArray) {
        gl.deleteVertexArray(vertexArray);
      }

      if (vertexShader) {
        gl.deleteShader(vertexShader);
      }

      if (fragmentShader) {
        gl.deleteShader(fragmentShader);
      }
    };
  }, []);

  return (
    <div className={styles.gradientHeader}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={styles.canvas}
        data-forward-gradient-canvas
      />
      <div className={styles.canvasVeil} aria-hidden="true" />
      <div className={styles.topFade} aria-hidden="true" />
      <div className={styles.bottomFade} aria-hidden="true" />
      {children}
    </div>
  );
}
