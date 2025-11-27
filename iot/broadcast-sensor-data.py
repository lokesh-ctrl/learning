import machine
import dht
import network
import socket
import time

# --- CONFIGURATION ---
SSID = "Airtel_Whitewalkers"  # <--- CHANGE THIS
PASSWORD = "johnsnow"  # <--- CHANGE THIS
RELAY_PIN = 5
DHT_PIN = 4

# --- HARDWARE SETUP ---
relay = machine.Pin(RELAY_PIN, machine.Pin.OUT)
sensor = dht.DHT22(machine.Pin(DHT_PIN))


# --- WIFI CONNECTION FUNCTION ---
def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print("Connecting to Wi-Fi...", end="")
        wlan.connect(SSID, PASSWORD)
        while not wlan.isconnected():
            print(".", end="")
            time.sleep(0.5)
    print("\nWi-Fi Connected!")
    print("Network Config:", wlan.ifconfig())
    return wlan.ifconfig()[0]  # Return the IP Address


# --- HTML GENERATOR ---
def get_html(temp, hum, relay_state):
    state_text = "ON" if relay_state == 0 else "OFF"  # Remember Active LOW
    color = "red" if relay_state == 0 else "gray"

    html = f"""<!DOCTYPE html>
    <html>
    <head> <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {{ font-family: Arial; text-align: center; margin-top: 50px; }}
        .card {{ box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); padding: 16px; display: inline-block; }}
        .sensor {{ font-size: 2.5rem; color: #333; }}
        .status {{ font-size: 1.5rem; color: {color}; font-weight: bold; }}
    </style>
    </head>
    <body>
        <div class="card">
            <h2>ESP32 Smart Home</h2>
            <p>Temperature</p>
            <div class="sensor">{temp} &deg;C</div>
            <p>Humidity</p>
            <div class="sensor">{hum} %</div>
            <br>
            <p>Fan Status: <span class="status">{state_text}</span></p>
            <p><a href="/toggle"><button>TOGGLE FAN</button></a></p>
            <p><a href="/"><button>REFRESH</button></a></p>
        </div>
    </body>
    </html>
    """
    return html


# --- MAIN EXECUTION ---
try:
    ip_address = connect_wifi()

    # Start Web Server (Socket)
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(("", 80))
    s.listen(5)
    print(f"Server listening on http://{ip_address}")

    while True:
        try:
            conn, addr = s.accept()  # Blocking call, waits for browser request
            print(f"Got connection from {addr}")
            request = conn.recv(1024)
            request = str(request)

            # 1. Read Sensor
            try:
                sensor.measure()
                t = sensor.temperature()
                h = sensor.humidity()
            except:
                t = 0
                h = 0

            # 2. Handle Button Click (Simple Routing)
            if "/toggle" in request:
                print("Toggle Requested!")
                # Toggle Relay State
                new_state = 1 if relay.value() == 0 else 0
                relay.value(new_state)

            # 3. Send Response
            response = get_html(t, h, relay.value())
            conn.send("HTTP/1.1 200 OK\n")
            conn.send("Content-Type: text/html\n")
            conn.send("Connection: close\n\n")
            conn.sendall(response)
            conn.close()

        except Exception as e:
            print("Error in loop:", e)
            conn.close()

except KeyboardInterrupt:
    print("Stopping...")
