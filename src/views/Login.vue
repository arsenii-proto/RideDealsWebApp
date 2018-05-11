<template>
  <div class="page">

    <h2 class="title">{{ heading_text }}</h2>
    <h3 class="sub-title">{{ sub_heading_text }}</h3>

    <!-- Number Input Form -->
    <form v-if="showNumberInput" novalidate class="md-layout">
      
      <div class="md-layout md-gutter md md-alignment-top-center">
        <div class="md-layout-item md-size-90">
          <md-field>
            <md-input v-model="numberInputForm.number" class="input" readonly></md-input>
          </md-field>
        </div>
      </div>
      
    </form>

    <!-- SMS Verification Form -->
    <!-- <div v-if="showCodeInput">
      <form>
        <div class="form-group">
          <input type="text" class="form-control form-control-lg" v-model="numberInputForm.code" placeholder="Verification Code" required>
        </div>
        <div class="form-group">
          <a href="javascript:void" class="btn btn-block btn-lg success theme-accent" @click="signIn">{{ signInButton.text }}</a>
        </div>
      </form>
    </div> -->

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

    <div class="md-layout md-gutter md md-alignment-top-center" v-if="showNumberSendBtn">
      <md-button class="md-primary text-lg">{{ send_button_text }}</md-button>
    </div>
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

      // UI States
      showNumberInput: true,
      showNumberSendBtn: false,
      showCodeInput: false,

      // Forms
      numberInputForm: {
        number: "+373 ",
        regex: /^\+373\s(\d?)(\d?)\s*(\d?)(\d?)\s*(\d?)(\d?)\s*(\d?)(\d?)\s*$/,
        code: ""
      },

      // Buttons
      getSignInCodeButton: {
        text: "Get sign in code"
      },
      signInButton: {
        text: "Sign in"
      }
    };
  },

  mounted() {
    // const self = this;
    // // Start Firebase invisible reCAPTCHA verifier
    // this.recaptchaVerifier = new this.$AUTH.RecaptchaVerifier(
    //   "get-sign-in-code",
    //   {
    //     size: "invisible",
    //     callback: () => {
    //       // reCAPTCHA solved, allow signInWithPhoneNumber.
    //       self.sendSMS();
    //     }
    //   }
    // );
    // this.recaptchaVerifier.render().then(widgetId => {
    //   window.recaptchaWidgetId = widgetId;
    // });
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
          this.numberInputForm.number,
          this.recaptchaVerifier
        )
        .then(result => {
          this.smsResult = result;
          this.showCodeInput = true;
        })
        .catch(this.showError);
    },

    /**
     * Authenticates the user with Firebase auth
     */
    signIn() {
      this.smsResult
        .confirm(this.numberInputForm.code)
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
        this.numberInputForm.code = "asd";
      }
    },

    add(val) {
      var hold = this.numberInputForm.number + (val == "C" ? "" : val);

      val == "C" &&
        (hold = this.numberInputForm.number.substr(
          0,
          this.numberInputForm.number.length - 1
        ));

      this.numberInputForm.regex.exec(hold) &&
        (this.numberInputForm.number = hold
          .replace(this.numberInputForm.regex, "+373 $1$2 $3$4 $5$6 $7$8")
          .trim());

      this.numberInputForm.regex.exec(this.numberInputForm.number) &&
        this.numberInputForm.regex
          .exec(this.numberInputForm.number)
          .filter(v => !!v).length == 9 &&
        this.showSendButton();
    },

    showSendButton() {
      this.showNumberSendBtn = true
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
  line-height: 52px;
  height: 52px;
  text-align: center;
}

.text-lg {
  padding-top: 10px;
  font-size: 18px;
}
</style>