# 💱 Döviz Kuru Uygulaması

React Native ve Expo ile geliştirilmiş, anlık döviz kurlarını görüntülemenizi sağlayan modern bir mobil uygulama.

## 📱 Özellikler

- 📊 Anlık döviz kurlarını görüntüleme
- 💰 Güncel alış ve satış fiyatları
- 🎨 Modern ve kullanıcı dostu arayüz
- ⚡ Hızlı ve performanslı
- 🌙 NativeWind ile stil yönetimi
- 📱 iOS ve Android desteği

## 🛠️ Teknolojiler

- **React Native** - Mobil uygulama geliştirme framework'ü
- **Expo** - React Native geliştirme platformu
- **TypeScript** - Tip güvenli JavaScript
- **NativeWind** - Tailwind CSS için React Native implementasyonu
- **ESLint & Prettier** - Kod kalitesi ve formatlaması

## 📋 Gereksinimler

Projeyi çalıştırmadan önce sisteminizde aşağıdakilerin kurulu olması gerekmektedir:

- Node.js (v16 veya üzeri)
- npm veya yarn
- Expo CLI
- iOS için: Xcode (macOS)
- Android için: Android Studio

## 🚀 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/umutkamanoglu/doviz.git
cd doviz
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

3. Uygulamayı başlatın:
```bash
npm start
# veya
yarn start
```

## 📱 Çalıştırma

### iOS Simulator
```bash
npm run ios
# veya
yarn ios
```

### Android Emulator
```bash
npm run android
# veya
yarn android
```

### Expo Go ile Test
1. Telefonunuza Expo Go uygulamasını indirin
2. Terminal'de görünen QR kodu okutun
3. Uygulama telefonunuzda açılacaktır

## 📂 Proje Yapısı

```
doviz/
├── assets/           # Görseller ve statik dosyalar
├── components/       # React bileşenleri
├── hooks/           # Özel React hook'ları
├── App.tsx          # Ana uygulama bileşeni
├── app.json         # Expo yapılandırması
├── package.json     # Proje bağımlılıkları
├── tsconfig.json    # TypeScript yapılandırması
├── tailwind.config.js  # Tailwind CSS ayarları
└── global.css       # Global stiller
```

## 🎨 Stil Yönetimi

Bu proje, React Native için Tailwind CSS implementasyonu olan **NativeWind** kullanmaktadır. Stil tanımlamaları Tailwind CSS utility class'ları ile yapılmaktadır.

```tsx
<View className="flex-1 bg-white p-4">
  <Text className="text-2xl font-bold text-gray-800">
    Döviz Kurları
  </Text>
</View>
```

## 🔧 Geliştirme

### Kod Formatı
```bash
npm run format
# veya
yarn format
```

### Lint Kontrolü
```bash
npm run lint
# veya
yarn lint
```

## 📦 Build Alma

### Android APK
```bash
eas build -p android --profile preview
```

### iOS Build
```bash
eas build -p ios --profile preview
```

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Projeye katkıda bulunmak için:

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje açık kaynaklıdır.

## 👤 Geliştirici

**Umut Kamanoğlu**

- GitHub: [@umutkamanoglu](https://github.com/umutkamanoglu)

## 📧 İletişim

Sorularınız veya önerileriniz için:
- GitHub Issues üzerinden bildirim oluşturabilirsiniz

## 🙏 Teşekkürler

Bu projeyi kullandığınız için teşekkür ederiz!

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!
