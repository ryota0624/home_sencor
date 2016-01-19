#define IR_RECV_PIN      11
#define IR_TIMEOUT_USEC  100000
 
void setup()
{
  Serial.begin(57600);
  pinMode(IR_RECV_PIN, INPUT);
}
 
void loop()
{
  static int           previousBit      = HIGH;
  int                  currentBit       = digitalRead(IR_RECV_PIN);
  static unsigned long previousTimeUSec = 0;
  unsigned long        currentTimeUSec  = 0;
  unsigned long        elapsedTimeUSec  = 0;
 
  if ( currentBit == previousBit ) {
    return;
  }
 
  currentTimeUSec = micros();
  elapsedTimeUSec = currentTimeUSec - previousTimeUSec;
  if (elapsedTimeUSec < IR_TIMEOUT_USEC) {
    Serial.print(elapsedTimeUSec);
    Serial.print(", ");
  } else {
    Serial.println("");
  }
 
  // update
  previousBit      = currentBit;
  previousTimeUSec = currentTimeUSec;
}

//--

#define IR_EMIT_PIN 12
 
short AC_TOGGLE_SIGNAL[] = { 3500, 3428, 856, 2560, 856, 840, 844, 2572, 852, 2596, 832, 824, 860, 2564, 852, 836, 860, 820, 860, 2560, 852, 836, 860, 2564, 852, 2596, 828, 828, 852, 2572, 860, 820, 860, 824, 860, 828, 852, 2572, 852, 824, 860, 828, 860, 828, 852, 832, 844, 832, 864, 824, 860, 828, 852, 2572, 844, 832, 860, 828, 860, 824, 852, 836, 852, 828, 852, 832, 3472, 3424, 860, 2564, 860, 828, 852, 2564, 852, 2604, 820, 836, 852, 2568, 856, 824, 860, 828, 852, 2572, 852, 832, 856, 2564, 860, 2564, 852, 832, 860, 2560, 860, 824, 852, 836, 860, 824, 852, 2572, 844, 836, 852, 836, 860, 824, 852, 828, 860, 824, 852, 836, 852, 832, 860, 2556, 912, 776, 856, 832, 844, 832, 864, 824, 860, 824, 852, 828, 3464, 3440, 860, 13836, 3500, 3432, 852, 828, 860, 824, 852, 836, 852, 2568, 856, 2564, 860, 2564, 852, 836, 852, 2564, 860, 824, 852, 836, 884, 800, 876, 2548, 848, 2572, 860, 2564, 852, 832, 856, 2564, 852, 832, 852, 2572, 856, 2568, 856, 824, 860, 2564, 860, 2564, 852, 836, 844, 832, 884, 804, 876, 2548, 852, 2564, 864, 824, 852, 2572, 852, 2572, 844, 836, 860, 824, 3496, 3408, 844, 836, 852, 832, 876, 812, 884, 2532, 852, 2572, 856, 2568, 860, 820, 892, 2532, 852, 836, 876, 812, 880, 796, 892, 2532, 864, 2564, 844, 2568, 864, 824, 884, 2540, 884, 796, 892, 2532, 884, 2540, 888, 800, 884, 2532, 892, 2536, 876, 808, 884, 796, 892, 796, 884, 2536, 880, 2540, 884, 804, 880, 2540, 888, 2532, 892, 796, 884, 800, 3488, 3408, 892, };
 
void emitIRSignal()
{
    int           duration;
    unsigned long started_at;
 
    int signalLength = sizeof(AC_TOGGLE_SIGNAL) / sizeof(AC_TOGGLE_SIGNAL[0]);
    for (int i = 0; i < signalLength; i++) {
        duration = AC_TOGGLE_SIGNAL[i];
        started_at = micros();
 
        while(micros() - started_at < duration) {
            // i is even: HIGH. i is odd: LOW
            // keep 1/3 duty, 8 usec.
            digitalWrite(IR_EMIT_PIN, 1 - (i % 2));
            delayMicroseconds(8);
 
            // off remaining 2/3, 16 usec.
            digitalWrite(IR_EMIT_PIN, 0);
            delayMicroseconds(16);
        }
    }
}
