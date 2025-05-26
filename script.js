document.addEventListener('DOMContentLoaded', function() {
    // 注册GSAP插件
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    // 设置初始状态
    const initialActiveContent = document.querySelector('.model-content.active');
    if (initialActiveContent) {
        gsap.set(initialActiveContent, { opacity: 1, display: 'block' });
        
        const modelImage = initialActiveContent.querySelector('.model-image');
        const modelDetails = initialActiveContent.querySelector('.model-details');
        
        if (modelImage) gsap.set(modelImage, { opacity: 1 });
        if (modelDetails) gsap.set(modelDetails, { opacity: 1 });
    }
    
    // 创建星星背景
    createStars();
    
    // 处理视频背景
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        // 检查视频是否可以播放
        heroVideo.addEventListener('loadeddata', function() {
            console.log('视频已加载，准备播放');
            // 确保视频播放
            heroVideo.play().catch(error => {
                console.warn('自动播放失败:', error);
                // 如果自动播放失败，添加点击播放功能
                document.querySelector('.hero').addEventListener('click', () => {
                    heroVideo.play();
                });
            });
        });
        
        // 视频错误处理
        heroVideo.addEventListener('error', function(e) {
            console.error('视频加载错误:', e);
            // 如果视频加载失败，使用CSS背景图作为备用
            document.querySelector('.hero').style.backgroundImage = 'url("images/hero-poster.jpg")';
        });
    }
    
    // 高级加载动画
    const loader = document.querySelector('.loader');
    const loaderText = document.querySelector('.loader-text');
    const loadingTexts = ['初始化系统', '加载数据', '准备发射', '开始倒计时'];
    let textIndex = 0;
    
    // 不同字体的SPACEX
    const fonts = [
        "'SF Pro Display', sans-serif",
        "'Arial Black', sans-serif",
        "Helvetica, sans-serif",
        "'Courier New', monospace",
        "'Times New Roman', serif",
        "'Trebuchet MS', sans-serif",
        "'Impact', sans-serif",
        "'Georgia', serif",
        "'Futura', sans-serif",
        "'Roboto', sans-serif",
        "'Montserrat', sans-serif",
        "'Oswald', sans-serif",
        "'Playfair Display', serif",
        "'Bebas Neue', cursive",
        "'Raleway', sans-serif",
        "'Lato', sans-serif",
        "'Open Sans', sans-serif",
        "'Poppins', sans-serif",
        "'Merriweather', serif",
        "'Source Sans Pro', sans-serif",
        "'Fira Sans', sans-serif",
        "'Nunito', sans-serif",
        "'PT Sans', sans-serif",
        "'Titillium Web', sans-serif",
        "'Noto Sans', sans-serif",
        "'Ubuntu', sans-serif",
        "'Quicksand', sans-serif",
        "'Barlow', sans-serif",
        "'Karla', sans-serif",
        "'Rubik', sans-serif",
        "'Montserrat Alternates', sans-serif",
        "'Roboto Condensed', sans-serif",
        "'Roboto Slab', serif",
        "'Source Serif Pro', serif",
        "'Libre Baskerville', serif",
        "'Playfair Display SC', serif",
        "'Bungee', cursive",
        "'Pacifico', cursive",
        "'Handlee', cursive",
        "'Arimo', sans-serif",
        "'Tinos', serif",
        "'Lora', serif",
        "'Merriweather Sans', sans-serif",
        "'Montserrat Subrayada', sans-serif",
        "'Open Sans Condensed', sans-serif",
        "'Ovo', serif",
        "'Ubuntu Condensed', sans-serif",
        "'Raleway Dots', cursive",
        "'Caveat', cursive",
        "'Amatic SC', cursive",
        "'Cinzel', serif",
        "'Caveat Brush', cursive",
        "'Lobster', cursive",
        "'Bungee Inline', cursive",
        "'Pacifico', cursive",
        "'Handlee', cursive",
        "'Arimo', sans-serif",
        "'Tinos', serif",
        "'Lora', serif",
        "'Merriweather Sans', sans-serif",
        "'Montserrat Subrayada', sans-serif",
        "'Open Sans Condensed', sans-serif",
        "'Ovo', serif",
        "'Ubuntu Condensed', sans-serif",
        "'Raleway Dots', cursive",
        "'Caveat', cursive",
        "'Amatic SC', cursive",
        "'Cinzel', serif",
        "'Caveat Brush', cursive",
        "'Lobster', cursive",
        "'Bungee Inline', cursive",
        "'Pacifico', cursive",
        "'Handlee', cursive",
        "'Arimo', sans-serif",
        "'Tinos', serif",
        "'Lora', serif",
        "'Merriweather Sans', sans-serif",
        "'Montserrat Subrayada', sans-serif",
        "'Open Sans Condensed', sans-serif",
        "'Ovo', serif",
        "'Ubuntu Condensed', sans-serif",
        "'Raleway Dots', cursive",
        "'Caveat', cursive",
        "'Amatic SC', cursive",
        "'Cinzel', serif",
        "'Caveat Brush', cursive",
        "'Lobster', cursive",
        "'Bungee Inline', cursive",
        "'Pacifico', cursive",
        "'Handlee', cursive",
    ];
    
    const fontWeights = [300, 400, 500, 600, 700, 800, 900, 300, 400, 500, 600, 700, 800, 900, 300, 400, 500, 600, 700, 800, 900, 300, 400, 500, 600, 700, 800, 900, 300, 400];
    const letterSpacings = ['10px', '8px',  '5px', '10px', '20px', '4px', '16px', '6px', '18px', '3px', '7px', '9px', '11px', '13px', '14px', '17px', '19px', '21px', '2px', '1px', '22px',  '30px', '0px', '35px',  '24px', '27px'];
    const currentLogo = document.querySelector('.loader-logo.current');
    // 移除未使用的nextLogo变量
    let fontIndex = 0;
    
    // 设置初始字体样式
    currentLogo.style.fontFamily = fonts[0];
    currentLogo.style.fontWeight = fontWeights[0];
    currentLogo.style.letterSpacing = letterSpacings[0];
    
    // 字体切换函数 - 直接切换，不使用动画，随机选择字体
    const changeFont = () => {
        // 随机选择字体索引，而不是顺序切换
        const randomIndex = Math.floor(Math.random() * fonts.length);
        
        // 随机选择字重和字间距
        const randomWeightIndex = Math.floor(Math.random() * fontWeights.length);
        const randomSpacingIndex = Math.floor(Math.random() * letterSpacings.length);
        
        currentLogo.style.fontFamily = fonts[randomIndex];
        currentLogo.style.fontWeight = fontWeights[randomWeightIndex];
        currentLogo.style.letterSpacing = letterSpacings[randomSpacingIndex];
    };
    
    // 更快的字体切换速度 - 每130毫秒
    const fontInterval = setInterval(changeFont, 130);
    
    // 文字切换动画
    const textInterval = setInterval(() => {
        textIndex = (textIndex + 1) % loadingTexts.length;
        // 文字淡出
        gsap.to(loaderText, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                // 更换文字
                loaderText.textContent = loadingTexts[textIndex];
                // 文字淡入
                gsap.to(loaderText, {
                    opacity: 0.8,
                    duration: 0.3
                });
            }
        });
    }, 1000);
    
    // 模拟加载完成
    setTimeout(() => {
        clearInterval(textInterval);
        clearInterval(fontInterval);
        
        // 加载完成后的动画
        gsap.timeline()
            .to(loaderText, {
                text: '准备就绪',
                duration: 0.1
            })
            .to(loader, {
                opacity: 0,
                duration: 0.8,
                delay: 1,
                onComplete: () => {
                    loader.style.display = 'none';
                    
                    // 初始化所有动画
                    initAnimations();
                    
                    // 确保火箭模型内容正确显示
                    
                }
            });
    }, 4000);
    
    // 自定义光标
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });
    
    document.addEventListener('mousedown', () => {
        gsap.to(cursor, {
            scale: 0.8,
            duration: 0.2
        });
    });
    
    document.addEventListener('mouseup', () => {
        gsap.to(cursor, {
            scale: 1,
            duration: 0.2
        });
    });
    
    // 链接和按钮悬停效果
    const links = document.querySelectorAll('a, button');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 1.5,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                duration: 0.3
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                duration: 0.3
            });
        });
    });
    
    // 移动菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        if (menuToggle.classList.contains('active')) {
            gsap.to(menuToggle.querySelectorAll('span')[0], {
                rotation: 45,
                y: 8,
                duration: 0.3
            });
            gsap.to(menuToggle.querySelectorAll('span')[1], {
                rotation: -45,
                y: -8,
                duration: 0.3
            });
        } else {
            gsap.to(menuToggle.querySelectorAll('span'), {
                rotation: 0,
                y: 0,
                duration: 0.3
            });
        }
    });
    
    // 移动菜单链接点击
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            gsap.to(menuToggle.querySelectorAll('span'), {
                rotation: 0,
                y: 0,
                duration: 0.3
            });
        });
    });
    
    // 标签切换功能
    const tabButtons = document.querySelectorAll('.tab-button');
    const modelContents = document.querySelectorAll('.model-content');
    let activeContent = document.querySelector('.model-content.active');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 获取当前活动内容和目标内容
            const model = button.getAttribute('data-model');
            const targetContent = document.getElementById(`${model}-content`);
            
            // 如果点击的是当前活动标签，不执行任何操作
            if (targetContent.classList.contains('active')) {
                return;
            }
            
            // 更新标签按钮状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 创建动画时间轴
            const tl = gsap.timeline();
            
            // 1. 当前内容淡出并向上移动
            tl.to(activeContent, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    // 移除当前活动状态
                    activeContent.classList.remove('active');
                    
                    // 重置所有内容的位置
                    modelContents.forEach(content => {
                        if (!content.classList.contains('active')) {
                            gsap.set(content, { opacity: 0, y: 30, display: 'none' });
                        }
                    });
                    
                    // 设置新内容为显示状态但透明度为0
                    gsap.set(targetContent, { display: 'block', opacity: 0, y: 30 });
                }
            })
            
            // 2. 新内容淡入并从下方滑入
            .to(targetContent, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
                onStart: () => {
                    targetContent.classList.add('active');
                    activeContent = targetContent;
                    
                    // 触发内部元素的动画
                    const modelImage = targetContent.querySelector('.model-image');
                    const modelDetails = targetContent.querySelector('.model-details');
                    
                    if (modelImage && !modelImage.classList.contains('reveal')) {
                        gsap.fromTo(modelImage, 
                            { opacity: 0, x: -50 },
                            { opacity: 1, x: 0, duration: 0.6, delay: 0.1, ease: 'power2.out' }
                        );
                        modelImage.classList.add('reveal');
                    }
                    
                    if (modelDetails && !modelDetails.classList.contains('reveal')) {
                        gsap.fromTo(modelDetails,
                            { opacity: 0, x: 50 },
                            { opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' }
                        );
                        modelDetails.classList.add('reveal');
                    }
                }
            });
        });
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏透明度变化
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
    });
    
    // CTA按钮点击效果
    const ctaButton = document.querySelector('.hero .cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.querySelector('#overview').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // 模态框功能
    const modal = document.getElementById('detail-modal');
    const modalBody = document.querySelector('.modal-body');
    const closeModal = document.querySelector('.close-modal');
    
    // 图片点击打开模态框
    const modelImages = document.querySelectorAll('.model-image');
    modelImages.forEach(image => {
        image.addEventListener('click', () => {
            const imgSrc = image.querySelector('img').src;
            const imgAlt = image.querySelector('img').alt;
            const modelDetails = image.closest('.model-grid').querySelector('.model-details').innerHTML;
            
            modalBody.innerHTML = `
                <div class="modal-image">
                    <img src="${imgSrc}" alt="${imgAlt}" style="width: 100%; border-radius: 8px; margin-bottom: 20px;">
                </div>
                <div class="modal-info">
                    ${modelDetails}
                </div>
            `;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 画廊图片点击打开模态框
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const imgAlt = item.querySelector('img').alt;
            const overlayTitle = item.querySelector('.overlay-content h4').textContent;
            const overlayText = item.querySelector('.overlay-content p')?.textContent || '';
            
            modalBody.innerHTML = `
                <div class="modal-image">
                    <img src="${imgSrc}" alt="${imgAlt}" style="width: 100%; border-radius: 8px; margin-bottom: 20px;">
                </div>
                <div class="modal-info">
                    <h3>${overlayTitle}</h3>
                    <p>${overlayText}</p>
                </div>
            `;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 关闭模态框
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 3D模型控制
    const controlButtons = document.querySelectorAll('.control-btn');
    controlButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            
            // 移除未使用的3D模型控制代码
        });
    });
    
    // 专业领域卡片鼠标跟踪效果
    const expertiseCards = document.querySelectorAll('.expertise-cards .card-3d');
    const expertiseSection = document.querySelector('.expertise');
    
    if (expertiseSection && expertiseCards.length > 0) {
        expertiseSection.addEventListener('mousemove', (e) => {
            const sectionRect = expertiseSection.getBoundingClientRect();
            const centerX = sectionRect.width / 2;
            const centerY = sectionRect.height / 2;
            
            const mouseX = e.clientX - sectionRect.left;
            const mouseY = e.clientY - sectionRect.top;
            
            const moveX = (mouseX - centerX) / 25;
            const moveY = (mouseY - centerY) / 25;
            
            expertiseCards.forEach((card, index) => {
                // 根据卡片位置调整旋转方向和幅度
                const factor = index === 1 ? 1 : index === 0 ? 1.2 : 0.8;
                const rotateY = moveX * factor;
                const rotateX = -moveY * factor;
                
                gsap.to(card, {
                    rotateY: rotateY,
                    rotateX: rotateX,
                    duration: 0.5,
                    ease: 'power1.out'
                });
            });
        });
        
        expertiseSection.addEventListener('mouseleave', () => {
            expertiseCards.forEach((card, index) => {
                // 重置卡片位置
                let defaultRotateY = 0;
                if (index === 0) defaultRotateY = 5;
                if (index === 2) defaultRotateY = -5;
                
                gsap.to(card, {
                    rotateY: defaultRotateY,
                    rotateX: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    // 滚动动画
    function initAnimations() {
        // 数字计数动画
        const countElements = document.querySelectorAll('.count-up');
        
        function startCounting(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCount = () => {
                current += step;
                if (current < target) {
                    element.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCount);
                } else {
                    element.textContent = target + '+';
                }
            };
            
            updateCount();
        }
        
        // 滚动触发动画
        gsap.registerPlugin(ScrollTrigger);
        
        // 文字显示动画
        const revealTexts = document.querySelectorAll('.reveal-text');
        
        revealTexts.forEach(text => {
            ScrollTrigger.create({
                trigger: text,
                start: 'top 80%',
                onEnter: () => text.classList.add('reveal')
            });
        });
        
        // 火箭模型部分滚动触发动画
        const modelsSection = document.querySelector('.models');
        if (modelsSection) {
            ScrollTrigger.create({
                trigger: modelsSection,
                start: 'top 70%',
                once: true,
                onEnter: () => {
                    // 确保当前活动的内容可见
                    const activeContent = document.querySelector('.model-content.active');
                    const activeTab = document.querySelector('.tab-button.active');
                    
                    if (activeContent && activeTab) {
                        // 触发内部元素的动画
                        const modelImage = activeContent.querySelector('.model-image');
                        const modelDetails = activeContent.querySelector('.model-details');
                        
                        gsap.to(activeContent, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: 'power2.out'
                        });
                        
                        if (modelImage && !modelImage.classList.contains('reveal')) {
                            gsap.fromTo(modelImage, 
                                { opacity: 0, x: -50 },
                                { opacity: 1, x: 0, duration: 0.6, delay: 0.1, ease: 'power2.out' }
                            );
                            modelImage.classList.add('reveal');
                        }
                        
                        if (modelDetails && !modelDetails.classList.contains('reveal')) {
                            gsap.fromTo(modelDetails,
                                { opacity: 0, x: 50 },
                                { opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' }
                            );
                            modelDetails.classList.add('reveal');
                        }
                    }
                }
            });

            // 添加自动切换标签功能
            const tabButtons = document.querySelectorAll('.tab-button');
            let currentTabIndex = 0;
            const modelsSectionHeight = modelsSection.offsetHeight;
            
            // 创建一个滚动触发器，根据滚动位置切换标签
            ScrollTrigger.create({
                trigger: modelsSection,
                start: 'top 50%',
                end: `bottom bottom-=${modelsSectionHeight/2}`,
                scrub: true,
                onUpdate: (self) => {
                    // 根据滚动进度计算应该显示哪个标签
                    const progress = self.progress;
                    const newIndex = Math.floor(progress * tabButtons.length);
                    
                    // 防止索引越界并且只在需要变化时切换
                    if (newIndex >= 0 && newIndex < tabButtons.length && newIndex !== currentTabIndex) {
                        // 触发点击事件，使用现有的标签切换逻辑
                        tabButtons[newIndex].click();
                        currentTabIndex = newIndex;
                    }
                }
            });
        }
        
        // 创新部分出场动画
        const featuresSection = document.querySelector('.features');
        const featureItems = document.querySelectorAll('.feature');
        
        if (featuresSection && featureItems.length) {
            // 初始设置 - 所有特性项目都不可见
            gsap.set(featureItems, { 
                opacity: 0,
                y: 50,
                scale: 0.9
            });
            
            // 创建滚动触发动画
            ScrollTrigger.create({
                trigger: featuresSection,
                start: 'top 70%',
                onEnter: () => {
                    // 标题动画
                    const featuresTitle = featuresSection.querySelector('h2');
                    if (featuresTitle) {
                        gsap.fromTo(featuresTitle, 
                            { opacity: 0, y: -30 },
                            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
                        );
                    }
                    
                    // 特性项目依次出现
                    gsap.to(featureItems, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        stagger: 0.15, // 每个项目之间的延迟
                        duration: 0.8,
                        ease: 'back.out(1.5)',
                        onComplete: () => {
                            // 添加悬浮效果
                            featureItems.forEach((item, index) => {
                                // 创建轻微浮动动画，每个项目有不同的延迟
                                gsap.to(item, {
                                    y: -10,
                                    duration: 2,
                                    repeat: -1,
                                    yoyo: true,
                                    ease: 'sine.inOut',
                                    delay: index * 0.2 // 错开浮动时间
                                });
                                
                                // 添加图标动画
                                const icon = item.querySelector('.feature-icon');
                                if (icon) {
                                    gsap.to(icon, {
                                        scale: 1.1, // 改为轻微放大效果
                                        duration: 2,
                                        repeat: -1,
                                        yoyo: true, // 来回放大缩小
                                        ease: 'sine.inOut',
                                        delay: index * 0.3
                                    });
                                }
                            });
                        }
                    });
                },
                onLeaveBack: () => {
                    // 当向上滚动离开视图时，重置动画
                    gsap.to(featureItems, {
                        opacity: 0,
                        y: 50,
                        scale: 0.9,
                        stagger: 0.1,
                        duration: 0.5
                    });
                }
            });
        }
        
        // 项目显示动画
        const revealItems = document.querySelectorAll('.reveal-item');
        
        revealItems.forEach((item, index) => {
            ScrollTrigger.create({
                trigger: item,
                start: 'top 80%',
                onEnter: () => {
                    setTimeout(() => {
                        item.classList.add('reveal');
                        
                        // 如果是数字元素，开始计数动画
                        const countElement = item.querySelector('.count-up');
                        if (countElement) {
                            startCounting(countElement);
                        }
                    }, index * 100);
                }
            });
        });
        
        // 画廊部分特殊处理 - 增强动画效果
        const galleryItems = document.querySelectorAll('.gallery-item');
        const gallerySection = document.querySelector('.gallery');
        
        if (gallerySection && galleryItems.length) {
            // 创建整体画廊动画时间轴
            const galleryTl = gsap.timeline({
                scrollTrigger: {
                    trigger: gallerySection,
                    start: 'top 70%',
                    end: 'center center',
                    toggleActions: 'play none none reverse'
                }
            });
            
            // 应用交错动画到所有画廊项目
            galleryTl.to('.gallery .reveal-text', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
            })
            .fromTo(galleryItems, 
                {opacity: 0, y: 60, scale: 0.9},
                {
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power3.out',
                    onComplete: () => {
                        // 添加类以保持状态
                        galleryItems.forEach(item => item.classList.add('reveal'));
                        
                        // 添加进入提示动画
                        const scrollIndicator = document.querySelector('.scroll-indicator-horizontal');
                        if (scrollIndicator) {
                            gsap.fromTo(scrollIndicator, 
                                {opacity: 0, y: 20},
                                {opacity: 1, y: 0, duration: 0.8, delay: 0.5}
                            );
                        }
                    }
                }, 
                '-=0.4'
            );
            
            // 添加鼠标移动视差效果
            gallerySection.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX / window.innerWidth - 0.5;
                const mouseY = e.clientY / window.innerHeight - 0.5;
                
                galleryItems.forEach((item, index) => {
                    const depth = 0.05 + (index * 0.01);
                    const moveX = mouseX * 50 * depth;
                    const moveY = mouseY * 30 * depth;
                    
                    gsap.to(item, {
                        x: moveX,
                        y: moveY,
                        duration: 1.2,
                        ease: 'power1.out'
                    });
                });
            });
            
            // 鼠标离开时重置位置
            gallerySection.addEventListener('mouseleave', () => {
                galleryItems.forEach(item => {
                    gsap.to(item, {
                        x: 0,
                        y: 0,
                        duration: 1.2,
                        ease: 'power2.out'
                    });
                });
            });
            
            // 添加滚动右侧渐变提示
            const galleryGrid = document.querySelector('.gallery-grid');
            if (galleryGrid) {
                // 创建右侧渐变提示元素
                const fadeRight = document.createElement('div');
                fadeRight.className = 'fade-right-indicator';
                gallerySection.appendChild(fadeRight);
                
                // 监听滚动位置
                galleryGrid.addEventListener('scroll', () => {
                    const scrollLeft = galleryGrid.scrollLeft;
                    const maxScroll = galleryGrid.scrollWidth - galleryGrid.clientWidth;
                    
                    // 根据滚动位置调整提示透明度
                    if (maxScroll - scrollLeft < 20) {
                        gsap.to(fadeRight, {opacity: 0, duration: 0.3});
                        gsap.to('.scroll-indicator-horizontal', {opacity: 0, duration: 0.3});
                    } else {
                        gsap.to(fadeRight, {opacity: 1, duration: 0.3});
                        gsap.to('.scroll-indicator-horizontal', {opacity: 1, duration: 0.3});
                    }
                });
            }
        }
        
        // 新增: 旋转卡片效果
        const cardsContainer = document.querySelector('.cards');
        const scrollCards = document.querySelectorAll('.scroll-card');
        
        if (cardsContainer && scrollCards.length) {
            // 设置卡片初始位置 - 从左到右依次排列
            function initializeCards() {
                scrollCards.forEach((card, index) => {
                    // 设置初始位置在左侧屏幕外，更加靠左
                    const xPos = -120 - (index * 30); // 调整间距，使卡片更加集中在左侧
                    
                    // 设置随机旋转角度，增加一些变化
                    const rotateAngle = -5 + (index * 2); // 使旋转角度更有规律
                    
                    gsap.set(card, {
                        x: `${xPos}%`,
                        y: `${(index % 2 === 0 ? -1 : 1) * (index * 2)}%`, // 使垂直排列更有规律
                        rotation: rotateAngle,
                        opacity: 0.6, // 初始时就有一定的可见度
                        scale: 0.9 // 稍微增大初始尺寸
                    });
                });
            }
            
            // 创建滚动触发的动画
            function createScrollAnimation() {
                // 每张卡片的动画时间线
                scrollCards.forEach((card, index) => {
                    const cardTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: '.gallery',
                            start: 'top 70%', // 稍微提前触发
                            end: 'center center',
                            scrub: 1, // 平滑滚动效果
                            // markers: true, // 调试用
                            toggleActions: 'play reverse play reverse' // 上滚动时反向播放
                        }
                    });
                    
                    // 计算最终位置 - 卡片均匀分布，减少重叠
                    const finalXPos = (index - (scrollCards.length - 1) / 2) * 60; // 增加间距到60%
                    const finalYPos = (index % 2 === 0 ? -1 : 1) * (index * 3); // 减少垂直交错幅度
                    
                    // 卡片从左到右移动并淡入
                    cardTl.to(card, {
                        x: `${finalXPos}%`,
                        y: `${finalYPos}%`,
                        rotation: card._gsap.rotation, // 保持初始旋转角度
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: 'power2.out'
                    });
                });
                
                // 整体画廊的动画时间线
                const galleryTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.gallery',
                        start: 'top 70%',
                        toggleActions: 'play none none reverse'
                    }
                });
                
                // 标题淡入动画
                galleryTl.to('.gallery .reveal-text', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            }
            
            // 鼠标移动产生视差效果
            function handleMouseMove(e) {
                // 计算鼠标位置相对于容器中心的偏移
                const rect = cardsContainer.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                
                // 所有卡片跟随鼠标移动，产生视差效果
                scrollCards.forEach((card, index) => {
                    // 获取当前卡片的GSAP属性
                    const cardGsap = card._gsap || {};
                    const baseX = parseFloat(cardGsap.x) || 0;
                    const baseY = parseFloat(cardGsap.y) || 0;
                    
                    // 计算鼠标是否悬停在此卡片上
                    const cardRect = card.getBoundingClientRect();
                    const isHovered = e.clientX >= cardRect.left && e.clientX <= cardRect.right && 
                                      e.clientY >= cardRect.top && e.clientY <= cardRect.bottom;
                    
                    // 仅增加非常轻微的视差效果，不改变卡片主要位置
                    const depth = 0.01 + (index * 0.003); // 进一步减小移动幅度
                    const moveX = mouseX * depth;
                    const moveY = mouseY * depth;
                    
                    // 使用非常小的移动量，基于卡片的原始位置添加视差
                    gsap.to(card, {
                        x: baseX + (moveX * 0.02), // 基于原始位置添加少量偏移
                        y: baseY + (moveY * 0.02), // 基于原始位置添加少量偏移
                        rotation: cardGsap.rotation + (mouseX * 0.0001), // 进一步减小旋转量
                        duration: 0.4, // 加快响应时间
                        ease: 'power1.out',
                        overwrite: 'auto' // 防止动画叠加
                    });
                    
                    // 如果悬停在卡片上，添加缩放但不改变位置
                    if (isHovered) {
                        gsap.to(card, {
                            scale: 1.05,
                            duration: 0.3,
                            ease: 'power1.out',
                            overwrite: false // 允许与位置动画共存
                        });
                    } else {
                        gsap.to(card, {
                            scale: 1,
                            duration: 0.3,
                            ease: 'power1.out',
                            overwrite: false // 允许与位置动画共存
                        });
                    }
                });
            }
            
            // 监听鼠标移动
            cardsContainer.addEventListener('mousemove', handleMouseMove);
            
            // 添加一个新的鼠标离开事件处理函数
            cardsContainer.addEventListener('mouseleave', () => {
                // 恢复每张卡片的原始位置和旋转 - 回到左侧初始位置
                scrollCards.forEach((card, index) => {
                    // 设置回到左侧的位置，而不是最终位置
                    // 所有卡片都回到左侧，而不是分散排列
                    const leftPos = -100; // 左侧位置
                    const yOffset = (index % 2 === 0 ? -1 : 1) * (index * 2); // 保持一些垂直错落感
                    
                    // 恢复到左侧初始位置，使用较快的过渡
                    gsap.to(card, {
                        x: `${leftPos}%`,
                        y: `${yOffset}%`,
                        rotation: -5 + (index * 2), // 添加一些随机旋转
                        scale: 0.9,
                        duration: 0.6,
                        ease: 'power3.out'
                    });
                });
            });
            
            // 初始化
            initializeCards();
            createScrollAnimation();
        }
        
        // 卡片翻转动画
        const expertiseCards = document.querySelectorAll('.expertise-cards .card-3d');
        
        // 设置卡片初始状态：全部堆叠在中间
        expertiseCards.forEach((card) => {
            gsap.set(card, { 
                rotationY: 180, 
                opacity: 0,
                transformPerspective: 1000,
                transformOrigin: "center center",
                x: 0, // 所有卡片初始位置都在中间
                zIndex: 10
            });
        });
        
        // 创建滚动触发的翻转动画
        ScrollTrigger.create({
            trigger: '.expertise',
            start: 'top 70%',
            onEnter: () => {
                // 创建主时间轴
                const mainTl = gsap.timeline();
                
                // 第一步：显示堆叠的卡片
                mainTl.to(expertiseCards, {
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1
                });
                
                // 第二步：卡片分开
                mainTl.to(expertiseCards, {
                    x: (index, target) => {
                        // 左、中、右卡片位置
                        if (index === 0) return -340;
                        if (index === 2) return 340;
                        return 0;
                    },
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.1
                });
                
                // 第三步：卡片翻转
                expertiseCards.forEach((card, index) => {
                    mainTl.to(card, {
                        rotationY: -20, // 先往反方向旋转一点，增加弹性
                        duration: 0.6,
                        ease: 'power2.out',
                        delay: 0.1 * index
                    }, "-=0.4")
                    .to(card, {
                        rotationY: 0, // 然后回到正面
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.5)'
                    }, "-=0.2");
                });
            },
            onLeaveBack: () => {
                // 当向上滚动离开视图时，卡片翻回背面并堆叠
                const reverseTl = gsap.timeline();
                
                // 先翻转
                reverseTl.to(expertiseCards, {
                    rotationY: 180,
                    duration: 0.3,
                    ease: 'power2.in',
                    stagger: 0.1
                });
                
                // 然后回到中间
                reverseTl.to(expertiseCards, {
                    x: 0,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1
                }, "-=0.3");
            }
        });
        
        // 水平滚动效果
        const horizontalSection = document.querySelector('.horizontal-scroll');
        
        if (horizontalSection && window.innerWidth > 768) {
            // 创建更平滑的水平滚动效果
            const horizontalTl = gsap.timeline({
                scrollTrigger: {
                    trigger: horizontalSection,
                    start: 'top top',
                    end: () => `+=${horizontalSection.offsetHeight * 1.5}`, // 增加滚动区域长度
                    scrub: 1, // 增加平滑度
                    pin: true,
                    anticipatePin: 1, // 提前准备pin效果
                    invalidateOnRefresh: true, // 窗口大小变化时刷新
                }
            });

            // 为每个横向项目添加动画
            const horizontalItems = document.querySelectorAll('.horizontal-item');
            
            horizontalTl
                .to('.horizontal-container', {
                    x: () => -(document.querySelector('.horizontal-container').offsetWidth - window.innerWidth),
                    ease: 'power1.inOut' // 使用更平滑的缓动函数
                })
                // 添加标题淡入动画
                .to('.horizontal-caption', {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 0.5
                }, "<");

            // 初始化时设置标题
            gsap.set('.horizontal-caption', {opacity: 0, y: 20});
            
            // 添加横向项目的悬停效果
            horizontalItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    gsap.to(item.querySelector('img'), {
                        scale: 1.05,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                });
                
                item.addEventListener('mouseleave', () => {
                    gsap.to(item.querySelector('img'), {
                        scale: 1,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                });
            });
        }
        
        // 视差滚动效果
        gsap.to('.parallax-bg', {
            y: '30%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.parallax-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
        
        // 视差内容效果
        gsap.to('.parallax-content', {
            y: '-20%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.parallax-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
        
        // 添加滚动进度指示器
        gsap.to('body', {
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                onUpdate: (self) => {
                    const progress = Math.round(self.progress * 100);
                    document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
                }
            }
        });
    }
    
    // 创建星星背景
    function createStars() {
        // 创建星星容器
        const loader = document.querySelector('.loader');
        const starsContainer = document.createElement('div');
        starsContainer.className = 'loader-stars';
        loader.appendChild(starsContainer);
        
        const starsCount = 30;
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.className = 'loader-star';
            
            // 随机位置
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // 随机大小
            const size = Math.random() * 2 + 1;
            
            // 随机动画延迟
            const delay = Math.random() * 2;
            
            // 随机亮度
            const brightness = Math.random() * 0.5 + 0.3;
            
            // 设置样式
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.opacity = '0';
            star.style.backgroundColor = `rgba(255, 255, 255, ${brightness})`;
            star.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, ${brightness * 0.8})`;
            star.style.animation = `star-twinkle 2s infinite ${delay}s`;
            
            starsContainer.appendChild(star);
        }
        
        // 添加星星动画样式
        if (!document.getElementById('star-animation-style')) {
            const style = document.createElement('style');
            style.id = 'star-animation-style';
            style.textContent = `
                .loader-stars {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                }
                
                .loader-star {
                    position: absolute;
                    border-radius: 50%;
                }
                
                @keyframes star-twinkle {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // 创建图片文件夹提示
    console.log('注意：需要创建images文件夹并添加以下图片和视频：');
    console.log('- hero.mov/mp4/webm（英雄区背景视频）');
    console.log('- hero-poster.jpg（视频海报图）');
    console.log('- falcon9.jpg（猎鹰9火箭图）');
    console.log('- falconheavy.jpg（猎鹰重型火箭图）');
    console.log('- starship.jpg（星际飞船图）');
    console.log('- launch1.jpg, landing1.jpg, space1.jpg（画廊图片）');
    console.log('- parallax.jpg（视差背景图）');
    console.log('- cta-bg.jpg（CTA背景图）');
    console.log('- horizontal1.jpg, horizontal2.jpg, horizontal3.jpg, horizontal4.jpg（水平滚动图片）');
});