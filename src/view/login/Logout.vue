<template>
  <p>callback</p>
</template>

<script>
import { authApi } from '@/module/api';
import { Config } from '@/conf/config';
import { SESSION_MUTATION_TYPES } from '@/store/modules/session';
import { MASTER_MUTATION_TYPES } from '@/store/modules/master';

export default {
  created () {
    console.log('logouted...');
    authApi.logout()
                .finally(()=>{
                  this.$store.commit(SESSION_MUTATION_TYPES.CLEAR_VALUES);
                  this.$store.commit(MASTER_MUTATION_TYPES.CLEAR_VALUES);
                  document.cookie = Config.COOKIE_ID + "; max-age=0";
                  this.$router.push(Config.LOGIN_PATH);
               });
  }
}
</script>