import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useApp();
  const [activeTab, setActiveTab] = useState('password'); // password or sms
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (activeTab === 'password') {
      if (!username.trim() || !password.trim()) {
        setError('用户名或密码不能为空');
        return;
      }
    } else {
      if (!/^1[3-9]\d{9}$/.test(phone)) {
        setError('请输入正确的 11 位手机号码');
        return;
      }
      if (!code.trim() || code.length !== 6) {
        setError('请输入 6 位短信验证码');
        return;
      }
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const loginName = activeTab === 'password' ? username : `用户_${phone.substring(7)}`;
      login(loginName);
    }, 1200);
  };

  const handleSendCode = () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError('请输入正确的 11 位手机号码获取验证码');
      return;
    }
    setError('');
    alert('验证码已发送，请注意查收！(演示验证码: 123456)');
    setCode('123456');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-surface border border-outline-variant/30 w-full max-w-md rounded-xl p-8 shadow-2xl relative overflow-hidden flex flex-col gap-6">
        {/* Background decorative patterns */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {/* Title */}
        <div className="text-center">
          <h2 className="font-headline-lg text-headline-lg text-primary">登录 / 注册</h2>
          <p className="text-label-sm text-on-surface-variant mt-2">欢迎来到河北省公益广告大赛平台</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-outline-variant/30">
          <button
            onClick={() => { setActiveTab('password'); setError(''); }}
            className={`flex-1 text-center py-2.5 font-label-lg text-label-lg transition-all border-b-2 ${
              activeTab === 'password'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            账号密码登录
          </button>
          <button
            onClick={() => { setActiveTab('sms'); setError(''); }}
            className={`flex-1 text-center py-2.5 font-label-lg text-label-lg transition-all border-b-2 ${
              activeTab === 'sms'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            短信验证码登录
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-error-container text-on-error-container p-3 rounded-lg border border-error/20 text-label-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          {activeTab === 'password' ? (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-label-lg font-label-lg text-on-surface">用户名 / 邮箱</label>
                <input
                  type="text"
                  placeholder="请输入您的账号名称"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all text-on-surface disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-lg font-label-lg text-on-surface">密码</label>
                <input
                  type="password"
                  placeholder="请输入您的登录密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all text-on-surface disabled:opacity-50"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-label-lg font-label-lg text-on-surface">手机号码</label>
                <input
                  type="tel"
                  placeholder="请输入 11 位手机号码"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all text-on-surface disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-lg font-label-lg text-on-surface">短信验证码</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="6 位验证码"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg p-3 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all text-on-surface disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={isLoading}
                    className="bg-secondary text-on-secondary px-4 py-3 font-label-lg rounded-lg hover:brightness-95 disabled:opacity-50 text-sm whitespace-nowrap"
                  >
                    获取验证码
                  </button>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-on-primary py-3.5 font-label-lg rounded-lg hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:translate-y-0"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-on-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                正在登录...
              </>
            ) : (
              '登录 / 注册'
            )}
          </button>
        </form>

        {/* Info */}
        <p className="text-[11px] text-center text-on-surface-variant/60">
          未注册的手机号验证后将自动创建新账户。登录即代表您同意本平台的隐私政策与用户协议。
        </p>
      </div>
    </div>
  );
}
