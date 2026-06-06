import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Upload() {
  const { isLoggedIn, setIsLoginModalOpen } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    authorName: '',
    phone: '',
    email: '',
    address: '',
    title: '',
    category: '平面设计类',
    creationDate: '',
    desc: '',
    file: null,
    declarationCheck: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Step Validation
  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.authorName.trim()) newErrors.authorName = '姓名或单位名称不能为空';
      if (!/^1[3-9]\d{9}$/.test(formData.phone)) newErrors.phone = '请输入正确的 11 位手机号码';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = '请输入有效的电子邮箱';
      if (!formData.address.trim()) newErrors.address = '通讯地址不能为空';
    } else if (step === 2) {
      if (!formData.title.trim()) newErrors.title = '作品标题不能为空';
      if (!formData.creationDate) newErrors.creationDate = '请选择创作时间';
      if (!formData.desc.trim()) newErrors.desc = '设计说明不能为空';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Drag and Drop Simulator
  const [isDragActive, setIsDragActive] = useState(false);
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      handleInputChange('file', droppedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleInputChange('file', e.target.files[0]);
    }
  };

  // Final Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.file) {
      alert('请上传作品文件附件！');
      return;
    }
    if (!formData.declarationCheck) {
      alert('请阅读并勾选原创性声明。');
      return;
    }

    // Trigger simulation
    setIsSubmitting(true);
    setSubmitProgress(0);

    const interval = setInterval(() => {
      setSubmitProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccessOpen(true);
          }, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const resetForm = () => {
    setFormData({
      authorName: '',
      phone: '',
      email: '',
      address: '',
      title: '',
      category: '平面设计类',
      creationDate: '',
      desc: '',
      file: null,
      declarationCheck: false
    });
    setCurrentStep(1);
    setIsSuccessOpen(false);
  };

  // Require Login Guard (Visual Friendly modal/banner)
  if (!isLoggedIn) {
    return (
      <div className="flex-grow bg-texture py-16 px-4 flex items-center justify-center">
        <div className="bg-surface max-w-lg w-full p-8 rounded-xl border border-outline-variant/30 text-center shadow-lg space-y-6">
          <span className="material-symbols-outlined text-primary text-[64px]" style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>
          <h2 className="font-headline-lg text-headline-lg text-on-background">您还未登录</h2>
          <p className="font-body-md text-on-surface-variant text-sm">
            为了确保申报材料的安全以及作品归属权的绑定，您需要登录后才能使用作品征集上传功能。
          </p>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="w-full bg-primary text-on-primary py-3.5 font-label-lg rounded-lg hover:bg-primary-container transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">vpn_key</span>
            立即登录 / 注册
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-texture py-16 px-4 text-left">
      <main className="max-w-3xl mx-auto relative">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="font-display-lg text-display-lg text-on-background mb-4">投递您的创意作品</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            请按照以下步骤完成作品申报。您的每一份创意都是对社会公益事业的宝贵支持。
          </p>
        </div>

        {/* Stepper progress indicator */}
        <div className="flex justify-between items-center mb-12 relative max-w-xl mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-outline-variant/40 -z-10 -translate-y-1/2"></div>
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2 bg-background px-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              currentStep > 1 
                ? 'bg-primary text-on-primary' 
                : 'bg-primary text-on-primary shadow-lg ring-4 ring-primary/15'
            }`}>
              {currentStep > 1 ? <span className="material-symbols-outlined text-sm font-bold">check</span> : 1}
            </div>
            <span className={`text-xs font-semibold ${currentStep >= 1 ? 'text-primary' : 'text-on-surface-variant/60'}`}>
              填写主体信息
            </span>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2 bg-background px-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border transition-all ${
              currentStep > 2 
                ? 'bg-primary text-on-primary' 
                : currentStep === 2
                  ? 'bg-primary text-on-primary shadow-lg ring-4 ring-primary/15 border-transparent'
                  : 'bg-surface-container-highest text-on-surface-variant border-outline-variant'
            }`}>
              {currentStep > 2 ? <span className="material-symbols-outlined text-sm font-bold">check</span> : 2}
            </div>
            <span className={`text-xs font-semibold ${currentStep >= 2 ? 'text-primary' : 'text-on-surface-variant/60'}`}>
              申报作品详情
            </span>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center gap-2 bg-background px-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border transition-all ${
              currentStep === 3 
                ? 'bg-primary text-on-primary shadow-lg ring-4 ring-primary/15 border-transparent'
                : 'bg-surface-container-highest text-on-surface-variant border-outline-variant'
            }`}>
              3
            </div>
            <span className={`text-xs font-semibold ${currentStep === 3 ? 'text-primary' : 'text-on-surface-variant/60'}`}>
              上传作品附件
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="glass-card p-8 md:p-12 shadow-sm rounded-xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Registrant Info */}
            {currentStep === 1 && (
              <section className="step-transition space-y-6 animate-fade-in">
                <div className="mb-4">
                  <h3 className="font-headline-md text-headline-md text-on-background mb-2">参赛者基本信息</h3>
                  <p className="text-on-surface-variant text-sm">请确保信息真实有效，以便后续奖项联系与证书发放。</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-label-lg font-label-lg text-on-surface text-sm">参赛者姓名/单位名称 <span className="text-primary">*</span></label>
                    <input
                      type="text"
                      placeholder="请输入真实姓名或单位全称"
                      value={formData.authorName}
                      onChange={(e) => handleInputChange('authorName', e.target.value)}
                      className={`w-full bg-surface-container-low border rounded-lg p-3 outline-none transition-all text-sm focus:border-secondary focus:ring-1 focus:ring-secondary ${
                        errors.authorName ? 'border-error ring-1 ring-error' : 'border-outline-variant'
                      }`}
                    />
                    {errors.authorName && <span className="text-error text-xs">{errors.authorName}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-label-lg font-label-lg text-on-surface text-sm">联系电话 <span className="text-primary">*</span></label>
                    <input
                      type="tel"
                      placeholder="请输入11位手机号码"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full bg-surface-container-low border rounded-lg p-3 outline-none transition-all text-sm focus:border-secondary focus:ring-1 focus:ring-secondary ${
                        errors.phone ? 'border-error ring-1 ring-error' : 'border-outline-variant'
                      }`}
                    />
                    {errors.phone && <span className="text-error text-xs">{errors.phone}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-label-lg font-label-lg text-on-surface text-sm">电子邮箱 <span className="text-primary">*</span></label>
                    <input
                      type="email"
                      placeholder="example@domain.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full bg-surface-container-low border rounded-lg p-3 outline-none transition-all text-sm focus:border-secondary focus:ring-1 focus:ring-secondary ${
                        errors.email ? 'border-error ring-1 ring-error' : 'border-outline-variant'
                      }`}
                    />
                    {errors.email && <span className="text-error text-xs">{errors.email}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-label-lg font-label-lg text-on-surface text-sm">通讯地址 <span className="text-primary">*</span></label>
                    <input
                      type="text"
                      placeholder="请输入详细的奖项及证书投递地址"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`w-full bg-surface-container-low border rounded-lg p-3 outline-none transition-all text-sm focus:border-secondary focus:ring-1 focus:ring-secondary ${
                        errors.address ? 'border-error ring-1 ring-error' : 'border-outline-variant'
                      }`}
                    />
                    {errors.address && <span className="text-error text-xs">{errors.address}</span>}
                  </div>
                </div>
              </section>
            )}

            {/* Step 2: Work Details */}
            {currentStep === 2 && (
              <section className="step-transition space-y-6 animate-fade-in">
                <div className="mb-4">
                  <h3 className="font-headline-md text-headline-md text-on-background mb-2">作品详细信息</h3>
                  <p className="text-on-surface-variant text-sm">让评委更好地理解您的创意初衷与艺术表达。</p>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-label-lg font-label-lg text-on-surface text-sm">作品标题 <span className="text-primary">*</span></label>
                  <input
                    type="text"
                    placeholder="请输入作品名称"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full bg-surface-container-low border rounded-lg p-3 outline-none transition-all text-sm focus:border-secondary focus:ring-1 focus:ring-secondary ${
                      errors.title ? 'border-error ring-1 ring-error' : 'border-outline-variant'
                    }`}
                  />
                  {errors.title && <span className="text-error text-xs">{errors.title}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-label-lg font-label-lg text-on-surface text-sm">投稿类别</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 outline-none focus:border-secondary transition-all text-sm"
                    >
                      <option>平面设计类</option>
                      <option>视频广告类</option>
                      <option>交互媒体类</option>
                      <option>广播文案类</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-label-lg font-label-lg text-on-surface text-sm">创作时间 <span className="text-primary">*</span></label>
                    <input
                      type="date"
                      value={formData.creationDate}
                      onChange={(e) => handleInputChange('creationDate', e.target.value)}
                      className={`w-full bg-surface-container-low border rounded-lg p-3 outline-none focus:border-secondary transition-all text-sm ${
                        errors.creationDate ? 'border-error ring-1 ring-error' : 'border-outline-variant'
                      }`}
                    />
                    {errors.creationDate && <span className="text-error text-xs">{errors.creationDate}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-label-lg font-label-lg text-on-surface text-sm">设计说明 (创意陈述) <span className="text-primary">*</span></label>
                  <textarea
                    rows={4}
                    placeholder="请简述作品立意、艺术特色、表现手法及社会效益（300字以内）"
                    value={formData.desc}
                    onChange={(e) => handleInputChange('desc', e.target.value)}
                    className={`w-full bg-surface-container-low border rounded-lg p-3 outline-none resize-none transition-all text-sm focus:border-secondary ${
                      errors.desc ? 'border-error ring-1 ring-error' : 'border-outline-variant'
                    }`}
                  />
                  {errors.desc && <span className="text-error text-xs">{errors.desc}</span>}
                </div>
              </section>
            )}

            {/* Step 3: Attachment */}
            {currentStep === 3 && (
              <section className="step-transition space-y-6 animate-fade-in">
                <div className="mb-4">
                  <h3 className="font-headline-md text-headline-md text-on-background mb-2">作品文件及最终确认</h3>
                  <p className="text-on-surface-variant text-sm">上传高清作品原稿，并签署原创性声明。</p>
                </div>

                {/* Drag and Drop */}
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                    isDragActive 
                      ? 'border-primary bg-primary/5' 
                      : formData.file 
                        ? 'border-secondary bg-secondary/5' 
                        : 'border-outline-variant hover:border-primary hover:bg-surface-container-low/30'
                  }`}
                >
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,video/mp4,.pdf"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                    <span className={`material-symbols-outlined text-[48px] mb-3 transition-colors ${
                      formData.file ? 'text-secondary' : 'text-on-surface-variant'
                    }`}>
                      {formData.file ? 'task' : 'cloud_upload'}
                    </span>
                    <p className="text-sm font-bold text-on-surface">
                      {formData.file ? `已选文件: ${formData.file.name}` : '点击或将文件拖拽至此处上传'}
                    </p>
                    <p className="text-xs text-on-surface-variant/80 mt-2">
                      {formData.file ? `${(formData.file.size / (1024 * 1024)).toFixed(2)} MB` : '支持 JPG, PNG, MP4, PDF (最大 200MB)'}
                    </p>
                  </label>
                </div>

                {/* Declaration Statement */}
                <div className="bg-surface-container-high/40 p-5 rounded-lg border border-outline-variant/30 mt-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="originality-check"
                      checked={formData.declarationCheck}
                      onChange={(e) => handleInputChange('declarationCheck', e.target.checked)}
                      className="mt-1 w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="originality-check" className="text-xs text-on-surface-variant/90 leading-relaxed select-none cursor-pointer">
                      我谨代表个人/机构郑重承诺：此作品系我方<strong>原创</strong>，未曾侵犯任何第三方的著作权、商标权或其他任何知识产权。如发生任何版权法律纠纷，相关责任概由我方承担。我方同意大赛组委会对作品进行公益展示、非商业性质汇编及官方出版发布。
                    </label>
                  </div>
                </div>
              </section>
            )}

            {/* Stepper buttons navigation */}
            <div className="mt-8 flex justify-between items-center border-t border-outline-variant/20 pt-6">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 px-6 py-2.5 font-label-lg text-sm text-on-surface-variant hover:text-primary transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  上一步
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-primary text-on-primary px-8 py-3 font-label-lg text-sm rounded-lg hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 font-semibold"
                >
                  下一步
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-secondary text-on-secondary px-8 py-3 font-label-lg text-sm rounded-lg hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 font-semibold"
                >
                  确认并提交作品
                  <span className="material-symbols-outlined text-[18px]">done_all</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tip footer */}
        <div className="mt-6 flex items-center gap-2 text-on-surface-variant/80 px-4">
          <span className="material-symbols-outlined text-sm">info</span>
          <p className="text-[11px]">您的个人资料将严格按照隐私政策进行保护，仅用于本次大赛评审、公示与后续奖项联系。</p>
        </div>
      </main>

      {/* Progress Loader Modal */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-surface border border-outline-variant/30 w-full max-w-sm rounded-xl p-8 shadow-2xl text-center flex flex-col items-center gap-6">
            <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div className="space-y-2 w-full">
              <h3 className="font-headline-md text-headline-md text-on-background">正在上传附件...</h3>
              <p className="text-xs text-on-surface-variant/60">请不要关闭或刷新此页面</p>
              
              {/* Progress bar container */}
              <div className="w-full bg-surface-container-highest rounded-full h-2 mt-4 overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-150 rounded-full"
                  style={{ width: `${submitProgress}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold text-primary mt-1 block">{submitProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Submit Success Modal */}
      {isSuccessOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in text-center">
          <div className="bg-surface border border-outline-variant/30 w-full max-w-md rounded-xl p-8 shadow-2xl relative overflow-hidden flex flex-col items-center gap-6">
            {/* success icon */}
            <div className="w-20 h-20 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            
            <div className="space-y-2">
              <h2 className="font-headline-lg text-headline-lg text-secondary">作品报送成功！</h2>
              <p className="font-body-md text-on-surface-variant text-sm px-4">
                您的作品<strong>《{formData.title}》</strong>已成功录入大赛征集系统。我们将在初审结束后以短信或邮件形式告知您评选结果。
              </p>
            </div>

            <div className="w-full p-4 bg-surface-container-low rounded-lg text-left text-xs space-y-1.5 text-on-surface-variant">
              <div><strong className="text-on-surface">申报号:</strong> HEBEI-2024-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div><strong className="text-on-surface">作者/单位:</strong> {formData.authorName}</div>
              <div><strong className="text-on-surface">投稿类别:</strong> {formData.category}</div>
              <div><strong className="text-on-surface">提报时间:</strong> {new Date().toLocaleDateString('zh-CN')}</div>
            </div>

            <button
              onClick={resetForm}
              className="w-full bg-primary text-on-primary py-3 font-label-lg rounded-lg hover:bg-primary-container transition-all text-sm font-semibold shadow-sm"
            >
              返回征集首页 / 再次提报
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
