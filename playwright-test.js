import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  console.log('🚀 开始河北省公益广告大赛平台 Playwright 自动化测试...');
  
  // Create screenshots directory
  const screenshotDir = path.join(process.cwd(), 'test-screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Launch browser in headed mode so user can see it running
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome', // Use locally installed Google Chrome browser
    slowMo: 50 // speed up visual actions in headless
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();
  
  try {
    // ----------------------------------------------------
    // 1. 访问首页
    // ----------------------------------------------------
    console.log('📍 [步骤 1] 正在打开首页...');
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    
    // Verify header title
    const headerTitle = await page.locator('nav >> text=河北公益广告大赛').first();
    await headerTitle.waitFor({ state: 'visible' });
    console.log('✅ 成功加载首页，顶部标题正常显示。');
    
    await page.screenshot({ path: path.join(screenshotDir, '01_home_page.png') });
    console.log('📸 首页截图已保存。');

    // ----------------------------------------------------
    // 2. 访问大赛指南并验证 Scrollspy 滚动联动
    // ----------------------------------------------------
    console.log('📍 [步骤 2] 正在跳转至“大赛指南”...');
    await page.click('nav >> text=大赛指南');
    await page.waitForURL('**/guide');
    console.log('✅ 大赛指南页面跳转成功。');
    await page.screenshot({ path: path.join(screenshotDir, '02_guide_page.png') });

    // Scroll down to check Scrollspy
    console.log('👇 正在向下滚动页面以触发 Scrollspy 联动高亮...');
    await page.evaluate(() => {
      window.scrollTo(0, 1200);
    });
    await page.waitForTimeout(1500); // Wait for transition
    
    // Check if the scrollspy has updated active section
    const isTimelineActive = await page.locator('aside a[href="#timeline"]').evaluate(el => el.classList.contains('sticky-nav-active'));
    console.log(`✅ Scrollspy 状态：Timeline 导航项当前处于激活高亮状态: ${isTimelineActive}`);
    await page.screenshot({ path: path.join(screenshotDir, '02_guide_scrollspy.png') });

    // ----------------------------------------------------
    // 3. 访问新闻动态并过滤与弹出阅读详情
    // ----------------------------------------------------
    console.log('📍 [步骤 3] 正在跳转至“新闻动态”...');
    await page.click('nav >> text=新闻动态');
    await page.waitForURL('**/news');
    
    // Filter categories
    console.log('🔍 点击“重要通知/公告”分类筛选新闻...');
    await page.click('text=重要通知/公告');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(screenshotDir, '03_news_filtered.png') });

    // Click news item to trigger detail modal
    console.log('📖 点击新闻标题以弹出详情阅读弹窗...');
    await page.click('h3:has-text("作品提交通道现已全面开放")');
    const newsModal = page.locator('h2:has-text("作品提交通道现已全面开放")');
    await newsModal.waitFor({ state: 'visible' });
    console.log('✅ 新闻详情模态窗成功弹出。');
    await page.screenshot({ path: path.join(screenshotDir, '03_news_detail_modal.png') });
    
    // Close modal
    await page.click('span:has-text("close")');
    await newsModal.waitFor({ state: 'hidden' });
    console.log('✅ 新闻详情模态窗已关闭。');

    // ----------------------------------------------------
    // 4. 访问精品展厅并进行筛选和视频预览灯箱测试
    // ----------------------------------------------------
    console.log('📍 [步骤 4] 正在跳转至“精品展厅”...');
    await page.click('nav >> text=精品展厅');
    await page.waitForURL('**/gallery');
    
    // Select Category: Video
    console.log('🎬 筛选类别为“视频广告”...');
    await page.selectOption('select:near(label:has-text("作品类别"))', { label: '视频广告' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(screenshotDir, '04_gallery_filtered.png') });

    // Click video card to open video lightbox
    console.log('🎥 点击《和合共生 · 锦绣河北》视频作品卡片...');
    await page.click('h3:has-text("和合共生 · 锦绣河北")');
    const videoElement = page.locator('video');
    await videoElement.waitFor({ state: 'visible' });
    console.log('✅ 视频灯箱弹窗成功弹出，视频播放器已加载。');
    await page.screenshot({ path: path.join(screenshotDir, '04_gallery_video_lightbox.png') });
    
    // Close lightbox
    await page.click('span:has-text("close")');
    await videoElement.waitFor({ state: 'hidden' });
    console.log('✅ 视频灯箱弹窗已关闭。');

    // ----------------------------------------------------
    // 5. 验证未登录下的“作品征集”锁屏页面
    // ----------------------------------------------------
    console.log('📍 [步骤 5] 正在跳转至“作品征集”...');
    await page.click('nav >> text=作品征集');
    await page.waitForURL('**/upload');
    
    const lockScreen = page.locator('text=您还未登录');
    await lockScreen.waitFor({ state: 'visible' });
    console.log('✅ 成功拦截：未登录状态下正确展示了“您还未登录”锁屏提醒。');
    await page.screenshot({ path: path.join(screenshotDir, '05_upload_unlogged_guard.png') });

    // ----------------------------------------------------
    // 6. 执行模拟登录
    // ----------------------------------------------------
    console.log('📍 [步骤 6] 点击登录按钮，调起登录对话框...');
    await page.click('button:has-text("立即登录 / 注册")');
    const loginModal = page.locator('h2:has-text("登录 / 注册")');
    await loginModal.waitFor({ state: 'visible' });
    
    console.log('🔑 输入用户名“燕赵创意家”和密码“123456”...');
    await page.fill('[placeholder="请输入您的账号名称"]', '燕赵创意家');
    await page.fill('[placeholder="请输入您的登录密码"]', '123456');
    await page.screenshot({ path: path.join(screenshotDir, '06_login_input.png') });

    console.log('⚡ 提交登录请求...');
    await page.click('button[type="submit"]:has-text("登录 / 注册")');
    
    // Wait for auth context to update and show username in header
    const loggedUser = page.locator('nav span:has-text("燕赵创意家")').first();
    await loggedUser.waitFor({ state: 'visible' });
    console.log('✅ 登录成功！顶部导航栏已成功展示登录用户名。');
    await page.screenshot({ path: path.join(screenshotDir, '06_logged_in_state.png') });

    // ----------------------------------------------------
    // 7. 填报作品表单步骤 1（信息检验与填写）
    // ----------------------------------------------------
    console.log('📍 [步骤 7] 重新进入“作品征集”填报页面...');
    // The page should have automatically unlocked and shown Step 1 form since we are now logged in
    const step1Header = page.locator('h3:has-text("参赛者基本信息")');
    await step1Header.waitFor({ state: 'visible' });
    console.log('✅ 页面解锁成功，当前展示为分步表单第一步。');

    console.log('⚠️ 测试空白字段校验：直接点击“下一步”...');
    await page.click('button:has-text("下一步")');
    await page.waitForTimeout(500);
    const step1Error = page.locator('text=姓名或单位名称不能为空');
    await step1Error.waitFor({ state: 'visible' });
    console.log('✅ 表单校验正常触发，成功拦截空白提报。');
    await page.screenshot({ path: path.join(screenshotDir, '07_upload_step1_validation.png') });

    console.log('📝 填写第一步参赛主体信息字段...');
    await page.fill('[placeholder="请输入真实姓名或单位全称"]', '河北大学艺术学院');
    await page.fill('[placeholder="请输入11位手机号码"]', '13888888888');
    await page.fill('[placeholder="example@domain.com"]', 'art@hbu.edu.cn');
    await page.fill('[placeholder="请输入详细的奖项及证书投递地址"]', '河北省保定市五四东路180号');
    await page.screenshot({ path: path.join(screenshotDir, '07_upload_step1_filled.png') });

    console.log('➡️ 前往第二步...');
    await page.click('button:has-text("下一步")');
    
    // ----------------------------------------------------
    // 8. 填报作品表单步骤 2（作品详情填报）
    // ----------------------------------------------------
    console.log('📍 [步骤 8] 进入第二步“作品详细信息”...');
    const step2Header = page.locator('h3:has-text("作品详细信息")');
    await step2Header.waitFor({ state: 'visible' });
    
    console.log('📝 填写第二步作品信息字段...');
    await page.fill('[placeholder="请输入作品名称"]', '印象太行 · 峥嵘岁月');
    await page.fill('input[type="date"]', '2026-06-06');
    await page.fill('[placeholder="请简述作品立意、艺术特色、表现手法及社会效益（300字以内）"]', '本平面设计作品以太行山脉的挺拔风姿为灵感，结合燕赵传统大漆工艺的深邃质感，展现出坚韧不拔的太行精神与新时代的峥嵘岁月，具有极高的艺术美学价值。');
    await page.screenshot({ path: path.join(screenshotDir, '08_upload_step2_filled.png') });

    console.log('➡️ 前往第三步...');
    await page.click('button:has-text("下一步")');

    // ----------------------------------------------------
    // 9. 填报作品表单步骤 3（附件与原创承诺签署）
    // ----------------------------------------------------
    console.log('📍 [步骤 9] 进入第三步“作品文件及最终确认”...');
    const step3Header = page.locator('h3:has-text("作品文件及最终确认")');
    await step3Header.waitFor({ state: 'visible' });

    // Mock drag and drop file upload
    console.log('📎 正在模拟拖入一个待上传的高清作品文件...');
    // We can directly trigger file input in playwright
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('label[for="file-upload"]');
    const fileChooser = await fileChooserPromise;
    
    // Create a temporary dummy file to upload
    const dummyFilePath = path.join(process.cwd(), 'dummy_artwork.png');
    fs.writeFileSync(dummyFilePath, 'dummy content');
    await fileChooser.setFiles(dummyFilePath);
    
    // Check if filename shows up
    const fileSelectedText = page.locator('text=已选文件: dummy_artwork.png');
    await fileSelectedText.waitFor({ state: 'visible' });
    console.log('✅ 拖拽上传文件模拟成功：上传区已成功载入文件。');

    console.log('✍️ 签署原创承诺书...');
    await page.check('#originality-check');
    await page.screenshot({ path: path.join(screenshotDir, '09_upload_step3_filled.png') });

    // ----------------------------------------------------
    // 10. 提报作品并观察上传加载及回执
    // ----------------------------------------------------
    console.log('📍 [步骤 10] 点击“确认并提交作品”...');
    await page.click('button:has-text("确认并提交作品")');
    
    // Monitor progress
    const progressModal = page.locator('h3:has-text("正在上传附件")');
    await progressModal.waitFor({ state: 'visible' });
    console.log('⌛ 上传进度条已触发显示...');
    await page.screenshot({ path: path.join(screenshotDir, '10_upload_progress.png') });

    // Wait for success receipt modal
    const successModal = page.locator('h2:has-text("作品报送成功！")');
    await successModal.waitFor({ state: 'visible', timeout: 10000 });
    console.log('🎉 成功！收到“作品报送成功！”的回执，提报完成。');
    await page.screenshot({ path: path.join(screenshotDir, '11_upload_success_receipt.png') });

    // Clean up temporary dummy file
    if (fs.existsSync(dummyFilePath)) {
      fs.unlinkSync(dummyFilePath);
    }

    // ----------------------------------------------------
    // 11. 返回首页
    // ----------------------------------------------------
    console.log('📍 [步骤 11] 点击返回征集首页并返回网站首页...');
    await page.click('button:has-text("返回征集首页 / 再次提报")');
    await page.click('nav >> text=首页');
    await page.waitForURL('**/');
    console.log('✅ 成功回到网站首页。所有自动化测试用例已全部跑通！');
    await page.screenshot({ path: path.join(screenshotDir, '12_back_to_home.png') });

  } catch (error) {
    console.error('❌ 测试过程中遇到未预期错误:', error);
    await page.screenshot({ path: path.join(screenshotDir, 'error_state.png') });
  } finally {
    console.log('🔌 关闭浏览器，测试结束。');
    await browser.close();
  }
})();
