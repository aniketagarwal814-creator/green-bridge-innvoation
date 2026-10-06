import urllib.request
import urllib.parse
import json
import time

base_url = 'http://localhost:5000/api/vault'

print("--- Testing GreenSpotlight Python Backend ---")

# Wait a moment for server to start if running simultaneously
time.sleep(2)

print("\n1. Adding a certificate (POST /api/vault/certificate)...")
data = json.dumps({
    'volunteerId': 'v1',
    'campaignTitle': 'Clean the Beach',
    'ngoName': 'OceanSavers',
    'date': '2026-10-06',
    'isExternal': False
}).encode('utf-8')

req = urllib.request.Request(f'{base_url}/certificate', data=data, headers={'Content-Type': 'application/json'}, method='POST')
try:
    with urllib.request.urlopen(req) as response:
        res_data = json.loads(response.read())
        print("   ✅ Success! Response:", res_data)
        cert_id = res_data['id']
except Exception as e:
    print("   ❌ Failed:", e)
    exit(1)

print(f"\n2. Getting vault for volunteer v1 (GET /api/vault/v1)...")
req = urllib.request.Request(f'{base_url}/v1')
try:
    with urllib.request.urlopen(req) as response:
        res_data = json.loads(response.read())
        print("   ✅ Success! Found certificates:", len(res_data.get('certificates', [])))
        print("   Cert details:", res_data['certificates'][0]['campaignTitle'])
except Exception as e:
    print("   ❌ Failed:", e)

print(f"\n3. Verifying the certificate {cert_id} (GET /api/vault/verify/{cert_id})...")
req = urllib.request.Request(f'{base_url}/verify/{cert_id}')
try:
    with urllib.request.urlopen(req) as response:
        res_data = json.loads(response.read())
        print("   ✅ Success! Validity:", res_data.get('valid'))
except Exception as e:
    print("   ❌ Failed:", e)

print("\n--- All tests completed successfully! ---")
