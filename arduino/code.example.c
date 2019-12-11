/*
    Required: arduino, arduino ethernet shield
    Server: Express js
    Database : Influx DB
    Tunnel : ngrok , port 3000
*/

#include <SPI.h>
#include <Ethernet.h>
#include "DHT.h"

byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
//byte ip[] = {10, 42, 0, 174 }; //Enter the IP of ethernet shield
//IPAddress ip(192, 168, 0, 177);
IPAddress ip(10,42,0,174);
//IPAddress myDns(192, 168, 0, 1);
//Enter the IPv4 address
char* server = "85f8add3.ngrok.io";

const int DHTPIN =2;
const int DHTTYPE = DHT11;

// Variables to measure the speed
unsigned long beginMicros, endMicros;
unsigned long byteCount = 0;
bool printWebData = true;  

EthernetClient client;
DHT dht(DHTPIN,DHTTYPE);
void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // start the Ethernet connection:
  
 
  
}

void loop() {
  // put your main code here, to run repeatedly:

Serial.println("Initialize Ethernet with DHCP:");
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // Check for Ethernet hardware present
    if (Ethernet.hardwareStatus() == EthernetNoHardware) {
      Serial.println("Ethernet shield was not found.  Sorry, can't run without hardware. :(");
      while (true) {
        delay(1); // do nothing, no point running without Ethernet hardware
      }
    }
    if (Ethernet.linkStatus() == LinkOFF) {
      Serial.println("Ethernet cable is not connected.");
    }
    // try to congifure using IP address instead of DHCP:
    Ethernet.begin(mac, ip);
  } else {
    Serial.print("  DHCP assigned IP ");
    Serial.println(Ethernet.localIP());
  }
  // give the Ethernet shield a second to initialize:
  delay(1000);
  Serial.print("connecting to ");
  Serial.print(server);
  Serial.println("...");


int   h = (int) dht.readHumidity();
 int   t = (int) dht.readTemperature();
  String data = "temperature=";
  data.concat(t);
  data.concat("&humidity=");
  data.concat(h);


  if (client.connect(server, 80)) {
    Serial.print("connected to ");
    Serial.println(client.remoteIP());
    // Make a HTTP request:
    Serial.println("Connected");
    Serial.println("Making a HTTP request \n");                   

    client.println("POST /sensor HTTP/1.1");
client.print("Host: ");
client.println(server);
client.println("Cache-Control: no-cache");
client.println("Content-Type: application/x-www-form-urlencoded");
client.print("Content-Length: ");
client.println(data.length());
client.println();
client.println(data);

//    client.flush();
//    client.stop();
    
    Serial.print(data+"\n");
    Serial.print("Data sent... \n");
  } else {
    // if you didn't get a connection to the server:
    Serial.println("connection failed");
  }







  int len = client.available();
  if (len > 0) {
    byte buffer[80];
    if (len > 80) len = 80;
    client.read(buffer, len);
    if (printWebData) {
      Serial.write(buffer, len); // show in the serial monitor (slows some boards)
    }
    byteCount = byteCount + len;
  }
  
      delay(5000);
}