// three-effects.js - 3D卡片效果实现
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

// 主要类，用于创建和管理3D卡片效果
class CardEffect {
  constructor(selector, options = {}) {
    this.container = document.querySelector(selector);
    if (!this.container) {
      console.error(`找不到选择器 "${selector}" 对应的元素`);
      return;
    }

    // 默认选项
    this.options = {
      perspective: 1000,
      rotationFactor: 10,
      mouseRotation: true,
      autoRotate: true,
      autoRotateSpeed: 0.5,
      ...options
    };

    this.cards = [];
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.isAnimating = true;

    this.init();
  }

  init() {
    // 创建场景
    this.scene = new THREE.Scene();
    
    // 创建相机
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.z = 5;

    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    // 添加灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 2);
    this.scene.add(directionalLight);

    // 创建卡片
    this.createCards();

    // 添加事件监听器
    window.addEventListener('resize', this.onResize.bind(this));
    
    if (this.options.mouseRotation) {
      this.container.addEventListener('mousemove', this.onMouseMove.bind(this));
      this.container.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    }

    // 开始动画循环
    this.animate();
  }

  createCards() {
    // 查找所有卡片元素
    const cardElements = this.container.querySelectorAll('.card-3d');
    
    cardElements.forEach((element, index) => {
      // 获取卡片内容
      const content = element.innerHTML;
      
      // 创建卡片材质
      const texture = this.createTextureFromElement(element);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });

      // 创建卡片几何体
      const aspectRatio = element.clientWidth / element.clientHeight;
      const geometry = new THREE.PlaneGeometry(aspectRatio * 2, 2, 1, 1);
      
      // 创建卡片网格
      const card = new THREE.Mesh(geometry, material);
      
      // 设置卡片位置
      const xOffset = (index - (cardElements.length - 1) / 2) * 2.5;
      card.position.set(xOffset, 0, 0);
      
      // 添加到场景
      this.scene.add(card);
      
      // 保存卡片引用
      this.cards.push({
        mesh: card,
        element: element,
        originalRotation: new THREE.Euler(0, 0, 0)
      });
      
      // 隐藏原始HTML元素
      element.style.visibility = 'hidden';
    });
  }

  createTextureFromElement(element) {
    // 创建一个临时的canvas元素
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // 设置canvas尺寸
    canvas.width = element.clientWidth * 2;  // 2倍大小以提高清晰度
    canvas.height = element.clientHeight * 2;
    
    // 绘制元素背景
    context.fillStyle = getComputedStyle(element).backgroundColor || '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // 使用html2canvas渲染元素内容（需要额外引入html2canvas库）
    // 这里简化处理，实际使用时可以用html2canvas库
    context.font = '20px Arial';
    context.fillStyle = '#000000';
    context.textAlign = 'center';
    context.fillText(element.textContent.trim() || '卡片内容', canvas.width / 2, canvas.height / 2);
    
    // 创建纹理
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
  }

  onResize() {
    if (!this.camera || !this.renderer || !this.container) return;
    
    // 更新相机
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    
    // 更新渲染器
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  onMouseMove(event) {
    // 计算鼠标位置（归一化坐标）
    const rect = this.container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / this.container.clientWidth) * 2 - 1;
    const y = -((event.clientY - rect.top) / this.container.clientHeight) * 2 + 1;
    
    this.mouse.x = x;
    this.mouse.y = y;
    
    // 更新卡片旋转
    this.updateCardsRotation();
  }

  onMouseLeave() {
    // 重置鼠标位置
    this.mouse.x = 0;
    this.mouse.y = 0;
    
    // 平滑过渡回原始旋转
    this.cards.forEach(card => {
      gsap.to(card.mesh.rotation, {
        x: card.originalRotation.x,
        y: card.originalRotation.y,
        duration: 1.5,
        ease: 'power2.out'
      });
    });
  }

  updateCardsRotation() {
    const rotationX = -this.mouse.y * this.options.rotationFactor;
    const rotationY = this.mouse.x * this.options.rotationFactor;
    
    this.cards.forEach(card => {
      gsap.to(card.mesh.rotation, {
        x: rotationX * Math.PI / 180,
        y: rotationY * Math.PI / 180,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  }

  animate() {
    if (!this.isAnimating) return;
    
    requestAnimationFrame(this.animate.bind(this));
    
    // 自动旋转
    if (this.options.autoRotate) {
      this.cards.forEach(card => {
        card.mesh.rotation.y += this.options.autoRotateSpeed * 0.01;
      });
    }
    
    // 渲染场景
    this.renderer.render(this.scene, this.camera);
  }

  // 启动动画
  start() {
    this.isAnimating = true;
    this.animate();
  }

  // 停止动画
  stop() {
    this.isAnimating = false;
  }
}

// 创建水平卡片布局效果
function createHorizontalCards() {
  // 创建卡片容器
  const container = document.createElement('div');
  container.className = 'cards-3d-container';
  container.style.cssText = `
    position: relative;
    width: 100%;
    height: 400px;
    margin: 50px 0;
    perspective: 1000px;
  `;
  
  // 创建卡片数据
  const cardData = [
    {
      title: 'STRATEGY',
      items: ['Experience Strategy', 'Technology Strategy', 'Creative Direction', 'Discovery', 'Research'],
      icon: 'S',
      backTitle: 'Strategic Planning',
      backDesc: 'Every step into space requires careful planning'
    },
    {
      title: 'CREATIVE',
      items: ['Art Direction', 'UX/UI Design', 'Motion Design', 'Game Design', 'Illustration'],
      icon: 'C',
      backTitle: 'Creative Design',
      backDesc: 'Breakthrough designs take us further'
    },
    {
      title: 'TECH',
      items: ['WebGL Development', 'Web Development', 'Unity/Unreal', 'Interactive Installations', 'VR/AR'],
      icon: 'T',
      backTitle: 'Advanced Technology',
      backDesc: 'Cutting-edge tech is our core competency'
    }
  ];
  
  // 创建卡片元素
  cardData.forEach(data => {
    const card = document.createElement('div');
    card.className = 'card-3d';
    card.style.cssText = `
      position: absolute;
      width: 300px;
      height: 350px;
      background-color: white;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transform-style: preserve-3d;
      visibility: visible;
      backface-visibility: hidden;
    `;
    
    // 添加卡片正面内容
    const frontContent = document.createElement('div');
    frontContent.className = 'card-content card-front';
    frontContent.innerHTML = `
      <div class="card-title">${data.title}</div>
      <div class="card-icon">${data.icon}</div>
      <ul class="card-items">
        ${data.items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
    
    // 添加卡片背面内容
    const backContent = document.createElement('div');
    backContent.className = 'card-back';
    backContent.innerHTML = `
      <div class="back-content">
        <div class="back-icon">${data.icon}</div>
        <h3>${data.backTitle}</h3>
        <p>${data.backDesc}</p>
      </div>
    `;
    
    card.appendChild(frontContent);
    card.appendChild(backContent);
    container.appendChild(card);
  });
  
  // 添加到页面
  const targetSection = document.querySelector('#features') || document.querySelector('section');
  if (targetSection) {
    targetSection.appendChild(container);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
      .card-content {
        width: 100%;
        height: 100%;
        position: relative;
      }
      .card-front, .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        backface-visibility: hidden;
      }
      .card-back {
        transform: rotateY(180deg);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: linear-gradient(145deg, #111, #222);
        border-radius: 15px;
      }
      .card-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .card-icon {
        font-size: 48px;
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .card-items {
        list-style: none;
        padding: 0;
        margin-top: 40px;
      }
      .card-items li {
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px dotted #eee;
      }
      .back-content {
        padding: 20px;
        color: white;
      }
      .back-icon {
        font-size: 64px;
        font-weight: 700;
        margin-bottom: 20px;
      }
    `;
    document.head.appendChild(style);
    
    // 初始化卡片效果
    return new CardEffect('.cards-3d-container', {
      rotationFactor: 5,
      autoRotate: false
    });
  }
  
  return null;
}

// 创建浮动元素效果
function createFloatingElements() {
  const elements = document.querySelectorAll('.reveal-item');
  
  elements.forEach(element => {
    // 添加浮动动画
    gsap.to(element, {
      y: '10px',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random()
    });
    
    // 添加鼠标悬停效果
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
}

// 创建视差滚动效果
function enhanceParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.parallax-bg, .parallax-content');
  
  parallaxElements.forEach(element => {
    const depth = element.classList.contains('parallax-bg') ? 0.3 : 0.1;
    
    gsap.to(element, {
      y: `${depth * 100}%`,
      ease: 'none',
      scrollTrigger: {
        trigger: element.closest('.parallax-section'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

// 创建页面过渡效果
function createPageTransitions() {
  const links = document.querySelectorAll('nav a');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        const targetSection = document.querySelector(href);
        if (targetSection) {
          // 创建过渡遮罩
          const overlay = document.createElement('div');
          overlay.className = 'page-transition-overlay';
          overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #1a1aff;
            z-index: 9999;
            transform: translateY(100%);
          `;
          document.body.appendChild(overlay);
          
          // 执行过渡动画
          gsap.timeline()
            .to(overlay, {
              y: '0%',
              duration: 0.5,
              ease: 'power2.inOut'
            })
            .to(overlay, {
              y: '-100%',
              duration: 0.5,
              delay: 0.1,
              ease: 'power2.inOut',
              onComplete: () => {
                overlay.remove();
              }
            });
          
          // 滚动到目标位置
          setTimeout(() => {
            window.scrollTo({
              top: targetSection.offsetTop - 60,
              behavior: 'auto'
            });
          }, 500);
        }
      }
    });
  });
}

// 初始化所有效果
document.addEventListener('DOMContentLoaded', () => {
  // 等待GSAP加载完成
  if (typeof gsap !== 'undefined') {
    // 创建3D卡片效果
    const cardEffect = createHorizontalCards();
    
    // 增强现有动画
    createFloatingElements();
    enhanceParallaxEffect();
    createPageTransitions();
    
    // 监听自定义事件
    window.addEventListener('rocket-control', (e) => {
      if (cardEffect && e.detail && e.detail.action) {
        switch(e.detail.action) {
          case 'rotate':
            cardEffect.options.autoRotate = !cardEffect.options.autoRotate;
            break;
          case 'reset':
            cardEffect.onMouseLeave();
            break;
        }
      }
    });
  } else {
    console.error('GSAP库未加载，部分动画效果将无法使用');
  }
});

// 导出类，以便其他文件可以使用
export { CardEffect }; 