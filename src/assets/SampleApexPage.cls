<apex:page >
  
  <apex:includeScript value="{!URLFOR($Resource.counter, 'angular-counter-app/runtime.js')}"
  />
  <apex:includeScript value="{!URLFOR($Resource.counter, 'angular-counter-app/polyfills.js')}"
  />
  <apex:includeScript value="{!URLFOR($Resource.counter, 'angular-counter-app/vendor.js')}"
  />
  <apex:includeScript value="{!URLFOR($Resource.counter, 'angular-counter-app/main.js')}"
  />

  <script>
    function handleAngularMessage(message) {
      console.log("Visualforce: I have got a message from angular");
      alert("Message from Angular: " + message);
    }
  </script>

  <button onclick="sendMessageToAngular()">Send Message</button>
  <script>
    function sendMessageToAngular() {
      var message = "Hello from Visualforce!";
      window.dispatchEvent(
        new CustomEvent("messageToAngular", { detail: message })
      );
    }
  </script>

  <!-- Initialize your Angular web component -->
  <div>
    <!-- Use the Angular web component -->
    <app-counter2 id="aapp" labeltext="SDOCS:"></app-counter2>
  </div>
  
  <script>
  
  document.getElementById('aapp').addEventListener("customEvent", (event) => {
      console.log("Visualforce: Message from Angular received:", event);   
    });
    document.getElementById('aapp').setAttribute('labelText', 'custom-value');
  </script>

  </apex:page>