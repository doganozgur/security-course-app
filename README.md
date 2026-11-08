# 🛡️ Özel Güvenlik Sınav Hazırlık Mobil Uygulaması

EGM Özel Güvenlik Denetleme Başkanlığı sınavlarına hazırlanan adaylar ve eğitim kurumları için geliştirilmiş, **Apple App Store** ve **Google Play Store** uyumlu React Native (Expo) mobil uygulaması.

---

## 📱 Ekranlar ve Temel Modüller

1. **Ana Sayfa (`HomeScreen`):**
   - 106. Sınav Geri Sayımı sayacı
   - Hızlı Sınav Başlat (En son resmi dönem)
   - 4'lü Hızlı Erişim (Çıkmış Sorular, Bilgi Kartları, Puan Hesapla, Hata Defteri)
   - Çözülen soru sayısı, net ve başarı oranı takip paneli
   - Çalışma Serisi (Günlük Streak)

2. **Çıkmış Sınavlar (`ExamsScreen`):**
   - Dönem bazlı sınavlar (105., 104., 103., 102., 101., 100. vb.)
   - Freemium Filtre: Son 3 dönem tamamen ücretsiz, eski dönemler VIP Premium
   - Mod Seçimi: Süreli "Gerçek Sınav Modu" veya anında açıklamalı "Pratik Modu"

3. **Sınav Çözme Motoru (`ExamSolveScreen`):**
   - 120/150 dakika süre sayacı
   - Şık işaretleme (A, B, C, D, E)
   - Soru Bayraklama (Sonra incelemek için işaretleme)
   - Tüm sorular modal ızgarası (Grid view ile hızlı atlama)
   - Çözüm notları ve 5188 sayılı kanun açıklamaları

4. **Sınav Sonucu ve Karne (`ExamResultScreen`):**
   - Başarı Durumu (KAZANDI / KALDI baraj kontrolü)
   - 100 üzerinden resmi puan, doğru/yanlış/boş dağılımı
   - Konu bazlı analiz (Hukuk, Güvenlik Tedbirleri, Yangın, İlkyardım, Cihazlar vb.)
   - Yanlışları tek tuşla Hata Defterine gönderme

5. **Hap Bilgi Kartları (`FlashcardsScreen`):**
   - Dokunmatik flip kart (Ön yüz: Soru/Kavram -> Arka yüz: Kanun maddesi ve çözüm)
   - Konu filtreleri
   - "Öğrendim" / "Tekrar Et" hafıza takip mekaniği

6. **EGM Resmi Puan Hesaplayıcı (`ScoreCalculatorScreen`):**
   - Silahsız ÖGG (100 soru, 60 baraj)
   - Silahlı ÖGG (100 Temel + 25 Silah + 5 Atış isabeti)
   - Resmi mevzuata göre anlık kazanma/kaybetme analizi

7. **Hata Defteri (`MistakesScreen`):**
   - Yanlış yapılan soruların biriktiği özel alan
   - Tekrar çözme ve doğru yapıldığında listeden temizleme

8. **Profil & Mağaza Kuralları (`ProfileScreen`):**
   - VIP Freemium yükseltme (RevenueCat uyumlu)
   - Apple Store Guideline uyumlu "Verilerimi Sıfırla / Hesap Sil" desteği
   - EGM yasal uyarısı ve KVKK bildirimleri

---

## 🚀 Çalıştırma

Projeyi çalıştırmak için:

```bash
cd /Users/doganozgur/.gemini/antigravity/scratch/ozel-guvenlik-app

# Geliştirici sunucusunu başlatın
npx expo start
```

* **iOS Simülatöründe:** Terminalde `i` tuşuna basın.
* **Android Simülatöründe:** Terminalde `a` tuşuna basın.
* **Gerçek Telefonda:** Expo Go uygulamasını açıp terminaldeki QR kodu okutun.

---

## 📦 Store Dağıtımı (iOS & Android)

```bash
# EAS CLI kurulumu
npm install -g eas-cli
eas login

# Konfigürasyon
eas build:configure

# iOS (Apple TestFlight & App Store) için:
eas build --platform ios

# Android (Google Play AAB) için:
eas build --platform android
```
