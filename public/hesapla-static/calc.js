(function () {
  var nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  var ni = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
  var $ = function (r, s) { return r.querySelector(s); };
  function num(v) { v = String(v).trim().replace(/\s/g, ''); if (v.indexOf(',') > -1) v = v.replace(/\./g, '').replace(',', '.'); var n = parseFloat(v); return isFinite(n) ? n : NaN; }
  function tl(n) { return nf.format(n) + ' ₺'; }
  function rows(list) { return list.map(function (r) { return '<div class="res-row' + (r[2] ? ' big' : '') + '"><span>' + r[0] + '</span><b>' + r[1] + '</b></div>'; }).join(''); }
  function show(root, html) { var o = $(root, '.out'); o.innerHTML = html; o.hidden = false; }
  function bad(root, msg) { var o = $(root, '.out'); o.innerHTML = '<p class="err">' + msg + '</p>'; o.hidden = false; }
  var C = {};
  C.kdv = function (root, v) {
    var a = num(v.tutar), r = num(v.oran), dahil = v.mod === 'dahil';
    if (!(a >= 0) || !(r >= 0)) return bad(root, 'Lütfen geçerli bir tutar girin.');
    var net = dahil ? a / (1 + r / 100) : a, kdv = dahil ? a - net : a * r / 100, top = net + kdv;
    show(root, rows([['KDV hariç tutar', tl(net)], ['KDV tutarı (%' + r + ')', tl(kdv)], ['KDV dahil tutar', tl(top), 1]]));
  };
  C.yuzde = function (root, v) {
    var x = num(v.x), y = num(v.y), m = v.mod;
    if (isNaN(x) || isNaN(y)) return bad(root, 'Lütfen iki sayıyı da girin.');
    if (m === 'a') return show(root, rows([[ni.format(x) + ' sayısının %' + y + ' değeri', nf.format(x * y / 100), 1]]));
    if (m === 'b') { if (y === 0) return bad(root, 'İkinci sayı sıfır olamaz.'); return show(root, rows([[nf.format(x) + ', ' + nf.format(y) + ' sayısının yüzde kaçıdır', '%' + nf.format(x / y * 100), 1]])); }
    return show(root, rows([['%' + y + ' artış', nf.format(x * (1 + y / 100))], ['%' + y + ' azalış', nf.format(x * (1 - y / 100)), 1]]));
  };
  C.indirim = function (root, v) {
    var p = num(v.fiyat), d = num(v.oran);
    if (!(p >= 0) || !(d >= 0 && d <= 100)) return bad(root, 'Fiyat ve 0-100 arası bir indirim oranı girin.');
    show(root, rows([['İndirim tutarı', tl(p * d / 100)], ['İndirimli fiyat', tl(p * (1 - d / 100)), 1]]));
  };
  C.kredi = function (root, v) {
    var P = num(v.tutar), n = Math.round(num(v.vade)), r = num(v.faiz) / 100;
    if (!(P > 0) || !(n > 0) || !(r >= 0)) return bad(root, 'Tutar, vade ve faiz oranını doğru girin.');
    var t = r === 0 ? P / n : P * r / (1 - Math.pow(1 + r, -n)), toplam = t * n, bal = P, tab = '';
    for (var i = 1; i <= n; i++) { var f = bal * r, g = t - f; bal = Math.max(0, bal - g); if (n <= 60) tab += '<tr><td>' + i + '</td><td>' + nf.format(t) + '</td><td>' + nf.format(g) + '</td><td>' + nf.format(f) + '</td><td>' + nf.format(bal) + '</td></tr>'; }
    show(root, rows([['Aylık taksit', tl(t), 1], ['Toplam geri ödeme', tl(toplam)], ['Toplam faiz', tl(toplam - P)]]) + (tab ? '<details><summary>Ödeme planını göster</summary><div class="tw"><table><thead><tr><th>Ay</th><th>Taksit</th><th>Anapara</th><th>Faiz</th><th>Kalan</th></tr></thead><tbody>' + tab + '</tbody></table></div></details>' : ''));
  };
  C.yas = function (root, v) {
    var d = new Date(v.dogum); if (isNaN(d)) return bad(root, 'Doğum tarihini seçin.');
    var b = v.hedef ? new Date(v.hedef) : new Date(); if (isNaN(b)) b = new Date(); b = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    if (d > b) return bad(root, 'Doğum tarihi bugünden sonra olamaz.');
    var y = b.getFullYear() - d.getFullYear(), m = b.getMonth() - d.getMonth(), g = b.getDate() - d.getDate();
    if (g < 0) { m--; g += new Date(b.getFullYear(), b.getMonth(), 0).getDate(); } if (m < 0) { y--; m += 12; }
    var days = Math.round((b - d) / 864e5), nx = new Date(b.getFullYear(), d.getMonth(), d.getDate()); if (nx < b) nx = new Date(b.getFullYear() + 1, d.getMonth(), d.getDate());
    show(root, rows([['Yaşınız', y + ' yıl ' + m + ' ay ' + g + ' gün', 1], ['Yaşadığınız gün', ni.format(days)], ['Yaşadığınız hafta', ni.format(Math.floor(days / 7))], ['Sonraki doğum gününe', Math.round((nx - b) / 864e5) + ' gün']]));
  };
  C.tarih = function (root, v) {
    var a = new Date(v.bas), b = new Date(v.bit); if (isNaN(a) || isNaN(b)) return bad(root, 'İki tarihi de seçin.');
    if (a > b) { var t = a; a = b; b = t; }
    var days = Math.round((b - a) / 864e5), is = 0; for (var i = 0; i < days; i++) { var w = new Date(a.getTime() + i * 864e5).getDay(); if (w !== 0 && w !== 6) is++; }
    var y = b.getFullYear() - a.getFullYear(), m = b.getMonth() - a.getMonth(), g = b.getDate() - a.getDate();
    if (g < 0) { m--; g += new Date(b.getFullYear(), b.getMonth(), 0).getDate(); } if (m < 0) { y--; m += 12; }
    show(root, rows([['Aradaki gün', ni.format(days), 1], ['Hafta', nf.format(days / 7)], ['Yıl / ay / gün', y + ' / ' + m + ' / ' + g], ['Hafta içi gün (Cmt-Paz hariç)', ni.format(is)]]));
  };
  C.vki = function (root, v) {
    var h = num(v.boy) / 100, k = num(v.kilo);
    if (!(h > 0.5 && h < 2.6) || !(k > 10 && k < 400)) return bad(root, 'Boyu cm, kiloyu kg olarak girin.');
    var b = k / (h * h), c = b < 18.5 ? 'Zayıf' : b < 25 ? 'Normal kilolu' : b < 30 ? 'Fazla kilolu' : b < 35 ? 'Obez (1. derece)' : b < 40 ? 'Obez (2. derece)' : 'Obez (3. derece)';
    show(root, rows([['Vücut kitle indeksi', nf.format(b), 1], ['Sınıf (DSÖ)', c], ['Normal aralık için kilo', nf.format(18.5 * h * h) + ' – ' + nf.format(24.9 * h * h) + ' kg']]) + '<p class="note">Bu sonuç bilgilendirme amaçlıdır, tıbbi tavsiye değildir.</p>');
  };
  C.faiz = function (root, v) {
    var P = num(v.anapara), r = num(v.oran) / 100, y = num(v.yil), n = num(v.sik);
    if (!(P > 0) || !(r >= 0) || !(y > 0) || !(n > 0)) return bad(root, 'Tüm alanları doğru doldurun.');
    var A = P * Math.pow(1 + r / n, n * y);
    show(root, rows([['Vade sonu tutar', tl(A), 1], ['Toplam kazanç', tl(A - P)], ['Anaparanın katı', nf.format(A / P) + ' kat']]) + '<p class="note">Stopaj ve vergiler dahil değildir.</p>');
  };
  C.yakit = function (root, v) {
    var km = num(v.km), t = num(v.tuk), f = num(v.fiyat), k = Math.max(1, Math.round(num(v.kisi) || 1));
    if (!(km > 0) || !(t > 0) || !(f >= 0)) return bad(root, 'Yol, tüketim ve fiyatı doğru girin.');
    var l = km * t / 100, m = l * f;
    show(root, rows([['Gereken yakıt', nf.format(l) + ' litre'], ['Toplam yakıt maliyeti', tl(m), 1], ['Kişi başı (' + k + ' kişi)', tl(m / k)], ['Kilometre başına', tl(m / km)]]));
  };
  C.ihbar = function (root, v) {
    var a = new Date(v.giris), b = new Date(v.cikis); if (isNaN(a) || isNaN(b)) return bad(root, 'İki tarihi de seçin.');
    if (a > b) return bad(root, 'Çıkış tarihi girişten önce olamaz.');
    var ay = (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth() + (b.getDate() >= a.getDate() ? 0 : -1);
    var hf = ay < 6 ? 2 : ay < 18 ? 4 : ay < 36 ? 6 : 8, son = new Date(b.getTime() + hf * 7 * 864e5);
    show(root, rows([['Çalışma süresi', Math.floor(ay / 12) + ' yıl ' + (ay % 12) + ' ay'], ['Bildirim (ihbar) süresi', hf + ' hafta', 1], ['Süre sonu (bildirimden itibaren)', son.toLocaleDateString('tr-TR')]]) + '<p class="note">4857 sayılı İş Kanunu md. 17 asgari sürelerine göre tahmindir; sözleşmeniz daha uzun süre öngörebilir.</p>');
  };
  C.kidem = function (root, v) {
    var a = new Date(v.giris), b = new Date(v.cikis), br = num(v.brut), tv = num(v.tavan);
    if (isNaN(a) || isNaN(b) || a > b) return bad(root, 'Giriş ve çıkış tarihlerini doğru seçin.');
    if (!(br > 0)) return bad(root, 'Brüt ücreti girin.');
    var y = b.getFullYear() - a.getFullYear(), m = b.getMonth() - a.getMonth(), g = b.getDate() - a.getDate();
    if (g < 0) { m--; g += new Date(b.getFullYear(), b.getMonth(), 0).getDate(); } if (m < 0) { y--; m += 12; }
    var yil = y + m / 12 + g / 365, esas = tv > 0 ? Math.min(br, tv) : br, brut = esas * yil, dv = brut * 0.00759;
    show(root, rows([['Çalışma süresi', y + ' yıl ' + m + ' ay ' + g + ' gün'], ['Hesaba esas aylık ücret', tl(esas)], ['Brüt kıdem tazminatı', tl(brut), 1], ['Damga vergisi (binde 7,59)', tl(dv)], ['Net tahmini tutar', tl(brut - dv), 1]]) + '<p class="note">Tahmindir. Tazminata hak kazanma koşulları ve güncel tavan için resmi kaynaklara veya avukata danışın.' + (tv > 0 ? '' : ' Tavan girmediniz; tutar tavana takılabilir.') + '</p>');
  };
  C.kira = function (root, v) {
    var k = num(v.kira), o = num(v.oran);
    if (!(k > 0) || isNaN(o)) return bad(root, 'Kira ve oranı girin.');
    var y = k * (1 + o / 100);
    show(root, rows([['Yeni aylık kira', tl(y), 1], ['Aylık artış', tl(y - k)], ['Yıllık ek yük', tl((y - k) * 12)]]));
  };
  C.ortalama = function (root, v) {
    var a = String(v.liste).split(/[\s;]+|,(?!\d)/).map(num).filter(function (x) { return !isNaN(x); });
    if (!a.length) return bad(root, 'En az bir sayı girin.');
    var s = a.reduce(function (p, c) { return p + c; }, 0);
    show(root, rows([['Ortalama', nf.format(s / a.length), 1], ['Toplam', nf.format(s)], ['Adet', ni.format(a.length)], ['En küçük / en büyük', nf.format(Math.min.apply(null, a)) + ' / ' + nf.format(Math.max.apply(null, a))]]));
  };
  C.birikim = function (root, v) {
    var H = num(v.hedef), n = Math.round(num(v.ay)), o = num(v.oran) / 100;
    if (!(H > 0) || !(n > 0) || !(o >= 0)) return bad(root, 'Hedef, süre ve oranı doğru girin.');
    var r = Math.pow(1 + o, 1 / 12) - 1, aylik = r === 0 ? H / n : H * r / (Math.pow(1 + r, n) - 1);
    show(root, rows([['Aylık biriktirmeniz gereken', tl(aylik), 1], ['Toplam yatırdığınız', tl(aylik * n)], ['Getiri payı', tl(H - aylik * n)]]) + '<p class="note">Getiri varsayımdır, garanti değildir; vergiler dahil değildir.</p>');
  };
  document.querySelectorAll('[data-calc]').forEach(function (root) {
    var kind = root.getAttribute('data-calc'), form = $(root, 'form');
    var pre = {}; try { pre = JSON.parse(root.getAttribute('data-preset') || '{}'); } catch (e) {}
    Object.keys(pre).forEach(function (k) { var el = form.elements[k]; if (el) el.value = pre[k]; });
    function run(e) { if (e) e.preventDefault(); var v = {}; for (var i = 0; i < form.elements.length; i++) { var el = form.elements[i]; if (el.name) v[el.name] = el.value; } C[kind](root, v); }
    form.addEventListener('submit', run);
    if (pre && Object.keys(pre).length && kind !== 'yas' && kind !== 'tarih' && kind !== 'ihbar' && kind !== 'kidem') run();
  });
})();
