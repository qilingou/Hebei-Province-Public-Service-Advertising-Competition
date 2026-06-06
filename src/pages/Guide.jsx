import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Guide() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('theme');

  const sections = [
    { id: 'theme', label: '大赛主题' },
    { id: 'categories', label: '征集类别' },
    { id: 'awards', label: '奖项设置' },
    { id: 'timeline', label: '征集时间' },
    { id: 'rules', label: '参赛要求' }
  ];

  // Scrollspy logic
  useEffect(() => {
    const handleScroll = () => {
      let current = 'theme';
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section is scrolled past the top offset
          if (rect.top <= 160) {
            current = section.id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id, e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-texture min-h-screen text-left w-full">
      {/* Hero Section */}
      <section className="relative h-[360px] flex items-center overflow-hidden bg-on-background">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Contest Guideline Hero"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmVjYL0oUAB37qDWus7eyJvGUYIpOq4h23VQPGPPAQqFyji1gZYid49P2UdCDvD7nTD-bVvh0zHWkPtjNCXfzAzAGI-9jJqzjrHN5G-LkGsMTP5p6mlUgafRWytL39upW1-dfjVX0-i3cMw1x4B1Dp2SSklrL9VuSO9THzTuih5gfskZ08yTuhRK23rdm_BfCTPee8ch1gqJRZUo2ZYM8xJrXihJ1BTY7YX9ad2WRmP7dyu-sfBQJCkJr6jk-n--ZjPuqTgvDRAMvB"
        />
        <div className="relative z-10 px-4 md:px-margin-desktop max-w-container-max mx-auto w-full">
          <div className="max-w-2xl">
            <h1 className="font-display-lg text-display-lg text-surface mb-6">大赛指南</h1>
            <p className="font-body-lg text-body-lg text-surface-variant/90 leading-relaxed">
              汇聚创意力量，传播公益价值。本指南将为您详细解读大赛的主题内涵、征集类别、奖项设置及报送流程。
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area with Sidebar */}
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto w-full py-16 flex flex-col md:flex-row gap-gutter">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0">
          <div className="md:sticky md:top-28 space-y-1 border-l border-outline-variant/30 bg-surface/50 p-4 md:p-0 rounded-lg md:rounded-none">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => handleNavClick(sec.id, e)}
                className={`block py-3 px-6 text-label-lg transition-all border-l-4 ${
                  activeSection === sec.id
                    ? 'border-primary text-primary font-bold bg-primary/5'
                    : 'border-transparent text-on-surface-variant hover:text-primary'
                }`}
              >
                {sec.label}
              </a>
            ))}
          </div>
        </aside>

        {/* Content Body */}
        <article className="flex-1 space-y-20">
          {/* Section: Theme */}
          <section id="theme" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-1 bg-primary"></div>
              <h2 className="font-headline-lg text-headline-lg text-on-background">大赛主题</h2>
            </div>
            <div className="bg-surface-container-lowest p-8 md:p-10 border border-outline-variant/20 shadow-sm rounded-lg">
              <p className="font-body-lg text-body-lg text-on-surface leading-loose mb-6">
                本届大赛以“<span className="text-primary font-bold">燕赵新韵 · 公益之光</span>”为核心主题。旨在通过创意设计的力量，挖掘河北深厚的历史文化底蕴，展现新时代河北经济社会发展的辉煌成就。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-surface-container-low border-l-4 border-primary rounded-r-lg">
                  <h4 className="font-headline-md text-headline-md mb-2 text-on-surface">文化传承</h4>
                  <p className="text-on-surface-variant text-sm">聚焦非遗保护、历史古迹，用现代设计语言重塑燕赵文化符号，向世界传递河北厚重的文脉力量。</p>
                </div>
                <div className="p-6 bg-surface-container-low border-l-4 border-secondary rounded-r-lg">
                  <h4 className="font-headline-md text-headline-md mb-2 text-on-surface">时代新风</h4>
                  <p className="text-on-surface-variant text-sm">关注绿色生态、乡村振兴、文明城市建设等当代社会命题，通过创意设计凝聚社会正能量。</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Categories */}
          <section id="categories" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-1 bg-primary"></div>
              <h2 className="font-headline-lg text-headline-lg text-on-background">征集类别</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Video */}
              <div className="group bg-surface-container-lowest border border-outline-variant/20 overflow-hidden hover:shadow-xl transition-all duration-500 rounded-lg flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Video Category"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAThC1PX6OYC-9yuiBNbT74uvtywQrVZslvJIzCdiHX0QPlwrfUeQAVpHCYFzraWutnFjskqn6H2O6tvxT2i-WQjGPW8Few1kmhKgmgyguwvFFrEPiO_1nQe03Z0nM5geo24Zs7e81YCVV-NiSLc_RluQ1JZvo3334rkkT3ecvTeU-OThPFdVit_ttJGoBKG7xXhRo8uTQhJ80tsRzMvLpLSoIaCl-Zc6vkhwJJtmirYbBtKt7i5bnwp97uwAjiyuZ88vI767p5lbMs"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <span className="text-primary font-label-lg mb-2 block text-xs tracking-wider">CATEGORY 01</span>
                  <h3 className="font-headline-md text-headline-md mb-4 text-on-surface">视频类 (Video)</h3>
                  <ul className="space-y-2 text-on-surface-variant font-body-md text-sm">
                    <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-xs">circle</span>影视广告/微电影</li>
                    <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-xs">circle</span>公益性短视频</li>
                    <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-xs">circle</span>二维/三维动画与动效</li>
                  </ul>
                </div>
              </div>
              {/* Poster */}
              <div className="group bg-surface-container-lowest border border-outline-variant/20 overflow-hidden hover:shadow-xl transition-all duration-500 rounded-lg flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Poster Category"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhoTLaeo0MFSWRMUhBb4vYEgfO0PmdV7FAZ78d_UAl13Qh5T_8ri2lEL52WlIgI1wz2lBKH_GJJE8teyEdFBxxmBcEyfucumtFoDkDRdP-s_RvVAoycomRP7BW2HN_rY-vpFwO1YSEz1L581Bl0-YzNJ3uZv78VaMglGuTTL0l5NEtz0Ic3g08nwN6FoWRcREpWZNtkjyO9KmdeDmvYZlBe2UJwMWXQyEQ1qjWbFVJ_eoErD1qC07IWkZaE2NlUFlmiho6Bjp0hrkH"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <span className="text-primary font-label-lg mb-2 block text-xs tracking-wider">CATEGORY 02</span>
                  <h3 className="font-headline-md text-headline-md mb-4 text-on-surface">平面类 (Poster)</h3>
                  <ul className="space-y-2 text-on-surface-variant font-body-md text-sm">
                    <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-xs">circle</span>单幅/系列宣传海报</li>
                    <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-xs">circle</span>创意手绘与插画设计</li>
                    <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-xs">circle</span>城市户外地标大屏创意</li>
                  </ul>
                </div>
              </div>
              {/* Interactive */}
              <div className="group bg-surface-container-lowest border border-outline-variant/20 overflow-hidden hover:shadow-xl transition-all duration-500 rounded-lg flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Interactive Category"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHV8KGT6LXPw2VEWWgt0wTbjYB1NHr3gkHsev35tuwqySLA8POYRaWlZA_BJysEXfosuWf8qQfeihq6QGajDXki9slWdM6gHYeKqlZBhzPblMDOeYYO-ImhdCV9aTaSYWEsf1Si-MYALRKsS68WY3nwX05sJVkG8QX5CKlwvU7dDtDOZlT1eAeOznh-66L1pJUQn-saepCn4u6NMboYZ5wBNkUe4eXyeAsWLvezCTyNMc3ZOAgFnAdkqAsNqQt8tL78_rIqaABipzG"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <span className="text-primary font-label-lg mb-2 block text-xs tracking-wider">CATEGORY 03</span>
                  <h3 className="font-headline-md text-headline-md mb-4 text-on-surface">互动类 (Interactive)</h3>
                  <ul className="space-y-2 text-on-surface-variant font-body-md text-sm">
                    <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-xs">circle</span>H5移动端交互页面</li>
                    <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-xs">circle</span>微信小程序/轻量UI</li>
                    <li className="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-xs">circle</span>AR/VR 虚拟沉浸体验</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Awards */}
          <section id="awards" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-1 bg-primary"></div>
              <h2 className="font-headline-lg text-headline-lg text-on-background">奖项设置</h2>
            </div>
            <div className="bg-on-background p-8 md:p-12 text-surface grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative overflow-hidden rounded-lg">
              {/* Award Item 1 */}
              <div className="relative z-10 border-r border-outline-variant/10 last:border-r-0">
                <div className="font-display-lg text-tertiary-fixed text-3xl md:text-4xl font-bold mb-2">金奖</div>
                <div className="font-headline-md text-base mb-1">Gold Award</div>
                <div className="text-surface-variant/70 text-xs">各类别 1 名</div>
                <div className="mt-4 text-tertiary-fixed font-bold text-sm">奖金 ¥30,000 + 证书</div>
              </div>
              {/* Award Item 2 */}
              <div className="relative z-10 border-r border-outline-variant/10 last:border-r-0">
                <div className="font-display-lg text-surface-container-lowest text-3xl md:text-4xl font-bold mb-2">银奖</div>
                <div className="font-headline-md text-base mb-1">Silver Award</div>
                <div className="text-surface-variant/70 text-xs">各类别 3 名</div>
                <div className="mt-4 text-surface-container-lowest font-bold text-sm">奖金 ¥15,000 + 证书</div>
              </div>
              {/* Award Item 3 */}
              <div className="relative z-10 border-r border-outline-variant/10 last:border-r-0">
                <div className="font-display-lg text-tertiary-fixed-dim text-3xl md:text-4xl font-bold mb-2">铜奖</div>
                <div className="font-headline-md text-base mb-1">Bronze Award</div>
                <div className="text-surface-variant/70 text-xs">各类别 5 名</div>
                <div className="mt-4 text-tertiary-fixed-dim font-bold text-sm">奖金 ¥8,000 + 证书</div>
              </div>
              {/* Award Item 4 */}
              <div className="relative z-10">
                <div className="font-display-lg text-secondary-fixed text-3xl md:text-4xl font-bold mb-2">优秀奖</div>
                <div className="font-headline-md text-base mb-1">Merit Award</div>
                <div className="text-surface-variant/70 text-xs">若干名</div>
                <div className="mt-4 text-secondary-fixed font-bold text-sm">颁发荣誉证书</div>
              </div>
              {/* Texture Background for Awards */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <pattern id="awardPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#awardPattern)"></rect>
                </svg>
              </div>
            </div>
          </section>

          {/* Section: Timeline */}
          <section id="timeline" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-1 bg-primary"></div>
              <h2 className="font-headline-lg text-headline-lg text-on-background">征集时间</h2>
            </div>
            <div className="relative py-4">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-full w-[1px] bg-outline-variant/30"></div>
              <div className="space-y-12">
                {/* Timeline Event 1 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative pl-10 md:pl-0">
                  <div className="flex-1 md:text-right hidden md:block">
                    <h4 className="font-headline-md text-headline-md text-primary">作品征集阶段</h4>
                    <p className="text-on-surface-variant text-sm">面向社会各界及高校征集优秀创意作品</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10 ring-8 ring-background"></div>
                  <div className="flex-1 text-left">
                    <span className="font-bold text-sm px-4 py-1.5 bg-surface-container-high rounded-full text-on-surface">2024.03.01 - 06.30</span>
                    <div className="mt-3 md:hidden">
                      <h4 className="font-headline-md text-headline-md text-primary">作品征集阶段</h4>
                      <p className="text-on-surface-variant text-sm">面向社会各界及高校征集优秀创意作品</p>
                    </div>
                  </div>
                </div>
                {/* Timeline Event 2 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative pl-10 md:pl-0">
                  <div className="flex-1 text-left md:text-right order-3 md:order-1 pl-0">
                    <span className="font-bold text-sm px-4 py-1.5 bg-surface-container-high rounded-full text-on-surface">2024.07.01 - 07.20</span>
                    <div className="mt-3 md:hidden">
                      <h4 className="font-headline-md text-headline-md text-secondary">初评与入围公示</h4>
                      <p className="text-on-surface-variant text-sm">专家评审团进行第一轮筛选，公示入围名单</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-secondary rounded-full z-10 ring-8 ring-background order-2"></div>
                  <div className="flex-1 hidden md:block order-3 text-left">
                    <h4 className="font-headline-md text-headline-md text-secondary">初评与入围公示</h4>
                    <p className="text-on-surface-variant text-sm">专家评审团进行第一轮筛选，公示入围名单</p>
                  </div>
                </div>
                {/* Timeline Event 3 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative pl-10 md:pl-0">
                  <div className="flex-1 md:text-right hidden md:block">
                    <h4 className="font-headline-md text-headline-md text-tertiary">终评及颁奖典礼</h4>
                    <p className="text-on-surface-variant text-sm">年度盛典现场揭晓各大奖项归属</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-tertiary rounded-full z-10 ring-8 ring-background"></div>
                  <div className="flex-1 text-left">
                    <span className="font-bold text-sm px-4 py-1.5 bg-surface-container-high rounded-full text-on-surface">2024.08.15</span>
                    <div className="mt-3 md:hidden">
                      <h4 className="font-headline-md text-headline-md text-tertiary">终评及颁奖典礼</h4>
                      <p className="text-on-surface-variant text-sm">年度盛典现场揭晓各大奖项归属</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Rules */}
          <section id="rules" className="scroll-mt-32">
            <div className="bg-primary p-8 md:p-12 text-on-primary flex flex-col md:flex-row justify-between items-center gap-8 rounded-lg shadow-md">
              <div className="max-w-xl text-left">
                <h2 className="font-headline-lg text-headline-lg mb-4 text-white">准备好提交您的创意了吗？</h2>
                <p className="font-body-lg text-body-lg text-on-primary/90 leading-relaxed">
                  在提交前，请务必阅读完整的作品技术参数要求。我们期待看到您对河北文化的独特解读与公益精神的热忱表达。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button 
                  onClick={() => alert('已开始下载细则文件（模拟）。')}
                  className="bg-on-primary text-primary px-6 py-3.5 font-label-lg hover:bg-surface hover:-translate-y-0.5 active:translate-y-0 transition-all rounded-lg flex items-center justify-center gap-2 shadow-sm text-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">file_download</span> 下载详细细则
                </button>
                <button
                  onClick={() => navigate('/upload')}
                  className="border border-on-primary text-on-primary px-6 py-3.5 font-label-lg hover:bg-on-primary/10 hover:-translate-y-0.5 active:translate-y-0 transition-all rounded-lg flex items-center justify-center gap-2 text-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">upload_file</span> 立即报送作品
                </button>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
