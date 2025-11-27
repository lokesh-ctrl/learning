import machine
import dht
import time


RELAY_PIN = 5
DHT_PIN = 4
TEMP_THRESHOLD = 27.0  # Temperature to trigger fan

relay = machine.Pin(RELAY_PIN, machine.Pin.OUT)
relay.value(1)  # Start with Fan OFF

# Initialize Sensor
sensor = dht.DHT22(machine.Pin(DHT_PIN))

print("System Started. Monitoring Temperature...")

# --- MAIN LOOP ---
while True:
    try:
        # 1. Read Data
        sensor.measure()
        temp = sensor.temperature()
        hum = sensor.humidity()

        # 2. Logic
        print(f"Current: {temp}°C | {hum}% Humidity")

        if temp > TEMP_THRESHOLD:
            if relay.value() == 1:  # Only print if state changes
                print(" -> HOT! Turning Fan ON [CLICK]")
            relay.value(0)  # Turn ON

        else:
            if relay.value() == 0:
                print(" -> COOL. Turning Fan OFF [CLICK]")
            relay.value(1)  # Turn OFF

    except OSError as e:
        print("Sensor Error. Retrying...")

    # 3. Wait (Don't query sensor too fast)
    time.sleep(2)
