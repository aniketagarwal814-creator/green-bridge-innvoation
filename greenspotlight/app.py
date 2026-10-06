import json
import sqlite3
import uuid
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

def init_db():
    conn = sqlite3.connect('vault.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS certificates (
            id TEXT PRIMARY KEY,
            volunteer_id TEXT,
            campaign_title TEXT,
            ngo_name TEXT,
            date_issued TEXT,
            is_external BOOLEAN,
            image_base64 TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

class VaultAPIHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        
        if path.startswith('/api/vault/verify/'):
            cert_id = path.split('/')[-1]
            conn = sqlite3.connect('vault.db')
            c = conn.cursor()
            c.execute('SELECT id, volunteer_id, campaign_title, ngo_name, date_issued, is_external FROM certificates WHERE id = ?', (cert_id,))
            row = c.fetchone()
            conn.close()
            
            if row and not row[5]:
                resp = {'valid': True, 'certificate': {
                    'id': row[0], 'volunteerId': row[1], 'campaignTitle': row[2], 'ngoName': row[3], 'date': row[4]
                }}
            else:
                resp = {'valid': False}
                
            self.send_response(200)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(resp).encode('utf-8'))
            
        elif path.startswith('/api/vault/'):
            volunteer_id = path.split('/')[-1]
            conn = sqlite3.connect('vault.db')
            c = conn.cursor()
            c.execute('SELECT id, campaign_title, ngo_name, date_issued, is_external, image_base64 FROM certificates WHERE volunteer_id = ?', (volunteer_id,))
            rows = c.fetchall()
            conn.close()
            
            certs = []
            for row in rows:
                certs.append({
                    'id': row[0], 'campaignTitle': row[1], 'ngoName': row[2],
                    'date': row[3], 'isExternal': bool(row[4]), 'image': row[5]
                })
                
            self.send_response(200)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'certificates': certs}).encode('utf-8'))

    def do_POST(self):
        if self.path == '/api/vault/certificate':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            cert_id = data.get('id')
            if not cert_id:
                cert_id = 'CERT-' + str(uuid.uuid4())[:8].upper()
                
            conn = sqlite3.connect('vault.db')
            c = conn.cursor()
            c.execute('''
                INSERT INTO certificates (id, volunteer_id, campaign_title, ngo_name, date_issued, is_external, image_base64)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                cert_id, data.get('volunteerId'), data.get('campaignTitle'), data.get('ngoName'),
                data.get('date'), data.get('isExternal', False), data.get('image', '')
            ))
            conn.commit()
            conn.close()
            
            self.send_response(200)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'success', 'id': cert_id}).encode('utf-8'))

if __name__ == '__main__':
    server = HTTPServer(('localhost', 5000), VaultAPIHandler)
    print("Starting zero-dependency GreenSpotlight Vault Backend on http://localhost:5000")
    server.serve_forever()
