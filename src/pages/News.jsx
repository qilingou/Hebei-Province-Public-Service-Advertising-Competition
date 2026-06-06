import React, { useState } from 'react';

const INITIAL_NEWS = [
  {
    id: 1,
    category: 'notice',
    categoryLabel: '重要通知',
    date: '2024.10.24',
    title: '2024河北公益广告大赛正式启动：以创意点亮城市之美',
    desc: '本届大赛由河北省宣传部指导，省市场监督管理局主办，旨在挖掘全省乃至全国的优秀创意力量。今年的主题聚焦“燕赵新韵 · 公益之光”，鼓励参赛者利用数字化手段重塑燕赵大地丰富的文化遗产...',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMBScU7Wb0eN-P_UgS7oXBT9AMrvEs_j4M7sxWoNFpB8Oh5oH7s6qLA2N7uJidNZ_hDNjN-OGY_txFXCMQXcjAHDifkXZ2aiQR2eeb8wpg5wr5W8LvEcf8UhCEagE8PZIw9ybkedTRMHjyKI8RleHGP0xXoR96U-yDgk_62y7xqDOWflpPBHQO7IISecw76fVswBFVtgrfSgTDkC1DK2qN2IkPcgfKiZvHx4NCCDabHDjfKKPYt_S88J9DE8yqb9y2xXSluWFzbFYI',
    content: '本届大赛由河北省宣传部指导，省市场监督管理局主办，旨在挖掘全省乃至全国的优秀创意力量。今年的主题聚焦“燕赵新韵 · 公益之光”，鼓励参赛者利用数字化手段重塑燕赵大地丰富的文化遗产与精神风貌。组委会设立了多个赛道，包括视频类、平面类以及今年首次推出的数字交互赛道，力求打破传统，展现科技与文化碰撞的艺术火花。欢迎各大院校设计专业师生与社会各界创意人士积极投递作品！',
    isFeatured: true
  },
  {
    id: 2,
    category: 'notice',
    categoryLabel: '赛事公告',
    date: '2024.10.22',
    title: '作品提交通道现已全面开放：全品类细则解读',
    desc: '包括平面广告、影视视频、交互媒体在内的四大板块提交通道已于今日正式开启。组委会特别提醒，请务必在提交前确认版权协议及作品格式要求。',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiBqk47E7fVIzs-T-5UbDjQJKBJVSL_gwRMTVTyt9hX3X8WlJPFUVeuwcvcwj5AcO4Icoknt22bBSFUQNLI6DuCtO2NYj7sVnFY3xr9ihwd_vXfW7SO5RwRfla_H4gP1GGUDt3r50NJAoMFqwMCaOGrRt9yM17iN9ghK-rDuGJTrZj5xKcNDQggbNSFQGmYmiKF_RHlSwYVAblTpHqDlM5IoEV1WEDaxaHeSgemPgUY2hPGAgEyj8QlLEaY51g8L_7160U8tNiaqAF',
    content: '四大核心板块（平面设计、视频广告、交互媒体、广播文案）的提交通道已于即日起在官网“作品征集”页面正式向公众开放。请参赛者严格按照技术规范上传作品（平面类海报需提交JPG格式，300dpi以上；视频类需MP4格式，不超过200MB）。所有作品必须附带 300 字以内的设计创意说明，并在线签署《原创性声明》。本次线上征集将一直持续到2024年6月30日。',
    isFeatured: false
  },
  {
    id: 3,
    category: 'news',
    categoryLabel: '业界资讯',
    date: '2024.10.18',
    title: '数字化转型：公益广告如何在新媒体时代讲好中国故事',
    desc: '随着AI技术的发展，本届大赛特设“数字创意奖”，旨在探讨人工智能辅助创作在传统公益宣传中的应用潜力与伦理边界。',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5eNAXxyB-AzrHOiP75AeSTeA3m04Q0Ll442d5iVBiGKxJVGxOewmTr4uS6HvqABfpsuxlpLYrSNcfQ3ZkQ1UI-MwPTTxlfbK9boqw1m2KHGRMzKqaBcM7FFvIXd0RzZXXsBS6cLx-UtqFDSu2QJOJUETuIBRZ4hsb6wasF7fic6btbaSbK9G2QIEFQgf6RB8MoYIJ_K36xdWt1Vc8dlqHz4jU06J104xieFKzRYylHQoIbrX5cqPdsAiqVG4fkBLaGMIAm94aXE-j',
    content: '新媒体时代的公益广告已不再局限于单向灌输。本届大赛论坛专门邀请了来自业内知名设计工作室和新媒体大厂的专家，共话“AI+艺术”在新媒体语境下的无限可能。专家提出，利用交互网页（H5）、AR/VR滤镜以及数字化算法生成的艺术作品，能够让大众更加深入地沉浸于燕赵文脉的细节中，产生共情。这也为公益宣传的范式转移指明了方向。',
    isFeatured: false
  },
  {
    id: 4,
    category: 'interview',
    categoryLabel: '评审团动态',
    date: '2024.10.15',
    title: '首批权威评审名单公布：跨界专家共话创意评价体系',
    desc: '来自学术界、广告界及艺术领域的12位顶级评审将坐镇本届大赛，确保评选过程的公平、专业、与前瞻性。',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAETI9bbXcihWUtMJAdK8csU96ZqgR5sOiuW-NrhEdWDcbdYdfNzvb8QPortFZSCJUmXaLEz3b17qvLjLn6ZUoex6cHLZUYLL3nQsEMJdk4tlnMfq98DXg5BKjL2NnOrudHQWZlC305HMxnv73jqH3gUipftB9AQ0TCgrkJbGcJJqYFhDjQmfbV4a3nJgOQ80RpMcjXzLJAesD6mAVEOacZEHGleZawKAPKzRIDBE84Xda16kGiSeWO7iLYv4JvWRiQvh9ivaR_PqY_',
    content: '为确保评审结果的客观与权威，大赛组委会秉承跨界融合的理念，邀请了包括中央美术学院设计学院教授、国家一级美术师、知名国际4A广告公司创意总监等12位顶级跨界评委。他们不仅将从美学、创意、表达层面对作品进行打分，更将针对作品的社会传播价值、公益价值进行综合考量，用高规格建立起属于中国优秀公益广告的高标准评价体系。',
    isFeatured: false
  }
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [selectedNews, setSelectedNews] = useState(null); // Detail Modal

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      alert(`已成功订阅 ${emailInput}！我们会第一时间为您发送大赛最新动态。`);
      setEmailInput('');
    }
  };

  // Filter logic
  const filteredNews = INITIAL_NEWS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative w-full text-left bg-texture min-h-screen pb-16">
      <main className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20 relative">
        {/* Section Header */}
        <div className="mb-12 border-l-4 border-primary pl-6">
          <h1 className="font-display-lg text-display-lg text-on-background mb-2">新闻动态</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            追踪大赛进程，探索创意前沿。这里汇聚了最新的赛事公告、行业深度观察及优秀获奖作品背后的故事。
          </p>
        </div>

        {/* Search input for mobile & tablet */}
        <div className="mb-8 lg:hidden">
          <div className="flex items-center bg-white px-4 py-3 rounded-lg border border-outline-variant/30 w-full">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
            <input
              type="text"
              placeholder="搜索新闻公告..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-body-md ml-2 w-full outline-none"
            />
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* News List */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Display Featured headliner if category is 'all' and no active search query */}
            {selectedCategory === 'all' && searchQuery === '' && (
              <section className="mb-12">
                {INITIAL_NEWS.filter(item => item.isFeatured).map(item => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedNews(item)}
                    className="group relative bg-white overflow-hidden shadow-sm border border-outline-variant/20 flex flex-col lg:flex-row h-auto lg:h-[480px] rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300"
                  >
                    <div className="lg:w-3/5 overflow-hidden h-[240px] lg:h-full">
                      <img 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={item.img}
                      />
                    </div>
                    <div className="lg:w-2/5 p-8 flex flex-col justify-center bg-surface-container-lowest">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-primary-container/10 text-primary px-3 py-1 text-label-sm font-label-sm rounded-full text-xs">头条要闻</span>
                        <span className="text-on-surface-variant text-label-sm font-label-sm text-xs">{item.date}</span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-background mb-4 leading-tight group-hover:text-primary transition-colors">
                        {item.title}
                      </h2>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3 text-sm">
                        {item.desc}
                      </p>
                      <span className="inline-flex items-center text-primary font-label-lg text-label-lg group/link text-sm font-semibold">
                        阅读全文 
                        <span className="material-symbols-outlined ml-2 transition-transform group-hover/link:translate-x-1 text-sm">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* List items */}
            <div className="space-y-10">
              {filteredNews.filter(item => selectedCategory !== 'all' || !item.isFeatured || searchQuery !== '').map(item => (
                <article 
                  key={item.id} 
                  onClick={() => setSelectedNews(item)}
                  className="flex flex-col md:flex-row gap-6 group cursor-pointer bg-white p-4 rounded-lg border border-outline-variant/10 hover:shadow-md transition-all duration-300"
                >
                  <div className="md:w-1/3 aspect-[4/3] overflow-hidden bg-surface-container border border-outline-variant/10 rounded-lg">
                    <img 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      src={item.img}
                    />
                  </div>
                  <div className="md:w-2/3 py-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-3">
                        <span className={`font-label-sm text-xs uppercase tracking-wider font-semibold ${
                          item.category === 'notice' ? 'text-primary' : 'text-secondary'
                        }`}>{item.categoryLabel}</span>
                        <span className="text-on-surface-variant/60 text-label-sm text-xs">{item.date}</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-background mb-3 group-hover:text-primary transition-colors text-lg">
                        {item.title}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 text-sm">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-primary font-label-lg text-xs font-semibold flex items-center gap-1 mt-4 group-hover:underline">
                      阅读详情 <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </span>
                  </div>
                </article>
              ))}

              {filteredNews.length === 0 && (
                <div className="text-center py-12 text-on-surface-variant/60">
                  没有找到匹配的新闻动态。
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            
            {/* Search Card for Desktop */}
            <div className="hidden lg:block bg-surface-container-low p-8 border border-outline-variant/20 rounded-lg">
              <h4 className="font-headline-md text-headline-md text-on-background mb-6">分类搜索</h4>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setSelectedCategory('all')} 
                  className={`w-full flex justify-between items-center p-4 rounded transition-all border ${
                    selectedCategory === 'all' ? 'border-primary bg-white text-primary font-bold shadow-sm' : 'border-outline-variant/10 bg-white hover:border-primary'
                  }`}
                >
                  <span className="font-label-lg text-label-lg text-sm">全部动态</span>
                  <span className="bg-surface-container-highest px-2 py-0.5 rounded text-xs text-on-surface-variant">{INITIAL_NEWS.length}</span>
                </button>
                <button 
                  onClick={() => setSelectedCategory('notice')} 
                  className={`w-full flex justify-between items-center p-4 rounded transition-all border ${
                    selectedCategory === 'notice' ? 'border-primary bg-white text-primary font-bold shadow-sm' : 'border-outline-variant/10 bg-white hover:border-primary'
                  }`}
                >
                  <span className="font-label-lg text-label-lg text-sm">重要通知/公告</span>
                  <span className="bg-surface-container-highest px-2 py-0.5 rounded text-xs text-on-surface-variant">
                    {INITIAL_NEWS.filter(item => item.category === 'notice').length}
                  </span>
                </button>
                <button 
                  onClick={() => setSelectedCategory('news')} 
                  className={`w-full flex justify-between items-center p-4 rounded transition-all border ${
                    selectedCategory === 'news' ? 'border-primary bg-white text-primary font-bold shadow-sm' : 'border-outline-variant/10 bg-white hover:border-primary'
                  }`}
                >
                  <span className="font-label-lg text-label-lg text-sm">行业/大赛新闻</span>
                  <span className="bg-surface-container-highest px-2 py-0.5 rounded text-xs text-on-surface-variant">
                    {INITIAL_NEWS.filter(item => item.category === 'news').length}
                  </span>
                </button>
                <button 
                  onClick={() => setSelectedCategory('interview')} 
                  className={`w-full flex justify-between items-center p-4 rounded transition-all border ${
                    selectedCategory === 'interview' ? 'border-primary bg-white text-primary font-bold shadow-sm' : 'border-outline-variant/10 bg-white hover:border-primary'
                  }`}
                >
                  <span className="font-label-lg text-label-lg text-sm">评审团动态/专访</span>
                  <span className="bg-surface-container-highest px-2 py-0.5 rounded text-xs text-on-surface-variant">
                    {INITIAL_NEWS.filter(item => item.category === 'interview').length}
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile Category selectors */}
            <div className="lg:hidden flex flex-wrap gap-2 mb-8 bg-surface-container-low p-3 rounded-lg border border-outline-variant/10">
              <button 
                onClick={() => setSelectedCategory('all')} 
                className={`px-4 py-2 text-xs rounded-full transition-all ${
                  selectedCategory === 'all' ? 'bg-primary text-on-primary font-bold' : 'bg-white border border-outline-variant/20 text-on-surface-variant'
                }`}
              >
                全部
              </button>
              <button 
                onClick={() => setSelectedCategory('notice')} 
                className={`px-4 py-2 text-xs rounded-full transition-all ${
                  selectedCategory === 'notice' ? 'bg-primary text-on-primary font-bold' : 'bg-white border border-outline-variant/20 text-on-surface-variant'
                }`}
              >
                通知公告
              </button>
              <button 
                onClick={() => setSelectedCategory('news')} 
                className={`px-4 py-2 text-xs rounded-full transition-all ${
                  selectedCategory === 'news' ? 'bg-primary text-on-primary font-bold' : 'bg-white border border-outline-variant/20 text-on-surface-variant'
                }`}
              >
                大赛新闻
              </button>
              <button 
                onClick={() => setSelectedCategory('interview')} 
                className={`px-4 py-2 text-xs rounded-full transition-all ${
                  selectedCategory === 'interview' ? 'bg-primary text-on-primary font-bold' : 'bg-white border border-outline-variant/20 text-on-surface-variant'
                }`}
              >
                评审专访
              </button>
            </div>

            {/* Hot topics */}
            <div className="p-4 bg-surface-container-low/40 rounded-lg border border-outline-variant/10">
              <h4 className="font-headline-md text-headline-md text-on-background mb-4">热门话题</h4>
              <div className="flex flex-wrap gap-3">
                <span className="bg-secondary-container/30 text-on-secondary-container px-4 py-2 text-xs font-semibold rounded-full cursor-pointer hover:opacity-80 transition-opacity">传统文化</span>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed px-4 py-2 text-xs font-semibold rounded-full cursor-pointer hover:opacity-80 transition-opacity">数字化创意</span>
                <span className="bg-primary-fixed text-on-primary-fixed px-4 py-2 text-xs font-semibold rounded-full cursor-pointer hover:opacity-80 transition-opacity">燕赵风情</span>
                <span className="bg-surface-container-highest text-on-surface-variant px-4 py-2 text-xs rounded-full cursor-pointer hover:bg-outline-variant/20 transition-all">非物质文化遗产</span>
                <span className="bg-surface-container-highest text-on-surface-variant px-4 py-2 text-xs rounded-full cursor-pointer hover:bg-outline-variant/20 transition-all">中国公益形象</span>
              </div>
            </div>

            {/* Newsletter / Subscription */}
            <div className="bg-on-background p-8 text-surface rounded-lg shadow-sm">
              <h4 className="font-headline-md text-headline-md mb-4 text-primary-fixed">获取即时通知</h4>
              <p className="font-body-md text-body-md text-surface-variant/80 mb-8 text-sm">
                订阅我们的邮件列表，获取大赛最新动态及创意征集通知。
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <input
                  type="email"
                  placeholder="您的电子邮箱"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-surface-variant/10 border border-surface-variant/30 p-3 rounded text-surface text-sm focus:ring-primary-fixed focus:border-primary-fixed outline-none"
                />
                <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded font-label-lg text-label-lg hover:bg-primary-container hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm font-semibold">
                  立即订阅
                </button>
              </form>
            </div>
          </aside>
        </div>
      </main>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in text-left">
          <div className="bg-surface border border-outline-variant/30 w-full max-w-2xl rounded-xl p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto flex flex-col gap-6">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="bg-primary-container/10 text-primary px-3 py-1 text-label-sm font-label-sm rounded-full text-xs">
                {selectedNews.categoryLabel}
              </span>
              <span className="text-on-surface-variant text-label-sm text-xs">{selectedNews.date}</span>
            </div>

            <h2 className="font-headline-lg text-headline-lg text-on-background leading-tight text-xl md:text-2xl font-bold pr-6">
              {selectedNews.title}
            </h2>

            <div className="w-full overflow-hidden rounded-lg">
              <img src={selectedNews.img} alt={selectedNews.title} className="w-full max-h-[300px] object-cover" />
            </div>

            <div className="font-body-lg text-on-surface leading-relaxed text-sm md:text-base border-t border-outline-variant/20 pt-4 space-y-4">
              <p>{selectedNews.content}</p>
              <p className="text-xs text-on-surface-variant/70 italic mt-6">
                （本稿件由河北省公益广告大赛组织委员会提供。详情请持续关注本平台发布的信息。）
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
