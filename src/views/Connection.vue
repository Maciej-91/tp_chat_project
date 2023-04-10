<template>
    <div>
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-size-50 md-small-size-100">
          <md-card-header>
            <div class="md-title">Connection</div>
          </md-card-header>
  
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('userName')">
                  <label for="last-name">Nom d'utilisateur</label>
                  <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.userName" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.userName.required">The last name is required</span>
                  <span class="md-error" v-else-if="!$v.form.userName.minlength">Invalid last name</span>
                </md-field>
              </div>
            </div>
  
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('password')">
                  <label for="last-name">Mot de passe</label>
                  <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.password" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.password.required">The last name is required</span>
                  <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid last name</span>
                </md-field>
              </div>
            </div>
          </md-card-content>
  
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
  
          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="sending">Connection</md-button>
          </md-card-actions>
        </md-card>
  
        <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
      </form>
    </div>
  </template>

<script>
import { defineComponent } from 'vue';
import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
  } from 'vuelidate/lib/validators'

export default defineComponent({
    name: "Connection",
    mixins: [validationMixin],
    data() {
        return {
            form: {
                userName: null,
                password: null,
            },
            userSaved: false,
            sending: false,
            lastUser: null
        }
    },
    validations: {
      form: {
        userName: {
          required,
          minLength: minLength(3)
        },
        password: {
          required,
          minLength: minLength(3)
        },
      }
    },
    methods: {
        getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.userName = null
        this.form.lastName = null
      },
      saveUser () {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.userName} ${this.form.lastName}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
})
</script>
<style lang="scss" scoped>
    form {
        justify-content: center;
        margin-top: 5rem;
    }
    .md-card-actions.md-alignment-right {
        justify-content: center;
    }
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>