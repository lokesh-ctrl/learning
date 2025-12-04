import machine
import neopixel
import time

# --- CONFIGURATION ---
PIR_PIN = 4  # Input from Motion Sensor
LED_PIN = 2  # Output to LED Strip (Using the working Pin 2)
NUM_LEDS = 100  # How many LEDs to light up
BRIGHTNESS = 0.3  # Keep low (0.1 - 0.3) to save power

# --- SETUP ---
pir = machine.Pin(PIR_PIN, machine.Pin.IN)
strip = neopixel.NeoPixel(machine.Pin(LED_PIN), NUM_LEDS)


# Helper: Set color with brightness control
def get_color(r, g, b):
    return (int(r * BRIGHTNESS), int(g * BRIGHTNESS), int(b * BRIGHTNESS))


# Helper: Clear all LEDs
def clear():
    for i in range(NUM_LEDS):
        strip[i] = (0, 0, 0)
    strip.write()


# Effect: The "Cylon / Knight Rider" Scanner
def scanner_effect():
    red = get_color(255, 0, 0)
    off = (0, 0, 0)

    # Scan Forward
    for i in range(NUM_LEDS):
        strip[i] = red
        if i > 0:
            strip[i - 1] = get_color(50, 0, 0)  # Trail
        if i > 1:
            strip[i - 2] = off
        strip.write()
        time.sleep(0.03)

    # Scan Backward
    for i in range(NUM_LEDS - 1, -1, -1):
        strip[i] = red
        if i < NUM_LEDS - 1:
            strip[i + 1] = get_color(50, 0, 0)  # Trail
        if i < NUM_LEDS - 2:
            strip[i + 2] = off
        strip.write()
        time.sleep(0.03)

    clear()


# --- MAIN LOOP ---
print("System Armed. Waiting for motion...")
strip[0] = (0, 10, 0)  # Tiny green dot to show it's alive
strip.write()

while True:
    if pir.value() == 1:
        print("MOTION DETECTED! [Scanning...]")

        # Run the effect 3 times
        for _ in range(3):
            scanner_effect()

        # Turn solid Red for a moment
        for i in range(NUM_LEDS):
            strip[i] = get_color(255, 0, 0)
        strip.write()
        time.sleep(1)

        # Reset
        clear()
        print("Area Clear. Rearming...")

        # Wait for sensor to cool down
        time.sleep(2)
        strip[0] = (0, 10, 0)  # Green dot back on
        strip.write()

    time.sleep(0.1)
