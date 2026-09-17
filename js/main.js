/**
 * 68DIGITAL - High Performance Logic (Zero-Lag Scroll & Passive Listeners)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeaderScroll();
  initMobileMenu();
  initStatsCounter();
  initPortfolioFilter();
  initLightbox();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;

  const themeIcon = themeToggleBtn.querySelector('i');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeToggleBtn.setAttribute('title', 'Chuyển sang giao diện Sáng');
      } else {
        themeIcon.className = 'fas fa-moon';
        themeToggleBtn.setAttribute('title', 'Chuyển sang giao diện Tối');
      }
    }
  }
}

/* ==========================================================================
   2. HIGH-PERFORMANCE HEADER SCROLL & SECTION SPY (NO LAYOUT THRASHING)
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (header) {
          if (scrollY > 40) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(sec => sectionObserver.observe(sec));
  }
}

/* ==========================================================================
   3. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    });
  });
}

/* ==========================================================================
   4. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-num');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute('data-target'));
          const suffix = stat.getAttribute('data-suffix') || '';
          const prefix = stat.getAttribute('data-prefix') || '';
          const isDecimal = stat.getAttribute('data-decimal') === 'true';

          let current = 0;
          const duration = 1400; // ms
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            stat.textContent = `${prefix}${isDecimal ? current.toFixed(1) : Math.floor(current)}${suffix}`;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.2 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   5. PORTFOLIO FILTER
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. PORTFOLIO LIGHTBOX MODAL
   ========================================================================== */
function initLightbox() {
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const viewImageBtns = document.querySelectorAll('.btn-view-portfolio');

  if (lightboxModal && lightboxImg) {
    viewImageBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const imgSrc = btn.getAttribute('data-img');
        if (imgSrc) {
          lightboxImg.src = imgSrc;
          lightboxModal.classList.add('active');
        }
      });
    });

    const closeBtn = lightboxModal.querySelector('.modal-close-btn');
    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      lightboxImg.src = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
}

/* ==========================================================================
   7. CONTACT FORM VALIDATION
   ========================================================================== */
/* ==========================================================================
   THÔNG TIN LIÊN HỆ & CẤU HÌNH FORM (68DIGITAL)
   ========================================================================== */
const CONTACT_CONFIG = {
  hotline: '0835886635',
  hotlineFormatted: '0835 886 635',
  email: 'dtrdat.work@gmail.com',
  workingHours: '08:00 - 22:00 hàng ngày (Cả T7 & CN)',
  zaloUrl: 'https://zalo.me/0835886635',

  /**
   * CÁCH 1 (Khuyên dùng - Nhận email về dtrdat.work@gmail.com tức thì miễn phí):
   * 1. Vào https://web3forms.com nhập email: dtrdat.work@gmail.com
   * 2. Nhận Access Key trong hòm thư rồi dán vào web3formsAccessKey dưới đây:
   */
  web3formsAccessKey: '', // Điền key vào đây, ví dụ: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'

  /**
   * CÁCH 2 (Lưu trực tiếp vào Google Sheets + gửi email thông báo):
   * Điền URL Web App Google Apps Script vào đây (Xem hướng dẫn trong HUONG_DAN_NHAN_THONG_BAO_FORM.md)
   */
  googleSheetWebhookUrl: ''
};

/* ==========================================================================
   7. CONSULTATION FORM HANDLING & LEAD NOTIFICATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  const statusBox = document.getElementById('form-status');

  if (!form || !statusBox) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#full-name').value.trim();
    const phone = form.querySelector('#phone-number').value.trim();
    const service = form.querySelector('#service-select').value;
    const budget = form.querySelector('#budget-select').value;
    const message = form.querySelector('#message-text').value.trim();

    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;

    if (!name) {
      showStatus('Vui lòng nhập Họ và Tên của bạn.', 'error');
      return;
    }

    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      showStatus('Số điện thoại không hợp lệ (Ví dụ: 0835 886 635).', 'error');
      return;
    }

    if (!service) {
      showStatus('Vui lòng chọn lĩnh vực dịch vụ bạn đang quan tâm.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi thông tin...';
    submitBtn.disabled = true;

    const leadData = {
      name,
      phone,
      service,
      budget,
      message: message || '(Không có ghi chú thêm)',
      timestamp: new Date().toLocaleString('vi-VN')
    };

    try {
      // 1. Web3Forms (Gửi email trực tiếp đến dtrdat.work@gmail.com)
      if (CONTACT_CONFIG.web3formsAccessKey) {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: CONTACT_CONFIG.web3formsAccessKey,
            subject: `[68DIGITAL] Khách hàng mới: ${name} - SĐT: ${phone}`,
            from_name: '68DIGITAL Website',
            ...leadData
          })
        });
        const data = await res.json();
        if (!data.success) {
          throw new Error(data.message || 'Lỗi gửi form');
        }
      } 
      // 2. Google Sheets Webhook (Lưu vào bảng tính Google Drive)
      else if (CONTACT_CONFIG.googleSheetWebhookUrl) {
        await fetch(CONTACT_CONFIG.googleSheetWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData)
        });
      } 
      // 3. Fallback: Lưu vào localStorage trình duyệt (đảm bảo không mất dữ liệu)
      else {
        const stored = JSON.parse(localStorage.getItem('68digital_leads') || '[]');
        stored.unshift(leadData);
        localStorage.setItem('68digital_leads', JSON.stringify(stored));
        await new Promise(r => setTimeout(r, 600));
      }

      // Link chat nhanh qua Zalo kèm lời nhắn được điền sẵn
      const zaloText = encodeURIComponent(`Chào 68DIGITAL, tôi là ${name} (SĐT: ${phone}). Tôi vừa gửi form đăng ký tư vấn dịch vụ [${service}]. Nhờ bạn tư vấn giúp tôi nhé!`);
      const zaloUrl = `https://zalo.me/${CONTACT_CONFIG.hotline}?text=${zaloText}`;

      statusBox.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 6px;">
          <i class="fas fa-check-circle" style="color: #059669; margin-right: 6px;"></i>
          Gửi yêu cầu thành công!
        </div>
        <div>Cảm ơn <strong>${name}</strong>! 68DIGITAL đã tiếp nhận yêu cầu dịch vụ [<strong>${service}</strong>]. Chúng tôi sẽ liên hệ lại qua SĐT/Zalo <strong>${phone}</strong> trong vòng 15 phút.</div>
        <div style="margin-top: 10px;">
          <a href="${zaloUrl}" target="_blank" rel="noopener" class="zalo-direct-btn">
            <i class="fas fa-comment-dots"></i> Hoặc nhấn vào đây để Chat Zalo ngay
          </a>
        </div>
      `;
      statusBox.className = 'form-status success';
      form.reset();
    } catch (err) {
      console.error('Lead submission error:', err);
      showStatus(`Có lỗi xảy ra khi gửi thông tin. Vui lòng gọi trực tiếp hotline: ${CONTACT_CONFIG.hotlineFormatted} hoặc nhắn tin Zalo để được hỗ trợ tức thì!`, 'error');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });

  function showStatus(msg, type) {
    statusBox.innerHTML = `<i class="fas fa-exclamation-circle" style="margin-right: 6px;"></i> ${msg}`;
    statusBox.className = `form-status ${type}`;
  }
}

/* ==========================================================================
   8. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const topBtn = document.getElementById('back-to-top');
  if (!topBtn) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 400) {
          topBtn.classList.add('show');
        } else {
          topBtn.classList.remove('show');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
