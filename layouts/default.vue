<template>
  <div class="page-container">
    <div class="content">
      <slot />
    </div>
    
    <client-only>
      <pointer-particles></pointer-particles>
    </client-only>
  </div>
</template>

<script>
export default {
  mounted() {
    class PointerParticle {
      constructor(spread, speed, component) {
        const { ctx, pointer, hue } = component;

        this.ctx = ctx;
        this.x = pointer.x;
        this.y = pointer.y;
        this.mx = pointer.mx * 0.1;
        this.my = pointer.my * 0.1;
        this.size = Math.random() + 1;
        this.decay = 0.01;
        this.speed = speed * 0.08;
        this.spread = spread * this.speed;
        this.spreadX = (Math.random() - 0.5) * this.spread - this.mx;
        this.spreadY = (Math.random() - 0.5) * this.spread - this.my;
        this.color = `hsl(${hue}deg 90% 60%)`;
      }

      draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
      }

      collapse() {
        this.size -= this.decay;
      }

      trail() {
        this.x += this.spreadX * this.size;
        this.y += this.spreadY * this.size;
      }

      update() {
        this.draw();
        this.trail();
        this.collapse();
      }
    }

    class PointerParticles extends HTMLElement {
      static register(tag = 'pointer-particles') {
        if ('customElements' in window) {
          customElements.define(tag, this);
        }
      }

      static css = `
        :host {
          display: grid;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 1;
        }
      `;

      constructor() {
        super();

        this.canvas;
        this.ctx;
        this.fps = 60;
        this.msPerFrame = 1000 / this.fps;
        this.timePrevious;
        this.particles = [];
        this.pointer = {
          x: 0,
          y: 0,
          mx: 0,
          my: 0,
        };
        this.hue = 0;
      }

      connectedCallback() {
        const canvas = document.createElement('canvas');
        const sheet = new CSSStyleSheet();

        this.shadowroot = this.attachShadow({ mode: 'open' });

        sheet.replaceSync(PointerParticles.css);
        this.shadowroot.adoptedStyleSheets = [sheet];

        this.shadowroot.append(canvas);

        this.canvas = this.shadowroot.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasDimensions();
        this.setupEvents();
        this.timePrevious = performance.now();
        this.animateParticles();
      }

      createParticles(event, { count, speed, spread }) {
        this.setPointerValues(event);

        for (let i = 0; i < count; i++) {
          this.particles.push(new PointerParticle(spread, speed, this));
        }
      }

      setPointerValues(event) {
        // 修复滚动时的坐标计算
        const rect = this.canvas.getBoundingClientRect();
        this.pointer.x = event.clientX - rect.left;
        this.pointer.y = event.clientY - rect.top;
        this.pointer.mx = event.movementX;
        this.pointer.my = event.movementY;
      }

      setupEvents() {
        const parent = this.parentNode;

        parent.addEventListener('click', (event) => {
          this.createParticles(event, {
            count: 300,
            speed: Math.random() + 1,
            spread: Math.random() + 50,
          });
        });

        parent.addEventListener('pointermove', (event) => {
          this.createParticles(event, {
            count: 20,
            speed: this.getPointerVelocity(event),
            spread: 1,
          });
        });

        // 监听滚动事件，确保粒子效果与页面同步
        window.addEventListener('scroll', () => {
          this.setCanvasDimensions();
        });

        window.addEventListener('resize', () => this.setCanvasDimensions());
      }

      getPointerVelocity(event) {
        const a = event.movementX;
        const b = event.movementY;
        const c = Math.floor(Math.sqrt(a * a + b * b));

        return c;
      }

      handleParticles() {
        for (let i = 0; i < this.particles.length; i++) {
          this.particles[i].update();

          if (this.particles[i].size <= 0.1) {
            this.particles.splice(i, 1);
            i--;
          }
        }
      }

      setCanvasDimensions() {
        const rect = this.parentNode.getBoundingClientRect();

        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // 设置canvas背景为半透明网格
        this.ctx.fillStyle = 'rgba(10, 15, 30, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制网格背景
        this.ctx.strokeStyle = 'rgba(50, 100, 150, 0.1)';
        this.ctx.lineWidth = 1;
        
        // 水平线
        for (let y = 0; y < this.canvas.height; y += 30) {
          this.ctx.beginPath();
          this.ctx.moveTo(0, y);
          this.ctx.lineTo(this.canvas.width, y);
          this.ctx.stroke();
        }
        
        // 垂直线
        for (let x = 0; x < this.canvas.width; x += 30) {
          this.ctx.beginPath();
          this.ctx.moveTo(x, 0);
          this.ctx.lineTo(x, this.canvas.height);
          this.ctx.stroke();
        }
      }

      animateParticles() {
        requestAnimationFrame(() => this.animateParticles());

        const timeNow = performance.now();
        const timePassed = timeNow - this.timePrevious;

        if (timePassed < this.msPerFrame) return;

        const excessTime = timePassed % this.msPerFrame;

        this.timePrevious = timeNow - excessTime;

        // 重置画布（保留网格背景）
        this.ctx.fillStyle = 'rgba(10, 15, 30, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.hue = this.hue > 360 ? 0 : (this.hue += 3);

        this.handleParticles();
      }
    }

    PointerParticles.register();
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.page-container {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 修改为flex-start以允许垂直滚动 */
  color: white;
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-y: auto; /* 允许垂直滚动 */
}

.content {
  text-align: center;
  z-index: 10;
  padding: 2rem;
  max-width: 90%;
  pointer-events: auto; /* 允许内容区域的交互 */
  width: 100%;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .content {
    padding: 1rem;
  }
}
</style>