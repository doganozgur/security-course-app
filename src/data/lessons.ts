import { LessonBook } from '../types';

export const LESSON_BOOKS: LessonBook[] = [
  {
    id: 'hukuk',
    title: 'Özel Güvenlik Hukuku ve Kişi Hakları',
    shortTitle: 'Güvenlik Hukuku',
    subtitle: '5188 Sayılı Kanun, yetkiler, çalışma şartları ve ceza hükümleri',
    emoji: '⚖️',
    color: '#3B82F6',
    examQuestionCount: 20,
    chapters: [
      {
        id: 'hukuk-1',
        chapterNumber: 1,
        title: '5188 Sayılı Kanun ve Özel Güvenliğin Amacı',
        summary: 'Özel güvenlik hizmetlerinin hukuki dayanağı, komisyon yapısı ve koruma izni.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Kanunun Amacı ve Kapsamı',
            paragraphs: [
              '5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun, kamu güvenliğini tamamlayıcı mahiyetteki özel güvenlik hizmetlerinin yerine getirilmesine ilişkin esas ve usulleri belirlemek amacıyla çıkarılmıştır.',
              'Özel güvenlik görevlileri, genel kolluğun (polis ve jandarma) yerini almaz; onların görevini tamamlayıcı nitelikte, yalnızca görevli oldukları yer ve süre içinde yetki kullanırlar.',
            ],
            lawNote:
              '5188 Sayılı Kanun Md. 1: Kamu güvenliğini tamamlayıcı mahiyetteki özel güvenlik hizmetlerinin yerine getirilmesine ilişkin esas ve usulleri belirler.',
          },
          {
            heading: 'Özel Güvenlik Komisyonu',
            paragraphs: [
              'Özel güvenlik izni verilmesi, silah sayısı ve niteliğinin belirlenmesi gibi kararlar her ilde kurulan Özel Güvenlik Komisyonu tarafından alınır ve valinin onayı ile yürürlüğe girer.',
            ],
            bullets: [
              'Başkan: Vali yardımcısı',
              'Üyeler: İl Emniyet Müdürlüğü, İl Jandarma Komutanlığı, Ticaret Odası Başkanlığı ve Sanayi Odası Başkanlığı temsilcileri',
              'Kararlar oy çokluğu ile alınır; oyların eşitliği halinde başkanın bulunduğu taraf çoğunluk sayılır.',
              'Çekimser oy kullanılamaz.',
            ],
            examTip:
              'Sınavda en sık sorulan detay: Komisyon başkanının vali değil, "vali yardımcısı" olması ve çekimser oy kullanılamamasıdır.',
          },
        ],
      },
      {
        id: 'hukuk-2',
        chapterNumber: 2,
        title: 'Özel Güvenlik Görevlilerinin Yetkileri',
        summary: 'Madde 7 kapsamındaki arama, kimlik sorma, yakalama ve zor kullanma yetkileri.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Madde 7 Temel Yetkileri',
            paragraphs: [
              'Özel güvenlik görevlilerinin yetkileri 5188 sayılı Kanunun 7. maddesinde sınırlı olarak sayılmıştır. Bu yetkiler yalnızca görev alanında, görev süresince ve kimlik kartı yakada takılı iken kullanılabilir.',
            ],
            bullets: [
              'Koruma ve güvenliğini sağladıkları alanlara girmek isteyenleri duyarlı kapıdan geçirme, üstlerini dedektörle arama ve eşyalarını X-Ray veya benzeri güvenlik sistemlerinden geçirme.',
              'Toplantı, konser, spor müsabakası, sahne gösterileri ile hava meydanı, liman, gar, istasyon ve terminal gibi toplu ulaşım tesislerinde kimlik sorma ve üst/eşya kontrolü yapma.',
              'Ceza Muhakemesi Kanunu (CMK) Md. 90 kapsamında suçüstü halinde yakalama yapma ve yakalanan kişiyi derhal genel kolluğa teslim etme.',
              'Haklarında yakalama emri veya mahkûmiyet kararı bulunan kişileri yakalama ve arama.',
              'Yangın, deprem gibi tabii afet durumlarında ve imdat istenmesi halinde görev alanındaki işyeri ve konutlara girme.',
              'Terk edilmiş ve bulunmuş eşyayı emanete alma.',
            ],
            lawNote:
              'Özel güvenlik görevlileri, genel kolluğun aksine "elle üst araması" yapamaz (suçüstü yakalama veya adli arama kapsamında kolluk gözetimi hariç); aramayı yalnızca dedektör ve X-Ray cihazlarıyla yapar.',
          },
          {
            heading: 'Zor Kullanma ve Meşru Müdafaa',
            paragraphs: [
              'Kişinin vücudu veya hayatı bakımından mevcut bir tehlikeden korunması amacıyla yakalama yapılabilir. Türk Borçlar Kanunu ve Türk Ceza Kanunu (TCK Md. 25) çerçevesinde meşru savunma ve zorunluluk hali şartları oluştuğunda, saldırıyı defedecek ölçüde orantılı zor kullanılabilir.',
            ],
            examTip:
              'Özel güvenlik görevlisinin "ifade alma", "sorgulama", "telefon dinleme" ve "parmak izi alma" yetkisi KESİNLİKLE YOKTUR.',
          },
        ],
      },
      {
        id: 'hukuk-3',
        chapterNumber: 3,
        title: 'Çalışma Şartları, Yasaklar ve Cezalar',
        summary: 'ÖGG olma şartları, kimlik yenileme, grev yasağı ve adli/idari yaptırımlar.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Özel Güvenlik Görevlisi Olma Şartları (Md. 10)',
            paragraphs: [
              'Özel güvenlik görevlisi olarak çalışabilmek için hem genel hem de eğitim/yaş şartlarının eksiksiz taşınması gerekir.',
            ],
            bullets: [
              'Türkiye Cumhuriyeti vatandaşı olmak.',
              'Silahsız görev için en az 8 yıllık ilköğretim/ortaokul mezunu ve 18 yaşını doldurmuş olmak.',
              'Silahlı görev için en az lise veya dengi okul mezunu ve 21 yaşını doldurmuş olmak.',
              'Kasten işlenen bir suçtan dolayı 1 yıl veya daha fazla süreyle hapis cezasına mahkûm olmamak.',
              'Görevin yapılmasına engel olabilecek vücut ve akıl hastalığı ile engelli bulunmamak.',
              'Özel güvenlik temel eğitimini başarıyla tamamlamak ve güvenlik soruşturmasının olumlu olması.',
            ],
          },
          {
            heading: 'Çalışma İzni ve Yasaklar',
            paragraphs: [
              'Özel güvenlik kimlik kartları 5 yıl süreyle geçerlidir. Süre dolmadan yenileme eğitimi alınarak kimlik yenilenmelidir.',
              'Özel güvenlik görevlileri greve katılamaz, lokavt dolayısıyla işten uzaklaştırılamaz ve koruma alanı dışında üniformalı olarak görev yapamazlar.',
            ],
            examTip:
              'Silahlı görevde yaş sınırı 21 ve eğitim şartı LİSE; silahsız görevde yaş sınırı 18 ve eğitim şartı ORTAOKULDUR.',
          },
        ],
      },
    ],
  },
  {
    id: 'guvenlik_tedbirleri',
    title: 'Güvenlik Tedbirleri',
    shortTitle: 'Güvenlik Tedbirleri',
    subtitle: 'Devriye, nokta koruma, kontrol noktaları, tutanaklar ve olay yeri koruma',
    emoji: '🛡️',
    color: '#10B981',
    examQuestionCount: 20,
    chapters: [
      {
        id: 'tedbir-1',
        chapterNumber: 1,
        title: 'Devriye Hizmetleri ve Yöntemleri',
        summary: 'Devriyenin amacı, görevleri ve olağan/dairesel/planlı devriye yöntemleri.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Devriye Nedir?',
            paragraphs: [
              'Devriye; belirli bir sorumluluk bölgesinde suç işlenmesini önlemek, güvenliği sağlamak, tehlikeleri önceden tespit etmek ve acil durumlara ilk müdahaleyi yapmak amacıyla yaya veya araçla yapılan planlı veya plansız dolaşma faaliyetidir.',
            ],
            bullets: [
              'Olağan (Rutin) Devriye: Belirli bir plan ve programa bağlı kalmaksızın, görev bölgesinin rastgele gezilmesidir.',
              'Dairesel Devriye: Bölgenin merkezden dışa veya dıştan merkeze doğru dairesel hareketle kontrol edilmesidir.',
              'Geri Dönüşlü Devriye: Kritik bölgelerde gidilen güzergâhtan tekrar geri dönülerek kontrol yapılmasıdır.',
              'Planlı Devriye: Yetkili amirler tarafından önceden belirlenmiş güzergâh ve saatlere göre yapılan devriyedir.',
            ],
            examTip:
              'Devriye en az 2 personelden oluşur. Tek başına devriye mecbur kalmadıkça yapılmaz; devriye görevlileri aynı rutin saatleri tekrar etmemelidir.',
          },
        ],
      },
      {
        id: 'tedbir-2',
        chapterNumber: 2,
        title: 'Nokta Koruma ve Kontrol Noktaları',
        summary: 'Sabit nokta kuralları, ziyaretçi kabulü, araç ve personel giriş kontrolleri.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Kontrol Noktasının Görevleri',
            paragraphs: [
              'Kontrol noktaları, tesis veya kurumun giriş-çıkışlarında yetkisiz kişi, araç ve yasaklı maddelerin içeri girmesini engellemek amacıyla oluşturulan ilk savunma hattıdır.',
            ],
            bullets: [
              'Ziyaretçilerin kimlik doğrulaması yapılır, ziyaretçi kartı verilir ve kayıt defterine işlenir.',
              'Araç girişlerinde bagaj, torpido ve araç altı kontrol aynası ile inceleme yapılır.',
              'Görevli personel nöbet yerini izinsiz ve devir-teslim yapmadan kesinlikle terk edemez.',
            ],
          },
          {
            heading: 'Tutanak ve Rapor Yazımı',
            paragraphs: [
              'Tutanak; bir olayın, durumun veya işlemin tespit edilerek belgelendirilmesi amacıyla olay yerinde veya hemen sonrasında düzenlenen resmi yazılı belgedir.',
            ],
            bullets: [
              'Başlık (Tutanak türü büyük harflerle ortaya yazılır)',
              'Giriş (Tarih, saat, yer ve olaya karışanların bilgileri)',
              'Gelişme (Olayın objektif, yoruma yer vermeden kronolojik anlatımı)',
              'Sonuç ve İmza (Tutanağın okunup doğruluğunun onaylanması, tarih ve imzalar)',
            ],
            examTip:
              'Tutanakta kişisel yorum ve tahmine yer verilmez; yalnızca görülen, duyulan ve tespit edilen somut gerçekler yazılır.',
          },
        ],
      },
      {
        id: 'tedbir-3',
        chapterNumber: 3,
        title: 'Olay Yeri Koruma ve Deliller',
        summary: 'Olay yerinin muhafazası, ilk ekip görevleri ve delil türleri.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Olay Yerinin Korunması',
            paragraphs: [
              'Suçun işlendiği, delillerin bulunduğu alan "olay yeri" olarak adlandırılır. Özel güvenlik görevlisi genel kolluk gelene kadar olay yerini şerit çekerek koruma altına alır.',
            ],
            bullets: [
              'Olay yerine ilgisiz kişilerin (basın, meraklı vatandaş, yetkisiz personel) girişi engellenir.',
              'Delillere kesinlikle dokunulmaz, yerleri değiştirilmez; hava şartlarına karşı korunur.',
              'Yaralı varsa önce can kurtarılır, sağlık ekibinin giriş-çıkış yolu kayıt altına alınır.',
              'Olay yerinde sigara içilmez, bir şey yenilip içilmez, telefon veya eşyalar kullanılmaz.',
            ],
            lawNote:
              'Deliller; Biyolojik (kan, kıl, tükürük), Kimyasal (barut artığı, boya, ilaç), Fiziksel (silah, kovan, cam kırığı) ve İz Delilleri (parmak izi, ayakkabı izi) olarak 4 ana gruba ayrılır.',
          },
        ],
      },
    ],
  },
  {
    id: 'iletisim',
    title: 'Etkili İletişim',
    shortTitle: 'Etkili İletişim',
    subtitle: 'İletişim öğeleri, beden dili, empati, aktif dinleme ve iletişim engelleri',
    emoji: '🗣️',
    color: '#06B6D4',
    examQuestionCount: 12,
    chapters: [
      {
        id: 'iletisim-1',
        chapterNumber: 1,
        title: 'İletişim Süreci ve Temel Öğeleri',
        summary: 'Kaynak, mesaj, kanal, alıcı ve geri bildirim (dönüt) kavramları.',
        estimatedMinutes: 3,
        sections: [
          {
            heading: 'İletişimin 5 Temel Öğesi',
            paragraphs: [
              'İletişim; duygu, düşünce ve bilgilerin akla gelebilecek her türlü yolla başkalarına aktarılmasıdır. Sağlıklı bir iletişim tek yönlü değil, çift yönlü bir süreçtir.',
            ],
            bullets: [
              'Kaynak (Gönderici): İletişimi başlatan kişi veya kurumdur.',
              'Mesaj (İleti): Aktarılmak istenen duygu, düşünce veya bilgidir.',
              'Kanal: Mesajın iletildiği araçtır (ses, yazı, telefon, beden dili).',
              'Alıcı: Mesajı alan ve yorumlayan kişi veya gruptur.',
              'Geri Bildirim (Dönüt): Alıcının mesaja verdiği tepkidir. İletişimin tamamlandığını gösterir.',
            ],
            examTip:
              'Geri bildirim (dönüt) olmazsa iletişim tek yönlü kalır ve mesajın doğru anlaşılıp anlaşılmadığı bilinemez.',
          },
        ],
      },
      {
        id: 'iletisim-2',
        chapterNumber: 2,
        title: 'Beden Dili ve Mesafe Alanları',
        summary: 'Sözsüz iletişim, göz teması ve kişisel/sosyal mesafe sınırları.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'İletişimde Etki Oranları',
            paragraphs: [
              'Araştırmalara göre yüz yüze iletişimde mesajın karşı tarafa geçmesinde en büyük payı beden dili (%55–60), ardından ses tonu (%30–35) ve en az payı kelimeler (%7–10) alır.',
            ],
            bullets: [
              'Mahrem Alan (0 – 35 cm): Sadece çok yakın aile bireylerine açık alan.',
              'Kişisel Alan (40 – 80 cm): Arkadaşlar ve tanıdıklarla kurulan mesafe.',
              'Sosyal Alan (80 cm – 2 m): İş ve resmi görev ilişkilerinde (ÖGG ile vatandaş arası) ideal mesafe.',
              'Genel / Toplumsal Alan (2 m ve üzeri): Yabancılar ve kalabalık topluluklar.',
            ],
            examTip:
              'Güvenlik görevlisi vatandaşla konuşurken "Sosyal Alan" mesafesini korumalı, kollarını göğsünde bağlamamalı ve dengeli göz teması kurmalıdır.',
          },
        ],
      },
      {
        id: 'iletisim-3',
        chapterNumber: 3,
        title: 'Empati, Sempati ve Sen/Ben Dili',
        summary: 'Öfke kontrolü, aktif dinleme ve çatışma çözme teknikleri.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Empati ile Sempati Farkı',
            paragraphs: [
              'Empati; kişinin kendisini karşısındakinin yerine koyarak olaylara onun bakış açısıyla bakması, duygularını doğru anlaması ve bunu ona iletmesidir. Sempati ise karşı tarafın duygusuna kapılıp onunla aynı duyguyu paylaşarak taraf tutmaktır.',
              'Özel güvenlik görevlisi profesyonel olarak empati kurmalı, ancak sempati kurup görev tarafsızlığını kaybetmemelidir.',
            ],
            bullets: [
              'Sen Dili (Yargılayıcı): "Sürekli kuralları ihlal ediyorsunuz!" → Savunma ve öfke doğurur.',
              'Ben Dili (Yapıcı): "Kimlik kontrolü yapılmadan geçiş sağlandığında güvenlik riski oluşmasından endişe ediyorum." → İş birliği sağlar.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'kalabalik',
    title: 'Kalabalık Yönetimi',
    shortTitle: 'Kalabalık Yönetimi',
    subtitle: 'Kalabalık türleri, grup psikolojisi, panik, cop kullanımı ve müdahale düzenleri',
    emoji: '👥',
    color: '#F59E0B',
    examQuestionCount: 10,
    chapters: [
      {
        id: 'kalabalik-1',
        chapterNumber: 1,
        title: 'Kalabalık ve Grup Türleri',
        summary: 'Sıradan, organize, pasif ve saldırgan kalabalıkların özellikleri.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Kalabalık Çeşitleri',
            paragraphs: [
              'Aynı zaman ve mekânda bir araya gelmiş, ortak bir odak noktası olan ancak aralarında sürekli örgütlü bir yapı bulunmayan insan topluluğuna "kalabalık" denir.',
            ],
            bullets: [
              'Sıradan (Tesadüfi) Kalabalık: AVM, cadde veya durakta birbirinden bağımsız bulunan kişiler.',
              'Organize (Planlı) Kalabalık: Konser, miting veya spor müsabakası için önceden planlanarak toplananlar.',
              'Saldırgan Kalabalık: Yıkıcı eylemlere yönelen, liderin yönlendirmesiyle kontrolden çıkabilen topluluklar.',
              'Panik Halindeki Kalabalık: Yangın, deprem veya patlama gibi tehlike anında mantıklı düşünme yetisini kaybedip kaçışan kalabalık.',
            ],
          },
        ],
      },
      {
        id: 'kalabalik-2',
        chapterNumber: 2,
        title: 'Toplumsal Olaylara Müdahale Düzenleri',
        summary: 'Hat, kama ve çember düzenleri ile gaz/cop kullanım esasları.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Temel Müdahale Düzenleri',
            paragraphs: [
              'Toplumsal olaylarda düzeni sağlamak için güvenlik personeli belirli taktik dizilişler uygular.',
            ],
            bullets: [
              'Hat Düzeni: Kalabalığı durdurmak, geriye itmek ve belirli bir hattı (bina önü, kapı vb.) korumak için yan yana diziliş.',
              'Kama Düzeni: Kalabalığı yarmak, ikiye bölmek veya kalabalık içindeki bir kişiyi/lideri almak için üçgen şeklinde diziliş.',
              'Çember Düzeni: Korunacak bir kişi, araç veya kritik noktayı 360 derece çevreleyerek koruma düzeni.',
            ],
            examTip:
              'Kalabalığı bölmek ve yarmak için "Kama Düzeni", durdurmak ve set oluşturmak için "Hat Düzeni" kullanılır.',
          },
          {
            heading: 'Cop Kullanım Kuralları',
            paragraphs: [
              'Cop, yalnızca yasal zor kullanma şartları oluştuğunda ve kademeli olarak kullanılır. Hayati tehlike oluşturacak baş, boyun, omurga ve kasık bölgelerine kesinlikle vurulmaz; kol ve bacaklardaki büyük kas grupları hedef alınır.',
            ],
          },
        ],
      },
      {
        id: 'kalabalik-3',
        chapterNumber: 3,
        title: 'Panik Yönetimi ve Tahliye',
        summary: 'Panik anında güvenli yönlendirme ve izdihamı önleme ilkeleri.',
        estimatedMinutes: 3,
        sections: [
          {
            heading: 'Paniği Önleme İlkeleri',
            paragraphs: [
              'Panik bulaşıcıdır. Güvenlik görevlisi öncelikle kendi sakinliğini korumalı, net ve yüksek sesle (megafon/anons ile) kısa talimatlar vererek kalabalığı acil çıkışlara yönlendirmelidir.',
            ],
            bullets: [
              'Acil çıkış kapıları her zaman dışa doğru açılmalı ve kilitli olmamalıdır.',
              'Kalabalığın çıkışlarda yığılmasını önlemek için alternatif çıkışlar paralel olarak açılmalıdır.',
              'Asansörler acil tahliyede kesinlikle kullanılmamalıdır.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ilk_yardim',
    title: 'Temel İlk Yardım',
    shortTitle: 'Temel İlk Yardım',
    subtitle: 'KBK, ABC, temel yaşam desteği, kanamalar, kırıklar ve şok müdahalesi',
    emoji: '🩹',
    color: '#EC4899',
    examQuestionCount: 10,
    chapters: [
      {
        id: 'ilkyardim-1',
        chapterNumber: 1,
        title: 'İlk Yardımın Temel Uygulamaları (KBK)',
        summary: 'Koruma, Bildirme, Kurtarma ilkeleri ve yaşam bulgularının değerlendirilmesi.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'İlk Yardım ile Acil Tedavi Farkı',
            paragraphs: [
              'İlk yardım; olay yerinde, tıbbi araç gereç aranmaksızın mevcut imkânlarla, ilaçsız olarak yapılan hayat kurtarıcı müdahaledir. Acil tedavi ise sağlık personeli tarafından tıbbi donanım ve ilaçla yapılan müdahaledir.',
            ],
            bullets: [
              'Koruma: Olay yerinde olası tehlikeleri belirleyerek güvenli bir çevre oluşturmak.',
              'Bildirme: 112 Acil Çağrı Merkezine hızlı, net ve doğru bilgi vermek.',
              'Kurtarma: Yaralılara hızlı ancak sakin ve bilinçli şekilde ilk yardım uygulamak.',
            ],
            examTip:
              'İlk yardımın öncelikli amaçları: Hayati tehlikeyi ortadan kaldırmak, yaşamsal fonksiyonların sürdürülmesini sağlamak ve durumun kötüleşmesini önlemektir.',
          },
        ],
      },
      {
        id: 'ilkyardim-2',
        chapterNumber: 2,
        title: 'Temel Yaşam Desteği (TYD) ve ABC',
        summary: 'Kalp masajı oranları, solunum kontrolü ve Heimlich manevrası.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'İlk Yardımın ABC’si',
            paragraphs: [
              'Bilinç kontrolü yapıldıktan sonra yaralının hayati fonksiyonları ABC sırasıyla değerlendirilir.',
            ],
            bullets: [
              'A (Airway): Hava yolu açıklığının değerlendirilmesi (Baş geri – çene yukarı pozisyonu).',
              'B (Breathing): Solunumun değerlendirilmesi (Bak – Dinle – Hisset yöntemiyle 10 saniye).',
              'C (Circulation): Dolaşımın değerlendirilmesi ve gerekirse kalp masajı.',
            ],
          },
          {
            heading: 'Kalp Masajı ve Suni Solunum Oranı',
            paragraphs: [
              'Yetişkin, çocuk ve bebeklerde temel yaşam desteği oranı 30 kalp masajı / 2 suni solunumdur. Dakikada 100–120 bası hızıyla uygulanır.',
              'Tam tıkanıklık yaşayan (konuşamayan, öksüremeyen, moraran) bilinçli kişiye karına bası uygulaması yani Heimlich Manevrası yapılır.',
            ],
            examTip:
              'Bak-Dinle-Hisset süresi 10 saniyedir. Yetişkinlerde göğüs kemiği 5 cm (göğüs yüksekliğinin 1/3’ü) çökecek şekilde bası uygulanır.',
          },
        ],
      },
      {
        id: 'ilkyardim-3',
        chapterNumber: 3,
        title: 'Kanamalar, Şok ve Kırık-Çıkıklar',
        summary: 'Atardamar/toplardamar kanamaları, şok pozisyonu ve turnike şartları.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Kanama Türleri ve Müdahale',
            paragraphs: [
              'Atardamar kanaması açık kırmızı renkte ve kalp atımıyla uyumlu fışkırır tarzda akar; en tehlikeli kanama türüdür. Toplardamar kanaması koyu kırmızı ve sızıntı şeklinde akar.',
            ],
            bullets: [
              'Kanayan yer üzerine temiz bezle doğrudan baskı yapılır.',
              'Kanama durmazsa ikinci bir bez konur (ilk bez kaldırılmaz), bandajla sarılır ve kalp seviyesinden yukarı kaldırılır.',
              'Turnike (boğucu sargı) yalnızca uzuv kopması veya baskıyla durdurulamayan çoklu yaralı durumlarında son çare olarak uygulanır.',
            ],
          },
          {
            heading: 'Şok Pozisyonu ve Koma Pozisyonu',
            paragraphs: [
              'Şok belirtileri (soğuk terleme, solukluk, hızlı nabız) görülen hasta sırtüstü yatırılır, ayakları 30 cm yukarı kaldırılır ve üzeri örtülerek vücut ısısı korunur.',
              'Bilinci kapalı ancak solunumu ve nabzı normal olan kişiye "Koma Pozisyonu" (yarı yüzükoyun yan yatış) verilir.',
            ],
            examTip:
              'Şok pozisyonunda ayaklar 30 cm kaldırılır. Kırık ve çıkıklar ilk yardımcı tarafından kesinlikle yerine oturtulmaya çalışılmaz, bulunduğu pozisyonda tespit edilir.',
          },
        ],
      },
    ],
  },
  {
    id: 'kisi_koruma',
    title: 'Kişi Koruma (VIP)',
    shortTitle: 'Kişi Koruma',
    subtitle: 'Öncü istihbarat, yaya ve araç koruma düzenleri, suikastlara karşı tedbirler',
    emoji: '🕴️',
    color: '#6366F1',
    examQuestionCount: 9,
    chapters: [
      {
        id: 'koruma-1',
        chapterNumber: 1,
        title: 'Kişi Korumanın Temel İlkeleri',
        summary: 'Koruma halkaları, öncü istihbarat çalışması ve boğma noktaları.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: '3’lü Koruma Çemberi',
            paragraphs: [
              'Önemli kişinin (VIP) can güvenliğini sağlamak amacıyla dıştan içe doğru üç kademeli güvenlik çemberi oluşturulur.',
            ],
            bullets: [
              'Dış Halka: Uzak çevre güvenliği, çatı gözlemcileri ve trafik/yol kontrol noktaları.',
              'Orta Halka: Kontrollü geçiş alanı, dedektör ve kimlik kontrolünün yapıldığı bölge.',
              'İç Halka: VIP’e en yakın olan yakın koruma ekibinin bulunduğu alan.',
            ],
            examTip:
              'VIP’in mutlaka geçmek zorunda olduğu, saldırı riskinin en yüksek olduğu dar geçiş, köprü, kapı, kavşak gibi yerlere "Boğma Noktası" denir.',
          },
        ],
      },
      {
        id: 'koruma-2',
        chapterNumber: 2,
        title: 'Yaya ve Araç Koruma Düzenleri',
        summary: 'Tekli, ikili, dörtlü ve elmas düzeni ile konvoy kuralları.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Yaya Koruma Düzenleri',
            paragraphs: [
              'Yaya koruma düzeni, ekibin sayısına ve tehdit düzeyine göre belirlenir. Amaç 360 derece görüş ve anında siper sağlamaktır.',
            ],
            bullets: [
              'Tekli Koruma: Koruma görevlisi VIP’in sağ gerisinde yürür (sağ elini kullanıyorsa).',
              'Baklava (Elmas) Düzeni: 4 veya 5 kişilik ekiplerde kalabalık alanlarda en etkili 360° koruma düzenidir.',
              'Saldırı Anında Kural: "Kapat – Koru – Uzaklaştır (Kaçır)" prensibi uygulanır. Öncelik saldırganı yakalamak değil, VIP’i güvenli bölgeye çıkarmaktır.',
            ],
          },
          {
            heading: 'Araç Koruma ve Makam Aracı',
            paragraphs: [
              'VIP makam aracında sağ arka koltukta oturur. Koruma amiri ön sağ koltukta bulunur. Araç güzergâhı rutin olmamalı, alternatif rotalar önceden belirlenmelidir.',
            ],
          },
        ],
      },
      {
        id: 'koruma-3',
        chapterNumber: 3,
        title: 'Suikast Aşamaları ve Öncü Çalışma',
        summary: 'Suikastçının planlama süreci ve öncü ekibin keşif görevleri.',
        estimatedMinutes: 3,
        sections: [
          {
            heading: 'Suikastın Aşamaları',
            paragraphs: [
              'Suikast eylemleri genellikle şu sırayı izler: Hedef seçimi → İstihbarat toplama → Planlama → Saldırı → Kaçış.',
              'Yakın korumanın en etkili savunması, saldırı aşamasına gelmeden önce "öncü istihbarat çalışması" ile riskleri ortadan kaldırmaktır.',
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
    subtitle: 'X-Ray cihazı renk kodları, metal dedektörler, CCTV ve kartlı geçiş sistemleri',
    emoji: '📡',
    color: '#14B8A6',
    examQuestionCount: 9,
    chapters: [
      {
        id: 'cihaz-1',
        chapterNumber: 1,
        title: 'X-Ray Cihazları ve Renk Kodları',
        summary: 'Organik, inorganik ve karışık maddelerin ekrandaki renk anlamları.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'X-Ray Ekran Renkleri',
            paragraphs: [
              'X-Ray cihazları, X ışınları kullanarak bagaj ve paketlerin içindeki maddeleri atom numaralarına ve yoğunluklarına göre renklendirerek monitöre yansıtır.',
            ],
            bullets: [
              'Turuncu (Kahverengi tonları): Organik maddeler — patlayıcılar, uyuşturucu, plastik, gıda, kâğıt, su.',
              'Mavi (Koyu mavi): İnorganik maddeler — demir, çelik, bakır, silah, bıçak, metal aksam.',
              'Yeşil: Karışık (inorganik + organik) maddeler — elektronik cihazlar, alüminyum, cam, tuz.',
              'Siyah (Opak): X ışınının geçemediği çok yoğun metaller (kurşun, kalın çelik).',
            ],
            examTip:
              'Sınavın favori sorusu: Organik maddeler (patlayıcılar) TURUNCU, metaller (silah) MAVİ, karışık/elektronik maddeler YEŞİL renkte görünür!',
          },
        ],
      },
      {
        id: 'cihaz-2',
        chapterNumber: 2,
        title: 'Kapı ve El Tipi Metal Dedektörleri',
        summary: 'Manyetik alan prensibi, arama mesafesi ve kalp pili uyarısı.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Kullanım Esasları',
            paragraphs: [
              'Metal dedektörler elektromanyetik alan oluşturarak metal cisimleri tespit eder. Radyasyon (X-ışını) yaymazlar, ancak elektromanyetik alan nedeniyle kalp pili taşıyan kişiler ve hamileler kapı dedektöründen geçirilmez.',
            ],
            bullets: [
              'Kapı dedektöründen geçen kişiler arasında en az 1 metre mesafe bırakılmalıdır.',
              'El tipi metal dedektörü vücuda temas ettirilmeden 2,5 – 7,5 cm mesafeden gezdirilmelidir.',
              'Cihazın hassasiyet ayarı görev alanının risk seviyesine göre kalibre edilir.',
            ],
          },
        ],
      },
      {
        id: 'cihaz-3',
        chapterNumber: 3,
        title: 'CCTV ve Geçiş Kontrol Sistemleri',
        summary: 'Kamera sistemleri, biyometrik okuyucular ve çevre güvenlik sensörleri.',
        estimatedMinutes: 3,
        sections: [
          {
            heading: 'Kapalı Devre Televizyon (CCTV) ve Biyometri',
            paragraphs: [
              'CCTV sistemleri tesisin kritik noktalarını 7/24 izlemek, caydırıcılık sağlamak ve olay sonrası delil oluşturmak için kullanılır.',
              'Biyometrik geçiş sistemleri ise parmak izi, iris (göz bebeği), avuç içi veya yüz tanıma gibi kişiye özgü fiziksel özellikleri doğrulayarak yetkisiz girişleri engeller.',
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
    subtitle: 'Yanma üçgeni, yangın sınıfları, söndürücüler ve deprem/afet davranışı',
    emoji: '🔥',
    color: '#EF4444',
    examQuestionCount: 8,
    chapters: [
      {
        id: 'yangin-1',
        chapterNumber: 1,
        title: 'Yanma Üçgeni ve Yangın Sınıfları',
        summary: 'Yanma şartları ile A, B, C, D, F yangın sınıfları.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Yanmanın 3 Temel Şartı (Yangın Üçgeni)',
            paragraphs: [
              'Yanma olayının gerçekleşebilmesi için Yanıcı Madde, Oksijen (en az %16) ve Isı (tutuşma sıcaklığı) aynı anda bulunmalıdır. Bu üç unsurdan herhangi biri ortadan kaldırıldığında yangın söner.',
            ],
            bullets: [
              'A Sınıfı: Katı madde yangınları (odun, kâğıt, kumaş, plastik) → En etkili söndürücü SU veya Kuru Kimyevi Toz (KKT).',
              'B Sınıfı: Sıvı madde yangınları (benzin, tiner, boya, akaryakıt) → Köpük, KKT, CO₂ (Su kullanılmaz!).',
              'C Sınıfı: Gaz madde yangınları (doğalgaz, LPG, bütan) → Önce gaz kaynağı kesilir, KKT veya CO₂ kullanılır.',
              'D Sınıfı: Metal yangınları (magnezyum, sodyum, alüminyum) → Özel D sınıfı kuru toz (Su kesinlikle kullanılmaz!).',
              'F Sınıfı: Bitkisel ve hayvansal pişirme yağları yangınları → Özel kimyasal söndürücüler.',
            ],
            examTip:
              'Elektrik kaynaklı yangınlarda önce akım kesilir ve mutlaka CO₂ veya KKT kullanılır; su ve köpük iletken olduğu için kesinlikle kullanılmaz.',
          },
        ],
      },
      {
        id: 'yangin-2',
        chapterNumber: 2,
        title: 'Yangın Söndürme Yöntemleri ve Tüp Kullanımı',
        summary: 'Soğutma, boğma, yakıtı giderme ve rüzgârı arkaya alma kuralı.',
        estimatedMinutes: 3,
        sections: [
          {
            heading: 'Söndürme Yöntemleri',
            paragraphs: [
              'Yangın söndürme üç temel fiziksel prensibe dayanır: Soğutma (ısıyı alma), Boğma (oksijeni kesme) ve Yanıcı Maddeyi Ortadan Kaldırma.',
            ],
            bullets: [
              'Söndürme tüpü kullanılırken rüzgâr mutlaka arkaya alınır.',
              'Pim çekilir, hortum alevin üstüne değil, alevin DOĞDUĞU YERE (tabanına) tutulur ve süpürme hareketi yapılır.',
              'Kapalı alanda yangın çıkarsa duman yoğunluğu tavanda birikir; zemin seviyesinde emekleyerek tahliye olunur.',
            ],
          },
        ],
      },
      {
        id: 'yangin-3',
        chapterNumber: 3,
        title: 'Deprem ve Tabii Afetlerde Doğru Davranış',
        summary: 'Çök-Kapan-Tutun kuralı, toplanma alanları ve acil durum ekipleri.',
        estimatedMinutes: 3,
        sections: [
          {
            heading: 'Deprem Anında ve Sonrasında',
            paragraphs: [
              'Deprem sarsıntısı başladığında merdivenlere, balkona veya asansöre koşulmaz. Sağlam bir eşyanın yanında "Çök – Kapan – Tutun" pozisyonu alınarak hayat üçgeni oluşturulur.',
              'Sarsıntı durduktan sonra elektrik, su ve doğalgaz vanaları kapatılarak önceden belirlenmiş güvenli toplanma alanına geçilir.',
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
    subtitle: 'Madde türleri, bağımlılık belirtileri ve görevlinin yasal sorumluluğu',
    emoji: '💊',
    color: '#8B5CF6',
    examQuestionCount: 2,
    chapters: [
      {
        id: 'uyusturucu-1',
        chapterNumber: 1,
        title: 'Uyuşturucu Maddelerin Sınıflandırılması',
        summary: 'Merkezi sinir sistemini yavaşlatanlar, uyaranlar ve halüsinojenler.',
        estimatedMinutes: 3,
        sections: [
          {
            heading: 'Temel Madde Grupları',
            paragraphs: [
              'Uyuşturucu ve uyarıcı maddeler, merkezi sinir sistemi üzerindeki etkilerine göre üç ana gruba ayrılır.',
            ],
            bullets: [
              'Merkezi Sinir Sistemini Yavaşlatanlar: Afyon, morfin, eroin, kodein, barbitüratlar.',
              'Merkezi Sinir Sistemini Uyaranlar: Kokain, amfetamin, ekstazi, captagon.',
              'Halüsinojenler (Hayal Göstericiler): Esrar (marihuana), LSD, sentetik kannabinoidler.',
            ],
          },
        ],
      },
      {
        id: 'uyusturucu-2',
        chapterNumber: 2,
        title: 'Bağımlılık ve Özel Güvenliğin Görevi',
        summary: 'Tolerans, yoksunluk sendromu ve yakalama/teslim prosedürü.',
        estimatedMinutes: 3,
        sections: [
          {
            heading: 'Tolerans ve Yoksunluk',
            paragraphs: [
              'Tolerans, aynı etkiyi alabilmek için kullanılan madde dozunun giderek artırılması gerekliliğidir. Yoksunluk ise madde alınmadığında vücutta ortaya çıkan fiziksel ve ruhsal kriz belirtileridir.',
              'Görev alanında uyuşturucu madde tespit eden özel güvenlik görevlisi, maddeye çıplak elle temas etmeden muhafaza altına alır ve derhal genel kolluğa (polis/jandarma) bilgi vererek tutanakla teslim eder.',
            ],
            examTip:
              'Özel güvenlik görevlisi uyuşturucu maddenin türünü belirlemek için tatma veya koklama gibi işlemler kesinlikle yapmaz.',
          },
        ],
      },
    ],
  },
  {
    id: 'silah_bilgisi',
    title: 'Silah Bilgisi ve Atış',
    shortTitle: 'Silah Bilgisi',
    subtitle: 'Tabanca parçaları, emniyet sistemleri, fişek yapısı ve atış kuralları',
    emoji: '🎯',
    color: '#D97706',
    examQuestionCount: 25,
    isWeaponOnly: true,
    chapters: [
      {
        id: 'silah-1',
        chapterNumber: 1,
        title: 'Ateşli Silahların Tanımı ve Ana Parçaları',
        summary: 'Çerçeve, sürgü, namlu, şarjör ve yiv-set kavramları.',
        estimatedMinutes: 5,
        sections: [
          {
            heading: 'Tabancanın Ana Bölümleri',
            paragraphs: [
              'Yarı otomatik tabancalar temel olarak 4 ana parçadan oluşur: Çerçeve (gövde), sürgü (kapak takımı), namlu ve şarjör.',
            ],
            bullets: [
              'Namlu: Fişeğin ateşlenip çekirdeğin yönlendirildiği çelik borudur. İçindeki girintilere "yiv", çıkıntılara "set" denir.',
              'Yiv ve Setin Görevi: Çekirdeğin kendi ekseni etrafında dönerek (rotasyon) dengeli, uzağa ve hedefe isabetli gitmesini sağlar.',
              'Çap (Kalibre): Namlu içinde karşılıklı iki set arasındaki mesafedir.',
              'Fişek Yatağı: Namlunun arka kısmında fişeğin ateşlenmek üzere oturduğu bölümdür.',
            ],
            examTip:
              'Yiv = girinti, Set = çıkıntı. Karşılıklı iki SET arasındaki mesafe silahın ÇAPINI (kalibresini) verir!',
          },
        ],
      },
      {
        id: 'silah-2',
        chapterNumber: 2,
        title: 'Fişek Yapısı ve Emniyet Sistemleri',
        summary: 'Kovan, kapsül, barut, çekirdek ile mandal, kabza ve iğne emniyeti.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Fişeğin 4 Ana Bölümü',
            paragraphs: [
              'Bir tabanca fişeği dört parçadan meydana gelir: Kovan (tüm parçaları bir arada tutar), Kapsül (iğne darbesiyle ilk alevi oluşturur), Barut (yanarak gaz basıncı üretir) ve Çekirdek (hedefe giden mermi kısmı).',
            ],
          },
          {
            heading: 'Silah Emniyet Sistemleri',
            paragraphs: [
              'Kazaları önlemek için modern tabancalarda birden fazla emniyet sistemi bulunur.',
            ],
            bullets: [
              'Mandal Emniyeti: Sürgü veya gövdede elle açılıp kapatılan mekanik emniyet.',
              'İğne Emniyeti: Tetik tam çekilmedikçe iğnenin kapsüle ulaşmasını engelleyen otomatik emniyet.',
              'Kabza Emniyeti: Kabza tam kavranmadıkça tetiğin düşmesini önler.',
              'Şarjör Emniyeti: Şarjör takılı değilken (fişek yatağında fişek olsa bile) ateşlemeyi engeller.',
            ],
          },
        ],
      },
      {
        id: 'silah-3',
        chapterNumber: 3,
        title: 'Atış Teknikleri ve Poligon Emniyet Kuralları',
        summary: 'Nişan alma, arpacık-gez hizalaması, tetik ezme ve güvenli taşıma.',
        estimatedMinutes: 4,
        sections: [
          {
            heading: 'Temel Atış Prensipleri',
            paragraphs: [
              'İsabetli bir atış için duruş, kabza kavrama, nefes kontrolü, nişan alma ve tetik kontrolü (tetik ezme) uyum içinde olmalıdır.',
            ],
            bullets: [
              'Doğru Nişan: Gez boşluğunun tam ortasında arpacık üst kenarı gez üst kenarıyla aynı hizada olmalı, göz ARPACIĞA odaklanmalıdır (hedef hafif bulanık görünür).',
              'Tetik Kontrolü: İşaret parmağının birinci boğumu ile tetik ani çekilmeden, geriye doğru kesintisiz ve yumuşak şekilde ezilir.',
              'Emniyet Altın Kuralı: Her silah daima dolu kabul edilir; namlu hiçbir zaman vurulmak istenmeyen bir yöne çevrilmez; atış anı dışında parmak tetik korkuluğu dışında tutulur.',
            ],
            examTip:
              'Silah temizlenirken ve sökülürken ilk yapılacak işlem: Güvenli yöne tutularak ÖNCE ŞARJÖRÜN ÇIKARILMASI, ardından sürgü çekilerek fişek yatağının gözle kontrol edilmesidir.',
          },
        ],
      },
    ],
  },
];

export const getLessonBookById = (id: string): LessonBook | undefined =>
  LESSON_BOOKS.find((book) => book.id === id);

export const TOTAL_LESSON_CHAPTERS = LESSON_BOOKS.reduce(
  (sum, book) => sum + book.chapters.length,
  0
);
