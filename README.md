# Sonix

Sonix, ses dosyalarını yüksek doğrulukla metne dönüştürmek, işlemek ve yapay zeka ile özetlemek amacıyla geliştirilmiş yeni nesil, yüksek performanslı bir transkripsiyon uygulamasıdır. Proje, web tarayıcılarında çalışabilen güçlü bir web uygulaması ile masaüstü işletim sistemleri (Windows, macOS, Linux) için optimize edilmiş, çevrimdışı çalışabilen yerel (native) bir uygulamanın birleşiminden oluşan modern bir monorepo mimarisine sahiptir.

## 🌟 Temel Özellikler

- **Çift Platform Desteği (Dual-Application):** Hem web tarayıcıları üzerinden erişilebilen bulut tabanlı bir Next.js uygulaması, hem de Tauri altyapısı ile geliştirilmiş performanslı bir masaüstü uygulaması.
- **Gelişmiş Ses İşleme ve Transkripsiyon:** OpenAI'ın Whisper modelleri kullanılarak cihaz içi (on-device) ve web tabanlı (Web Worker aracılığıyla) yüksek hızlı ve isabetli konuşmadan metne dönüşüm (Speech-to-Text).
- **Yapay Zeka Destekli Özetleme:** Çıkarılan metinleri analiz eden ve yapay zeka algoritmalarıyla otomatik olarak anlamlı özetler oluşturan işleme hattı.
- **Çoklu Veritabanı Mimarisi:** Web platformunda bulut senkronizasyonu için **PostgreSQL** ve masaüstü uygulamasında çevrimdışı (offline) kullanım için **SQLite** entegrasyonu.
- **Uluslararasılaştırma (i18n):** Türkçe, İngilizce, Fransızca, Portekizce, Rusça, Çince, İtalyanca ve İspanyolca dillerinde çoklu dil desteği.
- **Modern Arayüz:** shadcn/ui ve Tailwind CSS kullanılarak hazırlanmış, kullanıcı dostu ve erişilebilir arayüz tasarımı.

## 🛠 Teknoloji Yığını

### Çekirdek ve Monorepo
- **Paket Yöneticisi:** `pnpm`
- **Monorepo Aracı:** Turborepo
- **Dil:** TypeScript, Rust (Tauri için)

### Uygulamalar (Apps)
1. **Web (`apps/web`):**
   - Framework: Next.js 15 (App Router, Turbopack)
   - UI: React 19, Tailwind CSS, shadcn/ui
   - Kimlik Doğrulama: Supabase SSR
2. **Native (`apps/native`):**
   - Çatı: Tauri v2
   - Frontend: Next.js & React
   - Backend Entegrasyonları: Rust (Özelleştirilmiş ses ve Whisper entegrasyonları için)

### Ortak Paketler (Packages)
- **Veritabanı (`@workspace/database`):** Drizzle ORM (PostgreSQL & SQLite destekli)
- **UI Kütüphanesi (`@workspace/ui`):** Paylaşılan UI bileşenleri, Whisper web worker (`whisper-worker.ts`)
- **i18n (`@workspace/i18n`):** Çoklu dil metinleri ve konfigürasyonları

## 🏗 Proje Mimarisi

Sonix, kod tekrarını en aza indirmek ve bakım kolaylığı sağlamak için **Turborepo** ile yönetilen bir monorepo olarak tasarlanmıştır.

```text
sonix_final/
├── apps/
│   ├── web/              # Next.js tabanlı ana web uygulaması
│   └── native/           # Tauri tabanlı masaüstü uygulaması (Rust + Next.js)
├── packages/
│   ├── database/         # Drizzle ORM, şemalar (schema.postgres.ts, schema.sqlite.ts)
│   ├── ui/               # Ortak React bileşenleri (shadcn/ui) ve Whisper servisleri
│   ├── i18n/             # Çeviri dosyaları ve lokalizasyon
│   ├── eslint-config/    # Paylaşılan ESLint ayarları
│   └── typescript-config/# Paylaşılan TypeScript ayarları
├── turbo.json            # Turborepo yapılandırması
├── pnpm-workspace.yaml   # pnpm çalışma alanı tanımları
└── package.json          # Kök paket yapılandırması
```

## 💾 Veritabanı Şeması ve Yönetimi

Sonix, esnek bir veritabanı stratejisi kullanır. Bu sayede platforma özgü en iyi deneyimi sunar:

- **Drizzle ORM:** Tüm veritabanı sorguları ve şema yönetimleri Drizzle üzerinden tip güvenli (type-safe) olarak yapılır.
- **PostgreSQL (`schema.postgres.ts`):** Web uygulaması tarafından Supabase altyapısı üzerinde bulut tabanlı eşzamanlı veri yönetimi için kullanılır.
- **SQLite (`schema.sqlite.ts`):** Native (Tauri) masaüstü uygulamasında kullanıcıların verilerini tamamen yerel makinede saklayabilmesi (çevrimdışı destek) için kullanılır.

Veritabanı işlemleri `packages/database` dizininde merkezileştirilmiştir:
- `pnpm run generate:sqlite`
- `pnpm run generate:postgres`
- `pnpm run push:postgres`

## 🎙 Transkripsiyon İşleme Hattı (Pipeline)

Uygulamanın çekirdeğini oluşturan transkripsiyon sistemi iki farklı yaklaşımla çalışır:

1. **Web Tabanlı Transkripsiyon (`use-web-transcription` & `whisper-worker.ts`):** 
   - Xenova Transformers kütüphanesi kullanılarak, Whisper modelleri doğrudan tarayıcı üzerinde Web Worker'lar içerisinde çalıştırılır.
   - Bu yaklaşım, herhangi bir sunucu maliyeti olmadan tamamen istemci tarafında (client-side) çeviri yapılmasını sağlar.
2. **Native Transkripsiyon (`apps/native/src-tauri/src/transcription.rs`):**
   - Masaüstü uygulamasında donanım hızlandırmasından (hardware acceleration) tam anlamıyla yararlanmak için Rust kullanılarak işletim sistemi seviyesinde ses işlenir ve C++ tabanlı Whisper kütüphaneleriyle entegre edilir.

## 🚀 Kurulum ve Çalıştırma

Geliştirme ortamını bilgisayarınıza kurmak için aşağıdaki adımları izleyin:

### Gereksinimler
- Node.js (v20 veya üzeri)
- pnpm (v10)
- Rust ve Cargo (Masaüstü/Native geliştirme için)
- C++ derleme araçları (Tauri ve Whisper native kütüphaneleri için)

### Adım 1: Bağımlılıkların Kurulması

```bash
# Projeyi klonlayın
git clone <repository-url>
cd sonix_final

# pnpm kullanarak tüm bağımlılıkları yükleyin
pnpm install
```

### Adım 2: Geliştirme Sunucusunu Başlatma

Monorepo yapısı sayesinde tüm uygulamaları aynı anda veya izole olarak başlatabilirsiniz.

```bash
# Tüm uygulamaları (Web ve paketler) geliştirme modunda başlatmak için:
pnpm run dev

# Sadece Web uygulamasını çalıştırmak için:
pnpm --filter web dev

# Tauri Masaüstü uygulamasını çalıştırmak için:
pnpm run tauri dev
# veya
pnpm --filter native tauri dev
```

### Adım 3: Veritabanı Hazırlığı

Web tarafı için `.env` dosyasını oluşturup Supabase kimlik bilgilerinizi girmeniz gerekmektedir. Native tarafında SQLite yerel olarak otomatik oluşturulabilir, örnek veriler eklemek için:

```bash
pnpm --filter @workspace/database run seed:sqlite
```

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak isterseniz detaylı bilgiler için `CONTRIBUTING.md` dosyasına göz atabilirsiniz. Lütfen standart kodlama pratiklerine uymak için `pnpm run lint` ve `pnpm run format` komutlarını kullanarak PR (Pull Request) öncesi kontrollerinizi gerçekleştirin.

## 📜 Lisans

Bu proje detayları `LICENSE` dosyasında belirtilen lisans koşulları altında dağıtılmaktadır.
