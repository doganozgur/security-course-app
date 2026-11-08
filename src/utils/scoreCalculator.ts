import { ScoreCalculationInput, ScoreCalculationResult } from '../types';

/**
 * EGM Özel Güvenlik Denetleme Başkanlığı Resmi Sınav Puanı Hesaplama Motoru
 * 
 * SİLAHSIZ ADAYLAR İÇİN:
 * - 100 soru çözülür, her soru 1 puandır.
 * - Başarı barajı en az 60 puandır (en az 60 doğru).
 * - Yanlış doğruyu götürmez!
 * 
 * SİLAHLI ADAYLAR İÇİN:
 * - Temel Eğitim 100 soru (her biri 1 puan = maks 100 puan)
 * - Silah Bilgisi Yazılı 25 soru (her biri 2 puan = maks 50 puan)
 * - Poligon Atışı 5 fişek (her isabet 10 puan = maks 50 puan)
 * - Toplam Silah Puanı = Silah Yazılı + Poligon Atışı (maks 100 puan)
 * - Ortalama Puan = (Temel Eğitim Puanı + Toplam Silah Puanı) / 2
 * 
 * SİLAHLI GEÇME ŞARTLARI:
 * 1) Ortalama Puan en az 60 olmalıdır.
 * 2) Toplam Silah Puanı en az 50 olmalıdır.
 * 
 * EĞER SİLAHLI KAZANILAMAZSA:
 * - Temel Eğitim Puanı en az 60 ise, aday "Silahsız Özel Güvenlik Görevlisi" olmaya hak kazanır.
 */
export function calculateOGGScore(input: ScoreCalculationInput): ScoreCalculationResult {
  const { examType, temelDogru, silahDogru, atisIsabet } = input;

  const validTemel = Math.max(0, Math.min(100, Math.round(temelDogru || 0)));
  const validSilah = Math.max(0, Math.min(25, Math.round(silahDogru || 0)));
  const validAtis = Math.max(0, Math.min(5, Math.round(atisIsabet || 0)));

  const temelPuan = validTemel; // Her soru 1 puan
  const silahYaziliPuan = validSilah * 2; // Her soru 2 puan (maks 50)
  const atisPuan = validAtis * 10; // Her isabet 10 puan (maks 50)
  const toplamSilahPuan = silahYaziliPuan + atisPuan; // maks 100

  const ortalamaPuan = examType === 'silahli'
    ? Number(((temelPuan + toplamSilahPuan) / 2).toFixed(2))
    : temelPuan;

  const silahsizGecti = temelPuan >= 60;
  let silahliGecti = false;
  let statusMessage = '';
  const details: string[] = [];

  if (examType === 'silahsiz') {
    if (silahsizGecti) {
      statusMessage = 'TEBRİKLER! Silahsız Özel Güvenlik Sınavını Kazandınız.';
      details.push(`Temel Sınav Puanınız: ${temelPuan}`);
      details.push('60 puan başarı barajını geçtiniz.');
    } else {
      statusMessage = 'MAALESEF! 60 puan barajının altında kaldınız.';
      details.push(`Temel Sınav Puanınız: ${temelPuan}`);
      details.push(`Geçmek için ${60 - temelPuan} doğruya daha ihtiyacınız vardı.`);
    }
  } else {
    // Silahlı Aday
    const silahBarajiniGecti = toplamSilahPuan >= 50;
    const ortalamaBarajiniGecti = ortalamaPuan >= 60;

    silahliGecti = silahBarajiniGecti && ortalamaBarajiniGecti;

    if (silahliGecti) {
      statusMessage = 'TEBRİKLER! Silahlı Özel Güvenlik Sınavını Kazandınız.';
      details.push(`Temel Sınav Puanı: ${temelPuan}`);
      details.push(`Silah Puanı (Yazılı + Atış): ${toplamSilahPuan}/100`);
      details.push(`Genel Ortalama: ${ortalamaPuan} (Baraj: 60)`);
    } else if (silahsizGecti) {
      statusMessage = 'SİLAHSIZ KAZANDINIZ! Silahlı barajı aşılamadı ancak Silahsız hakkı kazandınız.';
      if (!silahBarajiniGecti) {
        details.push(`Silah Puanınız (${toplamSilahPuan}), 50 puanlık asgari silah barajını geçemedi.`);
      }
      if (!ortalamaBarajiniGecti) {
        details.push(`Genel Ortalamanız (${ortalamaPuan}), 60 puanlık başarı barajının altında kaldı.`);
      }
      details.push(`Temel Eğitim puanınız (${temelPuan}) 60 ve üzeri olduğu için Silahsız ÖGG olabilirsiniz.`);
    } else {
      statusMessage = 'MAALESEF! Sınavı geçemediniz.';
      details.push(`Genel Ortalamanız: ${ortalamaPuan} (Baraj: 60)`);
      details.push(`Temel Puan: ${temelPuan} | Silah Puanı: ${toplamSilahPuan}`);
    }
  }

  return {
    temelPuan,
    silahYaziliPuan,
    atisPuan,
    toplamSilahPuan,
    ortalamaPuan,
    silahliGecti,
    silahsizGecti,
    statusMessage,
    details,
  };
}
