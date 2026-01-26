# Enescan Akyüz - Kişisel CV Web Sitesi

Modern, profesyonel ve mobil uyumlu kişisel CV web sitesi.

## 🚀 Özellikler

### ✨ Tasarım
- **Minimalist & Modern**: Temiz ve şık tasarım
- **Mobil Uyumlu**: Tüm cihazlarda mükemmel görünüm
- **Animasyonlu**: Smooth scroll ve hover efektleri
- **Profesyonel**: Kurumsal ciddiyet korunarak developer portfolio havası

### 🎨 Tema
- **Renk Paleti**: Beyaz ağırlıklı arka plan, mavi ve gri tonları
- **Tipografi**: Poppins font ailesi
- **İkonlar**: Font Awesome 6.0
- **Geçişler**: CSS transitions ve animations

### 📱 Responsive Design
- **Desktop**: 1200px+ (Geniş layout)
- **Tablet**: 768px - 1199px (Orta layout)
- **Mobil**: 320px - 767px (Kompakt layout)

## 🗂️ Bölümler

### 1. Header / Hero Section
- İsim ve unvan (Enescan Akyüz)
- Profil açıklaması
- Sosyal medya linkleri
- CTA butonları
- Profil görsel alanı

### 2. Hakkımda (About)
- Kişisel açıklama
- Deneyim özeti
- İstatistikler (3+ yıl deneyim, 20+ proje, 5000+ kullanıcı)

### 3. İş Deneyimi (Experience)
- Timeline tasarımı
- RealWorks - Yazılım Mühendisi (2023-Devam)
- Stajyer deneyimleri
- Sorumluluklar ve başarılar

### 4. Projeler (Projects)
- Kart tasarımı ile grid layout
- **OMO Ziyaretçi Takip Sistemi** (Cannes adaylığı)
- **Papara NFC Business Card**
- **Money 20/20 Fuarı Projeleri**
- **Sağlık Takip Uygulaması** (5000+ kullanıcı)
- Hover efektleri ve overlay bilgileri

### 5. Eğitim (Education)
- Bolu Abant İzzet Baysal Üniversitesi
- Bilgisayar Mühendisliği (2020-2024)
- GPA: 3.13

### 6. Teknik Yetenekler (Skills)
- **Mobil**: Kotlin, Android SDK, MVVM
- **Web**: React.js, Node.js, JavaScript
- **AI & Veri**: Python, OpenCV, TensorFlow
- **Backend**: Firebase, MySQL, SQLite
- **DevOps**: Git, CI/CD, Jira, Plesk
- Animasyonlu progress barlar

### 7. Sertifikalar (Certificates)
- Deep Learning Bootcamp
- Yapay Zeka ve Algoritmalar
- Python & TensorFlow
- Android Development

### 8. İletişim (Contact)
- İletişim bilgileri
- Çalışan iletişim formu
- Sosyal medya linkleri

## 🛠️ Teknolojiler

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern CSS, Flexbox, Grid, Animations
- **JavaScript (ES6+)**: Vanilla JS, modern features
- **Font Awesome**: İkonlar
- **Google Fonts**: Poppins tipografi

### Özellikler
- **Responsive Design**: Mobile-first approach
- **CSS Grid & Flexbox**: Modern layout teknikleri
- **CSS Custom Properties**: Tema yönetimi
- **Intersection Observer API**: Scroll animasyonları
- **Smooth Scroll**: Yumuşak geçişler
- **Form Validation**: JavaScript ile form kontrolü

## 📱 Responsive Breakpoints

```css
/* Mobile First */
@media (max-width: 480px) { /* Küçük mobil */ }
@media (max-width: 768px) { /* Mobil & Tablet */ }
@media (max-width: 1024px) { /* Tablet */ }
@media (min-width: 1200px) { /* Desktop */ }
```

## 🎯 Performans Optimizasyonları

- **Lazy Loading**: Görsel yükleme optimizasyonu
- **CSS Minification**: Sıkıştırılmış stil dosyaları
- **Efficient Animations**: GPU hızlandırmalı animasyonlar
- **Lightweight**: Minimal bağımlılık
- **Semantic HTML**: SEO optimizasyonu

## 🚀 Kurulum

1. **Dosyaları İndirin**
```bash
git clone [repository-url]
cd personal-cv-website
```

2. **Web Server Başlatın**
```bash
# Python ile
python -m http.server 8000

# Node.js ile
npx serve .

# PHP ile
php -S localhost:8000
```

3. **Tarayıcıda Açın**
```
http://localhost:8000
```

## 📝 Özelleştirme

### Kişisel Bilgileri Değiştirme
1. `index.html` dosyasında kişisel bilgileri güncelleyin
2. `styles.css` dosyasında renk temasını değiştirin
3. Profil görseli ekleyin (`.profile-placeholder` yerine)

### Renk Teması Değiştirme
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* Diğer renkler */
}
```

### İçerik Güncelleme
- **Projeler**: `.project-card` öğelerini düzenleyin
- **Deneyim**: `.timeline-item` öğelerini güncelleyin
- **Yetenekler**: `.skill-item` ve progress değerlerini ayarlayın

## 📧 İletişim Formu

Form şu anda frontend-only çalışmaktadır. Backend entegrasyonu için:

1. **PHP Backend**
```php
// contact.php
<?php
if ($_POST) {
    // Form verilerini işle
    // Email gönder
}
?>
```

2. **Node.js Backend**
```javascript
// Express.js ile form handler
app.post('/contact', (req, res) => {
    // Form verilerini işle
});
```

3. **Third-party Servisler**
- Formspree
- Netlify Forms
- EmailJS

## 🔧 Geliştirme

### Code Style
- **HTML**: Semantic, accessible markup
- **CSS**: BEM methodology, mobile-first
- **JavaScript**: ES6+, functional programming

### Browser Support
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📈 SEO Optimizasyonu

- **Meta Tags**: Sosyal medya paylaşımı için
- **Structured Data**: JSON-LD şema
- **Sitemap**: XML sitemap
- **Analytics**: Google Analytics entegrasyonu

## 🔒 Güvenlik

- **Form Validation**: XSS koruması
- **HTTPS**: SSL sertifikası önerilir
- **Content Security Policy**: CSP headers

## 📚 Dökümantasyon

### Dosya Yapısı
```
/
├── index.html          # Ana HTML dosyası
├── styles.css          # Ana CSS dosyası
├── script.js           # JavaScript dosyası
├── README.md           # Bu dosya
└── assets/            # Görseller ve medya dosyaları
    ├── images/
    └── icons/
```

## 🎨 Design System

### Typography Scale
- **Heading 1**: 3rem (48px)
- **Heading 2**: 2.25rem (36px)
- **Heading 3**: 1.875rem (30px)
- **Body**: 1rem (16px)
- **Small**: 0.875rem (14px)

### Spacing Scale
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)

### Color Palette
- **Primary**: #2563eb (Blue)
- **Secondary**: #64748b (Slate)
- **Accent**: #3b82f6 (Light Blue)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)

## 📄 Lisans

Bu proje kişisel kullanım için tasarlanmıştır. Ticari kullanım için lütfen iletişime geçin.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

- **Email**: enescan.akyuz@example.com
- **LinkedIn**: [linkedin.com/in/enescan-akyuz](https://linkedin.com/in/enescan-akyuz)
- **GitHub**: [github.com/enescan-akyuz](https://github.com/enescan-akyuz)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
