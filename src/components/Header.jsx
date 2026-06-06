import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { isLoggedIn, user, logout, setIsLoginModalOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`正在搜索: ${searchQuery}。此处仅为展示页面。`);
      setSearchQuery('');
    }
  };

  const activeStyle = "font-label-lg text-label-lg text-primary dark:text-primary-fixed-dim border-b-2 border-primary pb-1";
  const inactiveStyle = "font-label-lg text-label-lg text-on-surface-variant dark:text-on-surface hover:text-primary transition-colors pb-1";

  return (
    <nav className="bg-surface/95 dark:bg-surface-dim/95 top-0 sticky border-b border-outline-variant/30 backdrop-blur-md shadow-sm z-50 w-full transition-colors duration-300">
      <div className="flex justify-between items-center h-20 px-4 md:px-margin-desktop max-w-container-max mx-auto w-full">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/" className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim hover:opacity-95 transition-opacity">
            河北公益广告大赛
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>首页</NavLink>
          <NavLink to="/guide" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>大赛指南</NavLink>
          <NavLink to="/news" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>新闻动态</NavLink>
          <NavLink to="/upload" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>作品征集</NavLink>
          <NavLink to="/gallery" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>精品展厅</NavLink>
        </div>

        {/* Action Panel */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-surface-container-high px-4 py-2 rounded-full border border-outline/10 focus-within:border-primary/30 transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
            <input
              type="text"
              placeholder="搜索作品..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-label-sm placeholder:text-on-surface-variant/50 w-32 outline-none ml-2"
            />
          </form>

          {/* Auth Button */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4 group relative cursor-pointer py-2">
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border-2 border-primary/30" />
              <span className="font-label-lg text-label-lg text-on-surface font-semibold max-w-[80px] truncate">{user.name}</span>
              
              {/* Dropdown menu */}
              <div className="absolute right-0 top-full hidden group-hover:block bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-xl py-2 w-48 mt-1 z-50">
                <div className="px-4 py-2 border-b border-outline-variant/20">
                  <p className="text-label-sm font-semibold text-on-surface">{user.name}</p>
                  <p className="text-[11px] text-on-surface-variant/60 truncate">{user.email}</p>
                </div>
                <button 
                  onClick={() => navigate('/upload')} 
                  className="w-full text-left px-4 py-2 text-label-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">upload_file</span>
                  申报作品
                </button>
                <button 
                  onClick={logout} 
                  className="w-full text-left px-4 py-2 text-label-sm text-error hover:bg-error-container/20 transition-colors flex items-center gap-2 border-t border-outline-variant/10"
                >
                  <span className="material-symbols-outlined text-[18px] text-error">logout</span>
                  退出登录
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="font-label-lg text-label-lg text-primary dark:text-primary-fixed-dim hover:opacity-80 active:opacity-95 transition-all"
            >
              登录/注册
            </button>
          )}

          <span className="text-outline-variant/50">|</span>
          <button className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors">EN</button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center gap-4">
          {isLoggedIn && (
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-primary/20" />
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-on-surface focus:outline-none"
          >
            <span className="material-symbols-outlined text-[28px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-outline-variant/20 bg-surface/98 backdrop-blur-lg px-6 py-6 space-y-4 animate-fade-in shadow-inner">
          <div className="flex flex-col gap-4">
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary font-bold py-2 border-b border-primary/10" : "text-on-surface-variant py-2"}>首页</NavLink>
            <NavLink to="/guide" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary font-bold py-2 border-b border-primary/10" : "text-on-surface-variant py-2"}>大赛指南</NavLink>
            <NavLink to="/news" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary font-bold py-2 border-b border-primary/10" : "text-on-surface-variant py-2"}>新闻动态</NavLink>
            <NavLink to="/upload" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary font-bold py-2 border-b border-primary/10" : "text-on-surface-variant py-2"}>作品征集</NavLink>
            <NavLink to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? "text-primary font-bold py-2 border-b border-primary/10" : "text-on-surface-variant py-2"}>精品展厅</NavLink>
          </div>
          
          <div className="pt-4 border-t border-outline-variant/20 flex flex-col gap-4">
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <p className="text-label-sm text-on-surface-variant">当前登录: <span className="font-semibold text-on-surface">{user.name}</span></p>
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full py-2 border border-error text-error text-center rounded-lg font-label-lg"
                >
                  退出登录
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setIsLoginModalOpen(true); setIsMobileMenuOpen(false); }}
                className="w-full py-2 bg-primary text-on-primary text-center rounded-lg font-label-lg shadow-sm"
              >
                登录/注册
              </button>
            )}
            <button className="py-2 text-center text-on-surface-variant border border-outline-variant rounded-lg font-label-lg">English Version</button>
          </div>
        </div>
      )}
    </nav>
  );
}
