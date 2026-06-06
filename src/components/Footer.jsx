import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-on-background dark:bg-surface-container-lowest text-surface-container dark:text-on-background w-full py-12 px-4 md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-gutter border-t border-outline/20 mt-auto">
      <div className="flex flex-col gap-4 text-center md:text-left">
        <span className="font-headline-md text-headline-md text-surface dark:text-on-surface">河北公益广告大赛</span>
        <p className="font-body-md text-body-md text-surface-variant/70 dark:text-on-surface-variant">推动河北公益事业发展，弘扬社会主旋律</p>
        <p className="font-body-md text-body-md text-surface-variant/50 max-w-md">
          © {new Date().getFullYear()} 河北省公益广告大赛组织委员会 版权所有 | 冀ICP备XXXXXXXX号
        </p>
      </div>
      <div className="flex flex-col md:items-end gap-6">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a href="#" className="text-surface-variant/70 dark:text-on-surface-variant hover:text-primary-fixed-dim dark:hover:text-primary underline transition-all duration-300">隐私政策</a>
          <a href="#" className="text-surface-variant/70 dark:text-on-surface-variant hover:text-primary-fixed-dim dark:hover:text-primary underline transition-all duration-300">参赛条款</a>
          <a href="#" className="text-surface-variant/70 dark:text-on-surface-variant hover:text-primary-fixed-dim dark:hover:text-primary underline transition-all duration-300">联系我们</a>
          <a href="#" className="text-surface-variant/70 dark:text-on-surface-variant hover:text-primary-fixed-dim dark:hover:text-primary underline transition-all duration-300">技术支持</a>
        </div>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full border border-surface-variant/30 flex items-center justify-center hover:bg-primary transition-colors text-surface dark:text-on-surface">
            <span className="material-symbols-outlined">share</span>
          </button>
          <button className="w-10 h-10 rounded-full border border-surface-variant/30 flex items-center justify-center hover:bg-primary transition-colors text-surface dark:text-on-surface">
            <span className="material-symbols-outlined">qr_code_2</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
