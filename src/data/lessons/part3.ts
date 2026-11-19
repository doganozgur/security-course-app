import { LessonBook } from '../../types';

export const LESSONS_PART_3: LessonBook[] = [
  {
    id: 'kisi_koruma',
    title: 'Kişi Koruma (Yakın Koruma / VIP)',
    shortTitle: 'Kişi Koruma',
    subtitle: 'Koruma halkaları, yaya/araç düzenleri, öncü istihbarat ve suikast önleme',
    emoji: '🕴️',
    color: '#6366F1',
    examQuestionCount: 9,
    chapters: [
      {
        id: 'koruma-1',
        chapterNumber: 1,
        title: 'Kişi Korumanın Temel İlkeleri ve 3’lü Koruma Halkası',
        summary: 'VIP kavramı, dış/orta/iç halka, boğma noktaları ve tehdit analizi.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Koruma Çemberleri (Halkalar)',
            paragraphs: [
              'Önemli kişinin (VIP) can güvenliğini, saygınlığını ve özgür hareketini sağlamak amacıyla dıştan içe doğru üç kademeli koruma çemberi oluşturulur:',
            ],
            bullets: [
              'Dış Halka: Uzak çevre güvenliği, çatı gözlemcileri, trafik ve yol kontrol noktaları, genel kolluk desteği.',
              'Orta Halka: Kontrollü geçiş alanı, davetli listesi, dedektör, X-Ray ve kimlik kontrolünün yapıldığı bölge.',
              'İç Halka: VIP’e en yakın olan, fiziksel teması ve anlık saldırıyı engelleyen yakın koruma ekibinin bulunduğu alan.',
            ],
          },
          {
            heading: 'Boğma Noktaları',
            paragraphs: [
              'VIP’in mutlaka geçmek zorunda olduğu, alternatif yolun az ve saldırı riskinin en yüksek olduğu dar geçiş, köprü, tünel, kavşak, bina girişi ve asansör gibi yerlere "Boğma Noktası" denir.',
              'Boğma noktalarından mümkün olduğunca hızlı ve öncü ekip kontrolünden sonra geçilmelidir.',
            ],
            examTip:
              'Kişi korumada temel amaç saldırganı yakalamak değil, VIP’in can güvenliğini sağlayarak olay yerinden derhal uzaklaştırmaktır!',
          },
        ],
      },
      {
        id: 'koruma-2',
        chapterNumber: 2,
        title: 'Yaya Koruma Düzenleri ve Saldırı Anı Tepkisi',
        summary: 'Tekli, ikili, dörtlü, elmas düzeni ve Kapat–Koru–Uzaklaştır kuralı.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Yaya Koruma Düzenleri',
            paragraphs: [
              'Yaya koruma düzeni, personel sayısına ve kalabalık/tehdit yoğunluğuna göre şekillendirilir. Koruma personelinin görevi 360 derecelik görüş alanı sağlamak ve kör nokta bırakmamaktır.',
            ],
            bullets: [
              'Tekli Koruma: Tek koruma görevlisi (sağ elini kullanıyorsa) VIP’in sağ arkasında yürür; hem önü hem arkayı kontrol eder.',
              'İkili Koruma: Bir görevli önde yol açıcı (öncü), diğeri VIP’in hemen arkasında yakın koruma olarak konumlanır.',
              'Baklava (Elmas) Düzeni: 4 veya 5 kişilik ekiplerde (öncü, sağ kanat, sol kanat, artçı ve koruma amiri) kalabalık alanlarda 360° tam koruma sağlayan en etkili düzendir.',
              'Kalabalık / Kama Düzeni: Yoğun kalabalık içinde VIP’e yol açmak için V şeklinde ilerlenir.',
            ],
          },
          {
            heading: 'Saldırı Anında Hareket Tarzı',
            paragraphs: [
              'Silahlı veya fiziki bir saldırı anında "Kapat – Koru (Küçült) – Uzaklaştır (Kaçır)" prensibi saniyeler içinde uygulanır: Koruma ekibi saldırı yönüne vücuduyla set oluşturur, VIP’i eğerek hedefi küçültür ve en hızlı şekilde güvenli bölgeye/araca taşır.',
            ],
          },
        ],
      },
      {
        id: 'koruma-3',
        chapterNumber: 3,
        title: 'Araç Koruma, Makam Aracı ve Konvoy Kuralları',
        summary: 'VIP’in araç içi oturma düzeni, konvoy dizilişi ve alternatif güzergâh.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Makam Aracı ve Konvoy Esasları',
            paragraphs: [
              'Makam aracında VIP sağ arka koltukta oturur. Koruma amiri ön sağ koltukta (şoförün yanında) bulunur. Araç kapıları hareket halindeyken daima kilitli, camlar kapalı tutulur.',
            ],
            bullets: [
              'Güzergâh ve saatler rutin olmamalı; önceden ana güzergâh ve en az 2 alternatif güzergâh belirlenmelidir.',
              'Konvoy düzeninde: Öncü koruma aracı → Makam aracı (VIP) → Artçı koruma aracı (takip aracı) şeklinde diziliş yapılır.',
              'Araç durduğunda koruma personeli VIP’ten önce iner, çevreyi kontrol eder ve güvenli olduğunda VIP’in kapısını açar.',
            ],
          },
        ],
      },
      {
        id: 'koruma-4',
        chapterNumber: 4,
        title: 'Öncü İstihbarat ve Suikast Aşamaları',
        summary: 'Suikastın 5 aşaması ve öncü ekibin keşif/kontrol görevleri.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Suikastın Aşamaları ve Önleme',
            paragraphs: [
              'Suikast eylemleri genellikle 5 aşamadan oluşur: 1) Hedef seçimi, 2) İstihbarat toplama, 3) Planlama, 4) Saldırı, 5) Kaçış.',
              'Yakın korumanın en etkili savunması, VIP gitmeden önce "öncü istihbarat çalışması" yaparak mekânın giriş-çıkışlarını, hastane mesafesini, acil kaçış yollarını ve şüpheli unsurları önceden tespit etmektir.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'cihazlar',
    title: 'Güvenlik Sistem ve Cihazları',
    shortTitle: 'Güvenlik Cihazları',
    subtitle: 'X-Ray renk kodları, metal dedektörler, CCTV, biyometri ve çevre güvenliği',
    emoji: '📡',
    color: '#14B8A6',
    examQuestionCount: 5,
    chapters: [
      {
        id: 'cihaz-1',
        chapterNumber: 1,
        title: 'X-Ray Cihazları ve Ekran Renk Kodları',
        summary: 'X ışını prensibi, organik/inorganik/karışık renkler ve konveyör kuralları.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'X-Ray Çalışma Prensibi ve Renk Anlamları',
            paragraphs: [
              'X-Ray cihazları, tünel içinden geçen çanta ve paketlere düşük dozda X ışını göndererek maddelerin atom ağırlığına ve yoğunluğuna göre monitörde renklendirilmiş görüntü oluşturur.',
            ],
            bullets: [
              'Turuncu (Kahverengi tonları): Organik maddeler — patlayıcılar (C4, TNT), uyuşturucular, plastik, gıda, kâğıt, tekstil, su.',
              'Mavi (Koyu mavi): İnorganik maddeler — demir, çelik, bakır, ateşli silahlar, bıçaklar, mermiler, metal aksam.',
              'Yeşil: Karışık (organik + inorganik) maddeler — elektronik cihazlar, telefon, dizüstü bilgisayar, alüminyum, cam, tuz.',
              'Siyah (Opak / Geçirgen olmayan): X ışınının nüfuz edemediği çok yoğun metaller (kurşun, kalın çelik).',
            ],
            examTip:
              'Sınavın vazgeçilmez sorusu: Organik (patlayıcılar) = TURUNCU, İnorganik (silah/metal) = MAVİ, Karışık (elektronik/cam) = YEŞİL!',
          },
          {
            heading: 'X-Ray Kullanımında Dikkat Edilecek Hususlar',
            paragraphs: [
              'X-Ray tünelinden canlılar (insan, bebek, evcil hayvan) kesinlikle geçirilmez. Kurşun perdeler radyasyonun dışarı sızmasını engeller; kol veya el tünel içine sokulmaz. Operatörün yorulmaması için ekran başında en fazla 20–30 dakika görev yapması, ardından yer değiştirmesi önerilir.',
            ],
          },
        ],
      },
      {
        id: 'cihaz-2',
        chapterNumber: 2,
        title: 'Kapı Tipi ve El Tipi Metal Dedektörleri',
        summary: 'Manyetik alan prensibi, arama mesafesi, kalp pili uyarısı ve kalibrasyon.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Kapı ve El Dedektörü Kullanım Esasları',
            paragraphs: [
              'Metal dedektörler elektromanyetik alan prensibiyle çalışır; X ışını (radyasyon) yaymazlar. Ancak oluşturdukları manyetik alan nedeniyle kalp pili (pacemaker) taşıyan kişiler ve hamileler kapı dedektöründen geçirilmez.',
            ],
            bullets: [
              'Kapı dedektöründen geçen kişiler arasında en az 1 metre mesafe bırakılmalıdır.',
              'Kişi geçmeden önce cep telefonu, anahtar, bozuk para ve metal kemer gibi eşyalarını X-Ray tepsisine bırakmalıdır.',
              'El tipi metal dedektörü kişinin vücuduna temas ettirilmeden 2,5 – 7,5 cm mesafeden, baş-omuz-gövde-bacak sırasıyla gezdirilir.',
              'El dedektörü batarya seviyesi düşükse yanlış veya eksik sinyal verebilir; vardiya başında mutlaka test edilmelidir.',
            ],
          },
        ],
      },
      {
        id: 'cihaz-3',
        chapterNumber: 3,
        title: 'CCTV Kamera Sistemleri',
        summary: 'Sabit, PTZ, gece görüşlü kameralar ve kayıt/izleme odası kuralları.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Kapalı Devre Televizyon (CCTV)',
            paragraphs: [
              'CCTV sistemleri tesisin kritik noktalarını 7/24 izlemek, caydırıcılık sağlamak, olaylara anında müdahale etmek ve olay sonrası delil oluşturmak amacıyla kullanılır.',
            ],
            bullets: [
              'Sabit (Box/Bullet/Dome) Kameralar: Belirli bir kapı, koridor veya otoparkı sürekli izler.',
              'Hareketli (PTZ / Speed Dome) Kameralar: Operatör tarafından sağa-sola (Pan), yukarı-aşağı (Tilt) çevrilebilir ve yakınlaştırma (Zoom) yapabilir.',
              'Kızılötesi (IR) ve Termal Kameralar: Karanlıkta veya sisli havalarda ısı/kızılötesi görüntü sağlar.',
            ],
          },
        ],
      },
      {
        id: 'cihaz-4',
        chapterNumber: 4,
        title: 'Geçiş Kontrol, Biyometri ve Çevre Güvenlik Sistemleri',
        summary: 'Kartlı geçiş, parmak izi/iris tanıma, turnike, bariyer ve sensörler.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Kartlı ve Biyometrik Geçiş Sistemleri',
            paragraphs: [
              'Geçiş kontrol sistemleri (CACS), yetkisiz kişilerin hassas alanlara girişini önler ve giriş-çıkış saatlerini kayıt altına alır.',
            ],
            bullets: [
              'Biyometrik Sistemler: Parmak izi, iris/retina (göz), yüz tanıma, avuç içi damar izi ve ses tanıma gibi kişiye özgü, taklit edilmesi güç fiziksel özellikleri kullanır.',
              'Fiziki Engeller: Turnikeler, mantar bariyerler, yol kapanları (road blocker) ve yüksek güvenlikli çitler.',
              'Çevre Algılama Sensörleri: Kızılötesi (PIR) hareket dedektörleri, mikrodalga bariyerler, fiber optik çit sensörleri ve patlayıcı/uyuşturucu iz dedektörleri.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'yangin',
    title: 'Yangın Güvenliği ve Tabii Felaketler',
    shortTitle: 'Yangın & Afetler',
    subtitle: 'Yanma çeşitleri, yangın sınıfları, söndürücüler, gaz kaçakları ve doğal afetler',
    emoji: '🔥',
    color: '#EF4444',
    examQuestionCount: 8,
    chapters: [
      {
        id: 'yangin-1',
        chapterNumber: 1,
        title: 'Yanma Üçgeni, Yanma Çeşitleri ve Isı Transferi',
        summary: 'Yanmanın 3 şartı, yavaş/hızlı/parlama/patlama yanması ve ısının yayılması.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Yanma Üçgeni (Yangın Üçgeni)',
            paragraphs: [
              'Yanma; yanıcı maddenin ısı ve oksijenle birleşerek oluşturduğu kimyasal bir reaksiyondur. Yanmanın başlaması ve sürmesi için üç unsur aynı anda bulunmalıdır: Yanıcı Madde, Oksijen (havada normalde %21 bulunur; yanma için en az %16 gerekir) ve Isı (tutuşma sıcaklığı).',
            ],
            bullets: [
              'Yavaş Yanma: Alev, ışık ve korlaşma olmadan gerçekleşir (ör. demirin paslanması, hücre solunumu).',
              'Hızlı Yanma: Alev, ısı, ışık ve korlaşmanın görüldüğü klasik yangın olayıdır.',
              'Parlama ve Patlama Şeklinde Yanma: LPG, doğalgaz, benzin buharı gibi kolay alev alan maddelerin aniden yanmasıdır.',
              'Kendi Kendine Yanma: Yavaş yanmanın zamanla ısı biriktirerek alevli yanmaya dönüşmesidir (ör. yağlı bezlerin yığın halinde kızışması).',
            ],
          },
          {
            heading: 'Isının Yayılma Yolları',
            paragraphs: [
              'Yangında ısı üç yolla yayılır: İletim (kondüksiyon – katı maddeler boyunca), Taşınım (konveksiyon – ısınan hava ve dumanın yükselmesiyle) ve Işıma (radyasyon – elektromanyetik dalgalarla doğrudan).',
            ],
          },
        ],
      },
      {
        id: 'yangin-2',
        chapterNumber: 2,
        title: 'Yangın Sınıfları (A, B, C, D, F) ve Söndürücüler',
        summary: 'Her yangın sınıfına uygun söndürme maddesi ve elektrik yangınları.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Uluslararası Yangın Sınıfları',
            paragraphs: [
              'Yanlış söndürücü kullanmak yangını büyütür veya elektrik çarpmasına yol açar. Bu nedenle yangın sınıflarını doğru bilmek hayati önem taşır:',
            ],
            bullets: [
              'A Sınıfı (Katı Madde Yangınları): Odun, kâğıt, kumaş, kömür, plastik → En etkili söndürücü SU ve ABC Kuru Kimyevi Toz (KKT).',
              'B Sınıfı (Sıvı Madde Yangınları): Benzin, mazot, tiner, boya, madeni yağ → KÖPÜK, KKT veya CO₂ (Su kullanılmaz, yakıtı yayar!).',
              'C Sınıfı (Gaz Madde Yangınları): Doğalgaz, LPG, bütan, propan → Önce gaz vanası kapatılır, KKT veya CO₂ kullanılır.',
              'D Sınıfı (Metal Yangınları): Magnezyum, sodyum, potasyum, alüminyum, titanyum → Özel D sınıfı kuru toz veya kuru kum (Su KESİNLİKLE kullanılmaz, patlamaya yol açar!).',
              'F Sınıfı (Pişirme Yağları Yangınları): Mutfaklardaki bitkisel ve hayvansal kızartma yağları → Özel F sınıfı kimyasal söndürücü veya yangın battaniyesi (Su dökülürse parlayarak patlar!).',
            ],
            examTip:
              'Elektrik yangınlarında ÖNCE elektrik akımı kesilir; söndürme için iletken olmayan CO₂ (Karbondioksit) veya KKT kullanılır. Su ve köpük kesinlikle kullanılmaz!',
          },
        ],
      },
      {
        id: 'yangin-3',
        chapterNumber: 3,
        title: 'Söndürme Yöntemleri, Yangın Tüpü ve Gaz Kaçakları',
        summary: 'Soğutma-boğma-yakıt giderme, tüp kullanma kuralları ve LPG/doğalgaz farkı.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Yangın Söndürme Prensipleri ve Tüp Kullanımı',
            paragraphs: [
              'Yangını söndürmek için yanma üçgenindeki unsurlardan biri ortadan kaldırılır: Soğutma (ısıyı düşürme), Boğma (oksijeni kesme) ve Yanıcı Maddeyi Ortadan Kaldırma (yakıtı kesme).',
            ],
            bullets: [
              'Yangın tüpü kullanılırken rüzgâr mutlaka arkaya alınır.',
              'Emniyet pimi çekilir, hortum/lans alevin üstüne değil DOĞDUĞU YERE (tabanına) tutulur ve sağa-sola süpürme hareketi yapılır.',
              'Yangın söndürme tüplerinin periyodik kontrolü 6 ayda bir, dolum/bakımı ve hidrostatik testi ilgili yönetmeliğe göre düzenli yaptırılır.',
            ],
          },
          {
            heading: 'Doğalgaz ve LPG Kaçağı Farkı',
            paragraphs: [
              'Doğalgaz havadan HAFİFTİR; kaçak olduğunda tavanda birikir (üst pencereler açılır). LPG (tüp gaz) ise havadan AĞIRDIR; kaçak olduğunda zeminde birikir (alt kısımlar süpürülerek/kapı açılarak havalandırılır).',
              'Her iki gaz kaçağında da elektrik düğmelerine dokunulmaz, kibrit/çakmak yakılmaz, telefon kullanılmaz; gaz vanası kapatılıp 187 / 112 aranır.',
            ],
            examTip:
              'Doğalgaz havadan hafiftir (tavanda birikir), LPG havadan ağırdır (zeminde birikir).',
          },
        ],
      },
      {
        id: 'yangin-4',
        chapterNumber: 4,
        title: 'Bina Yangın Güvenliği ve Acil Durum Ekipleri',
        summary: 'Söndürme, kurtarma, koruma, ilk yardım ekipleri ve dumanlı ortamda tahliye.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Binalarda 4 Acil Durum Ekibi',
            paragraphs: [
              'Binaların Yangından Korunması Hakkında Yönetmelik gereği kurumlarda 4 temel acil durum ekibi oluşturulur:',
            ],
            bullets: [
              'Söndürme Ekibi: Yangına ilk müdahaleyi yaparak büyümesini önler.',
              'Kurtarma Ekibi: Önce canlıları, ardından önemli evrak ve malzemeleri güvenli alana tahliye eder.',
              'Koruma Ekibi: Kurtarılan eşyaları ve bina çevresini yağma/yetkisiz girişe karşı korur, paniği önler.',
              'İlk Yardım Ekibi: Yaralı ve dumandan etkilenenlere temel ilk yardım uygular.',
            ],
          },
          {
            heading: 'Dumanlı Ortamda Tahliye',
            paragraphs: [
              'Yangın ölümlerinin büyük çoğunluğu alevden değil, zehirli duman ve karbonmonoksit gazından kaynaklanır. Sıcak duman tavana yükseldiği için tahliye sırasında ağız-burun ıslak bezle kapatılıp ZEMİNE YAKIN (emekleyerek) ilerlenir.',
            ],
          },
        ],
      },
      {
        id: 'yangin-5',
        chapterNumber: 5,
        title: 'Deprem, Sel, Heyelan ve Çığ Afetlerinde Hareket Tarzı',
        summary: 'Çök-Kapan-Tutun kuralı, hayat üçgeni ve afet sonrası güvenli davranış.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Deprem Anında ve Sonrasında',
            paragraphs: [
              'Deprem sarsıntısı başladığında pencere, balkon, merdiven ve asansörlerden uzak durulur. Sağlam bir masa/koltuk/çamaşır makinesi gibi hacimli bir eşyanın yanında "Çök – Kapan – Tutun" pozisyonu alınarak baş ve boyun korunur.',
              'Sarsıntı tamamen durduktan sonra elektrik şalteri, su ve doğalgaz vanaları kapatılarak önceden belirlenen toplanma alanına çıkılır; telefonlar acil durumlar dışında meşgul edilmez.',
            ],
          },
          {
            heading: 'Sel, Heyelan ve Çığ',
            paragraphs: [
              'Sel anında dere yataklarından ve bodrum katlardan derhal yüksek yerlere çıkılır, sel suyuna araçla veya yürüyerek girilmez. Heyelan riskinde yamaç altlarından uzaklaşılır. Çığ altında kalma tehlikesinde yüzme hareketiyle yüzeyde kalmaya çalışılır ve ağız önünde hava boşluğu oluşturulur.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'uyusturucu',
    title: 'Uyuşturucu Madde Bilgisi',
    shortTitle: 'Uyuşturucu Bilgisi',
    subtitle: 'Madde sınıfları, bağımlılık belirtileri, TCK hükümleri ve görevli yaklaşımı',
    emoji: '💊',
    color: '#8B5CF6',
    examQuestionCount: 2,
    chapters: [
      {
        id: 'uyusturucu-1',
        chapterNumber: 1,
        title: 'Uyuşturucu ve Uyarıcı Maddelerin Sınıflandırılması',
        summary: 'MSS’yi yavaşlatanlar, uyaranlar ve halüsinojen (hayal gösterici) maddeler.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Merkezi Sinir Sistemine Etkilerine Göre 3 Ana Grup',
            paragraphs: [
              'Uyuşturucu ve uyarıcı maddeler, merkezi sinir sistemi (MSS) üzerinde yarattıkları etkilere göre üç temel grupta sınıflandırılır:',
            ],
            bullets: [
              'Merkezi Sinir Sistemini Yavaşlatanlar (Depresanlar): Afyon, morfin, eroin, kodein, metadon, barbitüratlar, uçucu maddeler (tiner, bali).',
              'Merkezi Sinir Sistemini Uyaranlar (Stimülanlar): Kokain, amfetamin, metamfetamin, ekstazi (MDMA), captagon.',
              'Halüsinojenler (Hayal Göstericiler): Esrar (marihuana / Hint keneviri), LSD, meskalin, sentetik kannabinoidler (bonzai).',
            ],
            examTip:
              'Afyon ve türevleri (morfin, eroin) "yavaşlatıcı", kokain ve ekstazi "uyarıcı", esrar ve LSD "halüsinojen" grubundadır.',
          },
        ],
      },
      {
        id: 'uyusturucu-2',
        chapterNumber: 2,
        title: 'Bağımlılık, Tolerans, Yoksunluk ve Belirtiler',
        summary: 'Fiziksel/psikolojik bağımlılık kavramları ve şüpheli kullanıcı belirtileri.',
        estimatedMinutes: 3,
        sections: [
          {
            heading: 'Temel Kavramlar',
            paragraphs: [
              'Tolerans: Aynı etkiyi elde edebilmek için kullanılan madde miktarının zamanla artırılması gerekliliğidir.',
              'Yoksunluk (Kriz) Sendromu: Bağımlı kişinin maddeyi alamadığında vücudunda ortaya çıkan şiddetli terleme, titreme, kas ağrısı, saldırganlık ve panik gibi fiziksel ve ruhsal tepkilerdir.',
            ],
            bullets: [
              'Fiziksel belirtiler: Göz bebeklerinde aşırı küçülme veya büyüme, gözlerde kızarıklık, konuşmada pelteklik, denge bozukluğu, aşırı terleme.',
              'Davranışsal belirtiler: Ani öfke nöbetleri, paranoya, çevreye ilgisizlik, olağandışı para/eşya arayışı.',
            ],
          },
        ],
      },
      {
        id: 'uyusturucu-3',
        chapterNumber: 3,
        title: 'Yasal Mevzuat ve Özel Güvenlik Görevlisinin Hareket Tarzı',
        summary: 'TCK Md. 188 / Md. 191 ve görev alanında madde tespitinde yapılacaklar.',
        estimatedMinutes: 3,
        sections: [
          {
            heading: 'Görev Alanında Madde Tespit Edildiğinde',
            paragraphs: [
              'Türk Ceza Kanunu’na göre uyuşturucu madde imal ve ticareti (TCK Md. 188) ile kullanmak için bulundurma (TCK Md. 191) ağır yaptırımlara tabi suçlardır.',
            ],
            bullets: [
              'Şüpheli maddeye çıplak elle temas edilmez; eldiven/peçete ile delil bütünlüğü bozulmadan muhafaza altına alınır.',
              'Maddenin cinsini anlamak için KESİNLİKLE tadına bakılmaz ve koklanmaz.',
              'Şüpheli kişi suçüstü halinde yakalanır, olay tespit ve emanete alma tutanağı düzenlenerek derhal genel kolluğa (Narkotik/Polis/Jandarma) teslim edilir.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'silah_bilgisi',
    title: 'Silah Bilgisi ve Atış',
    shortTitle: 'Silah Bilgisi',
    subtitle: '6136 Sayılı Kanun, tabanca parçaları, fişek, emniyet, arızalar ve atış kuralları',
    emoji: '🎯',
    color: '#D97706',
    examQuestionCount: 25,
    isWeaponOnly: true,
    chapters: [
      {
        id: 'silah-1',
        chapterNumber: 1,
        title: '6136 Sayılı Kanun ve Ateşli Silahların Sınıflandırılması',
        summary: 'Silahın hukuki tanımı, ateşli/ateşsiz silahlar ve kısa/uzun namlulu ayrımı.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Silah Kavramı ve Sınıflandırma',
            paragraphs: [
              '6136 sayılı Ateşli Silahlar ve Bıçaklar ile Diğer Aletler Hakkında Kanun, ateşli silahların ve mermilerinin ülkeye sokulması, yapımı, satılması, satın alınması, taşınması ve bulundurulmasına ilişkin esasları düzenler.',
              'Ateşli silahlar; barut gazının basıncı ile mermi çekirdeğini uzak mesafelere atabilen silahlardır. Kısa namlulu (tabancalar: yarı otomatik ve toplu revolver) ve uzun namlulu (tüfekler) olarak ikiye ayrılır.',
            ],
            bullets: [
              'Yarı Otomatik Tabanca: Tetiğe her basışta tek fişek ateşler; boş kovanı otomatik atar ve yeni fişeği fişek yatağına sürer.',
              'Tam Otomatik Silah: Tetik basılı tutulduğu sürece şarjör bitene kadar seri atış yapar (ÖGG’ler kural olarak yarı otomatik tabanca kullanır).',
              'Toplu (Revolver) Tabanca: Fişeklerin döner silindir (top) içinde bulunduğu, boş kovanların atış sonrası elle boşaltıldığı tabancadır.',
            ],
          },
        ],
      },
      {
        id: 'silah-2',
        chapterNumber: 2,
        title: 'Tabancanın Ana Parçaları, Yiv-Set ve Çap',
        summary: 'Çerçeve, sürgü, namlu, şarjör ile yiv, set, çap (kalibre) ve fişek yatağı.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Yarı Otomatik Tabancanın 4 Ana Bölümü',
            paragraphs: [
              'Yarı otomatik tabancalar temel olarak 4 ana parçadan meydana gelir: Çerçeve (Gövde), Sürgü (Kapak Takımı), Namlu ve Şarjör.',
            ],
            bullets: [
              'Çerçeve (Gövde): Tüm parçaları bir arada tutan, kabza, tetik korkuluğu ve mekanizmayı barındıran ana iskelettir.',
              'Sürgü (Kapak Takımı): Namluyu örter; üzerinde gez, arpacık, kovan atma boşluğu, tırnak ve iğne bulunur.',
              'Namlu: Fişeğin ateşlenip çekirdeğin yönlendirildiği çelik borudur. Arka kısmında fişeğin oturduğu yere "Fişek Yatağı" denir.',
              'Şarjör: Fişekleri muhafaza eden ve besleme yayının basıncıyla fişek yatağına sürmeye hazırlayan parçadır.',
            ],
          },
          {
            heading: 'Yiv, Set ve Çap (Kalibre)',
            paragraphs: [
              'Namlu iç yüzeyinde spiral (helezonik) şekilde açılmış girintilere "YİV", iki yiv arasında kalan çıkıntılara "SET" denir.',
              'Yiv ve setin görevi; mermi çekirdeğine kendi ekseni etrafında dönme (rotasyon) hareketi kazandırarak çekirdeğin havada takla atmadan dengeli, uzağa ve hedefe isabetli gitmesini sağlamaktır.',
            ],
            examTip:
              'Karşılıklı iki SET arasındaki mesafe silahın ÇAPINI (kalibresini) verir (ör. 9 mm). Yiv = girinti, Set = çıkıntı!',
          },
        ],
      },
      {
        id: 'silah-3',
        chapterNumber: 3,
        title: 'Fişek Yapısı ve Silah Tertibatları',
        summary: 'Kovan, kapsül, barut, çekirdek ile ateşleme, kovan atma ve boşaltma tertibatı.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Fişeğin 4 Ana Bölümü',
            paragraphs: [
              'Bir tabanca fişeği dört parçadan oluşur:',
            ],
            bullets: [
              'Kovan: Kapsül, barut ve çekirdeği bir arada tutan pirinç/metal muhafaza.',
              'Kapsül: Kovan dibinde bulunur; ateşleme iğnesinin darbesiyle ilk alevi üreterek barutu tutuşturur.',
              'Barut: Kapsül aleviyle yanarak yüksek gaz basıncı oluşturan itici maddedir.',
              'Çekirdek: Gaz basıncıyla namludan çıkıp hedefe giden kısımdır.',
            ],
          },
          {
            heading: 'Kovan Atma Tertibatı: Tırnak ve Çıkarıcı',
            paragraphs: [
              'Atış sonrası sürgü geriye doğru hareket ederken "Tırnak" boş kovanı dip tablasından yakalayıp fişek yatağından geri çeker; kovan gövdedeki "Çıkarıcı"ya çarparak kovan atma boşluğundan dışarı fırlatılır.',
            ],
            examTip:
              'Tırnak kovanı geri çeker, Çıkarıcı ise kovanın kovan atma boşluğundan dışarı atılmasını sağlar.',
          },
        ],
      },
      {
        id: 'silah-4',
        chapterNumber: 4,
        title: 'Emniyet Sistemleri, Sökme-Takma ve Bakım',
        summary: 'Mandal, iğne, kabza, şarjör emniyetleri ve güvenli sökme/temizleme sırası.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Tabanca Emniyet Sistemleri',
            paragraphs: [
              'İstenmeyen kazaları önlemek için tabancalarda mekanik ve otomatik emniyet sistemleri bulunur:',
            ],
            bullets: [
              'Mandal Emniyeti: Sürgü veya gövdede bulunan, elle açılıp kapatılan emniyettir.',
              'İğne Emniyeti: Tetik sonuna kadar çekilmedikçe iğnenin kapsüle vurmasını engelleyen otomatik (düşme) emniyettir.',
              'Kabza Emniyeti: Kabza avuç içi ile tam kavranmadıkça tetiğin düşmesini engeller.',
              'Şarjör Emniyeti: Şarjör takılı değilken (fişek yatağında fişek olsa bile) silahın ateş almasını önler.',
              'Horoz Emniyeti: Horozun yarı kurulu konumda kalarak iğneye temas etmesini önler.',
            ],
          },
          {
            heading: 'Silahı Sökme ve Temizleme Sırası',
            paragraphs: [
              'Silah sökülmeden ve temizlenmeden önce emniyet sırası KESİNLİKLE bozulmadan uygulanır:',
            ],
            bullets: [
              '1) Namlu güvenli bir yöne (ölü noktaya) çevrilir.',
              '2) ÖNCE ŞARJÖR ÇIKARILIR.',
              '3) Sürgü geriye çekilip kilitlenerek fişek yatağı hem gözle hem parmakla kontrol edilir (boş olduğundan emin olunur).',
              '4) Sürgü bırakılır, güvenli yöne tetik düşürülür ve sökme mandalı ile sürgü–namlu–icra yayı ayrılır.',
              'Takma işlemi sökme işleminin TAM TERSİ sırayla yapılır. Temizlikte harbi ve koruyucu silah yağı kullanılır; namlu içi aşırı yağlı bırakılmaz.',
            ],
            examTip:
              'Sınavda en çok çıkan kural: Silah temizlenirken veya boşaltılırken ilk işlem namluyu güvenli yöne tutup ÖNCE ŞARJÖRÜ ÇIKARMAKTIR!',
          },
        ],
      },
      {
        id: 'silah-5',
        chapterNumber: 5,
        title: 'Silah Arızaları (Tutukluk) ve Giderme',
        summary: 'Fişek, şarjör, tırnak ve bakım kaynaklı tutukluk nedenleri.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Başlıca Tutukluk Nedenleri',
            paragraphs: [
              'Atış sırasında silahın çalışmamasına veya döngüyü tamamlayamamasına "tutukluk" denir.',
            ],
            bullets: [
              'Fişek Kaynaklı: Bayat/nemli barut, arızalı kapsül, ezik kovan veya yanlış çapta fişek kullanımı.',
              'Şarjör Kaynaklı: Şarjörün tam oturmaması, şarjör yayının zayıflaması veya dudaklarının eğilmesi.',
              'Silah / Bakım Kaynaklı: Kırık ateşleme iğnesi, kırık tırnak/çıkarıcı, kirli/aşırı yağlı fişek yatağı.',
              'Atıcı Kaynaklı: Kabzanın gevşek kavranması (bilek kırma) nedeniyle sürgünün tam geriye gidememesi.',
            ],
            examTip:
              'Tetik düştüğü halde fişek ateş almazsa (geç ateşleme riskine karşı) namlu hedef doğrultusundan çevrilmeden 10–15 saniye beklenir, ardından sürgü çekilerek arızalı fişek dışarı atılır.',
          },
        ],
      },
      {
        id: 'silah-6',
        chapterNumber: 6,
        title: 'Atış Teknikleri, Atış Hataları ve Poligon Emniyeti',
        summary: 'Nişan hattı, tetik ezme, nefes kontrolü ve 4 altın emniyet kuralı.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Doğru Nişan Alma ve Tetik Kontrolü',
            paragraphs: [
              'İsabetli atışın 5 temel unsuru vardır: Duruş, Kabza Kavrama, Nişan Alma, Nefes Kontrolü ve Tetik Ezme.',
            ],
            bullets: [
              'Nişan Hattı: Göz → Gez boşluğunun tam ortası → Arpacık (üst kenarları aynı hizada) → Hedef. Göz ARPACIĞA odaklanır (gez ve hedef hafif bulanık görülür).',
              'Nefes Kontrolü: Normal bir nefes alınıp yarısı verildikten sonra nefes tutularak (en fazla 6–8 saniye içinde) atış yapılır.',
              'Tetik Ezme: İşaret parmağının birinci boğumu ile tetik ani çekilmeden, düzgün ve kesintisiz olarak geriye doğru ezilir.',
              'Atış Hataları: Tetiği ani çekmek (silkeleme) atışların genellikle SOL AŞAĞI (sağ el kullananlarda) gitmesine; nişan anında arpacığın geze göre yukarıda tutulması ise atışların ÜSTE gitmesine yol açar.',
            ],
          },
          {
            heading: 'Silah Emniyetinin 4 Altın Kuralı',
            paragraphs: [
              'Poligonda ve görevde uyulması zorunlu dört temel emniyet kuralı:',
            ],
            bullets: [
              '1) Her silahı daima DOLU kabul et.',
              '2) Namluyu hiçbir zaman vurmak istemediğin bir yöne çevirme.',
              '3) Hedefin üzerinde nişan alana kadar parmağını tetik korkuluğu dışında (gövde üzerinde) tut.',
              '4) Hedefinden ve hedefinin arkasından emin olmadan asla ateş etme.',
            ],
          },
        ],
      },
    ],
  },
];
