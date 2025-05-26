# SpaceX 火箭展示网站

这是一个采用现代沉浸式设计风格的SpaceX火箭展示网站，展示了SpaceX公司的火箭技术和未来愿景。设计灵感来源于Lusion创意工作室、Active Theory和苹果官方网站。

## 项目结构

- `index.html` - 主HTML文件
- `styles.css` - CSS样式文件
- `script.js` - JavaScript交互文件
- `three-effects.js` - Three.js 3D效果文件
- `images/` - 图片文件夹（需要自行创建）

## 图片需求

项目需要以下图片资源（需要自行添加到images文件夹）：

1. `hero.mov` - 英雄区背景视频（主要格式）
2. `hero.mp4` - 英雄区背景视频（兼容格式）
3. `hero.webm` - 英雄区背景视频（Web格式）
4. `hero-poster.jpg` - 视频加载前或不支持视频时显示的海报图片
5. `falcon9.jpg` - 猎鹰9火箭图片
6. `falconheavy.jpg` - 猎鹰重型火箭图片
7. `starship.jpg` - 星际飞船图片
8. `launch1.jpg` - 发射场景图片（用于画廊）
9. `landing1.jpg` - 着陆场景图片（用于画廊）
10. `space1.jpg` - 太空中的火箭图片（用于画廊）
11. `factory1.jpg` - 火箭工厂图片（用于画廊）
12. `parallax.jpg` - 视差背景图片
13. `cta-bg.jpg` - CTA区域背景图片
14. `horizontal1.jpg`, `horizontal2.jpg`, `horizontal3.jpg`, `horizontal4.jpg` - 水平滚动区域图片

## 功能

- 响应式设计，适配各种屏幕尺寸
- 加载动画和页面过渡效果
- 自定义鼠标光标
- 平滑滚动导航
- 标签切换展示不同火箭型号
- 数字计数动画
- 滚动触发的元素显示动画
- 水平滚动区域
- 视差滚动效果
- 移动端菜单
- 3D粒子背景效果
- 交互式3D火箭模型
- 图片点击查看详情模态框
- WebGL沉浸式体验

## 设计特点

- 使用SF Pro Display字体（苹果官方字体）
- 简洁、现代的界面设计
- 高对比度的视觉效果
- 细腻的动画过渡效果
- 沉浸式用户体验
- 3D WebGL效果
- 粒子动画系统

## 技术栈

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)
- GSAP (GreenSock Animation Platform)
- ScrollTrigger
- Three.js (3D渲染)
- WebGL

## 如何使用

1. 克隆或下载本项目
2. 创建`images`文件夹并添加所需图片
3. 在浏览器中打开`index.html`文件

## 3D功能说明

本网站集成了以下3D功能：

1. **3D粒子背景**：英雄区使用Three.js创建的动态粒子背景，随鼠标移动而变化。
2. **交互式3D火箭模型**：可以通过控制按钮旋转、缩放和重置3D火箭模型。
3. **WebGL体验区域**：提供沉浸式的太空探索体验。

## 自定义

您可以通过修改以下文件来自定义网站：

- `styles.css` - 修改颜色、字体、布局等
- `index.html` - 修改内容、结构
- `script.js` - 添加更多交互功能
- `three-effects.js` - 自定义3D效果

## 设计灵感

本项目的设计灵感来源于：
- [Lusion创意工作室](https://lusion.co/about) - 沉浸式体验和动画效果
- [Active Theory](https://activetheory.net/work) - 3D WebGL效果和互动体验
- 苹果官方网站 - 产品展示页面的简洁设计

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 注意事项

- 部分动画效果在移动设备上可能会被简化以提高性能
- 建议使用现代浏览器访问以获得最佳体验
- 3D效果需要WebGL支持，在不支持WebGL的设备上会自动降级 

[Log] 注意：需要创建images文件夹并添加以下图片： (script.js, line 341)
[Log] - hero-bg.jpg（英雄区背景图） (script.js, line 342)
[Log] - falcon9.jpg（猎鹰9火箭图） (script.js, line 343)
[Log] - falconheavy.jpg（猎鹰重型火箭图） (script.js, line 344)
[Log] - starship.jpg（星际飞船图） (script.js, line 345)
[Log] - launch1.jpg, landing1.jpg, space1.jpg, factory1.jpg（画廊图片） (script.js, line 346)
[Log] - parallax.jpg（视差背景图） (script.js, line 347)
[Log] - cta-bg.jpg（CTA背景图） (script.js, line 348)
[Log] - horizontal1.jpg, horizontal2.jpg, horizontal3.jpg, horizontal4.jpg（水平滚动图片） (script.js, line 349)