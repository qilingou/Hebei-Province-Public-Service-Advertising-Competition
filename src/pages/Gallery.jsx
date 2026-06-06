import React, { useState } from 'react';

const WORKS_DATA = [
  {
    id: 1,
    title: '燕赵古韵 · 文明传承',
    author: '张鸣远',
    year: '2024',
    category: 'poster',
    categoryLabel: '平面海报',
    award: 'gold',
    awardLabel: '金奖',
    views: '1.2k',
    likes: 458,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzo6nAWE-8I4pmME8EY3YtrLuKefI1jQ9m2-bq6YGVnWDTG6_xym6gwWr5_Bkm_1mphgta1U_xX8CgbN2rg3uVLx55CWq2BsZQd9o7BxRshVLcSQligMwVRNrAwNAa0Qa1DlwWk6gNoAWsnza3-PCW881AphKv7ou2VCGVycGfHXfXYpK9Cz7ruKqwrHiq5uvClX_QV3670-uD0KWRHhw7mFPiSMTJeEtrgeug6Zt6U7ihojHpRdGRQQCVHCNOBt6UzSIC5ffLXFjg',
    aspect: 'aspect-[3/4]',
    desc: '本作品将河北传统剪纸艺术与现代化都市建筑符号融为一体，采用明艳的朱砂红与群青蓝，在宣纸纹理底色上勾勒出燕赵大地的文脉传承与现代生机。'
  },
  {
    id: 2,
    title: '绿水青山间的河北影踪',
    author: '博雅创意工作室',
    year: '2024',
    category: 'video',
    categoryLabel: '视频广告',
    award: 'silver',
    awardLabel: '银奖',
    views: '3.5k',
    likes: 892,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMoJN0OXd0TBeVofnUcFNDzzurv1xvZXK9qoQe_pK46kpHSEK-s6eSC0npvjlPRtFTdQKabDuWs64g1vgElbBneG6yT8-L0Tg0TNIIDsTJpKtRo-1vfU4nQFZ7DIWTuHX-CihHgDu_6hUWuSGNajRLKzBlTawCBQ2oWPjaAsmQBleLKGOKCDvPSrfUTtsRXcz2qWdxY8C78Y1QhXtsOVS2-3yYtK-z5LbNK08MmvBvnOh7vFEJItFQ9BkPcqsqGb6q713cilLb6w9j',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    aspect: 'aspect-video',
    desc: '一部航拍人文纪录片，记录了赛罕坝林场晨曦、白洋淀落日及太行绝壁的壮美风光，展现生态文明建设给河北山水带来的巨变。'
  },
  {
    id: 3,
    title: '滴水映千川',
    author: '李子墨',
    year: '2023',
    category: 'poster',
    categoryLabel: '平面海报',
    award: 'grand',
    awardLabel: '全场大奖',
    views: '5.1k',
    likes: 1205,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSfktwWBchn4c8gcxSNLgESDStOeOLkw1gVIumVH8IR5k9u8hw4w5ckTIKJ_4D8S4dq6LyXMPUHGr1GiFJzh_05Av8zivW5BMMHiglJgMjmpPxqFcponUSk9kHeuZpFCmjhbMA8YcQmEDM5XSasudk56Z3NcNtZ7AvcQ69dy-2vjL4224oBaUUAR_27dZXVXEN6ECGtyGFPRo1U20Et5Wst4elf5rvLWJEGB9btSLW-U0RBpyn8sdyijBoYIi-G9rwUbzFLsLT7Pxb',
    aspect: 'aspect-[2/3]',
    desc: '极简主义水资源保护海报。一颗晶莹的水珠徐徐滑落，水珠内折射出徽派水墨的千里江山图景，寓意珍惜每一滴水，即是守护中华壮丽山河。'
  },
  {
    id: 4,
    title: '智慧雄安 · 触碰未来',
    author: '创世数字传媒',
    year: '2024',
    category: 'interactive',
    categoryLabel: '互动创意',
    award: 'bronze',
    awardLabel: '铜奖',
    views: '920',
    likes: 312,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAypkjqjbwb3C4-SDS1nDO-t1xIAN6SlajYhwONdYWfdLXsaKyCnRd5Okid0-tGVTxf5QHinjsQcM717QycIyeUIvlL51m0fKBJO-s3UDQ5I8J9ttGiG3IGQzMPrRYGI7DFnGNp-G8TyCe1HKdHhjp3lIpPMxl9Rx7geKUnVMO_yFOBsUBmBnPogEA2C7HLqdCEnARVvNNYvuTxGlBzeaUroA9qd35O4BS-YxsDSceHJ0Dvy34uyGKFDfitId9k4lfoW2U1S_9HziQ',
    aspect: 'aspect-square',
    desc: '雄安新区智能城市交互沙盘。用户可通过网页端模拟触控，亲手排布未来之城的地下综合管廊及自动驾驶巴士线路，探索数字孪生的奥秘。'
  },
  {
    id: 5,
    title: '笔尖下的家国情怀',
    author: '赵文韬',
    year: '2024',
    category: 'poster',
    categoryLabel: '平面海报',
    award: 'silver',
    awardLabel: '银奖',
    views: '2.1k',
    likes: 674,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtXwBPhttMM7nf70nYW1SEnE_dqmFGZOTH4n548-CKPX98de8sgWB7jrR8IQOPAQ5988wJqZE2tFAIrFKA3oAzK9ddlQnOr10nYy54Cm1OIO0GhaDp1ERJfL0nfN2ZU-2ctK0iWOlhGyd4OJZBAByW6E7XlmHUUot5MXiNEBhlv-2IEEfiKf0x7bx_jJU0OyCAFlX3_2fD1asTwYwW1Wj9BJ5coqYyVwXgTRwaudbLMHfJm9padB9FEo5tMrCcvP6Hql4QMvzGLl7c',
    aspect: 'aspect-[4/5]',
    desc: '温馨的人文摄影海报，老人在古朴的木桌上握着孙女的手一笔一划写下“家国”二字，宣纸上的墨香在逆光的光晕里流淌，寓意文化的代代传承。'
  },
  {
    id: 6,
    title: '和合共生 · 锦绣河北',
    author: '视觉动力团队',
    year: '2024',
    category: 'video',
    categoryLabel: '视频广告',
    award: 'gold',
    awardLabel: '金奖',
    views: '4.8k',
    likes: 1530,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYALv7F6FjMcaJags1X9H9jg0-_p4fMhCZ-zZOynCNTk1ww4q9ojTh80EEOKJYtemDEJu7AsCN0oG_7xVlXCM7qTffuCbMngAz2iUNY12iSlp1SbgsntKa8S4xoH82mkbuavY3gsPgasS76qlegrIuq71umuotDEBUfrU9XDVDdUh1n88LRjnY9t3TP4U1ahTRhqDUM1epe5ZrtNoOyfY0iAPhGU5d82dV4r_lRgtceuWTBB2MMZBrDJnX3t2Gqe2Twe_Ihk2y5MwL',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    aspect: 'aspect-video',
    desc: '三维数字艺术视频作品。将红、金两色泼墨以流体动力学进行渲染，最终在空中碰撞汇聚成古拙的“和”字，象征燕赵文化包容万物、和谐共生的气象。'
  }
];

export default function Gallery() {
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAward, setSelectedAward] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activePreview, setActivePreview] = useState(null); // Lightbox detail state
  const [isGridLoading, setIsGridLoading] = useState(false);

  const handleFilterChange = (filterSetter, value) => {
    setIsGridLoading(true);
    filterSetter(value);
    setTimeout(() => {
      setIsGridLoading(false);
    }, 300);
  };

  const filteredWorks = WORKS_DATA.filter((work) => {
    const matchYear = selectedYear === 'all' || work.year === selectedYear;
    const matchCategory = selectedCategory === 'all' || work.category === selectedCategory;
    const matchAward = selectedAward === 'all' || work.award === selectedAward;
    const matchSearch =
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchYear && matchCategory && matchAward && matchSearch;
  });

  return (
    <div className="relative w-full text-left watermark-bg bg-surface min-h-screen pb-16">
      <main className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-16">
        {/* Gallery Header */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-label-lg tracking-widest mb-2 block text-xs font-semibold">GALLERY OF EXCELLENCE</span>
              <h1 className="font-display-lg text-display-lg mb-4 text-on-background">精品展厅</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                汇聚历届大赛获奖佳作，用创意传递文明，用影像记录河北公益事业的点滴进步与文化传承。
              </p>
            </div>
            <div>
              <button 
                onClick={() => {
                  setSelectedYear('all');
                  setSelectedCategory('all');
                  setSelectedAward('all');
                  setSearchQuery('');
                  alert('过滤器已全部重置！');
                }}
                className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg flex items-center gap-2 hover:bg-primary-container transition-all hover:shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">refresh</span>
                重置过滤器
              </button>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-surface-container-low p-6 mb-12 border border-outline-variant/20 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
            {/* Year Filter */}
            <div className="space-y-2">
              <label className="font-label-lg text-on-surface-variant block text-sm font-semibold">参赛年份</label>
              <select 
                value={selectedYear}
                onChange={(e) => handleFilterChange(setSelectedYear, e.target.value)}
                className="w-full bg-surface border border-outline-variant/30 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary rounded p-2.5 outline-none transition-all text-sm"
              >
                <option value="all">全部年份</option>
                <option value="2024">2024年</option>
                <option value="2023">2023年</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="font-label-lg text-on-surface-variant block text-sm font-semibold">作品类别</label>
              <select 
                value={selectedCategory}
                onChange={(e) => handleFilterChange(setSelectedCategory, e.target.value)}
                className="w-full bg-surface border border-outline-variant/30 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary rounded p-2.5 outline-none transition-all text-sm"
              >
                <option value="all">全部分类</option>
                <option value="poster">平面海报</option>
                <option value="video">视频广告</option>
                <option value="interactive">互动创意</option>
              </select>
            </div>

            {/* Award Level */}
            <div className="space-y-2">
              <label className="font-label-lg text-on-surface-variant block text-sm font-semibold">获奖等级</label>
              <select 
                value={selectedAward}
                onChange={(e) => handleFilterChange(setSelectedAward, e.target.value)}
                className="w-full bg-surface border border-outline-variant/30 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary rounded p-2.5 outline-none transition-all text-sm"
              >
                <option value="all">全部等级</option>
                <option value="grand">全场大奖</option>
                <option value="gold">金奖</option>
                <option value="silver">银奖</option>
                <option value="bronze">铜奖</option>
              </select>
            </div>

            {/* Search Component */}
            <div className="space-y-2">
              <label className="font-label-lg text-on-surface-variant block text-sm font-semibold">关键词搜索</label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="输入作品名称/作者"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/30 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary rounded pl-10 pr-3 py-2.5 outline-none transition-all text-sm"
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[20px]">search</span>
              </div>
            </div>
          </div>
        </section>

        {/* Works Grid */}
        <div 
          className={`masonry-grid transition-opacity duration-300 ${
            isGridLoading ? 'opacity-40' : 'opacity-100'
          }`}
        >
          {filteredWorks.map((work) => (
            <div 
              key={work.id} 
              onClick={() => setActivePreview(work)}
              className="masonry-item group cursor-pointer"
            >
              <article className="bg-surface border border-outline-variant/20 overflow-hidden rounded-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className={`relative overflow-hidden ${work.aspect}`}>
                  <img 
                    alt={work.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={work.img} 
                  />
                  {work.category === 'video' && (
                    <div className="absolute inset-0 bg-on-background/25 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white text-[56px] drop-shadow-lg scale-90 group-hover:scale-100 transition-transform">play_circle</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-primary text-on-primary px-3 py-1 font-label-sm text-xs rounded shadow-sm">
                      {work.awardLabel}
                    </span>
                    <span className="bg-secondary text-on-secondary px-3 py-1 font-label-sm text-xs rounded shadow-sm">
                      {work.categoryLabel}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-headline-md text-headline-md mb-2 group-hover:text-primary transition-colors text-lg font-bold">
                    {work.title}
                  </h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mb-4 text-xs">
                    作者：{work.author} | {work.year}年度参赛作品
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10 text-xs">
                    <span className="text-on-surface-variant/70 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">visibility</span> {work.views}
                    </span>
                    <span className="text-on-surface-variant/70 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">favorite</span> {work.likes}
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-24 text-on-surface-variant/60 text-base">
            没有找到符合当前筛选条件的作品。
          </div>
        )}
      </main>

      {/* Lightbox / Preview Modal */}
      {activePreview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in text-left">
          <div className="bg-surface border border-outline-variant/30 w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={() => setActivePreview(null)}
              className="absolute top-4 right-4 bg-black/40 text-white hover:bg-black/60 w-9 h-9 rounded-full flex items-center justify-center transition-colors z-[110]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Media Content Area */}
            <div className="bg-black flex-grow flex items-center justify-center min-h-[280px] max-h-[50vh] relative overflow-hidden">
              {activePreview.category === 'video' ? (
                <video 
                  src={activePreview.videoUrl} 
                  controls 
                  autoPlay
                  poster={activePreview.img}
                  className="w-full h-full object-contain max-h-[50vh]"
                />
              ) : (
                <img 
                  src={activePreview.img} 
                  alt={activePreview.title} 
                  className="max-w-full max-h-[50vh] object-contain"
                />
              )}
            </div>

            {/* Description Info */}
            <div className="p-8 bg-surface-container-lowest overflow-y-auto max-h-[40vh] space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-primary-container text-on-primary px-3 py-1 text-xs rounded">
                  {activePreview.awardLabel}
                </span>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 text-xs rounded">
                  {activePreview.categoryLabel}
                </span>
                <span className="text-on-surface-variant text-xs">{activePreview.year}年度获奖作</span>
              </div>

              <h2 className="font-headline-lg text-headline-lg text-on-background text-xl md:text-2xl font-bold pr-6">
                {activePreview.title}
              </h2>
              
              <div className="text-label-sm text-on-surface-variant text-sm font-semibold pb-2 border-b border-outline-variant/10">
                作者 / 团队：{activePreview.author}
              </div>

              <div className="space-y-2 text-sm leading-relaxed text-on-surface-variant">
                <h4 className="font-bold text-on-surface text-xs tracking-wider uppercase">创意陈述 (作品说明)</h4>
                <p>{activePreview.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
