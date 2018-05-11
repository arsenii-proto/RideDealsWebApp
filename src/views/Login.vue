<template>
  <div class="page">

    <h3 class="title">{{ heading_text }}</h3>
    <h5 class="sub-title">{{ sub_heading_text }}</h5>

    <!-- Number Input Form -->
    <form v-if="showNumberInput" novalidate class="md-layout">
      
      <div class="md-layout md-gutter md md-alignment-top-center">
        <div class="md-layout-item md-size-80">
          <md-field>
            <label>Type here!</label>
            <md-input v-model="type"></md-input>
            <span class="md-helper-text">Helper text</span>
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
      country_label: this.$TRANS.login.country_label,
      countries: [

      ],

      // UI States
      showNumberInput: true,
      showCodeInput: false,

      // Forms
      numberInputForm: {
        number: "",
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
  margin: 0px;
  color: #cccccc;
}

i.no-border:after {
  background: transparent !important;
}

</style>