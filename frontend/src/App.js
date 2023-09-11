import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [sirket, setSirket] = useState('');
  const [seviye, setSeviye] = useState('Evet');
  const [kullanim, setKullanim] = useState('Ders çalışmak için');
  const [kayitlar, setKayitlar] = useState([]);

  // Verileri Flask API'den çekmek için useEffect kullanımı
  useEffect(() => {
    getirKayit();
  }, []); // Sadece ilk render'da çalışmasını sağlamak için boş bağımlılık dizisi []

  const getirKayit = () => {
    axios.get('http://localhost:5000/kayitlar')
      .then(response => {
        setKayitlar(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Hata:', error);
      });
  };

  const ekleKayit = (e) => {
    e.preventDefault();

    const yeniKayit = {
      ad: ad,
      soyad: soyad,
      sirket: sirket,
      seviye: seviye,
      kullanim: kullanim
    };

    console.log(yeniKayit)

    axios.post('http://localhost:5000/kayitlar', yeniKayit)
      .then(response => {
        console.log(response.data.message);
        setAd('');
        setSoyad('');
        setSirket('');
        setSeviye('Evet');
        setKullanim('Ders çalışmak için');
        // Verileri güncellemek için API'den verileri tekrar çekilebilir
      })
      .catch(error => {
        console.error('Hata:', error);
      });

    getirKayit();
  };

  return (
    <div className="App">
      <h1>Kayıt Uygulaması</h1>
      <form>
        <div className="form-group">
          <label>Ad:</label>
          <input type="text" value={ad} onChange={(e) => setAd(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Soyad:</label>
          <input type="text" value={soyad} onChange={(e) => setSoyad(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Şirket:</label>
          <input type="text" value={sirket} onChange={(e) => setSirket(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Bilgisayar Derseni Seviyorum:</label>
          <select value={seviye} onChange={(e) => setSeviye(e.target.value)}>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </div>
        <div className="form-group">
          <label>Bilgisayarı Ne İçin Kullanıyorum:</label>
          <select value={kullanim} onChange={(e) => setKullanim(e.target.value)}>
            <option value="Ders çalışmak için">Ders çalışmak için</option>
            <option value="Kullanmıyorum">Kullanmıyorum</option>
            <option value="Filim izlemek için">Filim izlemek için</option>
            <option value="Oyun oynamak için">Oyun oynamak için</option>
          </select>
        </div>
        <button onClick={ekleKayit}>Ekle</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Şirket</th>
            <th>Seviye</th>
            <th>Kullanım</th>
          </tr>
        </thead>
        <tbody>
          {kayitlar.map((kayit, index) => (
            <tr key={index}>
              <td>{kayit.ad}</td>
              <td>{kayit.soyad}</td>
              <td>{kayit.sirket}</td>
              <td>{kayit.seviye}</td>
              <td>{kayit.kullanim}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
