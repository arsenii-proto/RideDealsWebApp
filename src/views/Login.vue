<template>
  <div class="page">

    <h2 class="title">{{ heading_text }}</h2>
    <h3 class="sub-title">{{ sub_heading_text }}</h3>

    <!-- Number Input Form -->
    <form v-if="showNumberInput" novalidate class="md-layout">
      
      <div class="md-layout md-gutter md md-alignment-top-center">
        <div class="md-layout-item md-size-90">
          <md-field>
            <md-input v-model="phoneVerifier.number" class="input" readonly></md-input>
          </md-field>
        </div>
      </div>
      
    </form>

    <!-- SMS Verification Form -->
    <form v-if="showCodeInput" novalidate class="md-layout">
      
      <div class="md-layout md-gutter md md-alignment-top-center">
        <div class="md-layout-item md-size-90">
          <md-field>
            <md-input v-model="phoneVerifier.code" class="input" readonly></md-input>
          </md-field>
        </div>
      </div>
      
    </form>

    <div class="md-layout md-gutter md md-alignment-top-center">
      <div class="md-layout-item md-size-90 title">
        <div class="md-layout md-gutter md md-alignment-top-center">  
          <md-button class="md-layout-item md-size-30 btn-lg" v-on:click="add('1')">1</md-button>          
          <md-button class="md-layout-item md-size-30 btn-lg" v-on:click="add('2')">2</md-button>          
          <md-button class="md-layout-item md-size-30 btn-lg" v-on:click="add('3')">3</md-button>
        </div>
        <div class="md-layout md-gutter md md-alignment-top-center">
           <md-button class="btn-lg md-layout-item md-size-30" v-on:click="add('4')">4</md-button>
           <md-button class="btn-lg md-layout-item md-size-30" v-on:click="add('5')">5</md-button>
           <md-button class="btn-lg md-layout-item md-size-30" v-on:click="add('6')">6</md-button>
        </div>
        <div class="md-layout md-gutter md md-alignment-top-center">
           <md-button class="btn-lg md-layout-item md-size-30" v-on:click="add('7')">7</md-button>
           <md-button class="btn-lg md-layout-item md-size-30" v-on:click="add('8')">8</md-button>
           <md-button class="btn-lg md-layout-item md-size-30" v-on:click="add('9')">9</md-button>
        </div>
        <div class="md-layout md-gutter md md-alignment-top-center">          
          <div class="md-layout-item md-size-30"></div>
          <md-button class="btn-lg md-layout-item md-size-30" v-on:click="add('0')">0</md-button>
          <md-button class="btn-lg md-layout-item md-size-30" v-on:click="add('C')">
            <md-icon>keyboard_backspace</md-icon>
          </md-button>  
        </div>
      </div>
    </div>

    <transition name="sendSMS" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <div class="md-layout md-gutter md md-alignment-top-center" v-bind:class="{ 'hided': !showNumberSendBtn }">
      <md-button id="get-sign-in-code" class="md-primary text-lg">{{ send_button_text }}</md-button>
    </div>
    </transition>

    <transition name="sendSMS" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
    <div class="md-layout md-gutter md md-alignment-top-center" v-bind:class="{ 'hided': !showCodeInput }">
      <md-button id="get-sign-in-code" class="md-primary text-lg" @click="signIn">{{ code_button_text }}</md-button>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      // Trans
      heading_text: this.$TRANS.login.heading,
      sub_heading_text: this.$TRANS.login.description,
      send_button_text: this.$TRANS.login.buttons.send,
      code_button_text: this.$TRANS.login.buttons.code,

      // UI States
      showNumberInput: true,
      showNumberSendBtn: false,
      showCodeInput: false,

      // Forms
      phoneVerifier: {
        number: "+373 ",
        phoneRegex: /^\+373\s(\d?)(\d?)\s*(\d?)(\d?)\s*(\d?)(\d?)\s*(\d?)(\d?)\s*$/,
        codeRegex: /^\d*$/,
        code: ""
      }
    };
  },

  mounted() {
    this.recaptchaVerifier = new this.$AUTH.RecaptchaVerifier(
      "get-sign-in-code",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.sendSMS();
        }
      }
    );
    this.recaptchaVerifier.render().then(widgetId => {
      window.recaptchaWidgetId = widgetId;
    });
  },

  methods: {
    /**
     * Sends the user an SMS-verification code using Firebase auth
     *
     * @see https://firebase.google.com/docs/auth/web/phone-auth
     */
    sendSMS() {
      this.getSignInCodeButton = {
        showSpinner: true,
        text: "Sending SMS..",
        disabled: true
      };

      this.$AUTH
        .signInWithPhoneNumber(
          this.phoneVerifier.number.replace(" ", ""),
          this.recaptchaVerifier
        )
        .then(result => {
          this.smsResult = result;
          this.showCodeInput = true;
          this.showNumberSendBtn = false;
        })
        .catch(this.showError);
    },

    /**
     * Authenticates the user with Firebase auth
     */
    signIn() {
      this.smsResult
        .confirm(this.phoneVerifier.code)
        .then(res => {
          // this.$OS.config.put("user_id");
          console.log(res);
        })
        .catch(this.showError);
    },

    /**
     * Show Error from Firebase auth
     */
    showError(error) {
      if (error) {
        this.phoneVerifier.code = "asd";
      }
    },

    add(val) {
      var param = v =>
        v
          ? !this.showCodeInput
            ? (this.phoneVerifier.number = v)
            : (this.phoneVerifier.code = v)
          : !this.showCodeInput
            ? this.phoneVerifier.number
            : this.phoneVerifier.code;
      var regex = () =>
        !this.showCodeInput
          ? this.phoneVerifier.phoneRegex
          : this.phoneVerifier.codeRegex;
      var hold = param() + (val == "C" ? "" : val);

      console.log(param());

      val == "C" && (hold = param().substr(0, param().length - 1));

      regex().exec(hold) && !this.showCodeInput && param( hold.replace(regex(), "+373 $1$2 $3$4 $5$6 $7$8").trim() );
      regex().exec(hold) && this.showCodeInput && param( hold.trim() );

      this.showNumberSendBtn =
        regex().exec(param()) &&
        regex()
          .exec(param())
          .filter(v => !!v).length == 9;
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  padding-top: 60px;
  margin: 0;
  color: #ffffff;
}

.sub-title {
  text-align: center;
  margin: 15px 0;
  color: #cccccc;
}

i.no-border:after {
  background: transparent !important;
}

.btn-lg {
  font-size: 32px;
  line-height: 52px;
  text-align: center;
  height: 52px;
}

.label {
  background: rgba(255, 255, 255, 0.2);
  margin: 2px;
  padding: 4px;
}

.input {
  font-size: 32px !important;
  line-height: 52px !important;
  height: 52px !important;
  text-align: center;
  width: 100%;
}

.text-lg {
  margin-top: 20px;
  font-size: 18px;
  line-height: 42px;
  height: 52px;
}

.hided {
  position: fixed;
  bottom: -100%;
}
</style>