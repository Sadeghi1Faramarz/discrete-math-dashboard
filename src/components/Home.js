// src/components/Home.js
import React from 'react';

const Home = () => {
  // کامپوننت کمکی برای نمایش لیست ویژگی‌ها
  const FeatureList = ({ title, items }) => (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ color: 'var(--primary-color-light)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>{title}</h3>
      <ul style={{ listStyleType: 'none', paddingRight: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: '0.75rem', color: 'var(--text-dark)' }}>
            <span style={{ color: 'var(--primary-color)', marginRight: '0.5rem' }}>✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  const relationFeatures = [
    "عملیات بولی (وست و رسند)",
    "ضرب بولی و ترکیب روابط (RoS)",
    "محاسبه توان رابطه (Rⁿ)",
    "بررسی خواص رابطه (بازتابی، تقارنی و...)",
    "محاسبه بستارهای رابطه (بازتابی، تقارنی، ترایایی)",
  ];

  const graphFeatures = [
    "رسم گراف از ماتریس مجاورت (ساده و پیشرفته)",
    "محاسبه درجه ورودی و خروجی رئوس",
    "محاسبه ماتریس مکمل گراف",
    "بررسی زیرگراف بودن",
    "تشخیص همبندی گراف",
    "محاسبه طول یک مسیر مشخص در گراف وزن‌دار",
    "یافتن مسیر و دور اولری",
    "یافتن کوتاه‌ترین مسیر با الگوریتم دایکسترا",
  ];

  return (
    <div className="home-container">
      <header>
        <h1>ریاضیات گسسته</h1>
      </header>
      
      <div className="project-content-area" style={{paddingTop: '1rem'}}>
        <p style={{ color: 'var(--text-dark)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
          دنیای ریاضیات گسسته، بنیان علوم کامپیوتر و الگوریتم‌های مدرن، اغلب مملو از مفاهیم انتزاعی و پیچیده است. این داشبورد به عنوان یک پل قدرتمند، این مفاهیم را از دل کتاب‌ها بیرون کشیده و به ابزارهایی بصری و کاملاً تعاملی تبدیل می‌کند. اینجا جایی است که می‌توانید الگوریتم‌های پیچیده را تنها با چند کلیک اجرا کرده و نتایج آن را به صورت آنی مشاهده کنید.
        </p>

        <h2 style={{color: 'var(--text-light)', marginBottom: '1.5rem'}}>یک جعبه‌ابزار جامع برای کاوش در دنیای گسسته</h2>
        <p style={{ color: 'var(--text-dark)', lineHeight: '1.7', marginBottom: '2rem' }}>
          در این پلتفرم، مجموعه‌ای غنی از ابزارها برای دو حوزه کلیدی ریاضیات گسسته فراهم شده است:
        </p>

        <div className="project-layout-split">
          <div className="controls-column">
            <FeatureList title="📊 عملیات روی روابط" items={relationFeatures} />
          </div>
          <div className="results-column">
            <FeatureList title="📈 عملیات روی گراف‌ها" items={graphFeatures} />
          </div>
        </div>

         <p style={{ color: 'var(--text-dark)', lineHeight: '1.7', marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          برای شروع، کافی است از منوی سمت راست، پروژه مورد نظر را انتخاب کنید. هر ابزار با راهنمای سریع و ورودی‌های پیش‌فرض آماده شده تا شما را در سریع‌ترین زمان ممکن به نتیجه برساند.
        </p>
      </div>
    </div>
  );
};

export default Home;
