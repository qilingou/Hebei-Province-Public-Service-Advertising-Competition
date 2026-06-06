import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  // Smooth mouse drag scroll for exhibition slider
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = () => {
      isDown = false;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Simple scroll animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <section className="relative min-h-[800px] flex items-center justify-center overflow-hidden bg-surface py-16">
        <div className="absolute inset-0 paper-texture pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 md:px-margin-desktop max-w-container-max relative z-10 grid lg:grid-cols-2 gap-gutter items-center">
          <div className="space-y-8 animate-fade-in text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-lg text-label-lg">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>2024 年度河北省公益广告大赛正式开启</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-on-background leading-[1.15]">
              用创意点亮<br />
              <span className="text-primary">燕赵文明之光</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              汇聚全省创意力量，通过影像、平面与交互设计，展现新时代河北的社会责任、文化底蕴与人文关怀。我们期待您的杰作，共同讲好河北故事。
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigate('/upload')}
                className="px-8 py-4 bg-primary text-on-primary font-label-lg text-label-lg rounded-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2"
              >
                立即征集报名
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button
                onClick={() => navigate('/guide')}
                className="px-8 py-4 border border-outline text-on-background font-label-lg text-label-lg rounded-lg hover:bg-surface-container transition-all hover:-translate-y-0.5 active:translate-y-0 duration-300"
              >
                了解参赛要求
              </button>
            </div>
          </div>
          <div className="relative group hidden lg:block scroll-animate transition-all duration-1000 opacity-0 translate-y-10">
            <div className="absolute -inset-4 bg-primary/5 rounded-xl blur-2xl group-hover:bg-primary/10 transition-all duration-500"></div>
            <img
              alt="Main Hero Art"
              className="relative w-full aspect-[4/5] object-cover rounded-lg shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3qVUAB5DrB-LiMeMSXL-zSw9A9BG-K_722-GN-3fZG7URFgjQc9El5_yz8dZo5p1LN_uo6tmO_wf7Aw_V4N38jX8XTRYvrGWo3jm7ktGVqVWzYvBqUwBfkbWAmhqpdsJUz6C6w52jC6KpyMVYhlMdHqMJ9XRbXgI4dKdC1usVoSbxTf-pRcaKPnGhl33OEeS6jXiVM1r_7WiK7PNVhtr5TUjpNo4P5arZ9nK4HFKC6cToW2WCLlR_LSQuNOHL5YFJH50usZL064zu"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="container mx-auto px-4 md:px-margin-desktop max-w-container-max scroll-animate transition-all duration-1000 opacity-0 translate-y-10">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row text-left">
            <div className="md:w-2/5 relative h-64 md:h-auto">
              <img
                alt="About Contest"
                className="absolute inset-0 w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXWDZVQ5KFIVTZ9mBXNMI0apGgo0F-9c0MPBxBIuG9-vLRDt9bRgYfxT1FSE-N5M7_7zdl25mYJN1oc3oyrzPYJhVrS_UlfmB3zU1AlDYCvS1xNrG-4iUocl1iuXe9eZOx03KOnGs32YLT-zal0OJBqCUJ9zxNrzD78EfG20W9vfF3Go_IeEbgQR6Bv1pHaUi9BKk6PhnzoW2eIR-t7gJE8b785qqprOz99o1792IMeRuDqqkuGb_NmtZN4SSuEI0qvT_MpdMgaH6Q"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
            </div>
            <div className="md:w-3/5 p-8 md:p-12 space-y-6">
              <h2 className="font-headline-lg text-headline-lg text-on-background">大赛概况</h2>
              <div className="w-20 h-1 bg-primary"></div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                河北省公益广告大赛是由省委宣传部指导，省市场监督管理局主办的权威赛事。大赛旨在深入贯彻落实习近平新时代中国特色社会主义思想，通过优秀公益广告作品，传播社会主义核心价值观，弘扬中华优秀传统文化，展现河北新形象。
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="flex flex-col">
                  <span className="font-display-lg text-headline-lg text-primary">12+</span>
                  <span className="font-label-lg text-label-sm text-on-surface-variant uppercase tracking-wider">参赛类别</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display-lg text-headline-lg text-primary">5,000+</span>
                  <span className="font-label-lg text-label-sm text-on-surface-variant uppercase tracking-wider">往届投稿</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4 md:px-margin-desktop max-w-container-max scroll-animate transition-all duration-1000 opacity-0 translate-y-10">
          <div className="flex justify-between items-end mb-12">
            <div className="text-left">
              <h2 className="font-headline-lg text-headline-lg text-on-background">新闻动态</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">获取大赛最新资讯、动态及重要通知</p>
            </div>
            <button
              onClick={() => navigate('/news')}
              className="text-primary font-label-lg flex items-center gap-1 hover:underline transition-all"
            >
              查看全部新闻 <span className="material-symbols-outlined text-[18px]">trending_flat</span>
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-gutter text-left">
            {/* News Card 1 */}
            <div
              onClick={() => navigate('/news')}
              className="group bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <span className="font-label-sm text-label-sm text-primary mb-4 block">重要通知</span>
              <h3 className="font-headline-md text-headline-md mb-3 group-hover:text-primary transition-colors leading-tight">
                关于开展2024年度河北省优秀公益广告评选活动的通告
              </h3>
              <div className="flex items-center gap-2 text-on-surface-variant/60 font-label-sm mt-4">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                2024-05-20
              </div>
            </div>
            {/* News Card 2 */}
            <div
              onClick={() => navigate('/news')}
              className="group bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <span className="font-label-sm text-label-sm text-secondary mb-4 block">大赛新闻</span>
              <h3 className="font-headline-md text-headline-md mb-3 group-hover:text-primary transition-colors leading-tight">
                创意助力乡村振兴：河北省公益广告巡展石家庄站开幕
              </h3>
              <div className="flex items-center gap-2 text-on-surface-variant/60 font-label-sm mt-4">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                2024-05-15
              </div>
            </div>
            {/* News Card 3 */}
            <div
              onClick={() => navigate('/news')}
              className="group bg-surface-container-lowest border border-outline-variant/20 p-6 rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <span className="font-label-sm text-label-sm text-tertiary mb-4 block">媒体关注</span>
              <h3 className="font-headline-md text-headline-md mb-3 group-hover:text-primary transition-colors leading-tight">
                全省高校公益广告创作交流研讨会在保定顺利举行
              </h3>
              <div className="flex items-center gap-2 text-on-surface-variant/60 font-label-sm mt-4">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                2024-05-10
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Excellence Preview Slider */}
      <section className="py-24 bg-on-background text-surface overflow-hidden">
        <div className="container mx-auto px-4 md:px-margin-desktop max-w-container-max relative text-left scroll-animate transition-all duration-1000 opacity-0 translate-y-10">
          <div className="mb-16 flex justify-between items-end">
            <div>
              <h2 className="font-headline-lg text-headline-lg">精品展厅</h2>
              <p className="text-surface-variant/70 mt-2">历届金奖作品赏析</p>
            </div>
            <button
              onClick={() => navigate('/gallery')}
              className="px-6 py-2 border border-surface-variant/30 text-surface rounded-lg hover:bg-surface hover:text-on-background transition-all"
            >
              查看展厅
            </button>
          </div>
          
          <div 
            ref={sliderRef}
            className="flex gap-gutter overflow-x-auto pb-12 snap-x hide-scrollbar cursor-grab active:cursor-grabbing select-none" 
            id="exhibit-slider"
          >
            {/* Poster Card 1 */}
            <div className="min-w-[300px] md:min-w-[450px] snap-start group relative overflow-hidden rounded-lg">
              <img
                alt="Poster 1"
                className="w-full aspect-[3/4] object-cover rounded-lg transition-transform duration-700 group-hover:scale-[1.05]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuADrdDtuGHjqJWlX0jcl9EnQEPGr8MR2AyJre11oKPnEAXS4EV78X-wKKcT4WG5TKBfnXcoEmA55M-WlFRoGa_vlBJYLnDzbmvUYKqqfjP72oecFtToUT9XzY0_XzBohAAnblPXNCtqI_YeWl_JFanmtaD7BneqsNf6_4TkXxtWW9O0GJ-f-wa7sqxiPdbwu7UGDSZh7u5mG-F6rol3McS92-L2cVFiJcXERq8sSdbvyCE8_sjl-zF4NVrI1VwjTHlX0OZE03mSCueq"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-primary-container text-on-primary font-label-sm px-3 py-1 rounded-full w-fit mb-3 text-xs">平面类 · 金奖</span>
                <h4 className="font-headline-md text-headline-md text-white">《岁月的温度》</h4>
                <p className="text-label-sm text-surface-variant mt-1">作者：张建国 · 华北理工大学</p>
              </div>
            </div>
            {/* Poster Card 2 */}
            <div className="min-w-[300px] md:min-w-[450px] snap-start group relative overflow-hidden rounded-lg">
              <img
                alt="Poster 2"
                className="w-full aspect-[3/4] object-cover rounded-lg transition-transform duration-700 group-hover:scale-[1.05]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHjkIeQySCjG0ZRbbNYxWRbkTYLrsXHCoME8LYmaMfoVCZsz0cPm8rdYnoCqtqLve1Y1aCqJCtRvNP-iQeJAti-pUGqvu_o8NmAut5SDc0lG8p6AKaxPRl_MrzPN_KK_7oj6KXWPqtxLol8eEmjTuQf8-Qd2KiqWdm_1Ekm3jfWzVSfFnIyAeBWst93DCSnAI7jXp8ooJeIYtez9JUc2NR1diBxyODVmKuGvmfEcoHh9e4oKIcmkVMh3l9GPVgwiSB-E_Gql705Jk2"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-primary-container text-on-primary font-label-sm px-3 py-1 rounded-full w-fit mb-3 text-xs">生态类 · 金奖</span>
                <h4 className="font-headline-md text-headline-md text-white">《塞罕坝的呼吸》</h4>
                <p className="text-label-sm text-surface-variant mt-1">作者：李明 · 河北大学</p>
              </div>
            </div>
            {/* Poster Card 3 */}
            <div className="min-w-[300px] md:min-w-[450px] snap-start group relative overflow-hidden rounded-lg">
              <img
                alt="Poster 3"
                className="w-full aspect-[3/4] object-cover rounded-lg transition-transform duration-700 group-hover:scale-[1.05]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5qkURlm9ybVk0W31psuzKYwiTDdlFpTOeOnOjR1lxqWIrqWWBn01NY7WCV_PN0k0sulYHg62hWRhXPUgStv6DHlZMGgxK0VfKr2vRKJvWADV5TdkyZUDwu6YkzKIuiXOrRzc0lAnZRvA3ruNArpF8cgsR5wGrEicC2DlX81I3JeVHAWHE_iZLTYd654U3fJ-NXH5ul52sykxl9AJnTcHkim2W2auXvzPWRP_tbtuTU-9maSiuk3_7mVmg2JhAf45Z5yUdSwW8JivH"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-primary-container text-on-primary font-label-sm px-3 py-1 rounded-full w-fit mb-3 text-xs">公益类 · 银奖</span>
                <h4 className="font-headline-md text-headline-md text-white">《众志成城》</h4>
                <p className="text-label-sm text-surface-variant mt-1">作者：王芳 · 自由设计师</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Logos */}
      <section className="py-20 bg-surface-container-high">
        <div className="container mx-auto px-4 md:px-margin-desktop max-w-container-max text-center scroll-animate transition-all duration-1000 opacity-0 translate-y-10">
          <h3 className="font-label-lg text-label-sm text-on-surface-variant/60 uppercase tracking-widest mb-12">组织架构</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-on-surface-variant/10 rounded-full flex items-center justify-center text-on-background">
                <span className="material-symbols-outlined text-[32px]">account_balance</span>
              </div>
              <span className="text-label-sm font-semibold text-on-background">省委宣传部</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-on-surface-variant/10 rounded-full flex items-center justify-center text-on-background">
                <span className="material-symbols-outlined text-[32px]">gavel</span>
              </div>
              <span className="text-label-sm font-semibold text-on-background">省市场监管局</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-on-surface-variant/10 rounded-full flex items-center justify-center text-on-background">
                <span className="material-symbols-outlined text-[32px]">school</span>
              </div>
              <span className="text-label-sm font-semibold text-on-background">省教育厅</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-on-surface-variant/10 rounded-full flex items-center justify-center text-on-background">
                <span className="material-symbols-outlined text-[32px]">cast_connected</span>
              </div>
              <span className="text-label-sm font-semibold text-on-background">河北广播电视台</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
