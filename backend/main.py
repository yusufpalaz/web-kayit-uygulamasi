from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

conn = sqlite3.connect('kayit.db')
cursor = conn.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS Kayit (Ad TEXT, Soyad TEXT, Sirket TEXT, Seviye TEXT, Kullanim TEXT)")
conn.commit()
conn.close()

@app.route('/kayitlar', methods=['POST', 'GET'])
def kayit_ekle():
    try:
        if request.method == 'POST':
            data = request.json
            ad = data.get('ad')
            soyad = data.get('soyad')
            sirket = data.get('sirket')
            seviye = data.get('seviye')
            kullanim = data.get('kullanim')

            conn = sqlite3.connect('kayit.db')
            cursor = conn.cursor()
            cursor.execute("INSERT INTO Kayit (Ad, Soyad, Sirket, Seviye, Kullanim) VALUES (?, ?, ?, ?, ?)",
                        (ad, soyad, sirket, seviye, kullanim))
            conn.commit()
            conn.close()

            return jsonify({'message': 'Kayıt başarıyla eklendi'}), 201
        
        elif request.method == 'GET':
            conn = sqlite3.connect('kayit.db')
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM Kayit")
            kayitlar = cursor.fetchall()
            conn.close()

            return jsonify(kayitlar)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)


